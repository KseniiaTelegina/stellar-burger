// !!! ВНИМАНИЕ !!!

// данная реализация может использоваться для подсвечивания активной ссылки "Конструктор" при открытии
//модального окна "Детали ингредиента", т.к. NavLink to='/' по умолчанию end, добавляем кастомную функцию проверки.
// не совсем понятно, что требуется в реализации данного проекта, нужно ли подсвечивание данного момента, поэтому оставляю
// данный код в комментариях

// import React, { FC } from 'react';
// import { NavLink, useLocation, useMatch } from 'react-router-dom';
// import styles from './app-header.module.css';
// import { TAppHeaderUIProps } from './type';
// import {
//   BurgerIcon,
//   ListIcon,
//   Logo,
//   ProfileIcon
// } from '@zlden/react-developer-burger-ui-components';

// // Кастомная функция для определения активного состояния
// const isActiveLink = (to: string, location: ReturnType<typeof useLocation>) => {
//   const match = useMatch(to);

//   // Проверяем, если текущий маршрут `/` или начинается с `/ingredients/`
//   if (to === '/' && (match || location.pathname.startsWith('/ingredients/'))) {
//     return true;
//   }
//   return match;
// };

// export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
//   const location = useLocation();

//   return (
//     <header className={styles.header}>
//       <nav className={`${styles.menu} p-4`}>
//         <div className={styles.menu_part_left}>
//           <NavLink
//             to='/'
//             className={() =>
//               isActiveLink('/', location) ? styles.link_active : styles.link
//             }
//           >
//             {() => {
//               const isActive = isActiveLink('/', location);
//               return (
//                 <>
//                   <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
//                   <p className='text text_type_main-default ml-2 mr-10'>
//                     Конструктор
//                   </p>
//                 </>
//               );
//             }}
//           </NavLink>
//           <NavLink
//             to='/feed'
//             className={({ isActive }) =>
//               isActive ? styles.link_active : styles.link
//             }
//           >
//             {({ isActive }) => (
//               <>
//                 <ListIcon type={isActive ? 'primary' : 'secondary'} />
//                 <p className='text text_type_main-default ml-2'>
//                   Лента заказов
//                 </p>
//               </>
//             )}
//           </NavLink>
//         </div>
//         <div className={styles.logo}>
//           <Logo className='' />
//         </div>
//         <div className={styles.link_position_last}>
//           <NavLink
//             to={userName ? '/profile' : '/login'}
//             className={({ isActive }) =>
//               isActive ? styles.link_active : styles.link
//             }
//           >
//             {({ isActive }) => (
//               <>
//                 <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
//                 <p className='text text_type_main-default ml-2'>
//                   {userName || 'Личный кабинет'}
//                 </p>
//               </>
//             )}
//           </NavLink>
//         </div>
//       </nav>
//     </header>
//   );
// };

import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <NavLink
          to='/'
          className={({ isActive }) =>
            isActive ? styles.link_active : styles.link
          }
        >
          {({ isActive }) => (
            <>
              <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
              <p className='text text_type_main-default ml-2 mr-10'>
                Конструктор
              </p>
            </>
          )}
        </NavLink>
        <NavLink
          to='/feed'
          className={({ isActive }) =>
            isActive ? styles.link_active : styles.link
          }
        >
          {({ isActive }) => (
            <>
              <ListIcon type={isActive ? 'primary' : 'secondary'} />
              <p className='text text_type_main-default ml-2'>Лента заказов</p>
            </>
          )}
        </NavLink>
      </div>
      <div className={styles.logo}>
        <Logo className='' />
      </div>
      <div className={styles.link_position_last}>
        <NavLink
          to={userName ? '/profile' : '/login'}
          className={({ isActive }) =>
            isActive ? styles.link_active : styles.link
          }
        >
          {({ isActive }) => (
            <>
              <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
              <p className='text text_type_main-default ml-2'>
                {userName || 'Личный кабинет'}
              </p>
            </>
          )}
        </NavLink>
      </div>
    </nav>
  </header>
);
