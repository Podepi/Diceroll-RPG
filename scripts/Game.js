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
var upgrades = []; // This array contains the level upgrades
var enemy_list = /* This array contains all the different enemies you can can face - purely cosmetic at the moment - NOTE: Should change resistances and max health of each type in the near future, also area-dependant enemies */
        ["orc", "bandit", "golem", "spider", "bat", "wraith", "ghost", "troll", "ogre", "imp", "skeleton", "zombie", "wolf", "snake"];
var adjective_list = /* This array contains all the adjectives an enemy can have - purely cosmetic */
        ["stupid", "nasty", "terrible", "ugly", "mean", "frightening", "fearsome", "egotistical", "badly disguised", "annoying", "idiotic", "armed", "armoured", "stereotyped", "ghostly", "orcish", "wraith-like", "trollish", "spidery", "golem-like"];
var shopkeeper = /* This array contains all the various phrases and actions the shopkeeper does */
        ["tells you about all the various bargains.",
            "complains about shoplifters.",
            "tells tales of mysterious dungeons and treasures.",
            "tells of strange and powerful artifacts.",
            "says, \"Because I'm not running a charity here, all items you sell will be at half price.\"",
            "says, \"Remember to equip your items before you rush recklessly into battle!\""];
var rare_colour = /* This array contains the colour schemes for the item tiers - used with rare items to show what tier item they are */
    ["5b3318", "636b7e", "2c1a79", "686868", "171717", "442896", "207d45", "700202"];

//Random Naming arrays
var magician_name = ["El Weirdo", "Sir Magical", "Bill", "Carl", "Fladnag"];
var magician_type = ["Magician", "Intelligent", "Enchanter", "Alchemist", "Wizard", "Wise", "Bearded One"];
var magician_adj = ["Wandering", "Exploring", "Roaming", "Travelling", "Magical", "Enchanting"];
var magician_show = ["Circus", "Show", "Magic Show", "Magic Collection", "Caravan", "Troupe", "Company"];
var l_adj = ["Northern", "Southern", "Western", "Eastern", "Snowy", "Scorching", "Rainy", "Freezing", "Sunny", "Depressing", "Deserted", "Cloudy",
             "Stormy", "Warm", "Harmless", "Stone", "Metallic", "Fertile", "Dangerous", "'Safe'", "Experimental", "Scientific", "Brick", "Glass"];
var l_location = ["Mountain", "Lake", "Sea", "Ocean", "Town", "Village", "City", "Forest", "Hills", "Mine", "Cave", "Grove", "Desert", "Beach",
                  "Tower", "Hamlet", "Library", "Forest Trail", "Road", "Path", "Pyramid", "Grassland", "Swamp", "Marsh", "River", "Tomb", "Castle"];
var l_of = ["Hope", "Betrayal", "Inhospitability", "Water", "Earth", "Air", "Fire", "Mystium", "Steel", "Iron", "Stone", "Technology", "Clay",
            "Knowledge", "Power", "Magic", "Wisdom", "Death", "Sacrifice", "Danger", "Harm", "Warmth", "Sand", "Rivers", "Science", "Safety"];
var n_start = [];
var n_end = [];

//Game variables
var player_hp; // Amount of health you have at the present
var enemy_hp; // Amount of health enemy has - dealt with during battle - eventBattle() function
var p_damage; // Amount of damage you deal - dealt with at runtime in the roll() function
var e_damage; // Amount of damage enemy deals - dealt with at runtime in the roll() function
var score = 0; // Number of enemies defeated this run for previously in-place score system
var highscore = 0; // High score for previously in-place score system
var menuscreen = "inventory"; // For planned menu screens e.g. travel screen for selecting destinations, inventory screen for managing items, stats screen for managing stats
var current_location; // Your current location
var enemy_number; // Amount of enemies in dungeon
var enemy_strength = 10; // How much health enemies have * current_location.difficulty
var btn1; // These variables are shorthand for the three event buttons
var btn2;
var btn3;
var info; // Shorthand for text above event buttons
var readout; // Shorthand for text below event buttons

