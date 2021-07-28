import MultiSelectForm from "../../../Componentes/MultiSelectForm";
import { request } from "../../../Services/api";

export default function UsuarioTipoDemanda(props)
{
   return <UsuarioTipoDemandaForm
      userId={props.match.params.userId}
      populateListEndpoint="types-demand/listar-user-type-demand"
      label="Tipos de Demanda:"
      name="selectDemandTypes"
      userName={props.match.params.userName}
      pageTitle="Tipos de Demanda"/>
}
class UsuarioTipoDemandaForm extends MultiSelectForm
{

  formatList() {
      if (this.state.optionList.length != 0) {
        this.setState((state) => ({
          optionList: state.optionList.map(
            option => {
              return {
                value: option.tdm_cod,
                label: option.tdm_name,
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
            tdm_cod: option.value
          };
        });
      const data = await request({
        method: 'post',
        endpoint: 'user-type-demands/cadastrar',
        data: {
          user: { "usr_cod": this.props.userId },
          typeDemands: formattedData
        }
      });
      this.showAlert(data)
    }
}