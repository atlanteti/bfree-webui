import * as yup from 'yup';

yup.setLocale({
   mixed: {
      required: 'Campo Obrigatório'
   },
   string: {
      email: 'Email inválido',
      min: 'Valor muito curto (mínimo ${min} caracteres)',
      max: 'Valor muito longo (máximo ${max} caracteres)'
   },
   number: {
      min: "Deve ser maior que ${min}",
      max: "Deve ser menor que ${max}"
   }
});

export default yup;