import { Button, Modal } from 'react-bootstrap'
import React from 'react'

export default function ExclusionModal (props) {
  const confirmDeletion = async () => {
    props.closeModal()
    const data = await props.deletionCallback(props.identifierCode)
    props.showAlert(data.meta)
  }
  return <Modal show={props.showModal} onHide={props.closeModal}>
      <Modal.Header closeButton>
         <Modal.Title>Cuidado!</Modal.Title>
      </Modal.Header>
      <Modal.Body>Você deseja excluir {props.pageIdentifier}?</Modal.Body>
      <Modal.Footer>
         <Button variant="warning" onClick={props.closeModal}>
            Não
         </Button>
         <Button variant="danger" onClick={confirmDeletion}>
            Excluir
         </Button>
      </Modal.Footer>
   </Modal>
}
;
