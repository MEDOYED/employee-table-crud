import { memo } from 'react';
import { AgGridProvider, AgGridReact } from 'ag-grid-react';
import type { ColDef } from 'ag-grid-community';
import { gridModules, gridTheme, getRowId } from '../config/gridConfig';
import { defaultColDef } from '../config/columnDefs';
import type { RowData } from '../types';

interface IProps {
  ids: number[];
  byId: Record<number, RowData>;
  columnDefs: ColDef[];
  gridRef: React.RefObject<AgGridReact | null>;
  isLoading: boolean;
}

export const GridBody = memo(
  ({ ids, byId, columnDefs, gridRef, isLoading }: IProps) => {
    const rowData = ids.map((id) => ({
      id,
      ...byId[id],
    }));

    return (
      <AgGridProvider modules={gridModules}>
        <div className="grid-container">
          <AgGridReact
            ref={gridRef}
            theme={gridTheme}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            loading={isLoading}
            getRowId={getRowId}
            suppressClickEdit
            suppressRowVirtualisation
            suppressColumnVirtualisation
          />
        </div>
      </AgGridProvider>
    );
  },
  (prev, next) =>
    prev.columnDefs === next.columnDefs &&
    prev.isLoading === next.isLoading &&
    prev.ids.length === next.ids.length &&
    prev.ids.every((id, i) => id === next.ids[i])
);
