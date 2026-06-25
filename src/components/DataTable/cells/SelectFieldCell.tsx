import { ICellRendererParams } from 'ag-grid-community';
import { Field } from 'react-final-form';
import { Row } from '../types';
import { getFieldName } from './getFieldName';

interface IProps extends ICellRendererParams<Row> {
  isEditing: boolean;
  field: keyof Row;
  options: string[];
}

export function SelectFieldCell({
  value,
  node,
  isEditing,
  field,
  options,
}: IProps) {
  if (!isEditing) {
    return <span>{value}</span>;
  }

  return (
    <Field name={getFieldName(node, field)}>
      {({ input }) => (
        <select {...input} className="cell-input">
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
    </Field>
  );
}
