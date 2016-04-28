// Object or Class definition


PokemonApp.Pokemon = function(pokemonUri){
	this.id = PokemonApp.Pokemon.idFromUri(pokemonUri);
};

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


// Use of object or class

$(document).on("ready", function(){
	$(".js-show-pokemon").on("click", function(event){
		var $button = $(event.currentTarget);
		var pokemonUri = $button.data("pokemon-uri");

		var pokemon = new PokemonApp.Pokemon(pokemonUri);
		pokemon.render();
	});
});