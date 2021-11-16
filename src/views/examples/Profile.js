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

    return (
        <>
            <UserHeader user={user}/>
            {/* Page content */}
            <Container className="mt--7" fluid>
                <Row>
                    {/*<Col className="order-xl-2 mb-5 mb-xl-0" xl="4">*/}
                    {/*  <Card className="card-profile shadow">*/}
                    {/*    <Row className="justify-content-center">*/}
                    {/*      <Col className="order-lg-2" lg="3">*/}
                    {/*        <div className="card-profile-image">*/}
                    {/*          <a href="#pablo" onClick={(e) => e.preventDefault()}>*/}
                    {/*            <img*/}
                    {/*              alt="..."*/}
                    {/*              className="rounded-circle"*/}
                    {/*              src={*/}
                    {/*                require("../../assets/img/theme/team-4-800x800.jpg")*/}
                    {/*                  .default*/}
                    {/*              }*/}
                    {/*            />*/}
                    {/*          </a>*/}
                    {/*        </div>*/}
                    {/*      </Col>*/}
                    {/*    </Row>*/}
                    {/*    <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">*/}
                    {/*      <div className="d-flex justify-content-between">*/}
                    {/*        <Button*/}
                    {/*          className="mr-4"*/}
                    {/*          color="info"*/}
                    {/*          href="#pablo"*/}
                    {/*          onClick={(e) => e.preventDefault()}*/}
                    {/*          size="sm"*/}
                    {/*        >*/}
                    {/*          Connect*/}
                    {/*        </Button>*/}
                    {/*        <Button*/}
                    {/*          className="float-right"*/}
                    {/*          color="default"*/}
                    {/*          href="#pablo"*/}
                    {/*          onClick={(e) => e.preventDefault()}*/}
                    {/*          size="sm"*/}
                    {/*        >*/}
                    {/*          Message*/}
                    {/*        </Button>*/}
                    {/*      </div>*/}
                    {/*    </CardHeader>*/}
                    {/*    <CardBody className="pt-0 pt-md-4">*/}
                    {/*      <Row>*/}
                    {/*        <div className="col">*/}
                    {/*          <div className="card-profile-stats d-flex justify-content-center mt-md-5">*/}
                    {/*            <div>*/}
                    {/*              <span className="heading">22</span>*/}
                    {/*              <span className="description">Friends</span>*/}
                    {/*            </div>*/}
                    {/*            <div>*/}
                    {/*              <span className="heading">10</span>*/}
                    {/*              <span className="description">Photos</span>*/}
                    {/*            </div>*/}
                    {/*            <div>*/}
                    {/*              <span className="heading">89</span>*/}
                    {/*              <span className="description">Comments</span>*/}
                    {/*            </div>*/}
                    {/*          </div>*/}
                    {/*        </div>*/}
                    {/*      </Row>*/}
                    {/*      <div className="text-center">*/}
                    {/*        <h3>*/}
                    {/*          Jessica Jones*/}
                    {/*          <span className="font-weight-light">, 27</span>*/}
                    {/*        </h3>*/}
                    {/*        <div className="h5 font-weight-300">*/}
                    {/*          <i className="ni location_pin mr-2" />*/}
                    {/*          Bucharest, Romania*/}
                    {/*        </div>*/}
                    {/*        <div className="h5 mt-4">*/}
                    {/*          <i className="ni business_briefcase-24 mr-2" />*/}
                    {/*          Solution Manager - Creative Tim Officer*/}
                    {/*        </div>*/}
                    {/*        <div>*/}
                    {/*          <i className="ni education_hat mr-2" />*/}
                    {/*          University of Computer Science*/}
                    {/*        </div>*/}
                    {/*        <hr className="my-4" />*/}
                    {/*        <p>*/}
                    {/*          Ryan — the name taken by Melbourne-raised, Brooklyn-based*/}
                    {/*          Nick Murphy — writes, performs and records all of his own*/}
                    {/*          music.*/}
                    {/*        </p>*/}
                    {/*        <a href="#pablo" onClick={(e) => e.preventDefault()}>*/}
                    {/*          Show more*/}
                    {/*        </a>*/}
                    {/*      </div>*/}
                    {/*    </CardBody>*/}
                    {/*  </Card>*/}
                    {/*</Col>*/}
                    <Col className="order-xl-1" xl="12">
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">My account</h3>
                                    </Col>
                                    <Col className="text-right" xs="4">
                                        <Button
                                            color="primary"
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}
                                            size="sm"
                                        >
                                            Settings
                                        </Button>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody onSubmit={updateProfileHandler}>
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
                                            {/*<Col lg="6">*/}
                                            {/*  <FormGroup>*/}
                                            {/*    <label*/}
                                            {/*      className="form-control-label"*/}
                                            {/*      htmlFor="input-username"*/}
                                            {/*    >*/}
                                            {/*      Username*/}
                                            {/*    </label>*/}
                                            {/*    <Input*/}
                                            {/*      className="form-control-alternative"*/}
                                            {/*      defaultValue="lucky.jesse"*/}
                                            {/*      id="input-username"*/}
                                            {/*      placeholder="Username"*/}
                                            {/*      type="text"*/}
                                            {/*    />*/}
                                            {/*  </FormGroup>*/}
                                            {/*</Col>*/}
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
                                    {/* Address */}
                                    {/*<h6 className="heading-small text-muted mb-4">*/}
                                    {/*  Contact information*/}
                                    {/*</h6>*/}
                                    {/*<div className="pl-lg-4">*/}
                                    {/*  <Row>*/}
                                    {/*    <Col md="12">*/}
                                    {/*      <FormGroup>*/}
                                    {/*        <label*/}
                                    {/*          className="form-control-label"*/}
                                    {/*          htmlFor="input-address"*/}
                                    {/*        >*/}
                                    {/*          Address*/}
                                    {/*        </label>*/}
                                    {/*        <Input*/}
                                    {/*          className="form-control-alternative"*/}
                                    {/*          defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"*/}
                                    {/*          id="input-address"*/}
                                    {/*          placeholder="Home Address"*/}
                                    {/*          type="text"*/}
                                    {/*        />*/}
                                    {/*      </FormGroup>*/}
                                    {/*    </Col>*/}
                                    {/*  </Row>*/}
                                    {/*  <Row>*/}
                                    {/*    <Col lg="4">*/}
                                    {/*      <FormGroup>*/}
                                    {/*        <label*/}
                                    {/*          className="form-control-label"*/}
                                    {/*          htmlFor="input-city"*/}
                                    {/*        >*/}
                                    {/*          City*/}
                                    {/*        </label>*/}
                                    {/*        <Input*/}
                                    {/*          className="form-control-alternative"*/}
                                    {/*          defaultValue="New York"*/}
                                    {/*          id="input-city"*/}
                                    {/*          placeholder="City"*/}
                                    {/*          type="text"*/}
                                    {/*        />*/}
                                    {/*      </FormGroup>*/}
                                    {/*    </Col>*/}
                                    {/*    <Col lg="4">*/}
                                    {/*      <FormGroup>*/}
                                    {/*        <label*/}
                                    {/*          className="form-control-label"*/}
                                    {/*          htmlFor="input-country"*/}
                                    {/*        >*/}
                                    {/*          Country*/}
                                    {/*        </label>*/}
                                    {/*        <Input*/}
                                    {/*          className="form-control-alternative"*/}
                                    {/*          defaultValue="United States"*/}
                                    {/*          id="input-country"*/}
                                    {/*          placeholder="Country"*/}
                                    {/*          type="text"*/}
                                    {/*        />*/}
                                    {/*      </FormGroup>*/}
                                    {/*    </Col>*/}
                                    {/*    <Col lg="4">*/}
                                    {/*      <FormGroup>*/}
                                    {/*        <label*/}
                                    {/*          className="form-control-label"*/}
                                    {/*          htmlFor="input-country"*/}
                                    {/*        >*/}
                                    {/*          Postal code*/}
                                    {/*        </label>*/}
                                    {/*        <Input*/}
                                    {/*          className="form-control-alternative"*/}
                                    {/*          id="input-postal-code"*/}
                                    {/*          placeholder="Postal code"*/}
                                    {/*          type="number"*/}
                                    {/*        />*/}
                                    {/*      </FormGroup>*/}
                                    {/*    </Col>*/}
                                    {/*  </Row>*/}
                                    {/*</div>*/}
                                    {/*<hr className="my-4" />*/}
                                    {/* Description */}
                                    <h6 className="heading-small text-muted mb-4">About me</h6>
                                    <div className="pl-lg-4">
                                        <FormGroup>
                                            <label>About Me</label>
                                            <input
                                                className="form-control-alternative form-control"
                                                placeholder="A few words about you ..."
                                                rows="4"
                                                defaultValue={user.notes}
                                                ref={notes}
                                                type="textarea"
                                            />
                                        </FormGroup>
                                        <Input type={'submit'}


                                               value={"Edit profile"}
                                        />


                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

