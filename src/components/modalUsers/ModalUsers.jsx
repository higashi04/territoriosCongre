import { useState } from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import './ModalUsers.css'

function ModalUsers({ onUserClick }) {
  const [show, setShow] = useState(false);
  const [users, setUsers] = useState([]);

  const { user } = useSelector((state) => state.auth);

  const handleClose = () => setShow(false);
  const handleShow = async () => {
    await handleHttpRequest();
    setShow(true);
  };

  const handleRowClick = (row) => {
    onUserClick(row);
    setShow(false);
  };

  const handleHttpRequest = async () => {
    try {
      const data = {
        congregacionId: user.congregacion,
      };
      const request = await fetch(
        process.env.REACT_APP_API_SERVER + "usuario/get",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data }),
        }
      );
      const response = await request.json();
      setUsers(response.users)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <span>
        <button
          id="btnSearchUsers"
          className="btn btn-primary mx-3"
          onClick={handleShow}
        >
          Consultar Usuarios
        </button>
      </span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Usuarios</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {Array.isArray(users) && users.length > 0 ? (
            users.map((userFound) => (
              <div
                key={userFound._id}
                className="userFoundRow"
                onClick={() => handleRowClick(userFound)}
              >
                {userFound.username}
              </div>
            ))
          ) : (
            <div>No hay usuarios capturados para su congregacion</div>
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

export default ModalUsers;
