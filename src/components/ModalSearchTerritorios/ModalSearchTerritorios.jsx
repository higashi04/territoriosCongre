import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { TbMapSearch } from "react-icons/tb";

function ModalSearchTerritorios() {
  const [show, setShow] = useState(false);
  const [territorios, setTerritorios] = useState([])

  const handleClose = () => setShow(false);
  const handleShow = async () => {
    await handleHttpRequest()
    setShow(true);
  }

  const handleHttpRequest = async(congregacionId = '65469cf0df48930f2ed9552b') =>{
    try {
        const request = await fetch(process.env.REACT_APP_API_SERVER + "territorios/getbyCongregacionId", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({congregacionId})
        })
        const response = await request.json();
        setTerritorios(response.territorios)
    } catch (error) {
        console.error(error)
    }
  } 

  return (
    <>
      <span>
        <TbMapSearch id="btnSearchTerritorios" onClick={handleShow} />
      </span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Territorios</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {Array.isArray(territorios) && territorios.length > 0 ? (
            territorios.map((territorio, index) => (
              <div key={territorio._id} className="territorioRow">{territorio.nombre}</div>
            ))
          ) : (
            <div>No hay territorios capturados para su congregacion</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalSearchTerritorios;
