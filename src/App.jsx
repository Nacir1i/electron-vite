// Components
import Navbar from "./components/Navbar";
import MainNavbar from "./components/MainNavbar";
// Base screens
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import Dashboard from "./screens/Dashboard";
import Inventory from "./screens/Inventory";
import ListAppointments from "./screens/ListAppointments";
import AppointmentsCalendar from "./screens/AppointmentsCalendar";
import TestingArena from "./screens/TestingArena";
// Documents screens
import ListVendors from "./screens/ListVendors";
import ListCustomers from "./screens/ListCustomers";
import ListEmployees from "./screens/ListEmployees";
// Create screens
import ClientDevis from "./screens/create/ClientDevis";
import ClientOrder from "./screens/create/ClientOrder";
import ClientInvoice from "./screens/create/ClientInvoice";
import VendorOrder from "./screens/create/VendorOrder";
import VendorInvoice from "./screens/create/VendorInvoice";
// Receipts screens
import ListDevis from "./screens/receipts/ListDevis";
import ListOrders from "./screens/receipts/ListOrders";
import ListInvoices from "./screens/receipts/ListInvoices";
// Inventory screens
import ListPackages from "./screens/inventory/ListPackages";
import ListServices from "./screens/inventory/ListServices";
import ListProducts from "./screens/inventory/ListProducts";
import DetailsPackage from "./screens/inventory/details/DetailsPackage";
import DetailsService from "./screens/inventory/details/DetailsService";
import DetailsProduct from "./screens/inventory/details/DetailsProduct";
// Selected screens
import SelectedVendor from "./screens/SelectedVendor";
import SelectedProduct from "./screens/SelectedProduct";
import SelectedCustomer from "./screens/SelectedCustomer";
import SelectedEmployee from "./screens/SelectedEmployee";
import SelectedAppointment from "./screens/SelectedAppointment";

import HelpCenter from "./screens/HelpCenter";

import NewAppointment from "./screens/NewAppointment";

import NewCustomer from "./screens/new/NewCustomer";
import NewEmployee from "./screens/new/NewEmployee";
import NewVendor from "./screens/new/NewVendor";

import NewProduct from "./screens/new/NewProduct";
import NewPackage from "./screens/new/NewPackage";
import NewService from "./screens/new/NewService";

// TODO: Replace all mentions of "devis" -> "quotes".
import NewQuote from "./screens/new/NewQuote";
import {
  NewInvoice_Vendor,
  NewInvoice_Customer,
} from "./screens/new/NewInvoice";
import { NewOrder_Vendor, NewOrder_Customer } from "./screens/new/NewOrder";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { EditOrder_Customer } from "./screens/edit/EditOrder";

// TODO: Fillup vendor pages.

function App() {
  const auth = useSelector((state) => state.auth.value);
  const location = useLocation();
  const navigation = useNavigate();

  const componentOrLogin = (component) =>
    auth.loggedIn ? component : <Navigate to="/login" />;
  const updateAuth = function () {
    localStorage.setItem("sessionToken", auth.token);
    auth.loggedIn ? navigation(location.pathname) : navigation("/login");
  };
  useEffect(updateAuth, [auth]);

  return !auth.loggedIn ? (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  ) : (
    <div className="w-full flex">
      <MainNavbar />
      <div className="w-full flex flex-grow flex-col">
        <Navbar />
        <div className="w-full flex flex-grow overflow-auto">
          <Routes>
            <Route path="/" element={componentOrLogin(<Dashboard />)} />
            <Route path="/help" element={componentOrLogin(<HelpCenter />)} />
            <Route path="/test" element={componentOrLogin(<TestingArena />)} />

            <Route
              path="/calendar"
              element={componentOrLogin(<AppointmentsCalendar />)}
            />
            <Route
              path="/appointments"
              element={componentOrLogin(<ListAppointments />)}
            />
            <Route
              path="/appointments/new"
              element={componentOrLogin(<NewAppointment />)}
            />
            <Route
              path="/appointments/:appointmentID"
              element={componentOrLogin(<SelectedAppointment />)}
            />

            <Route
              path="/vendors"
              element={componentOrLogin(<ListVendors />)}
            />
            <Route
              path="/customers"
              element={componentOrLogin(<ListCustomers />)}
            />
            <Route
              path="/employees"
              element={componentOrLogin(<ListEmployees />)}
            />

            <Route
              path="/packages"
              element={componentOrLogin(<ListPackages />)}
            />
            <Route
              path="/services"
              element={componentOrLogin(<ListServices />)}
            />
            <Route
              path="/products"
              element={componentOrLogin(<ListProducts />)}
            />

            <Route
              path="/packages/:packageID"
              element={componentOrLogin(<DetailsPackage />)}
            />
            <Route
              path="/packages/new"
              element={componentOrLogin(<NewPackage />)}
            />
            <Route
              path="/services/:serviceID"
              element={componentOrLogin(<DetailsService />)}
            />
            <Route
              path="/services/new"
              element={componentOrLogin(<NewService />)}
            />
            <Route
              path="/products/:productID"
              element={componentOrLogin(<DetailsProduct />)}
            />
            <Route
              path="/products/new"
              element={componentOrLogin(<NewProduct />)}
            />

            <Route
              path="/vendors/:vendorID"
              element={componentOrLogin(<SelectedVendor />)}
            />
            <Route
              path="/employees/:employeeID"
              element={componentOrLogin(<SelectedEmployee />)}
            />
            <Route
              path="/customers/:customerID"
              element={componentOrLogin(<SelectedCustomer />)}
            />

            <Route
              path="/employees/new"
              element={componentOrLogin(<NewEmployee />)}
            />
            <Route
              path="/customers/new"
              element={componentOrLogin(<NewCustomer />)}
            />
            <Route
              path="/vendors/new"
              element={componentOrLogin(<NewVendor />)}
            />

            <Route path="/devis" element={componentOrLogin(<ListDevis />)} />
            <Route path="/orders" element={componentOrLogin(<ListOrders />)} />
            <Route
              path="/invoices"
              element={componentOrLogin(<ListInvoices />)}
            />

            <Route
              path="/devis/:devisID"
              element={componentOrLogin(<ClientDevis />)}
            />
            <Route path="/devis/new" element={componentOrLogin(<NewQuote />)} />

            <Route
              path="/orders/customers/:orderID"
              element={componentOrLogin(<EditOrder_Customer />)}
            />
            <Route
              path="/orders/customers/new"
              element={componentOrLogin(<NewOrder_Customer />)}
            />
            <Route
              path="/orders/vendors/:vendorID"
              element={componentOrLogin(<VendorOrder />)}
            />
            <Route
              path="/orders/vendors/new"
              element={componentOrLogin(<NewOrder_Vendor />)}
            />

            <Route
              path="/invoices/customers/:invoiceID"
              element={componentOrLogin(<ClientInvoice />)}
            />
            <Route
              path="/invoices/customers/new"
              element={componentOrLogin(<NewInvoice_Customer />)}
            />
            <Route
              path="/invoices/vendors/:invoiceID"
              element={componentOrLogin(<VendorInvoice />)}
            />
            <Route
              path="/invoices/vendors/new"
              element={componentOrLogin(<NewInvoice_Vendor />)}
            />

            <Route path="/login" element={<Navigate to="/" replace={true} />} />
            <Route path="*" element={componentOrLogin(<NotFound />)} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
