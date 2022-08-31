describe('Give the GET Products api', () => {
  context('GET /produtos', () => {
    it('should return a list with all products', () => {
      cy.request({
        method: 'GET',
        url: '/produtos'
      }).should((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.quantidade).to.eq(2)
        expect(response.body.produtos.length).to.be.eq(2)
        cy.get(response.body.produtos).each((product) => {
          expect(product).to.have.all.keys(
            'nome', 'preco', 'descricao', 'quantidade', '_id'
          )
        })
      })
    })
  })
})
