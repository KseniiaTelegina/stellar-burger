import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus } from './ingredientsSlice';
import { TOrder, TOrdersData } from '@utils-types';
import { getOrdersApi } from '@api';

interface TOrderState {
    orders: TOrder[];
    status: RequestStatus;
  }
  
  const initialState: TOrderState = {
    orders: [],
    status: RequestStatus.Idle
  };

  export const getOrders = createAsyncThunk<TOrdersData>(
    'orders/getOrders',
    async () => {
      const response = await getOrdersApi();
      return response;
    }
  );


  export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getOrders.pending, (state) => {
          state.status = RequestStatus.Loading;
        })
        .addCase(
            getOrders.fulfilled,
          (state, action: PayloadAction<TOrdersData>) => {
            state.orders = action.payload.orders;
            state.status = RequestStatus.Success;
          }
        )
        .addCase(getOrders.rejected, (state) => {
          state.status = RequestStatus.Failed;
        });
    }
  });
