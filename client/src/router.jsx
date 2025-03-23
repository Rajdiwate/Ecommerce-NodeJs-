import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useNavigate,
} from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import ForgotPassword from "./components/Auth/ForgotPassword";
import Products from "./pages/Products";
import Product from "./pages/Product";
import ResetPassword from "./pages/ResetPassword";
import Protected from "./components/Auth/Protected";
import Authorize from "./components/admin/Authorize";
import Admin from "./pages/Admin";
import Dashboard from "./components/admin/Dashboard";
import AdminProducts from "./components/admin/Products";
import AdminOrders from "./components/admin/Orders";
import AdminUsers from "./components/admin/Users";
import NotFound from "./pages/NotFound";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="auth">
            <Route index element={<Auth />} />
            <Route path="forgotPassword" element={<ForgotPassword />} />
          </Route>
          <Route path="products" element={<Products />} />
          <Route path="product/:productId" element={<Product />} />
        </Route>

        <Route path="password/reset/:token" element={<ResetPassword />} />

        <Route
          path="admin"
          element={
            <Protected>
              <Authorize>
                <Admin />
              </Authorize>
            </Protected>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>

        <Route path="/not-found" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
