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
import {API_URL, STATIC_TOKEN} from "../../constants";
import {Link, useHistory} from "react-router-dom";
import alertify from "alertifyjs";

// reactstrap components
import {
    Button,
    Card,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Col,
} from "reactstrap";
import {useTranslation} from "react-i18next";

const Login = () => {
    const [disabled, setDisabled] = useState(false);
    let history = useHistory();
    const {t} = useTranslation();

    const loginHandler = (e) => {
        e.preventDefault();
        setDisabled(true);
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        axios
            .post(API_URL + "auth/login", {
                email: email,
                password: password
            })
            .then((response) => {

                if (response.data.status) {

                    alertify.success("Logged in Successfully");
                    localStorage.setItem("token", response.data.token.token);
                    // localStorage.setItem("lang", "en");


                    axios.get(API_URL + 'account/me', {
                        headers: {
                            Authorization: 'Bearer ' + response.data.token.token //the token is a variable which holds the token
                        }
                    }).then((response) => {
                        if (response.data.status) {
                            localStorage.setItem("user-data", JSON.stringify(response.data.data));
                            history.push('/admin/index');

                        } else {
                            alertify.error(response.data.message);
                            return null;
                        }
                    });

                    setDisabled(false);

                } else {
                    setDisabled(false);
                    // let errors = error.response.data;
                    alertify.error(response.data.message);
                    return null;
                }


            }).catch((error) => {

            console.log(error);
            // let errors = error.response.data;
            // for (let err in errors) {
            //     alertify.error(`${err}: ${errors[err][0]}`);
            // }
            setDisabled(false);

        });
    };

    return (
        <>
            <Col lg="5" md="7">
                <Card className="bg-secondary shadow border-0">
                    <CardBody className="px-lg-5 py-lg-5">
                        <div className="text-center text-muted mb-4">
                            <h2>{t("sign_in")}</h2>
                        </div>
                        <Form role="form">
                            <FormGroup className="mb-3">
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-email-83"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder={t("email")}
                                        type="email"
                                        autoComplete="new-email"
                                        id="email"
                                        defaultValue="admin@web.com"
                                    />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-lock-circle-open"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder={t("password")}
                                        type="password"
                                        autoComplete="new-password"
                                        id="password"
                                        defaultValue="123456"
                                    />
                                </InputGroup>
                            </FormGroup>
                            <div className="text-center">
                                <Button className="mt-4" color="dark" type="button" onClick={e => loginHandler(e)}
                                        disabled={disabled}>
                                    {t("sign_in")}
                                </Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
                {/*<Row className="mt-3">*/}
                {/*  <Col xs="6">*/}
                {/*    <a*/}
                {/*      className="text-light"*/}
                {/*      href="#pablo"*/}
                {/*      onClick={(e) => e.preventDefault()}*/}
                {/*    >*/}
                {/*      <small>Forgot password?</small>*/}
                {/*    </a>*/}
                {/*  </Col>*/}
                {/*  <Col className="text-right" xs="6">*/}
                {/*    <a*/}
                {/*      className="text-light"*/}
                {/*      href="#pablo"*/}
                {/*      onClick={(e) => e.preventDefault()}*/}
                {/*    >*/}
                {/*      <small>Create new account</small>*/}
                {/*    </a>*/}
                {/*  </Col>*/}
                {/*</Row>*/}
            </Col>
        </>
    );
};

export default Login;
