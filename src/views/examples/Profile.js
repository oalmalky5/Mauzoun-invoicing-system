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

import React, {useEffect, useState, useRef} from "react";
import axios from "axios";
import alertify from "alertifyjs";
import {API_URL, STATIC_TOKEN} from "../../constants.js";
// reactstrap components
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

// core components
import UserHeader from "components/Headers/UserHeader.js";
import {useTranslation} from "react-i18next";

export function Profile(props) {

    const first_name = useRef();
    const last_name = useRef();
    const notes = useRef();
    const old_password = useRef();
    const new_password = useRef();
    const confirm_password = useRef();

    const [disabled, setDisabled] = useState(false);
    const [iconDisabled, setIconDisabled] = useState(true);
    const [user, setUser] = useState({});

    const {t} = useTranslation()

    useEffect(() => {
        axios.get(API_URL + 'account/me').then((response) => {
            if (response.data.status) {
                setUser(response.data.data);

            } else {
                alertify.error(response.data.message);
                return null;
            }
        })
    }, []);

    const updateProfileHandler = (e) => {
        e.preventDefault();
        setDisabled(true);
        setIconDisabled(false);
        axios.post(API_URL + "account/update",
            {
                first_name: first_name.current.value,
                last_name: last_name.current.value,
                notes: notes.current.value
            }
        ).then((response) => {
            setDisabled(false);
            setIconDisabled(true);
            if (response.data.status) {
                alertify.success(response.data.message);

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


    const changePasswordHandler = (e) => {
        e.preventDefault();
        setDisabled(true);
        setIconDisabled(false);
        axios.post(API_URL + "account/change-password",
            {
                old_password: old_password.current.value,
                new_password: new_password.current.value,
                confirm_password: confirm_password.current.value
            }
        ).then((response) => {
            setDisabled(false);
            setIconDisabled(true);
            if (response.data.status) {
                alertify.success(response.data.message);

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
            <UserHeader user={user}/>
            {/* Page content */}
            <Container className="mt--7" fluid>
                <Row>
                    <Col className="order-xl-1" xl="8">
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h2 className="mb-0">{t("my_account")}</h2>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <h6 className="heading-small text-muted mb-4">
                                        {t("user_information")}
                                    </h6>
                                    <div>
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-first-name"
                                                    >
                                                        {t("first_name")}
                                                    </label>
                                                    <input
                                                        className="form-control-alternative form-control"
                                                        ref={first_name}
                                                        defaultValue={user.first_name}
                                                        placeholder={t("first_name")}
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-last-name"
                                                    >
                                                        {t("last_name")}
                                                    </label>
                                                    <input
                                                        className="form-control-alternative form-control"
                                                        defaultValue={user.last_name}
                                                        ref={last_name}
                                                        id="input-last-name"
                                                        placeholder={t("last_name")}
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="12">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-email"
                                                    >
                                                        {t("email")}
                                                    </label>
                                                    <input
                                                        className="form-control-alternative form-control"
                                                        defaultValue={user.email}
                                                        id="input-email"
                                                        placeholder="jesse@example.com"
                                                        type="email"
                                                        readOnly
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </div>
                                    <hr className="my-4"/>
                                    <h6 className="heading-small text-muted mb-4">{t("about_me")}</h6>
                                    <div>
                                        <FormGroup>
                                            <label>{t("about_me")}</label>
                                            <textarea
                                                className="form-control-alternative form-control"
                                                placeholder={t("few_words")}
                                                rows="4"
                                                defaultValue={user.notes}
                                                ref={notes}
                                                type="textarea"
                                            ></textarea>
                                        </FormGroup>
                                        <Button
                                            color="dark"
                                            href="#pablo"
                                            onClick={updateProfileHandler}
                                            className="float-right"
                                            disabled={disabled}
                                        >
                                            {t("save")}
                                        </Button>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col className="order-xl-1" xl="4">
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h2 className="mb-0">{t("change_password")}</h2>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Form>

                                    <div>
                                        <Row>
                                            <Col lg="12">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-first-name"
                                                    >
                                                        {t("old_password")}
                                                    </label>
                                                    <input
                                                        className="form-control-alternative form-control"
                                                        ref={old_password}
                                                        type="password"
                                                        placeholder={t("old_password")}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>

                                            <Col lg="12">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-email"
                                                    >
                                                        {t("new_password")}
                                                    </label>
                                                    <input
                                                        className="form-control-alternative form-control"
                                                        ref={new_password}
                                                        type="password"
                                                        placeholder={t("new_password")}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="12">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-email"
                                                    >
                                                        {t("confirm_password")}
                                                    </label>
                                                    <input
                                                        className="form-control-alternative form-control"
                                                        ref={confirm_password}
                                                        type="password"
                                                        placeholder={t("confirm_password")}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </div>
                                    <Button
                                        color="dark"
                                        href="#pablo"
                                        onClick={changePasswordHandler}
                                        className="float-right"
                                    >
                                        {t("save")}
                                    </Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>

                </Row>
            </Container>
        </>
    );
};

