import { MenuItem } from "@mui/material"
import { DefaultValidateSelectField } from "../DefaultValidateInputs/DefaultValidateSelectField"
import NoDataComp from "../NoDataComp"

export const cpfMask = value => {
   return value
      .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
      .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
}

export function PixType(props) {
   return <DefaultValidateSelectField
      {...props}
      label="Tipo do Pix"
   >
      <MenuItem value={"EMAIL"}>E-mail</MenuItem>
      <MenuItem value={"CPF"}>CPF</MenuItem>
   </DefaultValidateSelectField>
}