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

var Log2 = {
	info: function(msg) {
		$("#log2").html(msg);
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
		tbody += "<tr>";
		for(j = 0; j < WIDTH; j++) {
			tbody += "<td id='" + n + "'></td>";
			n++;
		}
		tbody += "</tr>";
	}
	$("#screen").html(tbody);
	$("#screen").css({'width': WIDTH * 109, 'height': HEIGHT * 109});
	$("#game").css({'width': WIDTH * 109});
	$("#game").css({'height': HEIGHT * 109});
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
			$('#' + n).html(puzzle[i][j]);
			n++;
		}
	}
	if (finish()) {
		$("#win").show();
	} else{
		$("#win").hide();
	}
}

function finish () {
	var i = 0;
	var j = 0;
	var num = 1;
	var test = true;
	for(i = 0; i < HEIGHT; i++) {
		for(j = 0; j < WIDTH; j++) {
			if (puzzle[i][j] != 0) {
				test = test && puzzle[i][j] == num;
			};
			num++;
		}
	}
	return test;
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
	  var keyCode = e.which;
	  var arrow = { left: 37, up: 38, right: 39, down: 40 };

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

function get_location() {
	if (i_zero == 0 && j_zero == 0) {
		return "ConnerLeftUp";
	} else if (i_zero == 0 && j_zero == WIDTH-1) {
		return "ConnerRightUp"
	} else if (i_zero == HEIGHT-1 && j_zero == WIDTH-1) {
		return "ConnerRightDown"
	} else if (i_zero == HEIGHT-1 && j_zero == 0) {
		return "ConnerLeftDown"
	}	else if (i_zero > 0 && i_zero < HEIGHT-1 && j_zero == 0) {
		return "WallLeft"
	}	else if (i_zero > 0 && i_zero < HEIGHT-1 && j_zero == HEIGHT-1) {
		return "WallRight"
	}	else if (i_zero == 0 && j_zero > 0 && j_zero < WIDTH-1) {
		return "WallUp"
	}	else if (i_zero == HEIGHT-1 && j_zero > 0 && j_zero < WIDTH-1) {
		return "WallDown"
	} else {
		return "Other";
	};
}