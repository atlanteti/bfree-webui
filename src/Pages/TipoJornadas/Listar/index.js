import { useEffect, useState } from "react";
import { CustomMenu } from "../../../Componentes/CustomMenu";
import moment from "moment";
import { Link } from "react-router-dom"
import axios from "axios";
import { IoArrowDownSharp, IoArrowUpSharp } from "react-icons/io5";
import { Button, Pagination, Modal, Container, Row, Col } from 'react-bootstrap';
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

export default function ListarJornadas() {
   const [buscar, setBuscar] = useState("");
   const [page, setPage] = useState({});
   const [jornada, setJornada] = useState(null);
   const [showModal, setShowModal] = useState(false);
   const [count, setCount] = useState(null);
   const [statusArrow, setStatusArrow] = useState({"0": null, "1": null});

   const handleClose = () => setShowModal(false);

   function buscarNome(event) {
      const value = event.target.value
      setBuscar(value)
   }

   const buscarEnter = (event) => {
      if (event.keyCode === 13) {
         requestData(event, buscar)
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

   const requestData = async (e, param = '', page = 1, columnName, sortOrder) => {
      console.log(buscar)
      try {
         if (e) {
            e.preventDefault();
         }
         const { data } = await axios({
            method: "get",
            url: "http://209.97.146.187:18919/jorneys/listar",
            params: {
               idEduzz: null,
               nome: param,
               sort: columnName,
               isDesc: sortOrder,
               page: page,
            },
         });
         console.log(data.data)
         setJornada(data.data);
         setPage(data.meta.pagination);
      } catch (error) {
         alert(error);
      }
   };

   function ordenar(property) {
      console.log(property)
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
               <Title>Jornadas</Title>
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
                     onClick={(e) => requestData(e, buscar, page = 1)}
                     type="button"
                     yellowColor
                  >
                     Buscar
                  </LittleBtn>
                  <BtnCadastrar href={`/cadastrar/jornada/${"inserir"}`} className="btn btn-dark ml-3">
                     Cadastrar
                  </BtnCadastrar>
               </Row>
               <Table>
                  <TableHeader>
                     <TableRow>
                        <ColumnTitle scope="col" onClick={(e) => {
                           setStatusArrow({"0": 1, "1": null})
                           if(count == null){
                              setCount(count + 1);
                              requestData(e, buscar, page.current, "Jny_name", false);
                           } else {
                              setCount(null);
                              requestData(e, buscar, page.current, "Jny_name", true);
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
                              jornada.sort(ordenar("company.cpn_name"));
                           } else {
                              setCount(null);
                              jornada.sort(ordenar("company.cpn_name")).reverse();
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
                                 <TableCell data-title="Companhia" id="text">{jorn.company.cpn_name}</TableCell>
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