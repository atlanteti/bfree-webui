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
   function editExistinNewDay(event, currentItem) {
      return currentItem[event.target.name] = event.target.value
   }
   function createNewDay(event, formatDate) {
      return setDays([
         ...days, {
            "cal_date": formatDate,
            [event.target.name]: event.target.value
         }
      ])
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
      if (!verifyEmptyField && populate[dayMonth] === undefined) {
         return createNewDay(event, formatDate, dayMonth)
      }
      if (verifyEmptyField && currentItem.cal_cod === undefined) {
         if (currentItem.cal_start === null && currentItem.cal_end !== null) {
            setPopulate([])
            return editExistinNewDay(event, currentItem)
         } else {
            return editExistinNewDay(event, currentItem)
         }
      }
      if (event.target.name === "cal_end" && currentItem.cal_cod === undefined) {
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
         currentItem[event.target.name] = event.target.value
      }
   }
   function addNewRowCalendar(currentArray, date) {
      const formatDate = moment(date).format('yyyy-MM-DD')

      let cDivs = [...currentArray];
      cDivs.push({ "cal_start": null, "cal_end": null, "cal_date": formatDate })
      setDays(cDivs)
   }
   function removeRowCalendar(currentItem) {
      setRefresh(true)
      // os filtros são usados para remover o item exato que esta sendo excluido
      var filtered = days.filter(function (value) {
         return value !== currentItem
      });
      setDays(filtered)
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