import React, {useEffect, useState, useRef} from "react";
import axios from "axios";
import alertify from "alertifyjs";
import {API_URL, STATIC_TOKEN} from "../../constants.js";
import Header from "components/Headers/Header.js";
import {useTranslation} from "react-i18next";

import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Container,
    Row,
    Col,
} from "reactstrap";
import {Prompt} from 'react-router'

import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export function EditInvoice(props) {
    const id = props.match.params.id;
    const {t} = useTranslation();
    const customer_id = useRef();
    const sr_no = useRef();
    const date = useRef();
    const due_date = useRef();
    const expiry_date = useRef();
    const business_days = useRef();
    const total_amount = useRef();
    const tax_amount = useRef();
    /*const has_approved = useRef();*/
    const [notes, setNotes] = useState('');

    const billing_first_name = useRef();
    const billing_first_name_arabic = useRef();
    const billing_last_name = useRef();
    const billing_last_name_arabic = useRef();
    const billing_email = useRef();
    const billing_phone = useRef();
    const billing_website = useRef();
    const billing_company_name = useRef();
    const billing_company_name_arabic = useRef();
    const billing_street = useRef();
    const billing_city = useRef();
    const billing_state = useRef();
    const billing_zip_code = useRef();
    const billing_country = useRef();
    const billing_notes = useRef();
    const billing_building_no = useRef();
    const billing_building_no_arabic = useRef();
    const billing_street_arabic = useRef();
    const billing_district = useRef();
    const billing_district_arabic = useRef();
    const billing_city_arabic = useRef();
    const billing_state_arabic = useRef();
    const billing_country_arabic = useRef();
    const billing_vat_number = useRef();
    const billing_vat_number_arabic = useRef();
    const billing_other_buyer_id = useRef();
    const billing_notes_arabic = useRef();
    const billing_additional_no = useRef();

    const [customers, setCustomers] = useState([]);
    const [customer, setCustomer] = useState({});
    const [disabled, setDisabled] = useState(false);
    const [total, setTotal] = useState(0);
    const [vat, setVat] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [subTotal60, setSubTotal60] = useState(0);
    const [subTotal40, setSubTotal40] = useState(0);
    const [iconDisabled, setIconDisabled] = useState(false);
    const [invoice, setInvoice] =  useState({});

    const initialInvoiceItem = {
        "id": "",
        "item": "",
        "description": "",
        "qty": "",
        "price": "",
        "taxable_amount": "",
        "discount": "",
        "tax_rate": "",
        "tax_amount": "",
        "total": 0
    };
    const [invoiceItems, setInvoiceItems] = useState([initialInvoiceItem]);


    const initialInvoiceCustomField = {
        "id": "",
        "name": "",
        "name_arabic": "",
        "value": 0
    };
    const [invoiceCustomFields, setInvoiceCustomFields] = useState([initialInvoiceCustomField]);

    const config = {
        headers: {
            Authorization: 'Bearer ' + STATIC_TOKEN,
        }
    };

    useEffect(() => {

        axios.get(API_URL + 'customers/all').then((response) => {
            if (response.data.status) {
                setCustomers(response.data.data);
            } else {
                alertify.error(response.data.message);
                return null;
            }
        }).catch((error) => {
            // alertify.error("Something went wrong. Try again!");
        });

    }, []);

    useEffect(() => {
        axios.get(API_URL + 'invoices/' + id + '/show').then((response) => {

            if (response.data.status) {
                setInvoice(response.data.data);
                setInvoiceItems(response.data.data.details);
                setInvoiceCustomFields(response.data.data.custom_fields);
                console.log(response.data.data);

            } else if (response.data.code === 404) {
                alertify.error(response.data.message);
                return null;
            }
        });
    }, []);

    const updateInvoiceHandler = (e) => {
        e.preventDefault();

        setDisabled(true);
        setIconDisabled(false);
        axios.post(API_URL + "invoices/update",
            {
                id: id,
                customer_id: customer_id.current.value,
                sr_no: sr_no.current.value,
                date: date.current.value,
                due_date: due_date.current.value,

                billing_first_name: billing_first_name.current.value,
                billing_last_name: billing_last_name.current.value,
                billing_first_name_arabic: billing_first_name_arabic.current.value,
                billing_last_name_arabic: billing_last_name_arabic.current.value,
                billing_email: billing_email.current.value,
                billing_phone: billing_phone.current.value,
                billing_website: billing_website.current.value,
                billing_company_name: billing_company_name.current.value,
                billing_company_name_arabic: billing_company_name_arabic.current.value,
                billing_street: billing_street.current.value,
                billing_street_arabic: billing_street_arabic.current.value,
                billing_city: billing_city.current.value,
                billing_city_arabic: billing_city_arabic.current.value,
                billing_state: billing_state.current.value,
                billing_state_arabic: billing_state_arabic.current.value,
                billing_zip_code: billing_zip_code.current.value,
                billing_country: billing_country.current.value,
                billing_country_arabic: billing_country_arabic.current.value,
                // billing_notes: billing_notes.current.value,
                // billing_notes_arabic: billing_notes_arabic.current.value,
                billing_district: billing_district.current.value,
                billing_district_arabic: billing_district_arabic.current.value,
                billing_building_no: billing_building_no.current.value,
                billing_building_no_arabic: billing_building_no_arabic.current.value,
                billing_vat_number: billing_vat_number.current.value,
                billing_vat_number_arabic: billing_vat_number_arabic.current.value,
                billing_other_buyer_id: billing_other_buyer_id.current.value,
                billing_additional_no: billing_additional_no.current.value,

                total: total,
                sub_total: subTotal,
                expiry_date: expiry_date.current.value,
                business_days: business_days.current.value,
                total_amount: total_amount.current.value,
                tax_amount: tax_amount.current.value,
                /*has_approved: has_approved.current.value,*/
                //notes: notes.current.value,
                notes: notes,
                items: invoiceItems,
                custom_fields: invoiceCustomFields
            },
        ).then((response) => {
            setDisabled(false);
            setIconDisabled(true);
            if (response.data.status) {
                alertify.success(response.data.message);

                props.history.push("/admin/invoices/list");
            } else {
                alertify.error(response.data.message);
                return null;
            }
        }).catch((error) => {
            setDisabled(false);
            setIconDisabled(true);
            if (error.message === 'Request failed with status code 401') {
                //props.logout();
            }
        });
    };

    const selectCustomerHandler = (e) => {
        const selected_customer_id = e.target.value;
        const selected_customer = customers.find(c => c.id == selected_customer_id);
        if (selected_customer != undefined){
            invoice.customer_id=e.target.value;
            setCustomer(selected_customer);
            invoice.billing_first_name = selected_customer.first_name;
            invoice.billing_first_name_arabic = selected_customer.first_name_arabic;
            invoice.billing_last_name = selected_customer.last_name;
            invoice.billing_last_name_arabic = selected_customer.last_name_arabic;
            invoice.billing_email = selected_customer.email;
            invoice.billing_phone = selected_customer.phone;
            invoice.billing_website = selected_customer.website;
            invoice.billing_company_name = selected_customer.company_name;
            invoice.billing_company_name_arabic = selected_customer.company_name;
            invoice.billing_street = selected_customer.street;
            invoice.billing_city = selected_customer.city;
            invoice.billing_state = selected_customer.state;
            invoice.billing_zip_code = selected_customer.zip_code;
            invoice.billing_country = selected_customer.country;
            invoice.billing_notes = selected_customer.notes;
            invoice.billing_building_no = selected_customer.building_no;
            invoice.billing_building_no_arabic = selected_customer.building_no_arabic;
            invoice.billing_street_arabic = selected_customer.street_arabic;
            invoice.billing_district = selected_customer.district;
            invoice.billing_district_arabic = selected_customer.district_arabic;
            invoice.billing_city_arabic = selected_customer.city_arabic;
            invoice.billing_state_arabic = selected_customer.state_arabic;
            invoice.billing_country_arabic = selected_customer.country_arabic;
            invoice.billing_vat_number = selected_customer.vat_number;
            invoice.billing_vat_number_arabic = selected_customer.vat_number_arabic;
            invoice.billing_other_buyer_id = selected_customer.other_buyer_id;
            invoice.billing_notes_arabic = selected_customer.notes_arabic;
            invoice.billing_additional_no = selected_customer.additional_no;
        }
        else {
            setCustomer({});
        }
    };

    const addMoreInvoiceItem = (element) => {
        setInvoiceItems([...invoiceItems, initialInvoiceItem]);
    };

    const addMoreInvoiceCustomFields = (element) => {
        setInvoiceCustomFields([...invoiceCustomFields, initialInvoiceCustomField]);
    }

    const itemHandler = (e, value) => {
        invoiceItems[e].item = value;
        setInvoiceItems(invoiceItems);
    };

    const descriptionHandler = (e, value) => {
        invoiceItems[e].description = value;
        setInvoiceItems(invoiceItems);
    };

    const totalHandler = (e, value) => {
        invoiceItems[e].total = value;
        setInvoiceItems(invoiceItems);
    };

    const qtyHandler = (e, value) => {
        let invoice_items = JSON.parse(JSON.stringify(invoiceItems))
        invoice_items[e].qty = value;
        // invoice_items[e].total = value * invoice_items[e].price;

        setInvoiceItems(invoice_items);
    };

    const priceHandler = (e, value) => {

        let invoice_items = JSON.parse(JSON.stringify(invoiceItems))
        invoice_items[e].price = value;
        // invoice_items[e].total = value * invoice_items[e].qty;

        setInvoiceItems(invoice_items);
    };

    const taxableAmountHandler = (e, value) => {
        let invoice_items = JSON.parse(JSON.stringify(invoiceItems))
        invoice_items[e].taxable_amount = value;
        // invoice_items[e].total = value * invoice_items[e].price;

        setInvoiceItems(invoice_items);
    };
    const discountHandler = (e, value) => {
        let invoice_items = JSON.parse(JSON.stringify(invoiceItems))
        invoice_items[e].discount = value;
        // invoice_items[e].total = value * invoice_items[e].price;

        setInvoiceItems(invoice_items);
    };
    const taxRateHandler = (e, value) => {
        let invoice_items = JSON.parse(JSON.stringify(invoiceItems))
        invoice_items[e].tax_rate = value;
        // invoice_items[e].total = value * invoice_items[e].price;

        setInvoiceItems(invoice_items);
    };

    const taxAmountHandler = (e, value) => {
        let invoice_items = JSON.parse(JSON.stringify(invoiceItems))
        invoice_items[e].tax_amount = value;
        // invoice_items[e].total = value * invoice_items[e].price;

        setInvoiceItems(invoice_items);
    };

    const nameFieldHandler = (e, value) => {
        let invoice_custom_fields = JSON.parse(JSON.stringify(invoiceCustomFields));
        invoice_custom_fields[e].name = value;
        setInvoiceCustomFields(invoice_custom_fields);
    };

    const nameArabicFieldHandler = (e, value) => {
        let invoice_custom_fields = JSON.parse(JSON.stringify(invoiceCustomFields));
        invoice_custom_fields[e].name_arabic = value;
        setInvoiceCustomFields(invoice_custom_fields);
    };

    const valueFieldHandler = (e, value) => {
        let invoice_custom_fields = JSON.parse(JSON.stringify(invoiceCustomFields));
        invoice_custom_fields[e].value = value;
        setInvoiceCustomFields(invoice_custom_fields);
        console.log(invoice_custom_fields);
    };

    const removeInvoiceItem = (index) => {
        let invoiceItemsClone = invoiceItems;
        setInvoiceItems(invoiceItemsClone => invoiceItemsClone.filter((elem, ind) => ind !== index));
    };


    const removeInvoiceCustomField = (index) => {
        let invoiceCustomFieldsClone = invoiceCustomFields;
        setInvoiceCustomFields(invoiceCustomFieldsClone => invoiceCustomFieldsClone.filter((elem, ind) => ind !== index));

    };

    const calculateTotal = () => {
        let total_amount = 0;
        let sub_total_amount = 0;

        invoiceItems.map((element, index) => {
            total_amount += parseFloat(element.price * element.qty);
        });

        let vat_amount = total_amount * 15 / 100;
        sub_total_amount = total_amount + vat_amount;

        setTotal(total_amount);
        setVat(vat_amount);
        setSubTotal(sub_total_amount);
        setSubTotal60(sub_total_amount * 60 / 100);
        setSubTotal40(sub_total_amount * 40 / 100);
    };

    return (
        <>
            {/*<Prompt
                when={shouldBlockNavigation}
                message='You have unsaved changes, are you sure you want to leave?'
            />*/}
            <Header/>
            <Container className="mt--7" fluid>
                <Row>
                    <Col md={12}>
                        <Card>
                            <CardHeader>
                                <h2 className="mb-0">{t("add_new_invoice")}</h2>
                            </CardHeader>
                            <CardBody>

                                <div className="mt-5">
                                    <Form>
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>{t("customer")}</label>
                                                    <select onChange={selectCustomerHandler}
                                                            className="form-control-alternative form-control"
                                                            ref={customer_id}
                                                            value={invoice.customer_id}
                                                    >
                                                        <option value="">Select Customer</option>
                                                        {customers.map((customer, key) => (
                                                            <option key={customer.id}
                                                                    value={customer.id}>
                                                                {customer.first_name} {customer.last_name}
                                                                ({customer.company_name})
                                                            </option>
                                                        ))}
                                                    </select>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>{t("invoice_no")}</label>
                                                    <input ref={sr_no}
                                                           className="form-control-alternative form-control"
                                                           placeholder={t("enter") + " " + t("invoice_no")} defaultValue={invoice.sr_no}/>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>{t("invoice_date")}</label>
                                                    <input ref={date}
                                                           type="date"
                                                           className="form-control-alternative form-control"
                                                           placeholder={t("enter") + " " + t("invoice_date")} defaultValue={invoice.date}/>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>{t("invoice_expiry_date")}</label>
                                                    <input ref={due_date}
                                                           type="date"
                                                           className="form-control-alternative form-control"
                                                           placeholder={t("enter") + " " + t("invoice_expiry_date")} defaultValue={invoice.due_date}/>
                                                </FormGroup>
                                            </Col>

                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>{t("project_expiry_date")}</label>
                                                    <input ref={expiry_date}
                                                           type="date"
                                                           className="form-control-alternative form-control"
                                                           placeholder={t("enter") + " " + t("project_expiry_date")} defaultValue={invoice.expiry_date}/>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>{t("business_days")}</label>
                                                    <input ref={business_days}
                                                           type="number"
                                                           className="form-control-alternative form-control"
                                                           placeholder={t("enter") + " " + t("business_days")} defaultValue={invoice.business_days}/>
                                                </FormGroup>
                                            </Col>
                                            {/*<Col lg="3">
                                                <FormGroup>
                                                    <label>{t("approved?")}</label>
                                                    <select ref={has_approved}
                                                            className="form-control-alternative form-control"
                                                            placeholder={t("enter") + " " + t("business_days")}>
                                                        <option value="0">No</option>
                                                        <option value="1">Yes</option>
                                                    </select>
                                                </FormGroup>
                                            </Col>*/}

                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>{t("total_amount")}</label>
                                                    <input ref={total_amount}
                                                           className="form-control-alternative form-control"
                                                           placeholder={t("enter") + " " + t("total_amount")} defaultValue={invoice.total_amount}/>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>{t("tax_amount")}</label>
                                                    <input ref={tax_amount}
                                                           className="form-control-alternative form-control"
                                                           placeholder={t("enter") + " " + t("tax_amount")}  defaultValue={invoice.tax_amount}/>
                                                </FormGroup>
                                            </Col>
                                            {/*<Col lg="3">
                                                <FormGroup>
                                                    <label>{t("approved?")}</label>
                                                    <select ref={has_approved}
                                                            className="form-control-alternative form-control"
                                                            placeholder={t("enter") + " " + t("business_days")}>
                                                        <option value="0">No</option>
                                                        <option value="1">Yes</option>
                                                    </select>
                                                </FormGroup>
                                            </Col>*/}

                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <hr/>
                                                <h3>Billing Details</h3>
                                                <hr/>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>{t("first_name")}</label>
                                                    <Row>
                                                        <Col>
                                                            <input ref={billing_first_name}
                                                                   className="form-control-alternative form-control"
                                                                   placeholder={t("enter") + " " + t("first_name")}
                                                                   defaultValue={invoice.billing_first_name}/>
                                                        </Col>
                                                        <Col>
                                                            <input ref={billing_first_name_arabic} dir={'rtl'}
                                                                   className="form-control-alternative form-control"
                                                                   placeholder={t("enter") + " " + t("first_name_arabic")}
                                                                   defaultValue={invoice.billing_first_name_arabic}/>
                                                        </Col>
                                                    </Row>

                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>{t("last_name")}</label>
                                                    <Row>
                                                        <Col>
                                                            <input ref={billing_last_name}
                                                                   className="form-control-alternative form-control"
                                                                   rows={1}
                                                                   placeholder={t("enter") + " " + t("last_name")}
                                                                   defaultValue={invoice.billing_last_name}/>
                                                        </Col>
                                                        <Col>
                                                            <input ref={billing_last_name_arabic} dir={'rtl'}
                                                                   className="form-control-alternative form-control"
                                                                   rows={1}
                                                                   placeholder={t("enter") + " " + t("last_name_arabic")}
                                                                   defaultValue={invoice.billing_last_name_arabic}/>
                                                        </Col>
                                                    </Row>
                                                </FormGroup>
                                            </Col>

                                        </Row>

                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>{t("email")}</label>
                                                    <input ref={billing_email}
                                                           className="form-control-alternative form-control"
                                                           placeholder={t("enter") + " " + t("email")}
                                                           defaultValue={invoice.billing_email}/>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>{t("phone")}</label>
                                                    <input ref={billing_phone}
                                                           className="form-control-alternative form-control"
                                                           placeholder={t("enter") + " " + t("phone")}
                                                           defaultValue={invoice.billing_phone}/>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>{t("company_name")}</label>
                                                    <Row>
                                                        <Col>
                                                            <input ref={billing_company_name}
                                                                   className="form-control-alternative form-control"
                                                                   placeholder={t("enter") + " " + t("company_name")}
                                                                   defaultValue={invoice.billing_company_name}/>
                                                        </Col>
                                                        <Col>
                                                            <input ref={billing_company_name_arabic} dir={'rtl'}
                                                                   className="form-control-alternative form-control"
                                                                   placeholder={t("enter") + " " + t("company_name_arabic")}
                                                                   defaultValue={invoice.billing_company_name_arabic}/>
                                                        </Col>
                                                    </Row>

                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>{t("website")}</label>
                                                    <input ref={billing_website}
                                                           className="form-control-alternative form-control"
                                                           placeholder={t("enter") + " " + t("website")}
                                                           defaultValue={invoice.billing_website}/>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>{t("building_no")}</label>
                                                    <Row>
                                                        <Col>
                                                            <input ref={billing_building_no}
                                                                   className="form-control-alternative form-control"
                                                                   placeholder={t("enter") + " " + t("building_no")}
                                                                   defaultValue={invoice.billing_building_no}/>
                                                        </Col>
                                                        <Col>
                                                            <input ref={billing_building_no_arabic} dir={'rtl'}
                                                                   className="form-control-alternative form-control"
                                                                   placeholder={t("enter") + " " + t("building_no_arabic")}
                                                                   defaultValue={invoice.billing_building_no_arabic}/>
                                                        </Col>
                                                    </Row>

                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>{t("street")}</label>
                                                    <Row>
                                                        <Col>
                                                            <input ref={billing_street}
                                                                   className="form-control-alternative form-control"
                                                                   placeholder={t("enter") + " " + t("street")}
                                                                   defaultValue={invoice.billing_street}/>
                                                        </Col>
                                                        <Col>
                                                            <input ref={billing_street_arabic} dir={'rtl'}
                                                                   className="form-control-alternative form-control"
                                                                   placeholder={t("enter") + " " + t("street_arabic")}
                                                                   defaultValue={invoice.billing_street_arabic}/>
                                                        </Col>
                                                    </Row>

                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>{t("district")}</label>
                                                    <Row>
                                                        <Col>
                                                            <input ref={billing_district}
                                                                   className="form-control-alternative form-control"
                                                                   placeholder={t("enter") + " " + t("district")}
                                                                   defaultValue={invoice.billing_district}/>
                                                        </Col>
                                                        <Col>
                                                            <input ref={billing_district_arabic} dir={'rtl'}
                                                                   className="form-control-alternative form-control"
                                                                   placeholder={t("enter") + " " + t("district_arabic")}
                                                                   defaultValue={invoice.billing_district_arabic}/>
                                                        </Col>
                                                    </Row>

                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>{t("city")}</label>
                                                    <Row>
                                                        <Col>
                                                            <input ref={billing_city}
                                                                   className="form-control-alternative form-control"
                                                                   placeholder={t("enter") + " " + t("city")}
                                                                   defaultValue={invoice.billing_city}/>
                                                        </Col>
                                                        <Col>
                                                            <input ref={billing_city_arabic} dir={'rtl'}
                                                                   className="form-control-alternative form-control"
                                                                   placeholder={t("enter") + " " + t("city_arabic")}
                                                                   defaultValue={invoice.billing_city_arabic}/>
                                                        </Col>
                                                    </Row>

                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>{t("state")}</label>
                                                    <Row>
                                                        <Col>
                                                            <input ref={billing_state}
                                                                   className="form-control-alternative form-control"
                                                                   placeholder={t("enter") + " " + t("state")}
                                                                   defaultValue={invoice.billing_state}/>
                                                        </Col>
                                                        <Col>
                                                            <input ref={billing_state_arabic} dir={'rtl'}
                                                                   className="form-control-alternative form-control"
                                                                   placeholder={t("enter") + " " + t("state_arabic")}
                                                                   defaultValue={invoice.billing_state_arabic}/>
                                                        </Col>
                                                    </Row>

                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>{t("zip_code")}</label>
                                                    <input ref={billing_zip_code}
                                                           className="form-control-alternative form-control"
                                                           placeholder={t("enter") + " " + t("zip_code")}
                                                           defaultValue={invoice.billing_zip_code}/>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>{t("country")}</label>
                                                    <Row>
                                                        <Col>
                                                            <input ref={billing_country}
                                                                   className="form-control-alternative form-control"
                                                                   placeholder={t("enter") + " " + t("country")}
                                                                   defaultValue={invoice.billing_country}/>
                                                        </Col>
                                                        <Col>
                                                            <input ref={billing_country_arabic} dir={'rtl'}
                                                                   className="form-control-alternative form-control"
                                                                   placeholder={t("enter") + " " + t("country_arabic")}
                                                                   defaultValue={invoice.billing_country_arabic}/>
                                                        </Col>
                                                    </Row>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>{t("additional_no")}</label>
                                                    <input ref={billing_additional_no}
                                                           className="form-control-alternative form-control"
                                                           placeholder={t("enter") + " " + t("additional_no")}
                                                           defaultValue={invoice.billing_additional_no}/>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>{t("vat_number")}</label>
                                                    <Row>
                                                        <Col>
                                                            <input ref={billing_vat_number}
                                                                   className="form-control-alternative form-control"
                                                                   placeholder={t("enter") + " " + t("vat_number")}
                                                                   defaultValue={invoice.billing_vat_number}/>

                                                        </Col>
                                                        <Col>
                                                            <input ref={billing_vat_number_arabic} dir={'rtl'}
                                                                   className="form-control-alternative form-control"
                                                                   placeholder={t("enter") + " " + t("vat_number_arabic")}
                                                                   defaultValue={invoice.billing_vat_number_arabic}/>
                                                        </Col>
                                                    </Row>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>{t("other_buyer_id")}</label>
                                                    <textarea ref={billing_other_buyer_id} rows={4}
                                                              className="form-control-alternative form-control"
                                                              placeholder={t("enter") + " " + t("other_buyer_id")}
                                                              defaultValue={invoice.billing_other_buyer_id}/>
                                                </FormGroup>
                                            </Col>

                                        </Row>
                                        <Row>
                                            <Col lg="12">
                                                <FormGroup>
                                                    <label>{t("terms_and_conditions")}</label>
                                                    <Row>
                                                        <Col>
                                                            <CKEditor
                                                                editor={ClassicEditor}
                                                                data={invoice.notes}
                                                                onChange={(event, editor) => {
                                                                    setNotes(editor.getData());
                                                                }}
                                                                onReady={editor => {
                                                                    setNotes(editor.getData());
                                                                }}
                                                            />
                                                            <textarea ref={billing_notes} rows={4}
                                                                      className="form-control-alternative form-control d-none"
                                                                      placeholder={t("enter") + " " + t("notes")}
                                                                      defaultValue={invoice.billing_notes}/>
                                                            <textarea ref={billing_notes_arabic} dir={'rtl'} rows={4}
                                                                      className="form-control-alternative form-control d-none"
                                                                      placeholder={t("enter") + " " + t("notes_arabic")}
                                                                      defaultValue={invoice.billing_notes_arabic}/>
                                                        </Col>
                                                        {/*<Col>
                                                        </Col>*/}
                                                    </Row>

                                                </FormGroup>
                                            </Col>

                                        </Row>

                                        <Row>
                                            <Col lg={'12'}>

                                                <a
                                                    onClick={() => addMoreInvoiceItem(0)}
                                                    className="float-right btn btn-dark mb-3">
                                                    {t("add_more")}
                                                </a>
                                                <table
                                                    className="stratprop_datatable table table-bordered align-items-center table-flush table">
                                                    <tbody>
                                                    <tr>
                                                        <td width={"15%"}>{t("item")}</td>
                                                        <td width={"30%"} colSpan={2}>{t("description")}</td>
                                                        <td width={"15%"}>{t("qty")}</td>
                                                        <td width={"15%"}>{t("unit_price")}</td>
                                                        <td width={"15%"}>{t("taxable_amount")}</td>
                                                        <td width={"15%"}>{t("discount")}</td>
                                                        <td width={"15%"}>{t("tax_rate")}</td>
                                                        <td width={"15%"}>{t("tax_amount")}</td>
                                                        <td width={"15%"}>{t("total")}</td>
                                                        <td width={"5%"}>{t("actions")}</td>
                                                    </tr>

                                                    {invoiceItems.length > 0 ? (
                                                            invoiceItems.map((invoiceItem, index) => (
                                                                <tr>

                                                                    <td className={'invoice-td'}>
                                                                        <textarea
                                                                            rows={4}
                                                                            defaultValue={invoiceItem.item}
                                                                            className="form-control-alternative form-control"
                                                                            placeholder={t("item")}
                                                                            onKeyDown={(e) => itemHandler(index, e.target.value)}
                                                                            onKeyUp={(e) => itemHandler(index, e.target.value)}
                                                                            onKeyPress={(e) => itemHandler(index, e.target.value)}/>
                                                                    </td>
                                                                    <td className={'invoice-td'} colSpan={2}>
                                                                        <textarea
                                                                            rows={4}
                                                                            defaultValue={invoiceItem.description}
                                                                            className="form-control-alternative form-control"
                                                                            placeholder={t("description")}
                                                                            onKeyDown={(e) => descriptionHandler(index, e.target.value)}
                                                                            onKeyUp={(e) => descriptionHandler(index, e.target.value)}
                                                                            onKeyPress={(e) => descriptionHandler(index, e.target.value)}/>
                                                                    </td>
                                                                    <td className={'invoice-td'}>
                                                                        <textarea
                                                                            rows={4}
                                                                            defaultValue={invoiceItem.qty}
                                                                            className="form-control-alternative form-control"
                                                                            placeholder={t("qty")}
                                                                            onKeyDown={(e) => qtyHandler(index, e.target.value)}
                                                                            onKeyUp={(e) => qtyHandler(index, e.target.value)}
                                                                            onKeyPress={(e) => qtyHandler(index, e.target.value)}
                                                                            onClick={(e) => qtyHandler(index, e.target.value)}
                                                                            onChange={(e) => qtyHandler(index, e.target.value)}
                                                                        />
                                                                    </td>
                                                                    <td className={'invoice-td'}>
                                                                        <textarea
                                                                            rows={4}
                                                                            defaultValue={invoiceItem.price}
                                                                            className="form-control-alternative form-control"
                                                                            placeholder={t("price")}
                                                                            onKeyDown={(e) => priceHandler(index, e.target.value)}
                                                                            onKeyUp={(e) => priceHandler(index, e.target.value)}
                                                                            onKeyPress={(e) => priceHandler(index, e.target.value)}
                                                                            onClick={(e) => priceHandler(index, e.target.value)}
                                                                            onChange={(e) => priceHandler(index, e.target.value)}
                                                                        />
                                                                    </td>
                                                                    <td className={'invoice-td'}>
                                                                        <textarea
                                                                            rows={4}
                                                                            defaultValue={invoiceItem.taxable_amount}
                                                                            className="form-control-alternative form-control"
                                                                            placeholder={t("taxable_amount")}
                                                                            onKeyDown={(e) => taxableAmountHandler(index, e.target.value)}
                                                                            onKeyUp={(e) => taxableAmountHandler(index, e.target.value)}
                                                                            onKeyPress={(e) => taxableAmountHandler(index, e.target.value)}
                                                                            onClick={(e) => taxableAmountHandler(index, e.target.value)}
                                                                            onChange={(e) => taxableAmountHandler(index, e.target.value)}
                                                                        />
                                                                    </td>
                                                                    <td className={'invoice-td'}>
                                                                        <textarea
                                                                            rows={4}
                                                                            defaultValue={invoiceItem.discount}
                                                                            className="form-control-alternative form-control"
                                                                            placeholder={t("discount")}
                                                                            onKeyDown={(e) => discountHandler(index, e.target.value)}
                                                                            onKeyUp={(e) => discountHandler(index, e.target.value)}
                                                                            onKeyPress={(e) => discountHandler(index, e.target.value)}
                                                                            onClick={(e) => discountHandler(index, e.target.value)}
                                                                            onChange={(e) => discountHandler(index, e.target.value)}
                                                                        />
                                                                    </td>
                                                                    <td className={'invoice-td'}>
                                                                        <textarea
                                                                            rows={4}
                                                                            defaultValue={invoiceItem.tax_rate}
                                                                            className="form-control-alternative form-control"
                                                                            placeholder={t("tax_rate")}
                                                                            onKeyDown={(e) => taxRateHandler(index, e.target.value)}
                                                                            onKeyUp={(e) => taxRateHandler(index, e.target.value)}
                                                                            onKeyPress={(e) => taxRateHandler(index, e.target.value)}
                                                                            onClick={(e) => taxRateHandler(index, e.target.value)}
                                                                            onChange={(e) => taxRateHandler(index, e.target.value)}
                                                                        />
                                                                    </td>
                                                                    <td className={'invoice-td'}>
                                                                        <textarea
                                                                            rows={4}
                                                                            defaultValue={invoiceItem.tax_amount}
                                                                            className="form-control-alternative form-control"
                                                                            placeholder={t("tax_amount")}
                                                                            onKeyDown={(e) => taxAmountHandler(index, e.target.value)}
                                                                            onKeyUp={(e) => taxAmountHandler(index, e.target.value)}
                                                                            onKeyPress={(e) => taxAmountHandler(index, e.target.value)}
                                                                            onClick={(e) => taxAmountHandler(index, e.target.value)}
                                                                            onChange={(e) => taxAmountHandler(index, e.target.value)}
                                                                        />
                                                                    </td>
                                                                    {/*<td>
                                                                        <input type={"hidden"}
                                                                               value={invoiceItem.total}
                                                                               className="form-control-alternative form-control"
                                                                               placeholder={t("total")}
                                                                               readOnly={'readonly'}
                                                                        />
                                                                        {invoiceItem.total}
                                                                    </td>*/}
                                                                    <td className={'invoice-td'}>
                                                                        <textarea
                                                                            rows={4}
                                                                            defaultValue={invoiceItem.total}
                                                                            className="form-control-alternative form-control"
                                                                            placeholder={t("total")}
                                                                            onKeyDown={(e) => totalHandler(index, e.target.value)}
                                                                            onKeyUp={(e) => totalHandler(index, e.target.value)}
                                                                            onKeyPress={(e) => totalHandler(index, e.target.value)}
                                                                            onClick={(e) => totalHandler(index, e.target.value)}
                                                                            onChange={(e) => totalHandler(index, e.target.value)}
                                                                        />
                                                                    </td>
                                                                    <td className={'invoice-td'}>
                                                                        <a
                                                                            onClick={() => removeInvoiceItem(index)}
                                                                            className="float-right btn btn-dark">
                                                                            <i className={"fa fa-trash"}></i>
                                                                        </a>
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        )
                                                        :
                                                        (
                                                            ""
                                                        )}
                                                    {/*<tr>
                                                        <th colSpan={2}></th>
                                                        <th className='text-right'>
                                                            <a
                                                                onClick={() => addMoreInvoiceCustomFields(0)}
                                                                className="float-right btn btn-dark btn-small">
                                                                <i className={"fa fa-plus"}></i>
                                                            </a>
                                                        </th>
                                                        <th className='text-right'>Total</th>
                                                        <td colSpan={2}>{total}</td>
                                                    </tr>*/}
                                                    {invoiceCustomFields.length > 0 ? (
                                                            invoiceCustomFields.map((field, index) => (
                                                                    <tr>
                                                                        <th colSpan={2}></th>
                                                                        <th className='text-right'>
                                                                            <a
                                                                                onClick={() => addMoreInvoiceCustomFields(index)}
                                                                                className="float-right btn btn-dark btn-small">
                                                                                <i className={"fa fa-plus"}></i>
                                                                            </a>
                                                                        </th>
                                                                        <th className='text-right' colSpan={2}>
                                                                            <input
                                                                                className="form-control-alternative form-control"
                                                                                placeholder={t("enter") + " " + t("name")}
                                                                                defaultValue={field.name}
                                                                                onKeyDown={(e) => nameFieldHandler(index, e.target.value)}
                                                                                onKeyUp={(e) => nameFieldHandler(index, e.target.value)}
                                                                                onKeyPress={(e) => nameFieldHandler(index, e.target.value)}
                                                                                onClick={(e) => nameFieldHandler(index, e.target.value)}
                                                                                onChange={(e) => nameFieldHandler(index, e.target.value)}

                                                                            />
                                                                        </th>
                                                                        <th className='text-right' colSpan={2}>
                                                                            <input
                                                                                dir={"rtl"}
                                                                                className="form-control-alternative form-control"
                                                                                placeholder={t("enter") + " " + t("name_arabic")}
                                                                                defaultValue={field.name_arabic}
                                                                                onKeyDown={(e) => nameArabicFieldHandler(index, e.target.value)}
                                                                                onKeyUp={(e) => nameArabicFieldHandler(index, e.target.value)}
                                                                                onKeyPress={(e) => nameArabicFieldHandler(index, e.target.value)}
                                                                                onClick={(e) => nameArabicFieldHandler(index, e.target.value)}
                                                                                onChange={(e) => nameArabicFieldHandler(index, e.target.value)}

                                                                            />
                                                                        </th>
                                                                        <td colSpan={2}>
                                                                            <input
                                                                                className="form-control-alternative form-control"
                                                                                placeholder={t("enter") + " " + t("value")}
                                                                                defaultValue={field.value}
                                                                                onKeyDown={(e) => valueFieldHandler(index, e.target.value)}
                                                                                onKeyUp={(e) => valueFieldHandler(index, e.target.value)}
                                                                                onKeyPress={(e) => valueFieldHandler(index, e.target.value)}
                                                                                onClick={(e) => valueFieldHandler(index, e.target.value)}
                                                                                onChange={(e) => valueFieldHandler(index, e.target.value)}
                                                                            />
                                                                        </td>
                                                                        <td>
                                                                            <a
                                                                                onClick={() => removeInvoiceCustomField(index)}
                                                                                className="float-right btn btn-dark btn-small">
                                                                                <i className={"fa fa-trash"}></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            ))
                                                        : ("")
                                                    }
                                                    <tr className={"d-none"}>
                                                        <th colSpan={4} className='text-right'>Vat 15%</th>
                                                        <td colSpan={2}>{vat}</td>
                                                    </tr>
                                                    <tr className={"d-none"}>
                                                        <th colSpan={4} className='text-right'>Sub Total</th>
                                                        <td colSpan={2}>{subTotal}</td>
                                                    </tr>
                                                    <tr className={"d-none"}>
                                                        <th colSpan={4} className='text-right'>60%</th>
                                                        <td colSpan={2}>{subTotal60}</td>
                                                    </tr>
                                                    <tr className={"d-none"}>
                                                        <th colSpan={4} className='text-right'>40%</th>
                                                        <td colSpan={2}>{subTotal40}</td>
                                                    </tr>

                                                    </tbody>
                                                </table>
                                            </Col>
                                        </Row>

                                        <Button variant="primary" className="float-right mt-3" type="submit"
                                                disabled={disabled}
                                                color="dark"
                                                href="#pablo" onClick={updateInvoiceHandler}>
                                            {t("save")}
                                            <span
                                                dangerouslySetInnerHTML={{__html: disabled ? `<i class='fas fa-spinner fa-spin'></i>` : ``}}/>
                                        </Button>
                                    </Form>

                                </div>

                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
