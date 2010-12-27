// roguelike dungeon generating code
// 2010 no copyright — mariofag
// free software is our future

/*function generateDungeon() {
	function gridCell(startX, startY, endX, endY) {
		this.startX = startX;
		this.startY = startY;
		this.endX = endX;
		this.endY = endY;
	}
	function walker(x, y) {
		this.x = x;
		this.y = y;
		this.dead = false;
		this.moveTo = function (dir, i, limit, xMin, xMax, yMin, yMax, check) {
			var xOff = new Array(0, 0, 1, 0, -1);
			var yOff = new Array(0, -1, 0, 1, 0);
			var tempX = this.x + xOff[dir];
			var tempY = this.y + yOff[dir];
			if (tempX > xMax || tempY > yMax || tempX < xMin || tempY < yMin || (check && dun[tempX][tempY].pass)) {
				if (i < limit) {
					this.moveTo((dir + 1) % 5, i+1, limit, xMin, xMax, yMin, yMax, check);
				}
			} else {
				this.x = tempX;
				this.y = tempY;
			}
		}
	}
	function diffFill(cell) {
		var x = 0;
		dun[Math.round((cell.endX + cell.startX)/2)][Math.round((cell.endY + cell.startY)/2)] = new dungeonTile(1, true, 0);
		while (x < ((cell.endX-cell.startX)*(cell.endY-cell.startY))/2) {
			var walkers = new Array();
			for (var i = 0; i < 5; i++) {
				walkers[i] = new walker(rand(cell.startX+1, cell.endX-1), rand(cell.startY+1, cell.endY-1));
			}
			var cont = true;
			while (cont) {
				cont = false;
				for(var i = 0; i < 5; i++) {
					if (!walkers[i].dead) {
						walkers[i].moveTo(Math.round(Math.random()*3+1), 0, 4, cell.startX+1, cell.endX-1, cell.startY+1, cell.endY-1, true);
						if (dun[walkers[i].x-1][walkers[i].y].pass || dun[walkers[i].x+1][walkers[i].y].pass || dun[walkers[i].x][walkers[i].y-1].pass || dun[walkers[i].x][walkers[i].y+1].pass) {
							dun[walkers[i].x][walkers[i].y].pass = true;
							dun[walkers[i].x][walkers[i].y].tile = 1;
							walkers[i].dead = true;
							x++;
						}
					}
				}
				if (x > ((cell.endX-cell.startX)*(cell.endY-cell.startY))/2) break;
			}
		}		
	}
	function connect(from, to) {
		function rand2(a,b) {
			var choice = new Array(a,b);
			return choice[rand(0,1)];
		}
		var w = new walker(Math.round((from.endX + from.startX)/2), Math.round((from.endY + from.startY)/2));
		var toX = Math.round((to.endX + to.startX)/2);
		var toY = Math.round((to.endY + to.startY)/2);
		
		while ((w.x != toX) || (w.y != toY)) {
			w.moveTo((w.x > toX) ? (w.y > toY ? rand2(1,4) : rand2(3,4)) : (w.y > toY ? rand2(1,2) : rand2(2,3))
			, 0, 4, 1, 50, 1, 50, false);
			dun[w.x][w.y].tile = 1;
			dun[w.x][w.y].pass = true;
		}
	}
	var dun = new Array();
	for (var i=1; i <= 50; i++) {
	  dun[i] = new Array();
	  for (var j=1; j <= 50; j++) {
	    dun[i][j] = new dungeonTile(2, false, 0);
	  }
	}	
	var prevI = 1;
	var prevJ = 1;
	var grid = new Array();
	var x = 0;
	for (var i = rand(10,13); i <= 50; i += (i == 50) ? 10 : ((i >= 37) ? (50 - i) : rand(10,13))) {
		if (i > 50) continue;
		prevJ = 1;
		for (var j = rand(10,13); j <= 50; j += (j == 50) ? 10 : ((j >= 37) ? (50 - j) : rand(10,13))) {
			if (j > 50) continue;
			grid[x++] = new gridCell(prevI, prevJ, i, j);
			prevJ = j;
		}
		prevI = i;
	}
	prevI = -1;
	//prevI = new Array();
	//for (var i=0; i < grid.length; i += rand(1,2)) {
	for (var i=0; i < grid.length; i++) {
		diffFill(grid[i]);
		if (prevI > -1) connect(grid[prevI], grid[i]);
		//for (var j=0; j < prevI.length; j++) {
		//	connect(grid[prevI[j]], grid[i]);
		//}
		prevI = i;
		//prevI[prevI.length] = i;
	}

	return dun;
}*/
/*function generateDungeon() {
	function walker(x, y) {
		this.x = x;
		this.y = y;
		this.dead = false;
		this.moveTo = function (dir, i, limit) {
			var xOff = new Array(0, 0, 1, 0, -1);
			var yOff = new Array(0, -1, 0, 1, 0);
			
			var tempX = this.x + xOff[dir];
			var tempY = this.y + yOff[dir];
			
			
			if (tempX > 49 || tempY > 49 || tempX < 2 || tempY < 2 || dun[tempX][tempY].pass) {
				if (i < limit) {
					this.moveTo((dir + 1) % 5, i+1, limit);
				}
			} else {
				this.x = tempX;
				this.y = tempY;
			}
		}
	}
	var dun = new Array();
	for (var i=1; i <= 50; i++) {
	  dun[i] = new Array();
	  for (var j=1; j <= 50; j++) {
	    dun[i][j] = new dungeonTile(2, false, 0);
	  }
	}	
	dun[25][25] = new dungeonTile(1, true, 0);
	var x = 0;
	while (x < 2500) {
		var walkers = new Array();
		for (var i = 0; i < 20; i++) {
			walkers[i] = new walker(Math.round(Math.random() * 47) + 2, Math.round(Math.random() * 47) + 2);
		}
		var cont = true;
		while (cont) {
			cont = false;
			for(var i = 0; i < 20; i++) {
				if (!walkers[i].dead) {
					walkers[i].moveTo(Math.round(Math.random()*3+1), 0, 4);
					if (dun[walkers[i].x-1][walkers[i].y].pass || dun[walkers[i].x+1][walkers[i].y].pass || dun[walkers[i].x][walkers[i].y-1].pass || dun[walkers[i].x][walkers[i].y+1].pass) {
						dun[walkers[i].x][walkers[i].y].pass = true;
						dun[walkers[i].x][walkers[i].y].tile = 1;
						walkers[i].dead = true;
						x++;
					}
				}
			}
			if (x > 2500) break;
		}
	}
	return dun;	
}*/

