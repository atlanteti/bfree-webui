import { useState } from "react";
import moment from "moment";
import { DivSpaceBtween, SubTitle, Title, RightDivSchedule } from "../../styles/CommonStyles";
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
   const [sab, setSab] = useState(['div6'])
   function editNewDay(event, currentItem) {
      if (JSON.stringify(days[days.length - 1]) === JSON.stringify(currentItem)) {
         return days[days.length - 1][event.target.name] = event.target.value
      } else {
         days.map((item, index) => {
            if (JSON.stringify(item) === JSON.stringify(currentItem)) {
               return days[index][event.target.name] = event.target.value
            }
         })
      }
   }
   function editExistingDay(event, index, currentItem) {
      var filtered = days.filter(function (value) {
         return value.cam_cod !== currentItem.cam_cod;
      });
      if (event.target.name === "cam_end") {
         currentItem.cam_end = event.target.value
         // é chamado quando esta sendo editado algum horario ja existente
         return setDays([
            ...filtered, {
               ...populate[index],
               "cam_day_of_week": index,
               [event.target.name]: event.target.value,
               "cam_cod": currentItem.cam_cod,
               "cam_start": currentItem.cam_start
            }
         ])
      } else {
         currentItem.cam_start = event.target.value
         return setDays([
            ...filtered, {
               ...populate[index],
               "cam_day_of_week": index,
               "cam_start": currentItem.cam_start,
               "cam_cod": currentItem.cam_cod,
               "cam_end": currentItem.cam_end
            }
         ])
      }
   }
   function createInSameDay(event, index) {
      if (populate[index].cam_day_of_week === days[days.length - 1].cam_day_of_week) {
         if (populate[index].cam_end === days[days.length - 1].cam_end) {
            if (populate[index].cam_start !== days[days.length - 1].cam_start) {
               return setDays([
                  ...days, {
                     ...populate[index],
                     "cam_day_of_week": index,
                     [event.target.name]: event.target.value
                  }
               ])
            }
            return days[days.length - 1].cam_end = event.target.value
         }
      }
      return days[days.length - 1].cam_end = event.target.value
   }
   function createDay(event, index) {
      setDays([
         ...days, {
            "cam_day_of_week": index,
            [event.target.name]: event.target.value
         }
      ])
   }
   function handleChange(event, index, currentItem) {
      let verifyEmptyField = Object.keys(currentItem).includes('cam_start') || Object.keys(currentItem).includes('cam_end')
      setPopulate({
         ...populate, [index]: {
            ...populate[index],
            "cam_day_of_week": index,
            [event.target.name]: event.target.value
         }
      })
      if (currentItem.cam_start === null && currentItem.cam_end !== null) {
         if (event.target.name === "cam_start") {
            return days[days.length - 1].cam_start = event.target.value
         }
      }
      if (currentItem.length === undefined && currentItem.cam_cod === undefined) {
         if (currentItem.cam_start !== null && currentItem.cam_end !== null) {
            return editNewDay(event, currentItem, index)
         } else if (currentItem.cam_start === null && currentItem.cam_end === null) {
            currentItem[event.target.name] = event.target.value
            return createDay(event, index)
         }
      }
      if (!verifyEmptyField && populate[index] !== undefined) {
         let sameDay = days.filter(function (value) {
            return value.cam_day_of_week === index;
         })
         if (event.target.name === "cam_start") {
            if (days[days.length - 1].cam_start === null && days[days.length - 1].cam_end !== undefined) {
               return days[days.length - 1].cam_start = event.target.value
            } else if (!(Object.keys(days[days.length - 1]).includes('cam_cod')) && days[days.length - 1].cam_day_of_week === index) { // altera o primeiro valor do novo horario sem criar um novo dia
               return days[days.length - sameDay.length].cam_start = event.target.value
            }
         } else {
            return days[days.length - sameDay.length].cam_end = event.target.value
         }
      } else if (!verifyEmptyField) {
         return createDay(event, index)
      }
      if (verifyEmptyField) {
         currentItem[event.target.name] = event.target.value
      }
      if (event.target.name === "cam_end" && currentItem.cam_cod === undefined) {
         if (days[days.length - 1] !== undefined) {
            return createInSameDay(event, index)
         }
      }
      if (currentItem.cam_cod) {
         return editExistingDay(event, index, currentItem)
      }
   }
   function addNewRow(currentArray, setArray, index) {
      let cDivs = [...currentArray];
      cDivs.push({ "cam_day_of_week": index, "cam_start": null, "cam_end": null })
      setArray(cDivs)
   }
   function removeRow(currentArray, currentItem, setArray) {
      let cDivs = [...currentArray];
      // os filtros são usados para remover o item exato que esta sendo excluido
      var filtered = days.filter(function (value) {
         return value.cam_cod !== currentItem.cam_cod;
      });
      setDays(filtered)
      var filteredCurrentArray = cDivs.filter(function (value) {
         return value.cam_cod !== currentItem.cam_cod;
      });
      if (filteredCurrentArray.length === 0 || currentItem.cam_cod === undefined) {
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
   function renderData(data, type) {
      setLoadingData(true)
      const populateBody = data
      // verificação para preencher quando já tem horarios selecionado
      populateBody?.map((result) => {
         let populateDay = []
         if (result[`${type}_day_of_week`] === 1) {
            populateDay = seg
            // quando tem horario selecionado, remove o primeiro item, que é o sem valor
            if (seg[0] === "div1") {
               seg.shift()
            }
            populateDay.push(result)
            setSeg(populateDay)
         } else if (result[`${type}_day_of_week`] === 2) {
            populateDay = ter
            if (ter[0] === "div2") {
               ter.shift()
            }
            populateDay.push(result)
            setTer(populateDay)
         } else if (result[`${type}_day_of_week`] === 3) {
            populateDay = qua
            if (qua[0] === "div3") {
               qua.shift()
            }
            populateDay.push(result)
            setQua(populateDay)
         } else if (result[`${type}_day_of_week`] === 4) {
            populateDay = qui
            if (qui[0] === "div4") {
               qui.shift()
            }
            populateDay.push(result)
            setQui(populateDay)
         } else if (result[`${type}_day_of_week`] === 5) {
            populateDay = sex
            if (sex[0] === "div5") {
               sex.shift()
            }
            populateDay.push(result)
            setSex(populateDay)
         } else if (result[`${type}_day_of_week`] === 6) {
            populateDay = sab
            if (sab[0] === "div6") {
               sab.shift()
            }
            populateDay.push(result)
            setSab(populateDay)
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
         return ({ dayMonth: moment(date).format("DD"), indexDay: 1, nameDay: "Segunda" })
      } else if (dia === "Tuesday") {
         return ({ dayMonth: moment(date).format("DD"), indexDay: 2, nameDay: "Terça" })
      } else if (dia === "Wednesday") {
         return ({ dayMonth: moment(date).format("DD"), indexDay: 3, nameDay: "Quarta" })
      } else if (dia === "Thursday") {
         return ({ dayMonth: moment(date).format("DD"), indexDay: 4, nameDay: "Quinta" })
      } else if (dia === "Friday") {
         return ({ dayMonth: moment(date).format("DD"), indexDay: 5, nameDay: "Sexta" })
      } else {
         return ({ dayMonth: moment(date).format("DD"), indexDay: 6, nameDay: "Sábado" })
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
      sab, setSab
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
         <RightDivSchedule>
            <Link to={props.route}>
               <Button variant="dark">Ver {props.text}</Button>
            </Link>
         </RightDivSchedule>
      </DivSpaceBtween>
   </>
}