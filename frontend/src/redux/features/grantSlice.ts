import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import GrantData from '../../interfaces/GrantData'; // Import your GrantData interface

export interface GrantState {
  grants: GrantData[];
  selectedGrant: GrantData | null;
}

const initialState: GrantState = {
  grants: [],
  selectedGrant: null,
};

const grantSlice = createSlice({
  name: 'grant',
  initialState,
  reducers: {
    addGrant: (state, action: PayloadAction<GrantData>) => {
      state.grants.push(action.payload);
    },
    updateGrant: (state, action: PayloadAction<GrantData>) => {
      const updatedGrant = action.payload;
      const grantIndex = state.grants.findIndex((grant) => grant.id === updatedGrant.id);
      if (grantIndex !== -1) {
        state.grants[grantIndex] = updatedGrant;
      }
    },
    selectGrant: (state, action: PayloadAction<number>) => {
      state.selectedGrant = state.grants.find((grant) => grant.id === action.payload) || null;
    },
    removeGrant: (state, action: PayloadAction<number>) => {
      state.grants = state.grants.filter((grant) => grant.id !== action.payload);
      if (state.selectedGrant?.id === action.payload) {
        state.selectedGrant = null;
      }
    },
  },
});

export const { addGrant, updateGrant, selectGrant, removeGrant } = grantSlice.actions;

export default grantSlice.reducer;
