import { useEffect, useState } from "react";
import { CustomMenu } from "../../../Componentes/CustomMenu";
import moment from "moment";
import { Link } from "react-router-dom"
import axios from "axios";
import { IoArrowDownSharp, IoArrowUpSharp } from "react-icons/io5";
import { Button, Pagination, Modal, Container, Col, Form } from 'react-bootstrap';
import {
   Title,
   MainContainer,
   BtnCadastrar,
   Table,
   TableHeader,
   TableRow,
   ColumnTitle,
   TableData,
   TableCell,
   SortIcon
} from "./styles.js"

export default function ListarJornadas() {
   const [buscar, setBuscar] = useState("");
   const [buscarEmpresa, setBuscarEmpresa] = useState(null);
   const [page, setPage] = useState({});
   const [jornada, setJornada] = useState(null);
   const [companys, setCompanys] = useState(null);
   const [showModal, setShowModal] = useState(false);
   const [count, setCount] = useState(null);
   const [statusArrow, setStatusArrow] = useState({ "0": null, "1": null });

   const handleClose = () => setShowModal(false);

   function pesquisarNome(event) {
      const value = event.target.value;
      setBuscar(value)
   }

   function pesquisarEmpresa(event) {
      const value = event.target.value;
      setBuscarEmpresa(value)
   }

   const buscarEnter = (event) => {
      if (event.keyCode === 13) {
         requestData(event, buscarEmpresa, buscar, page.current, null, null)
      }
   }

   async function deletarJornada(id) {
      try {
         await axios({
            method: "delete",
            url: `http://209.97.146.187:18919/jorneys/excluir/${id}`,
         });
         window.location.reload();
      } catch (error) {
         alert(error);
      }
   }

   const requestData = async (e, id = null, param = '', page = 1, columnName, sortOrder) => {
      try {
         if (e) {
            e.preventDefault();
         }
         const { data } = await axios({
            method: "get",
            url: "http://209.97.146.187:18919/jorneys/listar",
            params: {
               companyId: id,
               name: param,
               sort: columnName,
               isDesc: sortOrder,
               page: page,
            },
         });
         setJornada(data.data);
         setPage(data.meta.pagination);
      } catch (error) {
         alert(error);
      }
   };

   const requestCompanys = async () => {
      try {
         const { data } = await axios({
            method: "get",
            url: "http://209.97.146.187:18919/companies/listar-todos",
         });
         setCompanys(data.data);
      } catch (error) {
         alert(error);
      }
   }

   useEffect(() => {
      requestData();
      requestCompanys();
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
               <Title>Jornadas</Title>
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
                        <Form.Label>Nome: </Form.Label>
                        <Form.Control
                           type="text"
                           onChange={pesquisarNome}
                           defaultValue={buscar}
                           onKeyDown={(e) => buscarEnter(e)}
                        />
                     </Form.Group>
                     <Form.Group>
                        <Form.Label>Empresa: </Form.Label>
                        <Form.Control
                           as="select"
                           onChange={pesquisarEmpresa}
                           onKeyDown={(e) => buscarEnter(e)}
                           defaultValue={buscarEmpresa}
                        >
                           <option selected value={null}></option>
                           <>
                              {companys?.map(company => {
                                 return (
                                    <option
                                       key={company.cpn_cod}
                                       value={company.cpn_cod}
                                    >
                                       {company.cpn_name}
                                    </option>)
                              })}
                           </>
                        </Form.Control>
                     </Form.Group>
                  </Form>
                  <Button
                     type="submit"
                     variant="warning"
                     onClick={(e) => requestData(e, buscarEmpresa, buscar, page.current, null, null)}
                  >
                     Buscar
                  </Button>
                  <BtnCadastrar href={`/cadastrar/jornada/${"inserir"}`} className="btn btn-dark ml-3">
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
                              requestData(e, buscarEmpresa, buscar, page.current, "Jny_name", false);
                           } else {
                              setCount(null);
                              requestData(e, buscarEmpresa, buscar, page.current, "Jny_name", true);
                           }
                        }}>
                           <SortIcon>
                              Nome {statusArrow[0] == null ? "" :
                                 (
                                    count == null ? <IoArrowUpSharp /> : <IoArrowDownSharp />
                                 )}
                           </SortIcon>
                        </ColumnTitle>
                        <ColumnTitle scope="col" onClick={(e) => {
                           setStatusArrow({ "0": null, "1": 1 })
                           if (count == null) {
                              setCount(count + 1);
                              requestData(e, buscarEmpresa, buscar, page.current, "Cpn_name", false);
                           } else {
                              setCount(null);
                              requestData(e, buscarEmpresa, buscar, page.current, "Cpn_name", true);
                           }
                        }}>
                           <SortIcon>
                              Empresa {statusArrow[1] == null ? "" :
                                 (
                                    count == null ? <IoArrowUpSharp /> : <IoArrowDownSharp />
                                 )}
                           </SortIcon>
                        </ColumnTitle>
                        <ColumnTitle scope="col">Ações</ColumnTitle>
                     </TableRow>
                  </TableHeader>
                  <TableData>
                     {jornada === null
                        ? ""
                        : jornada.map((jorn) => {
                           return (
                              <TableRow key={jorn.jny_cod}>
                                 <TableCell data-title="Nome" id="text">{jorn.jny_name}</TableCell>
                                 <TableCell data-title="Empresa" id="text">{jorn.company.cpn_name}</TableCell>
                                 <TableCell data-title="Ações" className="acoes">
                                    <Link to={`/editar-jornada/${jorn.jny_cod}/${"alterar"}`} className="btn btn-warning">Editar</Link>
                                    <Button className="btn btn-dark" onClick={() => setShowModal(true)}>
                                       Excluir
                                    </Button>
                                 </TableCell>
                                 <Modal show={showModal} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                       <Modal.Title>Erro!</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>Você deseja excluir a jornada?</Modal.Body>
                                    <Modal.Footer>
                                       <Button variant="danger" onClick={handleClose}>
                                          Não
                                       </Button>
                                       <Button variant="warning" onClick={() => deletarJornada(jorn.jny_cod)}>
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
                     requestData(e, buscarEmpresa, buscar, 1, null, null)
                     window.scroll(0, 0)
                  }} />
                  <Pagination.Prev
                     disabled={page.current === 1 ? true : false}
                     onClick={(e) => {
                        requestData(e, buscarEmpresa, buscar, page.current - 1, null, null)
                        window.scroll(0, 0)
                     }}
                  />
                  {page.current >= 3 ? <Pagination.Ellipsis disabled={true} /> : null}
                  {page.current >= 2 ? (
                     <Pagination.Item
                        onClick={(e) => {
                           requestData(e, buscarEmpresa, buscar, page.current - 1, null, null)
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
                           requestData(e, buscarEmpresa, buscar, page.current + 1, null, null)
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
                        requestData(e, buscarEmpresa, buscar, page.current + 1, null, null)
                        window.scroll(0, 0)
                     }}
                  />
                  <Pagination.Last
                     onClick={(e) => {
                        requestData(e, buscarEmpresa, buscar, page.total, null, null)
                        window.scroll(0, 0)
                     }}
                  />
               </Pagination>
            </Container>
         </Col>
      </MainContainer>
   );
}