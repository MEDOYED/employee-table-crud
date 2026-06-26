import { validateRows } from './validateRows';
import type { RowsFormValue, RowData } from '../types';

function buildFormValue(rows: { id: number; data: RowData }[]): RowsFormValue {
  return {
    rows: {
      byId: Object.fromEntries(rows.map(({ id, data }) => [id, data])),
      allIds: rows.map((r) => r.id),
    },
  };
}

function validRow(overrides: Partial<RowData> = {}): RowData {
  return {
    name: 'Test User',
    email: 'test@example.com',
    department: 'Engineering',
    status: 'Active',
    salary: '$50000',
    ...overrides,
  };
}

function errors(result: ReturnType<typeof validateRows>, id: number) {
  return (result as { rows?: { byId: Record<number, Record<string, string>> } }).rows?.byId[id];
}

describe('validateRows', () => {
  it('returns no errors for valid rows', () => {
    const values = buildFormValue([
      { id: 1, data: validRow() },
      { id: 2, data: validRow({ email: 'other@example.com' }) },
    ]);

    expect(validateRows(values)).toEqual({});
  });

  it('returns no errors for a single valid row', () => {
    const values = buildFormValue([{ id: 1, data: validRow() }]);
    expect(validateRows(values)).toEqual({});
  });

  describe('required fields', () => {
    it('returns error when name is empty', () => {
      const values = buildFormValue([{ id: 1, data: validRow({ name: '' }) }]);
      expect(errors(validateRows(values), 1)?.name).toBe('This field is required');
    });

    it('returns error when name is only whitespace', () => {
      const values = buildFormValue([{ id: 1, data: validRow({ name: '   ' }) }]);
      expect(errors(validateRows(values), 1)?.name).toBe('This field is required');
    });

    it('returns error when email is empty', () => {
      const values = buildFormValue([{ id: 1, data: validRow({ email: '' }) }]);
      expect(errors(validateRows(values), 1)?.email).toBe('This field is required');
    });

    it('returns error when department is empty', () => {
      const values = buildFormValue([{ id: 1, data: validRow({ department: '' }) }]);
      expect(errors(validateRows(values), 1)?.department).toBe('This field is required');
    });

    it('returns error when status is empty', () => {
      const values = buildFormValue([{ id: 1, data: validRow({ status: '' }) }]);
      expect(errors(validateRows(values), 1)?.status).toBe('This field is required');
    });

    it('returns error when salary is empty', () => {
      const values = buildFormValue([{ id: 1, data: validRow({ salary: '' }) }]);
      expect(errors(validateRows(values), 1)?.salary).toBe('This field is required');
    });

    it('returns multiple errors when multiple fields are empty', () => {
      const values = buildFormValue([
        { id: 1, data: validRow({ name: '', email: '', department: '' }) },
      ]);
      const rowErrors = errors(validateRows(values), 1);
      expect(rowErrors?.name).toBe('This field is required');
      expect(rowErrors?.email).toBe('This field is required');
      expect(rowErrors?.department).toBe('This field is required');
    });
  });

  describe('email uniqueness', () => {
    it('returns error when two rows have the same email', () => {
      const values = buildFormValue([
        { id: 1, data: validRow({ email: 'same@example.com' }) },
        { id: 2, data: validRow({ email: 'same@example.com' }) },
      ]);
      const result = validateRows(values);
      expect(errors(result, 1)).toBeUndefined();
      expect(errors(result, 2)?.email).toBe('Email already exists');
    });

    it('is case-insensitive for duplicate emails', () => {
      const values = buildFormValue([
        { id: 1, data: validRow({ email: 'Test@Example.com' }) },
        { id: 2, data: validRow({ email: 'test@example.com' }) },
      ]);
      const result = validateRows(values);
      expect(errors(result, 1)).toBeUndefined();
      expect(errors(result, 2)?.email).toBe('Email already exists');
    });

    it('trims whitespace before comparing emails', () => {
      const values = buildFormValue([
        { id: 1, data: validRow({ email: '  test@example.com  ' }) },
        { id: 2, data: validRow({ email: 'test@example.com' }) },
      ]);
      const result = validateRows(values);
      expect(errors(result, 1)).toBeUndefined();
      expect(errors(result, 2)?.email).toBe('Email already exists');
    });

    it('allows different emails', () => {
      const values = buildFormValue([
        { id: 1, data: validRow({ email: 'alice@example.com' }) },
        { id: 2, data: validRow({ email: 'bob@example.com' }) },
      ]);
      expect(validateRows(values)).toEqual({});
    });
  });

  it('skips rows without data (deleted rows with residue in byId)', () => {
    const values: RowsFormValue = {
      rows: {
        byId: {
          1: validRow(),
          2: undefined as unknown as RowData,
        },
        allIds: [1],
      },
    };
    expect(validateRows(values)).toEqual({});
  });

  it('returns empty errors for empty rows list', () => {
    const values = buildFormValue([]);
    expect(validateRows(values)).toEqual({});
  });
});
