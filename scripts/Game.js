//images (64x64)
var img_artifacts = "images/iconlist_artifacts.png"; // 64x64 misc. object  spritesheet
var img_magic = "images/iconlist_magic.png"; // 64x64 magic spritesheet
var img_physical = "images/iconlist_physical.png"; //64x64 physical attack spritesheet
var img_ui = "images/iconlist_ui.png"; //64x64 ui spritesheet
var img_def64 = "images/default_64.png"; //default 64x64 image

//icons (16x16)
var ico_list = "images/icon_list_16.png"; //16x16 icon spritesheet

//Arrays
var death_message = /* This array contains all the phrases which show up when you die */
        ["The generic enemy attacks and you fail to block, causing your hitpoints to drop below 0. You die.",
            "Your armour fails to relect the weapon aimed at your face.",
            "Your armour is less effective than the enemy's weapon.",
            "Blocking that attack is basic knowledge at the Warrior Training School...",
            "You are sent to The Place Where All Beings Are Eternally Blessed."];
var inventory = []; // This array contains the items the inventory has
var shop_list = []; // This array contains the items the shop has - all array work is done in the shop functions 
var map = []; // This array contains the locations known by the player
var book = []; // This array contains the encyclopedia titles for information
var errands = []; // This array contains the errands accepted by the player
var enemy_list = /* This array contains all the different enemies you can can face - purely cosmetic at the moment - NOTE: Should change resistances and max health of each type in the near future, also area-dependant enemies */
        ["orc", "bandit", "golem", "spider", "bat", "wraith", "ghost", "troll", "ogre"];
var adjective_list = /* This array contains all the adjectives an enemy can have - purely cosmetic */
        ["stupid", "nasty", "terrible", "ugly", "mean", "frightening", "fearsome", "egotistical", "badly-disguised", "annoying", "idiotic", "armed", "armoured", "stereotyped", "ghostly", "orcish", "wraith-like", "trollish", "spidery", "golem-like"];
var shopkeeper = /* This array contains all the various phrases and actions the shopkeeper does */
        ["tells you about all the various bargains.",
            "complains about shoplifters.",
            "tells tales of mysterious dungeons and treasures.",
            "tells of strange and powerful artifacts."];
var rare_colour = /* This array contains the colour schemes for the item tiers - used with rare items to show what tier item they are */
    [
        "5b3318", "636b7e", "2c1a79", "686868", "171717", "442896", "207d45", "700202"
    ];

//Game variables
var player_hp; // Amount of health you have at the present
var enemy_hp; // Amount of health enemy has - dealt with during battle - eventBattle() function
var p_damage; // Amount of damage you deal - dealt with at runtime in the roll() function
var e_damage; // Amount of damage enemy deals - dealt with at runtime in the roll() function
var score = 0; // Number of enemies defeated this run for previously in-place score system
var highscore = 0; // High score for previously in-place score system
var menuscreen = "inventory"; // For planned menu screens e.g. travel screen for selecting destinations, inventory screen for managing items, stats screen for managing stats
var battle = false; // Boolean defines whether hp potions display enemy health on readout
var current_location; // Your current location
var dungeon = false; // Determines whether to give prize after defeating all enemies
var enemy_number; // Amount of enemies in dungeon
var enemy_strength = 15; // How much health enemies have * current_location.difficulty
var able_to_travel;
var btn1; // These variables are shorthand for the three event buttons
var btn2;
var btn3;
var info; // Shorthand for text above event buttons
var readout // Shorthand for text below event buttons
var inv_sell = false; // Boolean defines whether you are selling items or not

//Sorting
var show_weapons = true;
var show_armour = true;
var show_consumables = true;

//Stats
var stat_maxhp = 20; // Maximum amount of hitpoints player has
var stat_gold = 5; // Amount of gold player has
var stat_level = 1; // Player awesomeness rating
var stat_experience = 0; // Player experience in battle, more difficult locations provide more experience
var stat_next_level = stat_level * 100; // How much experience is required to progress to the next level
var stats = [0, 0, 0, 0]; // Battle stats (attack, defence, magic attack, magic defence)
var equipped = ["00", "none", "none", "none"]; // Array containing equipped items - weapon, armour, amulet, misc

