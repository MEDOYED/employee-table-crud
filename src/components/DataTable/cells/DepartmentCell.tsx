import { ICellRendererParams } from 'ag-grid-community';
import { DEPARTMENTS } from '../data/constants';
import { Row } from '../types';
import { SelectFieldCell } from './SelectFieldCell';

interface IProps extends ICellRendererParams<Row> {
  isEditing: boolean;
}

export function DepartmentCell(props: IProps) {
  return (
    <SelectFieldCell {...props} field="department" options={DEPARTMENTS} />
  );
}
