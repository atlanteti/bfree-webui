import { useState } from "react";
import moment from "moment";

export const UtilsHourCalendar = () => {
   const [loadingData, setLoadingData] = useState(true)
   const [days, setDays] = useState([])
   const [populate, setPopulate] = useState([])

   function handleChange(event, currentItem, dayMonth, date) {
      const formatDate = moment(date).format('yyyy-MM-DD')
      setPopulate({
         ...populate, [dayMonth]: {
            ...populate[dayMonth],
            "cal_date": formatDate,
            [event.target.name]: event.target.value
         }
      })
      if (currentItem.cal_start === null && currentItem.cal_end !== null) {
         if (event.target.name === "cal_start") {
            return setDays([
               ...days, {
                  ...populate[dayMonth],
                  "cal_date": formatDate,
                  [event.target.name]: event.target.value,
                  "cal_end": currentItem.cal_end
               }
            ])
         }
      }
      if (event.target.name === "cal_end" && currentItem.cal_cod === undefined) {
         // tratamento para a criação de novos horarios para o mesmo dia
         if (days[days.length - 1] !== undefined) {
            if (populate[dayMonth].cal_date === days[days.length - 1].cal_date) {
               if (populate[dayMonth].cal_end === days[days.length - 1].cal_end) {
                  if (populate[dayMonth].cal_start !== days[days.length - 1].cal_start) {
                     return setDays([
                        ...days, {
                           ...populate[dayMonth],
                           "cal_date": formatDate,
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
               ...populate[dayMonth],
               "cal_date": formatDate,
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
                  ...populate[dayMonth],
                  "cal_date": formatDate,
                  [event.target.name]: event.target.value,
                  "cal_cod": currentItem.cal_cod,
                  "cal_start": currentItem.cal_start
               }
            ])
         } else {
            currentItem.cal_start = event.target.value
            return setDays([
               ...filtered, {
                  ...populate[dayMonth],
                  "cal_date": formatDate,
                  "cal_start": currentItem.cal_start,
                  "cal_cod": currentItem.cal_cod,
                  "cal_end": currentItem.cal_end
               }
            ])
         }
      }
   }
   function addNewRowCalendar(currentArray, setArray, object) {
      let cDivs = [...currentArray];
      cDivs.push({ "cal_start": null, "cal_end": null })
      loading()
      setArray({ ...object, array: cDivs })
   }
   // TODO: Criar novo getData de acordo com o novo padrão
   function removeRowCalendar(currentArray, currentItem, setArray, object) {
      //TODO: Com a implementação da tela calendários, agora iremos filtrar por dia para que exclua o horario em que esta sendo selecionado
      // Passar o dia no filtro quando for feito a chamada da função
      let cDivs = [...currentArray];
      // os filtros são usados para remover o item exato que esta sendo excluido
      var filteredCurrentArray = cDivs.filter(function (value) {
         return value.cal_cod !== currentItem.cal_cod;
      });
      if (filteredCurrentArray.length === 0 || currentItem.cal_cod === undefined) {
         cDivs.pop()
         setLoadingData(true)
         return setArray({ ...object, array: cDivs })
      } else {
         setArray({ ...object, array: cDivs })
      }
      // por algum motivo não ta atualizando o estado 
      setTimeout(() => {
         setLoadingData(false)
      }, 50);
   }
   function loading() {
      setTimeout(() => {
         setLoadingData(false)
      }, 50);
   }
   // function returnDay(date) {
   //    // Procurar uma forma de solucionar esse caso de renderização de estado
   //    setLoadingData(true)
   //    let dia = moment(date).format("dddd")
   //    loading()
   //    if (dia === "Monday") {
   //       // setChangeDataDay({ indexDay: 1, nameDay: "Segunda", array: seg, setArray: setSeg })
   //       return ({ dayMonth: moment(date).format("DD"), indexDay: 1, nameDay: "Segunda", array: seg, setArray: setSeg })
   //    } else if (dia === "Tuesday") {
   //       // setChangeDataDay({ indexDay: 2, nameDay: "Terça", array: ter, setArray: setTer })
   //       return ({ dayMonth: moment(date).format("DD"), indexDay: 2, nameDay: "Terça", array: ter, setArray: setTer })
   //    } else if (dia === "Wednesday") {
   //       // setChangeDataDay({ indexDay: 3, nameDay: "Quarta", array: qua, setArray: setQua })
   //       return ({ dayMonth: moment(date).format("DD"), indexDay: 3, nameDay: "Quarta", array: qua, setArray: setQua })
   //    } else if (dia === "Thursday") {
   //       // setChangeDataDay({ indexDay: 4, nameDay: "Quinta", array: qui, setArray: setQui })
   //       return ({ dayMonth: moment(date).format("DD"), indexDay: 4, nameDay: "Quinta", array: qui, setArray: setQui })
   //    } else {
   //       // setChangeDataDay({ indexDay: 5, nameDay: "Sexta", array: sex, setArray: setSex })
   //       return ({ dayMonth: moment(date).format("DD"), indexDay: 5, nameDay: "Sexta", array: sex, setArray: setSex })
   //    }
   // }
   return {
      addNewRowCalendar,
      removeRowCalendar,
      handleChange,
      days,
      setDays,
      // renderData
      // returnDay
   }
}