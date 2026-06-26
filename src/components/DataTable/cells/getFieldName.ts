import { IRowNode } from 'ag-grid-community';
import { Row } from '../types';

export function getFieldName(
  node: IRowNode<Row> | null | undefined,
  field: keyof Row
) {
  const id = node?.data?.id;
  if (id == null) {
    return `rows.byId.0.${field}`
  }
  return `rows.byId.${id}.${field}`;
}
