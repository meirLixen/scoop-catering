import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { modal, Button } from 'react-bootstrap';
// import Modal from 'react-modal';
import Modal from 'react-bootstrap/Modal'


function PostInfo() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button>

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Delet Product</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center border-0">Are you sure?</Modal.Body>
                <Modal.Footer className="d-flex justify-content-center">
                    <Button variant=" secondary" onClick={handleClose}>
                        no
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}





export default PostInfo;