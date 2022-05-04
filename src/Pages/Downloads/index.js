import { Component } from "react"
import { Button, Card, Col, Container, Table } from "react-bootstrap";
import { CustomMenu } from "../../Componentes/CustomMenu";
import { request } from "../../Services/api";
import { Title, MainContainer, MainRow, TableHeader, TableRow, TextHeaderCell, TableData, TextCell } from "../../styles/CommonStyles";
import { Helmet } from "react-helmet";
import { Buffer } from 'buffer';
class Downloads extends Component {
   constructor(props) {
      super(props);
      this.state = {
         logs: false,
      }
      this.fetchAndSetData = this.fetchAndSetData.bind(this)
   }

   async fetchAndSetData() {
      const data = await request({
         method: "get",
         endpoint: "exported-billing-reports/find-by-user",
      }).then(data => {
         this.setState({
            logs: data.data,
         })
      })
   }

   componentDidMount() {
      this.fetchAndSetData()
   }
   async downloadReport(filename) {
      const data = await request({
         method: "post",
         endpoint: "exported-billing-reports/download"
      })
      var file = new Blob([new Uint8Array(Buffer.from(data.data, 'base64'))], { type: "application/vnd.ms-excel" })
      const url = window.URL.createObjectURL(file)
      var relatorio = window.document.createElement('a');

      relatorio.setAttribute("download", `${filename}.xlsx`)
      relatorio.href = url
      // Append anchor to body.
      document.body.appendChild(relatorio)
      relatorio.click();


      // Remove anchor from body
      document.body.removeChild(relatorio)
      return
   }
   render() {
      return (
         <MainContainer>
            <MainRow>
               <CustomMenu>
                  <Col style={{ marginTop: '1rem', marginBottom: "1.5rem" }}>
                     <Title>Downloads</Title>
                     <Helmet title="Downloads" />
                  </Col>
                  <Container fluid>
                     {this.state.logs ?
                        <>
                           <Card>
                              <Card.Body style={{ padding: 0, overflowX: "scroll" }}><Table>
                                 <TableHeader>
                                    <TableRow>
                                       <TextHeaderCell>Nome</TextHeaderCell>
                                       <TextHeaderCell>Baixar</TextHeaderCell>
                                    </TableRow>
                                 </TableHeader>
                                 <TableData>
                                    <TextCell>{this.state.logs.ebr_name}</TextCell>
                                    <TextCell><Button onClick={() => { this.downloadReport(this.state.logs.ebr_name) }}>Baixar Relatório</Button></TextCell>
                                 </TableData>
                              </Table></Card.Body>
                           </Card>
                        </> : null
                     }
                  </Container>
               </CustomMenu>
            </MainRow>
         </MainContainer >
      );
   }
}

export default Downloads;