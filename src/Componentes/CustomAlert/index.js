import React from 'react';
import { Alert } from 'react-bootstrap';

export class CustomAlert extends React.Component {
   constructor(props) {
      super(props);
      this.state = { showAlert: false };
      this.props.showAlertCallback(this.onShowAlert.bind(this));
   }
   setContent(message, statusMsg) {
      this.setState({
         message: message,
         statusMsg: statusMsg
      });
   };
   onShowAlert() {
      const message = this.props.data.meta.message;
      const type = this.props.data.meta.responseType;
      let statusMsg = "";
      if (type.toLowerCase().includes("error")) {
         statusMsg = "danger";
      }
      else if (type.toLowerCase().includes("success")) {
         statusMsg = "success";
      }

      else {
         statusMsg = "warning";
      }

      this.setContent(message, statusMsg);
      this.setState({ showAlert: true });
      window.setTimeout(() => {
         this.setState({ showAlert: false });
      }, 2500);
   }
   render() {
      return <Alert
         onClose={() => { this.setState({ showAlert: false }); }}
         dismissible
         show={this.state.showAlert}
         variant={this.state.statusMsg}
      >
         <p>{this.state.message}</p>
      </Alert>;
   }
}
