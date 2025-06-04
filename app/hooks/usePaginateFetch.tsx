import { useState, useEffect, useCallback } from 'react';

type FetchFunction<T> = (query?: string, page?: number) => Promise<{
  data: T[],
  pagination: {
    last_page: number
  }
}>;

export function usePaginateFetch<T>(
  fetcher: FetchFunction<T>,
  initialQuery: string = '',
  initialPage: number = 1
) {
  const [data, setData] = useState<T[]>([]);
  const [query, setQuery] = useState(initialQuery);
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // 👇 Reutilizable, puedes usarlo externamente con el valor actual
  const loadData = useCallback((overridePage?: number) => {
    const targetPage = overridePage ?? page;
    setLoading(true);
    setError(null);

    return fetcher(query, targetPage)
      .then(res => {
        setData(res.data);
        setTotalPages(res.pagination.last_page);
      })
      .catch(err => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [fetcher, query, page]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    data,
    page,
    totalPages,
    loading,
    error,
    query,
    setQuery,
    setPage,
    refetch: () => loadData(),
  };
}

