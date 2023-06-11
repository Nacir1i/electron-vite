import { DATETIME_FORMAT } from "./common";

const employees = [
  {
    "id": 1,
    "firstName": "Lance",
    "lastName": "Sauer",
    "email": "Otis52@gmail.com",
    "roleId": 1,
    "phone": "+212606767007",
    "address": "40908 Anastacio Port",
    "emergencyEmail": "Damien.Kozey1@yahoo.com",
    "emergencyPhone": "+212699493303",
    "emergencyAddress": "7253 Jennyfer Fields",
    "bankName": "Mayer Group",
    "bankAccountNumber": "95664470",
    "rib": "44833",
    "swift": "48111",
    "salary": 12844,
    "paymentMethodId": 1,
    "recruitAt": "03/03/2023",
    "createdAt": "1994-03-02T23:37:25.356Z",
  },
  {
    "id": 2,
    "firstName": "Lance",
    "lastName": "Sauer",
    "email": "Otis52@gmail.com",
    "roleId": 1,
    "phone": "+212606767007",
    "address": "40908 Anastacio Port",
    "emergencyEmail": "Damien.Kozey1@yahoo.com",
    "emergencyPhone": "+212699493303",
    "emergencyAddress": "7253 Jennyfer Fields",
    "bankName": "Mayer Group",
    "bankAccountNumber": "95664470",
    "rib": "44833",
    "swift": "48111",
    "salary": 12844,
    "paymentMethodId": 1,
    "recruitAt": "03/03/2023",
    "createdAt": "1994-03-02T23:37:25.356Z",
  },
  {
    "id": 3,
    "firstName": "Lance",
    "lastName": "Sauer",
    "email": "Otis52@gmail.com",
    "roleId": 1,
    "phone": "+212606767007",
    "address": "40908 Anastacio Port",
    "emergencyEmail": "Damien.Kozey1@yahoo.com",
    "emergencyPhone": "+212699493303",
    "emergencyAddress": "7253 Jennyfer Fields",
    "bankName": "Mayer Group",
    "bankAccountNumber": "95664470",
    "rib": "44833",
    "swift": "48111",
    "salary": 12844,
    "paymentMethodId": 1,
    "recruitAt": "03/03/2023",
    "createdAt": "1994-03-02T23:37:25.356Z",
  },
];
const roles = [
  {
    id: 1,
    title: "Owner",
    createdAt: DATETIME_FORMAT.default.format(new Date("03/06/2021")),
  },
  {
    id: 2,
    title: "Manager",
    createdAt: DATETIME_FORMAT.default.format(new Date("03/06/2021")),
  },
];
const customers = [
  {
    "id": 1,
    "honorific": "Mr",
    "company": "Block - Sanford",
    "firstName": "changed first name",
    "lastName": "Stamm",
    "gender": "male",
    "email": "Keely67@hotmail.com",
    "phone": "+212673608720",
    "address": "LawtonWest7746",
    "bankName": "Reynolds, Auer and Jones",
    "bankAccountNumber": "60989215",
    "rib": "704",
    "swift": "49937",
    "ice": "9128",
    "createdAt": 1677800245354
  },
  {
    "id": 2,
    "honorific": "Miss",
    "company": "Parisian, Bode and Kemmer",
    "firstName": "Josue",
    "lastName": "Prohaska",
    "gender": "female",
    "email": "Maggie2@gmail.com",
    "phone": "+212692577149",
    "address": "GainesvilleWest745",
    "bankName": "Fritsch and Sons",
    "bankAccountNumber": "37169689",
    "rib": "44377",
    "swift": "38642",
    "ice": "14470",
    "createdAt": 1677800245355
  }
];
const vendors = [
  {
    "id": 1,
    "companyName": 'Grant - Rogahn',
    "categoryId": 1,
    "firstName": 'Chad',
    "lastName": 'Breitenberg',
    "email": 'Rodger.Welch35@gmail.com',
    "phone": '+212675729442',
    "address": '358 Schamberger Mountains',
    "bankName": 'Hegmann - Spinka',
    "bankAccountNumber": '23405652',
    "rib": '70014',
    "swift": '19938',
    "ice": '12882',
    "hoursStart": null,
    "hoursEnd": null,
    "deliveryCharge": 30,
    "frequencyId": 1,
    "createdAt": "03/03/2023",
    "orderIds": [],
  },
  {
    "id": 2,
    "companyName": 'Grant - Rogahn',
    "categoryId": 1,
    "firstName": 'Someone',
    "lastName": 'Breitenberg',
    "email": 'Rodger.Welch35@gmail.com',
    "phone": '+212675729442',
    "address": '358 Schamberger Mountains',
    "bankName": 'Hegmann - Spinka',
    "bankAccountNumber": '23405652',
    "rib": '70014',
    "swift": '19938',
    "ice": '12882',
    "hoursStart": null,
    "hoursEnd": null,
    "deliveryCharge": 30,
    "frequencyId": 1,
    "createdAt": "03/03/2023",
    "orderIds": [2],
  },
];
const orders = [
  {
    "id": 1,
    "devisId": 1,
    "title": 'A sample order',
    "paid": true,
    "paidAmount": 6_300,
    "paymentMethod": 'cheque',
    "dueDate": 1677805967331,
    "createdAt": 1677806848747,
  },
  {
    "id": 2,
    "devisId": 1,
    "title": 'Another order...',
    "paid": false,
    "paidAmount": 4_125,
    "paymentMethod": 'cheque',
    "dueDate": 1677805967331,
    "createdAt": 1677806848747,
  },
];
const products = [
  {
    "id": 1,
    "title": "Concrete",
    "categoryId": null,
    "subCategory": "",
    "barcode": "zR1zgq$Nl@",
    "sku": "J{tQ;rx^>",
    "description": "Testing the description functionality...",
    "quantity": 232,
    "quantityThreshold": 33,
    "price": 293,
    "cost": 252,
    "createdAt": 1677800245360,
    "locationIds": [],
    "vendorIds": [1],
  },
  {
    "id": 2,
    "title": "Cotton",
    "categoryId": 1,
    "subCategory": "123KAZE123",
    "barcode": "zR1zgq$Nl@",
    "sku": "4LkN:BMF@t",
    "description": "",
    "quantity": 60,
    "quantityThreshold": 19,
    "price": 15,
    "cost": 9,
    "createdAt": 1677800245360,
    "locationIds": [1],
    "vendorIds": [],
  },
];
const productsCategories = [
  {
    "id": 1,
    "title": "Categorie#1",
  },
  {
    "id": null,
    "title": "Inconnue",
  }
];
const packages = [
  {
    "id": 1,
    "categoryId": 1,
    "subCategory": "",
    "title": "An example package",
    "description": "Oh how long have they ached for a droplet of water, nonetheless he was not merciful...",
    "price": 360,
    "createdAt": 1677800245361,
    "serviceIds": [],
    "productIds": [1],
    "devisIds": [],
  }
];
const packageCategories = [
  {
    "id": 1,
    "title": "Package#1",
  },
  {
    "id": null,
    "title": "Inconnue",
  }
];
const services = [
  {
    "id": 1,
    "categoryId": 1,
    "title": "This is an example service",
    "description": "As he wept for they that have fallen, he realizes...",
    "price": 7_000,
    "createdAt": 1677800245361,
    "logIds": [],
    "packageIds": [],
    "devisIds": [],
  },
  {
    "id": 2,
    "categoryId": 1,
    "title": "Another example service",
    "description": "As he wept for they that have fallen, he realizes...",
    "price": 5_000,
    "createdAt": 1677800245361,
    "logIds": [],
    "packageIds": [],
    "devisIds": [],
  },
];
const serviceCategories = [
  {
    "id": 1,
    "title": "Service#1",
  },
  {
    "id": null,
    "title": "Inconnue",
  }
];
const locations = [
  {
    "id": 2,
    "title": "Depôt N°1 Agadir",
    "productIds": [],
  },
  {
    "id": 1,
    "title": "Depôt N°3 Agadir",
    "productIds": [
      {
        "id": 1,
        "lastPrice": 360.25,
        "quantity": 23,
        "reserved": 7,
      }
    ],
  }
];

