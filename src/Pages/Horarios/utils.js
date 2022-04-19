import { useState } from "react";
import moment from "moment";
import { DivSpaceBtween, SubTitle, Title } from "../../styles/CommonStyles";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
export const UtilsFunctions = () => {
   const [days, setDays] = useState([])
   const [populate, setPopulate] = useState([])
   const [loadingData, setLoadingData] = useState(true)
   const [seg, setSeg] = useState(['div1'])
   const [ter, setTer] = useState(['div2'])
   const [qua, setQua] = useState(['div3'])
   const [qui, setQui] = useState(['div4'])
   const [sex, setSex] = useState(['div5'])

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
   function renderData(data) {
      setLoadingData(true)
      const populateBody = data
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
   }
   function loading() {
      setTimeout(() => {
         setLoadingData(false)
      }, 50);
   }
   function returnDay(date) {
      // Procurar uma forma de solucionar esse caso de renderização de estado
      setLoadingData(true)
      let dia = moment(date).format("dddd")
      loading()
      if (dia === "Monday") {
         return ({ dayMonth: moment(date).format("DD"), indexDay: 1, nameDay: "Segunda", array: seg, setArray: setSeg })
      } else if (dia === "Tuesday") {
         return ({ dayMonth: moment(date).format("DD"), indexDay: 2, nameDay: "Terça", array: ter, setArray: setTer })
      } else if (dia === "Wednesday") {
         return ({ dayMonth: moment(date).format("DD"), indexDay: 3, nameDay: "Quarta", array: qua, setArray: setQua })
      } else if (dia === "Thursday") {
         return ({ dayMonth: moment(date).format("DD"), indexDay: 4, nameDay: "Quinta", array: qui, setArray: setQui })
      } else {
         return ({ dayMonth: moment(date).format("DD"), indexDay: 5, nameDay: "Sexta", array: sex, setArray: setSex })
      }
   }
   return {
      handleChange,
      days,
      setDays,
      addNewRow,
      removeRow,
      renderData,
      loadingData,
      setLoadingData,
      returnDay,
      seg, setSeg,
      ter, setTer,
      qua, setQua,
      qui, setQui,
      sex, setSex,
   }
}

export const TopTitles = (props) => {
   return <>
      <SubTitle style={{ paddingBottom: 10 }}>Demandas/<strong>Consultor</strong></SubTitle>
      <Title style={{ paddingBottom: 10 }}>Agenda</Title>
      <SubTitle>Defina os dias da semana e horários que você pode atender.</SubTitle>
      <DivSpaceBtween display justifyContent>
         <SubTitle style={{ maxWidth: "70%" }}>
            Não adicione intervalos que entrem em conflito, ex: 10:00 -- 12:00 E 09:00 -- 11:00 do mesmo dia
         </SubTitle>
         <Link to={props.route}>
            <Button variant="dark">Ver {props.text}</Button>
         </Link>
      </DivSpaceBtween>
   </>
}