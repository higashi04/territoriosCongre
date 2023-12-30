import { useState } from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { TbMapSearch } from "react-icons/tb";

function ModalSearchTerritorios({onTerritorySelection}) {
  const [show, setShow] = useState(false);
  const [territorios, setTerritorios] = useState([])

  const {user} = useSelector((state) => state.auth);

  const handleClose = () => setShow(false);
  const handleShow = async () => {
    await handleHttpRequest()
    setShow(true);
  }

  const handleRowClick = (row) => {
    onTerritorySelection(row)
    setShow(false)
  }

  const handleHttpRequest = async() =>{
    try {
        const data = {
          congregacionId: user.congregacion
        }
        const request = await fetch(process.env.REACT_APP_API_SERVER + "territorios/getbyCongregacionId", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({data})
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
          <Modal.Title>Usuarios</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {Array.isArray(territorios) && territorios.length > 0 ? (
            territorios.map((territorio) => (
              <div key={territorio._id} className="territorioRow" onClick={() => handleRowClick(territorio)}>{territorio.nombre}</div>
            ))
          ) : (
            <div>No hay territorios capturados para su congregacion</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalSearchTerritorios;
