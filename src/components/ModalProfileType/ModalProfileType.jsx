import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { BsSearch } from "react-icons/bs";

import './ModalProfileType.css';

function ModalProfileType({onProfileSelection}) {
  const [show, setShow] = useState(false);
  const [profiles, setProfiles] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = async () => {
    await handleHttpRequest()
    setShow(true);
  }

  const handleRowClick = (row) => {
    onProfileSelection(row)
    setShow(false)
  }

  const handleHttpRequest = async() =>{
    try {
        const request = await fetch(process.env.REACT_APP_API_SERVER + "usuario/profiles", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
        const response = await request.json();
       setProfiles(response.profiles)
    } catch (error) {
        console.error(error)
    }
  } 

  return (
    <>
      <span>
        <BsSearch id="btnSearchProfiles" onClick={handleShow} />
      </span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Permisos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {Array.isArray(profiles) && profiles.length > 0 ? (
            profiles.map((profile) => (
              <div key={profile._id} className="profileRow" onClick={() => handleRowClick(profile)}>{profile.tipo}</div>
            ))
          ) : (
            <div>404</div>
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

export default ModalProfileType;