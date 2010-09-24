var puzzle;
var HEIGHT;
var WIDTH;
var i_zero;
var j_zero;

var Log = {
	info: function(msg) {
		$("#log").html(msg);
	}
};

function get_zero() {
	var i = 0;
	var j = 0;
	for(i = 0; i < HEIGHT; i++) {
		for(j = 0; j < WIDTH; j++) {
			if(puzzle[i][j] == 0) {
				i_zero = i;
				j_zero = j;
				return;
			}
		}	
	}
}

function init_screen(p) {
	puzzle = p;
	HEIGHT = puzzle.length;
	WIDTH = puzzle[0].length;
	
	var tbody = "";
	var n = 0;
	var i = 0;
	var j = 0;
	for(i = 0; i < HEIGHT; i++) {
		console.log(i);
		tbody += "<tr>";
		for(j = 0; j < WIDTH; j++) {
			tbody += "<td id='" + n + "'></td>";
			n++;
		}
		tbody += "</tr>";
	}
	$("#screen").html(tbody);
	$("#game").css({'width': WIDTH * 109}); // largura da área do jogo; relativo a quantidade de td's
}

function draw() {
	var n = 0;
	var i = 0;
	var j = 0;
	for(i = 0; i < HEIGHT; i++) {
		for(j = 0; j < WIDTH; j++) {
			if (puzzle[i][j] == 0) {
				$('#' + n).addClass("zero");
			} else {
				$('#' + n).removeClass("zero");
			}
			$('#' + n + '').html(puzzle[i][j]);
			n++;
		}	
	}
}

function up() {
	if(i_zero > 0) {
		var temp = puzzle[i_zero - 1][j_zero];
		i_zero--;
		puzzle[i_zero][j_zero] = 0;
		puzzle[i_zero + 1][j_zero] = temp;
		draw();
		Log.info("UP");
	}
}

function down() {
	if(i_zero < HEIGHT - 1) {
		var temp = puzzle[i_zero + 1][j_zero];
		i_zero++;
		puzzle[i_zero][j_zero] = 0;
		puzzle[i_zero - 1][j_zero] = temp;
		draw();
		Log.info("DOWN");
	}
}

function left() {
	if(j_zero > 0) {
		var temp = puzzle[i_zero][j_zero - 1];
		j_zero--;
		puzzle[i_zero][j_zero] = 0;
		puzzle[i_zero][j_zero + 1] = temp;
		draw();
		Log.info("LEFT");
	}
}

function right() {
	if(j_zero < WIDTH - 1) {
		var temp = puzzle[i_zero][j_zero + 1];
		j_zero++;
		puzzle[i_zero][j_zero] = 0;
		puzzle[i_zero][j_zero - 1] = temp;
		draw();
		Log.info("RIGHT");
	}
}

function keyboard_map(){
	$('#up').click(function() {
		up();
	});
	$('#down').click(function() {
		down();
	});
	$('#left').click(function() {
		left();
	});
	$('#right').click(function() {
		right();
	});
	
	$(document).keydown(function (e) {
	  var keyCode = e.keyCode || e.which,
	      arrow = { left: 37, up: 38, right: 39, down: 40 };

	  switch (keyCode) {
		case arrow.left:
	      left();
		break;
	    case arrow.up:
	      up();
	    break;
	    case arrow.right:
	      right();
	    break;
	    case arrow.down:
	      down();
	    break;
	  }
	});
}

function eight_jigsaw(p) {
	init_screen(p);
	draw();
	get_zero();
	keyboard_map();
}