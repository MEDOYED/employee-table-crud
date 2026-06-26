import { RowsFormValue } from '../types';

export function validateRows(values: RowsFormValue) {
  const byId = values.rows.byId;
  const allIds = values.rows.allIds;
  const errors: Record<string, Record<string, string>> = {};
  const emailSet = new Set<string>();

  for (const id of allIds) {
    const row = byId[id];
    if (!row) continue;
    const rowError: Record<string, string> = {};

    if (!row.name?.trim()) {
      rowError.name = 'This field is required';
    }

    if (!row.email?.trim()) {
      rowError.email = 'This field is required';
    } else {
      const normalized = row.email.trim().toLowerCase();
      if (emailSet.has(normalized)) {
        rowError.email = 'Email already exists';
      }
      emailSet.add(normalized);
    }

    if (!row.department) {
      rowError.department = 'This field is required';
    }

    if (!row.status) {
      rowError.status = 'This field is required';
    }

    if (!row.salary?.trim()) {
      rowError.salary = 'This field is required';
    }

    if (Object.keys(rowError).length > 0) {
      errors[id] = rowError;
    }
  }

  return Object.keys(errors).length > 0 ? { rows: { byId: errors } } : {};
}
