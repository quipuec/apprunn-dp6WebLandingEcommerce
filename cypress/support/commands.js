// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add('login', () => {
	cy.fixture('fenix-dev.json').then(({ email, password }) => {
		cy.visit('localhost:9010');
		cy.get('[data-cy="loginBtn"]')
			.find('.icon-desktop')
			.click();
		cy.get('[data-cy="appButtonLogin"]')
			.should('exist')
			.click();
		cy.get('[data-cy="inputEmail"]')
			.should('exist')
			.type(email);
		cy.get('[data-cy="inputPassword"]')
			.should('exist')
			.type(password);
		cy.get('[data-cy="loginBtnAction"]')
			.should('exist')
			.click();
	});
});

Cypress.Commands.add('SelectProductWithStockFromHome', () => {
	cy.visit('localhost:9010');
	cy.get('[data-cy="productsSection"]')
		.should('exist')
		.children()
		.eq(0)
		.click();
		// .children().then(($children) => {
		// 	let clicked = false;
		// 	const len = $children.length;
		// 	if (len > 0) {
		// 		while (!clicked) {
		// 			let i = 0;
		// 			const currentChild = $children[i];
		// 			cy.wrap(currentChild).find('.without-stock-tag').should('exist');
		// 			debugger;
		// 			if (res) {
		// 				i += 1;
		// 			} else {
		// 				cy.wrap(currentChild).click();
		// 				clicked = true;
		// 			}
		// 		}
		// 	}
		// });
});
