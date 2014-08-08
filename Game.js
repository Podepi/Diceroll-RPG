//images (64x64)
var img_artifacts = "iconlist_artifacts.png"; // 64x64 misc. object  spritesheet
var img_magic = "iconlist_magic.png"; // 64x64 magic spritesheet
var img_physical = "iconlist_physical.png"; //64x64 physical attack spritesheet
var img_ui = "iconlist_ui.png"; //64x64 ui spritesheet
var img_def64 = "default_64.png"; //default 64x64 image
//icons (16x16)
var ico_list = "icon_list_16.png"; //16x16 icon spritesheet
//Arrays
var deathmessage = /* This array contains all the phrases which show up when you die */
        ["The generic enemy attacks and you fail to block, causing your hitpoints to drop below 0. You die.",
            "Your armour fails to relect the weapon aimed at your face.",
            "Your armour is less effective than the enemy's weapon.",
            "Blocking that attack is basic knowledge at the Warrior Training School...",
            "You are sent to The Place Where All Beings Are Eternally Blessed."];
var inventory = []; // This array contains the items the inventory has - all array work is done in the createItem() function
var shoplist = []; // This array contains the items the shop has - all array work is done in the shop functions 
var locations = []; // This array contains the locations known by the player
var errands = []; // This array contains the errands accepted by the player
var enemy_list = /* This array contains all the different enemies you can can face - purely cosmetic at the moment - NOTE: Should change resistances and max health of each type in the near future */
        ["orc", "bandit", "golem", "spider", "bat", "wraith", "ghost", "troll", "ogre"];
var adjective_list = /* This array contains all the adjectives an enemy can have - purely cosmetic */
        ["smelly", "nasty", "terrible", "ugly", "mean", "frightening", "fearsome", "egotistical", "badly-disguised", "annoying", "loud", "armed", "armoured", "stereotyped", "ghostly", "orcish", "wraith-like", "trollish", "spidery", "golem-like"];
var shopkeeper = /* This array contains all the various phrases and actions the shopkeeper does */
        ["tells you about all the various bargains.",
            "complains about shoplifters.",
            "tells tales of mysterious dungeons and treasures.",
            "tells of strange and powerful artifacts."];

//Game variables
var playerhp; // Amount of health you have at the present
var enemyhp; // Amount of health enemy has - dealt with during battle - eventBattle() function
var pdamage; // Amount of damage you deal - dealt with at runtime in the roll() function
var edamage; // Amount of damage enemy deals - dealt with at runtime in the roll() function
var score = 0; // Number of enemies defeated this run for previously in-place score system
var highscore = 0; // High score for previously in-place score system
var menuscreen = "inventory"; // For planned menu screens e.g. travel screen for selecting destinations, inventory screen for managing items, stats screen for managing stats
var battle = false; //Boolean defines whether hp potions display enemy health on readout
var explore_location;
var btn1;
var btn2;
var btn3;

//Sorting
var show_weapons = true;
var show_armour = true;
var show_consumables = true;

//Stats
var stat_maxhp = 20; // Maximum amount of hitpoints player has
var stat_gold = 10; // Amount of gold player has
var stat_attack = 0; // Damage dealt by player on physical attack
var stat_defense = 0; // Reduces damage taken by player from harm; 25% effective against magic
var stat_magicdef = 0; // Reduces damage taken by player from magic
var stat_magicatk = 0; // Damage dealt with magic by player
var weapon_e; // Equipped weapon
var armour_e; // Equipped armour
var amulet_e; // Equipped amulet

