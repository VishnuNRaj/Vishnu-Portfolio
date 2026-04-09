"use client";

import { useEffect, useRef, useState, ReactNode, useCallback } from "react";

interface InfiniteScrollProps<T> {
  initialItems: T[];
  initialPage: number;
  totalPages: number;
  action: (page: number) => Promise<{ items: T[]; page: number; totalPages: number }>;
  renderItem: (item: T, index: number) => ReactNode;
  listClassName?: string;
}

export function InfiniteScroll<T>({
  initialItems,
  initialPage,
  totalPages,
  action,
  renderItem,
  listClassName,
}: InfiniteScrollProps<T>) {
  const [items, setItems] = useState<T[]>(initialItems);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);
  const totalPagesRef = useRef(totalPages);

  const loadMore = useCallback(async () => {
    if (loading || page >= totalPagesRef.current) return;
    
    setLoading(true);
    try {
      const nextPage = page + 1;
      const res = await action(nextPage);
      setItems((prev) => [...prev, ...res.items]);
      setPage(res.page);
      totalPagesRef.current = res.totalPages;
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [loading, page, action]);

  useEffect(() => {
    const currentRef = observerRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "200px" }
    );

    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
      observer.disconnect();
    };
  }, [loadMore]);

  return (
    <>
      <div className={listClassName}>
        {items.map((item, i) => renderItem(item, i))}
      </div>
      {page < totalPagesRef.current && (
        <div ref={observerRef} className="flex justify-center py-6">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-line border-t-accent" />
        </div>
      )}
    </>
  );
}
