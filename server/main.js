const PORT = 8080
const server = require('./index')
const { syncAndSeed } = require('./db')

syncAndSeed()
  .then(() => {
    server.listen(PORT, () => console.log(`

        Listening on port ${PORT}

        http://localhost:${PORT}/

    `))
  })
