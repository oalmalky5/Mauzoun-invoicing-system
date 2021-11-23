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
import UsersManagement from "./views/examples/UsersManagement";
import CustomersManagement from "./views/examples/CustomersManagement";
import InvoiceManagement from "./views/examples/InvoiceManagement";

var routes = [
    {
        path: "/index",
        name: "Dashboard",
        icon: "fas fa-desktop text-primary",
        component: Index,
        layout: "/admin",
    },
    {
        path: "/users/list",
        name: "Users List",
        icon: "fas fa-users text-primary",
        component: UserList,
        layout: "/admin",
    },
    {
        path: "/users/create",
        name: "Create User",
        icon: "fas fa-plus text-primary ",
        component: CreateUser,
        layout: "/admin",
    },
    {
        path: "/customers-management",
        name: "Customers Management",
        icon: "fas fa-users-cog text-primary",
        component: CustomersManagement,
        layout: "/admin",
    },
    {
        path: "/invoice-management",
        name: "Invoice Management",
        icon: "fas fa-scroll text-primary",
        component: InvoiceManagement,
        layout: "/admin",
    },
    {
        path: "/login",
        name: "Login",
        icon: "fas fa-sign-in-alt text-primary",
        component: Login,
        layout: "/auth",
    },
    {
        path: "/profile",
        name: "Profile",
        icon: "ni ni-single-02 text-primary",
        component: Profile,
        layout: "/admin",
    },
    {
        path: "/users/:id",
        name: "Edit User",
        icon: "ni ni-single-02 text-primary",
        component: Profile,
        layout: "/default",
    }


];
export default routes;
