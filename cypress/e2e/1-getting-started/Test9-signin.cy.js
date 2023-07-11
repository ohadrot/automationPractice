
import SignIn from "../../support/pageObject/signIn";
import ShopPage from "../../support/pageObject/shopPage";
import CheckOutPage from "../../support/pageObject/CheckOutPage";
/// <reference types="Cypress" />
describe('my first test',function(){
    before(()=>{
        cy.fixture('example').then(function(data){
            this.data =data;
        })
    })
    it('signIn test',function(){
        const signIn = new SignIn();
        const shopPage = new ShopPage();
        const checkOut = new CheckOutPage();
        cy.visit(Cypress.env('url'));
        // Cypress.config('defaultCommandTimeout',8000);
        signIn.getNameInput().type('ohad');
        signIn.getEmailInput().type('ohad@svcolleg.co.il');
        signIn.getShopPageButton().click();
        this.data.productsNames.forEach((val)=>{
            
            cy.selectProduct(val);
        }) 
        shopPage.getCheckOutButton().click();
        cy.wait(2000);
        // checkOut.getContinueShopingButton().click();
        cy.get('button.btn.btn-success').click()
        cy.get('#country').type('italy');
        cy.wait(2000)
        cy.get('.suggestions > ul > li > a').click();
        cy.get('#checkbox2').click({force:true});
        cy.get('input[type=submit]').click();
        cy.get('.alert').then((el)=>{
            let result = el.text();
            expect(result.includes('Success')).to.be.true
        })
    })
})