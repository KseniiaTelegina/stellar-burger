import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from 'react-redux';
import { userActions } from '../../services/userSlice';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(userActions.userLogout());
  };

  // const handleLogout = () => {};

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
