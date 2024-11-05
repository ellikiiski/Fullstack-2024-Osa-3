const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://ellikiiski:${password}@fullstack-2024.khi9y.mongodb.net/contactApp?retryWrites=true&w=majority&appName=fullstack-2024`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Contact = mongoose.model('Contact', contactSchema)

if (process.argv.length > 3) {
    newName = process.argv[3]
    newNumber = process.argv[4]
    const contact = new Contact({
        name: newName,
        number: newNumber
    })
    contact.save().then(result => {
        console.log(`${newName} (${newNumber}) added to phonebook!`)
        mongoose.connection.close()
    })
} else {
    Contact.find({}).then(result => {
        console.log(`phonebook:`)
        result.forEach(contact => {
            console.log(`${contact.name}: ${contact.number}`)
        })
        mongoose.connection.close()
    })
}

// Legacy of initial saving of the contacts
/*
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

const promises = persons.map(info => {
    const contact = new Contact({
        name: info["name"],
        number: info["number"]
    })
    return contact.save().then(result => {
        console.log(`${contact.name} saved!`)
    })
})

Promise.all(promises).then(() => {
    mongoose.connection.close()
})
*/