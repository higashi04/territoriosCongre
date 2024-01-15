import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { TbMapPinOff } from "react-icons/tb";

// import './Congregacion.css';

const ModalAddBrandedHouses = ({parentTerritory, onBrandedSave}) => {
    const [show, setShow] = useState(false);
    const [latitude, setLatitude] = useState(0);
    const [longtitude, setLongitude] = useState(0);


    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
    }

    const handleCoordinateInput = (text) => {
        const parts = text.split(',')
        const lat = parts[0];
        const lng = parts[1];

        setLatitude(lat);
        setLongitude(lng);
    }

    const handleHTTPCall = async() => {
        try {
            const data = {
                lat: latitude,
                lng: longtitude,
                territory: parentTerritory
            }
            const request = await fetch(process.env.REACT_APP_API_SERVER + "territorios/createMarked", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            });

            if(request.ok) {
                const response = await request.json();
                onBrandedSave(response);
            } else {
                throw request;
            }
        } catch (error) {
            const err = await error.json();
            console.error(err)
        }
    }

    return (
        <>
        <span className="btn btn-secondary mx-3" onClick={handleShow}>
            Agregar Casas Marcadas <TbMapPinOff/>
        </span>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Casas Marcadas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="row my-5">
                <div className="input-group">
                    <span className="input-group-text">Coordenadas</span>
                    <input type="text" className="form-control" onInput={(e) => handleCoordinateInput(e.target.value)} />
                    <button className="btn btn-outline-primary" onClick={handleHTTPCall} >Guardar</button>
                </div>
            </div>
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

export default ModalAddBrandedHouses;