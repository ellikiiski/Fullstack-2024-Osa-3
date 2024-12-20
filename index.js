const express = require('express')
const app = express()

require('dotenv').config()

const Contact = require('./models/contact')

app.use(express.static('dist'))

const cors = require('cors')
app.use(cors())

const morgan = require('morgan')

/* eslint-disable no-unused-vars */
morgan.token('body', (request, response) => {
  return request.method === 'POST' && request.body
    ? JSON.stringify(request.body)
    : ''
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.get('/', (request, response) => {
  response.send('<h2>Puhelinluettelon bäkkäri, tervetuloa!</h2>')
})

app.get('/info', (request, response) => {
  Contact.find({}).then(contacts => {
    const time = new Date()
    const number = contacts.length
    const text = `<p>Phonebook has info for ${number} people.<br>${time}</p><br>`
    response.send(text)
  })
})

app.get('/api/persons', (request, response) => {
  Contact.find({}).then(contacts => {
    response.json(contacts)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Contact.findById(request.params.id)
    .then(contact => {
      if (contact) {
        response.json(contact)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Contact.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => {
      next(error)
    })
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const contact = new Contact({
    name: body.name,
    number: body.number
  })

  contact.save()
    .then(savedContact => {
      response.json(savedContact)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const contact = {
    name: body.name,
    number: body.number
  }

  Contact.findByIdAndUpdate(
    request.params.id,
    contact,
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedContact => {
      response.json(updatedContact)
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`)
})
