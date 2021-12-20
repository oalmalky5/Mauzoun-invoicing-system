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

export function CreateInvoice(props) {
    const {t} = useTranslation();
    const customer_id = useRef();
    const sr_no = useRef();
    const date = useRef();
    const due_date = useRef();
    const billing_email = useRef();
    const billing_phone = useRef();
    const billing_company_name = useRef();
    const billing_street = useRef();
    const billing_city = useRef();
    const billing_state = useRef();
    const billing_zip_code = useRef();
    const billing_country = useRef();
    const expiry_date = useRef();
    const business_days = useRef();
    /*const has_approved = useRef();*/
    const notes = useRef();

    const [customers, setCustomers] = useState([]);
    const [customer, setCustomer] = useState({});
    const [disabled, setDisabled] = useState(false);
    const [total, setTotal] = useState(0);
    const [vat, setVat] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [subTotal60, setSubTotal60] = useState(0);
    const [subTotal40, setSubTotal40] = useState(0);
    const [iconDisabled, setIconDisabled] = useState(false);

    const initialInvoiceItem = {
        "item": "",
        "description": "",
        "qty": "",
        "price": "",
        "total": 0
    };
    const [invoiceItems, setInvoiceItems] = useState([initialInvoiceItem]);


    const initialInvoiceCustomField = {
        "name": "",
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

    const createInvoiceHandler = (e) => {
        e.preventDefault();
        setDisabled(true);
        setIconDisabled(false);
        axios.post(API_URL + "invoices/store",
            {
                customer_id: customer_id.current.value,
                sr_no: sr_no.current.value,
                date: date.current.value,
                due_date: due_date.current.value,
                billing_email: billing_email.current.value,
                billing_phone: billing_phone.current.value,
                billing_company_name: billing_company_name.current.value,
                billing_street: billing_street.current.value,
                billing_city: billing_city.current.value,
                billing_state: billing_state.current.value,
                billing_zip_code: billing_zip_code.current.value,
                billing_country: billing_country.current.value,
                total: total,
                sub_total: subTotal,
                expiry_date: expiry_date.current.value,
                business_days: business_days.current.value,
                /*has_approved: has_approved.current.value,*/
                notes: notes.current.value,
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
                alertify.error('Please fill form correctly');
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
        if (selected_customer != undefined)
            setCustomer(selected_customer);
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

    const nameFieldHandler = (e, value) => {
        let invoice_custom_fields = JSON.parse(JSON.stringify(invoiceCustomFields));
        invoice_custom_fields[e].name = value;
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
                                                    >
                                                        <option value="">Select Customer</option>
                                                        {customers.map((customer, key) => (
                                                            <option key={customer.id}
                                                                    value={customer.id}>
                                                                {customer.first_name} {customer.lasst_name}
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
                                                           placeholder={t("enter") + " " + t("invoice_no")}/>
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
                                                           placeholder={t("enter") + " " + t("invoice_date")}/>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>{t("invoice_expiry_date")}</label>
                                                    <input ref={due_date}
                                                           type="date"
                                                           className="form-control-alternative form-control"
                                                           placeholder={t("enter") + " " + t("invoice_expiry_date")}/>
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
                                                           placeholder={t("enter") + " " + t("project_expiry_date")}/>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>{t("business_days")}</label>
                                                    <input ref={business_days}
                                                           type="number"
                                                           className="form-control-alternative form-control"
                                                           placeholder={t("enter") + " " + t("business_days")}/>
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
                                                    <label>{t("email")}</label>
                                                    <input ref={billing_email}
                                                           className="form-control-alternative form-control"
                                                           placeholder={t("enter") + " " + t("email")}
                                                           defaultValue={customer.email}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>{t("phone")}</label>
                                                    <input ref={billing_phone}
                                                           className="form-control-alternative form-control"
                                                           placeholder={t("enter") + " " + t("phone")}
                                                           defaultValue={customer.phone}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>{t("company_name")}</label>
                                                    <input ref={billing_company_name}
                                                           className="form-control-alternative form-control"
                                                           placeholder={t("enter") + " " + t("company_name")}
                                                           defaultValue={customer.company_name}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>{t("street")}</label>
                                                    <input ref={billing_street}
                                                           className="form-control-alternative form-control"
                                                           placeholder={t("enter") + " " + t("street")}
                                                           defaultValue={customer.street}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>{t("city")}</label>
                                                    <input ref={billing_city}
                                                           className="form-control-alternative form-control"
                                                           placeholder={t("enter") + " " + t("city")}
                                                           defaultValue={customer.city}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>{t("state")}</label>
                                                    <input ref={billing_state}
                                                           className="form-control-alternative form-control"
                                                           placeholder={t("enter") + " " + t("state")}
                                                           defaultValue={customer.state}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>{t("zip_code")}</label>
                                                    <input ref={billing_zip_code}
                                                           className="form-control-alternative form-control"
                                                           placeholder={t("enter") + " " + t("zip_code")}
                                                           defaultValue={customer.zip_code}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>{t("country")}</label>
                                                    <input ref={billing_country}
                                                           className="form-control-alternative form-control"
                                                           placeholder={t("enter") + " " + t("country")}
                                                           defaultValue={customer.country}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col lg="12">
                                                <FormGroup>
                                                    <label>{t("notes")}</label>
                                                    <textarea ref={notes} rows={4}
                                                              className="form-control-alternative form-control"
                                                              placeholder={t("enter") + " " + t("notes")}/>
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
                                                        <td width={"45%"} colSpan={2}>{t("description")}</td>
                                                        <td width={"15%"}>{t("qty")}</td>
                                                        <td width={"15%"}>{t("unit_price")}</td>
                                                        {/*<td width={"15%"}>{t("total")}</td>*/}
                                                        <td width={"10%"}>{t("actions")}</td>
                                                    </tr>

                                                    {invoiceItems.length > 0 ? (
                                                            invoiceItems.map((invoiceItem, index) => (
                                                                <tr>

                                                                    <td>
                                                                        <input
                                                                            defaultValue={invoiceItem.item}
                                                                            className="form-control-alternative form-control"
                                                                            placeholder={t("item")}
                                                                            onKeyDown={(e) => itemHandler(index, e.target.value)}
                                                                            onKeyUp={(e) => itemHandler(index, e.target.value)}
                                                                            onKeyPress={(e) => itemHandler(index, e.target.value)}/>
                                                                    </td>
                                                                    <td colSpan={2}>
                                                                        <textarea
                                                                            defaultValue={invoiceItem.description}
                                                                            className="form-control-alternative form-control"
                                                                            placeholder={t("description")}
                                                                            onKeyDown={(e) => descriptionHandler(index, e.target.value)}
                                                                            onKeyUp={(e) => descriptionHandler(index, e.target.value)}
                                                                            onKeyPress={(e) => descriptionHandler(index, e.target.value)}/>
                                                                    </td>
                                                                    <td>
                                                                        <input
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
                                                                    <td>
                                                                        <input
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
                                                                    {/*<td>
                                                                        <input type={"hidden"}
                                                                               value={invoiceItem.total}
                                                                               className="form-control-alternative form-control"
                                                                               placeholder={t("total")}
                                                                               readOnly={'readonly'}
                                                                        />
                                                                        {invoiceItem.total}
                                                                    </td>*/}
                                                                    <td>
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
                                                                        <th className='text-right'>
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
                                                                        <td>
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
                                                href="#pablo" onClick={createInvoiceHandler}>
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
