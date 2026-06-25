import { ICellRendererParams } from 'ag-grid-community';
import { Field } from 'react-final-form';
import { Row } from '../types';
import { getFieldName } from './getFieldName';

interface IProps extends ICellRendererParams<Row> {
  isEditing: boolean;
  field: keyof Row;
}

export function TextFieldCell({ value, node, isEditing, field }: IProps) {
  if (!isEditing) {
    return <span>{value}</span>;
  }

  return (
    <Field name={getFieldName(node, field)}>
      {({ input }) => <input {...input} className="cell-input" type="text" />}
    </Field>
  );
}
