import "server-only";

import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";

import {
  embeddedEducation,
  embeddedExperience,
  embeddedProjects,
} from "@/lib/portfolio/content";
import type { Education, Experience, Project } from "@/lib/portfolio/types";
import { env } from "@/lib/env";

let milvusRuntimeUnavailable = false;

function createMilvusClient() {
  if (!env.MILVUS_ENABLED || !env.MILVUS_ADDRESS || milvusRuntimeUnavailable) {
    return null;
  }

  return new MilvusClient({
    address: env.MILVUS_ADDRESS,
    username: env.MILVUS_USERNAME || undefined,
    password: env.MILVUS_PASSWORD || undefined,
  });
}

function getCollectionName(segment: string) {
  return `${env.MILVUS_COLLECTION_PREFIX}_${segment}`;
}

function markMilvusUnavailable(error: unknown) {
  milvusRuntimeUnavailable = true;
  console.error("[milvus] connection disabled after runtime error", error);
}

async function runMilvusSafely<T>(task: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await task();
  } catch (error) {
    markMilvusUnavailable(error);
    return fallback;
  }
}

type CollectionSegment =
  | "experience"
  | "projects"
  | "education"
  | "contacts"
  | "auth_keys";

type MilvusStatus = {
  enabled: boolean;
};

type PortfolioDocument<T> = {
  id: string;
  payload: T;
  title: string;
  body: string;
  email?: string;
  expiresAt?: string;
  createdAt: string;
};

function makeVector(seed: string) {
  const vector = Array.from({ length: 8 }, (_, index) => {
    const value = seed.charCodeAt(index % seed.length) ?? 0;
    return Number((value / 255).toFixed(6));
  });

  return vector;
}

async function ensureCollection(client: MilvusClient, name: string) {
  const hasCollection = await client.hasCollection({ collection_name: name });

  if (hasCollection.value) {
    return;
  }

  await client.createCollection({
    collection_name: name,
    fields: [
      {
        name: "id",
        data_type: DataType.VarChar,
        is_primary_key: true,
        max_length: 128,
      },
      {
        name: "created_at",
        data_type: DataType.VarChar,
        max_length: 64,
      },
      {
        name: "title",
        data_type: DataType.VarChar,
        max_length: 512,
      },
      {
        name: "email",
        data_type: DataType.VarChar,
        max_length: 512,
      },
      {
        name: "expires_at",
        data_type: DataType.VarChar,
        max_length: 64,
      },
      {
        name: "payload",
        data_type: DataType.VarChar,
        max_length: 4096,
      },
      {
        name: "body",
        data_type: DataType.VarChar,
        max_length: 4096,
      },
      {
        name: "embedding",
        data_type: DataType.FloatVector,
        dim: 8,
      },
    ],
  });

  await client.createIndex({
    collection_name: name,
    field_name: "embedding",
    index_name: `${name}_embedding_index`,
    index_type: "AUTOINDEX",
    metric_type: "COSINE",
  });

  await client.loadCollectionSync({ collection_name: name });
}

export function isMilvusEnabled() {
  return env.MILVUS_ENABLED && Boolean(env.MILVUS_ADDRESS);
}

export async function ensureMilvusCollections() {
  const client = createMilvusClient();

  if (!client) {
    return { enabled: false as const };
  }

  return runMilvusSafely<MilvusStatus>(
    async () => {
      await Promise.all(
        ["experience", "projects", "education", "contacts", "auth_keys"].map((segment) =>
          ensureCollection(client, getCollectionName(segment)),
        ),
      );

      return { enabled: true };
    },
    { enabled: false },
  );
}

export async function storeMilvusRecord<T>(
  segment: CollectionSegment,
  id: string,
  payload: T & { createdAt: string },
  metadata: { title: string; body: string; email?: string; expiresAt?: string },
): Promise<MilvusStatus> {
  const client = createMilvusClient();

  if (!client) {
    return { enabled: false as const };
  }

  return runMilvusSafely<MilvusStatus>(
    async () => {
      await ensureCollection(client, getCollectionName(segment));

      await client.upsert({
        collection_name: getCollectionName(segment),
        data: [
          {
            id,
            created_at: payload.createdAt,
            title: metadata.title,
            email: metadata.email ?? "",
            expires_at: metadata.expiresAt ?? "",
            payload: JSON.stringify(payload),
            body: metadata.body,
            embedding: makeVector(metadata.body),
          },
        ],
      });

      return { enabled: true };
    },
    { enabled: false },
  );
}

export async function listMilvusRecords<T>(segment: CollectionSegment): Promise<T[]> {
  const client = createMilvusClient();

  if (!client) {
    return [];
  }

  return runMilvusSafely(async () => {
    await ensureCollection(client, getCollectionName(segment));

    const result = await client.query({
      collection_name: getCollectionName(segment),
      filter: "id != ''",
      output_fields: ["payload"],
    });

    return (result.data ?? [])
      .map((item) => {
        try {
          return JSON.parse(String(item.payload)) as T;
        } catch {
          return null;
        }
      })
      .filter((item): item is T => item !== null);
  }, []);
}

export async function syncPortfolioToMilvus() {
  if (!isMilvusEnabled()) {
    return { enabled: false };
  }

  const datasets: Array<{
    segment: CollectionSegment;
    items: Array<PortfolioDocument<Experience | Project | Education>>;
  }> = [
    {
      segment: "experience",
      items: embeddedExperience.map((item) => ({
        id: item.id,
        payload: item,
        title: `${item.jobRole} at ${item.companyName}`,
        body: `${item.description} ${item.stacks.join(" ")}`,
        createdAt: item.createdAt,
      })),
    },
    {
      segment: "projects",
      items: embeddedProjects.map((item) => ({
        id: item.id,
        payload: item,
        title: item.projectName,
        body: `${item.description} ${item.impact} ${item.stacks.join(" ")}`,
        createdAt: item.createdAt,
      })),
    },
    {
      segment: "education",
      items: embeddedEducation.map((item) => ({
        id: item.id,
        payload: item,
        title: `${item.course} at ${item.collegeName}`,
        body: `${item.branch} ${item.location}`,
        createdAt: item.createdAt,
      })),
    },
  ];

  await ensureMilvusCollections();

  for (const dataset of datasets) {
    for (const item of dataset.items) {
      await storeMilvusRecord(dataset.segment, item.id, item.payload, {
        title: item.title,
        body: item.body,
      });
    }
  }

  return { enabled: true };
}
