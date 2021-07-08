import { Component } from 'react';
import { request } from '../../Services/api';

export class EditCreateForm extends Component {
   constructor(props) {
      super(props);
      this.state = {
         primaryData: {},
         responseAlertShow: null
      };
      this.paramRoute = props.paramRoute;
      this.primaryId = Number(props.primaryId);
      this.redirectCallback = props.redirectCallback;
      this.handleChange = this.handleChange.bind(this);
   }
   componentDidMount() {
      const requestData = async () => {
         try {
            const data = await request({
               method: "get",
               //props.requestDataEndpoint
               endpoint:this.props.requestDataEndpoint+this.primaryId
            });
            this.setState({
               primaryData: data.data
            });
         } catch (error) {
            console.log(error);
         }
      };
      if (this.paramRoute !== "inserir") {
         requestData();
      }
   }
   async insertPrimaryData(formData) {
      return await request({
         method: "post",
         endpoint: this.props.insertDataEndpoint,
         data: formData
      });
   }

   async editPrimaryData(formData) {
      return await request({
         method: "put",

         endpoint: this.props.editDataEndpoint+this.primaryId,
         data: formData,
      });
   }
   handleSubmit = async (e) => {
      const formData = {
         ...this.state.primaryData,
         cpn_cli_cod: Number(this.state.primaryData.cpn_cli_cod)
      };
      e.preventDefault();
      let data = null;
      try {
         if (this.props.paramRoute === "inserir") {
            data = await this.insertPrimaryData(formData);
         }

         else {
            data = await this.editPrimaryData(formData);
         }
         this.props.showAlert(data);
      } catch (error) {
         console.log(error);
      }
   };
   handleChange = (e) => {
      this.setState({
         primaryData: {
            ...this.state.primaryData, [e.target.id]: e.target.value.trim()
         }
      });
   };
}

