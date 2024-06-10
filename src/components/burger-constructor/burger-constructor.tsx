import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from '../../services/store';
import { RootState } from '../../services/store';
// import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  // const navigate = useNavigate();
  const constructorItems = useSelector(
    (state: RootState) => state.order.constructorItems
  );
  const orderRequest = useSelector(
    (state: RootState) => state.order.orderRequest
  );
  const orderModalData = useSelector(
    (state: RootState) => state.order.orderModalData
  );

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
  };
  const closeOrderModal = () => {};

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  // const onIngredientClick = (id: string) => {
  //   navigate(`/ingredients/${id}`, { state: { backgroundLocation: location } });
  // };

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
      // onIngredientClick={onIngredientClick}
    />
  );
};

/** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
// const constructorItems = {
//   bun: {
//     price: 0
//   },
//   ingredients: []
// };

// const orderRequest = false;

// const orderModalData = null;
