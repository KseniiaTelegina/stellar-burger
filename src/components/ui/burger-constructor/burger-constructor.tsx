import React, { FC } from 'react';
import {
  Button,
  ConstructorElement,
  CurrencyIcon
} from '@zlden/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { BurgerConstructorUIProps } from './type';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorElement, Modal } from '@components';
import { Preloader, OrderDetailsUI } from '@ui';

// export const BurgerConstructorUI: FC<BurgerConstructorUIProps> = ({
//   constructorItems,
//   orderRequest,
//   price,
//   orderModalData,
//   onOrderClick,
//   closeOrderModal
// }) => {
//   return (
//       <section className={styles.burger_constructor}>
//           {constructorItems.bun ? (
//               <div className={`${styles.element} mb-4 mr-4`}>
//                   <ConstructorElement
//                       type="top"
//                       isLocked
//                       text={`${constructorItems.bun.name} (верх)`}
//                       price={constructorItems.bun.price}
//                       thumbnail={constructorItems.bun.image}
//                       data-cy="constructor-bun-1"
//                   />
//               </div>
//           ) : (
//               <div className={`${styles.noBuns} ${styles.noBunsTop} ml-8 mb-4 mr-5 text text_type_main-default`}>
//                   Выберите булки
//               </div>
//           )}

//           <ul className={styles.elements}>
//               {constructorItems.ingredients.length > 0 ? (
//                   constructorItems.ingredients.map((item, index) => (
//                       <BurgerConstructorElement
//                           ingredient={item}
//                           index={index}
//                           totalItems={constructorItems.ingredients.length}
//                           key={item.id}
//                           data-cy="constructor-item"
//                       />
//                   ))
//               ) : (
//                   <div className={`${styles.noBuns} ml-8 mb-4 mr-5 text text_type_main-default`}>
//                       Выберите начинку
//                   </div>
//               )}
//           </ul>

//           {constructorItems.bun ? (
//               <div className={`${styles.element} mt-4 mr-4`}>
//                   <ConstructorElement
//                       type="bottom"
//                       isLocked
//                       text={`${constructorItems.bun.name} (низ)`}
//                       price={constructorItems.bun.price}
//                       thumbnail={constructorItems.bun.image}
//                       data-cy="constructor-bun-2"
//                   />
//               </div>
//           ) : (
//               <div className={`${styles.noBuns} ${styles.noBunsBottom} ml-8 mb-4 mr-5 text text_type_main-default`}>
//                   Выберите булки
//               </div>
//           )}

//           <div className={`${styles.total} mt-10 mr-4`}>
//               <div className={`${styles.cost} mr-10`}>
//                   <p className={`text ${styles.text} mr-2`}>{price}</p>
//                   <CurrencyIcon type="primary" />
//               </div>
//               <Button
//                   htmlType="button"
//                   type="primary"
//                   size="large"
//                   children="Оформить заказ"
//                   onClick={onOrderClick}
//               />
//           </div>

//           {orderRequest && (
//               <Modal onClose={closeOrderModal} title="Оформляем заказ...">
//                   <Preloader />
//               </Modal>
//           )}

//           {orderModalData && (
//               <Modal onClose={closeOrderModal} title={orderRequest ? 'Оформляем заказ...' : ''}>
//                   <OrderDetailsUI orderNumber={orderModalData.number} />
//               </Modal>
//           )}
//       </section>
//   );
// };
export const BurgerConstructorUI: FC<BurgerConstructorUIProps> = ({
  constructorItems,
  orderRequest,
  price,
  orderModalData,
  onOrderClick,
  closeOrderModal
}) => (
  <section className={styles.burger_constructor}>
    {constructorItems.bun ? (
      <div className={`${styles.element} mb-4 mr-4`}>
        <ConstructorElement
          type='top'
          isLocked
          text={`${constructorItems.bun.name} (верх)`}
          price={constructorItems.bun.price}
          thumbnail={constructorItems.bun.image}
          data-cy='constructor-bun-1'
        />
      </div>
    ) : (
      <div
        className={`${styles.noBuns} ${styles.noBunsTop} ml-8 mb-4 mr-5 text text_type_main-default`}
      >
        Выберите булки
      </div>
    )}
    <ul className={styles.elements} data-cy="bun-ingredients">
      {constructorItems.ingredients.length > 0 ? (
        constructorItems.ingredients.map(
          (item: TConstructorIngredient, index: number) => (
            <BurgerConstructorElement
              ingredient={item}
              index={index}
              totalItems={constructorItems.ingredients.length}
              key={item.id}
              // data-cy={item.id}
            />
          )
        )
      ) : (
        <div
          className={`${styles.noBuns} ml-8 mb-4 mr-5 text text_type_main-default`}
        >
          Выберите начинку
        </div>
      )}
    </ul>
    {constructorItems.bun ? (
      <div className={`${styles.element} mt-4 mr-4`}>
        <ConstructorElement
          type='bottom'
          isLocked
          text={`${constructorItems.bun.name} (низ)`}
          price={constructorItems.bun.price}
          thumbnail={constructorItems.bun.image}
          data-cy='constructor-bun-2'
        />
      </div>
    ) : (
      <div
        className={`${styles.noBuns} ${styles.noBunsBottom} ml-8 mb-4 mr-5 text text_type_main-default`}
      >
        Выберите булки
      </div>
    )}
    <div className={`${styles.total} mt-10 mr-4`}>
      <div className={`${styles.cost} mr-10`}>
        <p className={`text ${styles.text} mr-2`}>{price}</p>
        <CurrencyIcon type='primary' />
      </div>
      <Button
        htmlType='button'
        type='primary'
        size='large'
        children='Оформить заказ'
        onClick={onOrderClick}
      />
    </div>

    {orderRequest && (
      <Modal onClose={closeOrderModal} title={'Оформляем заказ...'}>
        <Preloader />
      </Modal>
    )}

    {orderModalData && (
      <Modal
        onClose={closeOrderModal}
        title={orderRequest ? 'Оформляем заказ...' : ''}
      >
        <OrderDetailsUI orderNumber={orderModalData.number} />
      </Modal>
    )}
  </section>
);

