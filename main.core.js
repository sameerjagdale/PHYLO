window.DEBUG = true;
(function() {
	$(document).ready(function() {
	
		$.main = {
			//configuration
			init : function() {
				$.phylo = {
					seqLen : 25,
					x : 34,
					offSet : $("#gameBoard").css("left").replace(/px/,""),
					height : $("#tree").css("height").replace(/px/,"")
				};
				$.protocal.read();
				$.protocal.request();
			},
			//call back on protocal complete
			//sets the layout and activates the game
			callBack : function() {
				//sets the gameBoard to be nonMovable on touch devices.
				$.events.touch("#gameBoard",{
					start: function(e) {
					}, move : function(e) {
					}, end : function(e) {
					}
				});
				if(DEBUG)
					console.log($.phylo);
				$.phylo.tree = $.tree.build($.phylo.get.tree);
				$.board.build();
				$.sequence.build($.phylo.get.sequence);
				$.sequence.prepareTracking($.phylo.get.sequence);
				$.phylo.origin = $.sequence.track.slice(0);
				var random = $.sequence.randomize($.sequence.track);
				$.sequence.prepareTracking(random);
				$.phylo.domCache = $.sequence.createCache();
				$.physics.snapRandom();

				if(DEBUG) {
					console.log("original")
					console.log($.phylo.origin);
					console.log("tracked");
					console.log($.sequence.track);
					console.log($.phylo.tree);
				}
				$.stage.last = $.phylo.tree[$.phylo.tree.length-1].lv;
				$.splash.countDown(function() {
					//start game
					$.stage.end = false;
					$.stage.round();	
					if(DEBUG)
						$.helper.dump($.sequence.track);
				});
			},
		};

		$.main.init();
	});
})();
