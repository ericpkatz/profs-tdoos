const db = require('./db')
const Todo = require('./Todo')

const syncAndSeed = async () => {
  await db.sync({force: true})

  await Todo.create({
    taskName: 'Buy dog food',
    assignee: 'Cody'
  })

  await Todo.create({
    taskName: 'Take over world',
    assignee: 'Cody'
  })
}

module.exports = {
  syncAndSeed,
  db,
  Todo
}
