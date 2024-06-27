import userReducer, {
    registerUser,
    loginUser,
    checkUserAuth,
    updateUser,
    logoutUser,
    userActions
  } from '../userSlice'; 
import { RequestStatus, TUser } from '@utils-types';
  
jest.mock('@api', () => ({
  registerUserApi: jest.fn(),
  loginUserApi: jest.fn(),
  getUserApi: jest.fn(),
  logoutApi: jest.fn(),
  updateUserApi: jest.fn()
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
  
  test('начальное состояние', () => {
    expect(userReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });
  
  test('обработка authCheck', () => {
    const actual = userReducer(initialState, userActions.authCheck());
    expect(actual.isAuthChecked).toEqual(true);
  });
  
  test('обработка userLogout', () => {
    const stateWithData = { ...initialState, data: { name: 'Ксения', email: 'ksusha2993@gmail.com', password: 'password' } }; 
    const actual = userReducer(stateWithData, userActions.userLogout());
    expect(actual.data).toEqual(null);
  });
  
  describe('Асинхронные действия', () => {
    const testUser: TUser = { name: 'Ксения', email: 'ksusha2993@gmail.com', password: 'password' };
    const updatedUser: TUser = { name: 'Updated User', email: 'updated@example.com', password: 'updated-password' };
  
    test('обработка registerUser.fulfilled', () => {
      const actual = userReducer(initialState, registerUser.fulfilled(testUser, '', { name: 'Ксения', email: 'ksusha2993@gmail.com', password: 'password' }));
      expect(actual.data).toEqual(testUser);
      expect(actual.requestStatus).toBe(RequestStatus.Success);
    });
  
    test('обработка registerUser.pending', () => {
      const actual = userReducer(
        initialState, 
        registerUser.pending('', { name: 'Test', email: 'test@example.com', password: 'password123' })
      );
      expect(actual.requestStatus).toBe(RequestStatus.Loading);
    });
  
    test('обработка registerUser.rejected', () => {
      const actual = userReducer(initialState, registerUser.rejected(new Error('Ошибка регистрации'), '', { name: 'Test', email: 'test@example.com', password: 'password123' }));
      expect(actual.requestStatus).toBe(RequestStatus.Failed);
    });
  
    test('обработка loginUser.fulfilled', () => {
      const actual = userReducer(initialState, loginUser.fulfilled(testUser, '', { email: 'ksusha2993@gmail.com', password: 'password' }));
      expect(actual.data).toEqual(testUser);
      expect(actual.requestStatus).toBe(RequestStatus.Success);
    });
  
    test('обработка loginUser.pending', () => {
      const actual = userReducer(initialState, loginUser.pending('', { email: 'test@example.com', password: 'password123' }));
      expect(actual.requestStatus).toBe(RequestStatus.Loading);
    });
  
    test('обработка loginUser.rejected', () => {
      const actual = userReducer(initialState, loginUser.rejected(new Error('Ошибка входа'), '', { email: 'test@example.com', password: 'password123' }));
      expect(actual.requestStatus).toBe(RequestStatus.Failed);
    });
  
    test('обработка checkUserAuth.fulfilled', () => {
      const actual = userReducer(initialState, checkUserAuth.fulfilled(testUser, ''));
      expect(actual.data).toEqual(testUser);
      expect(actual.requestStatus).toBe(RequestStatus.Success);
    });
  
    test('обработка checkUserAuth.pending', () => {
      const actual = userReducer(initialState, checkUserAuth.pending('', undefined));
      expect(actual.requestStatus).toBe(RequestStatus.Loading);
    });
  
    test('обработка checkUserAuth.rejected', () => {
      const actual = userReducer(initialState, checkUserAuth.rejected(new Error('Ошибка проверки аутентификации'), '', undefined));
      expect(actual.requestStatus).toBe(RequestStatus.Failed);
    });

    test('обработка updateUser.fulfilled', () => {
      const stateWithData = { ...initialState, data: testUser };
      const actual = userReducer(stateWithData, updateUser.fulfilled(updatedUser, '', { name: 'Updated User', email: 'updated@example.com', password: 'updated-password'  }));
      expect(actual.data).toEqual(updatedUser);
      expect(actual.requestStatus).toBe(RequestStatus.Success);
    });

    test('обработка updateUser.pending', () => {
      const actual = userReducer(initialState, updateUser.pending('', { name: 'Updated Name' }));
      expect(actual.requestStatus).toBe(RequestStatus.Loading);
    });

    test('обработка updateUser.rejected', () => {
      const actual = userReducer(initialState, updateUser.rejected(new Error('Ошибка обновления пользователя'), '', { name: 'Updated Name' }));
      expect(actual.requestStatus).toBe(RequestStatus.Failed);
    });

    test('обработка logoutUser.fulfilled', () => {
      const stateWithData = { ...initialState, data: testUser };
      const actual = userReducer(stateWithData, userActions.userLogout());
      expect(actual.data).toBeNull();
      expect(actual.requestStatus).toBe(RequestStatus.Idle);
    });
  
    test('обработка logoutUser.pending', () => {
      const actual = userReducer(initialState, logoutUser.pending('', undefined));
      expect(actual.requestStatus).toBe(RequestStatus.Loading);
    });
  
    test('обработка logoutUser.rejected', () => {
      const actual = userReducer(initialState, logoutUser.rejected(new Error('Ошибка выхода'), '', undefined));
      expect(actual.requestStatus).toBe(RequestStatus.Failed);
    });
  });
});
