/// <reference types="cypress" />

context('login', () => {
	it('Does not do much!', () => {
		cy.visit('localhost:9010');
		cy.get('[data-cy="loginBtn"]')
			.find('.icon-desktop')
			.click();
	})
})