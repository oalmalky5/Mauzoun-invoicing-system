import React, {useEffect, useState, useRef} from "react";
import axios from "axios";
import $ from "jquery";
// import DataTable from "datatables.net";

import {useHistory} from 'react-router';
import {Link} from 'react-router-dom';
import alertify from "alertifyjs";
import {useTranslation} from "react-i18next";

import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,
    Col,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter

} from "reactstrap";
import Header from "components/Headers/Header.js";

import {API_URL, STATIC_TOKEN} from '../../constants.js';


export function CustomerList(props) {
    const [customers, setCustomers] = useState([]);
    const [customer, setCustomer] = useState(-1);
    // const [show, setShow] = useState(false);
    const [modal, setModal] = useState(false);
    const history = useHistory();
    const [disabled, setDisabled] = useState(false);
    const [iconDisabled, setIconDisabled] = useState(true);

    // const {t} = useTranslation();

    const toggle = () => setModal(!modal);
    const setCurrentCustomer = (customer) => {
        setCustomer(customer);
        setModal(!modal);
    };


    const deleteCustomer = () => {
        setDisabled(true);
        setIconDisabled(false);
        axios.post(
            API_URL + 'customers/' + customer.id + '/delete', {},
        ).then((response) => {
            if (response.data.status) {
                history.go(0);
                setModal(false);
                alertify.success(response.data.message);
            } else {
                setDisabled(false);
                setIconDisabled(true);
                alertify.error(response.data.message);
                return null;
            }
        }).catch((error) => {
            setDisabled(false);
            setIconDisabled(true);
            // alertify.error("Something went wrong. Try again!");
        });
    };

    useEffect(() => {

        axios.get(API_URL + 'customers/all').then((response) => {
            if (response.data.status) {

                setCustomers(response.data.data);

                $("#customer_table").DataTable();
            } else {
                alertify.error(response.data.message);
                return null;
            }
        }).catch((error) => {
            // alertify.error("Something went wrong. Try again!");
        });

    }, []);

    const {t} = useTranslation();


    return (
        <>
            <Header/>
            <Container className="mt--7" fluid>
                <Row>
                    <Col md={12}>
                        <Card>
                            <CardHeader>
                                <h2 className="mb-0">{t("customers_list")}</h2>
                            </CardHeader>
                            <CardBody style={{overflow: 'auto'}}>

                                <table id="customer_table"
                                       className="stratprop_datatable table table-bordered align-items-center table-flush table">
                                    <thead className="thead-light">
                                    <tr>
                                        <th>{t("sr_no")}</th>
                                        <th>{t("first_name")}</th>
                                        <th>{t("last_name")}</th>
                                        <th>{t("email")}</th>
                                        <th>{t("phone")}</th>
                                        <th>{t("notes")}</th>
                                        <th>{t("actions")}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {customers.length > 0 ? (
                                        customers.map((customer, index) => (
                                            <tr key={customer.id}>
                                                <td>{index + 1}</td>
                                                <td>{customer.first_name}</td>
                                                <td>{customer.last_name}</td>
                                                <td>{customer.email}</td>
                                                <td>{customer.phone}</td>
                                                <td>{customer.notes}</td>
                                                <td>
                                                    <UncontrolledDropdown>
                                                        <DropdownToggle
                                                            className="btn-icon-only text-light"
                                                            href="#pablo"
                                                            role="button"
                                                            size="sm"
                                                            color=""
                                                            onClick={(e) => e.preventDefault()}
                                                        >
                                                            <i className="fas fa-ellipsis-v"/>
                                                        </DropdownToggle>
                                                        <DropdownMenu className="dropdown-menu-arrow" right>
                                                            <DropdownItem
                                                                tag={Link} to={`/admin/invoices/list/${customer.id}`}
                                                            >
                                                                {t("invoices")}
                                                            </DropdownItem>
                                                            <DropdownItem
                                                                tag={Link} to={`/admin/customers/edit/${customer.id}`}
                                                            >
                                                                {t("edit")}
                                                            </DropdownItem>
                                                            <DropdownItem
                                                                onClick={() => setCurrentCustomer(customer)}
                                                                key={customer.id}
                                                            >
                                                                {t("delete")}
                                                            </DropdownItem>

                                                        </DropdownMenu>
                                                    </UncontrolledDropdown>
                                                </td>

                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={12}>No Customer</td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Modal
                    centered
                    isOpen={modal}
                    toggle={toggle}
                >
                    <ModalHeader toggle={toggle}>
                        Delete Customer
                    </ModalHeader>
                    <ModalBody>
                        Are you sure you want to Delete?
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                            onClick={deleteCustomer} disabled={disabled}
                        >
                            Confirm <span
                            dangerouslySetInnerHTML={{__html: disabled ? `<i class='fas fa-spinner fa-spin'></i>` : ``}}/>
                        </Button>
                        {' '}
                        <Button onClick={toggle}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </Container>
        </>
    )
}
