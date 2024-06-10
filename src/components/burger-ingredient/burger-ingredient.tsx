// import { FC, memo } from 'react';
// import { useLocation } from 'react-router-dom';

// import { BurgerIngredientUI } from '@ui';
// import { TBurgerIngredientProps } from './type';

// export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
//   ({ ingredient, count }) => {
//     const location = useLocation();

//     const handleAdd = () => {};

//     return (
//       <BurgerIngredientUI
//         ingredient={ingredient}
//         count={count}
//         locationState={{ background: location }}
//         handleAdd={handleAdd}
//       />
//     );
//   }
// );

import React, { FC, memo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleAdd = () => {};

    const handleClick = () => {
      navigate(`/ingredients/${ingredient._id}`, { state: { background: location } });
    };

    return (
      <div onClick={handleClick}>
        <BurgerIngredientUI
          ingredient={ingredient}
          count={count}
          locationState={{ background: location }}
          handleAdd={handleAdd}
        />
      </div>
    );
  }
);

// import React, { FC, memo } from 'react';
//    import { useLocation, useHistory } from 'react-router-dom';
//    import { BurgerIngredientUI } from '@ui';
//    import { TBurgerIngredientProps } from './type';

//    export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
//      ({ ingredient, count }) => {
//        const location = useLocation();
//        const history = useHistory();

//        const handleAdd = () => {};

//        const handleClick = () => {
//          history.push({
//            pathname: `/ingredients/${ingredient._id}`,
//            state: { background: location },
//          });
//        };

//        return (
//          <div onClick={handleClick}>
//            <BurgerIngredientUI
//              ingredient={ingredient}
//              count={count}
//              locationState={{ background: location }}
//              handleAdd={handleAdd}
//            />
//          </div>
//        );
//      }
//    );
