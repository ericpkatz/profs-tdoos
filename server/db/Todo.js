const Sequelize = require('sequelize')
const db = require('./db')

const Todo = db.define('todos', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  taskName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  assignee: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Todo
