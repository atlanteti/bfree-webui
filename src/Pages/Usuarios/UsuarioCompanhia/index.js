import MultiSelectForm from "../../../Componentes/MultiSelectForm";
import { request, withParams } from "../../../Services/api";

function UsuarioCompanies(props) {
   return <UsuarioCompaniesForm
   userId={props.match.params.userId}
   populateListEndpoint="companies/listar-user-company"
   label="Empresas"
   name="selectCompanies"
   userName={props.match.params.userName}
   pageTitle="Empresas" />
}
export default withParams(UsuarioCompanies) 

class UsuarioCompaniesForm extends MultiSelectForm {

   formatList() {
      if (this.state.optionList.length != 0) {
         this.setState((state) => ({
            optionList: state.optionList.map(
               option => {
                  return {
                     value: option.cpn_cod,
                     label: option.cpn_name,
                     usc_usr_cod: option.usc_usr_cod,
                     pertence: option.pertence
                  };
               })
         }), this.populateSelected);
      }
   }

   async handleSubmit(event) {
      event.preventDefault();
      const formattedData = this.state.selected.map(
         (option) => {
            return {
               cpn_cod: option.value
            };
         });
      const data = await request({
         method: 'post',
         endpoint: 'user-companies/cadastrar',
         data: {
            user: { "usr_cod": this.props.userId },
            companies: formattedData
         }
      });
      this.showAlert(data)
   }
}