export interface Row {
  id: number;
  name: string;
  email: string;
  department: string;
  status: string;
  salary: string;
}

export type RowData = Omit<Row, 'id'>;

export interface RowsFormValue {
  rows: {
    byId: Record<number, RowData>;
    allIds: number[];
  };
}
