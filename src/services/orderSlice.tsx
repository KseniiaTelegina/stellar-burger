import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus } from './ingredientsSlice';
import { TOrder, TOrdersData } from '@utils-types';
import { getOrderByNumberApi } from '@api';

interface TOrderState {
  info: TOrder | null;
  status: RequestStatus;
}

const initialState: TOrderState = {
  info: null,
  status: RequestStatus.Idle
};

// export const getOrder = createAsyncThunk<TOrder, number>(
//   'order/getOrder',
//   async (number: number) => {
//     const response = await getOrderByNumberApi(number);
//     return response.orders;
//   }
// );
export const getOrder = createAsyncThunk<TOrder, number>(
    'order/getOrder',
    async (number: number) => {
      const response = await getOrderByNumberApi(number);
      if (response && response.success && response.orders.length > 0) {
        return response.orders[0];
      } else {
        throw new Error('Заказ не найден');
      }
    }
  );

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getOrder.pending, (state) => {
          state.status = RequestStatus.Loading;
        })
        .addCase(
          getOrder.fulfilled,
          (state, action: PayloadAction<TOrder>) => {
            state.info = action.payload;
            state.status = RequestStatus.Success;
          }
        )
        .addCase(getOrder.rejected, (state) => {
          state.status = RequestStatus.Failed;
        });
    }
  });

export const OrderActions = orderSlice.actions;
export default orderSlice.reducer;
