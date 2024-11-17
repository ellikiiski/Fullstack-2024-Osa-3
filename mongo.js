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
  const newName = process.argv[3]
  const newNumber = process.argv[4]
  const contact = new Contact({
    name: newName,
    number: newNumber
  })
  /* eslint-disable no-unused-vars */
  contact.save().then(result => {
    console.log(`${newName} (${newNumber}) added to phonebook!`)
    mongoose.connection.close()
  })
} else {
  Contact.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(contact => {
      console.log(`${contact.name}: ${contact.number}`)
    })
    mongoose.connection.close()
  })
}