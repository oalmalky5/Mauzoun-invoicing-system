import React, {useState, useRef} from "react";
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

export function CreateCustomer(props) {
    const {t} = useTranslation();
    const first_name = useRef();
    const last_name = useRef();
    const email = useRef();
    const phone = useRef();
    const website = useRef();
    const company_name = useRef();
    const street = useRef();
    const city = useRef();
    const state = useRef();
    const zip_code = useRef();
    const country = useRef();
    const notes = useRef();

    const [disabled, setDisabled] = useState(false);
    const [iconDisabled, setIconDisabled] = useState(true);

    const config = {
        headers: {
            Authorization: 'Bearer ' + STATIC_TOKEN,
        }
    };

    const createCustomerHandler = (e) => {
        e.preventDefault();
        setDisabled(true);
        setIconDisabled(false);
        axios.post(API_URL + "customers/store",
            {
                first_name: first_name.current.value,
                last_name: last_name.current.value,
                email: email.current.value,
                phone: phone.current.value,
                website: website.current.value,
                company_name: company_name.current.value,
                street: street.current.value,
                city: city.current.value,
                state: state.current.value,
                zip_code: zip_code.current.value,
                country: country.current.value,
                notes: notes.current.value
            },
        ).then((response) => {
            setDisabled(false);
            setIconDisabled(true);
            if (response.data.status) {
                alertify.success(response.data.message);

                props.history.push("/admin/customers/list");
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
    }
    return (
        <>
            <Header/>
            <Container className="mt--7" fluid>
                <Row>
                    <Col md={12}>
                        <Card>
                            <CardHeader>
                                <h2 className="mb-0">{t("add_new_customer")}</h2>
                            </CardHeader>
                            <CardBody>

                                <div className="mt-5">
                                    <Form>
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>{t("first_name")}</label>
                                                    <input ref={first_name}
                                                           className="form-control-alternative form-control"
                                                           placeholder={t("enter") + " " + t("first_name")}/>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>{t("last_name")}</label>
                                                    <input ref={last_name}
                                                           className="form-control-alternative form-control"
                                                           rows={1}
                                                           placeholder={t("enter") + " " + t("last_name")}/>
                                                </FormGroup>
                                            </Col>

                                        </Row>

                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>{t("email")}</label>
                                                    <input ref={email} className="form-control-alternative form-control"
                                                           placeholder={t("enter") + " " + t("email")}/>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>{t("phone")}</label>
                                                    <input ref={phone} className="form-control-alternative form-control"
                                                           placeholder={t("enter") + " " + t("phone")}/>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>{t("company_name")}</label>
                                                    <input ref={company_name}
                                                           className="form-control-alternative form-control"
                                                           placeholder={t("enter") + " " + t("company_name")}/>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>{t("website")}</label>
                                                    <input ref={website}
                                                           className="form-control-alternative form-control"
                                                           placeholder={t("enter") + " " + t("website")}/>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col lg="12">
                                                <FormGroup>
                                                    <label>{t("street")}</label>
                                                    <input ref={street}
                                                           className="form-control-alternative form-control"
                                                           placeholder={t("enter") + " " + t("street")}/>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>{t("city")}</label>
                                                    <input ref={city} className="form-control-alternative form-control"
                                                           placeholder={t("enter") + " " + t("city")}/>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>{t("state")}</label>
                                                    <input ref={state} className="form-control-alternative form-control"
                                                           placeholder={t("enter") + " " + t("state")}/>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>{t("zip_code")}</label>
                                                    <input ref={zip_code}
                                                           className="form-control-alternative form-control"
                                                           placeholder={t("enter") + " " + t("zip_code")}/>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>{t("country")}</label>
                                                    <input ref={country}
                                                           className="form-control-alternative form-control"
                                                           placeholder={t("enter") + " " + t("country")}/>
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

                                        <Button variant="dark" className="float-right" type="submit"
                                                disabled={disabled} color="dark"
                                                href="#pablo" onClick={createCustomerHandler}>
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
