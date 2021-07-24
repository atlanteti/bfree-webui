import { useEffect, useState, React } from 'react'
import { CustomMenu } from '../../../Componentes/CustomMenu'
import { Link } from 'react-router-dom'
import { IoArrowDownSharp, IoArrowUpSharp, IoCheckboxOutline } from 'react-icons/io5'
import { Button, Pagination, Modal, Col, Container, Form } from 'react-bootstrap'

import {
   ActionCell, ActionHeaderCell,
  MainContainer,
  BtnCadastrar,
  Table,
  TableHeader,
  TableRow,
  ColumnTitle,
  TableData,
  TableCell,
   Icon,
   RightAlignText,
   TableRow, TextCell, TextHeaderCell, Title
} from '../../../styles/CommonStyles'

export default function ListarBadges () {
  const [buscar, setBuscar] = useState('')
  const [buscarEmpresa, setBuscarEmpresa] = useState(null)
  const [companys, setCompanys] = useState()
  const [mentor, setMentor] = useState(null)
  const [page, setPage] = useState({})
  const [badges, setBadges] = useState(null)
  const [idBadge, setIdBadge] = useState(null)
  const [count, setCount] = useState(null)
  const [statusArrow, setStatusArrow] = useState({ 0: null, 1: null, 2: null, 3: null })

  const [showModal, setShowModal] = useState(false)

  const handleClose = () => setShowModal(false)

  function pesquisarNome (event) {
    const value = event.target.value
    setBuscar(value)
  }

  function pesquisarEmpresa (event) {
    const value = event.target.value
    setBuscarEmpresa(value)
  }

  function pesquisaMentor (event) {
    const value = event.target.value
    setMentor(value)
  }

  const buscarEnter = (event) => {
    if (event.keyCode === 13) {
      requestData(event, buscarEmpresa, buscar, page.current, null, null, mentor)
    }
  }

  const requestData = async (e, id = null, param = '', page = 1, columnName, sortOrder, mentor) => {
    try {
      if (e) {
        e.preventDefault()
      }
      const { data } = await axios({
        method: 'get',
        url: 'http://209.97.146.187:18919/badges/listar',
        params: {
          companyId: id,
          name: param,
          sort: columnName,
          isDesc: sortOrder,
          page: page,
          isMentor: mentor
        }
      })
      setBadges(data.data)
      setPage(data.meta.pagination)
    } catch (error) {
      alert(error)
    }
  }

  async function deletarBadge (id) {
    try {
      await axios({
        method: 'delete',
        url: `http://209.97.146.187:18919/badges/excluir/${id}`
      })

      window.location.reload()
    } catch (error) {
      alert(error)
    }
  }

  const requestCompanys = async () => {
    try {
      const { data } = await axios({
        method: 'get',
        url: 'http://209.97.146.187:18919/companies/listar-todos'
      })
      setCompanys(data.data)
    } catch (error) {
      alert(error)
    }
  }

  useEffect(() => {
    requestData()
    requestCompanys()
  }, [])

  return (
      <MainContainer>
         <CustomMenu />
         <Col
            sm={{ offset: 1, span: 9 }}// Temporary until styled components
            md={{ offset: 1, span: 9 }}
            lg={{ offset: 2, span: 10 }}
         >
            <Container>
               <Title>Badges</Title>
               <Col
                  sm={{ span: 6 }}
                  style={{
                    alignSelf: 'baseline',
                    border: '1px solid rgba(0,0,0,0.20)',
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
                     <Form.Group>
                        <Form.Label>Mentor: </Form.Label>
                        <Form.Control
                           as="select"
                           onChange={pesquisaMentor}
                           onKeyDown={(e) => buscarEnter(e)}
                           defaultValue={mentor}
                        >
                           <option selected value={null}></option>
                           <option value={true}>Sim</option>
                           <option value={false}>Não</option>
                        </Form.Control>
                     </Form.Group>
                  </Form>
                  <Button
                     type="submit"
                     variant="warning"
                     onClick={(e) => requestData(e, buscarEmpresa, buscar, page.current, null, null, mentor)}
                  >
                     Buscar
                  </Button>
                  <BtnCadastrar href={`/cadastrar/badges/${'inserir'}`} className="btn btn-dark ml-3">
                     Cadastrar
                  </BtnCadastrar>
               </Col>
               <Table>
                  <TableHeader>
                     <TableRow>
                        <ColumnTitle scope="col" onClick={(e) => {
                          setStatusArrow({ 0: 1, 1: null, 2: null, 3: null })
                          if (count == null) {
                            setCount(count + 1)
                            requestData(e, buscarEmpresa, buscar, page.current, 'Bdg_name', false, mentor)
                          } else {
                            setCount(null)
                            requestData(e, buscarEmpresa, buscar, page.current, 'Bdg_name', true, mentor)
                          }
                        }}>
                           <SortIcon>
                              Nome {statusArrow[0] == null
                             ? ''
                             : (
                                 count == null ? <IoArrowUpSharp /> : <IoArrowDownSharp />
                               )}
                           </SortIcon>
                        </ColumnTitle>
                        <ColumnTitle scope="col" onClick={(e) => {
                          setStatusArrow({ 0: null, 1: 1, 2: null, 3: null })
                          if (count == null) {
                            setCount(count + 1)
                            requestData(e, buscarEmpresa, buscar, page.current, 'Jny_name', false, mentor)
                          } else {
                            setCount(null)
                            requestData(e, buscarEmpresa, buscar, page.current, 'Jny_name', true, mentor)
                          }
                        }}>
                           <SortIcon>
                              Jornada {statusArrow[1] == null
                             ? ''
                             : (
                                 count == null ? <IoArrowUpSharp /> : <IoArrowDownSharp />
                               )}
                           </SortIcon>
                        </ColumnTitle>
                        <ColumnTitle scope="col" onClick={(e) => {
                          setStatusArrow({ 0: null, 1: null, 2: 1, 3: null })
                          if (count == null) {
                            setCount(count + 1)
                            requestData(e, buscarEmpresa, buscar, page.current, 'Cpn_name', false, mentor)
                          } else {
                            setCount(null)
                            requestData(e, buscarEmpresa, buscar, page.current, 'Cpn_name', true, mentor)
                          }
                        }}>
                           <SortIcon>
                              Empresa {statusArrow[2] == null
                             ? ''
                             : (
                                 count == null ? <IoArrowUpSharp /> : <IoArrowDownSharp />
                               )}
                           </SortIcon>
                        </ColumnTitle>
                        <ColumnTitle scope="col" onClick={(e) => {
                          setStatusArrow({ 0: null, 1: null, 2: null, 3: 1 })
                          if (count == null) {
                            setCount(count + 1)
                            requestData(e, buscarEmpresa, buscar, page.current, 'Bdg_mentor', false, mentor)
                          } else {
                            setCount(null)
                            requestData(e, buscarEmpresa, buscar, page.current, 'Bdg_mentor', true, mentor)
                          }
                        }}>
                           <SortIcon>
                              Mentor {statusArrow[3] == null
                             ? ''
                             : (
                                 count == null ? <IoArrowUpSharp /> : <IoArrowDownSharp />
                               )}
                           </SortIcon>
                        </ColumnTitle>
                        <ColumnTitle columnWidth scope="col">Ações</ColumnTitle>
                     </TableRow>
                  </TableHeader>
                  <TableData>
                     {badges === null
                       ? ''
                       : badges.map((badge) => {
                         return (
                              <TableRow key={badge.bdg_cod}>
                                 <TableCell data-title="Nome" className="text">{badge.bdg_name}</TableCell>
                                 <TableCell data-title="Jornada" className="text">
                                    {/* para que fique ajustado para mobile */}
                                    {badge.jorney?.jny_name == null ? <p style={{ color: 'transparent' }}>.</p> : badge?.jorney.jny_name}
                                 </TableCell>
                                 <TableCell data-title="Companhia" className="text">
                                    {badge.company?.cpn_name == null ? <p style={{ color: 'transparent' }}>.</p> : badge?.company?.cpn_name}
                                 </TableCell>
                                 <TableCell data-title="Mentor" className="icon">
                                    <Icon>
                                       {badge?.bdg_mentor === true ? <IoCheckboxOutline align="center" size={25} /> : <p style={{ color: "transparent" }}>.</p>}
                                    </Icon>
                                 </TableCell>
                                 <TableCell data-title="Ações" className="acoes">
                                    <Link to={`/editar-badge/${badge.bdg_cod}/${'alterar'}`} className="btn btn-warning">Editar</Link>
                                    <Button className="btn btn-dark" onClick={(e) => {
                                      setShowModal(true)
                                      setIdBadge(badge.bdg_cod)
                                    }}>
                                       Excluir
                                    </Button>
                                 </TableCell>
                                 <Modal show={showModal} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                       <Modal.Title>Aviso!</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>Você deseja excluir a badge?</Modal.Body>
                                    <Modal.Footer>
                                       <Button variant="danger" onClick={handleClose}>
                                          Não
                                       </Button>
                                       <Button variant="warning" onClick={() => deletarBadge(idBadge)}>
                                          Excluir
                                       </Button>
                                    </Modal.Footer>
                                 </Modal>
                              </TableRow>
                         )
                       })}
                  </TableData>
               </Table>

               <Pagination style={{ marginBottom: 20 }}>
                  <Pagination.First onClick={(e) => {
                    requestData(e, buscarEmpresa, buscar, 1, null, null, mentor)
                    window.scroll(0, 0)
                  }} />
                  <Pagination.Prev
                     disabled={page.current === 1}
                     onClick={(e) => {
                       requestData(e, buscarEmpresa, buscar, page.current - 1, null, null, mentor)
                       window.scroll(0, 0)
                     }}
                  />
                  {page.current >= 3 ? <Pagination.Ellipsis disabled={true} /> : null}
                  {page.current >= 2
                    ? (
                     <Pagination.Item
                        onClick={(e) => {
                          requestData(e, buscarEmpresa, buscar, page.current - 1, null, null, mentor)
                          window.scroll(0, 0)
                        }}
                     >
                        {page.current - 1}
                     </Pagination.Item>
                      )
                    : null}
                  <Pagination.Item active>{page.current}</Pagination.Item>
                  {page.total - page.current >= 1
                    ? (
                     <Pagination.Item
                        onClick={(e) => {
                          requestData(e, buscarEmpresa, buscar, page.current + 1, null, null, mentor)
                          window.scroll(0, 0)
                        }}
                     >
                        {page.current + 1}
                     </Pagination.Item>
                      )
                    : null}
                  {page.total - page.current >= 2
                    ? (
                     <Pagination.Ellipsis disabled={true} />
                      )
                    : null}
                  <Pagination.Next
                     disabled={page.current === page.total}
                     onClick={(e) => {
                       requestData(e, buscarEmpresa, buscar, page.current + 1, null, null, mentor)
                       window.scroll(0, 0)
                     }}
                  />
                  <Pagination.Last
                     onClick={(e) => {
                       requestData(e, buscarEmpresa, buscar, page.total, null, null, mentor)
                       window.scroll(0, 0)
                     }}
                  />
               </Pagination>
            </Container>
         </Col>
      </MainContainer>
  )
}
