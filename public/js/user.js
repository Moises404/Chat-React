(function () {
	// Init variables
	var fireDB = new Firebase('https://chat-react-2-db.firebaseio.com/'),
		randReaction,
		userReactionTemplate,
		chatboxContainer = $('.chatbox-container'),
		count = 0;

	methods = {
		init: function () {
			// Init handlebars template
			var source = $('#user-reaction-template').html();
			userReactionTemplate = Handlebars.compile(source);

			methods.initKeyboardHandler();
		},
		initKeyboardHandler: function () {
			// init keypress for reaction
			$('.single-reaction-button').on('click', function (e) {
				e.preventDefault();
				randReaction = $(this).html();
				methods.getGIF(randReaction);

				// set reaction in fireDB
				fireDB.child('user').set({ video_url: 'video_url', reaction: randReaction});
			});

			// $('.button').on('click', function () {
			// 	// methods.createRandReaction();
			// 	// methods.displayReaction();

			// 	// set reaction in fireDB
			// 	fireDB.child('user').set({ video_url: 'video_url', reaction: randReaction});
			// });
		},
		displayReaction: function (reaction_url) {
			console.log('displayReaction: ' + reaction_url);
			data = {
				reaction_url: reaction_url
			};

			var html = userReactionTemplate(data);
			console.log(html);
			chatboxContainer.empty();
			chatboxContainer.append(html);
		},
		getGIF: function (reaction) {
			// console.log('getGIF reaction:' + ' ' + reaction);
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

			var reaction_url = GIF_URL;
			// console.log('reaction_url: ' + reaction_url);
			methods.displayReaction(reaction_url);
		}
	}

	window.ChatReact = methods;
})();