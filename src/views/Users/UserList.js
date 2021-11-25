import React, {useEffect, useState, useRef} from "react";
import axios from "axios";
import $ from "jquery";
// import DataTable from "datatables.net";

import {useHistory} from 'react-router';
import {Link} from 'react-router-dom';
import alertify from "alertifyjs";


import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,
    Col,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter

} from "reactstrap";
import Header from "components/Headers/Header.js";

import {API_URL, STATIC_TOKEN} from '../../constants.js';


export function UserList(props) {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(-1);
    // const [show, setShow] = useState(false);
    const [modal, setModal] = useState(false);
    const history = useHistory();
    const [disabled, setDisabled] = useState(false);
    const [iconDisabled, setIconDisabled] = useState(true);

    const toggle = () => setModal(!modal);
    const setCurrentUser = (user) => {
        setUser(user);
        setModal(!modal);
    };


    const deleteUser = () => {
        setDisabled(true);
        setIconDisabled(false);
        axios.post(
            API_URL + 'users/' + user.id + '/delete', {},
        ).then((response) => {
            if (response.data.status) {
                history.go(0);
                setModal(false);
                alertify.success(response.data.message);
            } else {
                setDisabled(false);
                setIconDisabled(true);
                alertify.error(response.data.message);
                return null;
            }
        }).catch((error) => {
            setDisabled(false);
            setIconDisabled(true);
            // alertify.error("Something went wrong. Try again!");
        });
    };

    useEffect(() => {

        axios.get(API_URL + 'users/all').then((response) => {
            if (response.data.status) {

                setUsers(response.data.data);

                $("#user_table").DataTable();
            } else {
                alertify.error(response.data.message);
                return null;
            }
        }).catch((error) => {
            // alertify.error("Something went wrong. Try again!");
        });

    }, []);


    return (
        <>
            <Header/>
            <Container className="mt--7" fluid>
                <Row>
                    <Col md={12}>
                        <Card>
                            <CardHeader>
                                Users List
                            </CardHeader>
                            <CardBody style={{overflow: 'auto'}}>

                                <table id="user_table"
                                       className="stratprop_datatable table table-bordered align-items-center table-flush table">
                                    <thead className="thead-light">
                                    <tr>
                                        <th>SN.</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Email</th>
                                        <th>Notes</th>
                                        <th>Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {users.length > 0 ? (
                                        users.map((user, index) => (
                                            <tr key={user.id}>
                                                <td>{index + 1}</td>
                                                <td>{user.first_name}</td>
                                                <td>{user.last_name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.notes}</td>
                                                <td>
                                                    <UncontrolledDropdown>
                                                        <DropdownToggle
                                                            className="btn-icon-only text-light"
                                                            href="#pablo"
                                                            role="button"
                                                            size="sm"
                                                            color=""
                                                            onClick={(e) => e.preventDefault()}
                                                        >
                                                            <i className="fas fa-ellipsis-v"/>
                                                        </DropdownToggle>
                                                        <DropdownMenu className="dropdown-menu-arrow" right>
                                                            <DropdownItem
                                                                tag={Link} to={`/admin/users/edit/${user.id}`}
                                                            >
                                                                Edit
                                                            </DropdownItem>
                                                            <DropdownItem
                                                                onClick={() => setCurrentUser(user)}
                                                                key={user.id}
                                                            >
                                                                Delete
                                                            </DropdownItem>

                                                        </DropdownMenu>
                                                    </UncontrolledDropdown>
                                                    {/*<Link to={`/user/edit/${user.id}`}
                                                          className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3">
                                                    <span className="svg-icon svg-icon-md svg-icon-primary">
                                                          edit
                                                    </span>
                                                    </Link>
                                                    <a
                                                        onClick={() => setCurrentUser(user)}
                                                        key={user.id}
                                                        className="btn btn-icon btn-light btn-hover-danger btn-sm">
                                                    <span className="svg-icon svg-icon-md svg-icon-danger">
                                                      Delete
                                                    </span>
                                                    </a>*/}

                                                </td>

                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={12}>No User</td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                {/*<Modal show={show} onHide={handleClose}>*/}
                {/*    <Modal.Header closeButton>*/}
                {/*        <Modal.Title>{t("Delete User")}</Modal.Title>*/}
                {/*    </Modal.Header>*/}
                {/*    <Modal.Body>{t("Are you sure you want to Delete?")}</Modal.Body>*/}
                {/*    <Modal.Footer>*/}
                {/*        <Button variant="secondary" onClick={handleClose}>*/}
                {/*            {t("Close")}*/}
                {/*        </Button>*/}
                {/*        <Button variant="primary" onClick={deleteUser} disabled={disabled}>*/}
                {/*            {t("Confirm")}*/}
                {/*            <span*/}
                {/*                dangerouslySetInnerHTML={{__html: disabled ? `<i class='fas fa-spinner fa-spin'></i>` : ``}}/>*/}
                {/*        </Button>*/}
                {/*    </Modal.Footer>*/}
                {/*</Modal>*/}

                <Modal
                    centered
                    isOpen={modal}
                    toggle={toggle}
                >
                    <ModalHeader toggle={toggle}>
                        Delete User
                    </ModalHeader>
                    <ModalBody>
                        Are you sure you want to Delete?
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                            onClick={deleteUser} disabled={disabled}
                        >
                            Confirm <span
                            dangerouslySetInnerHTML={{__html: disabled ? `<i class='fas fa-spinner fa-spin'></i>` : ``}}/>
                        </Button>
                        {' '}
                        <Button onClick={toggle}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </Container>
        </>
    )
}
