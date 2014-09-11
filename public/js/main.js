// Reference to the root of the DB
var myDataRef = new Firebase('https://chat-react-db.firebaseio.com/');

// input keypress send the input value to the DB
$('#messageInput').keypress(function (e) {
	if (e.keyCode == 13) {
		var name = $('#nameInput').val();
		var text = $('#messageInput').val();
		myDataRef.push({name: name, text: text});
		$('#messageInput').val('');
	}
});

// callback that notifies when the message has arrived to the DB
myDataRef.on('child_added', function(snapshot) {
	// get the data from child_added
	var message = snapshot.val();
	displayChatMessage(message.name, message.text);
});

function displayChatMessage (name, text) {
	$('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
	$('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
}