function init() {
    'use strict';
    $("#menubar").html('<li id="menubar_inv" class="menu_icon glow">Inventory</li>' +
                       '<li id="menubar_tvl" class="menu_icon glow">Travel</li>' +
                       '<li id="menubar_ecp" class="menu_icon glow">Encyclopedia</li>');
    $("#menubar_inv").on("click", function () {
        viewMenu("inventory");
    });
	$("#menubar_tvl").on("click", function () {
        viewMenu("locations");
    });
    $("#menubar_ecp").on("click", function () {
        viewMenu("encyclopedia");
    });
    /* $("#menubar_qst").on("click", function () {
        viewMenu("errands");
    }); */
    player_hp = stat_maxhp;
    btn1 = $("#eventbutton01");
    btn2 = $("#eventbutton02");
    btn3 = $("#eventbutton03");
	info = $("#info");
	readout = $("#readout");
    for(var i = 0; i < inventory.length; i += 1) {
        inventory.pop();
    }
    shop_list.pop();
    initShop();
	initLocations();
	eventTown();
    viewStats();
	viewMenu("inventory");
    load();
}
                                        // Explore functions
function eventExploreStart() {
    'use strict';
	window.setTimeout("eventExploreArrival()", 1000);
	info.html("Exploring...");
	btn1.hide();
	btn2.hide();
	btn3.hide();
}
function eventExploreArrival(w) {
	info.html(current_location.arrival_text);
	dungeon = false;
    able_to_travel = true;
	if (w !== true) {
		eventExploreEnd();
		return(" ");
	}
    readout.html("Your health: " + player_hp + " / " + stat_maxhp);
	btn1.show();
	btn1.html("<div class='btn_icon' style='background-position:-128px, 0px; background-image:url(" + img_ui + ")'></div>Explore");
	btn1.off('click').on("click", function () {
        eventExploreStart();
    });
	btn2.hide();
    btn3.hide();
}
function eventExploreEnd() {
    'use strict';
    var rand = Math.floor(Math.random() * 3);
    //Later, this switch statement should check the location you are exploring and throw a random number for encounters
    //Pressing explore brings up menu to select location - buttons for switching between searching for locations and going to found ones
    switch (rand) {
    case 0:
        info.html("You find a penny in the " + current_location.ground_type + ".<br>+1 gold.");
        stat_gold += 1;
        btn1.show();
        btn1.html("<div class='btn_icon' style='background-position:-128px, 0px; background-image:url(" + img_ui + ")'></div>Onward!");
		btn1.off("click").on("click",
			function() {
				eventExploreStart();
			}
		)
		btn2.hide();
        viewStats();
        break;
    case 1:
        info.html("All of a sudden " + desc() + " jumps out of nowhere!");
        eventBattle("nodesc");
        break;
    case 2:
		var number = Math.ceil(Math.random() * 5) + 1;
        info.html("You find a dungeon entrance! It has " + number + " enemies.");
        btn1.show();
        btn1.html('<div class="btn_icon"></div>Enter Dungeon');
		btn1.off("click").on("click",
			function() {
				eventBattle("dungeon", number);
			}
		)
        btn2.show();
        btn2.html("<div class='btn_icon' style='background-position:-128px, 0px; background-image:url("  + img_ui + ")'></div>Continue Exploring");
		btn2.off("click").on("click",
			function() {
				eventExploreStart();
			}
		)
        break;
    case 3:
        info.html("You found a rare item!");
        createRareItem();
        if (menuscreen === "inventory") {
            updateItems();
        }
        btn1.show();
        btn1.html('<div class="btn_icon"></div>Onward!');
		btn1.off("click").on("click",
			function() {
				eventExploreStart();
			}
		)
        break;
    case 4:

        break;
    }
}
function eventTown(t) {
    'use strict';
	current_location = "town";
	dungeon = false;
    able_to_travel = true;
    eventShop("hide");
    btn1.show();
    btn1.html('<div class="btn_icon"></div>Shop');
    btn1.off('click').on("click", function () {
        eventShop("show");
    });
    btn2.show();
    btn2.html("<div class='btn_icon' style='background-position:0px 0px; background-image:url(" + img_artifacts + ")'></div>Heal");
    btn2.off('click').on("click", function () {
        if (stat_gold >= 5) {
			if (confirm("Spend 5 gold to heal fully?") === true) {
				player_hp = stat_maxhp;
				stat_gold -= 5;
				info.html("Healed!");
				readout.html("Your health: " + player_hp + " / " + stat_maxhp);
				viewStats();
			}
		} else {
			info.html("You do not have enough gold");
		}
    });
    btn3.show();
    btn3.html("<div class='btn_icon'></div>Town Square");
    btn3.off('click').on("click", function () {
        eventTownSquare();
    });
    readout.html("Your health: " + player_hp + " / " + stat_maxhp);
    info.html("Welcome to the Town");
    if (t === "shop") {
        info.html("Click the 'travel' button to explore!");
    }
}
function eventTownSquare() {
    btn1.show();
    btn1.html('<div class="btn_icon"></div>Back to Town');
    btn1.off('click').on("click", function () {
        eventTown();
    });
    btn2.show();
    btn2.html("<div class='btn_icon'></div>Look for Quest");
    btn2.off('click').on("click", function () {
        
    });
    btn3.hide();
}
                                        //shop functions
