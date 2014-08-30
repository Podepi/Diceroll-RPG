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
        "gold":20,
        "defence":2
    }
],
"materials":[
    {
        "x":0,
        "name":"Bronze",
        "gold_mult":1,
        "damage_mult":1,
        "defence_mult":1,
    },
    {
        "x":-32,
        "name":"Iron",
        "gold_mult":3,
        "damage_mult":2,
        "defence_mult":2,
    },
    {
        "x":-32,
        "name":"Steel",
        "gold_mult":6,
        "damage_mult":4,
        "defence_mult":4,
    },
    {
        "x":-64,
        "name":"Cobalt",
        "gold_mult":12,
        "damage_mult":8,
        "defence_mult":8,
    },
    {
        "x":-96,
        "name":"Titanium",
        "gold_mult":24,
        "damage_mult":16,
        "defence_mult":16,
    },
    {
        "x":-128,
        "name":"Carbon",
        "gold_mult":48,
        "damage_mult":32,
        "defence_mult":32,
    },
    {
        "x":-160,
        "name":"Mystium",
        "gold_mult":96,
        "damage_mult":64,
        "defence_mult":64,
    },
    {
        "x":-192,
        "name":"Alienium",
        "gold_mult":192,
        "damage_mult":128,
        "defence_mult":128,
    },
    {
        "x":-224,
        "name":"Adamantine",
        "gold_mult":384,
        "damage_mult":256,
        "defence_mult":256,
    }
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
		"difficulty":7,
		"description":"The hills here are rich in coal, the perfect place to start a coal industry.",
		"arrival_text":"Inside the numerous caves here, you can see rich veins of coal embedded into the stone.",
		"ground_type":"dark soil",
        "x":-64
	},
	{
		"name":"Dark Forest",
		"difficulty":14,
		"description":"A very foreboding forest, also very clichéd.",
		"arrival_text":"You cannot see through the tree line. The shadowy trees send shivers down your spine.",
		"ground_type":"foliage",
        "x":-96
	},
    {
		"name":"Mountain Trail",
		"difficulty":14,
		"description":"A cold and mountainous trail, dangerous to walk through.",
		"arrival_text":"The freezing wind and snow turns your body to ice. You hope you don't get frostbite...",
		"ground_type":"snow",
        "x":-128
	},
    {
		"name":"Mystic Portal",
		"difficulty":14,
		"description":"A portal to the Mystic Realm, the main exporter of Mystium.",
		"arrival_text":"The bright purple mystium dust hurts your eyes.",
		"ground_type":"mystium dust",
        "x":-160
	}
]
}