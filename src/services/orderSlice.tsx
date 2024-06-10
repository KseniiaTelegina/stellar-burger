import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

type OrderState = {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: any | null;
};

const initialState: OrderState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<TConstructorIngredient>) {
      const ingredient = action.payload;
      if (ingredient.type === 'bun') {
        state.constructorItems.bun = ingredient;
      } else {
        state.constructorItems.ingredients.push(ingredient);
      }
    },
    placeOrderRequest(state) {
      state.orderRequest = true;
    },
    placeOrderSuccess(state, action: PayloadAction<any>) {
      state.orderRequest = false;
      state.orderModalData = action.payload;
    },
    placeOrderFailure(state) {
      state.orderRequest = false;
    },
    closeOrderModal(state) {
      state.orderModalData = null;
    }
  }
});

export const {
  addItem,
  placeOrderRequest,
  placeOrderSuccess,
  placeOrderFailure,
  closeOrderModal
} = orderSlice.actions;

export default orderSlice.reducer;
