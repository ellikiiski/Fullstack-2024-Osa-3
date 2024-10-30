const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(cors())

let persons = [
    {
        "id": "1",
        "name": "elppa koo",
        "number": "666"
    },
    {
        "id": "2",
        "name": "jerppa pee",
        "number": "381"
    },
    {
        "id": "3",
        "name": "jenppa vee",
        "number": "123"
    },
    {
        "id": "4",
        "name": "erppa rää",
        "number": "345"
    },
    {
        "id": "5",
        "name": "irppa lää",
        "number": "222"
    },
    {
        "id": "6",
        "name": "pimppi vee",
        "number": "112"
    },
    {
        "id": "7",
        "name": "viippa wee",
        "number": "365"
    },
    {
        "id": "8",
        "name": "eppa pee",
        "number": "987"
    }
]

morgan.token('body', (request, response) => {
    return request.method == 'POST' && request.body
    ? JSON.stringify(request.body)
    : ''
})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/', (request, response) => {
    response.send('<h2>Puhelinluettelon bäkkäri, tervetuloa!</h2>')
})

app.get('/info', (request, response) => {
    const time = new Date()
    const number = persons.length
    const text = `<p>Phonebook has info for ${number} people.<br>${time}</p><br>`
    
    response.send(text)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(p => p.id == id)
    
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(p => p.id != id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const person = request.body

    if (!person.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }

    if (!person.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }

    if (persons.some(p => p.name == person.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    person.id = String(Math.floor(Math.random() * 123456789))
    persons = persons.concat(person)

    response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`)
})


