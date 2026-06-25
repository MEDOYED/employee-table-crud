import { Row } from '../types';
import { DEPARTMENTS, STATUSES } from './constants';

export function createInitialRows(): Row[] {
  return Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    name: `User ${index + 1}`,
    email: `user${index + 1}@example.com`,
    department: DEPARTMENTS[index % DEPARTMENTS.length],
    status: STATUSES[index % STATUSES.length],
    salary: `$${(30000 + index * 500).toLocaleString('en-US')}`,
  }));
}
