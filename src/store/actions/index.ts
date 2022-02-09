import { createAction } from '@reduxjs/toolkit';

import { RootState } from '../types';

export const resetData = createAction('reset');

export const importData = createAction<{ state: RootState }>('import');