// Booleans
var battle = false; // Boolean defines whether hp potions display enemy health on readout
var dungeon = false; // Determines whether to give prize after defeating all enemies
var boss = false; // Determines whether you are fighting  a boss or not
var able_to_travel; // Determines whether you can travel or not
var inv_sell = false; // Boolean defines whether you are selling items or not
var shop = false;

// Default text
var readout_default = "<span style='color:red'>This part of the game is not yet functional. Probably best you don't touch anything here in case you mess up your save...</span>";
var wip_default = "<br><span style='color:red'>This part of the game is still new. Bugs are likely to be found here. Proceed at own risk!</span>";
var travel_default = "You are not able to travel from here.";

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
var stat_points_spent = 0;
var stats = [0, 0, 0, 0]; // Battle stats (attack, defence, magic attack, magic defence)
var equipped = ["00", "none", "none", "none"]; // Array containing equipped items - weapon, armour, amulet, misc

function init() {
    'use strict';
    $("#menubar").html('<li id="menubar_inv" class="menu_icon glow">Inventory</li>' +
                       '<li id="menubar_tvl" class="menu_icon glow">Travel</li>' +
                       '<li id="menubar_qst" class="menu_icon glow">Errands</li>' +
                       '<li id="menubar_lvl" class="menu_icon glow">Levels</li>' +
                       '<li id="menubar_ecp" class="menu_icon glow">Encyclopedia</li>');
    $("#menubar_inv").on("click", function () {
        viewMenu("inventory");
    });
    $("#menubar_lvl").on("click", function () {
        viewMenu("levels");
    });
	$("#menubar_tvl").on("click", function () {
        viewMenu("locations");
    });
    $("#menubar_tvl").on("dblclick", function () {
        if (able_to_travel === true) {
            eventTown();
        } else {
            info.html(travel_default);
        }
    });
    $("#menubar_ecp").on("click", function () {
        viewMenu("encyclopedia");
    });
    $("#menubar_qst").on("click", function () {
        viewMenu("errands");
    });
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
    initLevels();
    try {
        load();
    } catch (e) {
        reset("nodialog");
    }
    viewMenu("inventory");
    viewStats("init");
    eventTown();
}
function createName() {
    var n1, n2;
    n1 = n_start[Math.floor(Math.random() * n_start.length)]
    n2 = n_end[Math.floor(Math.random() * n_end.length)]
    return("bob");
}
function tanh(arg) {
  //  discuss at: http://phpjs.org/functions/tanh/
  // original by: Onno Marsman
  // imprived by: Robert Eisele (http://www.xarg.org/)
  //   example 1: tanh(5.4251848798444815);
  //   returns 1: 0.9999612058841574
  return 1 - 2 / (Math.exp(2 * arg) + 1);
}
                                        // Explore functions
