import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { TConstructorIngredient, TIngredient } from "@utils-types";
// import type {TConstructorState} 


interface TConstructorState {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  }

const initialState: TConstructorState = {
    bun: null,
    ingredients: []
};

export const burgerConstructorSlice = createSlice({
    name: 'burgerConstructor',
    initialState,
    reducers: {
        addToBurgerConstructor: {
            prepare: (ingredient: TIngredient) => ({
                payload: {...ingredient, id: crypto.randomUUID()}
            }),
            reducer: (state, {payload}:
                PayloadAction<TConstructorIngredient>) => {
                    if (payload.type === 'bun') {
                        state.bun = payload;
                    } else {
                        state.ingredients.push(payload)
                    }
                }
        },
        removeFromBurgerConstructor: (state, {payload}: PayloadAction<number>) => {
            state.ingredients.splice(payload, 1);
        },
        reorderBurgerConstructor: (state, {payload}: PayloadAction<{from: number; to: number}>) => {
            const { from, to} = payload;
            const ingredients = [...state.ingredients];
            ingredients.splice(to, 0, ingredients.splice(from, 1)[0]);
            state.ingredients =ingredients;
        },
        resetBurgerConstructor: () => initialState
    }
})


export const BurgerConstructorActions = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;

// export const { addToBurgerConstructor, removeFromBurgerConstructor, reorderBurgerConstructor, resetBurgerConstructor } = burgerConstructorSlice.actions;

// export const userSelectors = userSlice.selectors;
