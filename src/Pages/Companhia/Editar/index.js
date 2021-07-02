import React, { useEffect, useState } from 'react';

import { Form, Col, Row, Button, Alert, Container } from 'react-bootstrap';
import { Redirect } from "react-router-dom";

import axios from 'axios';
import moment from 'moment';
import { CustomMenu } from '../../../Componentes/CustomMenu';

export default function EditarCompanhia(props)
{
    const [companyData, setCompanyData] = useState({});
    const [redirect, setRedirect] = useState(false);

    const companyId = Number(props.match.params.cpn_cod);
    const requestData = async () => {
        try {
        const { data } = await axios({
            method: 'get',
            url: `http://209.97.146.187:18919/companies/procurar/${companyId}`,

        })
        console.log(data)
        setCompanyData(data.data)
        } catch (error) {
        console.log(error)
        }
    };

    const handleSubmit = async (e) => {
        try {
           e.preventDefault()
           const { data } = await axios({
              method: 'put',
              url: `http://209.97.146.187:18919/companies/alterar/${companyId}`,
              data: {
                 ...companyData,
                 cpn_cli_cod: Number(companyData.cpn_cli_cod)
              },
           })
  
           if (data.meta.status == 100) {
              setRedirect(true);
           }
  
        } catch (error) {
           console.log(error)
        }
     };
  
   const handleChange = (e) => {
    setCompanyData({ ...companyData, [e.target.id]: e.target.value.trim() })
    };

    useEffect(() => {
        requestData();
     }, [])
     if (redirect)
     {
        return <Redirect to="/companhia" />
     }
     else
     {
        return(
            <Container>
            <CustomMenu/>
            <Col md={{ span:6, offset:3}}>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <Form.Group controlId="cpn_cli_cod">
                                    <Form.Label>ID Eduzz:</Form.Label>
                                    <Form.Control
                                        type="number"
                                        onChange={handleChange}
                                        defaultValue={companyData?.cpn_cli_cod}
                                    />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="cpn_name">
                                    <Form.Label>Nome:</Form.Label>
                                    <Form.Control
                                        type="string"
                                        onChange={handleChange}
                                        defaultValue={companyData?.cpn_name}
                                    />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row xs={2} sm={4} md={4} lg={4}>
                        <Col><Button variant="danger" onClick={() => setRedirect(true)}>Cancelar</Button></Col>
                        <Col><Button type="submit">Editar</Button></Col>
                    </Row>
                </Form>
            </Col>
            </Container>
        )
        }
    }