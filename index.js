const express = require('express')
const app = express()

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

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`)
})