function initShop() {
    'use strict';
    var newitem = {};
	newitem.listy = -128; newitem.type = "Consumable"; newitem.itemid = "c2"; newitem.listx = -32; newitem.heal = 10; newitem.gold = 5; newitem.name = "Health vial";	newitem.desc = "A glass vial containing some sort of red healing liquid";
    shop_list.push(newitem);
    newitem.count = 2;
    inventory.push(newitem);
	newitem = {};
	newitem.listy = -128; newitem.type = "Consumable"; newitem.itemid = "c1"; newitem.listx = 0; newitem.heal = 20; newitem.gold = 10; newitem.name = "Health potion";	newitem.desc = "A glass bottle containing some sort of red healing liquid";
    shop_list.push(newitem);
	newitem = {};
	for (var m in data.materials) {
        for (var i in data.items) {
            newitem.listy   = data.items[i].y;
            newitem.type    = data.items[i].type;
			newitem.itemid  = i.toString() + m.toString();
            newitem.listx   = data.materials[m].x;
            newitem.damage  = data.items[i].damage   * data.materials[m].damage_mult;
            newitem.defence = data.items[i].defence  * data.materials[m].defence_mult;
            newitem.gold    = data.items[i].gold     * data.materials[m].gold_mult;
            newitem.name    = data.materials[m].name + " " + data.items[i].name;
            newitem.desc    = data.items[i].description.replace("-mat-", data.materials[m].name.toLowerCase());
            shop_list.push(newitem);
			if (newitem.itemid === "00") {
				newitem.count = 1;
				inventory.push(newitem);
			}
            newitem = {};
        }
    }
    updateShop();
}
function updateShop() {
    'use strict';
    var iconx = shop_list[0].listx, icony = shop_list[0].listy, a, i, t = " ";
    for (a = 0; a < shop_list.length; a += 1) {
        iconx = shop_list[a].listx;
        icony = shop_list[a].listy;
        t += "<li id='" + a + "' class='shop'> <div class='inv_icon' style='background-position:" + iconx + "px " + icony + "px'></div>" + shop_list[a].name;
        if (stat_gold < shop_list[a].gold) {
            t += "<i style='color:#FF0000'> - Not enough gold</i>";
        }
        t += "</li>";
    }
    $("#shop_list").html(t);
    $("#shop_heading").html("Shop");
    readout.html("<div class='inv_icon' style='float:none; background-position:0px 0px; display:inline-block;'></div>: " + stat_gold);
    $("li.shop").hover(
        function () {
            $(this).css("background-color", "#DDD");
            var item = shop_list[this.id];
            viewItem(item);
        },
        function () {
            $(this).css("background-color", "#FFF");
            viewStats();
        }
    );
    $("li.shop").off("click").on("click",
        function () {
            var item = shop_list[this.id];
            //var info = $("#this.id").html();
            if (stat_gold >= item.gold) {
				stat_gold -= item.gold;
                updateShop();
				for (i = 0; i < inventory.length; i += 1) {
					if(inventory[i].itemid === item.itemid) {
						inventory[i].count += 1;
						updateItems();
						return(" ");
					}
				}
				item.count = 1;
				inventory.push(item);
                updateItems();
            }
        });
}
function eventShop(visible) {
    'use strict';
    switch (visible) {
    case "show":
        updateShop();
        inv_sell = false;
        $("#shop").show();
        btn1.html('<div class="btn_icon"></div>Exit to Town');
        btn1.off('click').on("click", function () {
            eventTown();
        });
        btn2.show();
        btn2.html('<div class="btn_icon"></div>Sell Items');
        btn2.off('click').on("click", function () {
            shopSell();
        });
        btn3.hide();
        info.html('The shopkeeper ' + shopkeeper[Math.floor(Math.random() * shopkeeper.length)]);
        able_to_travel = false;
        break;
    case "hide":
        $("#shop").hide();
        break;
    }
}
function shopSell() {
    "use strict";
    menuscreen = "inventory";
    if(inv_sell === false) {
        btn2.html('<div class="btn_icon"></div>Stop selling items');
        btn1.hide();
        info.html("Click on items to sell them.");
        inv_sell = true;
		updateItems();
    } else {
        eventShop("show");
		updateItems();
        btn1.show();
    }
}
                                        //battle functions
