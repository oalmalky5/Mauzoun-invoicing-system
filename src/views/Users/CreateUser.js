import React, {useState, useRef} from "react";
import axios from "axios";
import alertify from "alertifyjs";
import {API_URL, STATIC_TOKEN} from "../../constants.js";
import Header from "components/Headers/Header.js";


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

export function CreateUser(props) {
    // const { t } = useTranslation();
    const first_name = useRef();
    const last_name = useRef();
    const email = useRef();
    const password = useRef();
    const notes = useRef();

    const [disabled, setDisabled] = useState(false);
    const [iconDisabled, setIconDisabled] = useState(true);

    const config = {
        headers: {
            Authorization: 'Bearer ' + STATIC_TOKEN,
        }
    };

    const createUserHandler = (e) => {
        e.preventDefault();
        setDisabled(true);
        setIconDisabled(false);
        axios.post(API_URL + "users/store",
            {
                first_name: first_name.current.value,
                last_name: last_name.current.value,
                email: email.current.value,
                password: password.current.value,
                notes: notes.current.value
            },
        ).then((response) => {
            setDisabled(false);
            setIconDisabled(true);
            if (response.data.status) {
                alertify.success(response.data.message);

                props.history.push("/admin/users/list");
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
                                <h3 className="mb-0">Add New User</h3>
                            </CardHeader>
                            <CardBody>

                                <div className="mt-5">
                                    <Form>
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>First Name</label>
                                                    <input ref={first_name}
                                                           className="form-control-alternative form-control"
                                                           placeholder="Enter First Name"/>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>Last Name</label>
                                                    <input ref={last_name}
                                                           className="form-control-alternative form-control"
                                                           rows={1}
                                                           placeholder="Enter Last Name"/>
                                                </FormGroup>
                                            </Col>

                                        </Row>

                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>Email</label>
                                                    <input ref={email} className="form-control-alternative form-control"
                                                           placeholder="Enter Email"/>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>Password</label>
                                                    <input type={'password'}
                                                           className="form-control-alternative form-control"
                                                           ref={password}
                                                           rows={1}
                                                           placeholder="Enter Password"/>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col lg="12">
                                                <FormGroup>
                                                    <label>Notes</label>
                                                    <textarea ref={notes} rows={4}
                                                              className="form-control-alternative form-control"
                                                              placeholder="Enter Notes"/>
                                                </FormGroup>
                                            </Col>

                                        </Row>

                                        <Button variant="primary" className="float-right" type="submit"
                                                disabled={disabled} color="info"
                                                href="#pablo" onClick={createUserHandler}>
                                            Save
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
