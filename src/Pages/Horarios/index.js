import { useState, useEffect } from "react"
import { MainContainer, MainRow, BackGroundForm, BtnBlue, Title, SubTitle } from "../../styles/CommonStyles";
import { CustomMenu } from "../../Componentes/CustomMenu";
import { Form, Col, Row, Alert } from "react-bootstrap";
import { HourComponent } from "../../Componentes/HourComponent";
import { request } from "../../Services/api";
import { CircularProgress } from '@mui/material'
import { Helmet } from "react-helmet";

export function Horario() {
   const [days, setDays] = useState([])
   const [populate, setPopulate] = useState([])
   const [message, setMessage] = useState(null)
   const [status, setStatus] = useState("warning")
   const [showAlert, setShowAlert] = useState(false)
   const [loadingData, setLoadingData] = useState(true)
   const [seg, setSeg] = useState(['div1'])
   const [ter, setTer] = useState(['div2'])
   const [qua, setQua] = useState(['div3'])
   const [qui, setQui] = useState(['div4'])
   const [sex, setSex] = useState(['div5']) // depois ver uma forma de tentar deixar tudo em um só array, como leo quer de imediato, segue assim por enquanto

   function handleChange(event, index, currentItem) {
      setPopulate({
         ...populate, [index]: {
            ...populate[index],
            "cal_day_of_week": index,
            [event.target.name]: event.target.value
         }
      })
      if (currentItem.cal_start === null && currentItem.cal_end !== null) {
         if (event.target.name === "cal_start") {
            return setDays([
               ...days, {
                  ...populate[index],
                  "cal_day_of_week": index,
                  [event.target.name]: event.target.value,
                  "cal_end": currentItem.cal_end
               }
            ])
         }
      }
      if (event.target.name === "cal_end" && currentItem.cal_cod === undefined) {
         // tratamento para a criação de novos horarios para o mesmo dia
         if (days[days.length - 1] !== undefined) {
            if (populate[index].cal_day_of_week === days[days.length - 1].cal_day_of_week) {
               if (populate[index].cal_end === days[days.length - 1].cal_end) {
                  if (populate[index].cal_start !== days[days.length - 1].cal_start) {
                     return setDays([
                        ...days, {
                           ...populate[index],
                           "cal_day_of_week": index,
                           [event.target.name]: event.target.value
                        }
                     ])
                  }
                  return days[days.length - 1].cal_end = event.target.value
               }
            }
         }
         setDays([
            ...days, {
               ...populate[index],
               "cal_day_of_week": index,
               [event.target.name]: event.target.value
            }
         ])
      }
      if (currentItem.cal_cod) {
         var filtered = days.filter(function (value) {
            return value.cal_cod !== currentItem.cal_cod;
         });
         if (event.target.name === "cal_end") {
            currentItem.cal_end = event.target.value
            // é chamado quando esta sendo editado algum horario ja existente
            return setDays([
               ...filtered, {
                  ...populate[index],
                  "cal_day_of_week": index,
                  [event.target.name]: event.target.value,
                  "cal_cod": currentItem.cal_cod,
                  "cal_start": currentItem.cal_start
               }
            ])
         } else {
            currentItem.cal_start = event.target.value
            return setDays([
               ...filtered, {
                  ...populate[index],
                  "cal_day_of_week": index,
                  "cal_start": currentItem.cal_start,
                  "cal_cod": currentItem.cal_cod,
                  "cal_end": currentItem.cal_end
               }
            ])
         }
      }
   }
   function addNewRow(currentArray, setArray) {
      let cDivs = [...currentArray];
      cDivs.push({ "cal_start": null, "cal_end": null })
      setArray(cDivs)
   }
   function removeRow(currentArray, currentItem, setArray) {
      let cDivs = [...currentArray];
      // os filtros são usados para remover o item exato que esta sendo excluido
      var filtered = days.filter(function (value) {
         return value.cal_cod !== currentItem.cal_cod;
      });
      setDays(filtered)
      var filteredCurrentArray = cDivs.filter(function (value) {
         return value.cal_cod !== currentItem.cal_cod;
      });
      if (filteredCurrentArray.length === 0 || currentItem.cal_cod === undefined) {
         cDivs.pop()
         setArray(cDivs)
      } else {
         setArray(filteredCurrentArray)
         setLoadingData(true)
      }
      // por algum motivo não ta atualizando o estado 
      setTimeout(() => {
         setLoadingData(false)
      }, 50);
   }
   async function handleSubmit(event) {
      event.preventDefault()
      var filteredDays = days.filter(function (value) {
         return value.cal_start !== undefined;
      });
      const data = await request({
         method: "post",
         endpoint: "calendar/save",
         data: {
            availableDates: filteredDays
         },
      })
      if (data.meta.status === 100) {
         setMessage(data.meta.message)
         setStatus('success')
      } else {
         setMessage(data.meta.message)
      }
      setShowAlert(true)
   }
   async function getData() {
      await request({
         method: "get",
         endpoint: "calendar/list-by-user",
      }).then((data) => {
         setLoadingData(true)
         setDays(data.data)
         const populateBody = data.data
         // verificação para preencher quando já tem horarios selecionado
         populateBody?.map((result) => {
            let populateDay = []
            if (result['cal_day_of_week'] === 1) {
               populateDay = seg
               // quando tem horario selecionado, remove o primeiro item, que é o sem valor
               if (seg[0] === "div1") {
                  seg.shift()
               }
               populateDay.push(result)
               setSeg(populateDay)
            } else if (result['cal_day_of_week'] === 2) {
               populateDay = ter
               if (ter[0] === "div2") {
                  ter.shift()
               }
               populateDay.push(result)
               setTer(populateDay)
            } else if (result['cal_day_of_week'] === 3) {
               populateDay = qua
               if (qua[0] === "div3") {
                  qua.shift()
               }
               populateDay.push(result)
               setQua(populateDay)
            } else if (result['cal_day_of_week'] === 4) {
               populateDay = qui
               if (qui[0] === "div4") {
                  qui.shift()
               }
               populateDay.push(result)
               setQui(populateDay)
            } else if (result['cal_day_of_week'] === 5) {
               populateDay = sex
               if (sex[0] === "div5") {
                  sex.shift()
               }
               populateDay.push(result)
               setSex(populateDay)
            }
         })
         setLoadingData(false)
      })
   }

   useEffect(() => {
      getData()
   }, [])

   return (
      <MainContainer>
         <Helmet title="Cadastro de Horário" />
         <MainRow>
            <CustomMenu />
            <Col>
               <Col
                  sm={{ offset: 1, span: 10 }}
                  md={{ offset: 1, span: 10 }}
                  lg={{ offset: 2, span: 10 }}
                  style={{ paddingTop: 20 }}
               >
                  {showAlert &&
                     <Alert variant={status} onClose={() => setShowAlert(false)} dismissible>
                        {message}
                     </Alert>
                  }
                  <Title style={{ paddingBottom: 10 }}>Agenda</Title>
                  <SubTitle>Defina os dias da semana e horários que você pode atender.</SubTitle>
                  <SubTitle style={{ paddingBottom: 10 }}>Não adicione intervalos que entrem em conflito, ex: 10:00 -- 12:00 E 09:00 -- 11:00 do mesmo dia</SubTitle>
                  <Form onSubmit={handleSubmit}>
                     <BackGroundForm xs={1} className={'mb-2'} noGutters style={{ padding: 16 }}>
                        {loadingData ?
                           <Row>
                              <Col><CircularProgress /></Col>
                           </Row> :
                           <>
                              <HourComponent
                                 dayOfWeek="Segunda"
                                 indexWeek={1}
                                 data={seg}
                                 onChange={handleChange}
                                 onDuplicate={() => addNewRow(seg, setSeg)}
                                 removeDuplicate={removeRow}
                                 changeState={setSeg}
                              />
                              <HourComponent
                                 dayOfWeek="Terça"
                                 indexWeek={2}
                                 data={ter}
                                 onChange={handleChange}
                                 onDuplicate={() => addNewRow(ter, setTer)}
                                 removeDuplicate={removeRow}
                                 changeState={setTer}
                                 bgColor={"#F8FAFF"}
                              />
                              <HourComponent
                                 dayOfWeek="Quarta"
                                 data={qua}
                                 indexWeek={3}
                                 onChange={handleChange}
                                 onDuplicate={() => addNewRow(qua, setQua)}
                                 removeDuplicate={removeRow}
                                 changeState={setQua}
                              />
                              <HourComponent
                                 dayOfWeek="Quinta"
                                 indexWeek={4}
                                 data={qui}
                                 onChange={handleChange}
                                 onDuplicate={() => addNewRow(qui, setQui)}
                                 removeDuplicate={removeRow}
                                 changeState={setQui}
                                 bgColor={"#F8FAFF"}
                              />
                              <HourComponent
                                 dayOfWeek="Sexta"
                                 indexWeek={5}
                                 data={sex}
                                 onChange={handleChange}
                                 onDuplicate={() => addNewRow(sex, setSex)}
                                 removeDuplicate={removeRow}
                                 changeState={setSex}
                              />
                              <Col className="mt-4" md={{ offset: 4 }}>
                                 <BtnBlue variant="dark" type="submit" onClick={() => window.scrollTo(0, 0)}>Salvar</BtnBlue>
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