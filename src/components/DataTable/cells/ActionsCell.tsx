import { ICellRendererParams } from 'ag-grid-community';
import { useForm } from 'react-final-form';
import { Row, RowsFormValue } from '../types';

interface IProps extends ICellRendererParams<Row> {
  isEditing: boolean;
}

export function ActionsCell({ node, isEditing }: IProps) {
  const form = useForm();

  if (!isEditing) {
    return null;
  }

  return (
    <button
      type="button"
      className="btn btn-delete"
      onClick={() => {
        const id = node.data?.id;
        if (id != null) {
          const allIds = (form.getState().values as RowsFormValue).rows.allIds;
          const index = allIds.indexOf(id);
          if (index !== -1) {
            form.mutators.remove('rows.allIds', index);
          }
        }
      }}
    >
      Delete
    </button>
  );
}
