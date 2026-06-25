import { createContext, PropsWithChildren, useContext } from 'react';
import { Row } from '../types';
import { useDataTableContext } from './useDataTableContext';

interface DataTableContextValue {
  rows: Row[];
  isLoading: boolean;
  error: string | null;
  setRows: (rows: Row[]) => void;
}

const DataTableContext = createContext<DataTableContextValue | null>(null);

export function DataTableProvider({ children }: PropsWithChildren) {
  const value = useDataTableContext();

  return (
    <DataTableContext.Provider value={value}>{children}</DataTableContext.Provider>
  );
}

export function useDataTable() {
  const context = useContext(DataTableContext);

  if (!context) {
    throw new Error('useDataTable must be used within DataTableProvider');
  }

  return context;
}
