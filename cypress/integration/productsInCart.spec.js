/// <reference types="cypress" />

context('COMPRAR DOS PRODUCTOS CON RECOJO EN TIENDA', () => {
	it('Producto terminado y producto tipo servicio', () => {
		cy.AddProductWithStock();
		cy.AddProductService();
		cy.get('[data-cy="make-order"]')
			.click();
		cy.login();
		cy.SelectDeliveryHome();
		cy.FillResponsibleForm();
		cy.SelectAddress();
		
	});
})