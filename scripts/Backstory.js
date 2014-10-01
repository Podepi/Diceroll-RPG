function eventIntro() {
    createPrompt(0, "The story...", "Having bought a shiny new steam-powered airship (it was the most expensive on sale), you decided to take it for a joyride around the world to settle the long-lasting question of whether the world is round or flat.<br><br>Unfortunately, you run into a terrible storm within the first day and crash-land in a flat grassland.<br><br>Luckily, despite your lack of piloting skill, you survive. Scavenging any spare materials you can find, you build a tiny hut for shelter.<br><br>Hopefully you can find a town somewhere around here and continue your journey.<br><br><i style='font-size:14px'>(Click the 'X' in the top right to close this window)</i>");
    eventAirship(0)
}
function eventAirship(time) {
    info.html("The remains of what used to be your airship lie short distance from your hut. From the looks of things you will have to build a new one.");
    $("#location_header").html("Airship Crash Site");
    btn1.show();
    btn1.html("<div class='btn_icon'></div>Scavenge materials");
    btn1.off("click").on("click",
        function() {
            eventExploreMaterials();
        }
    );
    btn2.show();
    btn2.html("<div class='btn_icon'></div>Hut");
    btn2.off("click").on("click",
        function() {

        }
    );
    btn3.show();
    btn3.html("<div class='btn_icon'></div>Airship");
    btn3.off("click").on("click",
        function() {

        }
    );
}
function eventExploreMaterials() {
    var rand = Math.floor(Math.random() * data.airship.materials.length);
    
}
