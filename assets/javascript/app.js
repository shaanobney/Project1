
$(document).on('ready', function() {
	$("#secChoice").css("display", "none");
	$("#genres").css("display", "none");
	$("#foodChoi").css("display", "none");
	$('#food-detail').css("display", "none");
	$(".foodDiv").css("display", "none");
	$("#outChoice").css("display","none");
	// $("#foodie-detail").hide();
	// $("#movie-detail").hide();
	$("#resets").hide();
	$("#result").hide();
	$('#resets2').hide();
	$('#resets33').hide();

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
  		 		} if (initChoice == 'out') {
						$("#begin").hide();
						$("#outChoice").show();
  		 			console.log($(this).attr('id'));
  		 		}
  		 	})


				$('#outChoice figure').on('click', function() {

						var secondChoiceOut = $(this).attr('id');


							if (secondChoiceOut == 'goMovie') {
								$("#outChoice").hide();
								$("#goEat").remove();

								// trigger = "movie";
								console.log(trigger);
							} else if (secondChoiceOut == 'goEat') {
								$("#outChoice").hide();
								$("#goMovie").remove();
								$(".foodDiv").show();
								console.log($(this).attr('id'));
								console.log("munch and no trigger");
								console.log(trigger);
							//  } else if (secondChoice == 'munch' && (trigger == "movie")) {
							// 	$("#secChoice").hide();
							// 	$("#genres").hide();
							// 	$("#foodChoi").show();
							// 	console.log($(this).attr('id'));
							// 	console.log("munch and movie trigger");
							// 	console.log(trigger);
							// } else {
							// 	$("#secChoice").hide();
							// 	$("#genres").show();
							// 	console.log($(this).attr('id'));
							// 	console.log("all else failed");
							// 	console.log(trigger);
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

								var movPurchase = response.purchase_web_sources[0].link;
								var movPurchases = response.purchase_web_sources[1].link;
								var moveTitle = response.title;
								var movePoster = response.poster_240x342;

								console.log(movPurchase);
								console.log(movPurchases);
								var purchase = response.purchase_web_sources[0].link;
								var purchases = response.purchase_web_sources[1].link;

											movieBase.ref().update({
											title: moveTitle,
											poster: movePoster,
											purchase: movPurchase,
											purchases: movPurchases,
										})

								if (movPurchase === "undefined") {
									movPurchase = 'http://www.apple.com/itunes/charts/movie-rentals/';
								}

								if (movPurchases === "undefined") {
									movPurchases = 'https://www.amazon.com/Amazon-Video/b?ie=UTF8&node=2858778011';
								}

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



		$(document).keypress(function(e) {
    if(e.which == 13) {
        alert('Please choose a food category below');
				return false;
    }
});




		$('.button').on("click", function() {

		$('#genres2').hide();
		$('#food-detail').css("display", "block");
		$('#resets2').show();
		$('#resets33').show();

		var foodcategoryval = $(this).data('id');
		// var cityval = $("#cityinput").val().trim();
		var zipcode = $("#zipVal").val().trim();

		//writing/set/save to firebase db, by creating an object with keypairs so can be called up later from database

		var newFood = {
		 foodcategory: foodcategoryval,
		 zipCodeNew:zipcode
		//  city: cityval,
		//  state: stateval
		}

		// $("#restaurantresult").remove();

		//pushes entire object into firebase
		movieBase.ref().set(newFood);

		// Logs everything to console
		console.log(newFood.foodcategory);



		//calls the database objects we pushed earlier, have to use on chil added to get each appended child object pushed
		movieBase.ref().on("value", function(snapshot) {

		//bring out specific object keypair and set to variable
			var foodtype = snapshot.val().foodcategory;
			var zip = '"'+snapshot.val().zipCodeNew+'"';
			// var citytype = snapshot.val().city;
			// var statetype = snapshot.val().state;


			var food1 = foodtype
			// var zip = '"' + 91105 + '"'
			// var city1 = '"' + citytype + '"'
			// var state1 = '"' + statetype + '"'



			// var queryURL = 'http://api.v3.factual.com/t/places?KEY=qV8FRoFv0e9p5SLqJSeqgrXOrcCP8xGkoBOA2Msz&filters=' + '{"$and":[{"region":{"$eq":"ca"}},{"locality":{"$eq":"pasadena"}},{"category_labels":{"$includes":"restaurant"}}]}&q='+ food1;
			var queryURLL = 'http://api.v3.factual.com/t/places?KEY=qV8FRoFv0e9p5SLqJSeqgrXOrcCP8xGkoBOA2Msz&filters=' + '%7B"$and":[{"country":{"$eq":"US"}},{"category_labels":{"$includes":"restaurant"}},{"postcode":{"$eq":'+ zip + '}}]}&q=' + food1;


							$.ajax({
									url: queryURLL,
									method: 'GET'
							})
							.done(function(response) {
								var random = Math.floor(Math.random()*response.response.data.length);
								var address = encodeURIComponent(response.response.data[random].name + '",'+snapshot.val().zipCodeNew+'"');
								var site = '"' + response.response.data[random].website + '"';
								var site2 = response.response.data[random].website


							// 	if (response.response.data[random].hours){
							//
							// 	var Sunday = "<tr><td>"+"Sunday"+ "</tr></td>" + "<tr><td>"+ response.response.data[random].hours.sunday[0] + "</tr></td>"
							// 	var Monday = "<tr><td>"+"Monday"+ "</tr></td>" + "<tr><td>"+ response.response.data[random].hours.monday[0] + "</tr></td>"
							// 	var Tuesday = "<tr><td>"+"Tuesday"+ "</tr></td>" + "<tr><td>"+ response.response.data[random].hours.tuesday[0] + "</tr></td>"
							// 	var Wednesday = "<tr><td>"+"Wednesday"+ "</tr></td>" + "<tr><td>"+ response.response.data[random].hours.wednesday[0] + "</tr></td>"
							// 	var Thursday = "<tr><td>"+"Thursday"+ "</tr></td>" + "<tr><td>"+ response.response.data[random].hours.thursday[0] + "</tr></td>"
							// 	var Friday = "<tr><td>"+"Friday"+ "</tr></td>" + "<tr><td>"+ response.response.data[random].hours.friday[0] + "</tr></td>"
							// 	var Saturday = "<tr><td>"+"Saturday"+ "</tr></td>" + "<tr><td>"+ response.response.data[random].hours.saturday[0] + "</tr></td>"
							//
							// 	$("#hours").append("<tr><td>"+ "<h1><span id='h'>Hours</span></h1>" + "</tr></td>" + Sunday + Monday + Tuesday + Wednesday + Thursday + Friday + Saturday);
							// }

								$("#name").append(response.response.data[random].name);
								$("#frame").append($("<iframe>").attr("src", "http://www.google.com/maps/embed/v1/place?q=" + address + "&zoom=17&key=AIzaSyCkcJwNI5e67TWYu_98SBLcWFBNOBO1WGY"));
								$("#hours").append("<h1><span id='h'>Hours</span></h1>"+response.response.data[random].hours_display);
								$("#address").append(response.response.data[random].address);
								$("#website").append('<a href=' + site + '>' + site2 +'</a>');
								$("#phone").append(response.response.data[random].tel);
								$('#reset').append($('<button id="next" class="btn btn-default" value=clear><h1>next</h1></button>'));

								$('.food-detail').show();




								$('#reset3').on('click', function() {
									$("#name").empty();
									$("#frame").empty();
									$("#hours").empty();
								  $("#address").empty();
								  $("#website").empty();
								 $("#phone").empty();

									var random = Math.floor(Math.random()*response.response.data.length);
									var address = encodeURIComponent(response.response.data[random].name + '",'+snapshot.val().zipCodeNew+'"');
									var site = '"' + response.response.data[random].website + '"';
									var site2 = response.response.data[random].website
									// $("#food-detail").append("<tr><td>" + response.response.data[0].name + "</td><td>" + response.response.data[0].address + "</td><td>" + response.response.data[0].website + "</td><td>" + response.response.data[0].tel + "</td><td>");
									// $("#food-detail").append("<tr><td>" + response.response.data[1].name + "</td><td>" + response.response.data[1].address + "</td><td>" + response.response.data[1].website + "</td><td>" + response.response.data[1].tel + "</td><td>");
									// $("#food-detail").append("<tr><td>" + response.response.data[2].name + "</td><td>" + response.response.data[2].address + "</td><td>" + response.response.data[2].website + "</td><td>" + response.response.data[2].tel + "</td><td>");
									// $("#food-detail").append("<tr><td>" + response.response.data[3].name + "</td><td>" + response.response.data[3].address + "</td><td>" + response.response.data[3].website + "</td><td>" + response.response.data[3].tel + "</td><td>");


								// 	if (response.response.data[random].hours){
								//
								// 	var Sunday = "<tr><td>"+"Sunday"+ "</tr></td>" + "<tr><td>"+ response.response.data[random].hours.sunday[0] + "</tr></td>"
								// 	var Monday = "<tr><td>"+"Monday"+ "</tr></td>" + "<tr><td>"+ response.response.data[random].hours.monday[0] + "</tr></td>"
								// 	var Tuesday = "<tr><td>"+"Tuesday"+ "</tr></td>" + "<tr><td>"+ response.response.data[random].hours.tuesday[0] + "</tr></td>"
								// 	var Wednesday = "<tr><td>"+"Wednesday"+ "</tr></td>" + "<tr><td>"+ response.response.data[random].hours.wednesday[0] + "</tr></td>"
								// 	var Thursday = "<tr><td>"+"Thursday"+ "</tr></td>" + "<tr><td>"+ response.response.data[random].hours.thursday[0] + "</tr></td>"
								// 	var Friday = "<tr><td>"+"Friday"+ "</tr></td>" + "<tr><td>"+ response.response.data[random].hours.friday[0] + "</tr></td>"
								// 	var Saturday = "<tr><td>"+"Saturday"+ "</tr></td>" + "<tr><td>"+ response.response.data[random].hours.saturday[0] + "</tr></td>"
								//
								// 	$("#hours").append("<tr><td>"+ "<h1><span id='h'>Hours</span></h1>" + "</tr></td>" + Sunday + Monday + Tuesday + Wednesday + Thursday + Friday + Saturday);
								// }

									$("#name").prepend(response.response.data[random].name);
									$("#frame").prepend($("<iframe>").attr("src", "http://www.google.com/maps/embed/v1/place?q=" + address + "&zoom=17&key=AIzaSyCkcJwNI5e67TWYu_98SBLcWFBNOBO1WGY"));
										$("#hours").append("<h1><span id='h'>Hours</span></h1>"+response.response.data[random].hours_display);
									$("#address").prepend(response.response.data[random].address);

									$("#website").prepend('<a href=' + site + '>' + site2 +'</a>');
									$("#phone").prepend(response.response.data[random].tel);
									$('#reset').prepend($('<button id="next" class="btn btn-default" value=clear><h1>next</h1></button>'));

									$('.food-detail').show();

										})

							});


							console.log(response.response.data[0].address);





		});

		});


});
