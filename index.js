const argv = require('yargs').argv;
const contactsOperations = require('./contacts');

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      contactsOperations.listContacts()
        .then(contacts => console.table(contacts))
        .catch(console.error);
      break;

    case 'get':
      contactsOperations.getContactById(id)
        .then(contact => {
          if (!contact) {
            console.log('Contact not found');
            return;
          }
          console.log(contact);
        })
        .catch(console.error);
      break;

    case 'add':
      contactsOperations.addContact(name, email, phone)
        .then(contact => console.log('Added contact:', contact))
        .catch(console.error);
      break;

    case 'remove':
      contactsOperations.removeContact(id)
        .then(contact => {
          if (!contact) {
            console.log('Contact not found');
            return;
          }
          console.log('Removed contact:', contact);
        })
        .catch(console.error);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
