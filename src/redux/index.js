import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/Auth";

import inventoryReducer from "./features/selectedInventory";
import customerReducer from "./features/selectedCustomer";
import vendorReducer from "./features/selectedVendor";
import employeeReducer from "./features/selectedEmployee";

export const store = configureStore({
  reducer: {
    auth: authReducer,

    inventory: inventoryReducer,
    customer: customerReducer,
    vendor: vendorReducer,
    employee: employeeReducer,
  },
});
