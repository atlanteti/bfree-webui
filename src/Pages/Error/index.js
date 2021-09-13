import React from 'react'
import PropTypes from 'prop-types'
import { Container, Col, Card } from 'react-bootstrap'

export default function Error404(props) {
   return <Container className="mt-10">
      <Col md={{offset: 3, span: 6}}>
         <Card>
            <Card.Header as="h5">Error 404</Card.Header>
            <Card.Body>
               <Card.Title>Houve um erro ao tentar {props.requisition}.</Card.Title>
               <Card.Text>
                  {props.errorMessage}
               </Card.Text>
               <br />
            </Card.Body>
         </Card>
      </Col>
   </Container>
}
Error404.defaultProps =
{
   requisition: "acessar essa página",
   errorMessage: "Tente novamente mais tarde."
}
Error404.propTypes = {

}