import { useEffect, useMemo, useState } from 'react';
import { fetchRows } from '../data/fetchRows';
import { Row } from '../types';

export function useDataTableContext() {
  const [rows, setRows] = useState<Row[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    fetchRows()
      .then((data) => {
        if (isMounted) {
          setRows(data);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError('Failed to load data');
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return useMemo(
    () => ({
      rows,
      isLoading,
      error,
      setRows,
    }),
    [rows, isLoading, error]
  );
}
