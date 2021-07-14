import { Button, Row, InputGroup, FormControl} from "react-bootstrap";

export default function SearchBar(props) {
   return <Row className={"mb-2"} noGutters>
      <InputGroup>
         <FormControl
            type="text"
            placeholder={props.InputPlaceholder} />
         <InputGroup.Append>
            <Button
               // onClick={(e) => requestData(e, buscar)}
               type="button"
               variant="warning"
            >
               Buscar
            </Button>
         </InputGroup.Append>
      <InputGroup.Append><Button className="ml-1" variant="dark" href={props.RegisterEndpoint}/*href="/cadastrar/companhia/inserir"*/>{props.ButtonLabel}</Button></InputGroup.Append>
      </InputGroup>
   </Row>;
}
