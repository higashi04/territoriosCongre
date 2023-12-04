import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";

import './Congregacion.css';

const ModalSearchCongregaciones = ({onCongregationSelection, btnTxt}) => {
    const [show, setShow] = useState(false);
    const [congregations, setCongregations] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = async() => {
        await handleHttpRequest();
        setShow(true);
    }

    const handleHttpRequest = async() => {
        try{
            const request = await fetch(process.env.REACT_APP_API_SERVER + "congregaciones/get", {
                method: "GET",
                headers: {"Content-Type": "application/json"}
            });
            const response = await request.json();
            setCongregations(response);
        } catch (error) {
            console.error(error)
        }
    }

    const handleRowClick = (congre) => {
       onCongregationSelection(congre);
       setShow(false);
    }

    return (
        <>
        <span onClick={handleShow}>
            {btnTxt} <BsSearch/>
        </span>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Territorios</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {Array.isArray(congregations) && congregations.length > 0 ? (
            congregations.map((congre) => (
              <div key={congre._id} className="congreRow" onClick={() => handleRowClick(congre)}>{congre.nombre}</div>
            ))
          ) : (
            <div>No hay congregaciones capturadas </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    )
}

export default ModalSearchCongregaciones;