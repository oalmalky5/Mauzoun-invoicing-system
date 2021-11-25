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

// import {useTranslation} from "react-i18next";

export function EditUser(props) {
    // const { t } = useTranslation();
    const first_name = useRef();
    const last_name = useRef();
    const email = useRef();
    const password = useRef();
    const username = useRef();
    const address = useRef();
    const phone = useRef();
    const notes = useRef();
    const collection_center_id = useRef();
    const role_id = useRef();

    const [disabled, setDisabled] = useState(false);
    const [iconDisabled, setIconDisabled] = useState(true);
    const [user, setUser] = useState({});
    const id = props.match.params.id;


    useEffect(() => {
        axios.get(API_URL + 'users/' + id + '/show').then((response) => {

            if (response.data.status) {
                setUser(response.data.data);
                console.log(response.data.data);

            } else if (response.data.code === 404) {
                alertify.error(response.data.message);
                return null;
            }
        });
    }, []);


    const updateUserHandler = (e) => {
        e.preventDefault();
        setDisabled(true);
        setIconDisabled(false);
        axios.post(API_URL + "users/update",
            {
                id: user.id,
                first_name: first_name.current.value,
                last_name: last_name.current.value,
                email: email.current.value,
                notes: notes.current.value,
            }
        ).then((response) => {
            setDisabled(false);
            setIconDisabled(true);
            if (response.data.status) {
                alertify.success(response.data.message);

                props.history.push("/admin/users/list");
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
                                Edit User
                            </CardHeader>
                            <CardBody>
                                <div className="mt-5">
                                    <Form>
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>First Name</label>
                                                    <input ref={first_name} defaultValue={user.first_name}
                                                           className="form-control-alternative form-control"
                                                           placeholder="Enter First Name"/>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>Last Name</label>
                                                    <input ref={last_name} defaultValue={user.last_name}
                                                           className="form-control-alternative form-control"
                                                           placeholder="Enter Last Name"/>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label>Email</label>
                                                    <input ref={email} defaultValue={user.email} className="form-control-alternative form-control"
                                                           placeholder="Enter Email"/>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col lg="12">
                                                <FormGroup>
                                                    <label>Notes</label>
                                                    <textarea ref={notes} defaultValue={user.notes} rows={4}
                                                              className="form-control-alternative form-control"
                                                              placeholder="Enter Notes"/>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Button variant="primary" className="float-right" type="submit"
                                                disabled={disabled} color="info"
                                                 onClick={updateUserHandler}>
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
        // <Row>
        //     <Col md={12}>
        //         <Card>
        //             <CardHeader title={t("Edit User")}>
        //                 <CardHeaderToolbar>
        //                     <Link to="/user/list" className="btn btn-primary btn-sm mx-3">
        //                         {t("User List")}
        //                     </Link>
        //                 </CardHeaderToolbar>
        //             </CardHeader>
        //             <CardBody>
        //
        //                 <div className="mt-5">
        //                     <Form onSubmit={updateUserHandler}>
        //                         <Form.Row>
        //                             <Form.Group as={Col}>
        //                                 <Form.Label>First Name</Form.Label>
        //                                 <Form.Control ref={first_name} placeholder={t("Enter First Name")}
        //                                               defaultValue={user.first_name}/>
        //                             </Form.Group>
        //                             <Form.Group as={Col}>
        //                                 <Form.Label>{t("Last Name")}</Form.Label>
        //                                 <Form.Control ref={last_name} rows={1} placeholder={t("Enter Last Name")}
        //                                               defaultValue={user.last_name}/>
        //                             </Form.Group>
        //
        //                         </Form.Row>
        //                         <Form.Row>
        //                             <Form.Group as={Col}>
        //                                 <Form.Label>{t("Collection Centers")}</Form.Label>
        //                                 <Form.Control as="select" ref={collection_center_id} value={fieldCenter.collection_center_id} onChange={handlecenterChange}>
        //                                     {collectionCenters.map((collectionCenters, key) => (
        //                                         <option key={collectionCenters.id} value={collectionCenters.id}>
        //                                             {collectionCenters.name}
        //                                         </option>
        //                                     ))}
        //                                 </Form.Control>
        //                             </Form.Group>
        //                             <Form.Group as={Col}>
        //                                 <Form.Label>{t("Role")}</Form.Label>
        //                                 <Form.Control as="select" ref={role_id} value={fieldRole.role_id} onChange={handleroleChange}>
        //                                     {roles.map((role, key) => (
        //                                         <option key={role.id} value={role.id}>
        //                                             {role.name}
        //                                         </option>
        //                                     ))}
        //                                 </Form.Control>
        //                             </Form.Group>
        //                         </Form.Row>
        //                         <Form.Row>
        //                             <Form.Group as={Col}>
        //                                 <Form.Label>{t("Email")}</Form.Label>
        //                                 <Form.Control ref={email} placeholder={t("Enter Email")}
        //                                               defaultValue={user.email}/>
        //                             </Form.Group>
        //                             <Form.Group as={Col}>
        //                                 <Form.Label>{t("Phone")}</Form.Label>
        //                                 <Form.Control ref={phone} rows={1} placeholder={t("Enter Phone")}
        //                                               defaultValue={user.phone}/>
        //                             </Form.Group>
        //
        //
        //                         </Form.Row>
        //                         <Form.Row>
        //                             <Form.Group as={Col}>
        //                                 <Form.Label>{t("User Name")}</Form.Label>
        //                                 <Form.Control ref={username} rows={1} placeholder={t("Enter User Name")}
        //                                               defaultValue={user.username}/>
        //                             </Form.Group>
        //                             <Form.Group as={Col}>
        //                                 <Form.Label>{t("Password")}</Form.Label>
        //                                 <Form.Control type={'password'} ref={password} rows={1} placeholder={t("Enter Password")}
        //                                               defaultValue={user.password}/>
        //                             </Form.Group>
        //
        //                         </Form.Row>
        //                         <Form.Row>
        //                             <Form.Group as={Col}>
        //                                 <Form.Label>{t("Address")}</Form.Label>
        //                                 <Form.Control ref={address} rows={1} placeholder={t("Enter Address")}
        //                                               defaultValue={user.address}/>
        //                             </Form.Group>
        //                             <Form.Group as={Col}>
        //                                 <Form.Label>{t("Notes")}</Form.Label>
        //                                 <Form.Control ref={notes} rows={1} placeholder={t("Enter Notes")}
        //                                               defaultValue={user.notes}/>
        //                             </Form.Group>
        //                         </Form.Row>
        //
        //                         <Button variant="primary" className="float-right" type="submit" disabled={disabled}>
        //                             {t("Save")}
        //                             <span
        //                                 dangerouslySetInnerHTML={{__html: disabled ? `<i class='fas fa-spinner fa-spin'></i>` : ``}}/>
        //                         </Button>
        //                     </Form>
        //
        //                 </div>
        //
        //             </CardBody>
        //         </Card>
        //     </Col>
        // </Row>

    );
}
