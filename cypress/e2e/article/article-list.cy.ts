describe("Пользователь заходит на страницу со списком статей", () => {
    beforeEach(() => {
        cy.login().then(() => {
            cy.visit("articles");
        });
    });
    it("и статьи успешно подгружаются", () => {
        cy.getByTestId("ArticleList").should("exist");
        cy.getByTestId("ArticleListItem").should("have.length.greaterThan", 3);
    });
    it("на стабах (фикстурах)", () => {
        cy.intercept("GET", "**/articles?*", {
            fixture: "articles.json",
        });
        cy.getByTestId("ArticleList").should("exist");
        cy.getByTestId("ArticleListItem").should("have.length.greaterThan", 3);
    });
    it.skip("Пример заскипанного теста", () => {
        cy.getByTestId("ArticleList").should("exist");
        cy.getByTestId("ArticleListItem").should("have.length.greaterThan", 3);
        cy.getByTestId("fdsafsadf").should("exist");
    });
});
