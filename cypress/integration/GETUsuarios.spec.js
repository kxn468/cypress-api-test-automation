describe('Given the GET Users api', () => {
  context('GET /usuarios', () => {
    it('should return a list with all usuarios', () => {
      cy.request({
        method: 'GET',
        url: '/usuarios'
      }).should((response) => {
        cy.log(JSON.stringify(response.body))
        expect(response.status).to.eq(200)
        cy.get(response.body.usuarios).each((user) => {
          expect(user).to.have.all.keys(
            'nome', 'email', 'password', 'administrador', '_id'
          )
        })
      })
    })
  })
})
