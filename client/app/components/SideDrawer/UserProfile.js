import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import {
    getFromStorage
} from '../../utils/storage';

const isEmpty = (value) => value ? value : '-';

export const UserProfile = props => {
    const [show, setShow] = useState(false);

    const mainAppStorage = getFromStorage('the_main_app');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <React.Fragment>
            <a href="#" onClick={handleShow}>User Profile</a>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>User Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul>
                        <li><strong>Email:</strong> {isEmpty(mainAppStorage.user.email)}</li>
                        <li><strong>First Name:</strong> {isEmpty(mainAppStorage.user.firstName)}</li>
                        <li><strong>Last Name:</strong> {isEmpty(mainAppStorage.user.lastName)}</li>
                        <li><strong>Address:</strong> {isEmpty(mainAppStorage.user.userAddress)}</li>
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
}