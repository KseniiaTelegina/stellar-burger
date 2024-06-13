import React, { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useDispatch } from '../../services/store';
// import { addToBurgerConstructor } from '../../services/burgerConstructorSlice';
import { BurgerConstructorActions } from '../../services/burgerConstructorSlice';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const handleAdd = () => {
      dispatch(BurgerConstructorActions.addToBurgerConstructor(ingredient));
      console.log('ингредиент выбран', ingredient);
    };

    return (
        <BurgerIngredientUI
          ingredient={ingredient}
          count={count}
          locationState={{ background: location }}
          handleAdd={handleAdd}
        />
    );
  }
);

// import React, { FC, memo } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// import { BurgerIngredientUI } from '@ui';
// import { TBurgerIngredientProps } from './type';
// import { useDispatch } from '../../services/store';
// import { addToBurgerConstructor } from '../../services/burgerConstructorSlice';

// export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
//   ({ ingredient, count }) => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
    
//     const handleAdd = () => {
//       e.stopPropagation();  // Остановить всплытие события клика
//       dispatch(addToBurgerConstructor(ingredient));
//       console.log('Ингредиент выбран');
//     };

//     const handleClick = () => {
//       navigate(`/ingredients/${ingredient._id}`, {
//         state: { background: location }
//       });
//     };

//     return (
//       <div>
//         <BurgerIngredientUI
//           ingredient={ingredient}
//           count={count}
//           locationState={{ background: location }}
//           handleAdd={handleAdd}
//           handleClick={handleClick}
//         />
//       </div>
//     );
//   }
// );
