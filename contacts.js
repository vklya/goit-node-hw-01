const fs = require('fs/promises');
const path = require('path');
const shortid = require('shortid');

const contactsPath = path.join(__dirname, '/db/contacts.json');

async function listContacts() {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
}

async function getContactById(id) {
    const contacts = await listContacts();
    const contact = contacts.find(item => item.id === id);
    return contact || null;
}

async function removeContact(id) {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === id);
    if (index === -1) return null;
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
}

async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = {
        id: shortid.generate(),
        name,
        email,
        phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}