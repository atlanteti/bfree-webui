import MultiSelectForm from "../../../Componentes/MultiSelectForm";
import { request } from "../../../Services/api";

export default function UsuarioBadges(props) {
   return <UsuarioBadgesForm
      userId={props.match.params.userId}
      populateListEndpoint="badges/listar-user-badges"
      label="Badges"
      name="selectBadges"
      userName={props.match.params.userName}
      pageTitle="Badges" />
}
class UsuarioBadgesForm extends MultiSelectForm {

   formatList() {
      if (this.state.optionList.length !== 0) {
         this.setState((state) => ({
            optionList: state.optionList.map(
               option => {
                  return {
                     value: option.bdg_cod,
                     label: option.bdg_name,
                     bdg_cpn_cod: option.bdg_cpn_cod,
                     bdg_jny_cod: option.bdg_jny_cod,
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
               bdg_cod: option.value,
               bdg_cpn_cod: option.bdg_cpn_cod,
               bdg_jny_cod: option.bdg_jny_cod
            };
         });
      const data = await request({
         method: 'post',
         endpoint: 'user-badges/cadastrar',
         data: {
            user: { "usr_cod": this.props.userId },
            badges: formattedData
         }
      });
      this.showAlert(data)
   }
}