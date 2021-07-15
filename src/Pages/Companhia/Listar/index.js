import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { IoArrowDownSharp, IoArrowUpSharp } from "react-icons/io5";
import { Pagination, Button, Modal, Col, Row, Container, Form } from "react-bootstrap";
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
   TableCell,
   SortIcon,
   BtnGroup
} from "./styles.js"
import { CustomMenu } from "../../../Componentes/CustomMenu";

export default function ListarCompanhia() {
   const [companhia, setCompanhia] = useState(null);
   const [buscarEmpresa, setBuscarEmpresa] = useState(null);
   const [buscarEmpresaId, setBuscarEmpresaId] = useState(null);
   const [page, setPage] = useState({});
   const [showModal, setShowModal] = useState(false);
   const [count, setCount] = useState(null);
   const [statusArrow, setStatusArrow] = useState({ "0": null, "1": null });

   const handleClose = () => setShowModal(false);

   function pesquisarEmpresa(event) {
      const value = event.target.value;
      setBuscarEmpresa(value);
   }

   function pesquisarId(event) {
      const value = event.target.value;
      setBuscarEmpresaId(value);
   }

   const buscarEnter = (event) => {
      if (event.keyCode === 13) {
         requestData(event, buscarEmpresaId, buscarEmpresa, page.current, null, null);
      }
   };

   function preventNonNumericalInput(e) {
      e = e || window.event;
      var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
      var charStr = String.fromCharCode(charCode);

      if (!charStr.match(/^[0-9]+$/))
         e.preventDefault();
   }

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

   const requestData = async (e, id = null, param = "", page = 1, columnName, sortOrder) => {
      try {
         if (e) {
            e.preventDefault();
         }
         const { data } = await axios({
            method: "get",
            url: "http://209.97.146.187:18919/companies/listar",
            params: {
               idEduzz: id,
               name: param,
               sort: columnName,
               isDesc: sortOrder,
               page: page,
            },
         });
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
            sm={{ offset: 1, span: 9 }}
            md={{ offset: 1, span: 9 }}
            lg={{ offset: 2, span: 10 }}
         >
            <Container>
               <Title>Empresa</Title>
               <Col
                  sm={{ span: 6 }}
                  style={{
                     alignSelf: "baseline",
                     border: "1px solid rgba(0,0,0,0.20)",
                     padding: 15,
                     borderRadius: 5
                  }}
               >
                  <Form>
                     <Form.Group>
                        <Form.Label>ID Eduzz: </Form.Label>
                        <Form.Control
                           type="number"
                           onChange={pesquisarId}
                           defaultValue={buscarEmpresaId}
                           onKeyDown={(e) => buscarEnter(e)}
                           onKeyPress={(e) => preventNonNumericalInput(e)}
                           maxLength="10"
                        />
                     </Form.Group>
                     <Form.Group>
                        <Form.Label>Nome: </Form.Label>
                        <Form.Control
                           type="text"
                           onChange={pesquisarEmpresa}
                           onKeyDown={(e) => buscarEnter(e)}
                           defaultValue={buscarEmpresa}
                        />
                     </Form.Group>
                  </Form>
                  <Button
                     type="submit"
                     variant="warning"
                     onClick={(e) => requestData(e, buscarEmpresaId, buscarEmpresa, page.current, null, null)}
                  >
                     Buscar
                  </Button>
                  <BtnCadastrar href={`/cadastrar/companhia/${"inserir"}`} className="btn btn-dark ml-3">
                     Cadastrar
                  </BtnCadastrar>
               </Col>
               <Table>
                  <TableHeader>
                     <TableRow>
                        <ColumnTitle scope="col" onClick={(e) => {
                           setStatusArrow({ "0": 1, "1": null })
                           if (count == null) {
                              setCount(count + 1);
                              requestData(e, buscarEmpresaId, buscarEmpresa, page.current, "Cpn_cli_cod", false);
                           } else {
                              setCount(null);
                              requestData(e, buscarEmpresaId, buscarEmpresa, page.current, "Cpn_cli_cod", true);
                           }
                        }}>
                           <SortIcon>
                              ID Eduzz {statusArrow[0] == null ? "" :
                                 (
                                    count == null ? <IoArrowUpSharp /> : <IoArrowDownSharp />
                                 )}
                           </SortIcon>
                        </ColumnTitle>
                        <ColumnTitle scope="col" onClick={(e) => {
                           setStatusArrow({ "0": null, "1": 1 })
                           if (count == null) {
                              setCount(count + 1);
                              requestData(e, buscarEmpresaId, buscarEmpresa, page.current, "Cpn_name", false);
                           } else {
                              setCount(null);
                              requestData(e, buscarEmpresaId, buscarEmpresa, page.current, "Cpn_name", true);
                           }
                        }}>
                           <SortIcon>
                              Nome {statusArrow[1] == null ? "" :
                                 (
                                    count == null ? <IoArrowUpSharp /> : <IoArrowDownSharp />
                                 )}
                           </SortIcon>
                        </ColumnTitle>
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

               <Pagination style={{ marginBottom: 20 }}>
                  <Pagination.First onClick={(e) => {
                     requestData(e, buscarEmpresaId, buscarEmpresa, 1, null, null)
                     window.scroll(0, 0)
                  }} />
                  <Pagination.Prev
                     disabled={page.current === 1 ? true : false}
                     onClick={(e) => {
                        requestData(e, buscarEmpresaId, buscarEmpresa, page.current - 1, null, null)
                        window.scroll(0, 0)
                     }}
                  />
                  {page.current >= 3 ? <Pagination.Ellipsis disabled={true} /> : null}
                  {page.current >= 2 ? (
                     <Pagination.Item
                        onClick={(e) => {
                           requestData(e, buscarEmpresaId, buscarEmpresa, page.current - 1, null, null)
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
                           requestData(e, buscarEmpresaId, buscarEmpresa, page.current + 1, null, null)
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
                        requestData(e, buscarEmpresaId, buscarEmpresa, page.current + 1, null, null)
                        window.scroll(0, 0)
                     }}
                  />
                  <Pagination.Last
                     onClick={(e) => {
                        requestData(e, buscarEmpresaId, buscarEmpresa, page.total, null, null)
                        window.scroll(0, 0)
                     }}
                  />
               </Pagination>
            </Container>
         </Col>
      </MainContainer>
   );
}
