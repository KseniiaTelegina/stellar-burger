// import userReducer, {
//     registerUser,
//     userActions,
//   } from '../userSlice'; 
//   import { RequestStatus, TUser } from '@utils-types';
  
//   jest.mock('@api', () => ({
//     registerUserApi: jest.fn(() => Promise.resolve({ user: { name: 'userName', email: 'test@example.com', password: 'test-password' } })),
//     loginUserApi: jest.fn(() => Promise.resolve({ accessToken: 'test-token', refreshToken: 'test-refresh-token', user: { name: 'Test User', email: 'test@example.com', password: 'test-password'  } })),
//     getUserApi: jest.fn(() => Promise.resolve({ user: { name: 'userName', email: 'test@example.com', password: 'test-password'  } })),
//     logoutApi: jest.fn(() => Promise.resolve()),
//     updateUserApi: jest.fn(() => Promise.resolve({ user: { name: 'Updated User', email: 'updated@example.com', password: 'updated-password'  } }))
//   }));
  
//   interface TUserState {
//     isAuthChecked: boolean;
//     data: TUser | null;
//     requestStatus: RequestStatus;
//   }
  
//   describe('userSlice reducer', () => {
//     const initialState: TUserState = {
//       isAuthChecked: false,
//       data: null,
//       requestStatus: RequestStatus.Idle,
//     };
  
//     it('начальное состояние', () => {
//       expect(userReducer(undefined, { type: 'unknown' })).toEqual(initialState);
//     });
  
//     it('обработка authCheck', () => {
//       const actual = userReducer(initialState, userActions.authCheck());
//       expect(actual.isAuthChecked).toEqual(true);
//     });
  
//     it('обработка userLogout', () => {
//       const stateWithData = { ...initialState, data: { name: 'Ксения', email: 'ksusha2993@gmail.com', password: 'password'  } }; 
//       const actual = userReducer(stateWithData, userActions.userLogout());
//       expect(actual.data).toEqual(null);
//     });
  
