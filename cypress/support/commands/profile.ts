export const updateProfile = (firstname: string, lastname: string) => {
    cy.getByTestId("EditableProfileCardHeader.EditButton").click();
    cy.getByTestId("ProfileCard.firstname").clear().type(firstname);
    cy.getByTestId("ProfileCard.lastname").clear().type(lastname);
    cy.getByTestId("EditableProfileCardHeader.SaveButton").click();
};

export const resetProfile = (profileId: string) => {
    return cy.request({
        method: "PUT",
        url: `http://localhost:8000/profile/${profileId}`,
        headers: { Authorization: "asdas" },
        body: {
            id: "4",
            name: "test",
            lastname: "user",
            age: 35,
            currency: "EUR",
            country: "Russia",
            city: "Moscow",
            username: "testuser",
            avatar: "https://plusworld.ru/upload/iblock/8c2/ei50hip33yphk7rd3n0ntrhr4vgxyc1u.png",
        },
    });
};

declare global {
    namespace Cypress {
        interface Chainable {
            updateProfile(firstname: string, lastname: string): Chainable<void>;
            resetProfile(profileId: string): Chainable<void>;
        }
    }
}
