// rendering code for dungeons
// this software is available under MIT License, see LICENSE for more info
// free software is our future

function drawInventory() {
  ctx.fillStyle = 'black';
  ctx.fillRect(10, 10, 652, 460);
  ctx.fillStyle = 'white';
  ctx.textAlign = "center";
  ctx.font = "16pt '04b03r'";
  ctx.fillText("Inventory", 336, 40);
  ctx.font = "12pt '04b03r'";
  ctx.textAlign = "left";
  ctx.strokeStyle = "white";
  ctx.strokeRect(15, 50, 642, 275); // item list
  ctx.strokeRect(15, 335, 642, 130); // cur item desc
  if (player.inventory.length == 1) {
		ctx.fillText("Sorry, but it seems you haven't got any items in your inventory :(", 30, 65);
	} else {
		for (var i=pageStart; i < Math.min(player.inventory.length, pageStart + ITEMS_PER_PAGE); i++) {
      ctx.textAlign = "left";
			if (player.хуйня[items[player.inventory[i].itemId].slot] == player.inventory[i].inventoryId)
				ctx.fillStyle = "yellow";
			else
				ctx.fillStyle = "white";
			ctx.fillText(items[player.inventory[i].itemId].name, 30, 65 + 18*(i-pageStart));
      ctx.textAlign = "right";
			ctx.fillText(player.inventory[i].count, 647, 65 + 18*(i-pageStart));
		}
		ctx.fillStyle = "white";
    ctx.textAlign = "left";
		ctx.fillText(">", 20, 65 + 18 * (choice - pageStart));
	}
	
  if (player.inventory.length > 1) {
    // writing an item's description
    words = items[player.inventory[choice].itemId].desc.split(" ");
    i = 1;
    line = 0;
    cur = words[0];
    while (i <= words.length-1) {
      while ((i <= words.length-1) && (ctx.measureText(cur + " " + words[i]).width <= 622))
        cur += " " + words[i++];
      ctx.fillText(cur, 20, 350 + line*18);
      cur = "";
      line++;
    }	
  }
}

function drawSidebar() {
	ctx.textAlign = "left";
	ctx.fillStyle = 'gray';
	ctx.fillRect(672, 0, 822, 480);

	ctx.fillStyle = 'white';
	ctx.font = "16px '04b03r'";
	ctx.fillText(player.name, 682, 18);
	
	ctx.strokeRect(682, 35, 130, 3);
	ctx.fillStyle = 'green';
	ctx.fillRect(682, 35, (player.hp / player.maxHp)*130, 3);

	ctx.strokeRect(682, 55, 130, 3);
	ctx.fillStyle = '#FFA000';
	ctx.fillRect(682, 55, (player.xp / player.toNextLvl)*130, 3);

	ctx.fillStyle = 'white';
	ctx.font = "10px Visitor";
	ctx.fillText("level "+player.lvl, 682, 26);
	ctx.fillText(getFloorString(dungeon.level)+" floor", 747, 26);
	ctx.fillText(player.hp+"/"+player.maxHp+" HP", 682, 47);
	ctx.fillText(player.xp+"/"+player.toNextLvl+" XP", 682, 67);
	ctx.fillText("ATT: "+player.getAtt(), 682, 78);
	ctx.fillText("DEF: "+player.getDef(), 747, 78);
	ctx.fillText("X;Y: "+player.x+";"+player.y, 682, 105);
	
	for (i = 1; i <= 50; i++) {
		for (j = 1; j <= 50; j++) {
			ctx.putImageData(
				mapTiles[dungeon[i][j].known ? (dungeon[i][j].tile == T_EXIT ? MT_EXIT : dungeon[i][j].monster ? MT_MONSTER : (dungeon[i][j].pass ? MT_FLOOR : MT_WALL)) : MT_UNDEF],
				672+((i-1)*3),
				330+((j-1)*3)
			);
		}
	}
	ctx.putImageData(mapTiles[MT_PLAYER], 672+((player.x-1)*3), 330+((player.y-1)*3));
}
function drawMap() {
	var startX, startY;
	startX = Math.max(1, Math.min(51-G_WIDTH, player.x-10));
	startY = Math.max(1, Math.min(51-G_HEIGHT, player.y-7));

	for (var i = startX; i < startX + G_WIDTH; i++) {
		for (var j = startY; j < startY + G_HEIGHT; j++) {
			ctx.drawImage(tTerrains[dungeon[i][j].tile], (i-startX)*TILESIZE, (j-startY)*TILESIZE);
			if (dungeon[i][j].monster) { 
				ctx.drawImage(tMonsters[monsters[dungeon[i][j].monster].type][monsters[dungeon[i][j].monster].dir], (i-startX)*TILESIZE, (j-startY)*TILESIZE);
			}
		}
	}
	ctx.drawImage(tPlayer[player.dir], (player.x - startX)*TILESIZE, (player.y - startY)*TILESIZE);
}

function levelExit(full) {
	if (full) {
		setKeyListener(levelExitKeyHandler);
		choice = 1;
		ctx.fillStyle = 'black';
		ctx.fillRect(10, 10, 652, 460);
		ctx.fillStyle = 'white';
		ctx.textAlign = "center";
		ctx.font = "32pt '04b03r'";
		ctx.fillText("Escape dungeon", 336, 50);
		ctx.font = "12pt '04b03r'";
		ctx.textAlign = "left";
		ctx.fillText("What do you want to do?", 20, 90);
	}
	ctx.font = "12pt '04b03r'";
	ctx.fillStyle = 'black';
	ctx.fillRect(450, 75, 200, 65);	
	ctx.textAlign = "left";
	ctx.fillStyle = 'white';
	ctx.fillText("Stay", 652-ctx.measureText("Shop and leave").width, 90);
	ctx.fillText("Leave", 652-ctx.measureText("Shop and leave").width, 110);
	ctx.fillText("Shop and leave", 652-ctx.measureText("Shop and leave").width, 130);
	ctx.fillText(">", 652-ctx.measureText("Shop and leave").width-10, 70 + 20*choice);
}