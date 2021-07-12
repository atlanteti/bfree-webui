import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { Pagination, Button, Modal, Col, Row, Container } from "react-bootstrap";
import {
   Title,
   MainContainer,
   BtnCadastrar,
   Input,
   LittleBtn,
   Table,
   TableHeader,
   TableRow,
   ColumnTitle,
   TableData,
   TableCell
} from "./styles.js"
import { CustomMenu } from "../../../Componentes/CustomMenu";

export default function ListarCompanhia() {
   const [companhia, setCompanhia] = useState(null);
   const [buscar, setBuscar] = useState(null);
   const [page, setPage] = useState({});
   const [horaUpd, setHoraUpd] = useState();
   const [horaCriacao, setHoraCriacao] = useState();
   const [showModal, setShowModal] = useState(false);

   const handleClose = () => setShowModal(false);

   function buscarNome(event) {
      const value = event.target.value;
      setBuscar(value);
   }

   const buscarEnter = (event) => {
      if (event.keyCode === 13) {
         requestData(event, buscar);
      }
   };

   async function deletarCompanhia(id) {
      try {
         await axios({
            method: "delete",
            url: `http://209.97.146.187:18919/companies/excluir/${id}`,
         });
         window.location.reload();
      } catch (error) {
         alert(error);
      }
   }

   const requestData = async (e, param = "", page = 1) => {
      try {
         if (e) {
            e.preventDefault();
         }
         const { data } = await axios({
            method: "get",
            url: "http://209.97.146.187:18919/companies/listar",
            params: {
               nome: param,
               page: page,
            },
         });
         setHoraCriacao(moment(data.data.cpn_dtcreation).format("hh"))
         setHoraUpd(moment(data.data.cpn_dtupdate).format("hh"))
         setCompanhia(data.data);
         setPage(data.meta.pagination);
      } catch (error) {
         alert(error);
      }
   };

   useEffect(() => {
      requestData();
   }, []);

   return (
      <MainContainer>
         <CustomMenu />
         <Col
            sm={{ offset: 1, span: 9 }}//Temporary until styled components
            md={{ offset: 1, span: 9 }}
            lg={{ offset: 2, span: 10 }}
         >
            <Container>
               <Title>Empresa</Title>
               <Row className="input-group">
                  <Input
                     className="form-control"
                     type="text"
                     placeholder="Digite o nome"
                     onChange={buscarNome}
                     onKeyDown={(e) => buscarEnter(e)}
                     defaultValue={buscar}
                  />
                  <LittleBtn
                     className="input-group-append"
                     onClick={(e) => requestData(e, buscar)}
                     type="button"
                     yellowColor
                  >
                     Buscar
                  </LittleBtn>
                  <BtnCadastrar href={`/cadastrar/companhia/${"inserir"}`} className="btn btn-dark ml-3">
                     Cadastrar
                  </BtnCadastrar>
               </Row>
               <Table>
                  <TableHeader>
                     <TableRow>
                        <ColumnTitle scope="col">ID Eduzz</ColumnTitle>
                        <ColumnTitle scope="col">Nome</ColumnTitle>
                        <ColumnTitle columnWidth scope="col">Data de Criação</ColumnTitle>
                        <ColumnTitle columnWidth scope="col">Data de atualização</ColumnTitle>
                        <ColumnTitle scope="col">Ações</ColumnTitle>
                     </TableRow>
                  </TableHeader>
                  <TableData>
                     {companhia === null
                        ? ""
                        : companhia.map((companhia) => {
                           return (
                              <TableRow key={companhia.usr_cod}>
                                 <TableCell data-title="ID Eduzz">{companhia.cpn_cli_cod}</TableCell>
                                 <TableCell data-title="Nome" className="text">{companhia.cpn_name}</TableCell>
                                 <TableCell data-title="Data de Criação" className="data">
                                    {moment(companhia?.cpn_dtcreation).format("a") === "pm" ? (
                                       moment(companhia?.cpn_dtcreation).format("DD-MM-YYYY") + " " + (parseInt(horaCriacao) + 12) + ":" + moment(companhia?.cpn_dtcreation).format("mm")
                                    )
                                       : moment(companhia?.cpn_dtcreation).format("DD-MM-YYYY hh:mm")
                                    }
                                 </TableCell>
                                 {companhia.cpn_dtupdate == null ? <TableCell data-title="Data de Atualização"><p style={{ color: "transparent" }}>.</p></TableCell> :
                                    <TableCell data-title="Data de Atualização" className="data">
                                       {moment(companhia?.cpn_dtupdate).format("a") === "pm" ? (
                                          moment(companhia?.cpn_dtupdate).format("DD-MM-YYYY") 
                                          + " " + (parseInt(horaUpd) + 12) 
                                          + ":" + moment(companhia?.cpn_dtupdate).format("mm")
                                       )
                                          : moment(companhia?.cpn_dtcreation).format("DD-MM-YYYY hh:mm")
                                       }
                                    </TableCell>
                                 }
                                 <TableCell data-title="Ações" className="acoes">
                                    <Link className="btn btn-warning" to={`/editar-companhia/${companhia.cpn_cod}/${"alterar"}`}>Editar</Link>
                                    <Button className="btn btn-dark" onClick={() => setShowModal(true)}>
                                       Excluir
                                    </Button>
                                 </TableCell>
                                 <Modal show={showModal} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                       <Modal.Title>Erro!</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>Você deseja excluir a companhia?</Modal.Body>
                                    <Modal.Footer>
                                       <Button variant="danger" onClick={handleClose}>
                                          Não
                                       </Button>
                                       <Button variant="warning" onClick={() => deletarCompanhia(companhia.cpn_cod)}>
                                          Excluir
                                       </Button>
                                    </Modal.Footer>
                                 </Modal>
                              </TableRow>
                           );
                        })}
                  </TableData>
               </Table>

               <Pagination style={{marginBottom: 20}}>
                  <Pagination.First onClick={(e) => {
                     requestData(e, buscar, 1)
                     window.scroll(0, 0)
                  }} />
                  <Pagination.Prev
                     disabled={page.current === 1 ? true : false}
                     onClick={(e) => {
                        requestData(e, buscar, page.current - 1)
                        window.scroll(0, 0)
                     }}
                  />
                  {page.current >= 3 ? <Pagination.Ellipsis disabled={true} /> : null}
                  {page.current >= 2 ? (
                     <Pagination.Item
                        onClick={(e) => {
                           requestData(e, buscar, page.current - 1)
                           window.scroll(0, 0)
                        }}
                     >
                        {page.current - 1}
                     </Pagination.Item>
                  ) : null}
                  <Pagination.Item active>{page.current}</Pagination.Item>
                  {page.total - page.current >= 1 ? (
                     <Pagination.Item
                        onClick={(e) => {
                           requestData(e, buscar, page.current + 1)
                           window.scroll(0, 0)
                        }}
                     >
                        {page.current + 1}
                     </Pagination.Item>
                  ) : null}
                  {page.total - page.current >= 2 ? (
                     <Pagination.Ellipsis disabled={true} />
                  ) : null}
                  <Pagination.Next
                     disabled={page.current === page.total ? true : false}
                     onClick={(e) => {
                        requestData(e, buscar, page.current + 1)
                        window.scroll(0, 0)
                     }}
                  />
                  <Pagination.Last
                     onClick={(e) => {
                        requestData(e, buscar, page.total)
                        window.scroll(0, 0)
                     }}
                  />
               </Pagination>
            </Container>
         </Col>
      </MainContainer>
   );
}
