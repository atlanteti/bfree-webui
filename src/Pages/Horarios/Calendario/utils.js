import { useState } from "react";
import moment from "moment";

export const UtilsHourCalendar = () => {
   const [refresh, setRefresh] = useState(false)
   const [days, setDays] = useState([])
   const [populate, setPopulate] = useState([])

   function editNewDay(event, currentItem, dayMonth, date) {
      if (populate[dayMonth].cal_date === date) {
         if (populate[dayMonth].cal_end === date) {
            if (populate[dayMonth].cal_start !== days[days.length - 1].cal_start) {
               return setDays([
                  ...days, {
                     ...populate[dayMonth],
                     "cal_date": date,
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
   function editExistinNewDay(event) {
      if (event.target.name === "cal_start") {
         return days[days.length - 1].cal_start = event.target.value
      } else {
         return days[days.length - 1].cal_end = event.target.value
      }
   }
   function handleChange(event, currentItem, dayMonth, date) {
      const formatDate = moment(date).format('yyyy-MM-DD')
      let verifyEmptyField = Object.keys(currentItem).includes('cal_start') || Object.keys(currentItem).includes('cal_end')
      setPopulate({
         ...populate, [dayMonth]: {
            ...populate[dayMonth],
            "cal_date": formatDate,
            [event.target.name]: event.target.value
         }
      })
      if (verifyEmptyField && currentItem.cal_cod === undefined) {
         if (currentItem.cal_start === null && currentItem.cal_end !== null) {
            setPopulate([])
            editExistinNewDay(event, currentItem)
         } else {
            editExistinNewDay(event, currentItem)
         }
      }
      if (event.target.name === "cal_end" && currentItem.cal_cod === undefined) {
         if (!verifyEmptyField && populate[dayMonth] === undefined) {
            // começa o preenchimento pelo horario final
            return setDays([
               ...days, {
                  ...populate[dayMonth],
                  "cal_date": formatDate,
                  "cal_start": null,
                  [event.target.name]: event.target.value
               }
            ])
         }
         if (days[days.length - 1] !== undefined) {
            editNewDay(event, currentItem, dayMonth, formatDate)
         }
         if (!verifyEmptyField) {
            return setDays([
               ...days, {
                  ...populate[dayMonth],
                  "cal_date": formatDate,
                  [event.target.name]: event.target.value
               }
            ])
         }
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
      }, 10);
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