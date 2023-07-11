/// <reference types="Cypress" />
//check if its find all the products by the a,c,b
describe('allProductTest',function(){
    it('my firstTest case',function(){
        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
        cy.wait(2000);
        let allProduct = [];
        let temp='';
        cy.get('.products:visible').find('.product').each(($el,index,$list)=>{
            temp = $el.find('h4.product-name').text();
            // if(temp.includes('-'))
            //     temp = temp.substring(0,temp.indexOf('-')-1)
            allProduct.push(temp)
        }).then(()=>{
            for(let i =0; i< 26; i++) // run from 'a' to 'z'
            {
                let char =String.fromCharCode(97 + i);
                cy.get('.search-keyword').type(char);
                cy.wait(2000);
                let productNum = allProduct.filter((val)=>val.indexOf(char)!=-1 ||val.indexOf(char.toUpperCase())!=-1)
                cy.get('.product:visible').should('have.length',productNum.length)
                cy.get('.search-keyword').clear()
            }
        });
        // console.log(allProduct)
        // cy.log('cy:')
        // cy.log(allProduct)
        // console.log(allProduct)

        // allProduct.filter((val)=>{console.log(val)})
      
    })
})