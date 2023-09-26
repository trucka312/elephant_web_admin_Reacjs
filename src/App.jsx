import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./pages/login";
import { PATH } from "./constants/paths";
import React, { Suspense, lazy, useEffect, useState } from "react";
import { getToken } from "./utils/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgotPassword from "./pages/login/ForgotPassword";
import IdentityDetail from "./pages/identityRequest/IdentityDetail";
import Loading from "./components/loading/Index";
import MainLayout from "./layouts/mainLayout/MainLayout";
import ProductDetail from "./pages/products/ProductDetail";
import VoucherForm from "./pages/vouchers/VoucherForm";
import { useBadgesStore } from "./store/badgesStore";

const Sellers = lazy(() => import("./pages/sellers/Index"));
const Home = lazy(() => import("./pages/home/Index.jsx"));
const Stores = lazy(() => import("./pages/stores/index"));
const Vouchers = lazy(() => import("./pages/vouchers"));
const Products = lazy(() => import("./pages/products"));
const Customers = lazy(() => import("./pages/customers"));
const Categories = lazy(() => import("./pages/categories"));
const HomepageInterface = lazy(() => import("./pages/settings/homepageInterface"));
const IdentityRequest = lazy(() => import("./pages/identityRequest/Index"));

const PrivateRoute = () => {
  const { getAllBadges } = useBadgesStore();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = await getToken();
      console.log("token: ", token);
      setAuthenticated(token !== null);
      setLoading(false);
    };

    checkAuthentication();
    getAllBadges();
  }, []);
  
  if (loading) {
    return null;
  }

  if (!authenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<MainLayout />}>
              <Route
                path={PATH.HOME}
                element={
                  <Suspense fallback={<Loading />}>
                    <Home />
                  </Suspense>
                }
              />
              {/* Yêu cầu định danh */}
              <Route
                path="/identity-request"
                element={
                  <Suspense fallback={<Loading />}>
                    <IdentityRequest />
                  </Suspense>
                }
              ></Route>
              <Route
                path="/identity-request/:identityId"
                element={<IdentityDetail />}
              ></Route>
              {/* Sellers */}
              <Route
                path="/sellers"
                element={
                  <Suspense fallback={<Loading />}>
                    <Sellers />
                  </Suspense>
                }
              ></Route>
              {/* Stores */}
              <Route
                path="/stores"
                element={
                  <Suspense fallback={<Loading />}>
                    <Stores />
                  </Suspense>
                }
              ></Route>
              {/* Products */}
              <Route
                path="/products"
                element={
                  <Suspense fallback={<Loading />}>
                    <Products />
                  </Suspense>
                }
              ></Route>
              <Route
                path="/products/status/:productStatus"
                element={
                  <Suspense fallback={<Loading />}>
                    <Products />
                  </Suspense>
                }
              ></Route>
              <Route
                path="/products/:productId"
                element={<ProductDetail />}
              ></Route>
              {/* Vouchers */}
              <Route
                path="/vouchers"
                element={
                  <Suspense fallback={<Loading />}>
                    <Vouchers />
                  </Suspense>
                }
              ></Route>
              <Route path="/vouchers/create" element={<VoucherForm />}></Route>
              <Route path="/vouchers/:voucherId" element={<VoucherForm />}></Route>
              {/* Customers */}
              <Route
                path="/customers"
                element={
                  <Suspense fallback={<Loading />}>
                    <Customers />
                  </Suspense>
                }
              ></Route>
              {/* Categories */}
              <Route
                path="/categories"
                element={
                  <Suspense fallback={<Loading />}>
                    <Categories />
                  </Suspense>
                }
              ></Route>
              {/* Settings */}
              <Route
                path="/theme"
                element={
                  <Suspense fallback={<Loading />}>
                    <HomepageInterface />
                  </Suspense>
                }
              ></Route>
            </Route>
          </Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer></ToastContainer>
    </React.Fragment>
  );
}
export default App;
