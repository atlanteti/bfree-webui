import { OverlayTrigger, Tooltip } from "react-bootstrap"

export default function IconOverlayMessage(props) {
   return <OverlayTrigger
      placement="top"
      overlay={
         <Tooltip id="button-tooltip" {...props}>
            {props.message}
         </Tooltip>
      }>
      {props.children}
   </OverlayTrigger>
}