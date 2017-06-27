import test from 'ava'
import Main from './index'
import User from './user'
import Task from './task'

/*
Tests are consuming a lot of my development time so I will need to delay further tests
*/

test.before(t => {
  return User.insertUser({ id: '123456abcdef' })
})

test.afterEach.always(t => {
  return Main.none(`TRUNCATE tasks RESTART IDENTITY CASCADE`)
})

test.after(t => {
  return Main.none(`TRUNCATE users RESTART IDENTITY CASCADE`).then(() => `TRUNCATE tasks RESTART IDENTITY CASCADE`)
})

test('Does not throw error when creating a new task with valid params', t => {
  return t.notThrows(Task.insertTask({ description: 'Buy milk, veggies, meat, bread, grapes, and watermelon at Safeway', user_id: '123456abcdef' }))
})

test('Retrieve new task by id', t => {
  return Task.insertTask({ description: 'Buy milk, veggies, meat, bread, grapes, and watermelon at Safeway', user_id: '123456abcdef' })
  .then(() => Task.selectTaskById({ id: 1 }))
  .then(task => {
    t.truthy(task)
  })
})

test('Retrieve all users tasks', t => {
  return Task.insertTask({ description: 'Buy milk, veggies, meat, bread, grapes, and watermelon at Safeway', user_id: '123456abcdef' })
  .then(() => Task.selectTasks({ user_id: '123456abcdef' }))
  .then(tasks => {
    t.is(tasks[0], 'Buy milk, veggies, meat, bread, grapes, and watermelon at Safeway')
  })
})

test('Marks task as complete', t => {
  return Task.insertTask({ description: 'Buy milk, veggies, meat, bread, grapes, and watermelon at Safeway', user_id: '123456abcdef' })
  .then(() => Task.markAsComplete({ id: 1 }))
  .then(() => Task.selectTaskById({ id: 1 }))
  .then(task => t.truthy(task.completed))
})
