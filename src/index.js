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
import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";


import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
// import "assets/scss/argon-dashboard-react.scss";
import "assets/css/argon-dashboard-react.css";

import 'alertifyjs/build/css/alertify.css';
import "assets/scss/main.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import axios from "axios";
// const token = JSON.parse(localStorage.getItem('token'));
const token = localStorage.getItem('token');
console.log(token);
axios.create({
    // baseURL: 'http://localhost:8000/api/'
});

// Alter defaults after instance has been created
axios.defaults.headers.common['Authorization'] = "Bearer " + token;

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/admin" render={(props) => <AdminLayout {...props} />}/>
            <Route path="/auth" render={(props) => <AuthLayout {...props} />}/>

            <Redirect from="/" to="/auth/login"/>
        </Switch>
    </BrowserRouter>,
    document.getElementById("root")
);
