import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// https://na4.docusign.net/Signing/?ti=c70b0a31c5b341b5a0c943d076e35937
Given("A web browser is at the saucelabs login page", () => {
  const serverId = "fp3iq6ol";
  const recipientEmailAddress = "joined-substance@fp3iq6ol.mailosaur.net";
  cy.visit("https://www.index.hr/");
  cy.intercept("GET", "**/Signing/?ti**", {}).as("docIntercept");

  cy.mailosaurGetMessage(
    serverId,
    {
      sentTo: recipientEmailAddress,
    },
    {
      receivedAfter: new Date(2020, 1, 3),
    }
  ).then((email) => {
    console.log("pinged mailosaur inbox!");
    const docusignLink = email.html.links[0].href;
    const urlObject = new URL(docusignLink);
    console.log({ docusignLink });
    cy.origin(
      urlObject.hostname,
      { args: { docusignLink } },
      ({ docusignLink }) => {
        cy.visit(docusignLink);
      }
    );
  });
});

When(
  "A user enters the username {string}, the password {string}, and clicks on the login button",
  (username, password) => {}
);

When(
  "A user provides incorrect credentials, and clicks on the login button",
  (table) => {}
);

Then("the url will contains the inventory subdirectory", () => {});

Then("The error message {string} is displayed", (errorMessage) => {});
