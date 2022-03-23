import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal'
import Img from '../../assets/img/announcement.jpg'

function ImagePopup() {
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <React.Fragment>
            <Modal show={show} onHide={handleClose} animation={false} 
            size="lg" 
            aria-labelledby="contained-modal-title-vcenter"
            centered>
                <Modal.Header closeButton>
                    <Modal.Title>ประกาศ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img
                        src={Img}
                        style={{ width: '100%' }} 
                    />
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
}

export default ImagePopup;
