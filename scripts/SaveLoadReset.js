function save() {
	$.jStorage.set("inventory", inventory);
    $.jStorage.set("s_gold", stat_gold);
    $.jStorage.set("s_exp", stat_experience);
    $.jStorage.set("s_lvl", stat_level);
    $.jStorage.set("s_p_s", stat_points_spent);
    $.jStorage.set("equipped", equipped);
    $.jStorage.set("upgrades", upgrades);
    console.log($.jStorage.get("inventory"));
    console.log($.jStorage.get("s_gold"));
    console.log($.jStorage.get("s_exp"));
    console.log($.jStorage.get("s_lvl"));
    console.log($.jStorage.get("equipped"));
    console.log($.jStorage.get("upgrades"));
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
    }
    if (typeof $.jStorage.get("equipped")[0] === "string") {
        for(i = 0; i < $.jStorage.get("equipped").length; i += 1) {
            equipped[i] = $.jStorage.get("equipped")[i];
        }
        equipped = $.jStorage.get("equipped");
    }
    if (typeof $.jStorage.get("upgrades")[0] === "object") {
        for(i = 0; i < $.jStorage.get("upgrades").length; i += 1) {
            upgrades[i].count = $.jStorage.get("upgrades")[i].count;
        }
        console.log = inventory;
    }
    stat_gold = $.jStorage.get("s_gold");
    stat_experience = $.jStorage.get("s_exp");
    stat_level = $.jStorage.get("s_lvl");
    stat_points_spent = $.jStorage.get("s_p_s");
}
function reset(t, r) {
    if (t === "nodialog" || confirm("Reset all progress? This cannot be undone.") === true) {
        $.jStorage.flush();
        inventory = [];
        var newitem = {};
        newitem.listy = -128; newitem.type = "Consumable"; newitem.itemid = "c2"; newitem.listx = -32; newitem.heal = 10; newitem.gold = 5; newitem.name = "Health Vial";	newitem.desc = "A glass vial containing some sort of red healing liquid";
        newitem.count = 2;
        inventory.push(newitem);
        inventory.push(shop_list[4]);
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
        if (r === true) {
            location.reload();
        }
    }
}
