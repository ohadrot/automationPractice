/// <reference types="Cypress" />
// מגריל כמות של מוצר בוחר אותו כמספר הפעמים שהוגרלו ובודק את המחיר
describe('my first test',function(){
    it('my validAllPrice',function(){
        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
        cy.wait(1000)
        let price;
        let sumOfProduct;
        let temp;
        let allProduct=[];
        let pickProduct = [];

        // pick one product:
        cy.get('.products:visible').find('.product').each(($el,index,$list)=>{
            temp = $el.find('h4.product-name').text();
            price = $el.find('.product-price').text();
            allProduct.push({productName: temp, productPrice: price})
        }).then(()=>{
            for(let i = 0; i<3; i++)
            {
            let randProduct = Math.floor(Math.random()*allProduct.length);
            pickProduct.push({productName: allProduct[randProduct].productName, price:Number(allProduct[randProduct].productPrice),amount: 0});
            }
        })


        // start te test:
        let sum = 0;
        cy.get('.products .product').each(($el)=>{
            const temp = $el.find('.product-name').text();
            for(let i =0; i<pickProduct.length; i++)
            {
            if(temp.includes(pickProduct[i].productName))
            {
                price = $el.find('.product-price').text();
                sumOfProduct = Math.floor(Math.random()*5);
                sum += pickProduct[i].price * (sumOfProduct+1)
                pickProduct[i].amount = Number(sumOfProduct+1);
                for(let i =0; i< sumOfProduct; i++)
                {
                    cy.wrap($el).contains('+').click();
                }
                cy.wrap($el).contains('ADD TO CART').click();

            }
        }
        }).then(()=>{
            cy.get('.cart .cart-info tr:nth-child(2) strong').then((total)=>{
                let totalPrice = Number(total.text());
               
                expect(totalPrice).to.equal(sum);
                

                /// second page:
                cy.get('.cart-icon').click()
                cy.get('button').contains('PROCEED TO CHECKOUT').click();
                cy.wait(1000);

                //chack table:

                pickProduct.forEach((val)=>{
                    cy.get('table[class = cartTable] td:nth-child(2)').each(($el)=>{
                        if($el.text().includes(val.productName))
                        {
                            let amount = $el.next().text();
                            let price = $el.next().next().text();
                            let totalForProduct = $el.next().next().next().text();
                            expect(Number(amount)).to.equal(val.amount);
                            expect(Number(price)).to.equal(val.price);
                            expect(Number(totalForProduct)).to.equal(amount*price);
                            
                        }
                    })
                })
                // check final price:
                cy.get('.totAmt').then((total)=>{
                    expect(Number(total.text())).to.equal(totalPrice)
                })

                // third page
                cy.contains('button', 'Place Order').click()
                cy.get('select').select('Israel');
                cy.get('input[type=checkbox]').check();
                cy.contains('button', 'Proceed').click();

            })
            
            
        })
        
    })
})