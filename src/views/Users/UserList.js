import React, {useEffect, useState, useRef} from "react";
import axios from "axios";
import $ from "jquery";
// import DataTable from "datatables.net";
import {Link} from "react-router-dom";
import {useHistory} from 'react-router';
import alertify from "alertifyjs";


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
    const [show, setShow] = useState(false);
    const history = useHistory();
    const [disabled, setDisabled] = useState(0);
    const [iconDisabled, setIconDisabled] = useState(1);

    const config = {
        headers: {
            Authorization: 'Bearer ' + STATIC_TOKEN,
        }
    };

    const setCurrentUser = (user) => {
        setUser(user);
        setShow(true);

    };

    const handleClose = () => setShow(false);

    const deleteUser = () => {
        setDisabled(1);
        setIconDisabled(0);
        axios.post(
            API_URL + 'user/' + user.id + '/delete'
        ).then((response) => {
            if (response.data.status) {
                history.go(0);
                setShow(false);
                alertify.success(response.data.message);
            } else {
                setDisabled(0);
                setIconDisabled(1);
                alertify.error(response.data.message);
                return null;
            }
        }).catch((error) => {
            setDisabled(0);
            setIconDisabled(1);
            // alertify.error("Something went wrong. Try again!");
        });
    };

    useEffect(() => {

        axios.get(API_URL + 'users/all', config).then((response) => {
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
                                                                href="#pablo"
                                                                onClick={(e) => e.preventDefault()}
                                                            >
                                                                Edit
                                                            </DropdownItem>
                                                            <DropdownItem
                                                                href="#pablo"
                                                                onClick={(e) => e.preventDefault()}
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
                    toggle={function noRefCheck(){}}
                >
                    <ModalHeader toggle={function noRefCheck(){}}>
                        Modal title
                    </ModalHeader>
                    <ModalBody>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                            onClick={function noRefCheck(){}}
                        >
                            Do Something
                        </Button>
                        {' '}
                        <Button onClick={function noRefCheck(){}}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </Container>
        </>
    )
}
