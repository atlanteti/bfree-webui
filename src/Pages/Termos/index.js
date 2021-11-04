import {useState} from "react";
import { Col, Row } from "react-bootstrap"
import { CheckBox } from "../../Componentes/CheckBox"
import ImageBackground from "../../Assets/logo.JPG"
import Logo from "../../Assets/icon-blue.png"
import { RowTitle, Title, SubTitle, Terms, TermItem } from "./styles"
import { request } from "../../Services/api";
import { Redirect } from "react-router";

export function TermosCompromisso(){
   const [term, setTerm] = useState(true);
   const [redirect, setRedirect] = useState(false);
   
   const handleCheck = async (e) => {
      console.log(e)
      setTerm(!term)
      // const data = await request({
      //    method: "post",
      //    endpoint: "",
      // })

      // if(data.meta.status){
      //    setRedirect(true);
      // }
   };

   if(redirect){
      return <Redirect to="/demandas" />
   }
   return(
      <Col style={{background: '#fff'}}>
         <Row>
            <Col 
               style={{
                  paddingLeft: 0, 
                  paddingRight: 0
               }} 
               xs={12} sm={6}
            >
               <img 
                  style={{minHeight: '100vh'}} 
                  src={ImageBackground} 
                  alt="ImageBackground"
               />
            </Col>
            <Col md={{span: 5}}>
               <RowTitle>
               <h1>{term}</h1>
                  <img src={Logo} height="35" width="35" alt="Logo"/>
                  <Title><strong>B</strong>free</Title>
               </RowTitle>
               <SubTitle>Termos e Condições de Uso</SubTitle>
               <Terms>
                  <TermItem>
                     TERMO DE USO DE PLATAFORMA DE SERVIÇOS 
                  </TermItem>
                  <TermItem>
                     O presente Termo tem como objeto disciplinar a utilização, por parte do USUÁRIO, qualificado no cadastro, da Plataforma de Serviços de titularidade da BFree (PLATAFORMA), mediante as Cláusulas a seguir transcritas:
                  </TermItem>
                  <TermItem>
                     Cláusula 1ª: A PLATAFORMA oferece serviços, através de aplicativo, que dá condições ao USUÁRIO de prestar serviços diversos a pessoas interessadas, que serão os clientes da PLATAFORMA atendidos em questões específicas pelo USUÁRIO.
                  </TermItem>
                  <TermItem>        
                     Cláusula 2ª: A PLATAFORMA conectará, ao USUÁRIO, as ofertas de serviços disponíveis. 
                  </TermItem>
                  <TermItem>
                     Cláusula 3ª: A relação jurídica ora firmada entre o USUÁRIO e a PLATAFORMA não é de vínculo empregatício, já que não preenche os requisitos previstos na CLT e, inclusive, não há, também, exclusividade, ou seja, o USUÁRIO poderá prestar seus serviços fora do âmbito da PLATAFORMA, não existindo, da mesma forma, nenhuma obrigação de habitualidade e cumprimento de horário e metas.
                  </TermItem>
                  <TermItem>
                     Cláusula 4ª: O USUÁRIO declara ter conhecimento expresso do funcionamento da PLATAFORMA, bem como de suas regras, com as quais declara-se de pleno acordo, sujeitando-se às penalidades cabíveis em caso de inobservância.
                   </TermItem>
                  <TermItem>
                     Cláusula 5ª: O USUÁRIO declara encontrar-se habilitado para prestar o serviço que se propõe, inclusive junto a todos os órgãos reguladores e fiscalizadores.
                   </TermItem>
                  <TermItem>
                     Cláusula 6ª: A PLATAFORMA declara que não é solidária ao USUÁRIO em qualquer tipo de revés que porventura este tiver que suportar, sendo tal condição plenamente aceita pelo USUÁRIO, inexistindo, também, responsabilidade da PLATAFORMA por problemas na execução ou desenvolvimento dos serviços, ou, ainda, na relação entre o USUÁRIO e os clientes. 
                  </TermItem>
                  <TermItem>
                     Parágrafo Único: Para ser considerado um serviço efetiva e qualitativamente prestado pelo USUÁRIO, poderá, eventualmente, ser necessária a validação pelo cliente junto à PLATAFORMA.
                  </TermItem>
                  <TermItem>
                     Cláusula 7ª: A PLATAFORMA e o USUÁRIO declaram que se encontram operando em conformidade com a Lei Geral de Proteção de Dados e que cada qual, em caso de vazamento de dados, responderá isoladamente pelo dano que porventura tiver dado causa, seja quem for o destinatário do possível dano.
                  </TermItem>
                  <TermItem> 
                     Cláusula 8ª: O USUÁRIO atesta a veracidade de todas as informações cadastrais prestadas, bem como a autenticidade de seus documentos informados à PLATAFORMA, estando ciente de que deverá gozar, ao tempo de seu cadastro, da maioridade legal.
                  </TermItem>
                  <TermItem>
                     Cláusula 9ª: A PLATAFORMA poderá, a qualquer tempo, alterar os Termos de Uso, bastando postar no aplicativo a ocorrência de alterações, sendo que, a permanência do USUÁRIO na PLATAFORMA depois de ter acessado o aplicativo com as alterações, implicará, automaticamente, na aceitação expressa de todas as inovações.
                  </TermItem>
                  <TermItem>
                     Cláusula 10: Não existe, para o USUÁRIO, nenhum tipo de exclusividade territorial, podendo a PLATAFORMA cadastrar tantos usuários quantos quiser em quaisquer localidades e áreas de atuação profissional.
                  </TermItem>
                  <TermItem>
                     Cláusula 11: O USUÁRIO isenta a PLATAFORMA de qualquer responsabilidade por problemas de conexão e sistema que impeça o acesso ao aplicativo e seus serviços.
                  </TermItem>
                  <TermItem>
                     Cláusula 12: O preço a ser pago ao USUÁRIO, pelos serviços efetivamente prestados, será aquele que constar da oferta quando o USUÁRIO visualizar a oportunidade na PLATAFORMA, declarando o USUÁRIO a ciência e concordância de que os preços serão variáveis de acordo com o tempo, mercado, demanda e outros fatores subjetivos da atividade desenvolvida. 
                  </TermItem>
                  <TermItem>
                     Parágrafo Único: O pagamento somente será devido quando o serviço for completado e validado pela PLATAFORMA.
                  </TermItem>
                  <TermItem>
                     Cláusula 13: No preço estão incluídos todos e quaisquer custos do USUÁRIO, inclusive, mas não apenas, gastos pessoais e tributos de qualquer natureza, obrigando-se o USUÁRIO a emitir o respectivo documento fiscal de prestação de serviços de pessoa jurídica, aplicando-se as retenções previstas por lei. 
                  </TermItem>
                  <TermItem>
                     Cláusula 14: O USUÁRIO está ciente de que precisará de treinamento para a execução de serviços, o qual será disponibilizado pela PLATAFORMA, gratuitamente ou não, a critério da PLATAFORMA.
                  </TermItem>
                  <TermItem>
                     Cláusula 15: A PLATAFORMA não terá nenhum tipo de responsabilidade por problemas na execução ou desenvolvimento dos serviços.
                  </TermItem>
                  <TermItem>
                     Cláusula 16: A PLATAFORMA disponibilizará um canal de suporte e atendimento ao USUÁRIO, para o qual serão encaminhadas eventuais reclamações, que serão julgadas pelo Setor de Normas da PLATAFORMA. 
                  </TermItem>
                  <TermItem>
                     Cláusula 17: Este Termo vigorará por prazo indeterminado e poderá ser rescindido unilateral e imotivadamente por qualquer das partes, independentemente de qualquer aviso antecedente, bastando, para tanto, que a parte interessada na rescisão, PLATAFORMA ou USUÁRIO, informe à outra de sua decisão de por fim a este Termo.
                  </TermItem>
                  <TermItem>
                     Cláusula 18: Fica eleito, exclusivamente, o foro de Sorocaba - SP para dirimir quaisquer litígios oriundos da presente relação jurídica.
                  </TermItem>
               </Terms>
               <CheckBox label="Li e concordo com os termos"
                  controlId="bdg_mentor"
                  name="bdg_mentor"
                  defaultValue={term}
                  onChange={handleCheck}
                  required
               />
            </Col>
         </Row>
      </Col>
   );
}