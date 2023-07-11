/// <reference types="Cypress" />
// מגריל כמות של מוצר בוחר אותו כמספר הפעמים שהוגרלו ובודק את המחיר
describe('my first test',function(){
    it('my validPrice test',function(){
        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
        cy.wait(1000)
        let price;
        let sumOfProduct;
        let temp;
        let allProduct=[];
        let pickProduct = '';

        // pick one product:
        cy.get('.products:visible').find('.product').each(($el,index,$list)=>{
            temp = $el.find('h4.product-name').text();
            allProduct.push(temp)
        }).then(()=>{
            let randProduct = Math.floor(Math.random()*allProduct.length);
            pickProduct = allProduct[randProduct];
            cy.log(pickProduct);
            cy.wait(2000)
        })


        // start te test:
        cy.get('.products .product').each(($el)=>{
            const temp = $el.find('.product-name').text();
            if(temp.includes(pickProduct))
            {
                price = $el.find('.product-price').text();
                sumOfProduct = Math.floor(Math.random()*9);
                cy.log(sumOfProduct)
                for(let i =0; i< sumOfProduct; i++)
                {
                    cy.wrap($el).contains('+').click();
                }
                cy.wrap($el).contains('ADD TO CART').click();

            }
        }).then(()=>{
            cy.get('.cart .cart-info tr:nth-child(2) strong').then((total)=>{
                let totalPrice = Number(total.text());
                expect(totalPrice).to.equal((sumOfProduct+1)* price);

                /// second part:
                cy.get('.cart-icon').click()
                cy.get('button').contains('PROCEED TO CHECKOUT').click();
                cy.wait(1000);
                cy.get('.totAmt').then((total)=>{
                    expect(Number(total.text())).to.equal(totalPrice)
                })
            })
            
            
        })
        
    })
})