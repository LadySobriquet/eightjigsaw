var puzzle;
var HEIGHT;
var WIDTH;
var iZero;
var jZero;

function init(p) {
	HEIGHT = p.length;
	WIDTH = p[0].length;
	puzzle = p;
	getZero();
	draw();
	keyboard_map();
}

function getZero() {
	var i = 0;
	var j = 0;
	for(i = 0; i < WIDTH; i++) {
		for(j = 0; j < HEIGHT; j++) {
			if(puzzle[i][j] == 0) {
				iZero = i;
				jZero = j;
				return;
			}
		}	
	}
}

function draw() {
	var n = 0;
	var i = 0;
	var j = 0;
	for(i = 0; i < WIDTH; i++) {
		for(j = 0; j < HEIGHT; j++) {
			if (puzzle[i][j] == 0) {
				$('#' + n + '').addClass("zero");
			} else {
				$('#' + n + '').removeClass("zero");
			}
			$('#' + n + '').html(puzzle[i][j]);
			n++;
		}	
	}
}

function up() {
	if(iZero > 0) {
		var temp = puzzle[iZero - 1][jZero];
		iZero--;
		puzzle[iZero][jZero] = 0;
		puzzle[iZero + 1][jZero] = temp;
		draw();
	}
}

function down() {
	if(iZero < HEIGHT - 1) {
		var temp = puzzle[iZero + 1][jZero];
		iZero++;
		puzzle[iZero][jZero] = 0;
		puzzle[iZero - 1][jZero] = temp;
		draw();
	}
}

function left() {
	if(jZero > 0) {
		var temp = puzzle[iZero][jZero - 1];
		jZero--;
		puzzle[iZero][jZero] = 0;
		puzzle[iZero][jZero + 1] = temp;
		draw();
	}
}

function right() {
	if(jZero < WIDTH - 1) {
		var temp = puzzle[iZero][jZero + 1];
		jZero++;
		puzzle[iZero][jZero] = 0;
		puzzle[iZero][jZero - 1] = temp;
		draw();
	}
}

function keyboard_map(){
	$('#UP').click(function() {
		up();
	});
	$('#DOWN').click(function() {
		down();
	});
	$('#LEFT').click(function() {
		left();
	});
	$('#RIGHT').click(function() {
		right();
	});
	
	$(document).keydown(function (e) {
	  var keyCode = e.keyCode || e.which,
	      arrow = {left: 37, up: 38, right: 39, down: 40 };

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