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
import React, {useEffect, useState} from "react";
import axios from "axios";
// node.js library that concatenates classes (strings)
// import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
// import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {

    Container,
    Row,
    Col,
    Button,
    Card,
    CardHeader,
    CardBody,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Modal,
    ModalHeader, ModalBody, ModalFooter,
} from "reactstrap";

// core components
import {
    chartOptions,
    parseOptions,
    chartExample1,
    chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import {useTranslation} from 'react-i18next';

import {Link} from "react-router-dom";

const API_URL = " http://127.0.0.1:8000/api/";


export default function Index(props) {
    const [activeNav, setActiveNav] = useState(1);
    const [chartExample1Data, setChartExample1Data] = useState("data1");
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalCustomers, setTotalCustomers] = useState(0);
    const [totalInvoices, setTotalInvoices] = useState(0);
    const [totalInvoicesAmount, setTotalInvoicesAmount] = useState(0);
    const [topCustomers, setTopCustomers] = useState([]);

    if (window.Chart) {
        parseOptions(Chart, chartOptions());
    }

    const toggleNavs = (e, index) => {
        e.preventDefault();
        setActiveNav(index);
        setChartExample1Data("data" + index);
    };

    const {t} = useTranslation();
    useEffect(() => {

        axios.get(API_URL + 'home').then((response) => {
            if (response.data.status) {
                setTotalUsers(response.data.data.users);
                setTotalCustomers(response.data.data.customers);
                setTotalInvoices(response.data.data.invoices);
                setTotalInvoicesAmount(response.data.data.invoices_amount);
                setTopCustomers(response.data.data.top_customers);
            } else {
                return null;
            }
        }).catch((error) => {
            // alertify.error("Something went wrong. Try again!");
        });

    }, []);


    return (
        <>
            <Header/>
            {/* Page content */}
            <Container className="mt--7" fluid>
                <Row>
                    <Col md={12}>
                        <Card>
                            <CardHeader>
                                <h2 className="mb-0">{t("Dashboard")}</h2>
                            </CardHeader>
                            <CardBody>
                                <div className="mt-5">
                                    <Row>
                                        <Col lg="3">
                                            <div className={'dashboard_block'}>
                                                <div className={'dashboard_block_count'}>{totalUsers}</div>
                                                <hr className={'hr-line'}/>
                                                <div className={'dashboard_block_title'}><span
                                                    className={'fa fa-users'}></span> Total Users
                                                </div>
                                            </div>
                                        </Col>
                                        <Col lg="3">
                                            <div className={'dashboard_block'}>
                                                <div className={'dashboard_block_count'}>{totalCustomers}</div>
                                                <hr className={'hr-line'}/>
                                                <div className={'dashboard_block_title'}><span
                                                    className={'fas fa-users'}></span> Total Customers
                                                </div>
                                            </div>
                                        </Col>

                                        <Col lg="3">
                                            <div className={'dashboard_block'}>
                                                <div className={'dashboard_block_count'}>{totalInvoices}</div>
                                                <hr className={'hr-line'}/>
                                                <div className={'dashboard_block_title'}><span
                                                    className={'fas fa-scroll'}></span> Total Invoices
                                                </div>
                                            </div>
                                        </Col>
                                        <Col lg="3">
                                            <div className={'dashboard_block'}>
                                                <div className={'dashboard_block_count'}>${totalInvoicesAmount}</div>
                                                <hr className={'hr-line'}/>
                                                <div className={'dashboard_block_title'}><span
                                                    className={'fas fa-money'}></span> Total Amount
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                <div className="mt-5">
                                    <Row>
                                        <Col lg="4">
                                            <h4>Top five customers having maximum invoices</h4>
                                            <div className={'top_customers'}>
                                                <ul>
                                                    {topCustomers.map((customer, key) => (
                                                        <li>
                                                            <div className={'top_customer_name'}> {customer.first_name}</div>
                                                            <div className={'dflex'}>
                                                                <div className={'invoices_count'}>{customer.invoices_count} Invoices</div>
                                                                <div className={'invoices_amount'}>${customer.invoices_sum_total}</div>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
