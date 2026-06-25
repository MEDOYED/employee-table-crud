import { useEffect, useMemo, useRef } from 'react';
import { AgGridProvider, AgGridReact } from 'ag-grid-react';
import arrayMutators from 'final-form-arrays';
import { Form } from 'react-final-form';
import { defaultColDef, getColumnDefs } from '../config/columnDefs';
import { gridModules, gridTheme } from '../config/gridConfig';
import { useDataTableContext } from '../context/useDataTableContext';
import { Row } from '../types';
import { RowsFieldArray } from './RowsFieldArray';
import '../DataTable.css';

interface IProps {
  savedRows: Row[];
  isEditing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: (rows: Row[]) => void;
}

export function DataTableForm({
  savedRows,
  isEditing,
  onEdit,
  onCancel,
  onSave,
}: IProps) {
  const { isLoading } = useDataTableContext();
  const gridRef = useRef<AgGridReact>(null);
  const columnDefs = useMemo(() => getColumnDefs(isEditing), [isEditing]);

  useEffect(() => {
    gridRef.current?.api?.refreshCells({ force: true });
  }, [isEditing]);

  const handleSubmit = (values: { rows: Row[] }) => {
    onSave(values.rows);
  };

  return (
    <Form
      mutators={{ ...arrayMutators }}
      initialValues={{ rows: savedRows }}
      onSubmit={handleSubmit}
      render={({ handleSubmit: submitForm, form, values }) => (
        <form onSubmit={submitForm}>
          <div className="toolbar">
            {!isEditing ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  form.restart({ rows: savedRows });
                  onEdit();
                }}
              >
                Edit
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    form.restart({ rows: savedRows });
                    onCancel();
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </>
            )}
          </div>

          <RowsFieldArray>
            {() => (
              <AgGridProvider modules={gridModules}>
                <div className="grid-container">
                  <AgGridReact
                    ref={gridRef}
                    theme={gridTheme}
                    rowData={values.rows}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    loading={isLoading}
                    suppressClickEdit
                    suppressRowVirtualisation
                    suppressColumnVirtualisation
                  />
                </div>
              </AgGridProvider>
            )}
          </RowsFieldArray>
        </form>
      )}
    />
  );
}
