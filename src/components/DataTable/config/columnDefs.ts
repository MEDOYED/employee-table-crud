import { ColDef } from 'ag-grid-community';
import { ActionsCell } from '../cells/ActionsCell';
import { DepartmentCell } from '../cells/DepartmentCell';
import { EmailCell } from '../cells/EmailCell';
import { NameCell } from '../cells/NameCell';
import { SalaryCell } from '../cells/SalaryCell';
import { StatusCell } from '../cells/StatusCell';
import { Row } from '../types';

export const defaultColDef: ColDef<Row> = {
  sortable: false,
  filter: false,
  resizable: false,
};

export function getColumnDefs(isEditing: boolean): ColDef<Row>[] {
  return [
    { field: 'id', headerName: 'ID', width: 80 },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      minWidth: 140,
      cellRenderer: NameCell,
      cellRendererParams: { isEditing },
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      minWidth: 180,
      cellRenderer: EmailCell,
      cellRendererParams: { isEditing },
    },
    {
      field: 'department',
      headerName: 'Department',
      flex: 1,
      minWidth: 120,
      cellRenderer: DepartmentCell,
      cellRendererParams: { isEditing },
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      cellRenderer: StatusCell,
      cellRendererParams: { isEditing },
    },
    {
      field: 'salary',
      headerName: 'Salary',
      width: 120,
      cellRenderer: SalaryCell,
      cellRendererParams: { isEditing },
    },
    {
      headerName: 'Delete',
      width: 100,
      cellRenderer: ActionsCell,
      cellRendererParams: { isEditing },
      pinned: 'right',
    },
  ];
}
