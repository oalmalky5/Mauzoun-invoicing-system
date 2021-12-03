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
import React, {useState} from "react";
import {useLocation, Route, Switch, Redirect} from "react-router-dom";
import cookies from 'js-cookie'
import routes from "routes.js";

import axios from "axios";
// Alter defaults after instance has been created

const Invoice = (props) => {

    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = "Bearer " + token;

    const mainContent = React.useRef(null);
    const location = useLocation();

    const currentLanguage = cookies.get('i18next') || 'en';

    if (currentLanguage === "en" || currentLanguage === null) {
        import("assets/css/argon-dashboard-react.css");
    } else {
        import("assets/css/argon-dashboard-react-rtl.css");
    }

    React.useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        mainContent.current.scrollTop = 0;

    }, [location]);

    const getRoutes = (routes) => {
        return routes.map((prop, key) => {
            if (prop.layout === "/invoice") {
                return (
                    <Route
                        path={prop.path}
                        component={prop.component}
                        key={key}
                    />
                );
            } else {
                return null;
            }
        });
    };

    return (
        <>
            <div className="main-content" ref={mainContent}>
                <Switch>
                    {getRoutes(routes)}
                    <Redirect from="*" to="/admin/index"/>
                </Switch>
            </div>
        </>
    );
};

export default Invoice;
