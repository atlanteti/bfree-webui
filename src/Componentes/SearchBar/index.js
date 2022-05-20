import { Component } from 'react'
import moment from 'moment'
export default class SearchBar extends Component {
   constructor(props) {
      super(props)
      this.state = {
         formData: {},
         initialDate: null,
         finalDate: null,
      }
      this.filter = {
         initialDate: null,
         finalDate: null,
      }
      this.onChange = this.onChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
   }
   changeDate(date, id) {
      this.filter = {
         ...this.filter,
         [id]: date ? moment(date).format('yyyy-MM-DD') : null
      }
      this.setState({
         [id]: date
      })
   }
   onChange(event) {
      this.setState({
         formData: {
            ...this.state.formData,
            [event.target.id]: event.target.value.trim()
         }
      })
   }
   handleSelect = (e) => {
      this.setState(({
         formData: {
            ...this.state.formData,
            [e.target.name]: e.target.value
         },
      }))
   }
   handleSubmit(event) {
      // TODO: Enviar a data formatada
      const { initialDate, finalDate, formData } = this.state
      event.preventDefault()
      this.props.filterData({ extraParams: { ...formData, initialDate, finalDate } })
      return
   }

   requestExportData(event, endpointExport, nameFile) {
      event.preventDefault()
      let data = this.props.exportData({ extraParams: this.state.formData, endpointExport, nameFile })
      return
   }

   requestSchedule(event) {
      event.preventDefault()
      let data = this.props.listSchedule()
      return
   }
}

