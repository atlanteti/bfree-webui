import { useEffect, useState } from "react";
import { CustomMenu } from "../../../Componentes/CustomMenu";
import { Link } from "react-router-dom"
import { IoArrowDownSharp, IoArrowUpSharp } from "react-icons/io5";
import { Button, Pagination, Modal, Col, Row, Container } from 'react-bootstrap';
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
   const [page, setPage] = useState({});
   const [typeDemand, setTypeDemand] = useState(null);
   const [idDemand, setIdDemand] = useState(null);
   const [count, setCount] = useState(null);
   const [statusArrow, setStatusArrow] = useState({"0": null, "1": null});

   const [showModal, setShowModal] = useState(false);

   const handleClose = () => setShowModal(false);

   const requestData = async (e, param = '', page = 1) => {
      try {
         if (e) {
            e.preventDefault();
         }
         const { data } = await axios({
            method: "get",
            url: "http://209.97.146.187:18919/types-demand/listar",
            params: {
               // name: param,
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

   function ordenar(property) {
      
      if(property === "company.cpn_name"){
         return function (a,b) {
            return (a["company"]["cpn_name"] < b["company"]["cpn_name"]) ? -1 : (a["company"]["cpn_name"] > b["company"]["cpn_name"]) ? 1 : 0;
        }
      } else {
         return function (a,b) {
            return (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        }
      }
  }

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
               <Title>Tipo Demanda</Title>
               <Row className="input-group">
                  <Input
                     className="form-control"
                     type="text"
                     placeholder="Digite o nome"
                     // onChange={buscarNome}
                     // onKeyDown={(e) => buscarEnter(e)}
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
                  <BtnCadastrar href={`/cadastrar/tipodemanda/${"inserir"}`} className="btn btn-dark ml-3">
                     Cadastrar
                  </BtnCadastrar>
               </Row>
               <Table>
                  <TableHeader>
                     <TableRow>
                        <ColumnTitle scope="col" onClick={() => {
                           setStatusArrow({"0": 1, "1": null})
                           if(count == null){
                              setCount(count + 1);
                              typeDemand.sort(ordenar("tdm_name"));
                           } else {
                              setCount(null);
                              typeDemand.sort(ordenar("tdm_name")).reverse();
                           }
                        }}>
                           <SortIcon>
                              Nome {statusArrow[0] == null ? "" : 
                              (
                                 count == null ? <IoArrowUpSharp /> : <IoArrowDownSharp />
                              )}
                           </SortIcon>
                        </ColumnTitle>
                        <ColumnTitle scope="col" onClick={() => {
                           setStatusArrow({"0": null, "1": 1})
                           if(count == null){
                              setCount(count + 1);
                              typeDemand.sort(ordenar("company.cpn_name"));
                           } else {
                              setCount(null);
                              typeDemand.sort(ordenar("company.cpn_name")).reverse();
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
      </MainContainer >
   );
}