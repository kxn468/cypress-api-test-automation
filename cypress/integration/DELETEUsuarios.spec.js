let fakeUser

describe('Given the DELETE Users api', () => {
  beforeEach(() => {
    cy.task('freshUser').then((user) => {
      fakeUser = user
      cy.log(JSON.stringify(fakeUser))
    })
  })

  context('When I send DELETE /usuarios', () => {
    it('Then it should delete the existing user', () => {
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
          method: 'DELETE',
          url: `/usuarios/${response.body._id}`
        }).should((response) => {
          cy.log(JSON.stringify(response.body))
          expect(response.status).to.eq(200)
          expect(response.body.message).eq('Registro excluído com sucesso')
          expect(response.body).to.have.all.keys('message')
        })
      })
      
    })

    it('Then it should not delete the non existing user', () => {
      cy.request({
        method: 'DELETE',
        url: '/usuarios/testuser123',
      }).should((response) => {
        cy.log(JSON.stringify(response.body))
        expect(response.status).to.eq(200)
        expect(response.body.message).to.eq('Nenhum registro excluído')
      })
    })
  })
})

