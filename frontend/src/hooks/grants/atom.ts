import { atom, selector } from 'recoil';
import GrantData from '../../interfaces/GrantData';
import { grantListEndpoint } from '../../constants/endpoints';
import axios from 'axios';

export const grantDataState = atom({
  key: 'grantDataState',
  default: [] as GrantData[],
});

export const fetchGrantDataList = selector({
  key: 'fetchGrantDataList',
  get: async () => {
    const response = await axios.get(grantListEndpoint);
    return response.data.grants;
  },
});