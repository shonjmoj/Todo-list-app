describe("template spec", () => {
  it("Login with no user created", () => {
    cy.visit("/login");
    cy.contains("Login");
    cy.get("input[type='text']").type("username");
    cy.get("input[type='password']").type("password");
    cy.get("button")
      .click()
      .then(() => {
        expect(cy.contains("Can't find user with that username")).to.exist;
      });
    cy.contains("Sign up").click();
  });
  it("Signup as a username", () => {
    cy.visit("/signup");
    cy.contains("Sign up");
    cy.get("input[type='text']").type("username");
    cy.get("input[type='password']").type("password");
    cy.get("button").click();
  });
  it("Login with user created as 'username'", () => {
    cy.visit("/login");
    cy.contains("Login");
    cy.get("input[type='text']").type("username");
    cy.get("input[type='password']").type("password");
    cy.get("button").click();
  });
  it("Logout", () => {
    cy.visit("/login");
    cy.contains("Login");
    cy.get("input[type='text']").type("username");
    cy.get("input[type='password']").type("password");
    cy.get("button").click();
    cy.get("button").contains("Log out").click();
  });
  it("Login with 'username' user", () => {
    cy.visit("/login");
    cy.contains("Login");
    cy.get("input[type='text']").type("username");
    cy.get("input[type='password']").type("password");
    cy.get("button").click();
  });
});
