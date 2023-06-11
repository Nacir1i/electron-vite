import axios from "axios";
// TODO(XENOBAS): Split this bitch up. It's getting out of hand.

/** @type {import("axios").AxiosInstance} **/
let instance;

/**
 * @param {string} host
 * @param {string} port
 * @param {string} token
 * @description Populate the httpRequest.js `instance` variable.
 */
export const createLocalAxiosInstance = (host, port, token) => {
  instance = axios.create({
    // baseURL: `https://triomphant-catering-api.onrender.com/`,
    baseURL: `http://${host}:${port}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Credentials": true,
    },
  });
  instance.interceptors.request.use(
    function (config) {
      config.headers["Authorization"] = `Bearer ${localStorage.getItem(
        "sessionToken"
      )}`;
      return config;
    },
    function (error) {
      console.error("[AXIOS] Interceptor failure :", error);
    }
  );
};

// User: API Functions.
/**
 *
 * @param {{username: string, password: string}} body
 * @returns {Promise<any>}
 */
export const login = async (body) => {
  try {
    const response = await instance.post("/user/login", body);
    const { data } = response;
    return data;
  } catch (error) {
    return error;
  }
};

/**
 *  @param {string} token
 *  @return {Promise<boolean>} JWT is valid or not.
 *  @description Send a request to server asking if provided `token` is valid.
 */
export async function authToken(token) {
  try {
    const response = await instance.post("/user/authToken", { token });
    const { success } = response.data;
    return success;
  } catch (error) {
    console.error("authToken", error);
    throw new Error(error.response.data.message);
  }
}

// Appointment: API Functions.
/**
 *
 * @param {("table" | "calendar")} type
 * @param {(any | undefined)} include
 * @return {Promise<any>}
 */
export async function getAllAppointments(type = "table", include) {
  const response = await instance.post("/appointment/getAllAppointments", {
    include,
    type,
  });
  const { success, message, ...queryResult } = response.data;
  if (!success) throw new Error(message);
  return queryResult;
}
/**
 * @param {number} limit
 * @param {number} page
 * @returns {Promise<{
 *  appointments: {
 *    id: number,
 *    title: string,
 *    type: string,
 *    status: string,
 *    orderId: number,
 *    scheduledDate: string,
 *    createdAt: string,
 *    order: {
 *      id: number,
 *      devisId: number,
 *      title: string,
 *      paid: boolean,
 *      paidAmount: number,
 *      paymentMethod: string,
 *      dueDate: string,
 *      createdAt: string
 *    }
 *  }[],
 *  pagesCount: number,
 *  calendar: {
 *    day: string,
 *    date: string
 *    index: number,
 *  }|null[]
 * }>}
 */
export async function getAppointments(limit = 10, page = 1) {
  const response = await instance.post("/appointment/getAllAppointment", {
    limit,
    page,
  });
  const {
    data: { data, message },
  } = response;
  if (!data) throw new Error(message);
  return data;
}

/**
 *
 * @param {string} searchID
 * @returns {Promise<{
 *    found: boolean,
 *    instance: ({
 *      id: number,
 *      title: string,
 *      type: string,
 *      status: string,
 *      orderId: number,
 *      scheduledDate: string,
 *      createdAt: string,
 *      order: {
 *        id: number,
 *        devisId: number,
 *        title: string,
 *        paid: boolean,
 *        paidAmount: number,
 *        paymentMethod: string,
 *        dueDate: string,
 *        createdAt: string,
 *        devis: {
 *          id: number,
 *          customerId: number,
 *          vendorId: (number | null),
 *          title: string,
 *          createdAt: string,
 *          customer: {
 *            id: number,
 *            company: string,
 *            firstName: string,
 *            lastName: string,
 *            gender: string,
 *            email: string,
 *            phone: string,
 *            address: string,
 *            bankName: string,
 *            bankAccountNumber: string,
 *            rib: string,
 *            swift: string,
 *            ice: string,
 *            createdAt: string
 *          }
 *        }
 *      }
 *    }|null)
 * }>}
 */
export async function getAppointment(searchID) {
  const response = await instance.post("/appointment/getAppointment", {
    searchID: parseInt(searchID),
  });
  const { appointmentFound, appointmentInstance, error } = response.data;
  if (typeof error !== "undefined") throw error;
  return {
    found: appointmentFound,
    instance: appointmentInstance,
  };
}

/**
 * @param {number} id
 * @param {any} payload
 * @returns {Promise<any>}
 */
export async function updateAppointment(id, payload) {
  const response = await instance.post("/appointment/updateAppointment", {
    appointmentId: id,
    ...payload,
  });
  const { appointment, message } = response.data;
  if (!appointment) throw new Error(message);
  return appointment;
}

/**
 *
 * @param {{
 *    title: string,
 *    type: string,
 *    status: string,
 *    scheduledDate: string,
 *    orderId: number,
 * }} payload
 * @returns
 */
export async function createAppointment(payload) {
  console.warn("[LEGACY] warn this function is fucking old.");
  const response = await instance.post(
    "/appointment/createAppointment",
    payload
  );
  const { appointment, message } = response.data;
  if (!appointment) throw new Error(message);
  return appointment;
}

export async function getFilteredEventTypes(searchTerm) {
  const response = await instance.post("/appointmentEvent/getFilteredAppointmentEvent", { searchTerm });
  const { success, message, ...queryResult } = response.data;
  if (!success) throw new Error(message);
  return queryResult;
}

// Quotes: API functions
export async function getAllQuotes(include) {
  const response = await instance.post("/quote/getAllQuotes", { include });
  const { success, quotes, message, quoteCount } = response.data;
  if (!success) throw new Error(message);
  return { quotes, quoteCount };
}
export async function getFilteredQuotes(searchTerm, include) {
  const response = await instance.post("/quote/getSearchedQuotes", {
    searchTerm,
    include,
  });
  const { success, message, ...createResult } = response.data;
  if (!success) throw new Error(message);
  return createResult;
}
export async function createQuote(body) {
  const response = await instance.post("/quote/createCustomerQuote", body);

  const { success, message, ...createResult } = response.data;
  if (!success) throw new Error(message);

  return createResult;
}

/**
 *
 * @param {number} id
 * @param {any} payload
 * @returns {Promise<any>}
 */
export async function updateDevis(id, payload) {
  const response = await instance.post("/devis/updateDevis", {
    devisID: id,
    ...payload,
  });
  const { devis, message } = response.data;
  if (!devis) throw new Error(message);
  return devis;
}

// Packages: API Functions
export async function getAllPackages(include) {
  const response = await instance.post("/package/getAllPackages", { include });
  const { success, message, ...queryResult } = response.data;
  if (!success) throw new Error(message);
  return queryResult;
}
/**
 *
 * @param {number} limit
 * @param {number} page
 * @returns {Promise<{
 *  packages: {
 *    id: number,
 *    categoryId: number,
 *    title: string,
 *    price: number,
 *    createdAt: string,
 *    stocks: {
 *      id: number,
 *      title: string,
 *      categoryId: number,
 *      subCategoryId: number,
 *      barcode: string,
 *      sku: string,
 *      location: string,
 *      quantity: number,
 *      minQuantity: number,
 *      sellPrice: number,
 *      buyPrice: number,
 *      createdAt: string,
 *    }[],
 *    services: {
 *      id: number,
 *      categoryId: number,
 *      price: number,
 *      title: string,
 *      createdAt: string,
 *    }[],
 *  }[],
 *  pagesCount: number,
 * }>}
 */
export async function getPackages(limit = 10, page = 1) {
  console.warn("[LEGACY] warn this function is fucking old.");
  const response = await instance.post("/package/getAllPackages", {
    limit,
    page,
  });
  const {
    data: { data, message },
  } = response;
  if (!data) throw new Error(message);
  return data;
}
export async function getPackage(searchID) {
  const response = await instance.post("/package/getPackage", { searchID });

  const { success, message, ...queryResult } = response.data;
  if (!success) throw new Error(message);

  return queryResult;
}

export async function createPackage(body) {
  const response = await instance.post("/package/createPackage", body);

  const { success, message, ...createResult } = response.data;
  if (!success) throw new Error(message);

  return createResult;
}

export async function getFilteredPackages(searchTerm) {
  const response = await instance.post("/package/getSearchedPackages", { searchTerm });
  const { success, message, ...queryResult } = response.data;
  if (!success) throw new Error(message);
  return queryResult;
}

export async function getFilteredPackageCategory(searchTerm) {
  // TODO(XENOBAS): This will be replaced...
  // TODO(XENOBAS): This needs a limit...
  const response = await instance.post("/packageCategory/getFilteredPackageCategories", { searchTerm });
  const { success, message, ...queryResult } = response.data;
  if (!success) throw new Error(message);
  return queryResult;
}

export async function createPackageCategory(title) {
  const response = await instance.post("/packageCategory/createPackageCategory", { title });
  const { success, message, ...createResult } = response.data;
  if (!success) throw new Error(message);
  return createResult;
}

// Products: API Functions
/**
 *
 * @param {number} limit
 * @param {number} page
 * @returns {Promise<{
 *  stocks: {
 *    id: number,
 *    title: string,
 *    categoryId: number,
 *    subCategoryId: number,
 *    barcode: string,
 *    sku: string,
 *    location: string,
 *    quantity: number,
 *    minQuantity: number,
 *    sellPrice: number,
 *    buyPrice: number,
 *    createdAt: string,
 *  }[],
 *  pagesCount: number,
 * }>}
 */
export async function getProducts(limit = 10, page = 1) {
  console.warn("[LEGACY] warn this function is fucking old.");
  const response = await instance.post("/stock/getAllStocks", { limit, page });
  const {
    data: { data, message },
  } = response;
  if (!data) throw new Error(message);
  return data;
}

export async function getAllProducts(include) {
  const response = await instance.post("/product/getAllProducts", { include });
  const { success, message, ...queryResult } = response.data;
  if (!success) throw new Error(message);
  return queryResult;
}

export async function getProduct(searchID) {
  const response = await instance.post("/product/getProduct", { searchID });

  const { success, message, ...queryResult } = response.data;
  if (!success) throw new Error(message);

  return queryResult;
}

export async function getFilteredProducts(searchTerm) {
  const response = await instance.post("/product/getSearchedProducts", { searchTerm });
  const { success, message, ...queryResult } = response.data;
  if (!success) throw new Error(message);
  return queryResult;
}

// Product Categories: API
export async function getFilteredProductCategory(searchTerm) {
  // TODO(XENOBAS): This will be replaced...
  // TODO(XENOBAS): This needs a limit...
  const response = await instance.post("/productCategory/getFilteredProductCategories", { searchTerm });
  const { success, message, ...queryResult } = response.data;
  if (!success) throw new Error(message);
  return queryResult;
}

export async function createProductCategory(title) {
  const response = await instance.post("/productCategory/createProductCategory", { title });
  const { success, message, ...createResult } = response.data;
  if (!success) throw new Error(message);
  return createResult;
}

export async function getProductCategoriesFiltered(searchTerm) {
  const response = await instance.post("/product/categories/getFiltered", {
    searchTerm,
  });
  const { success, message, ...queryResult } = response.data;
  if (!success) throw new Error(message);
  return queryResult;
}

export async function createProduct(body, isAutomatic = false) {
  const response = await instance.post(
    "/product/create" + (isAutomatic ? "Automatic" : "Manual") + "Product",
    body
  );

  const { success, message, ...createResult } = response.data;
  if (!success) throw new Error(message);

  return createResult;
}

export async function updateProduct(product_id, body) {
  const response = await instance.post("/product/updateProduct", { product_id, ...body });

  const { success, message, ...updateResult } = response.data;
  if (!success) throw new Error(message);

  return updateResult;
}

// Services: API Functions
/**
 *
 * @param {number} limit
 * @param {number} page
 * @returns {Promise<{
 *  services: {
 *    id: number,
 *    categoryId: number,
 *    title: string,
 *    price: number,
 *    createdAt: string,
 *    devis: {
 *      id: number,
 *      serviceId: number,
 *      devisId: number,
 *      createdAt: string,
 *    }[],
 *  }[],
 *  pagesCount: number,
 * }>}
 */
export async function getServices(limit = 10, page = 1) {
  console.warn("[LEGACY] warn this function is fucking old.");
  const response = await instance.post("/service/getAllService", {
    limit,
    page,
  });
  const {
    data: { data, message },
  } = response;
  if (!data) throw new Error(message);
  return data;
}

export async function getService(searchID) {
  const response = await instance.post("/service/getService", { searchID });

  const { success, message, ...queryResult } = response.data;
  if (!success) throw new Error(message);

  return queryResult;
}

export async function getAllServices(include) {
  const response = await instance.post("/service/getAllServices", { include });
  const { success, message, ...queryResult } = response.data;
  if (!success) throw new Error(message);
  return queryResult;
}

export async function updateService(service_id, body) {
  const response = await instance.post("/service/updateService", { service_id, ...body });

  const { success, message, ...updateResult } = response.data;
  if (!success) throw new Error(message);

  return updateResult;
}

export async function createService(body) {
  const response = await instance.post("/service/createService", body);

  const { success, message, ...createResult } = response.data;
  if (!success) throw new Error(message);

  return createResult;
}

export async function getFilteredServices(searchTerm) {
  const response = await instance.post("/service/getSearchedService", { searchTerm });
  const { success, message, ...queryResult } = response.data;
  if (!success) throw new Error(message);
  return queryResult;
}

export async function getFilteredServiceCategory(searchTerm) {
  // TODO(XENOBAS): This will be replaced...
  // TODO(XENOBAS): This needs a limit...
  const response = await instance.post("/serviceCategory/getFilteredServiceCategories", { searchTerm });
  const { success, message, ...queryResult } = response.data;
  if (!success) throw new Error(message);
  return queryResult;
}

export async function createServiceCategory(title) {
  const response = await instance.post("/serviceCategory/createServiceCategory", { title });
  const { success, message, ...createResult } = response.data;
  if (!success) throw new Error(message);
  return createResult;
}

// Roles: API Functions
export async function createRole(title) {
  const response = await instance.post("/roles/createRole", { title });
  const { success, message, ...createResult } = response.data;
  if (!success) throw new Error(message);
  return createResult;
}
export async function getFilteredRoles(searchTerm) {
  const response = await instance.post("/roles/getSearchedRoles", {
    searchTerm,
  });
  const { success, message, count, ...queryResult } = response.data;
  if (!success) throw new Error(message);
  return queryResult;
}

// Customers: API Functions
/**
 *
 * @param {number} limit
 * @param {number} page
 * @returns {Promise<{
 *  customers: Array<{
 *    id: number,
 *    first_name: string,
 *    last_name: string,
 *    honorific: string,
 *    contact_id: number,
 *    bank_information_id: number,
 *    created_at: number,
 *    contact: {
 *        id: number,
 *        email: string,
 *        phone: string,
 *        address: string,
 *        emergency: false,
 *        created_at: number
 *    }
 *  }>,
 *  customersCount: number,
 * }>}
 */
export const getAllCustomers = async (include = { contact: true }) => {
  const response = await instance.post("/customer/getAllCustomers", { include });
  const { success, message, ...queryResult } = response.data;
  if (!success) throw new Error(message);
  return queryResult;
};

/**
 *
 * @param {number} customer_id
 * @param {{
 *   company?: string,
 *   firstName?: string,
 *   lastName?: string,
 *   gender?: string,
 *   email?: string,
 *   phone?: string,
 *   address?: string,
 *   bankName?: string,
 *   bankAccountNumber?: string,
 *   rib?: string,
 *   swift?: string,
 *   ice?: string,
 *   createdAt?: string,
 *   devisId?: number,
 * }} payload
 * @returns {Promise<boolean>}
 */
export async function updateCustomer(body) {
  const response = await instance.post("/customer/updateCustomer", body);

  const { success, message } = response.data;
  if (!success) throw new Error(message);

  return success;
}

/**
 *
 * @param {number} searchID
 * @returns {Promise<>}
 */
export async function getCustomer(searchID) {
  const response = await instance.post("/customer/getCustomer", { searchID });
  const { success, error, message, customer } = response.data;
  if (!success) throw new Error(error ?? message);
  return {
    message,
    customer,
  };
}

export async function createCustomer(body) {
  const response = await instance.post("/customer/createCustomer", body);

  const { success, message, ...createResult } = response.data;
  if (!success) throw new Error(message);

  return createResult;
}

export async function getFilteredCustomers(searchTerm, include) {
  const response = await instance.post("/customer/getSearchedCustomers", {
    searchTerm,
    include,
  });

  const { success, message, ...queryResult } = response.data;
  if (!success) throw new Error(message);

  return queryResult;
}

/**
 * @param {string} searchTerm
 * @returns {Promise<any[]>}
 */
export const fetchSearchedCustomers = async (searchTerm) => {
  console.warn("[LEGACY] warn this function is fucking old.");
  const response = await instance.post("/customer/getSearchedCustomers", {
    search: searchTerm,
  });
  const { message, customers } = response.data;
  if (!customers) throw new Error(message);
  return customers;
};

//employee api functions :
export const createEmployee = async (body) => {
  const response = await instance.post("/user/signup", body);

  const { success, message, ...createResult } = response.data;
  if (!success) throw new Error(message);

  return createResult;
};

export const updateEmployee = async (employee_id, body) => {
  const response = await instance.post("/employee/updateEmployee", { employee_id, ...body });

  const { success, message, updateEmployee: updatedEmployee } = response.data;
  if (!success) throw new Error(message);

  return updatedEmployee;
};
/**
 * @param {number} searchID
 * @returns {Promise<{
 *  message: string,
 *  employeeFound: boolean,
 *  employeeInstance: {
 *    id: number,
 *    firstName: string,
 *    lastName: string,
 *    email: string,
 *    roleId: number,
 *    phone: string,
 *    address: string,
 *    emergencyEmail: string,
 *    emergencyPhone: string,
 *    emergencyAddress: string,
 *    bankName: string,
 *    bankAccountNumber: string,
 *    rib: string,
 *    swift: string,
 *    salary: number,
 *    createdAt: string,
 *    role: {
 *      id: number,
 *      title: string,
 *      createdAt: string
 *    },
 *    logs: {
 *      id: number,
 *      employeeId: number,
 *      comment: string,
 *      createdAt: string
 *    }[],
 *  }
 * }>}
 */
export async function getEmployee(searchID) {
  const response = await instance.post("/employee/getEmployee", { searchID });
  const { success, message, employee } = response.data;
  if (!success) throw new Error(message);
  return { employee };
}

/**
 *
 * @param {number} limit
 * @param {number} page
 * @returns {Promise<{
 *   employees: {
 *     id: number,
 *     firstName: string,
 *     lastName: string,
 *     email: string,
 *     roleId: number,
 *     phone: string,
 *     address: string,
 *     emergencyEmail: string,
 *     emergencyPhone: string,
 *     emergencyAddress: string,
 *     bankName: string,
 *     bankAccountNumber: string,
 *     rib: string,
 *     swift: string,
 *     salary: number,
 *     createdAt: string,
 *     logs: {
 *       id: number,
 *       employeeId: number,
 *       comment: string,
 *       createdAt: string,
 *     }[],
 *     role: {
 *       id: number,
 *       title: number,
 *       createdAt: string,
 *     },
 *   }[],
 *   pagesCount: number,
 * }>}
 */
export async function getAllEmployees(include) {
  const response = await instance.post("/employee/getAllEmployees", {
    include,
  });
  const { employees, employeesCount, success, message } = response.data;
  if (!success) throw new Error(message);
  return { employees, employeesCount };
}

export const fetchSearchedEmployees = async (body) => {
  console.warn("[LEGACY] warn this function is fucking old.");
  try {
    const response = await instance.post(
      "/employee/getSearchedEmployees",
      body
    );
    const { data } = response;

    return data;
  } catch (error) {
    return error.response.data;
  }
};

// Vendor: API functions:
export async function createVendor(body) {
  const response = await instance.post("/vendor/createVendor", body);

  const { success, message, ...createResult } = response.data;
  if (!success) throw new Error(message);

  return createResult;
}
export async function updateVendor(vendor_id, payload) {
  const response = await instance.post("/vendor/updateVendor", { vendor_id, ...payload });

  const { success, message, ...updateResult } = response.data;
  if (!success) throw new Error(message);

  return updateResult;
}

/**
 *
 * @param {number} searchID
 * @returns
 */
export async function getVendor(searchID) {
  const response = await instance.post("/vendor/getVendor", { searchID });
  const { success, message, vendor } = response.data;
  if (!success) throw new Error(message);
  return { vendor };
}

/**
 *
 * @param {number} limit
 * @param {number} page
 * @returns {Promise<{
 *    vendors: {
 *      id: number,
 *      companyName: string,
 *      categoryId: number,
 *      firstName: string,
 *      lastName: string,
 *      email: string,
 *      phone: string,
 *      address: string,
 *      bankName: string,
 *      bankAccountNumber: string,
 *      rib: string,
 *      swift: string,
 *      ice: string,
 *      createdAt: string,
 *      category: {
 *        id: number,
 *        title: string,
 *        createdAt: string,
 *      },
 *      logs: {
 *        id: number,
 *        vendorId: number,
 *        comment: string,
 *        createdAt: string,
 *      }[],
 *    }[],
 *    pagesCount: number,
 * }>}
 */
export async function getAllVendors(include) {
  const response = await instance.post("/vendor/getAllVendors", { include });
  const { message, success, vendors, vendorsCount } = response.data;
  if (!success) throw new Error(message);
  return { vendors, vendorsCount };
}

export async function getFilteredVendors(searchTerm, include = {}) {
  const response = await instance.post("/vendor/getSearchedVendors", {
    searchTerm,
    include,
  });

  const { success, message, ...queryResult } = response.data;
  if (!success) throw new Error(message);

  return queryResult;
}

// Vendor Categories: API
export async function getFilteredVendorCategory(searchTerm, limit = 5) {
  // TODO(XENOBAS): This will be replaced...
  const response = await instance.post("/vendorCategory/getFilteredVendorCategory", { searchTerm, limit });
  const { success, message, ...queryResult } = response.data;
  if (!success) throw new Error(message);
  return queryResult;
}

export async function createVendorCategory(title) {
  const response = await instance.post("/vendorCategory/createVendorCategory", { title });
  const { success, message, ...createResult } = response.data;
  if (!success) throw new Error(message);
  return createResult;
}

// Invoices: API Functions
/**
 *
 * @param {number} limit
 * @param {number} page
 * @returns {Promise<{TODO!}>}
 */
export async function getInvoicesByLimit(limit = 10, page = 1) {
  throw new Error("UNIMPLEMENTED");
  // const response = await instance.post("/order/getAllOrders", { limit, page });
  // const { data: { data, message } } = response;
  // if (!data) throw new Error(message);
  // return data;
}

// Delivery Invoices: API Function
/**
 *
 * @param {any} include
 * @returns {Promise<{
 *    deliveryInvoicesCount: number,
 *    deliveryInvoices: number,
 * }>}
 */
export async function getAllDeliveryInvoices(include) {
  const response = await instance.post(
    "/deliveryInvoice/getAllDeliveryInvoices",
    { include }
  );
  const { success, message, ...queryResult } = response.data;
  if (!success) throw new Error(message);
  return queryResult;
}

// Orders: API Functions
export async function getAllOrders(include) {
  const response = await instance.post("/order/getAllOrders", { include });
  const { success, message, ...queryResult } = response.data;
  if (!success) throw new Error(message);
  return queryResult;
}

export async function getFilteredOrders(searchTerm) {
  const response = await instance.post("/order/getSearchedOrders", { searchTerm });
  const { success, message, ...queryResult } = response.data;
  if (!success) throw new Error(message);
  return queryResult;
}

export async function getOrdersByLimit(limit = 10, page = 1) {
  console.warn("[LEGACY] warn this function is fucking old.");
  const response = await instance.post("/order/getAllOrders", { limit, page });
  const {
    data: { data, message },
  } = response;
  if (!data) throw new Error(message);
  return data;
}

export async function getOrder(searchID) {
  const response = await instance.post("/order/getOrder", { searchID });
  const { message, success, order } = response.data;
  if (!success) throw new Error(message);
  return order;
}

export async function createOrder(body) {
  const response = await instance.post("/order/createOrder", body);

  const { success, message, ...createResult } = response.data;
  if (!success) throw new Error(message);

  return createResult;
}

// Locations: API Functions.
export async function getFilteredLocation(searchTerm) {
  // TODO(XENOBAS): This will be replaced...
  // TODO(XENOBAS): This needs a limit...
  const response = await instance.post("/location/getFilteredLocations", { searchTerm });
  const { success, message, ...queryResult } = response.data;
  if (!success) throw new Error(message);
  return queryResult;
}

export async function createLocation(title, address = title) {
  const response = await instance.post("/location/createLocation", { title, address });
  const { success, message, ...createResult } = response.data;
  if (!success) throw new Error(message);
  return createResult;
}

// Delivery Frequencies: API Functions.
export const deliveryFrequencies = {
  async getAll() {
    const response = await instance.post("/deliveryFrequencies/getAll");
    const { success, message, ...queryResult } = response.data;
    if (!success) throw new Error(message);
    return queryResult;
  },
  async getFiltered(searchTerm) {
    const response = await instance.post("/deliveryFrequencies/getFilteredDeliveryFrequency", {
      searchTerm,
    });
    const { success, message, ...queryResult } = response.data;
    if (!success) throw new Error(message);
    return queryResult;
  },
  async create(title) {
    const response = await instance.post("/deliveryFrequencies/createDeliveryFrequency", { title });
    const { success, message, ...createResult } = response.data;
    if (!success) throw new Error(message);
    return createResult;
  }
};