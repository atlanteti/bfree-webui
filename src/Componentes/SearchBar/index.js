import { Component } from 'react'

export default class SearchBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      formData: {}
    }
    this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  onChange (event) {
    this.setState({
      formData: {
        ...this.state.formData,
        [event.target.id]: event.target.value.trim()
      }
    })
  }

  handleSubmit (event)
  {
    event.preventDefault()
    this.props.filterData({page: 1, extraParams: this.state.formData})
    return
  }
}

