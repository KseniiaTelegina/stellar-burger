import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC } from 'react';
import { useSelector } from '../../services/store';
import { RootState } from '../../services/store';
import { useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { getFeeds } from '../../services/feedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.feed.orders);
  // const orders = useSelector((state: RootState) => state.feed.orders);
  // const status = useSelector((state: RootState) => state.feed.status);

  useEffect(() => {
    dispatch(getFeeds());
  }, [dispatch, orders]);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => {}} />;
};

/** TODO: взять переменную из стора */
// const orders: TOrder[] = [];