function generateDungeon() {
	function treeGrid(startX, startY, endX, endY) {
		this.startX = startX;
		this.startY = startY;
		this.endX = endX;
		this.endY = endY;
	}
	
	function rand(a,b) {
		if (a > b) {
			x = a;
			a = b;
			b = a;
		}
		return Math.round(Math.random()*(b-a))+parseInt(a);
	}
	function walker(x, y) {
		this.x = x;
		this.y = y;
		this.dead = false;
		this.moveTo = function (dir, i, limit, xMin, xMax, yMin, yMax, check) {
			var xOff = new Array(0, 0, 1, 0, -1);
			var yOff = new Array(0, -1, 0, 1, 0);
			var tempX = this.x + xOff[dir];
			var tempY = this.y + yOff[dir];
			if (tempX > xMax || tempY > yMax || tempX < xMin || tempY < yMin || (check && dun[tempX][tempY].pass)) {
				if (i < limit) {
					this.moveTo((dir + 1) % 5, i+1, limit, xMin, xMax, yMin, yMax, check);
				}
			} else {
				this.x = tempX;
				this.y = tempY;
			}
		}
	}
	function diffFill(cell) {
		var x = 0;
		dun[Math.round((cell.endX + cell.startX)/2)][Math.round((cell.endY + cell.startY)/2)] = new dungeonTile(1, true, 0);
		while (x < ((cell.endX-cell.startX)*(cell.endY-cell.startY))/2) {
			var walkers = new Array();
			for (var i = 0; i < 5; i++) {
				walkers[i] = new walker(rand(cell.startX+1, cell.endX-1), rand(cell.startY+1, cell.endY-1));
			}
			var cont = true;
			while (cont) {
				cont = false;
				for(var i = 0; i < 5; i++) {
					if (!walkers[i].dead) {
						walkers[i].moveTo(Math.round(Math.random()*3+1), 0, 4, cell.startX+1, cell.endX-1, cell.startY+1, cell.endY-1, true);
						if (dun[walkers[i].x-1][walkers[i].y].pass || dun[walkers[i].x+1][walkers[i].y].pass || dun[walkers[i].x][walkers[i].y-1].pass || dun[walkers[i].x][walkers[i].y+1].pass) {
							dun[walkers[i].x][walkers[i].y].pass = true;
							dun[walkers[i].x][walkers[i].y].tile = 1;
							walkers[i].dead = true;
							x++;
						}
					}
				}
				if (x > ((cell.endX-cell.startX)*(cell.endY-cell.startY))/2) break;
			}
		}		
	}
	function connect(from, to) {
		function rand2(a,b) {
			var choice = new Array(a,b);
			return choice[rand(0,1)];
		}
		var w = new walker(Math.round((from.endX + from.startX)/2), Math.round((from.endY + from.startY)/2));
		var toX = Math.round((to.endX + to.startX)/2);
		var toY = Math.round((to.endY + to.startY)/2);
		
		while ((w.x != toX) || (w.y != toY)) {
			w.moveTo((w.x > toX) ? (w.y > toY ? rand2(1,4) : rand2(3,4)) : (w.y > toY ? rand2(1,2) : rand2(2,3))
			, 0, 4, 1, 50, 1, 50, false);
			dun[w.x][w.y].tile = 1;
			dun[w.x][w.y].pass = true;
		}
	}		
	var tree = new Array();
	tree[1] = new treeGrid(1, 1, 50, 50);
	
	for (var i = 2; i <= 31; i += 2) {
		if (rand(0,1)) {
			tree[i] = new treeGrid(tree[Math.floor(i/2)].startX, 
				tree[Math.floor(i/2)].startY,
				Math.floor(tree[Math.floor(i/2)].startX + ((tree[Math.floor(i/2)].endX - tree[Math.floor(i/2)].startX + 1)* (rand(45,55)/100))),
				tree[Math.floor(i/2)].endY);
			tree[i+1] = new treeGrid(tree[i].endX, tree[i].startY, tree[Math.floor(i/2)].endX, tree[Math.floor(i/2)].endY);
		} else {
			tree[i] = new treeGrid(tree[Math.floor(i/2)].startX,
				tree[Math.floor(i/2)].startY,
				tree[Math.floor(i/2)].endX,
				Math.floor(tree[Math.floor(i/2)].startY + ((tree[Math.floor(i/2)].endY - tree[Math.floor(i/2)].startY + 1)* (rand(45,55)/100))));
			tree[i+1] = new treeGrid(tree[i].startX, tree[i].endY, tree[Math.floor(i/2)].endX, tree[Math.floor(i/2)].endY);				
		}
	}
	
	var dun = new Array();
	for (var i=0; i <= 51; i++) {
	  dun[i] = new Array();
	  for (var j=0; j <= 51; j++) {
	    dun[i][j] = new dungeonTile(2, false, 0);
	  }
	}	
	
	for (var i = 16; i <= 31; i++) diffFill(tree[i]);
	for (var i = 4; i >= 0; i--) {
		for (var j = Math.pow(2, i); j <= Math.pow(2, i+1)-1; j += 2) connect(tree[j], tree[j+1]);
	}
	
	
	return dun;
}