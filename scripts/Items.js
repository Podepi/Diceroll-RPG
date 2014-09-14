function updateItems() {
    'use strict';
    var iconx, icony, a, t = " ";
    if (inventory.length > 0) {
        for (a = 0; a < inventory.length; a += 1) {
            iconx = inventory[a].listx;
            icony = inventory[a].listy;
            switch(inventory[a].type) {
            case "Weapon":
                if (show_weapons === true) {
                    t += "<li id='" + a + "' class='inv'> <div class='inv_icon' style='background-position:" + iconx + "px " + icony + "px'></div><p class='invlist'>" + inventory[a].name + " (" + inventory[a].count + ")";
                    if (equipped[0] === inventory[a].itemid || equipped[1] === inventory[a].itemid || equipped[2] === inventory[a].itemid) {
                        t += "<i> - Equipped</i>";
                    }
                    t += "</li>";
                } break;
            case "Consumable":
                if (show_consumables === true) {
                    t += "<li id='" + a + "' class='inv'> <div class='inv_icon' style='background-position:" + iconx + "px " + icony + "px'></div><p class='invlist'>" + inventory[a].name + " (" + inventory[a].count + ")";
                    if (equipped[0] === inventory[a].itemid || equipped[1] === inventory[a].itemid || equipped[2] === inventory[a].itemid) {
                        t += "<i> - Equipped</i>";
                    }
                    t += "</li>";
                } break;
            case "Armour":
                if (show_armour === true) {
                    t += "<li id='" + a + "' class='inv'> <div class='inv_icon' style='background-position:" + iconx + "px " + icony + "px'></div><p class='invlist'>" + inventory[a].name + " (" + inventory[a].count + ")";
                    if (equipped[0] === inventory[a].itemid || equipped[1] === inventory[a].itemid || equipped[2] === inventory[a].itemid) {
                        t += "<i> - Equipped</i>";
                    }
                    t += "</li>";
                } break;
             default:
                t += "<li id='" + a + "' class='inv'> <div class='inv_icon' style='background-position:" + iconx + "px " + icony + "px'></div><p class='invlist'>" + inventory[a].name + " (" + inventory[a].count + ")";
            }
        }
    } if (t === " ") {t = "<li><i>Congratulations! You have sold all your items! You probably have no other choice but to reset...</i></li>"}
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
            updateItems();
        });
    if (inv_sell === true) {
        $("li.inv").off("click").on("click",
            function () {
                var item = inventory[this.id], info = $("#this.id").html(), i, a;
                for (i = 0; i < equipped.length; i += 1) {
                    if (equipped[i] === item.itemid) {
                        a = i;
                    }
                }
                if (item.count > 1 || confirm("Really sell this item?") === true) {
                    equipped[i] = "none";
                    stat_gold += Math.floor(item.gold / 2);
                    item.count -= 1;
                    if (item.count <= 0) {
                        equipped[a] = "none";
                        inventory.splice(this.id, 1);
                    }
                    readout.html("<div class='inv_icon' style='float:none; background-position:0px 0px; display:inline-block;'></div>: " + stat_gold);
                    viewStats();
                    updateItems();
                }
            }
        );
    }
}
function createRareItem(t) {
	"use strict";
	var chance = 1, newitem = {}, i = Math.floor(Math.random() * data.items.length), m = current_location.item_drop, rare_multiplier = (Math.random() * 2) + 1;
	newitem.count = 1;
    if (t === "magic") {
        chance = 0.2;
    }
    if (Math.random() <= chance) {
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
    } else {
        i = Math.floor(Math.random() * data.worthless.length)
        newitem.listy   = data.worthless[i].y;
        newitem.listx   = data.worthless[i].x;
        newitem.type    = "Junk";
        newitem.gold    = Math.ceil(Math.random() * 20);
        newitem.name    = data.worthless[i].name;
        newitem.desc    = "A worthless scam.";
        inventory.push(newitem);
    }
    viewMenu("inventory");
    viewStats();
}
function createItem() {
    var newitem = {}, i = Math.floor(Math.random() * data.items.length), m = current_location.item_drop;
    newitem.itemid  = i.toString() + m.toString();
    newitem.name    = data.materials[m].name + " " + data.items[i].name;
    newitem.listy   = data.items[i].y;
    newitem.type    = data.items[i].type;
    newitem.listx   = data.materials[m].x;
    newitem.damage  = data.items[i].damage  * data.materials[m].damage_mult;
    newitem.defence = data.items[i].defence * data.materials[m].defence_mult;
    newitem.gold    = data.items[i].gold    * data.materials[m].gold_mult;
    newitem.desc    = data.items[i].description.replace("-mat-", data.materials[m].name.toLowerCase());
    newitem.count   = 1;
    for (i = 0; i < inventory.length; i += 1) {
        if(inventory[i].itemid === newitem.itemid) {
            inventory[i].count += 1;
            viewMenu("inventory");
            return(newitem.name);
        }
    }
    inventory.push(newitem);
    viewMenu("inventory");
    return(newitem.name);
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
