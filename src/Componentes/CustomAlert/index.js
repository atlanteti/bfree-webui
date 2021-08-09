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
      if (this.props.noDataAlert) {
         statusMsg = 'secondary'
      }
      this.setState({ showAlert: true })
      this.setContent(message, statusMsg)
      if (statusMsg === "success") {
         window.setTimeout(() => {
            this.props.redirectCallback()
            this.setState({ showAlert: false })
         }, 2500)
      }
   }

   render() {
      return <Alert
         onClose={() => { this.setState({ showAlert: false }) }}
         dismissible={!this.props.noDataAlert}
         show={this.state.showAlert}
         variant={this.state.statusMsg}
      >
         {this.state.message}
      </Alert>
   }
}

CustomAlert.propTypes =
{
   showAlertCallback: PropTypes.func.isRequired,
   redirectCallback: PropTypes.func.isRequired,
   noDataAlert: PropTypes.bool
}