import { IRowNode } from 'ag-grid-community';
import { Row } from '../types';

export function getFieldName(
  node: IRowNode<Row> | null | undefined,
  field: keyof Row
) {
  return `rows[${node?.rowIndex ?? 0}].${field}`;
}
