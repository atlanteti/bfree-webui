import { useState, useEffect, useContext } from "react";
import { Col, Row } from "react-bootstrap"
import { CheckBox } from "../../Componentes/CheckBox"
import ImageBackground from "../../Assets/logo.JPG"
import Logo from "../../Assets/icon-blue.png"
import { RowTitle, Title, SubTitle, Terms, TermItem } from "./styles"
import { request } from "../../Services/api";
import { Redirect } from "react-router";
import { decodeToken } from "react-jwt";
import { Cookies } from 'react-cookie'
import ContextLogin from "../../Context/ContextLogin";

export function TermosCompromisso() {
   const { setVerifyUser, setUser, setAuth, setUserRoles, userRoles } = useContext(ContextLogin)
   const cookie = new Cookies()
   const [term, setTerm] = useState(true);
   const [redirect, setRedirect] = useState(false);
   const [bfreeId, setBfreeId] = useState(null);
   const storedPermission = cookie.get("term")

   const handleCheck = async (e) => {
      setTerm(!term)
      const data = await request({
         method: "post",
         endpoint: "commitment-term/confirmar-termo",
         params: {
            bfreeId
         },
         headers: {
            'Authorization': "Bearer " + storedPermission,
         }
      })
      if (data.meta.status === 100) {
         cookie.remove('term', { path: "/" })
         cookie.set('user', decodeToken(data.meta.token)["ID Bfree"], { path: "/" })
         cookie.set('auth', data.meta.token, { path: "/" })
         setUser(decodeToken(data.meta.token)["ID Bfree"], { path: "/" })
         setVerifyUser(data.meta.status)
         setUserRoles(data.meta.journeys)
         setRedirect(true);
         setAuth(data.meta.token)
      }
   };

   useEffect(() => {
      setBfreeId(decodeToken(cookie.get("term"))["ID Bfree"], { path: "/" })
   }, [bfreeId])

   if (redirect) {
      if (userRoles?.includes("PRÉ-VENDA")) {
         return <Redirect to="/contato" />
      }
      if (userRoles?.includes("CONSULTOR")) {
         return <Redirect to="/reunioes" />
      }
      else {
         return <Redirect to="/demandas" />
      }
   }

   return (
      <Col style={{ background: '#fff' }}>
         <Row>
            <Col
               style={{
                  paddingLeft: 0,
                  paddingRight: 0
               }}
               xs={12} sm={6}
            >
               <img
                  style={{ minHeight: '100vh' }}
                  src={ImageBackground}
                  alt="ImageBackground"
               />
            </Col>
            <Col md={{ span: 5 }}>
               <RowTitle>
                  <h1>{term}</h1>
                  <img src={Logo} height="35" width="35" alt="Logo" />
                  <Title><strong>B</strong>free</Title>
               </RowTitle>
               <SubTitle>Termos e Condições de Uso</SubTitle>
               <Terms>
                  <TermItem>
                     TERMO DE USO DE PLATAFORMA DE SERVIÇOS
                  </TermItem>
                  <TermItem>
                     O presente Termo tem como objeto disciplinar a utilização, por parte do USUÁRIO, qualificado no cadastro, da Plataforma de Serviços de titularidade da <strong>BFree</strong> (PLATAFORMA), CNPJ 43.009.415/0001-39, sediada na Av. Sorocaba, 500, Jardim das Magnólias, CEP: 18044-390, Sorocaba - SP, mediante as Cláusulas a seguir transcritas:
                  </TermItem>
                  <TermItem>
                     <strong>Cláusula 1ª:</strong> A PLATAFORMA oferece serviços, através de aplicativo, que dá condições ao USUÁRIO de prestar serviços diversos a pessoas interessadas, que serão os clientes da PLATAFORMA atendidos em questões específicas pelo USUÁRIO.
                  </TermItem>
                  <TermItem>
                     <strong>Cláusula 2ª:</strong> A PLATAFORMA conectará, ao USUÁRIO, as ofertas de serviços disponíveis.
                  </TermItem>
                  <TermItem>
                     <strong>Cláusula 3ª:</strong> A relação jurídica ora firmada entre o USUÁRIO e a PLATAFORMA não é de vínculo empregatício, já que não preenche os requisitos previstos na CLT e, inclusive, não há, também, exclusividade, ou seja, o USUÁRIO poderá prestar seus serviços fora do âmbito da PLATAFORMA, não existindo, da mesma forma, nenhuma obrigação de habitualidade e cumprimento de horário e metas.
                  </TermItem>
                  <TermItem>
                     <strong>Cláusula 4ª:</strong> O USUÁRIO declara ter conhecimento expresso do funcionamento da PLATAFORMA, bem como de suas regras, com as quais declara-se de pleno acordo, sujeitando-se às penalidades cabíveis em caso de inobservância.
                  </TermItem>
                  <TermItem>
                     <strong>Cláusula 5ª:</strong> O USUÁRIO declara encontrar-se habilitado para prestar o serviço que se propõe, inclusive junto a todos os órgãos reguladores e fiscalizadores.
                  </TermItem>
                  <TermItem>
                     <strong>Cláusula 6ª:</strong> A PLATAFORMA declara que não é solidária ao USUÁRIO em qualquer tipo de revés que porventura este tiver que suportar, sendo tal condição plenamente aceita pelo USUÁRIO, inexistindo, também, responsabilidade da PLATAFORMA por problemas na execução ou desenvolvimento dos serviços, ou, ainda, na relação entre o USUÁRIO e os clientes.
                  </TermItem>
                  <TermItem>
                     <strong>Parágrafo Único:</strong> Para ser considerado um serviço efetiva e qualitativamente prestado pelo USUÁRIO, poderá, eventualmente, ser necessária a validação pelo cliente junto à PLATAFORMA.
                  </TermItem>
                  <TermItem>
                     <strong>Cláusula 7ª:</strong> A PLATAFORMA e o USUÁRIO declaram que se encontram operando em conformidade com a Lei Geral de Proteção de Dados e que cada qual, em caso de vazamento de dados, responderá isoladamente pelo dano que porventura tiver dado causa, seja quem for o destinatário do possível dano.
                  </TermItem>
                  <TermItem>
                     <strong>Cláusula 8ª:</strong> O USUÁRIO atesta a veracidade de todas as informações cadastrais prestadas, bem como a autenticidade de seus documentos informados à PLATAFORMA, estando ciente de que deverá gozar, ao tempo de seu cadastro, da maioridade legal.
                  </TermItem>
                  <TermItem>
                     <strong>Cláusula 9ª:</strong> A PLATAFORMA poderá, a qualquer tempo, alterar os Termos de Uso, bastando postar no aplicativo a ocorrência de alterações, sendo que, a permanência do USUÁRIO na PLATAFORMA depois de ter acessado o aplicativo com as alterações, implicará, automaticamente, na aceitação expressa de todas as inovações.
                  </TermItem>
                  <TermItem>
                     <strong>Cláusula 10:</strong> Não existe, para o USUÁRIO, nenhum tipo de exclusividade territorial, podendo a PLATAFORMA cadastrar tantos usuários quantos quiser em quaisquer localidades e áreas de atuação profissional.
                  </TermItem>
                  <TermItem>
                     <strong>Cláusula 11:</strong> O USUÁRIO isenta a PLATAFORMA de qualquer responsabilidade por problemas de conexão e sistema que impeça o acesso ao aplicativo e seus serviços.
                  </TermItem>
                  <TermItem>
                     <strong>Cláusula 12:</strong> O preço a ser pago ao USUÁRIO, pelos serviços efetivamente prestados, será aquele que constar da oferta quando o USUÁRIO visualizar a oportunidade na PLATAFORMA, declarando o USUÁRIO a ciência e concordância de que os preços serão variáveis de acordo com o tempo, mercado, demanda e outros fatores subjetivos da atividade desenvolvida.
                  </TermItem>
                  <TermItem>
                     <strong>Parágrafo Único:</strong> O pagamento somente será devido quando o serviço for completado e validado pela PLATAFORMA.
                  </TermItem>
                  <TermItem>
                     <strong>Cláusula 13:</strong> No preço estão incluídos todos e quaisquer custos do USUÁRIO, inclusive, mas não apenas, gastos pessoais e tributos de qualquer natureza, obrigando-se o USUÁRIO a emitir o respectivo documento fiscal de prestação de serviços de pessoa jurídica, aplicando-se as retenções previstas por lei.
                  </TermItem>
                  <TermItem>
                     <strong>Cláusula 14:</strong> O USUÁRIO está ciente de que precisará de treinamento para a execução de serviços, o qual será disponibilizado pela PLATAFORMA, gratuitamente ou não, a critério da PLATAFORMA.
                  </TermItem>
                  <TermItem>
                     <strong>Cláusula 15:</strong> A PLATAFORMA não terá nenhum tipo de responsabilidade por problemas na execução ou desenvolvimento dos serviços.
                  </TermItem>
                  <TermItem>
                     <strong>Cláusula 16:</strong> A PLATAFORMA disponibilizará um canal de suporte e atendimento ao USUÁRIO, para o qual serão encaminhadas eventuais reclamações, que serão julgadas pelo Setor de Normas da PLATAFORMA.
                  </TermItem>
                  <TermItem>
                     <strong>Cláusula 17:</strong> Este Termo vigorará por prazo indeterminado e poderá ser rescindido unilateral e imotivadamente por qualquer das partes, independentemente de qualquer aviso antecedente, bastando, para tanto, que a parte interessada na rescisão, PLATAFORMA ou USUÁRIO, informe à outra de sua decisão de por fim a este Termo.
                  </TermItem>
                  <TermItem>
                     <strong>Cláusula 18:</strong> Fica eleito, exclusivamente, o foro de Sorocaba - SP para dirimir quaisquer litígios oriundos da presente relação jurídica.
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