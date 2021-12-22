import { useState } from "react"
import { MainContainer, MainRow, BackGroundForm, BtnBlue } from "../../styles/CommonStyles";
import { CustomMenu } from "../../Componentes/CustomMenu";
import { Form, Col } from "react-bootstrap";
import { HourComponent } from "../../Componentes/HourComponent";
import { Title, SubTitle } from "./styles.js"

export function Horario() {
   const [days, setDays] = useState([])
   function handleChange(event, index) {
      setDays({
         ...days, [index]: {
            ...days[index],
            [event.target.name]: event.target.value
         }
      })
   }

   function handleSubmit(event) {
      event.preventDefault()
      console.log(days)
   }
   return (
      <MainContainer>
         <MainRow>
            <CustomMenu />
            <Col>
               <Col
                  sm={{ offset: 1, span: 10 }}// Temporary until styled components
                  md={{ offset: 1, span: 10 }}
                  lg={{ offset: 2, span: 10 }}
                  style={{ paddingTop: 20, textAlign: 'center' }}
               >
                  <Form onSubmit={handleSubmit}>
                     <BackGroundForm xs={1} className={'mb-2'} noGutters>
                        <Title>Vamos configurar sua agenda?</Title>
                        <SubTitle>Defina os dias da semana e horários que você pode atender</SubTitle>
                        <HourComponent
                           dayOfWeek="SEG"
                           initialId="col_init_hour"
                           finalId="col_end_hour"
                           onChange={(event) => handleChange(event, 1)}
                        />
                        <HourComponent
                           dayOfWeek="TER"
                           initialId="col_init_hour"
                           finalId="col_end_hour"
                           onChange={(event) => handleChange(event, 2)}
                        />
                        <HourComponent
                           dayOfWeek="QUA"
                           initialId="col_init_hour"
                           finalId="col_end_hour"
                           onChange={(event) => handleChange(event, 3)}
                        />
                        <HourComponent
                           dayOfWeek="QUI"
                           initialId="col_init_hour"
                           finalId="col_end_hour"
                           onChange={(event) => handleChange(event, 4)}
                        />
                        <HourComponent
                           dayOfWeek="SEX"
                           initialId="col_init_hour"
                           finalId="col_end_hour"
                           onChange={(event) => handleChange(event, 5)}
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