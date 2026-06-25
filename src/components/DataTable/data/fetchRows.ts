import { Row } from '../types';
import { createInitialRows } from './data';

export function fetchRows(): Promise<Row[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(createInitialRows());
    }, 300);
  });
}
