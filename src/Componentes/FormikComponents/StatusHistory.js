import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import React from 'react';
import { Row } from 'react-bootstrap';
import { MdOutlineExpandMore } from 'react-icons/md';
import { DateFieldStatus } from '../DateField';
import {
   MainTable, TableData, TableHeader, TextCell,
} from '../../styles/CommonStyles';
import { StatusAccordionHeader, TextHeaderStatus, TableRowStatus } from '../../Pages/Demandas/Cadastrar/styles';

export const StatusHistory = (props) => {
   return <Accordion>
      <AccordionSummary
         expandIcon={<MdOutlineExpandMore />}
         aria-controls="panel1a-content"
         id="panel1a-header"
      >
         <StatusAccordionHeader>Histórico de Alterações de Status:</StatusAccordionHeader>
      </AccordionSummary>
      <AccordionDetails>
         <Row noGutters>
            <MainTable className={"table-borderless"}>
               <TableHeader>
                  <TextHeaderStatus>
                     Status:
                  </TextHeaderStatus>
                  <TextHeaderStatus>
                     Data de Alteração:
                  </TextHeaderStatus>
                  <TextHeaderStatus>
                     Data de Ação:
                  </TextHeaderStatus>
               </TableHeader>
               <TableData>
                  {props.primaryData?.demandStatusHistories.map(
                     (entry) => {
                        return <TableRowStatus>
                           <TextCell data-title="Status:">
                              {entry.statusDemand.sdm_name}
                           </TextCell>
                           <TextCell data-title="Data de alteração:">
                              <DateFieldStatus
                                 controlId="dsh_dtcreation"
                                 Label=""
                                 date={entry.dsh_dtcreation} />
                           </TextCell>
                           <TextCell data-title="Data de ação:">
                              <DateFieldStatus
                                 controlId="dsh_dtaction"
                                 Label=""
                                 noHour={true}
                                 date={entry.dsh_dtaction} />
                           </TextCell>
                        </TableRowStatus>;
                     })}
               </TableData>
            </MainTable>
         </Row>
      </AccordionDetails>
   </Accordion>;
};
