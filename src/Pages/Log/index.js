import { Component } from "react"
import { Accordion, Card, Col, Container, ListGroup, ListGroupItem, Row, Table } from "react-bootstrap";
import { CustomMenu } from "../../Componentes/CustomMenu";
import { request } from "../../Services/api";
import { CustomMenuCol, Title } from "../../styles/CommonStyles";
import { displayDate } from '../../Componentes/DateField'
import { Helmet } from "react-helmet";
class Log extends Component {
   constructor(props) {
      super(props);
      this.state = {
         logs: false
      }
   }
   componentDidMount() {
      const data = request({
         method: "get",
         endpoint: "logs/listar",
      }).then(data => { this.setState({ logs: data.data }) })
   }
   render() {
      return (<>
         <Container>
            <Helmet title="Logs" />
            <Title style={{ marginBottom: 48 }}>Logs</Title>
            <Row>
               <CustomMenuCol lg={2}><CustomMenu /></CustomMenuCol>
               <Col offset={3}>
                  {this.state.logs ?
                     <>{this.state.logs.map(log => {
                        return <><Card style={{ marginBottom: "0.5rem" }}>
                           <Card.Body style={{ padding: 0 }}>
                              <Card.Text>
                                 <Accordion>
                                    <Card>
                                       <Accordion.Toggle as={Card.Header} eventKey="0">
                                          <Card.Title>
                                             <Row>
                                                <Col>{`${log.log_action} ${log.log_table}`}</Col>
                                                <Col style={{ textAlign: "end" }}>
                                                   {displayDate(log.log_dtcreation)}
                                                </Col>
                                             </Row>
                                          </Card.Title>
                                          <Card.Subtitle className="mb-2 text-muted">{log.user.usr_name}</Card.Subtitle>

                                          <Accordion.Collapse eventKey="0">
                                             <Card.Body style={{ padding: 0 }}><Table striped bordered responsive hover>
                                                <thead>
                                                   <tr>
                                                      <th>Campo</th>
                                                      <th>Antes</th>
                                                      <th>Depois</th>
                                                   </tr>
                                                </thead>
                                                <tbody>
                                                   {Object.keys(JSON.parse(log.log_new_values)).map(
                                                      (key) => {
                                                         let newValue = false
                                                         let oldValue = false
                                                         let highlight = false;
                                                         if (log.log_new_values) {
                                                            newValue = JSON.parse(log.log_new_values)
                                                         }
                                                         if (log.log_old_values) {
                                                            oldValue = JSON.parse(log.log_old_values)
                                                         }
                                                         if (newValue && oldValue) {
                                                            highlight = newValue[key] !== oldValue[key]
                                                         }
                                                         if (key.includes("_") && !key.includes("dt")) {
                                                            return <tr>
                                                               <td>{key}</td>
                                                               <td>{log.log_new_values ? newValue[key] : ""}</td>
                                                               <td style={{ color: highlight ? "red" : null }}>{log.log_old_values ? oldValue[key] : ""}</td>
                                                            </tr>
                                                         }
                                                      })}
                                                </tbody>
                                             </Table></Card.Body>
                                          </Accordion.Collapse>
                                       </Accordion.Toggle>
                                    </Card>
                                 </Accordion>
                              </Card.Text>
                           </Card.Body>
                        </Card></>
                     })}</> : null
                  }
               </Col>
            </Row>
         </Container>
      </>);
   }
}

export default Log;