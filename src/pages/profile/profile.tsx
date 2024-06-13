// import { ProfileUI } from '@ui-pages';
// import { FC, SyntheticEvent, useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '../../services/store';
// import { updateUser } from '../../services/userSlice';

// export const Profile: FC = () => {
//   const user = useSelector((state: RootState) => state.user);
//   const dispatch = useDispatch();
//   const [formValue, setFormValue] = useState({
//     name: user?.name || '',
//     email: user?.email || '',
//     password: ''
//   });

//   useEffect(() => {
//     setFormValue((prevState) => ({
//       ...prevState,
//       name: user?.name || '',
//       email: user?.email || ''
//     }));
//   }, [user]);

//   const isFormChanged =
//     formValue.name !== user?.name ||
//     formValue.email !== user?.email ||
//     !!formValue.password;

//   const handleSubmit = (e: SyntheticEvent) => {
//     e.preventDefault();
//     dispatch(
//       updateUser({
//         name: formValue.name,
//         email: formValue.email,
//         password: formValue.password
//       })
//     );
//   };

//   const handleCancel = (e: SyntheticEvent) => {
//     e.preventDefault();
//     setFormValue({
//       name: user?.name || '',
//       email: user?.email || '',
//       password: ''
//     });
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormValue((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value
//     }));
//   };

//   return (
//     <ProfileUI
//       formValue={formValue}
//       isFormChanged={isFormChanged}
//       handleCancel={handleCancel}
//       handleSubmit={handleSubmit}
//       handleInputChange={handleInputChange}
//     />
//   );
// };

import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../services/store';
import { updateUserApi } from '@api'; 

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.data?.user);
  
  const [formValue, setFormValue] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const updatedUser = await updateUserApi({
        name: formValue.name,
        email: formValue.email,
        password: formValue.password,
      });
      dispatch({
        type: 'user/updateUser',
        payload: { user: updatedUser },
      });
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
