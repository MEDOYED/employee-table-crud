import { useContext } from 'react';
import { ICellRendererParams } from 'ag-grid-community';
import { Field } from 'react-final-form';
import { ShowErrorsContext } from '../validation/ShowErrorsContext';
import { Row } from '../types';
import { getFieldName } from './getFieldName';

interface IProps extends ICellRendererParams<Row> {
  isEditing: boolean;
  field: keyof Row;
}

export function TextFieldCell({ value, node, isEditing, field }: IProps) {
  const showErrors = useContext(ShowErrorsContext);

  if (!isEditing) {
    return <span>{value}</span>;
  }

  return (
    <Field name={getFieldName(node, field)}>
      {({ input, meta }) => (
        <div className="cell-wrapper">
          <input
            {...input}
            className={`cell-input${showErrors && meta.error ? ' cell-input--error' : ''}`}
            type="text"
          />
          {showErrors && meta.error && (
            <span className="cell-error">{meta.error}</span>
          )}
        </div>
      )}
    </Field>
  );
}
