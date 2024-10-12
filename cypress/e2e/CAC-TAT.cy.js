/// <reference types="cypress" />
describe("Central de Atendimento ao Cliente TAT", () => {
  const TREE_SECONDS_IN_MS = 3000

  beforeEach(() => {
    cy.visit("../src/index.html")
  })
  it("verifica o título da aplicaçao", () => {
    cy.title().should("eq", "Central de Atendimento ao Cliente TAT")
  })
  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.get("#firstName").type("Rafhael").should('have.value', "Rafhael")
    
    cy.clock()

    cy.get("#lastName").type("Milanes Silva").should('have.value', "Milanes Silva")
    cy.get("#email").should("have.value", "")
    cy.get("#email").type("rafhaelmilanes@gmail.com", {delay:0}).should('have.value', "rafhaelmilanes@gmail.com")
    cy.get("#open-text-area").type("Teste de exemplo para o campo", {delay:0})
    cy.contains("button", "Enviar").click()
    cy.get(".success").should("be.visible")

    cy.tick(TREE_SECONDS_IN_MS)
    
    cy.get(".success").should("not.be.visible")
  });
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.clock()

    cy.get("#firstName").type("Rafhael").should('have.value', "Rafhael")
    cy.get("#lastName").type("Milanes Silva").should('have.value', "Milanes Silva")
    cy.get("#email").should("have.value", "")
    cy.get("#email").type("rafhaelmilanes.gmail.com", {delay:0}).should('have.value', "rafhaelmilanes.gmail.com")
    cy.get("#open-text-area").type("Teste de exemplo para o campo", {delay:0})
    cy.contains("button", "Enviar").click()
    cy.get(".error").should("be.visible")

    cy.tick(TREE_SECONDS_IN_MS)

    cy.get(".error").should("not.be.visible")
  })
  it('campo telefone vazio quando preenchido com valor nao-numerico', () => {
    cy.get("#phone").type("abcd").should("have.value", "")
  });
Cypress._.times(5, function(){
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get("#firstName").type("Rafhael").should('have.value', "Rafhael")
    cy.get("#lastName").type("Milanes Silva").should('have.value', "Milanes Silva")
    cy.get("#email").should("have.value", "")
    cy.get("#email").type("rafhaelmilanes@gmail.com", {delay:0}).should('have.value', "rafhaelmilanes@gmail.com")
    cy.get("#phone-checkbox").check()
    cy.get("#open-text-area").type("Teste de exemplo para o campo", {delay:0})
    cy.contains("button", "Enviar").click()
    cy.get(".error").should("be.visible")
  });
})
  it('preenche e limpa os campos nome, sobrenome e email', () => {
    cy.get("#firstName")
      .type("Rafhael")
      .should('have.value', "Rafhael")
      .clear()
      .should('have.value', "")
    cy.get("#lastName")
      .type("Milanes Silva")
      .should('have.value', "Milanes Silva")
      .clear()
      .should('have.value', "")
    cy.get("#email").should("have.value", "")
    cy.get("#email")
      .type("rafhaelmilanes@gmail.com", {delay:0})
      .should('have.value', "rafhaelmilanes@gmail.com")
      .clear()
      .should('have.value', "")
  });
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  });
  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()
  });
  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', "youtube")
  });
  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', "mentoria")
  });
  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
     .select(1)
     .should('have.value', "blog")
  });
  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[value="feedback"]')
      .check()
      .should('have.value', "feedback")
  });
  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(function($radio){
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
  });
  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  });
  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json')
      .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
      })
  });
  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type="file"]')
    .should('not.have.value')
    .selectFile('./cypress/fixtures/example.json', {action:"drag-drop"})
    .should(function($input){
      expect($input[0].files[0].name).to.equal('example.json')
    })
  });
  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]')
      .selectFile('@sampleFile')
    .should(function($input){
      expect($input[0].files[0].name).to.equal('example.json')
    })
  });
  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
  });
  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()
    cy.contains('Talking About Testing').should('be.visible')
  });
  it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })
})
