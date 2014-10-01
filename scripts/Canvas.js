var click_x;
var click_y;
// Essential canvas functions
function initCanvas() {
    $(document).ready( function(){
        //Get the canvas & context
        c = $('#C');
        var ct = c.get(0).getContext('2d');
        var container = $(c).parent();
        $(c).mousedown( function(event) {
            mouse_down = true;
        });
        $(c).mouseup( function(event) {
            mouse_down = false;
        });
        $(c).mousemove( function(event) {
            click_x = event.clientX - $(this).offset().left;
            click_y = event.clientY - $(this).offset().top;
        });

        //Run function when browser resizes
        $(window).resize( resizeCanvas );
        $(window).resize( updateCanvas );

        char.x = $(container).width() / 2;
        char.y = $(container).height() / 2;
        char.speed = 5;
        char.fire_interval = 0;

        ct.stroke();
        for (var i = 0; i <= 5; i += 1) {
            var rand_x = Math.random() * $(container).width(), rand_y = Math.random() * $(container).height();
            var new_obj = {"x":rand_x, "y":rand_y, "angle":0}
            map_objects.push(new_obj);
            ct.rect(rand_x, rand_y, 20, 20);
            ct.stroke();
        }

        //Initial call
        resizeCanvas();
    });
}
function updateCanvas() {
    var ct = c.get(0).getContext('2d'), container = $(c).parent();
    camera.x = char.x - ($(container).width() / 2 - 15);
    camera.y = char.y - ($(container).height() / 2 - 15);
    ct.clearRect(0, 0, $(container).width(), $(container).height());
    ct.fillStyle="#eee";
    ct.fillRect(0 - camera.x, 0 - camera.y, $(container).width(), $(container).height());
    ct.fillStyle="black";
    ct.fillRect(char.x - camera.x, char.y - camera.y, 30, 30);
    for (var o in map_objects) {
        var distance = findDistance(char, map_objects[o]);
        if (distance <= -30) {
            map_objects.splice(o, 1);
            continue;
        }
        ct.rect(map_objects[o].x - camera.x, map_objects[o].y - camera.y, 20, 20);
        ct.stroke();
    }
    ct.font="16px Arial";
    ct.fillText(location_header,2,17);
    //ct.drawImage(img_tileset, 0, 0, 32, 32, 0, 0, 32, 32);
}
function resizeCanvas(){
    var container = $(c).parent();
    c.attr('width', $(container).width() ); //max width
    c.attr('height', $(container).height() ); //max height
    camera.x = char.x + $(container).width();
    camera.y = char.y + $(container).height();
    //Call a function to redraw other content (texts, images etc)
    updateCanvas();
}
function onTick() {
    var container = $(c).parent();
    char.fire_interval -= 1;
    if (char.fire_interval <= 0 && mouse_down === true) {
        char.fire_interval = 40;
        fireProjectile(click_x, click_y);
    }
    if (keys_held[0] === true) {
        if (char.y > 0){
            char.y -= char.speed;
        }
    }if (keys_held[1] === true) {
        if (char.y + 30 < $(container).height()){
            char.y += char.speed;
        }
    }if (keys_held[2] === true) {
        if (char.x > 0){
            char.x -= char.speed;
        }
    }if (keys_held[3] === true) {
        if (char.x + 30 < $(container).width()){
            char.x += char.speed;
        }
    }
    for (var o in map_objects) {
        if (map_objects[o].class === "projectile") {
            map_objects[o].timeout -= 1;
            if (map_objects[o].timeout <= 0) {
                map_objects.splice(o, 1);
                continue;
            }
            map_objects[o].x += map_objects[o].speed * Math.cos(map_objects[o].angle * Math.PI / 180);
            map_objects[o].y += map_objects[o].speed * Math.sin(map_objects[o].angle * Math.PI / 180);
        }
    }
    resizeCanvas();
}
function canvasKeyDown(evt){
    switch (evt.keyCode) {
        case 38:  /* Up arrow key */
            keys_held[0] = true;
            break;
        case 40:  /* Down arrow key */
            keys_held[1] = true;
            break;
        case 37:  /* Left arrow key */
            keys_held[2] = true;
            break;
        case 39:  /* Right arrow key */
            keys_held[3] = true;
        break;
    }
}
function canvasKeyUp(evt){
    switch (evt.keyCode) {
        case 38:  /* Up arrow key */
            keys_held[0] = false;
            break;
        case 40:  /* Down arrow key */
            keys_held[1] = false;
            break;
        case 37:  /* Left arrow key */
            keys_held[2] = false;
            break;
        case 39:  /* Right arrow key */
            keys_held[3] = false;
        break;
    }
}
// Extras
function findDistance(obj1, obj2) {
    var xDist = obj1.x - obj2.x;
    var yDist = obj1.y - obj2.y;
    var dist = Math.sqrt((xDist * xDist) + (yDist * yDist));
    return (dist);
}
function fireProjectile(c_x, c_y) {
    var container = $(c).parent();
    var x = c_x - $(container).width() / 2;
    var y = c_y - $(container).height() / 2;
    var angle = Math.atan2(x, -y) * 180/Math.PI - 90;
    var new_object = {"x":char.x, "y":char.y, "angle":angle, "speed":10, "class":"projectile", "timeout":10};
    map_objects.push(new_object);
}
