import React, {useEffect, useState, useRef} from "react";
import axios from "axios";

import alertify from "alertifyjs";
import {API_URL} from "../../constants";


// import {CKEditor} from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {Link} from "react-router-dom";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Container, DropdownItem,
    DropdownMenu,
    DropdownToggle, Form, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader,
    Row,
    UncontrolledDropdown
} from "reactstrap";
import Header from "../../components/Headers/Header";
import {useTranslation} from "react-i18next";

// import {useTranslation} from "react-i18next";

export function EditCustomer(props) {
    // const { t } = useTranslation();
    const first_name = useRef();
    const first_name_arabic = useRef();
    const last_name = useRef();
    const last_name_arabic = useRef();
    const email = useRef();
    const phone = useRef();
    const website = useRef();
    const company_name = useRef();
    const company_name_arabic = useRef();
    const street = useRef();
    const city = useRef();
    const state = useRef();
    const zip_code = useRef();
    const country = useRef();
    const notes = useRef();
    const building_no = useRef();
    const building_no_arabic = useRef();
    const street_arabic = useRef();
    const district = useRef();
    const district_arabic = useRef();
    const city_arabic = useRef();
    const state_arabic = useRef();
    const country_arabic = useRef();
    const vat_number = useRef();
    const other_buyer_id = useRef();
    const notes_arabic = useRef();
    const additional_no = useRef();


    const [disabled, setDisabled] = useState(false);
    const [iconDisabled, setIconDisabled] = useState(true);
    const [customer, setCustomer] = useState({});
    const id = props.match.params.id;
    const {t} = useTranslation();


    useEffect(() => {
        axios.get(API_URL + 'customers/' + id + '/show').then((response) => {

            if (response.data.status) {
                setCustomer(response.data.data);
                console.log(response.data.data);

            } else if (response.data.code === 404) {
                alertify.error(response.data.message);
                return null;
            }
        });
    }, []);


    const updateCustomerHandler = (e) => {
        e.preventDefault();
        setDisabled(true);
        setIconDisabled(false);
        axios.post(API_URL + "customers/update",
            {
                id: customer.id,
                first_name: first_name.current.value,
                last_name: last_name.current.value,
                first_name_arabic: first_name_arabic.current.value,
                last_name_arabic: last_name_arabic.current.value,
                email: email.current.value,
                phone: phone.current.value,
                website: website.current.value,
                company_name: company_name.current.value,
                company_name_arabic: company_name_arabic.current.value,
                street: street.current.value,
                street_arabic: street_arabic.current.value,
                city: city.current.value,
                city_arabic: city_arabic.current.value,
                state: state.current.value,
                state_arabic: state_arabic.current.value,
                zip_code: zip_code.current.value,
                country: country.current.value,
                country_arabic: country_arabic.current.value,
                notes: notes.current.value,
                notes_arabic: notes_arabic.current.value,
                district: district.current.value,
                district_arabic: district_arabic.current.value,
                building_no: building_no.current.value,
                building_no_arabic: building_no_arabic.current.value,
                vat_number: vat_number.current.value,
                other_buyer_id: other_buyer_id.current.value,
                additional_no: additional_no.current.value,
            }
        ).then((response) => {
            setDisabled(false);
            setIconDisabled(true);
            if (response.data.status) {
                alertify.success(response.data.message);

                props.history.push("/admin/customers/list");
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


    return (
        <>
            <Header/>
            <Container className="mt--7" fluid>
                <Row>
                    <Col md={12}>
                        <Card>
                            <CardHeader>
                                <h2 className="mb-0">{t("edit_customer")}</h2>
                            </CardHeader>
                            <CardBody>
                                <div className="mt-5">
                                    <Form>
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>{t("first_name")}</label>
                                                    <Row>
                                                        <Col>
                                                            <input ref={first_name}
                                                                   className="form-control-alternative form-control"
                                                                   placeholder={t("enter") + " " + t("first_name")} defaultValue={customer.first_name}/>
                                                        </Col>
                                                        <Col>
                                                            <input ref={first_name_arabic} dir={'rtl'}
                                                                   className="form-control-alternative form-control"
                                                                   placeholder={t("enter") + " " + t("first_name_arabic")} defaultValue={customer.first_name_arabic}/>
                                                        </Col>
                                                    </Row>

                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>{t("last_name")}</label>
                                                    <Row>
                                                        <Col>
                                                            <input ref={last_name}
                                                                   className="form-control-alternative form-control"
                                                                   rows={1}
                                                                   placeholder={t("enter") + " " + t("last_name")} defaultValue={customer.last_name}/>
                                                        </Col>
                                                        <Col>
                                                            <input ref={last_name_arabic} dir={'rtl'}
                                                                   className="form-control-alternative form-control"
                                                                   rows={1}
                                                                   placeholder={t("enter") + " " + t("last_name_arabic")} defaultValue={customer.last_name_arabic}/>
                                                        </Col>
                                                    </Row>
                                                </FormGroup>
                                            </Col>

                                        </Row>

                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>{t("email")}</label>
                                                    <input ref={email} className="form-control-alternative form-control"
                                                           placeholder={t("enter") + " " + t("email")} defaultValue={customer.email}/>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>{t("phone")}</label>
                                                    <input ref={phone} className="form-control-alternative form-control"
                                                           placeholder={t("enter") + " " + t("phone")} defaultValue={customer.phone}/>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>{t("company_name")}</label>
                                                    <Row>
                                                        <Col>
                                                            <input ref={company_name}
                                                                   className="form-control-alternative form-control"
                                                                   placeholder={t("enter") + " " + t("company_name")} defaultValue={customer.company_name}/>
                                                        </Col>
                                                        <Col>
                                                            <input ref={company_name_arabic} dir={'rtl'}
                                                                   className="form-control-alternative form-control"
                                                                   placeholder={t("enter") + " " + t("company_name_arabic")} defaultValue={customer.company_name_arabic}/>
                                                        </Col>
                                                    </Row>

                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>{t("website")}</label>
                                                    <input ref={website}
                                                           className="form-control-alternative form-control"
                                                           placeholder={t("enter") + " " + t("website")} defaultValue={customer.website}/>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>{t("building_no")}</label>
                                                    <Row>
                                                        <Col>
                                                            <input ref={building_no}
                                                                   className="form-control-alternative form-control"
                                                                   placeholder={t("enter") + " " + t("building_no")} defaultValue={customer.building_no}/>
                                                        </Col>
                                                        <Col>
                                                            <input ref={building_no_arabic} dir={'rtl'}
                                                                   className="form-control-alternative form-control"
                                                                   placeholder={t("enter") + " " + t("building_no_arabic")} defaultValue={customer.building_no_arabic}/>
                                                        </Col>
                                                    </Row>

                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>{t("street")}</label>
                                                    <Row>
                                                        <Col>
                                                            <input ref={street}
                                                                   className="form-control-alternative form-control"
                                                                   placeholder={t("enter") + " " + t("street")} defaultValue={customer.street}/>
                                                        </Col>
                                                        <Col>
                                                            <input ref={street_arabic} dir={'rtl'}
                                                                   className="form-control-alternative form-control"
                                                                   placeholder={t("enter") + " " + t("street_arabic")} defaultValue={customer.street_arabic}/>
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
                                                            <input ref={district}
                                                                   className="form-control-alternative form-control"
                                                                   placeholder={t("enter") + " " + t("district")} defaultValue={customer.district}/>
                                                        </Col>
                                                        <Col>
                                                            <input ref={district_arabic} dir={'rtl'}
                                                                   className="form-control-alternative form-control"
                                                                   placeholder={t("enter") + " " + t("district_arabic")} defaultValue={customer.district_arabic}/>
                                                        </Col>
                                                    </Row>

                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>{t("city")}</label>
                                                    <Row>
                                                        <Col>
                                                            <input ref={city}
                                                                   className="form-control-alternative form-control"
                                                                   placeholder={t("enter") + " " + t("city")} defaultValue={customer.city}/>
                                                        </Col>
                                                        <Col>
                                                            <input ref={city_arabic} dir={'rtl'}
                                                                   className="form-control-alternative form-control"
                                                                   placeholder={t("enter") + " " + t("city_arabic")} defaultValue={customer.city_arabic}/>
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
                                                            <input ref={state}
                                                                   className="form-control-alternative form-control"
                                                                   placeholder={t("enter") + " " + t("state")} defaultValue={customer.state}/>
                                                        </Col>
                                                        <Col>
                                                            <input ref={state_arabic} dir={'rtl'}
                                                                   className="form-control-alternative form-control"
                                                                   placeholder={t("enter") + " " + t("state_arabic")}  defaultValue={customer.state_arabic}/>
                                                        </Col>
                                                    </Row>

                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>{t("zip_code")}</label>
                                                    <input ref={zip_code}
                                                           className="form-control-alternative form-control"
                                                           placeholder={t("enter") + " " + t("zip_code")} defaultValue={customer.zip_code}/>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>{t("country")}</label>
                                                    <Row>
                                                        <Col>
                                                            <input ref={country}
                                                                   className="form-control-alternative form-control"
                                                                   placeholder={t("enter") + " " + t("country")} defaultValue={customer.country}/>
                                                        </Col>
                                                        <Col>
                                                            <input ref={country_arabic} dir={'rtl'}
                                                                   className="form-control-alternative form-control"
                                                                   placeholder={t("enter") + " " + t("country_arabic")} defaultValue={customer.country_arabic}/>
                                                        </Col>
                                                    </Row>

                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>{t("additional_no")}</label>
                                                    <input ref={additional_no}
                                                           className="form-control-alternative form-control"
                                                           placeholder={t("enter") + " " + t("additional_no")} defaultValue={customer.additional_no}/>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>{t("vat_number")}</label>
                                                    <textarea ref={vat_number} rows={4}
                                                              className="form-control-alternative form-control"
                                                              placeholder={t("enter") + " " + t("vat_number")} defaultValue={customer.vat_number}/>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>{t("other_buyer_id")}</label>
                                                    <textarea ref={other_buyer_id} rows={4}
                                                              className="form-control-alternative form-control"
                                                              placeholder={t("enter") + " " + t("other_buyer_id")} defaultValue={customer.other_buyer_id}/>
                                                </FormGroup>
                                            </Col>

                                        </Row>
                                        <Row>
                                            <Col lg="12">
                                                <FormGroup>
                                                    <label>{t("notes")}</label>
                                                    <Row>
                                                        <Col>
                                                            <textarea ref={notes} rows={4}
                                                                      className="form-control-alternative form-control"
                                                                      placeholder={t("enter") + " " + t("notes")} defaultValue={customer.notes}/>
                                                        </Col>
                                                        <Col>
                                                            <textarea ref={notes_arabic} dir={'rtl'} rows={4}
                                                                      className="form-control-alternative form-control"
                                                                      placeholder={t("enter") + " " + t("notes_arabic")} defaultValue={customer.notes_arabic}/>
                                                        </Col>
                                                    </Row>

                                                </FormGroup>
                                            </Col>

                                        </Row>

                                        <Button variant="dark" className="float-right" type="submit"
                                                disabled={disabled} color="dark"
                                                href="#pablo" onClick={updateCustomerHandler}>
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