function eventExploreStart() {
    'use strict';
	window.setTimeout("eventExploreArrival()", 1000);
	info.html("Exploring...");
	btn1.hide();
	btn2.hide();
	btn3.hide();
    if (player_hp >= stat_maxhp) {
        player_hp = stat_maxhp;
    }
}
function eventExploreArrival(w) {
	info.html(current_location.arrival_text);
	dungeon = false;
    boss = false;
    able_to_travel = true;
    if (player_hp >= stat_maxhp) {
        player_hp = stat_maxhp;
    }
	if (w !== true) {
		eventExploreEnd();
		return(" ");
	}
    readout.html("Your health: " + player_hp + " / " + stat_maxhp);
	btn1.show();
	btn1.html("<div class='btn_icon' style='background-position:-128px, 0px; background-image:url(" + img_ui + ")'></div>Explore");
	btn1.off('click').on("click", function () {
        eventExploreStart();
        explore_difficulty = "e";
    });
	btn2.hide();
    btn3.hide();
}
function eventExploreEnd(n) {
    'use strict';
    var rand = Math.floor(Math.random() * 5);
    if (typeof n === "number") { rand = n }
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
        info.html("You find a dungeon entrance! It has " + number + " enemies.<br>A sign at the entrance says: <b>Welcome to the " + l_adj[Math.floor(Math.random() * l_adj.length)] + " dungeon of " + l_of[Math.floor(Math.random() * l_of.length)] + "</b>");
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
        if (Math.random() <= 0.2 || n === 3) {
            var rare_cost = 100 + Math.round(Math.random() * 500);
            info.html("Welcome to " + magician_name[Math.floor(Math.random() * magician_name.length)] + " the "  + l_adj[Math.floor(Math.random() * l_adj.length)] + " " + magician_type[Math.floor(Math.random() * magician_type.length)] + "'s " + magician_adj[Math.floor(Math.random() * magician_adj.length)] + " " + magician_show[Math.floor(Math.random() * magician_show.length)] + "!<br>He is selling rare items for " + rare_cost + " gold each.");
            if (menuscreen === "inventory") {
                updateItems();
            }
            btn1.show();
            btn1.html('<div class="btn_icon"></div>Buy magical item');
            btn1.off("click").on("click",
                function() {
                    if (stat_gold >= rare_cost) {
                        stat_gold -= rare_cost;
                        createRareItem("magic");
                        info.html('"This particular artifact is from the ' + l_adj[Math.floor(Math.random() * l_adj.length)] +
                                  " " + l_location[Math.floor(Math.random() * l_location.length)] +
                                  " of " + l_of[Math.floor(Math.random() * l_of.length)] + '. Why don\'t you buy another item for ' + rare_cost + '?"');
                    }
                }
            )
            btn2.show();
            btn2.html('<div class="btn_icon" style="background-position:-128px, 0px; background-image:url('  + img_ui + ')"></div>Onward!');
            btn2.off("click").on("click",
                function() {
                    eventExploreStart();
                }
            )
        } else {
            eventExploreEnd();
        }
        break;
    case 4:
        if (Math.random() <= 0.2 || n === 4) {
            info.html("You have stumbled upon the MEGA dungeon! It is home to this area's MEGA boss. Defeating it will grant you a shiny rare item! " + wip_default);
            btn1.show();
            btn1.html('<div class="btn_icon"></div>Enter MEGA dungeon');
            btn1.off("click").on("click",
                function() {
                    eventBattle("boss");
                }
            )
            btn2.show();
            btn2.html("<div class='btn_icon' style='background-position:-128px, 0px; background-image:url("  + img_ui + ")'></div>Continue Exploring");
            btn2.off("click").on("click",
                function() {
                    eventExploreStart();
                }
            )
        } else {
            eventExploreEnd();
        }
        break;
    }
}
function eventTown(t) {
    'use strict';
	current_location = "town";
    $("#location_header").html("The Town");
	dungeon = false;
    battle = false;
    shop = false;
    able_to_travel = true;
    if (player_hp >= stat_maxhp) {
        player_hp = stat_maxhp;
    }
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
                save();
			}
		} else {
			info.html("You do not have enough gold");
		}
    });
    btn3.hide();
    btn3.html("<div class='btn_icon'></div>Town Square");
    btn3.off('click').on("click", function () {
        eventTownSquare();
    });
    updateHealth();
    info.html("Welcome to the Town <br>Protip: Double click the travel button to travel here instantly!");
    if (t === "shop") {
        info.html("Welcome to the Town <br>Click the 'travel' button to explore!");
    }
}
function eventTownSquare() {
    readout.html("This place is filled with merchants and random strangers.");
    btn1.show();
    btn1.html('<div class="btn_icon"></div>Back to Town');
    btn1.off('click').on("click", function () {
        eventTown();
    });
    btn2.show();
    btn2.html("<div class='btn_icon'></div>Look for Quest");
    btn2.off('click').on("click", function () {
        eventQuest("errand");
    });
    btn3.hide();
}
                                        //shop functions
