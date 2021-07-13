import { Button, Modal } from "react-bootstrap";

export default function ExclusionModal(props) {
   const confirmDeletion = () =>
   {
      props.deletionCallback(props.identifierCode);
      props.closeModal();
      props.updateListing()
   }
   return <Modal show={props.showModal} onHide={props.closeModal}>
      <Modal.Header closeButton>
         <Modal.Title>Cuidado!</Modal.Title>
      </Modal.Header>
      <Modal.Body>Você deseja excluir {props.pageIdentifier}?</Modal.Body>
      <Modal.Footer>
         <Button variant="danger" onClick={props.closeModal}>
            Não
         </Button>
         <Button variant="warning" onClick={confirmDeletion}>
            Excluir
         </Button>
      </Modal.Footer>
   </Modal>;
}
;
