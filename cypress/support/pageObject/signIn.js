class SignIn{

    getNameInput(){
        return cy.get('input[name=name]:nth-child(2)');
    }
    getEmailInput(){
        return cy.get('input[name=email]');
    }
    getShopPageButton(){
        return cy.get('.navbar-nav li:nth-child(2)')
    }
}

export default SignIn;