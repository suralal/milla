import { CoreState } from '../reducers';
import { createFeatureSelector } from '@ngrx/store';

export const selectCoreState = createFeatureSelector<CoreState>('core');
