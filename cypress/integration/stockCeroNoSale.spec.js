/// <reference types="cypress" />

context('VERIFICAR CANTIDAD Y STOCK DISPONIBLE', () => {
	it('Producto terminado sin stock no va a carrito de compras', () => {
		cy.ProductsDetailPage(1092910); // sun7 producto sin stock
		cy.get('@ProductDetail').its('body').then((res) => {
			const { stockWarehouse } = res;
			expect(stockWarehouse).to.be.eq(0);
		});
		cy.get('[data-cy="add-to-cart"]')
			.should('exist')
			.click({ force: true });
		cy.get('[data-cy="go-to-cart"]')
			.should('not.exist');
	});

	it('Producto servicio sin stock al carrito de compras', () => {
		cy.ProductsDetailPage(1093074); // sun7 producto sin stock
		cy.get('@ProductDetail').its('body').then((res) => {
			const { stockWarehouse, type } = res;
			expect(stockWarehouse).to.be.eq(0);
			expect(type).to.be.eq(2);
		});
		cy.get('[data-cy="add-to-cart"]')
			.should('exist')
			.click({ force: true });
		cy.get('[data-cy="go-to-cart"]')
			.should('exist');
	});
})