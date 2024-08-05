Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type("Rafhael")
    cy.get('#lastName').type("Milanes")
    cy.get('#email').type("rafhael@gmai.com")
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
})