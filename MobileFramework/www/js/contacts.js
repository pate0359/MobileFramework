function getContacts() {
	var options = new ContactFindOptions();
//	options.filter = "";
//	var fields = ["displayName", "name"];
	options.multiple = true;
	var fields       = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];
	navigator.contacts.find(fields, onSuccess, onError, options);
}

function onSuccess(contacts) {
	alert(contacts.length);
	for (var i = 0; i < contacts.length; i++) {
		console.log("Display Name = " + contacts[i].displayName);
		
		var li = document.createElement("li");
		li.innerHTML=contacts[i].displayName;
		
		document.querySelector("#MyContacts").appendChild(li);;
//		alert(contacts[i].displayName);
	}
}

// onError: Failed to get the contacts
function onError(contactError) {
	alert('Error while fetching contact!');
}