// import React, { FC } from 'react';
// import {
//   Button,
//   ConstructorElement,
//   CurrencyIcon
// } from '@zlden/react-developer-burger-ui-components';
// import styles from './burger-constructor.module.css';
// import { BurgerConstructorUIProps } from './type';
// import { TConstructorIngredient } from '@utils-types';
// import { BurgerConstructorElement, Modal } from '@components';
// import { Preloader, OrderDetailsUI } from '@ui';

// import React, { FC } from 'react';
// import styles from './BurgerConstructor.module.css';
// import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
// import BurgerConstructorElement from './BurgerConstructorElement';
// import {
//   Button,
//   Modal,
//   Preloader
// } from '@ya.praktikum/react-developer-burger-ui-components';
// import OrderDetailsUI from '../OrderDetails/OrderDetailsUI';

// export const BurgerConstructorUI: FC<BurgerConstructorUIProps> = ({
//   constructorItems,
//   orderRequest,
//   price,
//   orderModalData,
//   onOrderClick,
//   closeOrderModal
// }) => (
//   <section className={styles.burger_constructor} data-cy='burger-constructor'>
//     {constructorItems.bun ? (
//       <div
//         className={`${styles.element} mb-4 mr-4`}
//         data-cy='constructor-bun-top'
//       >
//         <ConstructorElement
//           type='top'
//           isLocked
//           text={`${constructorItems.bun.name} (верх)`}
//           price={constructorItems.bun.price}
//           thumbnail={constructorItems.bun.image}
//         />
//       </div>
//     ) : (
//       <div
//         className={`${styles.noBuns} ${styles.noBunsTop} ml-8 mb-4 mr-5 text text_type_main-default`}
//         data-cy='constructor-no-bun-top'
//       >
//         Выберите булки
//       </div>
//     )}
//     <ul className={styles.elements} data-cy='constructor-ingredients'>
//       {constructorItems.ingredients.length > 0 ? (
//         constructorItems.ingredients.map(
//           (item: TConstructorIngredient, index: number) => (
//             <BurgerConstructorElement
//               ingredient={item}
//               index={index}
//               totalItems={constructorItems.ingredients.length}
//               key={item.id}
//               data-cy={`constructor-ingredient-${item.id}`}
//             />
//           )
//         )
//       ) : (
//         <div
//           className={`${styles.noBuns} ml-8 mb-4 mr-5 text text_type_main-default`}
//           data-cy='constructor-no-ingredients'
//         >
//           Выберите начинку{' '}
//         </div>
//       )}
//     </ul>
//     {constructorItems.bun ? (
//       <div
//         className={`${styles.element} mt-4 mr-4`}
//         data-cy='constructor-bun-bottom'
//       >
//         <ConstructorElement
//           type='bottom'
//           isLocked
//           text={`${constructorItems.bun.name} (низ)`}
//           price={constructorItems.bun.price}
//           thumbnail={constructorItems.bun.image}
//         />
//       </div>
//     ) : (
//       <div
//         className={`${styles.noBuns} ${styles.noBunsBottom} ml-8 mb-4 mr-5 text text_type_main-default`}
//         data-cy='constructor-no-bun-bottom'
//       >
//         Выберите булки
//       </div>
//     )}
//     <div className={`${styles.total} mt-10 mr-4`} data-cy='constructor-total'>
//       <div className={`${styles.cost} mr-10`} data-cy='constructor-price'>
//         <p className={`text ${styles.text} mr-2`}>{price}</p>
//         <CurrencyIcon type='primary' />
//       </div>
//       <Button
//         htmlType='button'
//         type='primary'
//         size='large'
//         onClick={onOrderClick}
//         data-cy='order-button'
//       >
//         Оформить заказ
//       </Button>
//     </div>
//     {orderRequest && (
//       <Modal
//         onClose={closeOrderModal}
//         title={'Оформляем заказ...'}
//         data-cy='order-modal'
//       >
//         <Preloader data-cy='preloader' />
//       </Modal>
//     )}
//     {orderModalData && (
//       <Modal
//         onClose={closeOrderModal}
//         title={orderRequest ? 'Оформляем заказ...' : ''}
//         data-cy='order-modal-details'
//       >
//         <OrderDetailsUI
//           orderNumber={orderModalData.number}
//           data-cy='order-details'
//         />
//       </Modal>
//     )}
//   </section>
// );
// export const BurgerConstructorUI: FC<BurgerConstructorUIProps> = ({
//   constructorItems,
//   orderRequest,
//   price,
//   orderModalData,
//   onOrderClick,
//   closeOrderModal
// }) => (
//   <section className={styles.burger_constructor} data-cy='burger-constructor'>
//     {constructorItems.bun ? (
//       <div
//         className={`${styles.element} mb-4 mr-4`}
//         data-cy='constructor-bun-top'
//       >
//         <ConstructorElement
//           type='top'
//           isLocked
//           text={`${constructorItems.bun.name} (верх)`}
//           price={constructorItems.bun.price}
//           thumbnail={constructorItems.bun.image}
//         />
//       </div>
//     ) : (
//       <div
//         className={`${styles.noBuns} ${styles.noBunsTop} ml-8 mb-4 mr-5 text text_type_main-default`}
//         data-cy='constructor-no-bun-top'
//       >
//         Выберите булки
//       </div>
//     )}
//     <ul className={styles.elements} data-cy='constructor-ingredients'>
//       {constructorItems.ingredients.length > 0 ? (
//         constructorItems.ingredients.map(
//           (item: TConstructorIngredient, index: number) => (
//             <BurgerConstructorElement
//               ingredient={item}
//               index={index}
//               totalItems={constructorItems.ingredients.length}
//               key={item.id}
//               data-cy={`constructor-ingredient-${item.id}`}
//             />
//           )
//         )
//       ) : (
//         <div
//           className={`${styles.noBuns} ml-8 mb-4 mr-5 text text_type_main-default`}
//           data-cy='constructor-no-ingredients'
//         >
//           Выберите начинку
//         </div>
//       )}
//     </ul>
//     {constructorItems.bun ? (
//       <div
//         className={`${styles.element} mt-4 mr-4`}
//         data-cy='constructor-bun-bottom'
//       >
//         <ConstructorElement
//           type='bottom'
//           isLocked
//           text={`${constructorItems.bun.name} (низ)`}
//           price={constructorItems.bun.price}
//           thumbnail={constructorItems.bun.image}
//         />
//       </div>
//     ) : (
//       <div
//         className={`${styles.noBuns} ${styles.noBunsBottom} ml-8 mb-4 mr-5 text text_type_main-default`}
//         data-cy='constructor-no-bun-bottom'
//       >
//         Выберите булки
//       </div>
//     )}
//     <div className={`${styles.total} mt-10 mr-4`} data-cy='constructor-total'>
//       <div className={`${styles.cost} mr-10`} data-cy='constructor-price'>
//         <p className={`text ${styles.text} mr-2`}>{price}</p>
//         <CurrencyIcon type='primary' />
//       </div>
//       <Button
//         htmlType='button'
//         type='primary'
//         size='large'
//         children='Оформить заказ'
//         onClick={onOrderClick}
//         data-cy='order-button'
//       />
//     </div>

//     {orderRequest && (
//       <Modal
//         onClose={closeOrderModal}
//         title={'Оформляем заказ...'}
//         data-cy='order-modal'
//       >
//         <Preloader data-cy='preloader' />
//       </Modal>
//     )}

//     {orderModalData && (
//       <Modal
//         onClose={closeOrderModal}
//         title={orderRequest ? 'Оформляем заказ...' : ''}
//         data-cy='order-modal-details'
//       >
//         <OrderDetailsUI
//           orderNumber={orderModalData.number}
//           data-cy='order-details'
//         />
//       </Modal>
//     )}
//   </section>
// );
