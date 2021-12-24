import { useState, useEffect } from "react"
import { MainContainer, MainRow, BackGroundForm, BtnBlue } from "../../styles/CommonStyles";
import { CustomMenu } from "../../Componentes/CustomMenu";
import { Form, Col } from "react-bootstrap";
import { HourComponent } from "../../Componentes/HourComponent";
import { Title, SubTitle, AlertText } from "./styles.js"
import { request } from "../../Services/api";

export function Horario() {
   const [days, setDays] = useState([])
   const [daysUser, setDaysUser] = useState(null)
   const [populate, setPopulate] = useState([])
   const [seg, setSeg] = useState(['div1'])
   const [ter, setTer] = useState(['div1'])
   const [qua, setQua] = useState(['div1'])
   const [qui, setQui] = useState(['div1'])
   const [sex, setSex] = useState(['div1']) // depois ver uma forma de tentar deixar tudo em um só array, como leo quer de imediato, segue assim por enquanto

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
   function removeRow(currentArray, setArray) {
      let cDivs = [...currentArray];
      cDivs.pop()
      setArray(cDivs)
   }
   async function handleSubmit(event) {
      event.preventDefault()

      // await request({
      //    method: "post",
      //    endpoint: "calendar/save",
      //    data: {
      //       availableDates: days
      //    },
      // })
   }
   async function getData() {
      // rever o caso de pq so ta sendo enviado 1 objeto
      await request({
         method: "get",
         endpoint: "calendar/list-by-user",
      }).then((data) => {
         let populateScreen = data.data
         populateScreen.map((result) => {
            if (result['cal_day_of_week'] === 1) {
               const value = seg
               value.push(result)
               return setSeg(value)
            } else if (result['cal_day_of_week'] === 4) {
               const valueQui = qui
               valueQui.push(result)
               setQui(valueQui)
            }
            setDaysUser(data.data)
         })
      })
   }
   useEffect(() => {
      getData()
   }, [])
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
                        <HourComponent
                           dayOfWeek="SEG"
                           data={seg}
                           onChange={(event) => handleChange(event, 1)}
                           onDuplicate={() => addNewRow(seg, setSeg)}
                           removeDuplicate={() => removeRow(seg, setSeg)}
                           showRemoveButton={seg.length}
                        />
                        <HourComponent
                           dayOfWeek="TER"
                           data={ter}
                           onChange={(event) => handleChange(event, 2)}
                           onDuplicate={() => addNewRow(ter, setTer)}
                           removeDuplicate={() => removeRow(ter, setTer)}
                           showRemoveButton={ter.length}
                        />
                        <HourComponent
                           dayOfWeek="QUA"
                           data={qua}
                           onChange={(event) => handleChange(event, 2)}
                           onDuplicate={() => addNewRow(qua, setQua)}
                           removeDuplicate={() => removeRow(ter, setQua)}
                           showRemoveButton={qua.length}
                        />
                        <HourComponent
                           dayOfWeek="QUI"
                           data={qui}
                           onChange={(event) => handleChange(event, 4)}
                           onDuplicate={() => addNewRow(qui, setQui)}
                           removeDuplicate={() => removeRow(qui, setQui)}
                           showRemoveButton={qui.length}
                        />
                        <HourComponent
                           dayOfWeek="SEX"
                           data={sex}
                           onChange={(event) => handleChange(event, 5)}
                           onDuplicate={() => addNewRow(sex, setSex)}
                           removeDuplicate={() => removeRow(sex, setSex)}
                           showRemoveButton={sex.length}
                        />
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