function eventBattle(t, n) {
    /*if (player_hp <= 0) {
        if(score > highscore) {
          highscore = score;
        }
      score = 0;
      }
    */
    'use strict';
	enemy_number = 1;
	btn1.show();
    btn1.off('click').on('click', function () {
        roll();
    });
    btn1.html('<div class="btn_icon" style="background-position:0px 0px; background-image:url(' + img_physical + ')"></div>Fight');
    btn2.hide();
    btn3.hide();
    enemy_hp = enemy_strength * current_location.difficulty;
    battle = true;
    if (t !== "nodesc") {
        info.html("You have ventured into a dungeon!<br>Suddenly, " + desc() + " jumps out of nowhere and challenges you to a fight.");
    } if (t === "dungeon") {
		enemy_number = n;
		dungeon = true;
	}
    readout.html("Your health: " + player_hp + " / " + stat_maxhp + "<br>Enemy health: " + enemy_hp);
    able_to_travel = false;
}
function updateFight() {
    'use strict';
    var damage_info = "You hit the enemy for " + p_damage + " damage.<br>You were hit for " + e_damage + " damage.<br>";
    info.html(damage_info);
    if (player_hp <= 0) {
		var gold_loss = Math.floor(stat_gold / 4);
        player_hp = 0;
		stat_gold -= gold_loss;
        if (enemy_hp <= 0) {
            enemy_hp = 0;
        }
        info.html(damage_info + death_message[Math.floor(Math.random() * death_message.length)] + "<br>You lose " + gold_loss + " gold.");
        btn1.show();
		btn1.html('<div class="btn_icon"></div>Back to Town');
        btn1.off('click').on("click", function () {
            player_hp = 1;
			eventTown();
        });
		btn2.hide();
    } else if (enemy_hp <= 0) {
		enemy_hp = 0;
        var gold_inc = Math.ceil(Math.random() * 10 * current_location.difficulty), xp_inc = current_location.difficulty * 5;
        stat_gold += gold_inc;
		stat_experience += xp_inc;
        battle = false;
        able_to_travel = true;
        enemy_number -= 1;
		info.html("You have won!<br>You gained " + gold_inc + " gold and " + xp_inc + " experience!");
		readout.html("Your health: " + player_hp + " / " + stat_maxhp);
		btn1.hide();
		btn2.show();
		btn2.html('<div class="btn_icon" style="background-position:-128px 0px; background-image:url(' + img_ui + ')"></div>Explore');
		btn2.off('click').on("click", function () {
            eventExploreStart();
        });
		if (enemy_number > 0) {
			btn1.show();
			btn1.html('<div class="btn_icon" style="background-position:0px 0px; background-image:url(' + img_def64 + ')"></div>Next Enemy');
			btn1.off('click').on('click', function () {
				eventBattle("dungeon", enemy_number);
			});
			btn2.hide();
            if (enemy_number = 1) {
                info.html(info.html() + "<br>There is " + enemy_number + " enemy left.");
            } else {
                info.html(info.html() + "<br>There are " + enemy_number + " enemies left.");
            }
			readout.html("Your health: " + player_hp + " / " + stat_maxhp);
		} else if (dungeon === true) {
			var dungeon_prize = Math.ceil(Math.random() * current_location.difficulty) + 10, i;
            var info_text = "You have defeated the last enemy!<br>You gain " + gold_inc + " gold and " + xp_inc + " experience!<br>The reward for defeating the dungeon is " + dungeon_prize + " gold";
			if (Math.random <= 0.05) {
                createRareItem();
                info_text += " and a <span style='color:" + rare_colour[stat_level] + "'>rare item!<span>";
                i = true;
            }
            dungeon = false;
			stat_gold += dungeon_prize;
            able_to_travel = true;
            if (i !== true) {
                info_text += ".";
            }
			info.html(info_text);
			btn1.hide();
			btn2.show();
			btn2.html('<div class="btn_icon" style="background-position:-128px 0px; background-image:url(' + img_ui + ')"></div>Explore');
			btn2.off('click').on("click", function () {
				eventExploreStart();
			});
		}
    }
    readout.html("Your health: " + player_hp + " / " + stat_maxhp + "<br>Enemy health: " + enemy_hp);
	viewStats();
}
function eventEscape() {
    'use strict';
    var escapechance = Math.random();
    if (escapechance >= 0.2) {
        info.html("You have successfully escaped!");
        btn1.off('click').on('click', function () {
            eventBattle();
        });
        btn2.hide();
        btn3.hide();
    } else {
        info.html("You are unable to turn and run!");
    }
}
function desc() {
    'use strict';
    var enemy = enemy_list[Math.floor(Math.random() * enemy_list.length)], adjective = adjective_list[Math.floor(Math.random() * adjective_list.length)], vowel = /[aeiou]/i, aa = "a ";
    if (adjective.search(vowel) === 0) {aa = "an "; }
    return (aa + adjective + " " + enemy);
}
function roll() {
    'use strict';
    if (player_hp <= 0 || enemy_hp <= 0) {
        updateFight();
    } else {
        p_damage = Math.floor(Math.random() * (stats[0] + 1));
        e_damage = current_location.difficulty;
		if (stats[1] > 0) {
			e_damage -= Math.round(Math.random() * stats[1]);
		}
		if(e_damage < 0 || e_damage === NaN) {
			e_damage = 0;
		}
        player_hp -= e_damage;
        enemy_hp -= p_damage;
        updateFight(enemy_number);
    }
}
										//menu and inventory functions
