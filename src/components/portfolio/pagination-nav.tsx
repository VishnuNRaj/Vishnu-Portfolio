import Link from "next/link";

import { Button } from "@/components/ui";

type PaginationNavProps = {
  page: number;
  totalPages: number;
  buildHref: (page: number) => string;
};

export function PaginationNav({
  page,
  totalPages,
  buildHref,
}: PaginationNavProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
      <p className="text-sm text-muted">
        Page {page} of {totalPages}
      </p>
      <div className="flex gap-3">
        <Link href={buildHref(Math.max(1, page - 1))}>
          <Button variant="secondary" disabled={page <= 1}>
            Previous
          </Button>
        </Link>
        <Link href={buildHref(Math.min(totalPages, page + 1))}>
          <Button variant="secondary" disabled={page >= totalPages}>
            Next
          </Button>
        </Link>
      </div>
    </div>
  );
}
