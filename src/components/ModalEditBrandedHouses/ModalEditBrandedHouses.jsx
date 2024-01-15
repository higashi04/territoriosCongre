import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const ModalEditBrandedHouses = ({
  parentTerritory,
  onBrandedEdit,
  btnText,
  id
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const handleHTTPCall = async () => {
    try {
      const data = {
        territory: parentTerritory,
        marker: id
      };
      console.log(data);
      const request = await fetch(
        process.env.REACT_APP_API_SERVER + "territorios/DeleteMarked",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (request.ok) {
        const response = await request.json();
        onBrandedEdit(response);
      } else {
        throw request;
      }
    } catch (error) {
      const err = await error.json();
      console.error(err);
    } finally {
        handleClose();
    }
  };

  return (
    <>
      <span onClick={handleShow}>{btnText}</span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Casa Marcada</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row my-5">
            <button className="btn btn-danger" onClick={handleHTTPCall}>Eliminar</button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalEditBrandedHouses;
