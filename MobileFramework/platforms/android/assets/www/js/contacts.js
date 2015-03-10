function getContacts() {
//	alert("contact");
	var options = new ContactFindOptions();
//	options.filter = "";
//	var fields = ["displayName", "name"];
	options.multiple = true;
	var fields       = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];
	navigator.contacts.find(fields, onSuccess, onError, options);
}

function onSuccess(contacts) {
//	alert(contacts.length);
	
	document.querySelector("#MyContacts").innerHTML="";
	for (var i = 0; i < contacts.length; i++) {
		
		if(contacts[i].displayName)
		{
			var li = document.createElement("li");
			li.innerHTML=contacts[i].displayName;
			document.querySelector("#MyContacts").appendChild(li);
		}
		
//		console.log("Display Name = " + contacts[i].displayName);		
//		alert(contacts[i].displayName);
	}
}

// onError: Failed to get the contacts
function onError(contactError) {
	alert('Error while fetching contact!');
}