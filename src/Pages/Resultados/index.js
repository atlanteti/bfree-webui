import moment from 'moment';
import { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import { CustomMenu } from "../../Componentes/CustomMenu/index";
import { MyResponsiveBar } from '../../Componentes/Graph';
import { request } from '../../Services/api';
import { CustomMenuCol } from '../../styles/CommonStyles';

export function Resultados(){
    const [headerData, setHeaderData] = useState(null);
    const [populateNumbers, setPopulateNumbers] = useState(null);
    const graph = []
    const obj = {}

    async function fetchData() {
        let data = await request({
            method: 'get',
            endpoint: 'demands/report-billing',
            params: {
                dataInicial: "2021-11-01",
                dataFinal: "2021-11-29",
             }
        }).then((data) => {
            let bodyData = data.data.splice(1)
            setHeaderData(data.data[0].splice(1))
            const numbers = bodyData.map(line => line.slice(1))
            const numbersTransposed = numbers[0].map((_, colIndex) => numbers.map(row => row[colIndex]))
            const reducedSum = numbersTransposed.map(
                line => line.reduce(
                    (partial_sum, accumulator) => Number(partial_sum) + Number(accumulator), 0))
            const lastLine = ["Total"].concat(reducedSum)
            setPopulateNumbers(reducedSum)
            bodyData = bodyData.concat([lastLine])
            data.data = bodyData.map(
                line => line.map(
                    (lineData, keyIndex) => { return [data.data[0][keyIndex], lineData] }))
            return data
        })
        return data
    }

    if(populateNumbers?.length){
        obj['month'] = moment(new Date()).format('MM/YY')
        for(let i = 0; i < headerData?.length; i ++){
            obj[headerData[i]] = populateNumbers[i]
        }
        graph.push(obj)
    }

    useEffect(() => {
        fetchData()
    }, [])
    
    return (
        <Col>
            <CustomMenuCol lg={2}><CustomMenu /></CustomMenuCol>
            <Col style={{height: 400}} md={{offset: 2, span: 9}}>
                    <MyResponsiveBar data={graph} />
            </Col>
        </Col>
   )
}