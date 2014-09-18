(function () {
	// Init variables
	var fireDB = new Firebase('https://chat-react-2-db.firebaseio.com/'),
		randReaction,
		robotReactionTemplate,
		chatboxContainer = $('.chatbox-container'),
		currentUserReaction,
		previousUserReaction,
		count = 0;

	methods = {
		init: function () {
			// Init handlebars template
			var source = $('#robot-reaction-template').html();
			robotReactionTemplate = Handlebars.compile(source);

			methods.initDBValues();
		},
		initDBValues: function () {
			fireDB.child('user').on('value', function (snapshot) {
				var initUserReaction = snapshot.val().reaction;
				previousUserReaction = initUserReaction;
				
				// respond to the latest reaction by the user
				methods.createRandReaction();
				methods.listentoDB();
			});
		},
		listentoDB: function () {
			setTimeout(function () {
				// alert('cool');
				fireDB.child('user').on('value', function (snapshot) {
					currentUserReaction = snapshot.val().reaction;
					console.log(currentUserReaction);
					console.log(previousUserReaction);

					// respond to the latest reaction by the user
					if (currentUserReaction === previousUserReaction) {
						return methods.listentoDB();
					} else {
						methods.createRandReaction();
						methods.listentoDB();
					}		
				});
			}, 5000);
		},
		createRandReaction: function () {
			randReaction = reactionsArray[Math.floor(Math.random() * reactionsArray.length)];
			console.log(randReaction);
			methods.getGIF();
		},
		displayReaction: function (reaction_url) {
			console.log('reaction_url: ' + reaction_url);
			data = {
				reaction_url: reaction_url
			};

			var html = robotReactionTemplate(data);
			chatboxContainer.empty();
			chatboxContainer.append(html);
		},
		getGIF: function (reaction) {
			// console.log('getGIF reaction:' + ' ' + reaction);
			console.log('getGIF function fired');

			var params = {
				url: 'http://api.giphy.com/v1/gifs/search?q=' + randReaction + '&api_key=dc6zaTOxFJmzC&limit=1&offset=0&limit=5',
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

			var reaction_url = GIF_URL;

			setTimeout(function () {
				methods.displayReaction(reaction_url);
			}, 3000);
		}
	}

	window.ChatReact = methods;
})();