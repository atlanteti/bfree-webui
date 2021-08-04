import React from 'react'
import PropTypes from 'prop-types'
import { Container, Row } from 'react-bootstrap'
export default function Error404(props) {
   return <Container>
      <Row>
         <h1>Houve um erro ao tentar {props.requisition}.</h1>
      </Row>
      <br />
      <Row>
         <h2>{props.errorMessage}</h2>
      </Row>
   </Container>
}
Error404.defaultProps =
{
   requisition: "acessar essa página",
   errorMessage: "Tente novamente mais tarde."
}
Error404.propTypes = {

}