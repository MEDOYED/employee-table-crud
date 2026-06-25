import { ICellRendererParams } from 'ag-grid-community';
import { Row } from '../types';
import { TextFieldCell } from './TextFieldCell';

interface IProps extends ICellRendererParams<Row> {
  isEditing: boolean;
}

export function EmailCell(props: IProps) {
  return <TextFieldCell {...props} field="email" />;
}