function updateItems() {
    'use strict';
    var iconx, icony, a, t = " ";
    if (inventory.length > 0) {
        for (a = 0; a < inventory.length; a += 1) {
            iconx = inventory[a].listx;
            icony = inventory[a].listy;
            t += "<li id='" + a + "' class='inv'> <div class='inv_icon' style='background-position:" + iconx + "px " + icony + "px'></div><p class='invlist'>" + inventory[a].name + " (" + inventory[a].count + ")";
            if (equipped[0] === inventory[a].itemid || equipped[1] === inventory[a].itemid || equipped[2] === inventory[a].itemid) {
                t += "<i> - Equipped</i>";
            }
            t += "</li>";
        }
    }
    $("#menu_list_left").html(t);

    //Mouseover stats
    $("li.inv").hover(
        function () {
            $(this).css("background-color", "#DDD");
            var item = inventory[this.id];
            viewItem(item);
        },
        function () {
            $(this).css("background-color", "#FFF");
            viewStats();
        }
    );
    $("li.inv").off("click").on("click",
        function () {
            var item = inventory[this.id], info = $("#this.id").html(), hpText;
            switch (item.type) {
            case "Weapon":
                if (equipped[0] === item.itemid) {
                    equipped[0] = "none";
                } else {
                    equipped[0] = item.itemid;
                }
                break;
            case "Armour":
                if (equipped[1] === item.itemid) {
                    equipped[1] = "none";
                } else {
                    equipped[1] = item.itemid;
                }
                break;
            case "Amulet":
                if (equipped[2] === item.itemid) {
                    equipped[2] = "none";
                } else {
                    equipped[2] = item.itemid;
                }
                break;
            case "Consumable":
                player_hp += item.heal;
                hpText = "Your health: " + player_hp + " / " + stat_maxhp;
                if (battle === true) {
                    hpText += "<br>Enemy health: " + enemy_hp;
                }
                readout.html(hpText);
                $("#info").html("You were healed for " + item.heal + " health.");
                inventory[this.id].count -= 1;
				if (inventory[this.id].count <= 0) {
					inventory.splice(this.id, 1);
				}
                break;
            }
            if (menuscreen === "inventory") {
                updateItems();
            }
        });
    if (inv_sell === true) {
        $("li.inv").off("click").on("click",
            function () {
                var item = inventory[this.id], info = $("#this.id").html(), i;
                stat_gold += item.gold;
				item.count -= 1;
				if (item.count <= 0) {
					for (i = 0; i < equipped.length; i += 1) {
						if (equipped[i] === item.itemid) {
							equipped[i] = "none";
						}
					}
					inventory.splice(this.id, 1);
				}
                readout.html("<div class='inv_icon' style='float:none; background-position:0px 0px; display:inline-block;'></div>: " + stat_gold);
                viewStats();
                updateItems();
            }
        );
    }
}
function createRareItem() {
	"use strict";
	var newitem = {}, i = Math.floor(Math.random() * data.items.length), m = Math.floor(stat_level / 3), rare_multiplier = (Math.random() * 1.5) + 1;
	newitem.listy   = data.items[i].y;
	newitem.type    = data.items[i].type;
	newitem.itemid  = Math.random();
	newitem.listx   = data.materials[m].x;
	newitem.damage  = Math.ceil(data.items[i].damage  * data.materials[m].damage_mult * rare_multiplier);
	newitem.defence = Math.ceil(data.items[i].defence * data.materials[m].defence_mult * rare_multiplier);
	newitem.gold    = Math.ceil(data.items[i].gold    * data.materials[m].gold_mult * rare_multiplier);
	newitem.name    = "<span style='color:#" + rare_colour[m] + "'>Unique</span> " + data.materials[m].name + " " + data.items[i].name;
	newitem.desc    = data.items[i].description.replace("-mat-", data.materials[m].name.toLowerCase()) + "<br><span style='color:#" + rare_colour[m] + "'>It almost seems to glow with power</span>";
	newitem.count   = 1;
	newitem.rare    = rare_multiplier;
	inventory.push(newitem);
}
function viewItem(item) {
    'use strict';
    var list_text;
    $("#menu_readout_top").html(item.desc);
    list_text = "<li class='stats'><b>" + item.type + "</b></li><li class='stats'><div class='inv_icon' style='background-position:0px 0px'></div>: " + item.gold + " gold</li>";
    if (typeof item.damage === 'number' && item.damage > 0) {
        list_text += "<li class='stats'><div class='inv_icon' style='background-position:-32px 0px'></div>: " + item.damage + " damage</li>";
    }
    if (typeof item.defence === 'number' && item.defence > 0) {
        list_text += "<li class='stats'><div class='inv_icon' style='background-position:-64px 0px'></div>: " + item.defence + " armour</li>";
    }
    if (typeof item.heal === 'number' && item.heal > 0) {
        list_text += "<li class='stats'><div class='inv_icon' style='background-position:-96px 0px'></div>: " + item.heal + " HP restored</li>";
    } if (typeof item.rare === 'number' && item.rare > 0) {
        list_text += "<li class='stats'><div class='inv_icon' style='background-position:-128px 0px'></div>: " + Math.round(item.rare * 1000)/1000 + " rareness</li>";
    }
    $("#menu_list_right").html(list_text);
    $("#menu_extended").hide();
    $("#menu_list_ext").hide();
}
function viewStats() {
    'use strict';
    var i, a, level_icon;
    for (a = 0; a < stats.length; a += 1) {
        stats[a] = 0;
    }
	while (stat_experience >= stat_next_level) {
		stat_level += 1;
		stat_experience -= stat_next_level;
		stat_next_level = stat_level * 100;
	}
    level_icon = (Math.floor(stat_level / 10) * 32) * -1;
    stat_maxhp = stat_level * 20;
    for (i = 0; i < equipped.length; i += 1) {
		invsearch:
        for (a = 0; a < inventory.length; a += 1) {
            if (inventory[a].itemid === equipped[i]) {
                if (equipped[i] !== "none") {
                    if (typeof inventory[a].damage === 'number' && inventory[a].damage > 0) {
                        stats[0] += inventory[a].damage;
                    } if (typeof inventory[a].defence === 'number' && inventory[a].defence > 0) {
                        stats[1] += inventory[a].defence;
                    } if (typeof inventory[a].magicatk === 'number' && inventory[a].magicatk > 0) {
                        stats[2] += inventory[a].magicatk;
                    } if (typeof inventory[a].magicdef === 'number' && inventory[a].magicdef > 0) {
                        stats[3] += inventory[a].magicdef;
                    } if (typeof inventory[a].health === 'number' && inventory[a].magicdef > 0) {
                        stat_maxhp += inventory[a].health;
                    }
					break invsearch;
                }
            }
        }
    }
    $("#menu_readout_top").html("Your stats:");
    $("#menu_list_right").html("<li class='stats'><div class='inv_icon' style='background-position:-96px 0px'></div>: " + stat_maxhp +
        " max health</li><li class='stats'><div class='inv_icon' style='background-position:0px 0px'></div>: " + stat_gold +
		" gold</li><li class='stats'><div class='inv_icon' style='background-position:" + level_icon + "px -64px'></div>: Level " + stat_level +
		" </li><li class='stats'><div class='inv_icon' style='background-position:-192px 0px'></div>: " + stat_experience + "/" + stat_next_level +
        " experience</li><li class='stats'><div class='inv_icon' style='background-position:-32px 0px'></div>: " + stats[0] +
        " damage</li><li class='stats'><div class='inv_icon' style='background-position:-64px 0px'></div>: " + stats[1] +
        " armour</li><li class='stats'><div class='inv_icon' style='background-position:-128px 0px'></div>: " + stats[3] +
        " magic resistance</li><li class='stats'><div class='inv_icon' style='background-position:-160px 0px'></div>: " + stats[2] +
        " magic damage</li>");
    $("#menu_extended").hide();
    $("#menu_list_ext").hide();
}
function viewMenu(screen) {
    'use strict';
    viewStats();
    switch (screen) {
        case "inventory":
            updateItems();
            $(".menuheading").html("Inventory");
            $("#list_heading").html("Inventory <i>(Click to use)</i>");
            $("#list_sort").html('<li id="sort_desc" style="font-size:8pt">Sort items:</li>' +
                             '<li id="sort_weapon" class="sort inv_icon" style="background-position:-32px 0px"></li>' +
                             '<li id="sort_armour" class="sort inv_icon" style="background-position:-64px 0px"></li>' +
                             '<li id="sort_consumables" class="sort inv_icon" style="background-position:0px -128px"></li><br>');
            $("li.sort").hover(
                function () {
                    $(this).css("border-color", "#000");
                }, function () {
                    $(this).css("border-color", "#FFF");
                }
            ); $("#sort_weapon").hover(
                function () {
                    $("#sort_desc").html("Show/hide weapons");
                }, function () {
                    $("#sort_desc").html("Sort items:");
                }
            ); $("#sort_weapon").on("click",
                 function () {
                    if (show_weapons === true) {
                        show_weapons = false;
                        $(this).css("opacity", "0.3");
                    } else {
                        show_weapons = true;
                        $(this).css("opacity", "1");
                    }
                    updateItems();
                }
            ); $("#sort_armour").hover(
                function () {
                    $("#sort_desc").html("Show/hide armour");
                }, function () {
                    $("#sort_desc").html("Sort items:");
                }
            ); $("#sort_armour").on("click",
                 function () {
                    if (show_armour === true) {
                        show_armour = false;
                        $(this).css("opacity", "0.3");
                    } else {
                        show_armour = true;
                        $(this).css("opacity", "1");
                    }
                    updateItems();
                }
            ); $("#sort_consumables").hover(
                function () {
                    $("#sort_desc").html("Show/hide consumables");
                }, function () {
                    $("#sort_desc").html("Sort items:");
                }
            );
            $("#sort_consumables").on("click",
                 function () {
                    if (show_consumables === true) {
                        show_consumables = false;
                        $(this).css("opacity", "0.3");
                    } else {
                        show_consumables = true;
                        $(this).css("opacity", "1");
                    }
                    updateItems();
                }
            );
            break;
        case "errands":
            updateErrands();
            $(".menuheading").html("Errands and Quests");
            $("#list_heading").html("Errands and Quests <i>(Mouse over to view)</i>");
            break;
        case "locations":
            updateLocations();
            $(".menuheading").html("Map of locations");
            $("#list_heading").html("Locations <i>(Click to travel)</i>");
            $("#list_sort").html(" ");
            break;
        case "encyclopedia":
            updateTopics();
            $(".menuheading").html("Book about everything");
            $("#list_heading").html("Topics <i>(Click to read)</i>");
            $("#list_sort").html(" ");
    }
}
function updateErrands() {
    'use strict';
    var iconx, icony, a, t;
    try {
        iconx = errands[0].listx;
        icony = errands[0].listy;
    } catch (err) { return ("quest update failed"); }
    t = "<li id='0' class='inv'> <div class='inv_icon' style='background-position:" + iconx + "px " + icony + "px'></div>" + errands[0].name;
    t += "</li>";
    for (a = 1; a < errands.length; a += 1) {
        iconx = errands[a].listx;
        icony = errands[a].listy;
        t += "<li id='" + a + "' class='inv'> <div class='inv_icon' style='background-position:" + iconx + "px " + icony + "px'></div>" + errands[a].name;
        t += "</li>";
    }
    $("#menu_list_left").html(t);

    //Mouseover stats
    $("li.inv").hover(
        function () {
            $(this).css("background-color", "#DDD");
            var item = errands[this.id];
            viewItem(item);
        },
        function () {
            $(this).css("background-color", "#FFF");
            viewStats();
        }
    );
    if (menuscreen === "errands") {
        updateItems();
    }
}
function initLocations() {
    'use strict';
    for (var l in data.locations) {
		map.push(data.locations[l])
	}
    for (var t in data.topics) {
		book.push(data.topics[t])
	}
}
function updateLocations() {
	'use strict';
    var iconx, icony = -288, a, t = " ";
	for (a = 0; a < map.length; a += 1) {
		iconx = map[a].x;
		t += "<li id='" + a + "' class='inv'> <div class='inv_icon' style='background-position:" + iconx + "px " + icony + "px'></div><p class='invlist'>" + map[a].name;
		t += "</li>";
	}
    $("#menu_list_left").html(t);

    //Mouseover stats
    $("li.inv").hover(
		function () {
            $(this).css("background-color", "#DDD");
            viewLocation(map[this.id]);
        },
        function () {
            $(this).css("background-color", "#FFF");
            viewStats();
        }
    );
    $("li.inv").off("click").on("click",
        function () {
            if (able_to_travel === true) {
                current_location = map[this.id];
                if (current_location.difficulty > 0) {
                    eventExploreArrival(true);
                } else {
                    eventTown();
                }
                if (menuscreen === "locations") {
                    updateLocations();
                }
                eventShop("hide");
            } else {
                info.html("You are not able to travel from here.");
            }
        });
}
function viewLocation(l) {
	var location = l, list_text;
	$("#menu_readout_top").text(location.description);
	list_text = "<li class='stats'><div class='inv_icon' style='background-position:-32px 0px'></div>: " + location.difficulty + " difficulty rating</li>";
	$("#menu_list_right").html(list_text);
}
function updateTopics() {
	'use strict';
    var iconx, icony, a, t = " ";
	for (a = 0; a < book.length; a += 1) {
		iconx = book[a].x;
        icony = book[a].y;
		t += "<li id='" + a + "' class='inv'> <div class='inv_icon' style='background-position:" + iconx + "px " + icony + "px'></div><p class='invlist'>" + book[a].name;
		t += "</li>";
	}
    $("#menu_list_left").html(t);

    //Mouseover stats
    $("li.inv").hover(
		function () {
            $(this).css("background-color", "#DDD");
            viewTopic(book[this.id]);
        }
    );
    $("li.inv").off("click").on("click",
        function () {
            viewTopic(book[this.id]);
        });
}
function viewTopic(l) {
	var topic = l, list_text = " ";
    for (var i in data.materials) {
        list_text += "<li class='stats'><div class='inv_icon' style='background-position:" + data.materials[i].x + " -32px'></div>: " + data.materials[i].name + "<li>" + data.materials[i].description + "</li></li><br>";
    }
	$("#menu_list_right").html(list_text);
	$("#menu_readout_top").html(topic.description + "<br><b>Information on the material tiers:</b>");
}
										// Save/load functions
