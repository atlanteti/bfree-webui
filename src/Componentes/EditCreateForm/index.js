import { Component } from 'react';
import { request } from '../../Services/api';
import { useHistory, Redirect } from 'react-router-dom'
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

// const history = useHistory()

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
      this.handleCheck = this.handleCheck.bind(this);
   }

   redirect() {
      this.setState({ redirect: true })
   }

   componentDidMount() {
      const requestData = async () => {
         try {
            const data = await request({
               method: "get",
               //props.requestDataEndpoint
               endpoint: this.props.requestDataEndpoint + this.primaryId,
               // headers: {
               //    Authorization: "Bearer " + this.state.token
               // }
            });
            console.log(data)
            // if (data.meta.status === 211) {
            //    alert("A")
            //    this.setState({ redirect: true })
            // }
            // this.setState({
            //    primaryData: data.data,
            // });
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
      this.setState({
         primaryData: {
            ...this.state.primaryData, [e.target.id]: e.target.value.trim()
         }
      });
   };
   handleCheck = () => {
      this.setState({
         primaryData: {
            ...this.state.primaryData, ["tea_active"]: !this.state.primaryData.tea_active
         }
      })
   }
   render() {
      if (this.state.redirect) {
         return alert("A")
      }
   }
}

