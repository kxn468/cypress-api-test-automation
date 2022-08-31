let fakeUser

describe('Given the POST Products api', () => {
  beforeEach(() => {
    cy.task('freshUser').then((user) => {
      fakeUser = user
      cy.log(JSON.stringify(fakeUser))
    })
  })

  context('When I send POST /usuarios', () => {
    it('Then it should create a new user', () => {
      cy.request({
        method: 'POST',
        url: '/usuarios',
        body: fakeUser
      }).should((response) => {
        cy.log(JSON.stringify(response.body))
        expect(response.status).to.eq(201)
        expect(response.body.message).eq('Cadastro realizado com sucesso')
        expect(response.body).to.have.all.keys('message', '_id')
      })
    })
  })
})
