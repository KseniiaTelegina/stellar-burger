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
      navigate(`/ingredients/${ingredient._id}`, {
        state: { background: location }
      });
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