//     it('обработка registerUser.fulfilled', () => {
//       const testUser: TUser = { name: 'Ксения', email: 'ksusha2993@gmail.com', password: 'password' };
//       const actual = userReducer(initialState, registerUser.fulfilled(testUser, '', {name: 'Ксения', email: 'ksusha2993@gmail.com', password: 'password'}));
//       expect(actual.data).toEqual(testUser);
//       expect(actual.requestStatus).toBe(RequestStatus.Success);
//     });
//   });

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
  
    it('начальное состояние', () => {
      expect(userReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  
    it('обработка authCheck', () => {
      const actual = userReducer(initialState, userActions.authCheck());
      expect(actual.isAuthChecked).toEqual(true);
    });
  
    it('обработка userLogout', () => {
      const stateWithData = { ...initialState, data: { name: 'Ксения', email: 'ksusha2993@gmail.com', password: 'password' } }; 
      const actual = userReducer(stateWithData, userActions.userLogout());
      expect(actual.data).toEqual(null);
    });
  
    describe('Асинхронные действия', () => {
      const testUser: TUser = { name: 'Ксения', email: 'ksusha2993@gmail.com', password: 'password' };
      const updatedUser: TUser = { name: 'Updated User', email: 'updated@example.com', password: 'updated-password' };
  
      it('обработка registerUser.fulfilled', () => {
        const actual = userReducer(initialState, registerUser.fulfilled(testUser, '', { name: 'Ксения', email: 'ksusha2993@gmail.com', password: 'password' }));
        expect(actual.data).toEqual(testUser);
        expect(actual.requestStatus).toBe(RequestStatus.Success);
      });
  
    //   it('обработка registerUser.pending', () => {
    //     const actual = userReducer(initialState, registerUser.pending('', undefined, {}));
    //     expect(actual.requestStatus).toBe(RequestStatus.Loading);
    //   });
      it('обработка registerUser.pending', () => {
        const actual = userReducer(
        initialState, 
        registerUser.pending('', { name: 'Test', email: 'test@example.com', password: 'password123' })
        );
      expect(actual.requestStatus).toBe(RequestStatus.Loading);
      });
  
      it('обработка registerUser.rejected', () => {
        const actual = userReducer(initialState, registerUser.rejected(null, '', {name: 'Updated User', email: 'updated@example.com', password: 'updated-password'}));
        expect(actual.requestStatus).toBe(RequestStatus.Failed);
      });
  
      it('обработка loginUser.fulfilled', () => {
        const actual = userReducer(initialState, loginUser.fulfilled(testUser, '', { email: 'ksusha2993@gmail.com', password: 'password' }));
        expect(actual.data).toEqual(testUser);
        expect(actual.requestStatus).toBe(RequestStatus.Success);
      });

      it('обработка loginUser.pending', () => {
        const actual = userReducer(initialState, loginUser.pending('', { email: 'test@example.com', password: 'password123' }));
        expect(actual.requestStatus).toBe(RequestStatus.Loading);
      });
  
    //   it('обработка loginUser.pending', () => {
    //     const actual = userReducer(initialState, loginUser.pending('', undefined, {}));
    //     expect(actual.requestStatus).toBe(RequestStatus.Loading);
    //   });
  
      it('обработка loginUser.rejected', () => {
        const actual = userReducer(initialState, loginUser.rejected(null, '', { email: 'updated@example.com', password: 'updated-password'}));
        expect(actual.requestStatus).toBe(RequestStatus.Failed);
      });
  
      it('обработка checkUserAuth.fulfilled', () => {
        const actual = userReducer(initialState, checkUserAuth.fulfilled(testUser, ''));
        expect(actual.data).toEqual(testUser);
        expect(actual.requestStatus).toBe(RequestStatus.Success);
      });
  
      it('обработка checkUserAuth.pending', () => {
        const actual = userReducer(initialState, checkUserAuth.pending('', undefined, {}));
        expect(actual.requestStatus).toBe(RequestStatus.Loading);
      });
  
      it('обработка checkUserAuth.rejected', () => {
        const actual = userReducer(initialState, checkUserAuth.rejected(null, ''));
        expect(actual.requestStatus).toBe(RequestStatus.Failed);
      });
  
      it('обработка updateUser.fulfilled', () => {
        const stateWithData = { ...initialState, data: testUser };
        const actual = userReducer(stateWithData, updateUser.fulfilled(updatedUser, '', { name: 'Updated User', email: 'updated@example.com', password: 'updated-password'  }));
        expect(actual.data).toEqual(updatedUser);
        expect(actual.requestStatus).toBe(RequestStatus.Success);
      });

      it('обработка updateUser.pending', () => {
        const actual = userReducer(initialState, updateUser.pending('', { name: 'Updated Name' })); // Передаем частичные данные
        expect(actual.requestStatus).toBe(RequestStatus.Loading);
      });
  
    //   it('обработка updateUser.pending', () => {
    //     const actual = userReducer(initialState, updateUser.pending('', undefined, {}));
    //     expect(actual.requestStatus).toBe(RequestStatus.Loading);
    //   });
  
      it('обработка updateUser.rejected', () => {
        const actual = userReducer(initialState, updateUser.rejected(null, '', {}));
        expect(actual.requestStatus).toBe(RequestStatus.Failed);
      });
  
      it('обработка logoutUser.fulfilled', () => {
        const stateWithData = { ...initialState, data: testUser };
        const actual = userReducer(stateWithData, logoutUser.fulfilled(undefined, '', undefined)); 
        expect(actual.data).toEqual(null);
        expect(actual.requestStatus).toBe(RequestStatus.Success);
      });
  
      it('обработка logoutUser.pending', () => {
        const actual = userReducer(initialState, logoutUser.pending('', undefined, {}));
        expect(actual.requestStatus).toBe(RequestStatus.Loading);
      });
  
      it('обработка logoutUser.rejected', () => {
        const actual = userReducer(initialState, logoutUser.rejected(null, ''));
        expect(actual.requestStatus).toBe(RequestStatus.Failed);
      });
    });
  });
