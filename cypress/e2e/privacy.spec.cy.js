it('testa a página da politica de privacidade de dorma independente', () => {
    cy.visit('./src/privacy.html')
    cy.contains('Talking About')
});