/// <reference types = 'Cypress'/> 


describe('POST user request', ()=>{

    // Token salvo em fixture
    let auth;
    beforeEach(()=>{
        cy.fixture('token').then((token)=>{
            auth = token
        })
    })

    it('Create new user', ()=>{

        // Gerador de email aleatorio
        let pattern = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let randomtext = '';
        for (let i = 0; i < 10; i++)
        randomtext+= pattern.charAt(Math.floor(Math.random()*pattern.length)); 
        let email = randomtext + '@email.com'

        // 1. POST Request
        cy.request({
            method : 'POST',
            url :'https://gorest.co.in/public/v2/users',
            headers : {
                'authorization' : auth.token
            },
            body: {
                "name":"John Smith", 
                "gender":"male", 
                "email": email, 
                "status":"active"
            }
        }).then((res)=>{
            // Ver body do response
            cy.log(JSON.stringify(res.body))
            // Asserções
            expect(res.status).to.eq(201)
            expect(res.body).has.property("name","John Smith")
            expect(res.body).has.property("gender","male")
            expect(res.body).has.property("email", email)
            expect(res.body).has.property("status","active")
        }).then((res)=>{
            // Salvar o ID do usuario
            const userId = res.body.id
            // 2. GET created user 
            cy.request({
                method : 'GET',
                url :'https://gorest.co.in/public/v2/users/'+userId,
                headers : {
                    'authorization' : auth.token
                }
            }).then((res)=>{
                // Ver body do response
                cy.log(JSON.stringify(res.body))
                // Asserções               
                expect(res.status).to.eq(200)
                expect(res.body).has.property("id",userId)
                expect(res.body).has.property("name","John Smith")
                expect(res.body).has.property("email", email)
                expect(res.body).has.property("status","active")
            })
        })
    })
})