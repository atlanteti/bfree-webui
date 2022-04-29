import { useState } from "react";
import moment from "moment";

export const UtilsHourCalendar = () => {
   const [refresh, setRefresh] = useState(false)
   const [days, setDays] = useState([])
   const [populate, setPopulate] = useState([])

   // function editExistingDay(event, index,)
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
      } else if (currentItem.cal_start === null && currentItem.cal_end === null) {
         return days[days.length - 1].cal_start = event.target.value
      }
      if (event.target.name === "cal_end" && currentItem.cal_cod === undefined) {
         // tratamento para a criação de novos horarios para o mesmo dia
         if (days[days.length - 1] !== undefined) {
            if (populate[dayMonth].cal_date === moment(days[days.length - 1].cal_end).format('yyyy-MM-DD')) {
               if (populate[dayMonth].cal_end === moment(days[days.length - 1].cal_end).format('yyyy-MM-DD')) {
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
            } else if (Object.keys(currentItem).includes('cal_date')) {
               return days[days.length - 1].cal_end = event.target.value
            }
         }
         setDays([
            ...days, {
               ...populate[dayMonth],
               "cal_date": formatDate,
               [event.target.name]: event.target.value
            }
         ])
         // TODO: Tratar o caso de novos horarios sem outro horario no mesmo dia
      }
      if (currentItem.cal_cod) {
         // é chamado quando esta sendo editado algum horario ja existente
         if (event.target.name === "cal_end") {
            currentItem.cal_end = event.target.value
         } else {
            currentItem.cal_start = event.target.value
         }
      }
   }
   function addNewRowCalendar(currentArray, date) {
      const formatDate = moment(date).format('yyyy-MM-DD')

      let cDivs = [...currentArray];
      cDivs.push({ "cal_start": null, "cal_end": null, "cal_date": formatDate })
      setDays(cDivs)
   }
   function removeRowCalendar(currentArray, currentItem, setArray, object) {
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
         return setArray({ ...object, array: cDivs })
      } else {
         setRefresh(true)
         setArray({ ...object, array: filteredCurrentArray })
      }
      loading()
   }
   function loading() {
      setTimeout(() => {
         setRefresh(false)
      }, 0);
   }
   return {
      addNewRowCalendar,
      removeRowCalendar,
      handleChange,
      days,
      setDays,
      refresh,
   }
}