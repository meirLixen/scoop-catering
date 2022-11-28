import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export function GeneralModal({massege,option1,option2,action}) {
    const handleClose = () => setShow(false);
    const [show, setShow] = useState(false)
    return (
        <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton className="rtl">
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center border-0">
        {massege}
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button variant=" secondary" className="" onClick={handleClose}>
           {option1}
          </Button>
          <Button className="btn goldButton " onClick={action}>
          {option2}
          </Button>
        </Modal.Footer>
      </Modal>
    );
}

export default GeneralModal;