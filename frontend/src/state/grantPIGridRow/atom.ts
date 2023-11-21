import { atom } from 'recoil';
import GrantPIGridRow from '../../interfaces/GrantPIGridRow';

export const grantPIGridRowDataListState = atom({
  key: 'grantPIGridRowDataState',
  default: [] as GrantPIGridRow[],
});

export const currentGrantPIGridRowDataState = atom({
  key: 'currentGrantPIGridRowDataState',
  default: null,
})
