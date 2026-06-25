import { ICellRendererParams } from 'ag-grid-community';
import { STATUSES } from '../data/constants';
import { Row } from '../types';
import { SelectFieldCell } from './SelectFieldCell';

interface IProps extends ICellRendererParams<Row> {
  isEditing: boolean;
}

export function StatusCell(props: IProps) {
  return <SelectFieldCell {...props} field="status" options={STATUSES} />;
}
