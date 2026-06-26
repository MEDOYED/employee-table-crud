import { AllCommunityModule, themeQuartz, type GetRowIdParams } from 'ag-grid-community';
import type { Row } from '../types';

export const gridModules = [AllCommunityModule];
export const gridTheme = themeQuartz;
export const getRowId = (params: GetRowIdParams<Row>) => String(params.data.id);
