import { Component } from 'react'

export default class SearchBar extends Component {
   constructor(props) {
      super(props)
      this.state = {
         formData: {}
      }
      this.onChange = this.onChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
   }

   onChange(event) {
      this.setState({
         formData: {
            ...this.state.formData,
            [event.target.id]: event.target.value.trim()
         }
      })
   }

   handleSubmit(event) {
      event.preventDefault()
      this.props.filterData({ extraParams: this.state.formData })
      return
   }

   requestExportData(event, endpointExport, nameFile) {
      event.preventDefault()
      let data = this.props.exportData({ extraParams: this.state.formData, endpointExport, nameFile })
      return
   }
}

