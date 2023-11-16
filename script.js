  // Funktion för att återställa formuläret
  function resetForm() {
    document.getElementById('addContactForm').reset();
  }

  // Funktion för att visa meddelande om tomma värden
  function displayEmptyMessage() {
    document.getElementById('emptyMessage').style.display = 'block';
  }

  // Funktion för att gömma meddelande om tomma värden
  function hideEmptyMessage() {
    document.getElementById('emptyMessage').style.display = 'none';
  }

  // Lägg till en kontakt i tabellen
  function addContact(name, phone) {
    const newRow = document.createElement('tr');
    newRow.innerHTML = '<th scope="row">' + (document.getElementById('contact-list-body').childElementCount + 1) + '</th>' +
      '<td class="contact-name">' + name + '</td>' +
      '<td class="contact-phone">' + phone + '</td>' +
      '<td>' +
        '<button type="button" class="btn btn-warning btn-sm btn-edit">Ändra</button> ' +
        '<button type="button" class="btn btn-danger btn-sm btn-delete">Radera</button>' +
        '<button type="button" class="btn btn-success btn-sm btn-save" style="display:none;">Spara</button>' +
      '</td>';

    document.getElementById('contact-list-body').appendChild(newRow);
  }

  // Funktion för att redigera en kontakt
  function editContact(row) {
    const nameCell = row.querySelector('.contact-name');
    const phoneCell = row.querySelector('.contact-phone');
    const saveButton = row.querySelector('.btn-save');
    const deleteButton = row.querySelector('.btn-delete');

    console.log(nameCell)



    // Byt ut textceller mot input-fält för redigering
    nameCell.innerHTML = '<input type="text" class="form-control" value="' + nameCell.textContent + '">';
    phoneCell.innerHTML = '<input type="tel" class="form-control" value="' + phoneCell.textContent + '">';
    
    // Dölj "Redigera" knappen och visa "Spara" knappen
    event.target.style.display = 'none';
    saveButton.style.display = 'inline-block';

    // Dölj "Ta bort" -knappen under redigering
    deleteButton.style.display = 'none'; 
  }

  // Funktion för att ta bort en kontakt
  function deleteContact(row) {
    row.remove();
  }

  // Funktion för att spara en redigerad kontakt
  function saveContact(row) {
    const nameCell = row.querySelector('.contact-name');
    const phoneCell = row.querySelector('.contact-phone');
    const newNameInput = nameCell.querySelector('input');
    const newPhoneInput = phoneCell.querySelector('input');

    // Validera att inga fält är tomma
    if (newNameInput.value.trim() === '' || newPhoneInput.value.trim() === '') {
      newNameInput.classList.add('is-invalid');
      newPhoneInput.classList.add('is-invalid');
      displayEmptyMessage();
      return;
    }

    console.log(newNameInput);

    // Återställ felmeddelanden
    newNameInput.classList.remove('is-invalid');
    newPhoneInput.classList.remove('is-invalid');
    hideEmptyMessage();

    // Hämta de nya värden från input-fälten
    const newName = newNameInput.value;
    const newPhone = newPhoneInput.value;

    // Uppdatera tabellcellerna med de nya värden
    nameCell.textContent = newName;
    phoneCell.textContent = newPhone;

    console.log('newname', newName); 


    // Dölj "Spara" knappen och visa "Redigera" och "Ta bort" knapparna igen
    row.querySelector('.btn-save').style.display = 'none';
    row.querySelector('.btn-edit').style.display = 'inline-block';
    row.querySelector('.btn-delete').style.display = 'inline-block';
  }

  // Lägg till och visa kontakter
  document.getElementById('addContactForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Hämta värden från input-fält och tilldelar till variabel 
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const name = nameInput.value;
    const phone = phoneInput.value;

    // Validera att inga fält är tomma, koden kommer att markera som ogiltigt
    if (name.trim() === '' || phone.trim() === '') {
      nameInput.classList.add('is-invalid');
      phoneInput.classList.add('is-invalid');
      displayEmptyMessage();
      return;
    }

    // Återställ feedback på felmeddelanden
    nameInput.classList.remove('is-invalid');
    phoneInput.classList.remove('is-invalid');
    hideEmptyMessage();

    // Anrop  funktionen för att lägga till kontakt i tabellen och återställa felmeddelande
    addContact(name, phone);
    resetForm();
  });

  // Hantera olika events
  document.getElementById('contact-list-body').addEventListener('click', function (event) {
    const row = event.target.closest('tr');


    if (event.target.classList.contains('btn-edit')) {
      // Hantera redigeringsknapp
      editContact(row);
    } else if (event.target.classList.contains('btn-delete')) {
      // Hantera ta bort-knapp
      deleteContact(row);
    } else if (event.target.classList.contains('btn-save')) {
      // Hantera spara-knapp
      saveContact(row);
    }
  });

  // Ta bort hela listan
  document.getElementById('deleteList').addEventListener('click', function () {
    document.getElementById('contact-list-body').innerHTML = '';
  });