const __DATABASE_MIGRATION = '13';
const __DATABASE_KEY = "database";
const __DATABASE_MIGRATION_KEY = "__database_migration"

/**
 * 
 * @returns {{
 *    employees: Array<any>,
 *    roles: Array<any>,
 *    customers: Array<any>,
 *    vendors: Array<any>,
 *    orders: Array<any>,
 *    products: Array<any>,
 *    productsCategories: Array<any>,
 *    packages: Array<any>,
 *    packageCategories: Array<any>,
 *    services: Array<any>,
 *    serviceCategories: Array<any>,
 *    locations: Array<any>,
 * }}
 */
export function getDatabase() {
  const dbString = localStorage.getItem(__DATABASE_KEY);
  return JSON.parse(dbString);
}

/**
 * 
 * @param {{
 *    employees: Array<any>,
 *    roles: Array<any>,
 *    customers: Array<any>,
 *    vendors: Array<any>,
 * }} db 
 */
export function updateDatabase(db) {
  const dbString = JSON.stringify(db);
  localStorage.setItem(__DATABASE_KEY, dbString);
}

export function populateLocalStorage() {
  const __database_migration = localStorage.getItem(__DATABASE_MIGRATION_KEY);
  if (__database_migration === __DATABASE_MIGRATION) return;

  switch (__database_migration) {
    default: {
      const db = {
        employees,
        roles,
        customers,
        vendors,
        orders,
        products,
        productsCategories,
        packages,
        packageCategories,
        services,
        serviceCategories,
        locations,
      };
      localStorage.setItem(__DATABASE_KEY, JSON.stringify(db));
    }
  }

  localStorage.setItem(__DATABASE_MIGRATION_KEY, __DATABASE_MIGRATION);
}