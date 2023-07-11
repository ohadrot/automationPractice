/// <reference types="Cypress" />
// לבחור מוצרים באופן רנדומלי ולבדוק את הסכום הכולל בעמוד הראשון
describe('my first test',function(){
    it('my firstTest case',function(){
        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
        cy.wait(2000)
        let selectProduct =[];
        // choose how much products do you want select randomly:
        cy.chooseNumOfProductRand(2,selectProduct).then(()=>{cy.selectProductFromArr(selectProduct)})
        cy.get('.cart-icon').click();
        let sum = 0;
        cy.get('.cart-items li .product-total .amount:nth-child(2)').each(($el)=>{
            let price = $el.text()
            sum+= Number(price);
        }).then(()=>{
            sum/=2;
            cy.log(sum);
        })
      
    })
})