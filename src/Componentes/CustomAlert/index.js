import React from 'react'
import { Alert } from 'react-bootstrap'
import PropTypes from 'prop-types'
export class CustomAlert extends React.Component {
   constructor(props) {
      super(props)
      this.state = { showAlert: false }
      this.props.showAlertCallback(this.onShowAlert.bind(this))
   }

   setContent(message, statusMsg) {
      this.setState({
         message: message,
         statusMsg: statusMsg
      })
   };

   onShowAlert(data) {
      const message = data.message
      const type = data.responseType
      let statusMsg = ''
      if (type.toLowerCase().includes('error')) {
         statusMsg = 'danger'
      } else if (type.toLowerCase().includes('success')) {
         statusMsg = 'success'
      } else {
         statusMsg = 'warning'
      }

    this.setContent(message, statusMsg)
    this.setState({ showAlert: true })
    if(statusMsg==="success")
    {
      window.setTimeout(() => {
          this.props.redirectCallback()
        }, 2500)
    }
  }

   render() {
      return <Alert
         onClose={() => { this.setState({ showAlert: false }) }}
         dismissible
         show={this.state.showAlert}
         variant={this.state.statusMsg}
      >
         <p>{this.state.message}</p>
      </Alert>
   }
}

CustomAlert.propTypes=
{
  showAlertCallback: PropTypes.func.isRequired,
  redirectCallback: PropTypes.func.isRequired
}