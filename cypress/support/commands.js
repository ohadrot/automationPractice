// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })


Cypress.Commands.add('selectProduct',(productName)=>{
    cy.get('.card-title').each(($el,idx)=>{
        if($el.text().includes(productName))
            cy.get('.btn.btn-info').eq(idx).click();

    })
})

Cypress.Commands.add('chooseNumOfProductRand',(numOfProduct,arr)=>{
    let tempArr = [];
    cy.get('.product:visible').then((res)=>{
        for(let i =0; i< numOfProduct; i++){
        let rand = Math.floor(Math.random()*res.length);
        if(tempArr.includes(rand))
        {
            i--;
            continue;
        }
        else{
            tempArr.push(rand);
        }
        cy.get('.product:visible .product-name').eq(rand).then((ele)=>{
            arr.push(ele.text());
        })
        }
    })
})

Cypress.Commands.add('selectProductFromArr',(arr)=>{
    arr.forEach((val)=>{
        cy.get('.product').each(($el)=>{
            const temp = $el.find('h4.product-name').text();
            if(temp.includes(val))
            cy.wrap($el).contains('ADD TO CART').click();
        })
    })
})
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })