import { Button, Modal } from 'react-bootstrap'
import React from 'react'

export default function ExclusionModal(props) {
   if (props.reversion) {
      const confirmDeletion = async () => {
         props.closeModal()
         const data = await props.deletionCallback(props.identifierCode, props.pageIdentifier)
         props.showAlert(data.meta)
      }
      return <Modal show={props.showModal} onHide={props.closeModal}>
         <Modal.Header closeButton>
            <Modal.Title>Cuidado!</Modal.Title>
         </Modal.Header>
         <Modal.Body>Você deseja reverter o status?</Modal.Body>
         <Modal.Footer style={{ justifyContent: "center" }}>
            <Button variant="dark" onClick={confirmDeletion}>
               Sim
            </Button>
            <Button variant="outline-dark" onClick={props.closeModal}>
               Não
            </Button>
         </Modal.Footer>
      </Modal>
   }
   else {
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
         <Modal.Footer style={{ justifyContent: "center" }}>
            <Button variant="dark" onClick={confirmDeletion}>
               Sim
            </Button>
            <Button variant="outline-dark" onClick={props.closeModal}>
               Não
            </Button>
         </Modal.Footer>
      </Modal>
   }
}
;
