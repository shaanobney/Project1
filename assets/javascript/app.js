
$(document).on('ready', function() {
	$("#secChoice").css("display", "none");
	$("#genres").css("display", "none");
	$("#foodChoi").css("display", "none");
	$("#resets").hide();
	$("#result").hide();

	var tmdb_api_key = '352f498b61873be15b52924f22ef2ac2';
	var genre_list_url = 'https://api.themoviedb.org/3/genre/movie/list?api_key='+tmdb_api_key;
	var guideBoxApiKey = 'toZrSHYEOKuOaC4Y71KeOrkR5oYhn5';
	var trigger = '';

	//INIT FIREBASE
	  var movieBase = {
	  	apiKey: "AIzaSyASIoV3ldP02Ezks2PSJKnrv-ZXKwOoCXE",
    	authDomain: "group-project-2c55c.firebaseapp.com",
    	databaseURL: "https://group-project-2c55c.firebaseio.com",
    	storageBucket: "group-project-2c55c.appspot.com",
	  };

  firebase.initializeApp(movieBase);

  var movieBase = firebase.database();

		$('#begin figure').on('click', function() {

				var initChoice = $(this).attr('id');

  		 		if (initChoice == 'in') {
  		 			$("#begin").hide();
  		 			$("#secChoice").show();
  		 		} else {
  		 			console.log($(this).attr('id'));
  		 		}
  		 	})

		$('#secChoice figure').on('click', function() {

				var secondChoice = $(this).attr('id');
				console.log(secondChoice);

  		 		if (secondChoice == 'watch' && (trigger == '')) {
  		 			$("#secChoice").hide();
  		 			$("#watch").remove();
  		 			$("#genres").show();
  		 			trigger = "movie";
  		 		} else if (secondChoice == 'munch' && (trigger == '')) {
  		 			$("#secChoice").hide();
  		 			$("#munch").remove();
  		 			$("#foodChoi").show();

	  		 	 } else if (secondChoice == 'munch' && (trigger == "movie")) {
  		 			$("#secChoice").hide();
  		 			$("#genres").hide();
  		 			$("#foodChoi").show();
	  		 	} else {
	  		 		$("#secChoice").hide();
	  		 		$("#genres").show();
  		 		}
  		 	})

		$('#genres figure').one('click', function() {

				$('#movie-detail').empty();
				var x = Math.floor((Math.random() * 10) + 1);
				var genre_id = $(this).data('id'),
				movie_list_url = 'https://api.themoviedb.org/3/genre/'+genre_id+'/movies?api_key='+tmdb_api_key+'&page='+x;

			//GRAB MOVIE BY GENRE
			$.getJSON(movie_list_url, function (response) {

					var random = Math.floor(Math.random()*response.results.length);
					var movie_button = $('<button class="movie ctrl-standard is-reversed typ-subhed fx-bubbleDown" data-id="'+response.results[random].id+'">'+response.results[random].title+'</button>');

					$('#movie-detail').empty();

					var guideBoxTitle = response.results[random].id,
						movie_detail_url = 'https://api-public.guidebox.com/v1.43/US/rKxpJKiDZEB3HPJvZQJVMhPlmQzwe8HY/search/movie/id/themoviedb/'+guideBoxTitle;

					$.getJSON(movie_detail_url, function (response) {

						var guideBoxId = response.id;
						var guideBoxId_url = 'https://api-public.guidebox.com/v1.43/US/rKxpJKiDZEB3HPJvZQJVMhPlmQzwe8HY/movie/'+guideBoxId;
						
							$.getJSON(guideBoxId_url, function (response) {

								if (guideBoxId === "undefined") {
								    guideBoxId = 64688;
								}

								if (movPurchase === "undefined") {
								    console.log("you need to fix this shit");
								}

								var movPurchase = response.purchase_web_sources[0].link;
								var movPurchases = response.purchase_web_sources[1].link;
								var moveTitle = response.title;
								var movePoster = response.poster_240x342;

								var purchase = response.purchase_web_sources[0].link;
								var purchases = response.purchase_web_sources[1].link;

											movieBase.ref().update({
											title: moveTitle,
											poster: movePoster,
											purchase: movPurchase,
											purchases: movPurchases,
										})

								var movie_detail = '<h1><strong>'+moveTitle+'</strong></h1>'+'<div id="boner1"><img src='+movePoster+'></div><a class="linky" href='+purchase+' target="_blank"><img id="left" src="http://www.niftybuttons.com/itunes/itunesbutton1.png" alt="iTunes Button (via NiftyButtons.com)"></a><a class="linky" href='+purchases+' target="_blank"><img id="right" src="http://www.niftybuttons.com/amazon/amazon-button9.png" alt="Amazon Button (via NiftyButtons.com)"></a>';
								$('#movie-detail').append(movie_detail);
						});

					});

			});
			if (trigger == "munch") {
				$("#foodChoi").hide();
				$("#secChoice").hide();
				$("#genres").hide();
				$("#result").show();
				$("#resets").show();

			} else {
				$('#myModal').modal('show');
				trigger == "movie";
				$("#secChoice").show();
				$("#genres").hide();
				$("#watch").hide();
				$("#munch").css({"float": "none", "display": "inline-flex"});
				$("#munch").show();
			}
		});

		$('#foodChoi figure').one('click', function() {

				var food_id = $(this).attr('id');
				var recipe_list_url = 'http://food2fork.com/api/search?key=24d0b4ec6120c982a1f02c7e4873ecd3&q='+food_id;
				var food2ForkApiKey = '24d0b4ec6120c982a1f02c7e4873ecd3';

			$.getJSON(recipe_list_url, function (response) {

				var random = Math.floor(Math.random()*response.recipes.length);
			
				var recipe_list_url = 'http://food2fork.com/api/search?key=24d0b4ec6120c982a1f02c7e4873ecd3&q='+food_id;
				$('#foodie-detail').empty();

				var x = Math.floor(Math.random()*response.recipes.length);

								var foodTitle = response.recipes[x].title;
								var foodImg = response.recipes[x].image_url;
								var foodList = response.recipes[x].source_url;

											movieBase.ref().update({
											recipeTitle: foodTitle,
											recipeImg: foodImg,
											recipeLink: foodList,
										})

				var recipe_detail = '<h1><strong>'+foodTitle+'</strong></h1>'+'<div id="boner"><img id="foodImage" src='+foodImg+'></div><a class="btn btn-info" href='+foodList+' target="_blank" role="button">EAT THIS</a>';
				$('#foodie-detail').append(recipe_detail);
			});

			if (trigger == "movie") {
				$("#foodChoi").hide();
				$("#secChoice").hide();
				$("#result").show();
				$("#resets").show();
			} else {
			$('#myModal').modal('show');
			trigger = "munch";
			$("#foodChoi").hide();
			$("#secChoice").show();
			$("#munch").hide();
			$("#watch").css({"float": "none", "display": "inline-flex"});
		}
		});
		//RESET
    $(document).on('click', '#reset', function() {
        location.reload();
    });

});









