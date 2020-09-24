/// <reference types="cypress" />

context('COMPRAR DOS PRODUCTOS - ENVIO A DOMICILIO', () => {
	it('Producto terminado y producto tipo servicio - Sin factura - Pago al recibir', () => {
		cy.CheckIfThereIsProductServices();
		cy.AddProductWithStock();
		cy.AddProductService();
		cy.get('[data-cy="make-order"]')
			.click();
		cy.login();
		cy.SelectDeliveryHome();
		cy.FillResponsibleForm();
		cy.SelectAddress();
		cy.get('[data-cy="go-pay"]')
			.click();
		cy.get('[data-cy="Pago al recibir"]')
			.click();
		let subtotal = 0;
		let discount = 0;
		let shipping = 0;
		let total = 0;
		cy.get('[data-cy="subtotal"]')
			.should((el) => {
				[subtotal] = /[0-9]+/i.exec(el[0].innerText);
			});
		cy.get('[data-cy="discount"]')
			.should((el) => {
				[discount] = /[0-9]+/i.exec(el[0].innerText);
			});
		cy.get('[data-cy="shipping"]')
			.should((el) => {
				[shipping] = /[0-9]+/i.exec(el[0].innerText);
			});
		cy.get('[data-cy="total"]')
			.should((el) => {
				[total] = /[0-9]+/i.exec(el[0].innerText);
			});
		cy.get('[data-cy="pay"]')
			.click();
	});
})