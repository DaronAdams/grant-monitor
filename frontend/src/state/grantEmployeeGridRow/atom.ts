import { atom } from 'recoil';
import GrantEmployeeGridRow from '../../interfaces/GrantEmployeeGridRow';

export const grantEmployeeGridRowDataListState = atom({
  key: 'grantEmployeeGridRowDataState',
  default: [] as GrantEmployeeGridRow[],
});

export const currentGrantEmployeeGridRowDataState = atom({
  key: 'currentGrantEmployeeGridRowDataState',
  default: null,
})
