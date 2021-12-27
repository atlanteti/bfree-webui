import { useState, useEffect } from "react"
import { MainContainer, MainRow, BackGroundForm, BtnBlue } from "../../styles/CommonStyles";
import { CustomMenu } from "../../Componentes/CustomMenu";
import { Form, Col, Row } from "react-bootstrap";
import { HourComponent } from "../../Componentes/HourComponent";
import { Title, SubTitle, AlertText } from "./styles.js"
import { request } from "../../Services/api";
import { CircularProgress } from '@mui/material'
import { Redirect } from "react-router-dom";

export function Horario() {
   const [days, setDays] = useState([])
   const [populate, setPopulate] = useState([])
   const [loadingData, setLoadingData] = useState(true);
   const [redirect, setRedirect] = useState(false);
   const [seg, setSeg] = useState(['div1'])
   const [ter, setTer] = useState(['div2'])
   const [qua, setQua] = useState(['div3'])
   const [qui, setQui] = useState(['div4'])
   const [sex, setSex] = useState(['div5']) // depois ver uma forma de tentar deixar tudo em um só array, como leo quer de imediato, segue assim por enquanto

   function handleChange(event, index) {
      setPopulate({
         ...populate, [index]: {
            ...populate[index],
            "cal_day_of_week": index,
            [event.target.name]: event.target.value
         }
      })
      if (event.target.name === "cal_end") {
         setDays([
            ...days, {
               ...populate[index],
               "cal_day_of_week": index,
               [event.target.name]: event.target.value
            }
         ])
      }
   }
   function addNewRow(currentArray, setArray) {
      let cDivs = [...currentArray];
      cDivs.push('newDiv')
      setArray(cDivs)
   }
   function removeRow(currentArray, setArray, currentItem) {
      let cDivs = [...currentArray];
      var filtered = days.filter(function (value) {
         return value.cal_cod !== currentItem.cal_cod;
      });
      setDays(filtered)
      var filteredCurrentArray = cDivs.filter(function (value) {
         return value.cal_cod !== currentItem.cal_cod;
      });
      if (filteredCurrentArray.length === 0) {
         cDivs.pop()
         setArray(cDivs)
      } else {
         setArray(filteredCurrentArray)
      }
   }
   async function handleSubmit(event) {
      event.preventDefault()
      const data = await request({
         method: "post",
         endpoint: "calendar/save",
         data: {
            availableDates: days
         },
      })
      if (data.meta.status === 100) {
         setRedirect(true)
      }
   }
   async function getData() {
      await request({
         method: "get",
         endpoint: "calendar/list-by-user",
      }).then((data) => {
         setLoadingData(true)
         setDays(data.data)
         const populateBody = data.data
         // ver um jeito de reduzir a quantidade de codigos repetido
         populateBody?.map((result) => {
            if (result['cal_day_of_week'] === 1) {
               const populateSeg = seg
               if (seg[0] === "div1") {
                  seg.shift()
               }
               populateSeg.push(result)
               setSeg(populateSeg)
            } else if (result['cal_day_of_week'] === 2) {
               const populateTer = ter
               if (ter[0] === "div2") {
                  ter.shift()
               }
               populateTer.push(result)
               setTer(populateTer)
            } else if (result['cal_day_of_week'] === 3) {
               const populateQua = qua
               if (qua[0] === "div3") {
                  qua.shift()
               }
               populateQua.push(result)
               setQua(populateQua)
            } else if (result['cal_day_of_week'] === 4) {
               const populateQui = qui
               if (qui[0] === "div4") {
                  qui.shift()
               }
               populateQui.push(result)
               setQui(populateQui)
            } else if (result['cal_day_of_week'] === 5) {
               const populateSex = sex
               if (sex[0] === "div5") {
                  sex.shift()
               }
               populateSex.push(result)
               setTer(populateSex)
            }
         })
         setLoadingData(false)
      })
   }

   useEffect(() => {
      getData()
   }, [])

   if (redirect) {
      return <Redirect to="/demandas" />
   }
   return (
      // lembrar de criar uma mensagem de aviso para quando dê certo o envio
      <MainContainer>
         <MainRow>
            <CustomMenu />
            <Col>
               <Col
                  sm={{ offset: 1, span: 10 }}
                  md={{ offset: 1, span: 10 }}
                  lg={{ offset: 2, span: 10 }}
                  style={{ paddingTop: 20, textAlign: 'center' }}
               >
                  <Form onSubmit={handleSubmit}>
                     <BackGroundForm xs={1} className={'mb-2'} noGutters>
                        <Title>Vamos configurar sua agenda?</Title>
                        <SubTitle>Defina os dias da semana e horários que você pode atender</SubTitle>
                        <AlertText>Não adicione intervalos que entrem em conflito, ex: 10:00 -- 12:00 E 09:00 -- 11:00 do mesmo dia</AlertText>
                        {loadingData ?
                           <Row>
                              <Col><CircularProgress /></Col>
                           </Row> :
                           <>
                              {seg?.map((currentDiv, index) => {
                                 return <Col className="expense-block" key={currentDiv} id={`expense-block-${index}`} data-block={index}>
                                    <HourComponent
                                       dayOfWeek="SEG"
                                       data={seg}
                                       onChange={(event) => handleChange(event, 1)}
                                       onDuplicate={() => addNewRow(seg, setSeg)}
                                       removeDuplicate={() => removeRow(seg, setSeg, currentDiv)}
                                       startHour={seg[index].cal_start}
                                       endHour={seg[index].cal_end}
                                       showRemoveButton={seg.length}
                                    />
                                 </Col>
                              })}
                              {ter?.map((currentDiv, index) => {
                                 return <Col className="expense-block" key={currentDiv} id={`expense-block-${index}`} data-block={index}>
                                    <HourComponent
                                       dayOfWeek="TER"
                                       data={ter}
                                       onChange={(event) => handleChange(event, 2)}
                                       onDuplicate={() => addNewRow(ter, setTer)}
                                       removeDuplicate={() => removeRow(ter, setTer, currentDiv)}
                                       startHour={ter[index].cal_start}
                                       endHour={ter[index].cal_end}
                                       showRemoveButton={ter.length}
                                    />
                                 </Col>
                              })}
                              {qua?.map((currentDiv, index) => {
                                 return <Col className="expense-block" key={currentDiv} id={`expense-block-${index}`} data-block={index}>
                                    <HourComponent
                                       dayOfWeek="QUA"
                                       data={qua}
                                       onChange={(event) => handleChange(event, 3)}
                                       onDuplicate={() => addNewRow(qua, setQua)}
                                       removeDuplicate={() => removeRow(qua, setQua, currentDiv)}
                                       startHour={qua[index].cal_start}
                                       endHour={qua[index].cal_end}
                                       showRemoveButton={qua.length}
                                    />
                                 </Col>
                              })}
                              {qui?.map((currentDiv, index) => {
                                 return <Col className="expense-block" key={currentDiv} id={`expense-block-${index}`} data-block={index}>
                                    <HourComponent
                                       dayOfWeek="QUI"
                                       data={qui}
                                       onChange={(event) => handleChange(event, 4)}
                                       onDuplicate={() => addNewRow(qui, setQui)}
                                       removeDuplicate={() => removeRow(qui, setQui, currentDiv)}
                                       startHour={qui[index].cal_start}
                                       endHour={qui[index].cal_end}
                                       showRemoveButton={qui.length}
                                    />
                                 </Col>
                              })}
                              {sex?.map((currentDiv, index) => {
                                 return <Col className="expense-block" key={currentDiv} id={`expense-block-${index}`} data-block={index}>
                                    <HourComponent
                                       dayOfWeek="SEX"
                                       data={sex}
                                       onChange={(event) => handleChange(event, 5)}
                                       onDuplicate={() => addNewRow(sex, setSex)}
                                       removeDuplicate={() => removeRow(sex, setSex, currentDiv)}
                                       startHour={sex[index].cal_start}
                                       endHour={sex[index].cal_end}
                                       showRemoveButton={sex.length}
                                    />
                                 </Col>
                              })}
                              <Col className="mt-4">
                                 <BtnBlue variant="dark" type="submit">Salvar</BtnBlue>
                              </Col>
                           </>}
                     </BackGroundForm>
                  </Form>
               </Col>
            </Col>
         </MainRow>
      </MainContainer>
   )
}