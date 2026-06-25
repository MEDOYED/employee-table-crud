import { useState } from 'react';
import { DataTableProvider, useDataTable } from './context/DataTableContext';
import { DataTableForm } from './form/DataTableForm';
import { Row } from './types';

function DataTable() {
  const { rows, setRows } = useDataTable();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <DataTableForm
      savedRows={rows}
      isEditing={isEditing}
      onEdit={() => setIsEditing(true)}
      onCancel={() => setIsEditing(false)}
      onSave={(updatedRows: Row[]) => {
        setRows(updatedRows);
        setIsEditing(false);
      }}
    />
  );
}

export default () => (
  <DataTableProvider>
    <DataTable />
  </DataTableProvider>
);