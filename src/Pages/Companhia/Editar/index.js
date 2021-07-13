import React, { useEffect, useState } from 'react';

import { Form, Col, Row, Button, Alert, Container } from 'react-bootstrap';
import { Redirect } from "react-router-dom";

import axios from 'axios';
import moment from 'moment';
import { CustomMenu } from '../../../Componentes/CustomMenu';
import { request } from '../../../Services/api';

export default function EditarCompanhia(props)
{
    const [companyData, setCompanyData] = useState({});
    const [redirect, setRedirect] = useState(false);

    const companyId = Number(props.match.params.cpn_cod);
    const requestCompanyData = async () => {
        const data = await seekCompanyData()
        setCompanyData(data.data)
    };
    const seekCompanyData = async () => {
            const data = await request({
                method:"get",
                endpoint:`companies/procurar/${companyId}`
            })
            return data
    }
    const editCompanyRequest = async (e,CompanyDataForm) => {
            e.preventDefault()
            const data = await request({
                method:"put",
                endpoint:`companies/alterar/${companyId}`,
                data:CompanyDataForm
            })
            return data
    }
    const handleSubmit = async (e) => {
        console.log("a")
        const companyDataForm =
        {
            ...companyData,
            cpn_cli_cod: Number(companyData.cpn_cli_cod),
            cpn_name: companyData.cpn_name
        }
        const data = await editCompanyRequest(e,companyDataForm)
        if (data.meta.status == 100) { //TODO: Define status handling and export as component
            setRedirect(true);
           }
     };
  
   const handleChange = (e) => {
    setCompanyData({ ...companyData, [e.target.id]: e.target.value.trim() })
    };

    useEffect(() => {
        requestCompanyData();
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