let fakeUser
let modifiedUser

describe('Given the PUT Users api', () => {
  beforeEach(() => {
    cy.task('freshUser').then((user) => {
      fakeUser = user
      modifiedUser = user
      cy.log(JSON.stringify(fakeUser))
    })
  })

  context('When I send PUT /usuarios', () => {
    it('Then it should update the existing user', () => {
      cy.request({
        method: 'POST',
        url: '/usuarios',
        body: fakeUser
      }).should((response) => {
        cy.log(JSON.stringify(response.body))
        expect(response.status).to.eq(201)
        expect(response.body.message).eq('Cadastro realizado com sucesso')
        expect(response.body).to.have.all.keys('message', '_id')

        cy.request({
          method: 'PUT',
          url: `/usuarios/${response.body._id}`,
          body: modifiedUser
        }).should((response) => {
          cy.log(JSON.stringify(response.body))
          expect(response.status).to.eq(200)
          expect(response.body.message).eq('Registro alterado com sucesso')
          expect(response.body).to.have.all.keys('message')
        })
      })
      
    })
  })
})
