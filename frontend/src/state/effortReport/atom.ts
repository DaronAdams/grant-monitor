import { atom } from 'recoil';
import EffortReportRow from '../../interfaces/effortReportRow';

export const effortReportState = atom({
  key: 'effortReportState',
  default: [] as EffortReportRow[],
});

export const currentEffortReportState = atom({
  key: 'currentEffortReportState',
  default: null,
})