function save() {
	$.jStorage.set("inventory", inventory);
    $.jStorage.set("s_gold", stat_gold);
    $.jStorage.set("s_exp", stat_experience);
    $.jStorage.set("equipped", equipped);
    console.log($.jStorage.get("inventory"));
    console.log($.jStorage.get("s_gold"));
    console.log($.jStorage.get("s_exp"));
    console.log($.jStorage.get("equipped"));
    info.html("Progress has been saved!");
}
function load() {
    var log, i;
    if (typeof $.jStorage.get("inventory")[0] === "object") {
        for(i = 0; i < $.jStorage.get("inventory").length; i += 1) {
            inventory[i] = $.jStorage.get("inventory")[i];
            inventory[i].count = $.jStorage.get("inventory")[i].count;
        }
        console.log = inventory;
    } if (typeof $.jStorage.get("equipped")[0] === "string") {
        for(i = 0; i < $.jStorage.get("equipped").length; i += 1) {
            equipped[i] = $.jStorage.get("equipped")[i];
        }
        equipped = $.jStorage.get("equipped");
    } if (typeof $.jStorage.get("s_gold") === "number") {
        stat_gold = $.jStorage.get("s_gold");
    } if (typeof $.jStorage.get("s_exp") === "number") {
        stat_experience = $.jStorage.get("s_exp");
    }
}
function reset() {
    if (confirm("Reset all progress? This cannot be undone.") === true) {
        $.jStorage.flush();
        inventory = [];
        var newitem = {};
        newitem.listy = -128; newitem.type = "Consumable"; newitem.itemid = "c2"; newitem.listx = -32; newitem.heal = 10; newitem.gold = 5; newitem.name = "Health vial";	newitem.desc = "A glass vial containing some sort of red healing liquid";
        newitem.count = 2;
        inventory.push(newitem);
        inventory.push(shop_list[2]);
        stat_gold = 5;
        stat_level = 1;
        stat_experience = 0;
        stat_next_level = stat_level * 100;
        stats = [0, 0, 0, 0];
        equipped = ["00", "none", "none", "none"];
    }
}