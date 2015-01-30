var data = {
"items":[
    {
        "y":-224,
        "name":"Dagger",
        "type":"Weapon",
        "description":"A short -mat- blade with a small hilt, stabs enemies.",
        "gold":12,
        "damage":3,
        "timeout":12,
        "attack_speed":15,
        "speed":10
    },
    {
        "y":-192,
        "name":"Sword",
        "type":"Weapon",
        "description":"A sharp blade made of -mat-, cutting-edge medieval technology.",
        "gold":20,
        "damage":5,
        "timeout":20,
        "attack_speed":22,
        "speed":8.5
    },
    {
        "y":-256,
        "name":"Hammer",
        "type":"Weapon",
        "description":"A heavy slab of -mat- with a handle.",
        "gold":28,
        "damage":7,
        "timeout":30,
        "attack_speed":30,
        "speed":7
    },
    {
        "y":-96,
        "name":"Plate Armour",
        "type":"Armour",
        "description":"A plate armour set made of -mat-, protects from damage.",
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
        "description":"Iron is the most common metallic substance used to craft items. As a result of this, it is very cheap and items made of it do not have high value. Unfortunately, items made of iron do not have high damage or defence and rust easily.",
        "shop":"true"
    },
    {
        "x":0,
        "name":"Bronze",
        "gold_mult":6,
        "damage_mult":4,
        "defence_mult":4,
        "description":"Slightly stronger and more expensive than iron, bronze is still a very common item-making substance. As it is an alloy, it is more expensive to make than iron. It still has low damage and defence, however.",
        "shop":"true"
    },
    {
        "x":-32,
        "name":"Steel",
        "gold_mult":11,
        "damage_mult":7,
        "defence_mult":7,
        "description":"Steel is an alloy made from iron and carbon. It has a high tensile strength.",
        "shop":"false"
    },
    {
        "x":-64,
        "name":"Cobalt",
        "gold_mult":16,
        "damage_mult":10,
        "defence_mult":10,
        "description":"This metal is strong, lustrous and useful for alloys.",
        "shop":"false"
    },
    {
        "x":-96,
        "name":"Titanium",
        "gold_mult":21,
        "damage_mult":13,
        "defence_mult":13,
        "description":"A lustrous, strong and light metal with a silvery colour. It is highly resistant to corrosion.",
        "shop":"false"
    },
    {
        "x":-128,
        "name":"Carbon",
        "gold_mult":26,
        "damage_mult":16,
        "defence_mult":16,
        "description":"A material from the future, it is reinforced by the crystalline structure of carbon atoms. Its light-absorbing colour makes it highly desirable for dark lords, for fashion if nothing else.",
        "shop":"false"
    },
    {
        "x":-160,
        "name":"Mystium",
        "gold_mult":31,
        "damage_mult":19,
        "defence_mult":19,
        "description":"A highly magical substance, most of it comes from the Mystic Realm. It is highly sought after by all magicians, as its thaumic properties allow it to be enhanced past the level of any mundane material.",
        "shop":"false"
    },
    {
        "x":-192,
        "name":"Alienium",
        "gold_mult":36,
        "damage_mult":22,
        "defence_mult":22,
        "description":"A material used by beings from another world, alienium is extremely common on their planet. Here, it is almost as rare as adamantine.",
        "shop":"false"
    },
    {
        "x":-224,
        "name":"Adamantine",
        "gold_mult":41,
        "damage_mult":25,
        "defence_mult":25,
        "description":"Despite it being the toughest, heaviest and rarest substance in the universe, the shopkeeper seems to have an unlimited amount of it. The weapons of the gods are made from this material.",
        "shop":"false"
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
        "x":-128,
        "name":"River Stone"
    },
    {
        "y":-160,
        "x":-160,
        "name":"Rough Stone"
    },
    {
        "y":-160,
        "x":-192,
        "name":"Apple"
    }
],
"locations":[
	{
		"name":"Town",
		"difficulty":0,
    "item_drop":0,
		"description":"The safest place in the entire region",
		"arrival_text":"Welcome to the Town",
        "x":0
	},
	{
		"name":"Green Fields",
    "difficulty":1,
    "item_drop":0,
		"description":"Serene grasslands with mostly harmless inhabitants. A crashed airship resides here, thanks to your bad piloting skills.",
		"arrival_text":"You can see grasslands stretching beyond the horizon, scattered with the occasional tree.",
		"ground_type":"green grass",
        "x":-32
	},
	{
		"name":"Coal Hills",
		"difficulty":8,
    "item_drop":1,
		"description":"The hills here are rich in coal, the perfect place to start a coal industry.",
		"arrival_text":"Inside the numerous caves here, you can see rich veins of coal embedded into the stone.",
		"ground_type":"dark soil",
        "x":-64
	},
	{
		"name":"Dark Forest",
		"difficulty":16,
    "item_drop":2,
		"description":"A very foreboding forest, also very clichéd.",
		"arrival_text":"You cannot see through the tree line. The shadowy trees send shivers down your spine.",
		"ground_type":"foliage",
        "x":-96
	},
    {
		"name":"Mountain Trail",
		"difficulty":25,
    "item_drop":3,
		"description":"A cold and mountainous trail, dangerous to walk through.",
		"arrival_text":"The freezing wind and snow turns your body to ice. You hope you don't get frostbite...",
		"ground_type":"snow",
        "x":-128
	},
    {
		"name":"Hidden Valley",
		"difficulty":35,
    "item_drop":4,
		"description":"The mountain trail leads to this valley hidden in the mountains.",
		"arrival_text":"Towering mountain peaks surround you from a distance. A river runs through here; you decide to follow it.",
		"ground_type":"grass",
        "x":-192
	},
    {
		"name":"Deserted Desert",
		"difficulty":46,
    "item_drop":5,
		"description":"A harsh and sunny desert. Hopefully you have a large supply of water.",
		"arrival_text":"The river has died down to a trickle of water which ends in a puddle of mud. The scorching sun and burning sand make you thirsty just by thinking about them.",
		"ground_type":"sand",
        "x":-224
	},
    {
		"name":"-rand1- Land",
		"difficulty":58,
    "item_drop":6,
		"description":"A land of -rand2- and -rand3-.",
		"arrival_text":"You instantly notice the -rand1-ness of the place.",
		"ground_type":"-rand1- ground",
        "x":-256
	},
    {
		"name":"Unnamed Abyss",
		"difficulty":71,
    "item_drop":7,
		"description":"A bottomless chasm with no proper name.",
		"arrival_text":"You stay well away from the edge. The chasm appears to drop forever",
		"ground_type":"nothingness",
        "x":-288
	},
    {
		"name":"Mystic Portal",
		"difficulty":85,
    "item_drop":8,
		"description":"A portal to the Mystic Realm, the main exporter of Mystium.",
		"arrival_text":"The bright purple mystium dust hurts your eyes.",
		"ground_type":"mystium dust",
        "x":-160
	},
    {
		"name":"Alien Landing Site",
		"difficulty":100,
    "item_drop":9,
		"description":"An alien landing site. Bright lens flares and green alienium is used everywhere.",
		"arrival_text":"It is impossible to see anything through all the lens flares and bad CGI.",
		"ground_type":"Alienium",
        "x":-320
	}
],
"topics":[
    {
        "x":-32,
        "y":-32,
        "name":"Materials",
        "description":"Materials are what everything in this world is made of. They determine how powerful an item is and the rarity of the material determines how much the item is worth.",
        "list":"true"
    },
    {
        "x":-32,
        "y":-128,
        "name":"Potions",
        "description":"Potions help you survive battle. You can use healing potions to heal past your maximum hp temporarily.",
        "list":" "
    },
    {
        "x":-32,
        "y":-0,
        "name":"Battle",
        "description":"Meeting an enemy is more than likely to happen eventually. As a guide, instructions on how not to die instantly are included below.<br><b>Step-by-step guide on how to fight:</b>",
        "list":"<li><b>Step 1:</b> Click the 'Fight!' button</li><li><b>Step 2:</b> Click it again</li><li><b>Step 3:</b> Is your health low? Drink a health potion!</li><li><b>Step 4:</b> Repeat above until either you or the enemy is defeated</li>"
    }
],
"upgrades":[
    {
        "x":-96,
        "y":0,
        "name":"Extra Health",
        "max_points":"10",
        "description":"Through the magic of gaining levels, you can increase your maximum hitpoints.<br><br><span>+5 health per point</span>"
    },
    {
        "x":-224,
        "y":-160,
        "name":"Dagger Proficiency",
        "max_points":"1",
        "description":"Your dagger awesomeness allows you to attack twice 20% of the time!<br><br><span>+20% chance to deal +100% damage with a dagger</span>"
    },
    {
        "x":-256,
        "y":-160,
        "name":"Sword Proficiency",
        "max_points":"1",
        "description":"Parry those attacks!.<br><br><span>+1 defence with a sword.</span>"
    },
    {
        "x":-288,
        "y":-160,
        "name":"Hammer Proficiency",
        "max_points":"1",
        "description":"Learn how to swing a hammer better!<br><br><span>+10% damage with a hammer.</span>"
    },
    {
        "x":-32,
        "y":-96,
        "name":"Armour Proficiency",
        "max_points":"5",
        "description":"Use armour more effectively!<br><br><span>+10% defence per point.</span>"
    },
    {
        "x":-256,
        "y":0,
        "name":"Prestige",
        "max_points":"100",
        "description":"Find you have nothing to spend your level points on? Spend them here!<br><br><span>+1 prestige.</span>"
    }
],
"quests":[
    {
        "type":"Bandit",
        "name":"Kill -name- in -location-",
        "description":"A nearby bandit has been terrorising the town! Put an end to his crimes!"
    },
    {
        "type":"Collect",
        "name":"Find -number- of -item-",
        "description":"A random person wants you to collect -number -item-s!"
    }
],
"enchantments":[
    {
        "name":"Fire",
        "desc":"Burns things for -amount- magic damage",
        "stat":2,
        "amount":1,
        "power":1,
        "x":0,
        "y":-320
    },
    {
        "name":"Arcane",
        "desc":"Smites for -amount- magic damage",
        "stat":2,
        "amount":1,
        "power":3,
        "x":-64,
        "y":-320
    },
    {
        "name":"Ice",
        "desc":"Blocks -amount- extra damage",
        "stat":1,
        "amount":1,
        "power":1,
        "x":-32,
        "y":-320
    },
    {
        "name":"Speed",
        "desc":"Speeds attacks to deal -amount- extra damage on average",
        "stat":0,
        "amount":1,
        "power":1,
        "x":0,
        "y":-320
    },
    {
        "name":"Health",
        "desc":"-amount- extra health",
        "stat":"h",
        "amount":1,
        "power":1,
        "x":0,
        "y":-320
    }
]}
