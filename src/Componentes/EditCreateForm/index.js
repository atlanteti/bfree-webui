import { Component } from 'react';
import { request } from '../../Services/api';
import moment from "moment";
export class EditCreateForm extends Component {
   constructor(props) {
      super(props);
      this.state = {
         primaryData: {},
         responseAlertShow: null,
         loading: true,
         checkStatus: null,
         dateAction: null,
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
            });
            this.setState({
               primaryData: data.data,
               loading: false,
            });
         } catch (error) {
            console.log(error);
         }
      }
      if (this.paramRoute !== "inserir") {
         requestData();
      }
   };
   async insertPrimaryData(formData) {
      return await request({
         method: "post",
         endpoint: this.props.insertDataEndpoint,
         data: formData,
      });
   }

   async editPrimaryData(formData) {
      return await request({
         method: "put",

         endpoint: this.props.editDataEndpoint + this.primaryId,
         data: formData,
      });
   }
   formatData() {
      let formData = this.state.primaryData
      const keys = Object.keys(formData)
      keys.forEach(
         (curr) => {
            if ((typeof formData[curr]) === "string") {
               formData[curr] = formData[curr].trim()
            }
         }
      )
      return formData
   }

   handleSubmit = async (e) => {
      const formData = this.formatData();
      e.preventDefault();
      this.setState({
         validated: true
      })
      if (!e.target.checkValidity()) {
         return
      }
      let data = null;
      try {
         if (this.props.paramRoute === "inserir") {
            data = await this.insertPrimaryData(formData);
         }

         else {
            data = await this.editPrimaryData(formData);
         }
         if (data.meta.status === 422) {
            data.data.map((datum) => {
               this.setState({
                  [datum.field.toLowerCase()]: datum.message
               })
            })
         }
         else {
            this.props.showAlert(data.meta);
         }
      } catch (error) {
         console.log(error);
      }
   };
   handleChange = (e) => {
      this.setState((state, props) => ({
         primaryData: {
            ...state.primaryData, [e.target.id]: e.target.value
         },
         checkStatus: e.target.value
      }))
   };
   handleDate(date, id) {
      this.setState((state, props) => ({
         dateAction: date,
         primaryData: {
            ...state.primaryData, 
            [id]: date && moment(date).format('yyyy-MM-DD'),
         }
      }))
   }
   handleCheck = (e) => {
      this.setState({
         primaryData: {
            ...this.state.primaryData, [e.target.name]: !this.state.primaryData[e.target.name]
         }
      })
   };
}

