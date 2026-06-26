import { useEffect, useMemo, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { getColumnDefs } from '../config/columnDefs';
import { useDataTable } from '../context/DataTableContext';
import { ShowErrorsContext } from '../validation/ShowErrorsContext';
import { validateRows } from '../validation/validateRows';
import type { Row, RowsFormValue } from '../types';
import { GridBody } from './GridBody';
import { STATUSES, DEPARTMENTS } from '../data/constants';
import '../DataTable.css';

interface IProps {
  savedRows: Row[];
  isEditing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: (rows: Row[]) => void;
}

function buildInitialValues(rows: Row[]): RowsFormValue {
  return {
    rows: {
      byId: Object.fromEntries(
        rows.map(({ id, ...data }) => [id, data])
      ),
      allIds: rows.map(r => r.id),
    },
  };
}

function flattenRows(values: RowsFormValue): Row[] {
  return values.rows.allIds.map(id => ({
    id,
    ...values.rows.byId[id],
  }));
}

export function DataTableForm({
  savedRows,
  isEditing,
  onEdit,
  onCancel,
  onSave,
}: IProps) {
  const { isLoading } = useDataTable();
  const gridRef = useRef<AgGridReact>(null);
  const columnDefs = useMemo(() => getColumnDefs(isEditing), [isEditing]);
  const initialValues = useMemo(() => buildInitialValues(savedRows), [savedRows]);
  const formKey = useMemo(() => JSON.stringify(savedRows), [savedRows]);

  useEffect(() => {
    gridRef.current?.api?.refreshCells({ force: true });
  }, [isEditing]);

  const handleSubmit = (values: RowsFormValue) => {
    onSave(flattenRows(values));
  };

  return (
    <Form
      key={formKey}
      mutators={{ ...arrayMutators }}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validate={validateRows}
      render={({ handleSubmit: submitForm, form, values, submitFailed }) => (
        <ShowErrorsContext.Provider value={!!submitFailed}>
          <form onSubmit={submitForm}>
            <div className="toolbar">
              {!isEditing ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    form.restart(buildInitialValues(savedRows));
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
                      form.restart(buildInitialValues(savedRows));
                      onCancel();
                    }}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>

                  <button
                    type="button"
                    className="btn btn-add"
                    onClick={() => {
                      const newId = Math.max(...values.rows.allIds, 0) + 1;

                      form.batch(() => {
                        (form.change as (name: string, value: unknown) => void)(`rows.byId.${newId}`, {
                          name: `User ${newId}`,
                          email: `user${newId}@example.com`,
                          department: DEPARTMENTS[newId % DEPARTMENTS.length],
                          status: STATUSES[newId % STATUSES.length],
                          salary: `$${(30000 + newId * 500).toLocaleString('en-US')}`,
                        });
                        form.mutators.insert('rows.allIds', 0, newId);
                      });
                    }}
                  >
                    Add new employee
                  </button>
                </>
              )}
            </div>

            <GridBody
              ids={values.rows.allIds}
              byId={values.rows.byId}
              columnDefs={columnDefs}
              gridRef={gridRef}
              isLoading={isLoading}
            />
          </form>
        </ShowErrorsContext.Provider>
      )}
    />
  );
}
