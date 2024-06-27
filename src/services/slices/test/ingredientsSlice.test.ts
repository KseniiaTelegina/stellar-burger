import { RequestStatus, TIngredient } from '@utils-types';
import ingredientsReducer, { getIngredients } from '../ingredientsSlice';

type TIngredientState = {
        data: TIngredient[];
        status: RequestStatus;
      };
  
  global.fetch = jest.fn();
  const mockUrl = 'https://example.com/api/ingredients';
  process.env.REACT_APP_API_URL = mockUrl; 
  
  describe('ingredientsSlice reducer', () => {
    const initialState: TIngredientState = {
      data: [],
      status: RequestStatus.Idle
    };
  
    it('должен обрабатывать начальное состояние', () => {
      expect(ingredientsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  
    it('должен обрабатывать getIngredients.pending', () => {
        const action = getIngredients.pending('', undefined, {});
        const actual = ingredientsReducer(initialState, action); 
        expect(actual.status).toBe(RequestStatus.Loading);
      });
  
    it('должен обрабатывать getIngredients.fulfilled', async () => {
      const mockIngredients: TIngredient[] = [
        { _id: '1', name: 'Ingredient 1', type: 'bun', proteins: 10, fat: 5, carbohydrates: 20, calories: 200, price: 10, image: 'image1.jpg', image_large: 'image1_large.jpg', image_mobile: 'image1_mobile.jpg' },
        { _id: '2', name: 'Ingredient 2', type: 'sauce', proteins: 2, fat: 1, carbohydrates: 5, calories: 50, price: 5, image: 'image2.jpg', image_large: 'image2_large.jpg', image_mobile: 'image2_mobile.jpg' }
      ];
  
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, data: mockIngredients })
      });

      const action = getIngredients.fulfilled(mockIngredients, '', undefined);

      const actual = await ingredientsReducer(initialState, action);
  
      expect(actual.status).toBe(RequestStatus.Success);
      expect(actual.data).toEqual(mockIngredients);
    });
  
    it('должен обрабатывать getIngredients.rejected', async () => {
        (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Ошибка'));
      
        const action = getIngredients.rejected(null, ''); 
      
        const actual = await ingredientsReducer(initialState, action);
      
        expect(actual.status).toBe(RequestStatus.Failed);
      });
  });
  
  
//   type TIngredientState = {
//     data: TIngredient[];
//     status: RequestStatus;
//   };
  
  
//   // Мокируем API-запрос
//   jest.mock('@api', () => ({
//     getIngredientsApi: jest.fn(() => Promise.resolve([
//       { _id: '1', name: 'Ingredient 1', type: 'bun', "proteins": 80,  "fat": 24, "carbohydrates": 53,
//         "calories": 420, "price": 1255, "image": "https://code.s3.yandex.net/react/code/bun-02.png",
//         "image_large": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
//         "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-large.png"},
//       { _id: '2', name: 'Ingredient 2', type: 'sauce', "proteins": 60,  "fat": 20, "carbohydrates": 63,
//         "calories": 450, "price": 45, "image": "https://code.s3.yandex.net/react/code/sauce-02.png",
//         "image_large": "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
//         "image_mobile": "https://code.s3.yandex.net/react/code/sauce-02-large.png"} 
//     ])) 
//   }));
  
//   describe('ingredientsSlice reducer', () => {
//     const initialState: TIngredientState = {
//       data: [],
//       status: RequestStatus.Idle
//     };
  
//     it('должен обрабатывать начальное состояние', () => {
//       expect(ingredientsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
//     });
  
//     it('должен обрабатывать getIngredients.pending', () => {
//       const actual = ingredientsReducer(initialState, getIngredients.pending(undefined, '', {}));
//       expect(actual.status).toBe(RequestStatus.Loading);
//     });

//     it('должен обрабатывать getIngredients.fulfilled', () => {
//       const mockIngredients: TIngredient[] = [ 
//         { _id: '1', name: 'Ingredient 1', type: 'bun', "proteins": 80,  "fat": 24, "carbohydrates": 53,
//            "calories": 420, "price": 1255, "image": "https://code.s3.yandex.net/react/code/bun-02.png",
//            "image_large": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
//            "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-large.png"},
//         { _id: '2', name: 'Ingredient 2', type: 'sauce', "proteins": 60,  "fat": 20, "carbohydrates": 63,
//             "calories": 450, "price": 45, "image": "https://code.s3.yandex.net/react/code/sauce-02.png",
//             "image_large": "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
//             "image_mobile": "https://code.s3.yandex.net/react/code/sauce-02-large.png"} 
//       ];
//       const actual = ingredientsReducer(initialState, getIngredients.fulfilled(mockIngredients, '', {}));
//       expect(actual.status).toBe(RequestStatus.Success);
//       expect(actual.data).toEqual(mockIngredients); 
//     });
  
//     it('должен обрабатывать getIngredients.rejected', () => {
//       const actual = ingredientsReducer(initialState, getIngredients.rejected(null, '', {}));
//       expect(actual.status).toBe(RequestStatus.Failed);
//       // Вы также можете проверить, сохраняется ли сообщение об ошибке,
//       // но это зависит от вашей конкретной реализации
//     });
//   });
