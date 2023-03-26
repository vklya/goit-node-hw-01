const { program } = require('commander');
const contacts = require('./contacts');

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case "list":
            const allContacts = await contacts.listContacts();
            console.log('All contacts:', allContacts);
        break;

        case "get":
            const oneContact = await contacts.getContactById(id);
            console.log(`Contact with id ${id}: `, oneContact);
        break;

        case "add":
            const newContact = await contacts.addContact(name, email, phone);
            console.log('New contact: ', newContact);
        break;

        case "remove":
            const deleteContact = await contacts.removeContact(id);
            console.log('Deleted contact: ', deleteContact);
        break;

        default:
        console.warn("\x1B[31m Unknown action type!");
    }
}

program
    .option('-a, --action <type>')
    .option('-i, --id <type>')
    .option('-n, --name <type>')
    .option('-e, --email <type>')
    .option('-p, --phone <type>');

program.parse();

const options = program.opts();
invokeAction(options)