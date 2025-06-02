import { useState, useEffect } from 'react';

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

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetcher(query, page)
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
  }, [query, page, fetcher]);

  return {
    data,
    page,
    totalPages,
    loading,
    error,
    query,
    setQuery,
    setPage,
  };
}
