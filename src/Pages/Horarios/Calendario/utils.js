import { useState } from "react";
import moment from "moment";

export const UtilsHourCalendar = () => {
   const [loadingData, setLoadingData] = useState(true)
   // const [segunda, setSegunda] = useState({})
   // const [terca, setTerca] = useState({})
   // const [quarta, setQuarta] = useState({})
   // const [quinta, setQuinta] = useState({})
   // const [sexta, seSexta] = useState({})
   function addNewRowCalendar(currentArray, setArray, object) {
      setLoadingData(true)
      let cDivs = [...currentArray];
      cDivs.push({ "cal_start": null, "cal_end": null })
      loading()
      setArray({ ...object, array: cDivs })
   }
   function removeRowCalendar(currentArray, currentItem, setArray, object) {
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
      // returnDay
   }
}