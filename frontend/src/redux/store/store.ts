import { configureStore } from '@reduxjs/toolkit';
import grantReducer from '../features/grantSlice';

// Import other slice reducers and their state types as needed

const rootReducer = {
  grant: grantReducer,
  // Add other slice reducers here
};

export type RootState = {
  grant: ReturnType<typeof grantReducer>;
  // Add other slice state types here
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
