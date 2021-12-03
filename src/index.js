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
import React, {Suspense} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import i18next from 'i18next'
import {initReactI18next} from 'react-i18next'
import HttpApi from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import './i18next';
import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";


import 'alertifyjs/build/css/alertify.css';

import AdminLayout from "layouts/Admin.js";

import AuthLayout from "layouts/Auth.js";
import InvoiceLayout from "layouts/Invoice.js";
import axios from "axios";
import "assets/scss/main.scss";
// localStorage.setItem("lang","en");


// const token = JSON.parse(localStorage.getItem('token'));
axios.create({
    // baseURL: 'http://localhost:8000/api/'
});


// const languages = ['en', 'ar'];

ReactDOM.render(
    <Suspense fallback={<div>Loading..</div>}>
        <BrowserRouter>
            <Switch>
                <Route path="/admin" render={(props) => <AdminLayout {...props}  />}/>
                <Route path="/auth" render={(props) => <AuthLayout {...props} />}/>
                <Route path="/invoice" render={(props) => <InvoiceLayout {...props} />}/>

                <Redirect from="/" to="/auth/login"/>
            </Switch>
        </BrowserRouter>
    </Suspense>,
    document.getElementById("root")
);


