import { createAsyncThunk } from '@reduxjs/toolkit';
import { grantListEndpoint } from '../../constants/endpoints'

export const fetchGrants = createAsyncThunk('grant/fetchGrants', async () => {
  const response = await fetch(grantListEndpoint);
  if (!response.ok) {
    throw new Error('Failed to fetch grant data');
  }
  const data = await response.json();
  return data;
});