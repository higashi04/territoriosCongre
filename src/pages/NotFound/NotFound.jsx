import React from 'react';
import Card from 'react-bootstrap/Card';

const NotFound = () => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Error 404</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">El link que busca accesar no existe, o no ha sido construido</Card.Subtitle>
        <Card.Text>
          Por favor, regrese a la página en la que se encontraba anteriormente.
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default NotFound
