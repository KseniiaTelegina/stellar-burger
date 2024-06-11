import { RootState } from './store';
import { useSelector } from './store';

export const isAuthCheckedSelector = (state: RootState) =>
  state.auth.isAuthChecked;

export const userDataSelector = (state: RootState) => state.auth.user;
