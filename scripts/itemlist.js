var data = {"items":[
    {
        "y":-224,
        "name":"Dagger",
        "type":"Weapon",
        "description":"A short -mat- blade with a small hilt, stabs enemies.",
        "gold":12,
        "damage":3
    },
    {
        "y":-192,
        "name":"Sword",
        "type":"Weapon",
        "description":"A sharp blade made of -mat-, cutting-edge medieval technology.",
        "gold":20,
        "damage":5
    },
    {
        "y":-256,
        "name":"Hammer",
        "type":"Weapon",
        "description":"A heavy slab of -mat- with a handle.",
        "gold":28,
        "damage":7
    },
    {
        "y":-96,
        "name":"Armour",
        "type":"Armour",
        "description":"An armour set made of -mat-, protects from damage.",
        "gold":40,
        "defence":2
    }
],
"materials":[
    {
        "x":-32,
        "name":"Iron",
        "gold_mult":1,
        "damage_mult":1,
        "defence_mult":1,
        "description":"Iron is the most common metallic substance used to craft items. As a result of this, it is very cheap and items made of it do not have high value. Unfortunately, items made of iron do not have high damage or defence and rust easily."
    },
    {
        "x":0,
        "name":"Bronze",
        "gold_mult":6,
        "damage_mult":4,
        "defence_mult":4,
        "description":"Slightly stronger and more expensive than iron, bronze is still a very common item-making substance. As it is an alloy, it is more expensive to make than iron. It still has low damage and defence, however."
    },
    {
        "x":-32,
        "name":"Steel",
        "gold_mult":11,
        "damage_mult":7,
        "defence_mult":7,
    },
    {
        "x":-64,
        "name":"Cobalt",
        "gold_mult":16,
        "damage_mult":10,
        "defence_mult":10,
    },
    {
        "x":-96,
        "name":"Titanium",
        "gold_mult":21,
        "damage_mult":13,
        "defence_mult":13,
    },
    {
        "x":-128,
        "name":"Carbon",
        "gold_mult":26,
        "damage_mult":16,
        "defence_mult":16,
    },
    {
        "x":-160,
        "name":"Mystium",
        "gold_mult":31,
        "damage_mult":19,
        "defence_mult":19,
    },
    {
        "x":-192,
        "name":"Alienium",
        "gold_mult":36,
        "damage_mult":22,
        "defence_mult":22,
    },
    {
        "x":-224,
        "name":"Adamantine",
        "gold_mult":41,
        "damage_mult":25,
        "defence_mult":25,
    }
],
"worthless":[
    {
        "y":-64,
        "x":0,
        "name":"Brown Book"
    },
    {
        "y":-64,
        "x":-32,
        "name":"Grey Book"
    },
    {
        "y":-64,
        "x":-64,
        "name":"Blue Book"
    },
    {
        "y":-64,
        "x":-128,
        "name":"Black Book"
    },
    {
        "y":-64,
        "x":-160,
        "name":"Purple Book"
    },
    {
        "y":-64,
        "x":-192,
        "name":"Green Book"
    },
    {
        "y":-64,
        "x":-256,
        "name":"Red Book"
    },
    {
        "y":-160,
        "x":-160,
        "name":"River Stone"
    },
    {
        "y":-160,
        "x":-128,
        "name":"Rough Stone"
    },
    {
        "y":-160,
        "x":-192,
        "name":"Apple"
    },
],
"locations":[
	{
		"name":"Town",
		"difficulty":0,
		"description":"The safest place in the entire region",
		"arrival_text":"Welcome to the Town",
        "x":0
	},
	{
		"name":"Green Fields",
		"difficulty":1,
		"description":"Serene grasslands with mostly harmless inhabitants.",
		"arrival_text":"You can see grasslands stretching beyond the horizon, scattered with the occasional tree.",
		"ground_type":"green grass",
        "x":-32
	},
	{
		"name":"Coal Hills",
		"difficulty":4,
		"description":"The hills here are rich in coal, the perfect place to start a coal industry.",
		"arrival_text":"Inside the numerous caves here, you can see rich veins of coal embedded into the stone.",
		"ground_type":"dark soil",
        "x":-64
	},
	{
		"name":"Dark Forest",
		"difficulty":10,
		"description":"A very foreboding forest, also very clichéd.",
		"arrival_text":"You cannot see through the tree line. The shadowy trees send shivers down your spine.",
		"ground_type":"foliage",
        "x":-96
	},
    {
		"name":"Mountain Trail",
		"difficulty":19,
		"description":"A cold and mountainous trail, dangerous to walk through.",
		"arrival_text":"The freezing wind and snow turns your body to ice. You hope you don't get frostbite...",
		"ground_type":"snow",
        "x":-128
	},
    {
		"name":"Mystic Portal",
		"difficulty":31,
		"description":"A portal to the Mystic Realm, the main exporter of Mystium.",
		"arrival_text":"The bright purple mystium dust hurts your eyes.",
		"ground_type":"mystium dust",
        "x":-160
	}
],
"topics":[
    {
        "x":-32,
        "y":-32,
        "name":"Materials",
        "description":"Materials are what everything in this world is made of. They determine how powerful an item is and the rarity of the material determines how much the item is worth."
    }
],
"upgrades":[
    {
        "name":"Extra Health",
        "max_points":"10",
        "description":"Through the magic of gaining levels, you can increase your maximum hitpoints.<br>+10 health per point"
    },
    {
        "name":"Dagger Proficiency",
        "max_points":"1",
        "description":"Your dagger awesomeness allows you to attack twice 20% of the time!<br>+20% chance to deal +100% damage with a dagger"
    },
    {
        "name":"Sword Proficiency",
        "max_points":"1",
        "description":"Parry those attacks!.<br>+1 defence with a sword."
    },
    {
        "name":"Hammer Proficiency",
        "max_points":"1",
        "description":"Learn how to swing a hammer better!<br>+10% damage with a hammer."
    },
    {
        "name":"Armour Proficiency",
        "max_points":"5",
        "description":"Use armour more effectively!<br>+10% defence per point."
    },
    {
        "name":"Prestige",
        "max_points":"100",
        "description":"Find you have nothing to spend your level points on? Spend them here!<br>+1 prestige."
    }
]
}