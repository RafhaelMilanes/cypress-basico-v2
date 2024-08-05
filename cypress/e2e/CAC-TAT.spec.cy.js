/// <reference types="cypress"/>

const { it } = require("mocha")

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicaçao', function(){
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('prenche os campos obrigatorios e envia o formulário', function(){
        const longText = 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos.Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos.'
        
        cy.get('#firstName').type("Rafhael")
        cy.get('#lastName').type("Milanes")
        cy.get('#email').type("rafhael@gmail.com")
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.get('#firstName').type("Rafhael")
        cy.get('#lastName').type("Milanes")
        cy.get('#email').type("rafhael@gmai,com")
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('campo telefone confinua vazio quandfo preenchido com valor não númerico', function(){
        cy.get('#phone')
            .type('abcde')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type("Rafhael")
        cy.get('#lastName').type("Milanes")
        cy.get('#email').type("rafhael@gmai.com")
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
            .type("Rafhael")
            .should('have.value', 'Rafhael')
            .clear()
            .should('have.value', '')

        cy.get('#lastName')
            .type("Milanes")
            .should('have.value', 'Milanes')
            .clear()
            .should('have.value', '')

        cy.get('#email')
            .type("rafhael@gmai.com")
            .should('have.value', 'rafhael@gmai.com')
            .clear()
            .should('have.value', '')

        cy.get('#phone')
            .type("619999332928")
            .should('have.value', '619999332928')
            .clear()
            .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('envia o formulario com sucesso usando comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function() {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })
    
    it('seleciona um produto (mentoria) por seu valor (value)', function() {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    });

    it('seleciona o produto BLOG pelo seu indice', () => {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    });
    it('marca o tipo de atendimento "feedback"', () => {
        cy.get('#support-type > :nth-child(4)')
            .click()
    });

    it('marca cada tipo de atendimento', () => {

        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    });

    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]')
            .check()
            .last()
            .uncheck()
            .should('not.be.checked')
    });

    it('seleciona o arquivo da pasta fixtures', () => {
        cy.get('input[type="file"')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    });

    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', {action:'drag-drop'})
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    });

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture("example.json").as('sampleFile')
        cy.get('input[type="file"')
            .selectFile('@sampleFile')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    });

    it('verifica que a politica de privacidade abre em outra aba', () => {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    });

    it('acessa a página da plitica de privacidade removendo o target e então clicando no link', () => {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
        cy.contains('Talking About')
    });

    it.only('testa a página da política de privacidade de forma independente', () => {
        
    });

})