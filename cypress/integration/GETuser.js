/// <reference types = 'Cypress'/> 


describe('GET users', ()=>{
    
    let auth;  
    beforeEach(()=>{
        cy.fixture('token').then((auth)=>{
        })
    })

    it('Get users list', ()=>{
        cy.request({
            method : 'GET',
            url :'https://gorest.co.in/public/v2/users',
            headers : {
                'authorization' : auth.token
            }
        }).then((res)=>{
            expect(res.status).to.eq(200)
        })
    })

    it('Get user by ID', ()=>{
        cy.request({
            method : 'GET',
            url :'https://gorest.co.in/public/v2/users/2744',
            headers : {
                'authorization' : auth.token
            }
        }).then((res)=>{
            expect(res.status).to.eq(200)
            expect(res.body.name).to.eq("Chidananda Kaniyar II")
        })
    })
});