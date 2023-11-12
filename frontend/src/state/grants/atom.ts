import { atom } from 'recoil';
import GrantData from '../../interfaces/GrantData';

export const grantDataListState = atom({
  key: 'grantDataState',
  default: [] as GrantData[],
});

export const currentGrantDataState = atom({
  key: 'currentGrantDataState',
  default: null,
})
