import { Form } from 'react-bootstrap';
import { React, Component } from 'react';
import { request } from '../../Services/api';
import PropTypes from "prop-types"

export default class ListJourneys extends Component {
   constructor(props) {
      super(props);
      this.state = {
         journeys: [],
         selectedValue: this.props.defaultJourney
      };
      if (this.props.getSetCallback) {
         this.props.getSetCallback(this.select.bind(this))
      }
   }

   async getJourneys() {
      const data = await request({
         method: 'get',
         endpoint: 'journeys/listar-todos'
      });
      this.setState({
         journeys: data.data
      });
   }

   componentDidMount() {
      this.getJourneys();
   }

   onChange(event) {
      this.setState({ selectedValue: event.target.value })
      if (event.target.value !== "") {
         const jny_cpn_cod = this.state.journeys.filter((journey) => { return journey.jny_cod == event.target.value })[0].jny_cpn_cod
         let journeyWithCompany = {
            ...event,
            jny_cpn_cod: jny_cpn_cod
         }
         this.props.onChange(journeyWithCompany)
      }
      else {
         this.props.onChange(event)
      }
   }
   select(journeyCode) {
      this.setState({ selectedValue: journeyCode })
      this.props.onChange({
         target: {
            id: this.props.controlId,
            value: String(journeyCode)
         }
      })
   }

   render() {
      return <Form.Group controlId={this.props.controlId} /*"companyId"*/>
         <Form.Label>Jornada: </Form.Label>
         <Form.Control //Form.Select não funciona por razões misteriosas
            style={SelectValidateStyle}
            required={this.props.required}
            as="select"
            onChange={this.onChange.bind(this)}
            disabled={this.props.disabled}
            value={this.state.selectedValue != this.props.defaultJourney ? this.props.defaultJourney : this.state.selectedValue}>
            <>
               <option value={null} />
               {this.state.journeys?.map(journey => {
                  return (
                     <option
                        key={journey.jny_cod}
                        value={journey.jny_cod}
                     >
                        {journey.jny_name}
                     </option>);
               })}
            </>
         </Form.Control>
         <Form.Control.Feedback type="invalid">{this.props.errorMessage}</Form.Control.Feedback>
      </Form.Group>;
   }
}

ListJourneys.propTypes = {
   controlId: PropTypes.string.isRequired,
   onChange: PropTypes.func.isRequired,
   required: PropTypes.bool,
   defaultJourney: PropTypes.number.isRequired
}
