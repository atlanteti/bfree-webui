import { Component } from 'react';
import { request } from '../../Services/api';
import { Redirect } from 'react-router-dom'
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export class EditCreateForm extends Component {
   constructor(props) {
      super(props);
      this.state = {
         primaryData: {},
         responseAlertShow: null,
         redirect: false,
         token: cookies.get('auth')
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
               endpoint: this.props.requestDataEndpoint + this.primaryId,
               headers: {
                  Authorization: "Bearer " + this.state.token
               }
            });
            if (data.meta.status === 211) {
               cookies.remove('auth', { path: "/" })
               this.setState({ redirect: true })
            } else {
               this.setState({
                  primaryData: data.data,
               });
            }
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
         data: formData,
         headers: {
            Authorization: "Bearer " + this.state.token
         }
      });
   }

   async editPrimaryData(formData) {
      return await request({
         method: "put",

         endpoint: this.props.editDataEndpoint + this.primaryId,
         data: formData,
         headers: {
            Authorization: "Bearer " + this.state.token
         }
      });
   }
   formatData() {
      return this.state.primaryData
   }

   handleSubmit = async (e) => {
      const formData = this.formatData();
      e.preventDefault();
      let data = null;
      try {
         if (this.props.paramRoute === "inserir") {
            data = await this.insertPrimaryData(formData);
         }

         else {
            data = await this.editPrimaryData(formData);
         }
         this.props.showAlert(data.meta);
      } catch (error) {
         console.log(error);
      }
   };
   handleChange = (e) => {
      this.setState((state, props) => ({
         primaryData: {
            ...state.primaryData, [e.target.id]: e.target.value.trim()
         }
      }))
   };
}

