import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { config } from "dotenv";
config({ path: ".env.local" });

import {
  embeddedEducation,
  embeddedExperience,
  embeddedProjects,
  embeddedSkills,
  embeddedSkillGroups,
} from "../src/lib/portfolio/content";

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }
  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
}

const prisma = createPrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Seed Skill Groups
  console.log("Seeding skill groups...");
  for (const group of embeddedSkillGroups) {
    await prisma.skillGroup.upsert({
      where: { id: group.id },
      update: {
        title: group.title,
        order: group.order,
      },
      create: {
        id: group.id,
        title: group.title,
        order: group.order,
        createdAt: new Date(group.createdAt),
      },
    });
  }

  // Seed Skills
  console.log("Seeding skills...");
  for (const skill of embeddedSkills) {
    await prisma.skill.upsert({
      where: { id: skill.id },
      update: {
        name: skill.name,
        groupId: skill.groupId,
        isHighlighted: skill.isHighlighted,
      },
      create: {
        id: skill.id,
        name: skill.name,
        groupId: skill.groupId,
        icon: skill.icon,
        isHighlighted: skill.isHighlighted,
        createdAt: new Date(skill.createdAt),
      },
    });
  }

  // Seed Experience
  console.log("Seeding experience...");
  for (const exp of embeddedExperience) {
    await prisma.experience.upsert({
      where: { id: exp.id },
      update: {
        companyName: exp.companyName,
        from: exp.from,
        to: exp.to,
        description: exp.description,
        jobRole: exp.jobRole,
        location: exp.location,
        stacks: exp.stacks,
      },
      create: {
        id: exp.id,
        companyName: exp.companyName,
        from: exp.from,
        to: exp.to,
        description: exp.description,
        jobRole: exp.jobRole,
        location: exp.location,
        stacks: exp.stacks,
        createdAt: new Date(exp.createdAt),
      },
    });
  }

  // Seed Projects
  console.log("Seeding projects...");
  for (const project of embeddedProjects) {
    await prisma.project.upsert({
      where: { id: project.id },
      update: {
        projectName: project.projectName,
        projectType: project.projectType,
        stacks: project.stacks,
        description: project.description,
        isHighlighted: project.isHighlighted,
        impact: project.impact,
        href: project.href,
        companyId: project.companyId,
      },
      create: {
        id: project.id,
        projectName: project.projectName,
        projectType: project.projectType,
        stacks: project.stacks,
        description: project.description,
        isHighlighted: project.isHighlighted,
        impact: project.impact,
        href: project.href,
        companyId: project.companyId,
        createdAt: new Date(project.createdAt),
      },
    });
  }

  // Seed Education
  console.log("Seeding education...");
  for (const edu of embeddedEducation) {
    await prisma.education.upsert({
      where: { id: edu.id },
      update: {
        collegeName: edu.collegeName,
        location: edu.location,
        course: edu.course,
        branch: edu.branch,
        from: edu.from,
        to: edu.to,
      },
      create: {
        id: edu.id,
        collegeName: edu.collegeName,
        location: edu.location,
        course: edu.course,
        branch: edu.branch,
        from: edu.from,
        to: edu.to,
        createdAt: new Date(edu.createdAt),
      },
    });
  }

  console.log("✅ Seed completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
