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
        case "levels":
            createPrompt("levelup");
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
            $(this).css("background-color", "transparent");
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
            $(this).css("background-color", "transparent");
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
                info.html(travel_default);
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
function updateLevels(p_h, p_i) {
    $("#megadiv").append("<div class='overlay'><div class='popup img_border_grey starfield'><div style='height: 24px; background-color:#2e2e2e; border-width:0px; border-bottom-width:6px; border-image: url(images/border_image_gold.png) 12 12 round; font-weight: bold'>" + p_h + "<div class='close'></div></div>" + p_i + "</div></div>");
    $(".close").on("click", function() {
        closePrompt();
    });
    $("li.lvl").hover(
        function() {
            $(this).css("background-color", "#444");
            viewLevel(this.id);
        },
        function() {
            $(this).css("background-color", "transparent");
            $("#megadiv").find("#menuheading").html("Mouse over an upgrade<br><div class='inv_icon' style='background_position: -224px 0px'></div>");
        }
    );
    $("li.lvl").off("click").on("click", function() {
            
        }
    );
}
function viewLevel(l) {
    $("#megadiv").find(".menuheading").html(data.upgrades[l].name);
    $("#popup_list").html("<li>" + data.upgrades[l].description + "</li>");
}
function createPrompt(pt) {
    var popup_info, popup_heading;
    switch (pt) {
        case "levelup":
            popup_heading = "Upgrades";
            popup_info = "<div style='width:150px; float:left'><ul>"
            var iconx, icony, a;
            for (a = 0; a < data.upgrades.length; a += 1) {
                iconx = data.upgrades[a].x;
                icony = data.upgrades[a].y;
                popup_info += "<li id='" + a + "' class='lvl'> <div class='inv_icon' style='background-position:" + iconx + "px " + icony + "px'></div><p class='invlist'>";
                popup_info += "</li>";
            }
            popup_info += "</ul></div><div style='float:left; width:; border-left:1px solid white'><p class='menuheading' style='padding-top:15px'>Mouse over an upgrade</p><ul id='popup_list'></ul></div>";
            updateLevels(popup_heading, popup_info);
            break;
        default:
            $("#megadiv").append("<div class='overlay'><div class='popup img_border_grey starfield'><div style='height: 24px; background-color:#2e2e2e; border-width:0px; border-bottom-width:6px; border-image: url(images/border_image_gold.png) 12 12 round;'>" + popup_heading + "<div class='close'></div></div>" + popup_info + "</div></div>");
            $(".close").on("click", function() {
                closePrompt();
            });
    }
}
function closePrompt() {
    $(".overlay").remove();
}
function changeBackground(c) {
    switch (c) {
        case "day":
            $("body").css("background-color","#fff");
            $("footer").find("p").css( "color", "#000");
            break;
        case "night":
            $("body").css("background-color","#000");
            $("footer").find("p").css( "color", "#fff");
            break;
    }
}