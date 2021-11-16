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
    Input,
    Container,
    Row,
    Col,
} from "reactstrap";

// core components
import UserHeader from "components/Headers/UserHeader.js";

export function Profile(props) {

    const first_name = useRef();
    const last_name = useRef();
    const notes = useRef();
    const old_password = useRef();
    const new_password = useRef();
    const confirm_password = useRef();

    const [disabled, setDisabled] = useState(0);
    const [iconDisabled, setIconDisabled] = useState(1);
    const [user, setUser] = useState({});

    const config = {
        headers: {
            Authorization: 'Bearer ' + STATIC_TOKEN,
        }
    };

    useEffect(() => {
        axios.get(API_URL + 'account/me', config).then((response) => {
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
        setDisabled(1);
        setIconDisabled(0);
        axios.post(API_URL + "account/update",
            {
                first_name: first_name.current.value,
                last_name: last_name.current.value,
                notes: notes.current.value
            }, config
        ).then((response) => {
            setDisabled(0);
            setIconDisabled(1);
            if (response.data.status) {
                alertify.success(response.data.message);

            } else {
                alertify.error(response.data.message);
                return null;
            }
        }).catch((error) => {
            setDisabled(0);
            setIconDisabled(1);
            if (error.message === 'Request failed with status code 401') {
                //props.logout();
            }
        });
    };


    const changePasswordHandler = (e) => {
        e.preventDefault();
        setDisabled(1);
        setIconDisabled(0);
        axios.post(API_URL + "account/change-password",
            {
                old_password: old_password.current.value,
                new_password: new_password.current.value,
                confirm_password: confirm_password.current.value
            }, config
        ).then((response) => {
            setDisabled(0);
            setIconDisabled(1);
            if (response.data.status) {
                alertify.success(response.data.message);

            } else {
                alertify.error(response.data.message);
                return null;
            }
        }).catch((error) => {
            setDisabled(0);
            setIconDisabled(1);
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
                    <Col className="order-xl-1" xl="6">
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">My Account</h3>
                                    </Col>

                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <h6 className="heading-small text-muted mb-4">
                                        User information
                                    </h6>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-first-name"
                                                    >
                                                        First name
                                                    </label>
                                                    <input
                                                        className="form-control-alternative form-control"
                                                        ref={first_name}
                                                        defaultValue={user.first_name}
                                                        placeholder="First name"
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
                                                        Last name
                                                    </label>
                                                    <input
                                                        className="form-control-alternative form-control"
                                                        defaultValue={user.last_name}
                                                        ref={last_name}
                                                        id="input-last-name"
                                                        placeholder="Last name"
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
                                                        Email address
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
                                    <h6 className="heading-small text-muted mb-4">About me</h6>
                                    <div className="pl-lg-4">
                                        <FormGroup>
                                            <label>About Me</label>
                                            <textarea
                                                className="form-control-alternative form-control"
                                                placeholder="A few words about you ..."
                                                rows="4"
                                                defaultValue={user.notes}
                                                ref={notes}
                                                type="textarea"
                                            ></textarea>
                                        </FormGroup>
                                        <Button
                                            color="info"
                                            href="#pablo"
                                            onClick={updateProfileHandler}
                                            className="float-right"
                                        >
                                            Edit profile
                                        </Button>


                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col className="order-xl-1" xl="6">
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">Change Password</h3>
                                    </Col>

                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Form>

                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col lg="12">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-first-name"
                                                    >
                                                        Old Password
                                                    </label>
                                                    <input
                                                        className="form-control-alternative form-control"
                                                        ref={old_password}
                                                        type="password"
                                                        placeholder="Type old password"
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
                                                        New Password
                                                    </label>
                                                    <input
                                                        className="form-control-alternative form-control"
                                                        ref={new_password}
                                                        type="password"
                                                        placeholder="Type new password"
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
                                                        Confirm Password
                                                    </label>
                                                    <input
                                                        className="form-control-alternative form-control"
                                                        ref={confirm_password}
                                                        type="password"
                                                        placeholder="Confirm password"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </div>
                                    <Button
                                        color="info"
                                        href="#pablo"
                                        onClick={changePasswordHandler}
                                        className="float-right"
                                    >
                                        Edit profile
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
