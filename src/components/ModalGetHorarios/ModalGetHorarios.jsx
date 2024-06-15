import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import './ModalGetHorarios.css';

const ModalGetHorarios = ({ onScheduleSelection, disable = false }) => {
    const [show, setShow] = useState(false);
    const [btnDisabled, setBtnDisabled] = useState(disable);
    const [horarios, setHorarios] = useState([]);
    const {user} = useSelector((state) => state.auth);

    useEffect(() => {
        setBtnDisabled(disable);
    }, [disable])
  
    const handleClose = () => setShow(false);
    const handleShow = async () => {
      await handleHttpRequest()
      setShow(true);
    }

    const handleRowClick = (row) => {
        onScheduleSelection(row)
        setShow(false)
      }

    const handleHttpRequest = async() =>{
        try {
            const data = {
              congregacionId: user.congregacion
            }
            const request = await fetch(process.env.REACT_APP_API_SERVER + "horarios/read", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({data})
            })
            const response = await request.json();
            setHorarios(response.horarios)
        } catch (error) {
            console.error(error)
        }
      }
  
  return (
    <>
        <button className='btn btn-primary' disabled={btnDisabled} onClick={handleShow}>
            Buscar Horarios
        </button>
      
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Horarios de Predicación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {Array.isArray(horarios) && horarios.length > 0 ? (
            horarios.map((horario) => (
              <div key={horario._id} className="horarioRow mb-3" onClick={() => handleRowClick(horario)}>
                <span> {horario.horario} </span>
                <div style={{
                    width: "5vw",
                    height: "5vh",
                    backgroundColor: horario.rgba
                }}></div>
            </div>
            ))
          ) : (
            <div>No hay horarios capturados para su congregacion</div>
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

export default ModalGetHorarios