function init() {
    'use strict';
    $("#menubar").html('<li id="menubar_inv" class="menu_icon glow">Inventory</li>' +
                       '<li id="menubar_qst" class="menu_icon glow">Errands</li>');
    $("#menubar_inv").on("click", function () {
        viewMenu("inventory");
    });
    $("#menubar_qst").on("click", function () {
        viewMenu("errands");
    });
    $("#list_sort").html('<li id="sort_desc" style="font-size:8pt">Sort items:</li>' +
                         '<li id="sort_weapon" class="sort inv_icon" style="background-position:-16px 0px"></li>' +
                         '<li id="sort_armour" class="sort inv_icon" style="background-position:-32px 0px"></li><br>');
    $("li.sort").hover(
        function () {
            $(this).css("border-color", "#000");
        },
        function () {
            $(this).css("border-color", "#FFF");
        }
    );
    $("#sort_weapon").hover(
        function () {
            $("#sort_desc").html("Show/hide weapons");
        },
        function () {
            $("#sort_desc").html("Sort items:");
        }
    );
    $("#sort_weapon").on("click",
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
    );
    $("#sort_armour").hover(
        function () {
            $("#sort_desc").html("Show/hide armour");
        },
        function () {
            $("#sort_desc").html("Sort items:");
        }
    );
    $("#sort_armour").on("click",
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
    );
    playerhp = stat_maxhp;
    btn1 = $("#eventbutton01");
    btn2 = $("#eventbutton02");
    btn3 = $("#eventbutton03");
    inventory.pop();
    shoplist.pop();
    init_shop();
    event_town();
    createItem("inv", 0, -112, "Weapon", "Iron dagger", "A short iron blade with a small hilt", 12, 3);
    createItem("inv", -16, -48, "Armour", "Leather armour", "A leather armour set which protects from light damage", 20, 0, 1);
    createItem("inv", 0, -64, "Consumable", "Health potion", "A glass bottle containing some sort of red healing liquid", 18, 0, 0, 20);
    createItem("inv", -16, -64, "Consumable", "Health vial", "A glass vial containing some sort of red healing liquid", 9, 0, 0, 10);
    viewStats();
}
function event_explore_start() {
    'use strict';

    if (location === "explore") {
        window.setTimeout("event_explore_end()", 1000);
        $("#info").html("Exploring...");
        btn1.hide();
        btn2.hide();
        btn3.hide();
    }
}
function event_explore_end() {
    'use strict';
    var info = $("#info");
    //Later, this switch statement should check the location you are exploring and throw a random number for encounters
    //Pressing explore brings up menu to select location - buttons for switching between searching for locations and going to found ones
    switch (explore_location) {
    case 0:
        $("#info").html("You found a penny!");
        stat_gold += 1;
        btn1.show();
        btn1.html('<div class="btn_icon"></div>Return to Town');
        btn1.off('click').on("click", function () {
            event_town();
        });
        btn2.show();
        btn2.html("<div class='btn_icon' style='background-position:-128px, 0px; background-image:url(" + img_ui + ")'></div>Onward!");
        viewStats();
        break;
    case 1:
        $("#info").html("All of a sudden " + desc() + " jumps out of nowhere!");
        btn1.show();
        btn2.show();
        event_battle("nodesc");
        break;
    case 2:
        $("#info").html("You walk for hours but find nothing");
        btn1.show();
        btn1.html('<div class="btn_icon"></div>Return to Town');
        btn2.show();
        btn2.html("<div class='btn_icon' style='background-position:-128px, 0px; background-image:url("  + img_ui + ")'></div>Onward!");
        break;
    case 3:

        break;
    case 4:

        break;
    }
}
function event_town() {
    'use strict';
    event_shop("hide");
    btn1.show();
    btn1.html('<div class="btn_icon"></div>Shop');
    btn1.off('click').on("click", function () {
        event_shop("show");
    });
    btn2.show();
    btn2.html("<div class='btn_icon' style='background-position:-128px, 0px; background-image:url(" + img_ui + ")'></div>Explore");
    btn2.off('click').on("click", function () {
        event_explore_start();
    });
    btn3.hide();
    $("#readout").html("Your health: " + playerhp);
    $("#info").html("Welcome to the Town");
}
function init_shop() {
    'use strict';
    createItem("shop", -16, 0, "Weapon", "Iron dagger", "A short iron blade with a small hilt", 12, 3);
    createItem("shop", -16, 0, "Weapon", "Steel dagger", "A short steel blade with a small hilt", 20, 5);
    createItem("shop", 0, -48, "Armour", "Cloth armour", "Clothes which hardly protect from damage at all", 20, 0, 1);
    createItem("shop", -16, -48, "Armour", "Leather armour", "A leather armour set", 60, 0, 3);
    createItem("shop", -32, -48, "Armour", "Iron armour", "An iron plate armour set", 100, 0, 5);
    createItem("shop", -32, -48, "Armour", "Steel armour", "A steel plate armour set", 140, 0, 7);
    createItem("shop", -32, -48, "Armour", "Steel armour", "A steel plate armour set", 140, 0, 7);
    createItem("shop", 0, -64, "Consumable", "Health potion", "A glass bottle containing some sort of red healing liquid", 18, 0, 0, 20);
    createItem("shop", -16, -64, "Consumable", "Health vial", "A glass vial containing some sort of red healing liquid", 9, 0, 0, 10);
    createItem("shop", -16, -80, "Amulet", "Amulet of enhancement", "An amulet with magical powers", 122, 15, 5);

    updateShop();
}
function updateShop() {
    'use strict';
    var iconx = shoplist[0].listx, icony = shoplist[0].listy, a, t;
    t = "<li id='0' class='shop'> <div class='inv_icon' style='background-position:" + iconx + "px " + icony + "px'></div>" + shoplist[0].name;
    if (stat_gold < shoplist[0].gold) {
        t += "<i style='color:#FF0000'> - Not enough gold</i>";
    }
    t += "</li>";
    for (a = 1; a < shoplist.length; a += 1) {
        iconx = shoplist[a].listx;
        icony = shoplist[a].listy;
        t += "<li id='" + a + "' class='shop'> <div class='inv_icon' style='background-position:" + iconx + "px " + icony + "px'></div>" + shoplist[a].name;
        if (stat_gold < shoplist[a].gold) {
            t += "<i style='color:#FF0000'> - Not enough gold</i>";
        }
        t += "</li>";
    }
    $("#shop_list").html(t);
    $("#shop_heading").html("Shop");
    $("#readout").html("<div class='inv_icon' style='float:none; background-position:0px 0px; display:inline-block;'></div>: " + stat_gold);
    $("li.shop").hover(
        function () {
            $(this).css("background-color", "#DDD");
            var item = shoplist[this.id];
            viewItem(item);
        },
        function () {
            $(this).css("background-color", "#FFF");
            viewStats();
        }
    );
    $("li.shop").off("click").on("click",
        function () {
            var item = shoplist[this.id];
            //var info = $("#this.id").html();
            if (stat_gold >= item.gold) {
                inventory.push(item);
                stat_gold -= item.gold;
                updateItems();
                $("#shop_list").html(updateShop());
            }
        });
}
function event_shop(visible) {
    'use strict';
    switch (visible) {
    case "show":
        updateShop();
        $("#shop").show();
        btn1.html('<div class="btn_icon"></div>Exit to Town');
        btn1.off('click').on("click", function () {
            event_town();
        });
        btn2.hide();
        btn3.hide();
        $("#info").html('The shopkeeper ' + shopkeeper[Math.floor(Math.random() * shopkeeper.length)]);
        break;
    case "hide":
        $("#shop").hide();
        break;
    }
}
function event_battle(t) {
    /*if (playerhp <= 0) {
        if(score > highscore) {
          highscore = score;
        }
      score = 0;
      }
    */
    'use strict';
    btn1.off('click').on('click', function () {
        roll();
    });
    btn1.html('<div class="btn_icon" style="background-position:0px 0px; background-image:url(' + img_physical + ')"></div>Fight');
    btn2.show();
    btn2.off('click').on('click', function () {
        event_town();
    });
    btn2.html('<div class="btn_icon" style="background-position:0px 0px; background-image:url(' + img_def64 + ')"></div>Town');
    btn3.hide();
    playerhp = stat_maxhp;
    enemyhp = 20;
    battle = true;
    if (t !== "nodesc") {
        $("#info").html("You have ventured into a dungeon!<br>Suddenly, " + desc() + " jumps out of nowhere and challenges you to a fight.");
    }
    $("#readout").html("Your health: " + playerhp + "<br>Enemy health: " + enemyhp);
}
function updateFight() {
    'use strict';
    $("#info").html("You hit the enemy for " + pdamage + " damage.<br>You were hit for " + edamage + " damage.");
    if (playerhp <= 0) {
        playerhp = 0;
        if (enemyhp <= 0) {
            enemyhp = 0;
        }
        $("#info").html(deathmessage[Math.floor(Math.random() * deathmessage.length)]);
        $("#eventbutton01").hide();
        $("#eventbutton02").show();
    } else { if (enemyhp <= 0) {
        if (playerhp <= 0) {
            playerhp = 0;
        }
        enemyhp = 0;
        var gold_inc = Math.ceil(Math.random() * 10);
        stat_gold += gold_inc;
        battle = false;
    //score++;
        $("#info").html("You have won!<br>You gained " + gold_inc + " gold!");
        $("#eventbutton01").hide();
        $("#eventbutton02").show();
    } }
    $("#readout").html("Your health: " + playerhp + "<br>Enemy health: " + enemyhp);
}
function event_escape() {
    'use strict';
    var escapechance = Math.random();
    if (escapechance >= 0.2) {
        $("#info").html("You have successfully escaped!");
        btn1.off('click').on('click', function () {
            event_town();
        });
        btn2.hide();
        btn3.hide();
    } else {
        $("#info").html("You are unable to turn and run!");
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
    if (playerhp <= 0 || enemyhp <= 0) {
        updateFight();
        event_battle();
    } else {
        pdamage = Math.floor(Math.random() * stat_attack);
        edamage = Math.floor(Math.random() * 5);
        playerhp -= edamage - stat_defense;
        enemyhp -= pdamage;
        updateFight();
    }
}
function updateItems() {
    'use strict';
    var iconx, icony, a, t;
    try {
        iconx = inventory[0].listx;
        icony = inventory[0].listy;
    } catch (err) { return ("itemupdate failed"); }
    t = "<li id='0' class='inv'> <div class='inv_icon' style='background-position:" + iconx + "px " + icony + "px'></div>" + inventory[0].name;
    if (weapon_e === inventory[0] || armour_e === inventory[0]) {
        t += "<i> - Equipped</i>";
    }
    t += "</li>";
    for (a = 1; a < inventory.length; a += 1) {
        iconx = inventory[a].listx;
        icony = inventory[a].listy;
        t += "<li id='" + a + "' class='inv'> <div class='inv_icon' style='background-position:" + iconx + "px " + icony + "px'></div>" + inventory[a].name;
        if (weapon_e === inventory[a] || armour_e === inventory[a] || amulet_e === inventory[a]) {
            t += "<i> - Equipped</i>";
        }
        t += "</li>";
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
                if (weapon_e === item) {
                    weapon_e = "none";
                } else {
                    weapon_e = item;
                }
                break;
            case "Armour":
                if (armour_e === item) {
                    armour_e = "none";
                } else {
                    armour_e = item;
                }
                break;
            case "Consumable":
                playerhp += item.heal;
                hpText = "Your health: " + playerhp;
                if (battle === true) {
                    hpText += "<br>Enemy health: " + enemyhp;
                }
                $("#readout").html(hpText);
                $("#info").html("You were healed for " + item.heal + " health.");
                inventory.splice(this.id, 1);
                break;
            case "Amulet":
                if (amulet_e === item) {
                    amulet_e = "none";
                } else {
                    amulet_e = item;
                }
                break;
            }
            if (menuscreen === "inventory") {
                updateItems();
            }
        }
        );
}
function createItem(a, x, y, t, n, d, g, dmg, def, h) {
    'use strict';
    var newitem = {};

    //Essential values
    newitem.listx = x;
    newitem.listy = y;
    newitem.type = t;
    newitem.name = n;
    newitem.desc = d;
    newitem.gold = g;

    //Non-essential values
    if (def !== 0) {
        newitem.defense = def;
    }
    if (dmg !== 0) {
        newitem.damage = dmg;
    }
    if (h !== 0) {
        newitem.heal = h;
    }
    switch (a) {
    case "inv":
        inventory.push(newitem);
        break;
    case "shop":
        shoplist.push(newitem);
        break;
    }
    if (menuscreen === "inventory") {
        updateItems();
    }
}
function viewItem(item) {
    'use strict';
    var list_text;
    $("#menu_readout_top").text(item.desc);
    list_text = "<li><b>" + item.type + "</b></li><li><br><div class='inv_icon' style='background-position:0px 0x'></div>: " + item.gold + " gold</li>";
    if (item.damage !== undefined) {
        list_text += "<li><div class='inv_icon' style='background-position:-16px 0px'></div>: " + item.damage + " damage</li>";
    }
    if (item.defense !== undefined) {
        list_text += "<li><div class='inv_icon' style='background-position:-32px 0px'></div>: " + item.defense + " armour</li>";
    }
    if (item.heal !== undefined) {
        list_text += "<li><div class='inv_icon' style='background-position:-48px 0px'></div>: " + item.heal + " HP restored</li>";
    }
    $("#menu_list_right").html(list_text);
    $("#menu_extended").hide();
    $("#menu_list_ext").hide();
}
function viewStats() {
    'use strict';
    try {
        if (weapon_e.damage !== undefined) {
            stat_attack = weapon_e.damage;
        } else {throw "undefined value"; }
    } catch (err) {stat_attack = 0; }
    try {
        if (armour_e.defense !== undefined) {
            stat_defense = armour_e.defense;
        } else {throw "undefined value"; }
    } catch (err) {stat_defense = 0; }
    try {
        if (amulet_e.defense !== undefined) {
            stat_defense += amulet_e.defense;
        } else {throw "undefined value"; }
        if (amulet_e.damage !== undefined) {
            stat_attack += amulet_e.damage;
        } else {throw "undefined value"; }
    } catch (err) {}
    $("#menu_readout_top").html("Your stats:");
    $("#menu_list_right").html("<li><div class='inv_icon' style='background-position:-48px 0px'></div>: " + stat_maxhp +
        " max health<li><div class='inv_icon' style='background-position:0px 0px'></div>: " + stat_gold +
        " gold</li><li><div class='inv_icon' style='background-position:-16px 0px'></div>: " + stat_attack +
        " damage</li><li><div class='inv_icon' style='background-position:-32px 0px'></div>: " + stat_defense +
        " armour</li><li><div class='inv_icon' style='background-position:-64px 0px'></div>: " + stat_magicdef +
        " magic resistance</li><li><div class='inv_icon' style='background-position:-80px 0px'></div>: " + stat_magicatk +
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
        $("#menuheading").html("Inventory");
        $("#list_heading").html("Inventory <i>(Click to use)</i>");
        break;
    case "errands":
        updateErrands();
        $("#menuheading").html("Errands and Quests");
        $("#list_heading").html("Errands and Quests <i>(Mouse over to view)</i>");
        break;
    case "locations":
        updateLocations();
        $("#menuheading").html("Locations");
        $("#list_heading").html("Locations <i>(Click to travel)</i>");
        break;
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
    if (weapon_e === errands[0] || armour_e === errands[0]) {
        t += "<i> - Equipped</i>";
    }
    t += "</li>";
    for (a = 1; a < errands.length; a += 1) {
        iconx = errands[a].listx;
        icony = errands[a].listy;
        t += "<li id='" + a + "' class='inv'> <div class='inv_icon' style='background-position:" + iconx + "px " + icony + "px'></div>" + errands[a].name;
        if (weapon_e === errands[a] || armour_e === errands[a] || amulet_e === errands[a]) {
            t += "<i> - Equipped</i>";
        }
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
        );
}
function updateLocations() {
    'use strict';
    
}