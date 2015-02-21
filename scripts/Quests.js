function eventQuest(q) {
    'use strict';
    var new_quest;
    switch (q) {
        case "errand":
            new_quest = data.quests[Math.floor(Math.random() * data.quests.length)];
            var count = Math.ceil(Math.random() * 8), location = Math.floor(Math.random() * map.length), name = createName();
            var n1 = new_quest.name.replace("-name-", name);
            var n2 = n1.replace("-number-", count);
            var n3 = n2.replace("-location-", location);
            var d1 = new_quest.description.replace("-name-", name);
            var d2 = d1.replace("-number-", count);
            var d3 = d2.replace("-location-", location);
            new_quest.description = d3;
            new_quest.name = n3;
            new_quest.gold = count * 10;
            errands.push(new_quest);
            break;
        case "main":
            new_quest = {"type":"Reason for existing", "name":"Build Airship", "description":"Build another airship so you can get out of these boring grasslands."};
            errands.push(new_quest);
            break;
    }
}
function updateErrands() {
    'use strict';
    var iconx = 0, icony = 0, a, t = " ";
    for (a = 0; a < errands.length; a += 1) {
        //iconx = errands[a].listx;
        //icony = errands[a].listy;
        //t += "<li id='" + a + "' class='inv'> <div class='inv_icon' style='background-position:" + iconx + "px " + icony + "px'></div>" + errands[a].name + "</li>";
    } if (t === " ") {
        t = "<li><i>You currently have no quests.</i></li>";
    }
    $("#menu_list_left").html(t);

    //Mouseover stats
    $("li.inv").hover(
        function () {
            $(this).css("background-color", "#DDD");
            var e = errands[this.id];
            viewErrand(e);
        },
        function () {
            $(this).css("background-color", "transparent");
            viewStats();
        }
    );
}
function viewErrand(e) {
    'use strict';
    var t;
    t = "<li>" + e.description + "</li>"
    if (e.gold > 0) {
        t += "<li><div class='inv_icon' style='background-position:0px 0px'></div>: " + e.gold + " gold as reward</li>";
    }
    $("#menu_readout_top").html("About this quest:");
    $("#menu_list_right").html(t);
}
