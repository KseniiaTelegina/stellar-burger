import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthState = {
  isAuthChecked: boolean;
  user: User | null;
};

const initialState: AuthState = {
  isAuthChecked: false,
  user: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthChecked(state) {
      state.isAuthChecked = true;
    },
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    }
  }
});

export const { setAuthChecked, setUser } = authSlice.actions;
export default authSlice.reducer;
