import userReducer, {
    registerUser,
    userActions,
  } from '../userSlice'; 
  import { RequestStatus, TUser } from '@utils-types';
  
  jest.mock('@api', () => ({
    registerUserApi: jest.fn(() => Promise.resolve({ user: { name: 'userName', email: 'test@example.com', password: 'test-password' } })),
    loginUserApi: jest.fn(() => Promise.resolve({ accessToken: 'test-token', refreshToken: 'test-refresh-token', user: { name: 'Test User', email: 'test@example.com', password: 'test-password'  } })),
    getUserApi: jest.fn(() => Promise.resolve({ user: { name: 'userName', email: 'test@example.com', password: 'test-password'  } })),
    logoutApi: jest.fn(() => Promise.resolve()),
    updateUserApi: jest.fn(() => Promise.resolve({ user: { name: 'Updated User', email: 'updated@example.com', password: 'updated-password'  } }))
  }));
  
  interface TUserState {
    isAuthChecked: boolean;
    data: TUser | null;
    requestStatus: RequestStatus;
  }
  
  describe('userSlice reducer', () => {
    const initialState: TUserState = {
      isAuthChecked: false,
      data: null,
      requestStatus: RequestStatus.Idle,
    };
  
    it('начальное состояние', () => {
      expect(userReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  
    it('обработка authCheck', () => {
      const actual = userReducer(initialState, userActions.authCheck());
      expect(actual.isAuthChecked).toEqual(true);
    });
  
    it('обработка userLogout', () => {
      const stateWithData = { ...initialState, data: { name: 'Ксения', email: 'ksusha2993@gmail.com', password: 'password'  } }; 
      const actual = userReducer(stateWithData, userActions.userLogout());
      expect(actual.data).toEqual(null);
    });
  
    it('обработка registerUser.fulfilled', () => {
      const testUser: TUser = { name: 'Ксения', email: 'ksusha2993@gmail.com', password: 'password' };
      const actual = userReducer(initialState, registerUser.fulfilled(testUser, '', {name: 'Ксения', email: 'ksusha2993@gmail.com', password: 'password'}));
      expect(actual.data).toEqual(testUser);
      expect(actual.requestStatus).toBe(RequestStatus.Success);
    });
  });
