function viewMenu(screen) {
    'use strict';
    viewStats();
    switch (screen) {
        case "inventory":
            updateItems();
            $(".menuheading").html("Equip items and drink potions!");
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
            $(".menuheading").html("'Help' others!");
            $("#list_heading").html("Errands and Quests <i>(Mouse over to view)</i>");
            $("#list_sort").html(" ");
            break;
        case "locations":
            updateLocations();
            $(".menuheading").html("Travel to your doom!");
            $("#list_heading").html("Locations <i>(Click to travel)</i>");
            $("#list_sort").html(" ");
            break;
        case "levels":
            updateLevels();
            $(".menuheading").html("Become more powerful!");
            $("#list_heading").html("Upgrades <i style='color:#22bb00'>(" + (stat_level - stat_points_spent) + " points left)</i>");
            $("#list_sort").html(" ");
            break;
        case "encyclopedia":
            updateTopics();
            $(".menuheading").html("Read the book about (not quite) everything!");
            $("#list_heading").html("Topics <i>(Click to read)</i>");
            $("#list_sort").html(" ");
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
                $("#location_header").html(current_location.name);
                if (current_location.difficulty > 0) {
                    eventExploreArrival(true);
                } else {
                    eventTown();
                }
                if (menuscreen === "locations") {
                    updateLocations();
                }
                eventShop("hide");
            } else if (battle === true) {
                info.html(travel_default);
            } else {
                current_location = map[this.id];
                inv_sell = false;
                shop = false;
                battle = false;
                viewStats();
                current_location = map[this.id];
                $("#location_header").html(current_location.name);
                if (current_location.difficulty > 0) {
                    eventExploreArrival(true);
                } else {
                    eventTown();
                }
                if (menuscreen === "locations") {
                    updateLocations();
                }
                eventShop("hide");
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
            $("li.inv").css("background-color", "#FFF");
            $(this).css("background-color", "#DDD");
            viewTopic(book[this.id]);
        },
        function () {
            $("li.inv").css("background-color", "#FFF");
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
	var list_text = " ";
    if (l.name === "Materials") {
        for (var i in data.materials) {
            list_text += "<li class='stats'><div class='inv_icon' style='background-position:" + data.materials[i].x + " -32px'></div>: " + data.materials[i].name + "<li>" + data.materials[i].description + "</li></li><br>";
        }
        $("#menu_readout_top").html(l.description + "<br><b>Information on the material tiers:</b>");
    } else {
        $("#menu_readout_top").html(l.description);
        list_text = l.list;
    }
	$("#menu_list_right").html(list_text);
}
function initLevels() {
    var i;
    for (i = 0; i < data.upgrades.length; i += 1) {
        var new_upg = {};
        new_upg.count = 0;
        new_upg.max_points = data.upgrades[i].max_points;
        upgrades.push(new_upg);
    }
}
function updateLevels(cv) {
    if (cv === true) {
        /*$("#megadiv").append("<div class='overlay'><div class='popup img_border_grey starfield'><div class='headerdiv'>Level up!<div class='close'></div></div><canvas id='levelcanvas' width='1000' height='1000' style=''></canvas></div></div>");
        var canvas = oCanvas.create({
            canvas: "#levelcanvas"
        });
        var rectangle = canvas.display.rectangle({

        });*/
    }
    else {
        'use strict';
        var iconx, icony, a, t = " ";
        for (a = 0; a < data.upgrades.length; a += 1) {
            iconx = data.upgrades[a].x;
            icony = data.upgrades[a].y;
            t += "<li id='" + a + "' class='inv'> <div class='inv_icon' style='background-position:" + iconx + "px " + icony +
                "px'></div><p class='invlist'>" + data.upgrades[a].name + " (" + upgrades[a].count + "/" + data.upgrades[a].max_points + ")";
        }
        $("#menu_list_left").html(t);

        //Mouseover stats
        $("li.inv").hover(
            function () {
                $(this).css("background-color", "#DDD");
                var upg = data.upgrades[this.id];
                viewUpgrade(upg, this.id);
            },
            function () {
                $(this).css("background-color", "#FFF");
                viewStats();
            }
        );
        $("li.inv").off("click").on("click",
            function () {
                var upg = upgrades[this.id], info = $("#this.id").html();
                if (upg.count < upg.max_points && stat_points_spent < stat_level) {
                    upg.count += 1;
                    stat_points_spent += 1;
                    viewMenu("levels");
                }
            });
    }
}
function viewUpgrade(l, n) {
    var list_text;
	$("#menu_readout_top").html(l.description);
	list_text = "<li class='stats'><div class='inv_icon' style='background-position:-224px 0px'></div>: " + l.max_points + " maximum points</li>" +
                "<li class='stats'><div class='inv_icon' style='background-position:-64px -64px'></div>: " + upgrades[n].count + " points invested</li>";
	$("#menu_list_right").html(list_text);
}
function createPrompt(pt) {
    switch (pt) {
        case "levelup":
            updateLevels();
            break;
        default:
            $("#megadiv").append("<div class='overlay'><div class='popup img_border_grey starfield'><div class='headerdiv'>" + popup_heading + "<div class='close'></div></div>" + popup_info + "</div></div>");
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
