// import { FC } from 'react';
// import { AppHeaderUI } from '@ui';

// export const AppHeader: FC = () => <AppHeaderUI userName='' />;

import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { AppHeaderUI } from '@ui';
import { RootState } from '../../services/store'; 

export const AppHeader: FC = () => {
  const userName = useSelector((state: RootState) => state.user.name);
  return <AppHeaderUI userName={userName} />;
};
