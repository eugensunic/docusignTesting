/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('example to-do app', () => {
  // beforeEach(() => {
  //   // Cypress starts out with a blank slate for each test
  //   // so we must tell it to visit our website with the `cy.visit()` command.
  //   // Since we want to visit the same URL at the start of all our tests,
  //   // we include it in our beforeEach function so that it runs before each test
  //   cy.visit('https://example.cypress.io/todo')
  // })

  it('displays two todo items by default', () => {
    const serverId = 'fp3iq6ol'
    const recipientEmailAddress = 'whispered-ice@fp3iq6ol.mailosaur.net'
    cy.visit('https://coffeetocup.com');
    cy.intercept('GET', '**/Signing/?ti**', { fixture: `docusign.html` }).as('docIntercept')
  
    cy.mailosaurGetMessage(serverId, {
      sentTo: recipientEmailAddress
    }, {
      receivedAfter: new Date(2020, 1, 3)
    }).then(email => {
      console.log('pinged mailosaur inbox!')
      const docusignLink = email.html.links[0].href;
      const urlObject = new URL(docusignLink)
      console.log({ docusignLink });
      cy.origin(urlObject.hostname, { args: { docusignLink } }, ({ docusignLink }) => {
        cy.visit(docusignLink);
      })
    })
  })
})
