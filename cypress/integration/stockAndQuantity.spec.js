/// <reference types="cypress" />

context('VERIFICAR CANTIDAD Y STOCK DISPONIBLE', () => {
	beforeEach(() => {
		cy.SelectRandomProduct();
	});
	it('La cantidad no puede ser CERO en detalle de producto', () => {
		cy.location('pathname').then((pathname) => {
			const splitted = pathname.split('/');
			const slug = splitted[1];
			cy.visit(`http://localhost:9010/${slug}/detalle-producto`);
			cy.get('[data-cy="less-quantity"]')
				.should('exist')
				.click();
			cy.get('[data-cy="quantity-to-buy"]').should('contain', 1);
		});
	});

	it('Verificar que la cantidad no supere Stock en detalle de producto', () => {
		const slug = 1090512; // SHAMPOO HYS  ALIVIO INSTANTANEO 400ML
		cy.fixture('fenix-dev.json').then(({ token }) => {
			cy.visit(`http://localhost:9010/${slug}/detalle-producto`);
			cy.request({
				method: 'get',
				url: `https://products2.perudatos.com/products-public/${slug}`,
				headers: {
					Authorization: token,
				},
			}).as('ProductDetail');
			cy.get('@ProductDetail').its('body').then((res) => {
				const { stockWarehouse } = res;
				expect(stockWarehouse).to.be.gt(0);
				if (stockWarehouse) {
					for (let i = 0; i <= stockWarehouse + 1; i += 1) {
						cy.get('[data-cy="more-quantity"]')
							.should('exist')
							.click();
					}
				}
				cy.get('[data-cy="quantity-to-buy"]').should('contain', stockWarehouse);
			});
			cy.get('[data-cy="add-to-cart"]')
				.should('exist')
				.click({ force: true });
			cy.get('[data-cy="go-to-cart"]')
				.should('exist')
				.click({ force: true });
		});

		cy.fixture('fenix-dev.json').then(({ token }) => {
			let stockWarehouse = null;
			cy.visit(`http://localhost:9010/${slug}/detalle-producto`);
			cy.request({
				method: 'get',
				url: `https://products2.perudatos.com/products-public/${slug}`,
				headers: {
					Authorization: token,
				},
			}).as('ProductDetail');
			cy.get('@ProductDetail').its('body').then((res) => {
				stockWarehouse = res.stockWarehouse;
				cy.get('[data-cy="more-quantity"]')
					.should('exist')
					.click()
					.click();
				cy.get('[data-cy="add-to-cart"]')
					.should('exist')
					.click({ force: true });
				cy.get('[data-cy="go-to-cart"]')
					.should('exist')
					.click({ force: true });
				cy.get('[data-cy="product-in-car"]')
					.eq(0)
					.find('[data-cy="quantity-to-buy"]')
					.contains(stockWarehouse);
			});
		});
	});
})