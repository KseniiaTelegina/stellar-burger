// import { FC, SyntheticEvent, useState } from 'react';
// import { LoginUI } from '@ui-pages';

// export const Login: FC = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e: SyntheticEvent) => {
//     e.preventDefault();
//   };

//   return (
//     <LoginUI
//       errorText=''
//       email={email}
//       setEmail={setEmail}
//       password={password}
//       setPassword={setPassword}
//       handleSubmit={handleSubmit}
//     />
//   );
// };

import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/userSlice'; 
import { AppDispatch } from '../../services/store'; 

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await dispatch(loginUser({ email, password })).unwrap();
      console.log('Авторизация прошла успешно');
      navigate('/');  // Перенаправляем на страницу конструктора бургера
    } catch (error) {
      console.error('Ошибка при авторизации', error);
      setErrorText('Ошибка при авторизации: ' + (error as Error).message);
    }
  };

  return (
    <LoginUI
      errorText={errorText}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
