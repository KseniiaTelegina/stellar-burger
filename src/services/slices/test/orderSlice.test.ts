import { RequestStatus, TOrder } from '@utils-types';
import { getOrderByNumberApi } from '@api';
import orderReducer, { getOrder } from '../orderSlice';
import { configureStore } from '@reduxjs/toolkit';

interface TOrderState {
    info: TOrder | null;
    status: RequestStatus;
  }
  
  const initialState: TOrderState = {
    info: null,
    status: RequestStatus.Idle
  };

jest.mock('@api', () => ({
    getOrderByNumberApi: jest.fn()
  }));
  
  const mockGetOrderByNumberApi = getOrderByNumberApi as jest.MockedFunction<typeof getOrderByNumberApi>;
  
  const mockOrder: TOrder = {
    _id: 'order-id',
    status: 'done',
    name: 'Test Order',
    createdAt: '2024-07-01T00:00:00.000Z',
    updatedAt: '2024-07-01T00:00:00.000Z',
    number: 123,
    ingredients: ['ingredient1', 'ingredient2']
  };
  
  describe('orderSlice', () => {
    beforeEach(() => {
      mockGetOrderByNumberApi.mockReset();
    });
  
    describe('reducer', () => {
      it('вернуть начальное состояние', () => {
        expect(orderReducer(undefined, { type: 'unknown' })).toEqual(initialState);
      });
  
      it('обработка getOrder.pending', () => {
        const action = { type: getOrder.pending.type };
        const state = orderReducer(initialState, action);
        expect(state).toEqual({ ...initialState, status: RequestStatus.Loading });
      });
  
      it('обработка getOrder.fulfilled', () => {
        const action = {
          type: getOrder.fulfilled.type,
          payload: mockOrder
        };
        const state = orderReducer(initialState, action);
        expect(state).toEqual({ ...initialState, info: action.payload, status: RequestStatus.Success });
      });
  
      it('обработка getOrder.rejected', () => {
        const action = { type: getOrder.rejected.type };
        const state = orderReducer(initialState, action);
        expect(state).toEqual({ ...initialState, status: RequestStatus.Failed });
      });
    });
  
    describe('async thunk', () => {
        const createOrderSliceTestStore = () => {
          return configureStore({
            reducer: {
              order: orderReducer
            }
          });
        };
    
        beforeEach(() => {
          mockGetOrderByNumberApi.mockReset();
        });
    
        it('успешное выполнение getOrder', async () => {
          mockGetOrderByNumberApi.mockResolvedValue({ success: true, orders: [mockOrder] });
    
          const store = createOrderSliceTestStore();
          await store.dispatch(getOrder(123) as any);
          const state = store.getState().order;
    
          expect(state.info).toEqual(mockOrder);
          expect(state.status).toBe(RequestStatus.Success);
        });
    
        it('Ошибка в выполнении getOrder', async () => {
          mockGetOrderByNumberApi.mockRejectedValue(new Error('Failed to fetch'));
    
          const store = createOrderSliceTestStore();
          await store.dispatch(getOrder(123) as any);
          const state = store.getState().order;
    
          expect(state.info).toBeNull();
          expect(state.status).toBe(RequestStatus.Failed);
        });
      });
    });
