import React from "react"
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from "@testing-library/user-event"
import { DemandForm } from "../Form"
import { act } from "react-dom/test-utils"
import { request } from "../../../../Services/api"
jest.mock("../../../../Services/api")
jest.setTimeout(20000)
//Workaround for the useScroll customHook functionality
const scrollMock = jest.fn()
beforeAll(() => {
   if (!HTMLElement.prototype.scrollIntoView) {
      HTMLElement.prototype.scrollIntoView = scrollMock
   }
})

describe("DemandForm", () => {
   it("can be filled with valid data for status de demanda = Em aberto", async () => {
      const alertMock = jest.fn()
      render(<DemandForm paramRoute={"inserir"}
         primaryId={null}
         redirectCallback={() => { }}
         showAlert={alertMock} />)
      await act(async () => {
         //Fill text fields
         userEvent.type(await screen.findByLabelText("Titulo"), "Hello")
         userEvent.type(screen.getByLabelText("Email"), "a@a.com")
         userEvent.type(screen.getByLabelText("Telefone"), "9999999999")
         userEvent.type(screen.getByLabelText("Descrição"), "Texto")
         userEvent.type(screen.getByLabelText("Observações"), "Texto")
         //Expand selector and select a component
         userEvent.click(screen.getByLabelText("Usuário"))
         userEvent.click(screen.getByText("LEONARDO NUNES"))
         userEvent.click(screen.getByLabelText("Status da Demanda"))
         userEvent.click(screen.getByText("EM ABERTO"))
         userEvent.click(screen.getByLabelText("Tipo de Demanda"))
         userEvent.click(screen.getByText("TIPO DE DEMANDA 12"))
         //Send a submission request to Formik and subsequently to the API(Mocked)
         userEvent.click(screen.getByText("Salvar"))
      })
      //If the form is valid, then check if page scrolled to the top and showed the success message
      expect(alertMock).toHaveBeenCalled()

   })
})