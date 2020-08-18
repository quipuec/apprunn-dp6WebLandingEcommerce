/// <reference types="cypress" />

context('AGREGAR PRODUCTOS AL CARRITO DE COMPRAS', () => {
	beforeEach(() => {
		cy.login();
	})
	it('Buscar y seleccionar un MANGO', () => {
		cy.get('[data-cy="inputSearcher"]')
			.should('exist')
			.type('mango{enter}')
			.wait(1000);
		cy.get('[data-cy="productsSection"]')
			.should('exist')
			.children()
			.eq(0)
			.click();
	})
})