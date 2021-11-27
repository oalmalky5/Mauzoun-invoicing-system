/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import {Profile} from "views/examples/Profile.js";
import {CreateUser} from "views/Users/CreateUser.js";
import {UserList} from "views/Users/UserList.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";

import CustomersManagement from "./views/examples/CustomersManagement";
import InvoiceManagement from "./views/examples/InvoiceManagement";
import {EditUser} from "./views/Users/EditUser";


import {CreateCustomer} from "views/Customers/CreateCustomer.js";
import {CustomerList} from "views/Customers/CustomerList.js";
import {EditCustomer} from "./views/Customers/EditCustomer";

import {CreateInvoice} from "views/Invoices/CreateInvoice.js";
import {InvoiceList} from "views/Invoices/InvoiceList.js";
import {EditInvoice} from "./views/Invoices/EditInvoice";


var routes = [
    {
        path: "/index",
        name: "Dashboard",
        icon: "fas fa-desktop",
        component: Index,
        layout: "/admin",
    },
    {
        path: "/users/list",
        name: "Users List",
        icon: "fas fa-users",
        component: UserList,
        layout: "/admin",
    },
    {
        path: "/users/create",
        name: "Create User",
        icon: "fas fa-plus ",
        component: CreateUser,
        layout: "/admin",
    },
    {
        path: "/customers/list",
        name: "Customers List",
        icon: "fas fa-users ",
        component: CustomerList,
        layout: "/admin",
    },
    {
        path: "/customers/create",
        name: "Create Customer",
        icon: "fas fa-plus  ",
        component: CreateCustomer,
        layout: "/admin",
    },
    {
        path: "/customers/edit/:id",
        name: "Edit Customer",
        icon: "ni ni-single-02 ",
        component: EditCustomer,
        layout: "/default",
    },
    {
        path: "/invoices/list",
        name: "Invoices List",
        icon: "fas fa-users ",
        component: InvoiceList,
        layout: "/admin",
    },
    {
        path: "/invoices/create",
        name: "Create Invoice",
        icon: "fas fa-plus  ",
        component: CreateInvoice,
        layout: "/admin",
    },
    {
        path: "/invoices/edit/:id",
        name: "Edit Invoice",
        icon: "ni ni-single-02 ",
        component: EditInvoice,
        layout: "/default",
    },
    {
        path: "/invoice-management",
        name: "Invoices",
        icon: "fas fa-scroll",
        component: InvoiceManagement,
        layout: "/admin",
    },
    {
        path: "/login",
        name: "Login",
        icon: "fas fa-sign-in-alt",
        component: Login,
        layout: "/auth",
    },
    {
        path: "/profile",
        name: "Profile",
        icon: "fas fa-user",
        component: Profile,
        layout: "/admin",
    },
    {
        path: "/users/edit/:id",
        name: "Edit User",
        icon: "ni ni-single-02",
        component: EditUser,
        layout: "/default",
    }


];
export default routes;
