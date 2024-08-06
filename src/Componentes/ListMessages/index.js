import { MenuItem } from '@mui/material';
import PropTypes from 'prop-types';
import { Component, React } from 'react';
import { request } from '../../Services/api';
import { DefaultValidateSelectField } from '../DefaultValidateInputs/DefaultValidateSelectField';

export default class ListMessage extends Component {
   constructor(props) {
      super(props);
      this.state = {
         messages: [],
      };
   }

   async getMessages() {
      const data = await request({
         method: 'get',
         endpoint: 'demands/list-activities'
      });
      this.setState({
         messages: data.data
      });
   }

   componentDidMount() {
      this.getMessages();
   }

   render() {
      return <DefaultValidateSelectField
         {...this.props}
         value={this.props.defaultMessage}
         label="Mensagem">
         {this.state.messages?.map(message => {
            return (
               <MenuItem
                  key={message}
                  value={message}
               >
                  {message}
               </MenuItem>);
         })}
      </DefaultValidateSelectField>
   }
}

ListMessage.propTypes = {
   defaultMessage: PropTypes.string,
   onChange: PropTypes.func.isRequired,
   required: PropTypes.bool,
   disabled: PropTypes.bool
}