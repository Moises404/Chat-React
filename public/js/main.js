(function () {
	//Init Variables
	var fireDB;
	var userReactionTemplate;
	var chatboxContainer = $('.chat-react-box-scroll');

	var methods = {
		init: function () {
			console.log('Chat React Init');
			console.log(reactionsArray);
			
			// init handlebars template
			var source = $('#user-reaction-template').html();
			userReactionTemplate = Handlebars.compile(source);

			// init Fire Database and React Input Button
			methods.initFireDB();
			methods.initReactButton();
		},
		initFireDB: function () {
			// Reference to the root of the DB
			fireDB = new Firebase('https://chat-react-db.firebaseio.com/');

			// callback that notifies when the message has arrived to the DB
			fireDB.on('child_added', function(snapshot) {
				// get the data from child_added
				var message = snapshot.val();
				methods.displayChatMessage(message.name, message.reaction_url);
			});	
		},
		initReactButton: function () {
			// init keypress for reaction
			$('.single-reaction-button').on('click', function (e) {
				e.preventDefault();
				var text = $(this).html();
				methods.getGIF(text);
			});
		},
		displayChatMessage: function (name, reaction_url) {
			var data = {
				user: name,
				reaction_url: reaction_url
			}
			var html = userReactionTemplate(data);
			chatboxContainer.append(html);
			$('.chat-react-box-scroll')[0].scrollTop = $('.chat-react-box-scroll')[0].scrollHeight;
			// objDiv.scrollTop = objDiv.scrollHeight;
		},
		getGIF: function (reaction) {
			console.log('getGIF reaction:' + ' ' + reaction);
			console.log('getGIF function fired');

			var params = {
				url: 'http://api.giphy.com/v1/gifs/search?q=' + reaction + '&api_key=dc6zaTOxFJmzC&limit=1&offset=0&limit=5',
				dataType: 'json',
				success: function (GIFdata) {
					console.log(GIFdata);
					methods.chooseRandomReactGIF(GIFdata);
				}
			}
			$.ajax(params);
		},
		chooseRandomReactGIF: function (GIFdata) {
			var randNumber = Math.floor(Math.random() * 5);
			var GIF_URL = GIFdata.data[randNumber].images.original.url;

			var name = $('#nameInput').val();
			var reaction = GIF_URL;
			fireDB.push({name: name, reaction_url: reaction});
			$('#messageInput').val('');
			
		}
	}
	window.ChatReact = methods;
})();