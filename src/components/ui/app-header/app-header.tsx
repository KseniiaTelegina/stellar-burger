// import React, { FC } from 'react';
// import { useNavigate } from 'react-router-dom';
// import styles from './app-header.module.css';
// import { TAppHeaderUIProps } from './type';
// import {
//   BurgerIcon,
//   ListIcon,
//   Logo,
//   ProfileIcon
// } from '@zlden/react-developer-burger-ui-components';

// export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
//   const navigate = useNavigate();

//   const handleProfileClick = () => {
//     navigate(userName ? '/profile' : '/login');
//   };

//   return (
//     <header className={styles.header}>
//       <nav className={`${styles.menu} p-4`}>
//         <div className={styles.menu_part_left}>
//           <>
//             <BurgerIcon type='primary' />
//             <p className='text text_type_main-default ml-2 mr-10'>
//               Конструктор
//             </p>
//           </>
//           <>
//             <ListIcon type='primary' />
//             <p className='text text_type_main-default ml-2'>Лента заказов</p>
//           </>
//         </div>
//         <div className={styles.logo}>
//           <Logo className='' />
//         </div>
//         <div className={styles.link_position_last} onClick={handleProfileClick}>
//           <ProfileIcon type='primary' />
//           <p className='text text_type_main-default ml-2'>
//             {userName || 'Личный кабинет'}
//           </p>
//         </div>
//       </nav>
//     </header>
//   );
// };



import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const navigate = useNavigate();
  console.log(userName);

  const handleProfileClick = () => {
    navigate(userName ? '/profile' : '/login');
   
  };

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <div>
            <BurgerIcon type='primary' />
            <p className='text text_type_main-default ml-2 mr-10'>
              Конструктор
            </p>
          </div>
          <div>
            <ListIcon type='primary' />
            <p className='text text_type_main-default ml-2'>Лента заказов</p>
          </div>
        </div>
        <div className={styles.logo}>
          <Logo className='' />
        </div>
        <div className={styles.link_position_last} onClick={handleProfileClick}>
          <ProfileIcon type='primary' />
          <p className='text text_type_main-default ml-2'>
            {userName || 'Личный кабинет'}
          </p>
        </div>
      </nav>
    </header>
  );
};

