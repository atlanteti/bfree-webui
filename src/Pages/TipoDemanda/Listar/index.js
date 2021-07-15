import { useEffect, useState } from "react";
import { CustomMenu } from "../../../Componentes/CustomMenu";
import { Link } from "react-router-dom"
import { IoArrowDownSharp, IoArrowUpSharp } from "react-icons/io5";
import { Button, Pagination, Modal, Col, Row, Container, Form } from 'react-bootstrap';
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
   SortIcon
} from "./styles.js"
import axios from "axios";

export default function ListarTipoDemanda() {
   const [buscar, setBuscar] = useState("");
   const [buscarEmpresa, setBuscarEmpresa] = useState(null);
   const [page, setPage] = useState({});
   const [companys, setCompanys] = useState();
   const [typeDemand, setTypeDemand] = useState(null);
   const [idDemand, setIdDemand] = useState(null);
   const [count, setCount] = useState(null);
   const [statusArrow, setStatusArrow] = useState({ "0": null, "1": null });

   const [showModal, setShowModal] = useState(false);

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

   const requestData = async (e, id = null, param = '', page = 1, columnName, sortOrder) => {
      try {
         if (e) {
            e.preventDefault();
         }
         const { data } = await axios({
            method: "get",
            url: "http://209.97.146.187:18919/types-demand/listar",
            params: {
               idCompany: id,
               name: param,
               sort: columnName,
               isDesc: sortOrder,
               page: page,
            },
         });
         setTypeDemand(data.data);
         setPage(data.meta.pagination);
      } catch (error) {
         alert(error);
      }
   };

   async function deleteDemand(id) {
      try {
         await axios({
            method: "delete",
            url: `http://209.97.146.187:18919/types-demand/excluir/${id}`,
         });
         window.location.reload();
      } catch (error) {
         alert(error);
      }
   }

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
      requestCompanys();
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
               <Title>Tipo Demanda</Title>
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
                  <BtnCadastrar href={`/cadastrar/tipodemanda/${"inserir"}`} className="btn btn-dark ml-3">
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
                              requestData(e, buscarEmpresa, buscar, page.current, "Tdm_name", false);
                           } else {
                              setCount(null);
                              requestData(e, buscarEmpresa, buscar, page.current, "Tdm_name", true);
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
                     {typeDemand === null
                        ? ""
                        : typeDemand?.map((tDemand) => {
                           return (
                              <TableRow key={tDemand?.tdm_cod}>
                                 <TableCell data-title="Nome" className="text">
                                    {tDemand?.tdm_name == null ? <p style={{ color: "transparent" }}>.</p> : tDemand?.tdm_name}
                                 </TableCell>
                                 <TableCell data-title="Empresa" className="text">
                                    {tDemand?.company?.cpn_name == null ? <p style={{ color: "transparent" }}>.</p> : tDemand?.company?.cpn_name}
                                 </TableCell>
                                 <TableCell data-title="Ações" className="acoes">
                                    <Link
                                       className="btn btn-warning"
                                       to={`/editar-tipodemanda/${tDemand.tdm_cod}/${"alterar"}`}
                                    >
                                       Editar
                                    </Link>
                                    <Button className="btn btn-dark"
                                       onClick={() => {
                                          setShowModal(true)
                                          setIdDemand(tDemand.tdm_cod)
                                       }}>
                                       Excluir
                                    </Button>
                                 </TableCell>
                                 <Modal show={showModal} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                       <Modal.Title>Aviso!</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>Você deseja excluir a Demanda?</Modal.Body>
                                    <Modal.Footer>
                                       <Button variant="danger" onClick={handleClose}>
                                          Não
                                       </Button>
                                       <Button variant="warning" onClick={() => deleteDemand(idDemand)}>
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
      </MainContainer >
   );
}