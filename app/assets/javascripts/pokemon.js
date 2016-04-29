// Object or Class definition


PokemonApp.Pokemon = function(pokemonUri){
	this.id = PokemonApp.Pokemon.idFromUri(pokemonUri);
};

// Use of object or class

$(document).on("ready", function(){
	$(".js-show-pokemon").on("click", function(event){
		var $button = $(event.currentTarget);
		var pokemonUri = $button.data("pokemon-uri");

		var pokemon = new PokemonApp.Pokemon(pokemonUri);
		pokemon.render();
	});
});

PokemonApp.Pokemon.prototype.render = function(){
	console.log("Rendering pokemon: #" + this.id);

	var self = this;

	$.ajax({
		url: "/api/pokemon/" + this.id,
		success: function (response){
			console.log("Pokemon info:");
			console.log(response);
			self.info = response;

			$(".js-pkmn-name").text(self.info.name);
			$(".js-pkmn-number").text(self.info.pkdx_id);
			$(".js-pkmn-height").text(self.info.height);
			$(".js-pkmn-weight").text(self.info.weight);
			$(".js-pkmn-hp").text(self.info.hp);
			$(".js-pkmn-attack").text(self.info.attack);
			$(".js-pkmn-defense").text(self.info.defense);
			$(".js-pkmn-sp-att").text(self.info.sp_atk);
			$(".js-pkmn-sp-df").text(self.info.sp_def);
			$(".js-pkmn-speed").text(self.info.speed);
			displayTypes(self.info.types);

			$.ajax({
				url: getUri(self.info.sprites),
				success: function(data){
				console.log(data)
				displayImage(data)},
				error: function(error){
					console.log("Failed")
				}
			})

			$.ajax({
				url: getUriDes(self.info.descriptions) ,
				success: function(data){
					console.log(data)
					displayDescription(data)
				},
				error: function(error){
					console.log("Failed!")
				}
			})


			$(".js-image").empty();
			$(".js-description").empty();
			$(".js-pokemon-modal").modal("show");

		},
		error: function(error){
			console.log("Oh no!")
		}
	});
};

PokemonApp.Pokemon.idFromUri = function(pokemonUri){
	var uriSegments = pokemonUri.split("/");
	var secondLast = uriSegments.length - 2;
	return uriSegments[secondLast];
};

// ---------- Display the type of the Pokemon -----------//
function displayTypes(the_array){
	the_array.forEach(function(the_item){
		var the_type = `
		${the_item.name}`
		$(".js-pkmn-types").text(the_type);
	})
}

// ---------- Getting uri for sprites ------- //

function getUri(the_array){
	return the_array[0].resource_uri               
}

// -------- Display Image ------- //

function displayImage(the_object){
	var html = `
				<img src="http://pokeapi.co/${the_object.image}">`
				$(".js-image").append(html);
}

// ------- Getting uri for description ------ //

function getUriDes(the_array){
	gen5 = []
	the_array.forEach(function(the_item){
		if (the_item.name.includes("6")){
			gen5.push(the_item)
		}
	})
	return gen5[0].resource_uri
}

//-------- Display Description -------//

function displayDescription(the_object){
	var html = `<p>${the_object.description}</p>`
	$(".js-description").append(html)
}




