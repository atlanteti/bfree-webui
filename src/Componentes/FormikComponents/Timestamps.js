import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { DateField } from '../DateField';

export const Timestamps = (props) => {
   const creationDate = `${props.fieldSuffix}dtcreation`
   const updateDate = `${props.fieldSuffix}dtupdate`
   return <Row className="mt-6">
      <Col md={{ offset: 1 }} xs={12} sm={5}>
         <DateField
            controlId={creationDate}
            Label="Data de criação:"
            date={props.primaryData[creationDate]} />
      </Col>
      {props.primaryData[updateDate] === null
         ? ''
         : <Col xs={12} sm={5}>
            <DateField
               controlId={updateDate}
               Label="Data de atualização:"
               date={props.primaryData[updateDate]} />
         </Col>}
   </Row>;

};
