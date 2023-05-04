import { Article } from "../../../src/entities/Article";

const defaultArticle = {
    title: "testing article",
    subtitle: "БиологиЯ",
    img: "https://naked-science.ru/wp-content/uploads/2017/09/field_image_biolog_2017.jpg",
    views: 1022,
    createdAt: "26.02.2022",
    userId: "1",
    type: ["SCIENCE"],
    blocks: [],
};

export const createArticle = (article?: Article) => {
    return cy
        .request({
            method: "POST",
            url: `http://localhost:8000/articles`,
            headers: { Authorization: "asdas" },
            body: article ?? defaultArticle,
        })
        .then(({ body }) => body);
};

export const removeArticle = (articleId: string) => {
    return cy.request({
        method: "DELETE",
        url: `http://localhost:8000/articles/${articleId}`,
        headers: { Authorization: "asdas" },
    });
};

declare global {
    namespace Cypress {
        interface Chainable {
            createArticle(article?: Article): Chainable<Article>;
            removeArticle(articleId: string): Chainable<void>;
        }
    }
}
