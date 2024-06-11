import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { registerUserApi, loginUserApi, getUserApi } from '@api';

interface UserState {
  name: string;
  email: string;
  password: string;
}

const initialState: UserState = {
  name: '',
  email: '',
  password: ''
};

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user: { name: string; email: string; password: string }) => {
    const response = await registerUserApi(user);
    return response.user;
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (user: { email: string; password: string }) => {
    const response = await loginUserApi(user);
    return response.user;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser(
      state,
      action: PayloadAction<{ name: string; email: string; password: string }>
    ) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.password = action.payload.password;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.password = action.payload.password;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.password = action.payload.password;
    });
  }
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
