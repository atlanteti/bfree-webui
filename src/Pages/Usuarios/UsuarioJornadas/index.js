import MultiSelectForm from "../../../Componentes/MultiSelectForm";
import { request } from "../../../Services/api";

export default function UsuarioJornadas(props) {
   return <UsuarioJornadasForm
      userId={props.match.params.userId}
      populateListEndpoint="journeys/listar-user-journey"
      label="Jornadas"
      name="selectJourneys"
      userName={props.match.params.userName}
      pageTitle="Jornadas" />
}
class UsuarioJornadasForm extends MultiSelectForm {

   formatList() {
      if (this.state.optionList.length != 0) {
         this.setState((state) => ({
            optionList: state.optionList.map(
               option => {
                  return {
                     value: option.jny_cod,
                     label: option.jny_name,
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
               jny_cod: option.value
            };
         });
      const data = await request({
         method: 'post',
         endpoint: 'user-jorneys/cadastrar',
         data: {
            user: { "usr_cod": this.props.userId },
            journeys: formattedData
         }
      });
      this.showAlert(data)
   }
}