describe('Given the GET Users api', () => {
  context('GET /WeatherForecast', () => {
    it('should return a list with all WeatherForecast', () => {
      cy.request({
        method: 'GET',
        url: '/WeatherForecast'
      }).should((response) => {
        cy.log(JSON.stringify(response.body))
        expect(response.status).to.eq(200)
      })
    })
  })
})
