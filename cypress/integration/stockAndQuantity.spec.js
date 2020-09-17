/// <reference types="cypress" />

context('VERIFICAR CANTIDAD Y STOCK DISPONIBLE', () => {
	beforeEach(() => {
		cy.SelectProductWidthStockFromHome();
	})
	it('Verificar que la cantidad no supere Stock', () => {
		cy.get('[data-cy="more-quantity"]')
			.should('exist');
	})
})