import { useState } from "react"
import { MainContainer, MainRow, BackGroundForm, BtnBlue } from "../../styles/CommonStyles";
import { CustomMenu } from "../../Componentes/CustomMenu";
import { Form, Col } from "react-bootstrap";
import { HourComponent } from "../../Componentes/HourComponent";
import { Title, SubTitle } from "./styles.js"

export function Horario() {
   const [days, setDays] = useState([])
   const [populate, setPopulate] = useState([])
   const [seg, setSeg] = useState(['div1'])
   const [ter, setTer] = useState(['div1'])
   const [qua, setQua] = useState(['div1'])
   const [qui, setQui] = useState(['div1'])
   const [sex, setSex] = useState(['div1']) // depois ver uma forma de tentar deixar tudo em um só array, como leo quer de imediato, segue assim por enquanto

   function handleChange(event, index) {
      setDays({
         ...days, [index]: {
            ...days[index],
            "cal_day_of_week": index,
            [event.target.name]: event.target.value
         }
      })
      if (event.target.name === "cal_end") {
         setPopulate([
            ...populate, {
               ...days[index],
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
   function removeRow(currentArray, setArray) {
      let cDivs = [...currentArray];
      cDivs.pop()
      setArray(cDivs)
   }
   function handleSubmit(event) {
      event.preventDefault()
   }
   return (
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
                        {seg?.map((cdiv, i) => {
                           return <Col className="expense-block" key={cdiv} id={`expense-block-${i}`} data-block={i}>
                              <HourComponent
                                 dayOfWeek="SEG"
                                 initialId="cal_start"
                                 finalId="cal_end"
                                 onChange={(event) => handleChange(event, 1)}
                                 onDuplicate={() => addNewRow(seg, setSeg)}
                                 removeDuplicate={() => removeRow(seg, setSeg)}
                                 showRemoveButton={seg.length}
                              />
                           </Col>
                        })}
                        {ter?.map((cdiv, i) => {
                           return <Col className="expense-block" key={cdiv} id={`expense-block-${i}`} data-block={i}>
                              <HourComponent
                                 dayOfWeek="TER"
                                 initialId="cal_start"
                                 finalId="cal_end"
                                 onChange={(event) => handleChange(event, 2)}
                                 onDuplicate={() => addNewRow(ter, setTer)}
                                 removeDuplicate={() => removeRow(ter, setTer)}
                                 showRemoveButton={ter.length}
                              />
                           </Col>
                        })}
                        {qua?.map((cdiv, i) => {
                           return <Col className="expense-block" key={cdiv} id={`expense-block-${i}`} data-block={i}>
                              <HourComponent
                                 dayOfWeek="QUA"
                                 initialId="cal_start"
                                 finalId="cal_end"
                                 onChange={(event) => handleChange(event, 3)}
                                 onDuplicate={() => addNewRow(qua, setQua)}
                                 removeDuplicate={() => removeRow(qua, setQua)}
                                 showRemoveButton={qua.length}
                              />
                           </Col>
                        })}
                        {qui?.map((cdiv, i) => {
                           return <Col className="expense-block" key={cdiv} id={`expense-block-${i}`} data-block={i}>
                              <HourComponent
                                 dayOfWeek="QUI"
                                 initialId="cal_start"
                                 finalId="cal_end"
                                 onChange={(event) => handleChange(event, 4)}
                                 onDuplicate={() => addNewRow(qui, setQui)}
                                 removeDuplicate={() => removeRow(qui, setQui)}
                                 showRemoveButton={qui.length}
                              />
                           </Col>
                        })}
                        {sex?.map((cdiv, i) => {
                           return <Col className="expense-block" key={cdiv} id={`expense-block-${i}`} data-block={i}>
                              <HourComponent
                                 dayOfWeek="SEX"
                                 initialId="cal_start"
                                 finalId="cal_end"
                                 onChange={(event) => handleChange(event, 5)}
                                 onDuplicate={() => addNewRow(sex, setSex)}
                                 removeDuplicate={() => removeRow(sex, setSex)}
                                 showRemoveButton={sex.length}
                              />
                           </Col>
                        })}
                        <Col className="mt-4">
                           <BtnBlue variant="dark" type="submit">Salvar</BtnBlue>
                        </Col>
                     </BackGroundForm>
                  </Form>
               </Col>
            </Col>
         </MainRow>
      </MainContainer>
   )
}