function initShop() {
    'use strict';
    var newitem = {};
    newitem.listy = -128; newitem.type = "Consumable"; newitem.itemid = "c2"; newitem.listx = -32;  newitem.heal = 10; newitem.gold = 5;  newitem.name = "Health Vial";             newitem.desc = "A glass vial containing some sort of red healing liquid";
    shop_list.push(newitem);
	newitem = {};
    newitem.listy = -128; newitem.type = "Consumable"; newitem.itemid = "c1"; newitem.listx = 0;    newitem.heal = 20; newitem.gold = 10; newitem.name = "Health Potion";           newitem.desc = "A glass bottle containing some sort of red healing liquid";
    shop_list.push(newitem);
    newitem = {};
	newitem.listy = -128; newitem.type = "Consumable"; newitem.itemid = "c3"; newitem.listx = -160; newitem.heal = 40; newitem.gold = 20; newitem.name = "Concentrated Health Vial"; newitem.desc = "A glass vial containing a strong healing liquid";
    shop_list.push(newitem);
    newitem = {};
	newitem.listy = -128; newitem.type = "Consumable"; newitem.itemid = "c4"; newitem.listx = -128; newitem.heal = 80; newitem.gold = 40; newitem.name = "Concentrated Health Potion"; newitem.desc = "A glass bottle containing a strong healing liquid";
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
            newitem.gold    = data.items[i].gold * data.materials[m].gold_mult;
            newitem.name    = data.materials[m].name + " " + data.items[i].name;
            newitem.desc    = data.items[i].description.replace("-mat-", data.materials[m].name.toLowerCase());
            shop_list.push(newitem);
			/*if (newitem.itemid === "00") {
				newitem.count = 1;
				inventory.push(newitem);
			}*/
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
        shop = true;
        inv_sell = false;
        $("#shop").show();
        btn1.html('<div class="btn_icon"></div>Exit to Town');
        btn1.off('click').on("click", function () {
            eventTown("shop");
            shop = false;
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
        info.html("Click on items to sell them for half price.");
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
    var e = "Enemy";
	btn1.show();
    btn1.off('click').on('click', function () {
        roll();
    });
    btn1.html('<div class="btn_icon" style="background-position:0px 0px; background-image:url(' + img_physical + ')"></div>Fight');
    btn2.hide();
    btn3.hide();
    enemy_hp = Math.floor(Math.random() * enemy_strength) + enemy_strength * current_location.difficulty;
    battle = true;
    if (t !== "nodesc") {
        info.html("You have ventured into a dungeon!<br>Suddenly, " + desc() + " jumps out of nowhere and challenges you to a fight.");
    } if (t === "dungeon") {
		dungeon = true;
        enemy_number = n;
	} if (t === "boss") {
        info.html("As you walk through the MEGA entrance, you are MEGA amazed at the MEGA size and MEGA power of the MEGA boss! It appears to be MEGA guarding a MEGA item!");
        e = "Boss";
        boss = true;
        enemy_hp = enemy_strength * 15 * current_location.difficulty;
    }
    readout.html("Your health: " + player_hp + " / " + stat_maxhp + "<br>" + e + " health: " + enemy_hp);
    able_to_travel = false;
}
function updateFight() {
    'use strict';
    var e = "enemy", ecap = "Enemy";
    if (boss === true) {
        e = "boss";
        ecap = "Boss";
    }
    var damage_info = "You hit the enemy for " + p_damage + " damage.<br>You were hit for " + e_damage + " damage.<br>";
    info.html(damage_info);
    if (player_hp <= 0) {
		var gold_loss = Math.floor(stat_gold / 4);
        player_hp = 0;
        able_to_travel = true;
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
        var gold_inc = Math.ceil(Math.random() * 10 * current_location.difficulty), xp_inc = 20 + Math.round(tanh(current_location.difficulty - stat_level) * current_location.difficulty - stat_level), info_text = " ";
        if (xp_inc + stat_experience >= stat_next_level) {
            info_text += "<br><span>You gained a level!</span>";
        } if (boss === true) {
            info_text += "<br>You acquired a <span style='color:" + rare_colour[stat_level] + "'>rare item!</span>";
            createRareItem();
            gold_inc += current_location.difficulty * 5;
            xp_inc += current_location.difficulty * 5;
        }
        stat_gold += gold_inc;
		stat_experience += xp_inc;
        battle = false;
        boss = false;
        able_to_travel = true;
        enemy_number -= 1;
		info.html("You have won!<br>You gained " + gold_inc + " gold and " + xp_inc + " experience!" + info_text);
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
            if (enemy_number === 1) {
                info.html(info.html() + "<br>There is " + enemy_number + " enemy left.");
            } else {
                info.html(info.html() + "<br>There are " + enemy_number + " enemies left.");
            }
			readout.html("Your health: " + player_hp + " / " + stat_maxhp);
		} else if (dungeon === true) {
			var dungeon_prize = Math.ceil(Math.random() * current_location.difficulty) + 10, i;
            info_text = "You have defeated the last enemy!<br>You gain " + gold_inc + " gold and " + xp_inc + " experience!<br>The reward for defeating the dungeon is " + dungeon_prize + " gold";
			if (Math.random <= 0.05) {
                createRareItem();
                info_text += " and a <span style='color:" + rare_colour[stat_level] + "'>rare item!<span>";
                i = true;
            } if (stat_experience >= stat_next_level) {
                info_text += ".<br><span>You gained a level!</span>";
                i = true
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
        if (Math.random() <= 0.33) {
            var vowel = /[aeiou]/i, aa = "a ", item_name = createItem();
            if (item_name.search(vowel) === 0) {aa = "an "; }
            info.html(info.html() + "<br>The enemy dropped " + aa + item_name.toLowerCase() + "!");
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
    var damage_mult = 1;
    if (boss === true) {
        damage_mult = 10;
    }
    if (player_hp <= 0 || enemy_hp <= 0) {
        updateFight();
    } else {
        viewStats();
        p_damage = Math.floor(Math.random() * (stats[0] + 1));
        e_damage = current_location.difficulty * damage_mult;
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
function updateHealth() {
    var t = "Your health: " + player_hp + " / " + stat_maxhp;
    if (battle === true) {
        t += "<br>Enemy health: " + enemy_hp;
    }
    if (shop === true) {
        t = "<div class='inv_icon' style='float:none; background-position:0px 0px; display:inline-block;'></div>: " + stat_gold;
    }
    readout.html(t);
}
function viewStats(t) {
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
    stat_maxhp = stat_level * 5 + 15;
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
                    } if (typeof inventory[a].health === 'number' && inventory[a].health > 0) {
                        stat_maxhp += inventory[a].health;
                    }
					break invsearch;
                }
            }
        }
    }
    updateStats();
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
    if (t === "init") {
        player_hp = stat_maxhp;
    }
    if (stat_level - stat_points_spent > 0) {
        $("#menubar_lvl").css("color", "#22bb00");
    } else {
        $("#menubar_lvl").css("color", "#000");
    }
    updateHealth();
}
function updateStats() {
    var i, e, s_d, s_s, s_h;
    stat_maxhp += upgrades[0].count * 5;
    for (i = 0; i < inventory.length; i += 1) {
        inv:
        if (inventory[i].id === equipped[0]) {
            e = inventory[i].name;
            s_d = e.search(/dagger/i);
            s_s = e.search(/sword/i);
            s_h = e.search(/hammer/i);
            break inv;
        }
    }
    if (upgrades[1].count > 0 && s_d > 0) {
        if (Math.random < 0.2) {
            stats[0] *= 2;
        }
    }
    if (upgrades[2].count > 0 && s_s > 0) {
        stats[1] += 1;
    }
    if (upgrades[3].count > 0 && s_h > 0) {
        stats[0] += stats[0] * 0.1;
    }
    if (upgrades[4].count > 0) {
        stats[1] += upgrades[4].count * 0.1;
    }
}
