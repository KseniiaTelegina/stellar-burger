import { configureStore } from '@reduxjs/toolkit';
import { ingredientsSlice } from './slices/ingredientsSlice';
import { userSlice } from './slices/userSlice';
import { burgerConstructorSlice } from './slices/burgerConstructorSlice';
import { feedSlice } from './slices/feedSlice';
import { ordersSlice } from './slices/ordersSlice';
import { orderSlice } from './slices/orderSlice';
import { rootReducer } from './store';

const initialRootState = {
    [ingredientsSlice.name]: ingredientsSlice.getInitialState(),
    [userSlice.name]: userSlice.getInitialState(),
    [burgerConstructorSlice.name]: burgerConstructorSlice.getInitialState(),
    [feedSlice.name]: feedSlice.getInitialState(),
    [ordersSlice.name]: ordersSlice.getInitialState(),
    [orderSlice.name]: orderSlice.getInitialState(),
  };
  
  describe('rootReducer', () => {
    it('должен правильно объединять состояния различных редюсеров', () => {
        // Пример действия и ожидания
        const action = { type: 'SOME_ACTION' };
        
        // Получаем итоговое состояние после применения действия к rootReducer
        const state = rootReducer(initialRootState, action);
    
        // Ожидаем, что состояние каждого slice остается прежним, так как нет обработчиков для ACTION_1
        expect(state).toEqual(initialRootState);
      });

    it('должен правильно инициализировать начальное состояние', () => {
      // Создаем store с помощью rootReducer
      const store = configureStore({ reducer: rootReducer });
  
      // Получаем текущее состояние store
      const state = store.getState();
  
      // Ожидаем, что текущее состояние совпадает с ожидаемым начальным состоянием
      expect(state).toEqual(initialRootState);
    });
});
