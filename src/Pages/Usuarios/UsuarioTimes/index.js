import MultiSelectForm from "../../../Componentes/MultiSelectForm";
import { request, withParams } from "../../../Services/api";

function UsuarioJornadas(props) {
   return <UsuarioTimesForm
   userId={props.match.params.userId}
   populateListEndpoint="teams/listar-team-members"
   label="Times"
   name="selectTimes"
   userName={props.match.params.userName}
   pageTitle="Times" />
}
export default withParams(UsuarioJornadas);

class UsuarioTimesForm extends MultiSelectForm {

   formatList() {
      if (this.state.optionList.length != 0) {
         this.setState((state) => ({
            optionList: state.optionList.map(
               option => {
                  return {
                     value: option.tea_cod,
                     label: option.tea_name,
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
               tea_cod: option.value
            };
         });
      const data = await request({
         method: 'post',
         endpoint: 'team-members/cadastrar',
         data: {
            user: { "usr_cod": this.props.userId },
            teams: formattedData
         }
      });
      this.showAlert(data)
   }
}