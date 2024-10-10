Cypress.Commands.add("fillMandatoryFieldsAndSubmit", () => {
    cy.get("#firstName").type("Rafhael").should('have.value', "Rafhael")
    cy.get("#lastName").type("Milanes Silva").should('have.value', "Milanes Silva")
    cy.get("#email").should("have.value", "")
    cy.get("#email").type("rafhaelmilanes@gmail.com", {delay:0}).should('have.value', "rafhaelmilanes@gmail.com")
    cy.get("#open-text-area").type("Teste de exemplo para o campo", {delay:0})
    cy.contains("button", "Enviar").click()
    cy.get(".success").should("be.visible")
})