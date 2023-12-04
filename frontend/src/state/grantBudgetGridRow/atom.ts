import { atom } from 'recoil';
import GrantBudgetGridRow from '../../interfaces/GrantBudgetGridRow';

export const grantBudgetGridRowDataListState = atom({
  key: 'grantBudgetGridRowDataState',
  default: [] as GrantBudgetGridRow[],
});

export const currentGrantBudgetGridRowDataState = atom({
  key: 'currentGrantBudgetGridRowDataState',
  default: null,
})