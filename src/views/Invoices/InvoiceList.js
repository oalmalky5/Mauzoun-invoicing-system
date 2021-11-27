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


export function InvoiceList(props) {
    const [invoices, setInvoices] = useState([]);
    const [invoice, setInvoice] = useState(-1);
    // const [show, setShow] = useState(false);
    const [modal, setModal] = useState(false);
    const history = useHistory();
    const [disabled, setDisabled] = useState(false);
    const [iconDisabled, setIconDisabled] = useState(true);

    // const {t} = useTranslation();

    const toggle = () => setModal(!modal);
    const setCurrentInvoice = (invoice) => {
        setInvoice(invoice);
        setModal(!modal);
    };


    const deleteInvoice = () => {
        setDisabled(true);
        setIconDisabled(false);
        axios.post(
            API_URL + 'invoices/' + invoice.id + '/delete', {},
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

        axios.get(API_URL + 'invoices/all').then((response) => {
            if (response.data.status) {

                setInvoices(response.data.data);

                $("#invoice_table").DataTable();
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
                                <h2 className="mb-0">{t("invoices_list")}</h2>
                            </CardHeader>
                            <CardBody style={{overflow: 'auto'}}>

                                <table id="invoice_table"
                                       className="stratprop_datatable table table-bordered align-items-center table-flush table">
                                    <thead className="thead-light">
                                    <tr>
                                        <th>{t("invoice_no")}</th>
                                        <th>{t("customer_name")}</th>
                                        <th>{t("address")}</th>
                                        <th>{t("email")}</th>
                                        <th>{t("phone")}</th>
                                        <th>{t("total")}</th>
                                        <th>{t("amount")}</th>
                                        <th>{t("actions")}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {invoices.length > 0 ? (
                                        invoices.map((invoice, index) => (
                                            <tr key={invoice.id}>
                                                <td>{invoice.sr_no}</td>
                                                <td>{invoice.customer.name}</td>
                                                <td>
                                                    {invoice.billing_street},
                                                    {invoice.billing_city},
                                                    {invoice.billing_state},
                                                    {invoice.billing_zip_code},
                                                    {invoice.billing_country}
                                                </td>
                                                <td>{invoice.billing_email}</td>
                                                <td>{invoice.billing_phone}</td>
                                                <td>{invoice.total_amount}</td>
                                                <td>{invoice.notes}</td>
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
                                                                tag={Link} to={`/admin/invoices/edit/${invoice.id}`}
                                                            >
                                                                {t("edit")}
                                                            </DropdownItem>
                                                            <DropdownItem
                                                                onClick={() => setCurrentInvoice(invoice)}
                                                                key={invoice.id}
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
                                            <td colSpan={12}>No Invoice</td>
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
                        Delete Invoice
                    </ModalHeader>
                    <ModalBody>
                        Are you sure you want to Delete?
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                            onClick={deleteInvoice} disabled={disabled}
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
