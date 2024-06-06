import React from 'react';
import { useLocation } from 'react-router-dom';
import { ConstructorPage } from '@pages';
import { Feed } from '@pages';
import { NotFound404 } from '@pages';
import { Login } from '@pages';
import { Register } from '@pages';
import { ForgotPassword } from '@pages';
import { ResetPassword } from '@pages';
import { Profile } from '@pages';
import { ProfileOrders } from '@pages';
import '../../index.css';
import styles from './app.module.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from 'react-router-dom';
import { AppHeader } from '@components';
import { Modal } from '@components';
import { OrderInfo } from '@components';
import { IngredientDetails } from '@components';
import { ProtectedRoute } from '../protected-route/ProtectedRoute';

const App = () => {
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;
  const navigate = useNavigate();
  const handleModalClose = () => {
    navigate(-1);
  };

  return (
    // <Router>
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='*' element={<NotFound404 />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute onlyUnAuth>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute onlyUnAuth>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title='Order Information' onClose={handleModalClose}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Ingredient Details' onClose={handleModalClose}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute onlyUnAuth>
                <Modal title='Profile Order' onClose={handleModalClose}>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
    // {/* </Router> */}
  );
};

export default App;
// import React from 'react';
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   useLocation,
//   useNavigate
// } from 'react-router-dom';
// import {
//   ConstructorPage,
//   Feed,
//   NotFound404,
//   Login,
//   Register,
//   ForgotPassword,
//   ResetPassword,
//   Profile,
//   ProfileOrders
// } from '@pages';
// import '../../index.css';
// import styles from './app.module.css';
// import { AppHeader, Modal, OrderInfo, IngredientDetails } from '@components';
// import { ProtectedRoute } from '../protected-route/ProtectedRoute';

// // const App = () => {
// //   return (
// //     <Router>
// //       <AppContent />
// //     </Router>
// //   );
// // };
// const App = () => (
//   <Router>
//     <AppContent />
//   </Router>
// );

// const AppContent = () => {
//   const location = useLocation();
//   const backgroundLocation = location.state?.backgroundLocation;
//   const navigate = useNavigate();

//   const handleModalClose = () => {
//     navigate(-1);
//   };

//   return (
//     <div className={styles.app}>
//       <AppHeader />
//       <Routes location={backgroundLocation || location}>
//         <Route path='/' element={<ConstructorPage />} />
//         <Route path='/feed' element={<Feed />} />
//         <Route path='*' element={<NotFound404 />} />
//         <Route
//           path='/login'
//           element={
//             <ProtectedRoute onlyUnAuth>
//               <Login />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path='/register'
//           element={
//             <ProtectedRoute onlyUnAuth>
//               <Register />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path='/forgot-password'
//           element={
//             <ProtectedRoute onlyUnAuth>
//               <ForgotPassword />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path='/reset-password'
//           element={
//             <ProtectedRoute onlyUnAuth>
//               <ResetPassword />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path='/profile'
//           element={
//             <ProtectedRoute>
//               <Profile />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path='/profile/orders'
//           element={
//             <ProtectedRoute>
//               <ProfileOrders />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//       {backgroundLocation && (
//         <Routes>
//           <Route
//             path='/feed/:number'
//             element={
//               <Modal title='Order Information' onClose={handleModalClose}>
//                 <OrderInfo />
//               </Modal>
//             }
//           />
//           <Route
//             path='/ingredients/:id'
//             element={
//               <Modal title='Ingredient Details' onClose={handleModalClose}>
//                 <IngredientDetails />
//               </Modal>
//             }
//           />
//           <Route
//             path='/profile/orders/:number'
//             element={
//               <ProtectedRoute>
//                 <Modal title='Profile Order' onClose={handleModalClose}>
//                   <OrderInfo />
//                 </Modal>
//               </ProtectedRoute>
//             }
//           />
//         </Routes>
//       )}
//     </div>
//   );
// };

// export default App;
