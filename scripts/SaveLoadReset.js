function save() {
	$.jStorage.set("inventory", inventory);
    $.jStorage.set("s_gold", stat_gold);
    $.jStorage.set("s_exp", stat_experience);
    $.jStorage.set("s_lvl", stat_level);
    $.jStorage.set("equipped", equipped);
    console.log($.jStorage.get("inventory"));
    console.log($.jStorage.get("s_gold"));
    console.log($.jStorage.get("s_exp"));
    console.log($.jStorage.get("equipped"));
    info.html("Progress has been saved!");
}
function load() {
    var i;
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
    } if (typeof $.jStorage.get("s_lvl") === "number") {
        stat_experience = $.jStorage.get("s_lvl");
    }
}
function reset(t) {
    if (t === "nodialog" || confirm("Reset all progress? This cannot be undone.") === true) {
        $.jStorage.flush();
        inventory = [];
        var newitem = {};
        newitem.listy = -128; newitem.type = "Consumable"; newitem.itemid = "c2"; newitem.listx = -32; newitem.heal = 10; newitem.gold = 5; newitem.name = "Health vial";	newitem.desc = "A glass vial containing some sort of red healing liquid";
        newitem.count = 2;
        inventory.push(newitem);
        inventory.push(shop_list[2]);
        inventory[1].count = 1;
        stat_gold = 5;
        stat_level = 1;
        stat_experience = 0;
        stat_next_level = stat_level * 100;
        stats = [0, 0, 0, 0];
        equipped = ["00", "none", "none", "none"];
        eventTown();
        viewStats();
        viewMenu("inventory");
    }
}