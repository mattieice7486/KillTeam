import React, {Component} from 'react'; 

class Random extends Component {
	constructor(props, context) {
		super(props, context);
		
		this.state = {
      units: [],
      squadName: "",
      background: "",
      mission: "",
      squadQuirk: "",
      name: "",
      equipment: "",
      abilities: "",
      move: "",
      ws: "",
      bs: "",
      str: "",
      tough: "",
      wounds: "",
      att: "",
      ld: "",
      sv: "",
      pts: 0,
      wargearPts: 0,
      wargearPts2: 0,
      total: 0,
      race: {},
      unitType: {},
      wargearOptions: {},
      wargearOptions2: {},
      specialism: {},
      demeanour: "",
      items: [],
      user: null
		};
		
		this.randomName = this.randomName.bind(this);
		this.randomBackground = this.randomBackground.bind(this);
    this.randomDemeanour = this.randomDemeanour.bind(this);
	}
		randomName = (event) => {
		event.preventDefault();
		var first = [
			"Marius", "Agnathio", "Ollonius", "Cato", "Titus", "Agies", "Gaius", "Andrus", "Marcus", "Cassius"
		];
		var last = [
			"Chronus", "Tarentus", "Dysorius", "Cassus", "Acastian", "Varenus", "Apollon", "Aggennor", "Castus", "Poladrus"
		];
		var grey1 = [
			"Valdar", "Kaladour", "Pelenas", "Anval", "Drystan", "Garran", "Drako", "Caddon", "Arno", "Verdan"
		];
		var grey2 = [
			"Mordrak", "Torvin", "Thule", "Varn", "Ordan", "Gerontas", "Solor", "Cromm", "Kai", "Trevan"
		];
		var astra = [
			"Jens", "Karsk", "Hekler", "Reeve", "Pavlo", "Hektor", "Nils", "Thenmann", "Kyser", "Erlen", "Raphe", "Creed", "Lasko", "Ackerman", "Mattias", "Mortens", "Dansk", "Feodor", "Tomas", "Kolson", "Vance", "Pask", "Niems", "Gryf", "Willem", "Sonnen", "Ekhter", "Farestein", "Dekker", "Graf", "Arvans", "Viers", "Kolm", "Bask", "Vesker", "Pavlo"
		];
		var adeptus1 = [
			"Sy-gex", "Tyr", "Dak", "Ar", "Kappic-Schoelendt", "Tyba", "Dorox", "Alb", "Zyto-Neumann", "Xixos", "Kau", "Rho", "Delpha", "Chu", "Ix", "Neng-Pho", "Bheta", "Zhu", "Lho", "Teppa-Nyxos", "Kor", "Dox", "Sek", "Gryphonne-Reductus", "Tov", "Eq", "Mu", "Rhy", "Dos", "Exitor-Dho", "Fel", "Actus", "Xor", "Decima", "Rax", "Kas"
		];
		var adeptus2 = [
			"-511", "-1111", "-XXVII", "-802", "-323/mk12", "-089", "-744", "-VII", "-18.1", "-656", "-IV", "-110", "-0.4343", "-97/mk24", "-XIX", "-7", "-110100", "-3.16", "-961.34254", "-MXV", "-99", "-2918", "-888.88", "-404", "-1010", "-0.44//K", "-745", "-66.75/mk98", "-1/1/2", "-99941", "-83.2", "-575", "-79.09/5", "-668.2", "-1/5", "-666/2"
		];
		var heretic1 = [
			"Zekyr", "Dreccor", "Sorvram", "Thallos", "Zagator", "Korthranus", "Drekva", "Thygmor", "Ashrok", "Azmodial"
		];
		var heretic2 = [
			"Aximand", "the Vengeful", "Thrice-Cursed", "Korda", "the Black", "Daemonsblade", "Orakar", "Naxos", "the Mad", "Faithslayer"
		];
		var death1 = [
			"Gurloch", "Suppurax", "Golchor", "Festasmus", "Rancidius", "Mulgh", "Shurgholgh", "Bubox", "Pustus", "Malignus"
		];
		var death2 = [
			"Urghe", "Volghor", "Grulgus", "the Pestilent", "the Reeking", "the Curdled", "Glouch", "Muttermould", "Thrax", "Trudge"
		];
		var thousand1 = [
			"Phosis", "Amonhep", "Basteq", "Apophitar", "Thotek", "Kalophis", "Phael", "Thotmas", "Imhoden", "Ankhu"
		];
		var thousand2 = [
			"T'Kor", "Basth", "Takar", "Kallisar", "Rhan", "P'Tra", "Manahkmor", "Shen", "Apophontar", "H'Kett"
		];
		var asur1 = [
			"Tenrith", "Justune", "Aleerith", "Yrlla", "Aileer", "Caslith", "Tai'shar", "Jair", "Lurith", "Aleera", "Phyllistra", "Myrnoth", "Fyrram", "Ishylla", "Tishriel", "Aydona", "Galánta", "Ylleth", "Giladrea", "Osinell", "Glenoighi", "Ishtá", "Yvraine", "Intrisiel", "Torc", "Anesh", "Kalistri", "Alee", "Altanish", "Gwyth", "Tyrelli", "Kaithe", "Galrethi", "Noithi", "Braesil", "Meari",	"Fachean", "Tarvaril", "Fánai", "Yrmnoch", "Barahir", "Eldrion", "Dis'ar", "Eldos", "Kinshar", "Rhidhal", "Athairnos", "Eärandil,", "Siriolas", "Bahtaam", "Fian", "Eldroth", "Lorinth", "Illisar", "Ealion", "Elronhir", "Tamishar", "Arenal", "Iradil", "Maur", "Requiel", "Lann", "Yrule", "Ra'thar", "Las'hár", "Arision", "Ingfhar", "Senn", "Hal'thar", "Yrion", "Silgar", "Konrith"
		];
		var asur2 = [
			"the Fireheart", "Kyldroth", "Tridehlá", "Who Walks Alone", "of the Flowing Spirits", "Iydoth", "Brylliel", "Biel-rith", "(no second appelation)", "Iyadolath", "Last of the House of the Ayandi", "the Melancholy", "Llacharni ('brightheart')", "the Huntress", "Aryimelli", "Bringer of Azure Death", "Umachuli", "Shelwe-hann ('Song of Enlightenment')", "Serenti ('glory of the setting sun')", "Ullamar", "Dystari ('that which will never shatter')", "Ciaradh", "Iyadari", "Flethál ('Star-pattern of Perfection')", "the Whisper of Death", "Hanndroth ('Quest Eternal')", "Sheersom", "Cegodari ('who laughs at despair')", "Ullathani ('she who walks many paths')", "Corsikanni ('kin to Corsairs')", "Yn Farwolloch ('deadly to her enemies')", "Indomi", "Saim-Ingrelli ('the grace of the striking snake')", "Ysbwrieli ('Starsplinter')", "Morai-fen", "Undomniel", "Son of Coheria", "Finarfin", "Eldrion", "the Unyielding Fire", "Glaermril", "Arronnás", "Gloywach ('the Glow Dragon')", "the Uncompromising", "of the Noble House of Picarothi", "Enbrondil", "Lladronoth", "Bechareth ('spirit on the wind')", "Ceifulgaithann ('wind rider')", "Undroíl", "Caman ('the avenger')", "Tóir", "Scion of Rhidmar", "the Wanderer", "of the Clan Randras", "Llmaea-fen ('born of black suns')", "Rillietar", "Elarique of Alaitoc", "Sydarus Starstrider", "the Implacable", "Ulthos ('speaker of unspeakable truths')", "Sharnál", "the Deathly Eloquent", "Born of Twilight", "of the Tower of Stars", "Shelwe-nin ('Song of the Fading Star')", "the Undaunted", "Rhianthari ('starlight partially obscured by nebula')", "Eldroneth", "Trithjain ('Storm of the Stars')", "the Rising Star", "Bhanlhar ('avenger of the lost clan')"
		];
		var wych1 = [
			"Ariex", "Melikka", "Grendett", "Vaivel", "Bithandrel", "Ingenue", "Demadyne", "Laelanyel", "Excrucia", "Nathra", "Vrexith", "Thyndrella", "Selithrian", "Xela", "Peiythia", "Uless", "Skyshrin", "Anielyn", "Vyrenik", "Khatryx", "Nyssa", "Phyrix", "Mellyx", "Kherissa", "Tryxin", "Aniellah", "Veshtari", "Morghynn", "Thrixxesh", "Thessa", "Xindrell", "Kladys", "Shemriel", "Lyxanna", "Nimhre", "Vylekh"
		];
		var wych2 = [
			"La'flenz", "Wysp", "Soriel", "Oblique", "Nervose", "HektMournor", "Vivicon", "Viserhyx", "Berrebaal", "Vulptuse", "Ehlynna", "Khaur", "Hexehss", "the Crimson", "Thrix", "Khoryssa", "Vexx", "of the Screaming Blade", "Khrygg", "Nichtren", "Veluxis", "the Huntress", "Beastbane", "the Magnificent", "Trehll", "Xyriphraxis", "Masdruvael", "Khrone", "the Untouched", "Bloodslyk", "the Cruel", "Kharavyxis", "Ynthrekh", "Dyvahur", "Krael", "the Bloodsister"
		];
		var kabal1 = [
			"Anarkyss", "Veth'va", "Mayator", "Quacz", "Daisan", "Bekliel", "Orvak", "Narlek", "Monsatos", "Vivithrax", "Drevakh", "Kyzarkh", "Thresyn", "Shylas", "Lythric", "Kylos", "Threskril", "Skythe", "Akkhar", "Kharsac", "Nyktos", "Grevyth", "Thraed", "Sykil", "Khaeyl", "Madrax", "Akhirion", "Vypus", "Ethriliac", "Kheraes", "Iyshak", "Khepres", "Eldoriac", "Vrekkus", "Thayd", "Xurul"
		];
		var kabal2 = [
			"Sar'sel", "Vorpex", "Kreen", "the Bloodbreather", "Maestros", "Gaarsus", "Ehthrek", "Ghorghast", "Ignyss", "Mohrkhar", "Thresk", "Scaur", "the Pale", "Khadylus", "Phrel", "Vulkyriax", "Nul", "the Flenser", "Poisonblade", "Barbtongue", "Xesh", "the Ravening", "Draeven", "of the Obsidian Needle", "Vhrex", "Kaghmyr", "Thrail", "Flickerblade", "Xosh", "the Bleak", "Neverbreath", "Skahyl", "Verkosian", "Ulthurian", "Menesh", "the Cruel"
		];
		var harlequins1 = [
			"The Sun", "The Star", "The Shadow", "The Void", "The Sky", "The Redtide", "The Moon", "The Highborn", "The Leering", "The Bladed"
		];
		var harlequins2 = [
			"King", "Queen", "Prince", "Knave", "Witch", "Judge", "Executioner", "Seer", "Ghoul", "Crone"
		];
		var necron1 = [
			"Ankhep", "Tamonhak", "Eknotath", "Khotek", "Thanatar", "Amhut", "Karok", "Zan-Tep", "Unakh", "Khophec", "Tzantath", "Tahar", "Imonekh", "Trazat", "Xeoptar", "Hamanet", "Oberek", "Banatur", "Ahmnok", "Kophesh", "Teznet", "Odakhar", "Kythok", "Eknothet", "Anubitar", "Anokh", "Thotep", "Anhutek", "Ikhatar", "Thotmek", "Ramatek", "Homanat", "Taknophet", "Makhret", "(no first appellation)", "Zanatek"
		];
		var necron2 = [
			"the Unliving", "the Gilded", "the Great", "the Exalted", "the Loyal", "the Cruel", "the Storm's Eye", "the Bloodied", "the Mighty", "the Relentless", "the Unforgiving", "the Merciless", "the Glorious", "the Devoted", "the Victorious", "the Destroyer", "the Shrouded", "the Flenser", "the Unstoppable", "the Beheader", "the Impaler", "the Magnificent", "the Illuminated", "the Executioner", "the Phaeron's Hand", "the Guardian", "the Gatekeeper", "the All-seeing", "the All-knowing", "the Starkiller", "the Lifetaker", "the Godbreaker", "the Torchbearer", "the Stormbringer", "the Colossus"
		];
		var ork1 = [
			"Urzog", "Snikrat", "Krogskull", "Gorgrok", "Droknog", "Grodd", "Zogwarp", "Gitzog", "Ruggat", "Zargruk", "Stugbrog", "Snarkrat", "Zagblag", "Bokgrobber", "Zarknutz", "Dhakadak", "Nargrunt", "Farksnot", "Gharagh", "Urlakk", "Zogger", "Slazbag", "Squigface", "Ugul", "Tuska", "Nakboz", "Skarzot", "Kroggler", "Grukk", "Fragbad", "Traknug", "Grizgutz", "Shrokbog", "Kraznag", "Gragnatz", "Blokrotz"
		];
		var ork2 = [
			"Drakka", "Grug", "Gitstompa", "Skullcrusha", "Facekrumpa", "the 'Ard", "Grot Kicker", "da Shiv", "(no uvver bit)", "Blaktoof", "da Hammer", "Ghazbhag", "Steelfang", "Daggafist", "Squigbiter", "da Stompy", "da Facegrinda", "Loudgob", "Facebiter", "da Maniak", "Steelbootz", "Ripblade", "'Umiechewa", "Ironboot", "Flame Spitta", "Wurldkilla", "Stompkrumpa", "Spleenrippa", "Bigfangz", "Badfang", "Snotkicka", "Brewguzzla", "Bonesplitta", "'Eadkrakka", "Madeye", "Trakeye"
		];
		var tau = [
			"Sul'an", "Ho'sen", "Atsumo", "N'ea", "Els'im", "K'yen", "Orbs", "Pashera", "Rais", "Sel'tas", "Be'tol", "E'yaal", "Murakan", "To'jo", "Kurami", "U'so", "Lorresa", "Paluto", "Ren'as", "Lor'ma", "Tash'lor", "Watana", "Nomura", "Nishino", "D'tano", "Xo'yima", "T'suka", "Kais", "Sharmasa", "Pu'jato", "Ju'yem", "Ga'mo", "Kasashi", "Lamano", "Mi'daro", "Uvash'a"
		];
		var tyranid1 = [
			"The Omega", "The Creeping", "The Crimson", "The Kraken's", "The Leviathan's", "The Behemoth's", "Jormungandr's", "The Serpent's", "The Hydra's", "The Rising", "The Devouring", "The Looming", "The Gorgon's", "The Ravening", "The Kolorian", "The Icharian", "The Writhing", "The Inescapable", "The Dark", "Kronos'", "The Nightmare", "Tiamet's", "The Ominous", "Ouroboris'", "The Ancient", "The Slithering", "The Bladed", "The Monstrous", "The Elder", "The Nameless", "The Hunter's", "The Formless", "The Sudden", "The Void", "The Lurking", "The Hungry"
		];
		var tyranid2 = [
			"Infestation", "Talon", "Fang", "Claw", "Tendril", "Coil", "Eye", "Brood", "Shadow", "Dread", "Swarm", "Barb", "Jaws", "Assassins", "Slayers", "Executioners", "Ghosts", "Echo", "Terrors", "Horrors", "Lurkers", "Heralds", "Sting", "Bite", "Doom", "Buchers", "Devils", "Wraiths", "Menace", "Shroud", "Annihilators", "Scream", "Pall", "Devourers", "Stalkers", "Maw"
		];
		var genestealer1 = [
			"Gannar", "Dhraz", "Yohrick", "Kol", "Hastun", "Sayben", "Hollan", "Narek", "Rauss", "Basc", "Davon", "Zask", "Nasser", "Seimon", "Jacobiah", "Skir", "Ghaskin", "Foyle", "Kreen", "Judh", "Mordecai", "Isaak", "Michon", "Jerec", "Aldren", "Madrax", "Vyrion", "Hollun", "Steen", "Pike", "Mallick", "Groust", "Eldric", "Yorl", "Xandus", "Crasker"
		];
		var genestealer2 = [
			"Druchmann", "Kreel", "Desh", "Cavorla", "Krauss", "Gardlinger", "Zorbech", "Stennvar", "Varnway", "Starn", "Baumgart", "Drisso", "Sammer", "Helm", "Tarnright", "Valka", "Kelbrech", "Kheiser", "Madrach", "Venner", "Novek", "Svodnor", "Black", "Barchus", "Matterzhek", "Onderghast", "Thrace", "Lhaska", "Rezzekh", "Carleon", "Drevender", "Seifer", "Vreel", "Xyben", "Gorl", "Arnalt"
		];
		switch (this.state.race.value) {
			case "Adeptus Astartes":
				this.setState({name: first[Math.floor(Math.random()*9)] + " " + last[Math.floor(Math.random()*9)]})
				break;
			case "Deathwatch":
				this.setState({name: first[Math.floor(Math.random()*9)] + " " + last[Math.floor(Math.random()*9)]})
				break;
			case "Grey Knights":
				this.setState({name: grey1[Math.floor(Math.random()*9)] + " " + grey2[Math.floor(Math.random()*9)]})
				break;
			case "Astra Militarum":
				this.setState({name: astra[Math.floor(Math.random()*35)]})
				break;
			case "Adeptus Mechanicus":
				this.setState({name: adeptus1[Math.floor(Math.random()*35)] + adeptus2[Math.floor(Math.random()*35)]})
				break;
			case "Heretic Astartes":
				this.setState({name: heretic1[Math.floor(Math.random()*9)] + " " + heretic2[Math.floor(Math.random()*9)]})
				break;
			case "Death Guard":
				this.setState({name: death1[Math.floor(Math.random()*9)] + " " + death2[Math.floor(Math.random()*9)]})
				break;
			case "Thousand Sons":
				this.setState({name: thousand1[Math.floor(Math.random()*9)] + " " + thousand2[Math.floor(Math.random()*9)]})
				break;
			case "Asuryani":
				this.setState({name: asur1[Math.floor(Math.random()*71)] + " " + asur2[Math.floor(Math.random()*71)]})
				break;
			case "Drukhari":
				if (this.state.unitType.value === "Wych" || this.state.unitType.value === "Wych Fighter" || this.state.unitType.value === "Hekatrix") {
					this.setState({name: wych1[Math.floor(Math.random()*35)] + " " + wych2[Math.floor(Math.random()*35)]})
				} else {
					this.setState({name: kabal1[Math.floor(Math.random()*35)] + " " + kabal2[Math.floor(Math.random()*35)]})
				}
				break;
			case "Harlequins":
				this.setState({name: harlequins1[Math.floor(Math.random()*9)] + " " + harlequins2[Math.floor(Math.random()*9)]})
				break;
			case "Necrons":
				this.setState({name: necron1[Math.floor(Math.random()*35)] + " " + necron2[Math.floor(Math.random()*35)]})
				break;
			case "Orks":
				this.setState({name: ork1[Math.floor(Math.random()*35)] + " " + ork2[Math.floor(Math.random()*35)]})
				break;
			case "Tau Empire":
				this.setState({name: tau[Math.floor(Math.random()*35)]})
				break;
			case "Tyranids":
				this.setState({name: tyranid1[Math.floor(Math.random()*35)] + " " + tyranid2[Math.floor(Math.random()*35)]})
				break;
			case "Genestealer Cults":
				this.setState({name: genestealer1[Math.floor(Math.random()*35)] + " " + genestealer2[Math.floor(Math.random()*35)]})
				break;
			default:
				this.setState({name: first[Math.floor(Math.random()*9)] + " " + last[Math.floor(Math.random()*9)]})
			}
		}
							
	randomBackground = (event) => {
		event.preventDefault();
		var astartes3 = [
			"Crusaders", "Last Survivors", "Seekers After Vengeance", "Oath Sworn", "Infiltration Specialists", "Hand-picked Heroes", "Tactical Strike Force", "Fire Support", "Honour Guard", "Extermination Force"
		];
		var astartes4 = [
			"Shock and Awe", "Assassination", "Secure and Control", "Hold the Line", "Hit and Run", "Scouting Mission", "Rescue Mission", "Eliminate Target", "Line Breakers", "Speartip"
		];
		var astartes5 = [
			"Stubborn", "Dynamic", "Stealthy", "Zealous", "Exemplars", "Selfless", "Merciless", "Vendetta", "Bloodthirsty", "Strategists"
		];
		var deathwatch3 = [
			"Aquila Kill Team", "Furor Kill Team", "Venator Kill Team", "Dominatus Kill Team", "Malleus Kill Team", "Purgatus Kill Team", "Fortis Kill Team", "Mission Survivors", "The Long Hunt", "The Shield that Slays"
		];
		var deathwatch4 = [
			"Secure and Control", "The Cull", "Cut Off the Head", "Disrupt the Swarm", "The Heart of the Hive", "Knowledge is Power"
		];
		var deathwatch5 = [
			"Newly Forged", "Xenovendetta", "Competitive", "Pragmatic", "Bellicose", "The Bigger Picture"
		];
		var grey3 = [
			"They Hunt the Beast", "Those That Remain", "Purgation Corps", "Sworn Guardians", "Hand of the Prognosticars", "The Heroic Few"
		];
		var grey4 = [
			"End the Nightmare", "Aquisitus Prohibitum", "Wield the True Name", "Reap the Tally", "Scorched Earth", "Trial by Blade"
		];
		var grey5 = [
			"Unyielding", "Blessed Aura", "Exacting", "Bellicose", "Sworn to Purify", "Dark Lore"
		];
		var astra3 = [
			"Penal Troopers", "Hardened Veterans", "Light Infantry", "Sappers", "Elite Guards", "Fresh Meat", "Drop Troops", "Tank Hunters", "Shock Troops", "Grizzled Survivors"
		];
		var astra4 = [
			"Hold at All Costs", "Assault", "Assassinate", "Demolitions", "Die Well", "Raiders", "Capture Location", "Recon", "Messengers", "Looters"
		];
		var astra5 = [
			"Faithful", "Parade Ground Drilled", "Tunnel Fighters", "City Fighters", "Death Worlders", "Xenos Hunters", "Seen Too Much", "Chem-addicts", "Gone Native", "Killer Rep"
		];
		var adeptus3 = [
			"Explorator Team", "Archeotech Hunters", "Elimination Clade", "Campaign Veterans", "Titan Guards", "Rad-zone Corps", "Infiltrator Clade", "Domination Cadre", "Itratii Cadre", "Corpus-Sactarii Clade"
		];
		var adeptus4 = [
			"Defend the Sacred Technologies", "Recover a Holy Prize", "Biologis Sample Extraction", "Strategic Martyrdom", "Smite a Tech-heretic", "Eliminate Heretical Machineries", "Righteous Auto-castigation", "Root Out Techno-dissidents", "Eradicate False Testament", "Victory for Logic"
		];
		var adeptus5 = [
			"Acquisitive", "Jealous Guardians", "Mindlessly Devout", "Requiring Re-sanctification", "Monotask", "Pursuing Auto-perfection", "Cybernetic Ascension", "Mercilessly Decisive", "Secretive", "Beyond the Crux Mechanicus"
		];
		var heretic3 = [
			"Champions All", "Lost and Damned", "Veterans of the Long War", "Predators", "Warp-infused Warriors", "Tzeentch Worshippers", "Khorne Worshippers", "Slaanesh Worshippers", "Nurgle Worshippers", "Worldslayers"
		];
		var heretic4 = [
			"Terror Raid", "Seed Corruption", "Dark Ritual", "Sunder the Gates", "Arcane Prize", "Faithbreakers", "Seekers After Glory", "Hand of the Gods", "Dark Guardians", "Saboteurs"
		];
		var heretic5 = [
			"Embittered", "Berserk", "Devious", "Zealous", "Cruel", "Stolid", "Iron Discipline", "Arrogant", "Insane", "Possessed"
		];
		var death3 = [
			"The Virulent", "Dark Alchemists", "Trench Fighters", "Mortarion's Chosen", "Reapers", "Shepherds of the Neverdead"
		];
		var death4 = [
			"Defilers", "Seize and Profane", "Victory Through Endurance", "Sevenfold Slaughter", "Fatal Infection", "Warp-spores"
		];
		var death5 = [
			"Morbid Mirth", "Justifiable Arrogance", "Dirgesong", "Vengeful", "Servants of Entropy", "Relentless"
		];
		var thousand3 = [
			"Heralds of Madness", "Seekers After Sorcery", "Arch-coven", "Relentless Destroyers", "Warriors Out of Time", "Daemonologists"
		];
		var thousand4 = [
			"Ritual Desecration", "Abduction", "Sowing Sorcery", "Firestorm", "Vengeance for Prospero", "Hands of Fate"
		];
		var thousand5 = [
			"Aetheric Coronae", "One Will", "Single-Minded", "Ancient Dust", "Superior", "Ghosts of the Warp"
		];
		var asur3 = [
			"Gwynt'ar Fue", "Pre-emptive Strike", "Keepers of the Gate", "The Shrine Ascendant", "Shadow Squad", "Echoes of Greatness", "Ily'Haeth Khai", "Cleansers", "The Bladed Mirror", "Wardens of the Pivotal Life"
		];
		var asur4 = [
			"Enact the Bailic-fen", "Suprise Attack", "Keepers of the Gate", "Talons of Heg", "Fate's Executioners", "Forbidden Ground", "The First Wave", "Faolchú's Wings", "A greater Foe", "Mobile Defence", "Phyllistra", "Myrnoth", "Fyrram", "Ishylla", "Tishriel", "Aydona", "Galánta", "Ylleth", "Giladrea", "Osinell", "Glenoighi", "Ishtá", "Yvraine", "Intrisiel", "Torc", "Anesh", "Kalistri", "Alee", "Altanish", "Gwyth", "Tyrelli", "Kaithe", "Galrethi", "Noithi", "Braesil", "Meari",	"Fachean", "Tarvaril", "Fánai", "Yrmnoch", "Barahir", "Eldrion", "Dis'ar", "Eldos", "Kinshar", "Rhidhal", "Athairnos", "Eärandil,", "Siriolas", "Bahtaam", "Fian", "Eldroth", "Lorinth", "Illisar", "Ealion", "Elronhir", "Tamishar", "Arenal", "Iradil", "Maur", "Requiel", "Lann", "Yrule", "Ra'thar", "Las'hár", "Arision", "Ingfhar", "Senn", "Hal'thar", "Yrion", "Silgar", "Konrith"
		];
		var asur5 = [
			"Close Bonds", "Fickle", "Merciless Hate", "Sorrows Beyond Measure", "Psychically Attuned", "Uncanny Perfectionists", "Servants of Prophecy", "Superior", "A Shining Example", "Arrogant and Aloof"
		];
		var druk3 = [
			"Vanguard Party", "Slave Trialists", "Ascendant Murderers", "Enemies of My Enemy", "Avatars of the Arenas", "Slithering Compulsion", "Hired Blades", "Betrayers", "One Shall Stand", "Desolators"
		];
		var druk4 = [
			"Probe", "Harvest", "Interrogate", "Assassinate", "Deceive", "Terrorize", "Abduct", "Enslave", "Disembowel", "Revel"
		];
		var druk5 = [
			"Sinful Focus", "Revel in Pain", "Swift and Deadly", "Reckless", "Territorial", "Trophy Hunters", "Eldritch Cunning", "Masochistic", "Shadow Stalkers", "Consummate Provocateurs"
		];
		var harlequins3 = [
			"The Swords of Khaine", "Webway Wanderers", "The Solitary", "Fate's Messengers", "Sinister Killers", "Guardians of the Black Library"
		];
		var harlequins4 = [
			"The Dance of the Thief's Reward", "The Dance of Kurnous' Gate", "The Dance of the Crimson Reaping", "The Dance of the Veiled Blade", "The Dance of the Starving Ygghs", "The Dance of Vaul's Tempering"
		];
		var harlequins5 = [
			"Warriors of the Light", "Blades of the Twilight", "Talons of the Dark", "Swift as the Wind", "Cruelly Mocking", "Starlight Stride"
		];
		var necron3 = [
			"Harbingers", "Tomb Guardians", "Invaders from Beyond", "The Phaeron's Chosen", "Scouring Party", "Code-bound", "Assassins", "Ghoulish Nightmares", "Mindless Martyrs", "Domination Force"
		];
		var necron4 = [
			"The Cull", "Mindthieves", "Servants of the Crypteks", "Heralds of the Uprising", "Chrono-aquisitors", "Fractal Disruption", "Punishment Detail", "Relentless War", "The Phaeron's Blade", "The Phaeron's Curse"
		];
		var necron5 = [
			"The Curse of Time", "Wreathed in Power", "Deadly Automata", "Dark Sentience", "Ether-flux", "Skin-takers", "Arrogant Hunters", "Deranged", "Unfeeling", "Favoured Warriors"
		];
		var ork3 = [
			"Gung-ho!", "Filled with Waaagh!", "Skraphuntaz", "The Shootiest", "Sneaky Gits!", "Brutal", "Kunnin'", "Internal Rivalries", "Addicted to Destruction", "Spreaders of the Waaagh!"
		];
		var ork4 = [
			"Kill Their Bosses", "Get Stuck In", "Salvage", "'Andz off", "We'll Show 'Em", "Da Ambush", "Speed Is Its Own Reward", "Sneak About", "Fist of Gork (or Mork)", "Plant da Flag"
		];
		var ork5 = [
			"Loud and Tuneless", "Boastful", "Itchy", "Madboyz", "Krumpin' Krew", "Hard-bitten", "Lucky Gitz", "Pyromaniacs", "Buzzsquigs", "Praktical Jokers"
		];
		var tau3 = [
			"Survivors", "Stealth Experts", "Prototype Weapons Testers", "Edification Team", "Urban Combat Specialists", "Heroes of the Greater Good", "Bodyguard Retinue", "Elite of the Academics", "Fourth Sphere Veterans", "Sniper Team"
		];
		var tau4 = [
			"Bait the Trap", "Mark the Target", "Destroy the Enemy Supplies", "Assassination", "Ambush", "Extract the Target", "Weapons Test", "Seize Vital Intel", "Forward Reconnaissance", "Defend Strategic Asset"
		];
		var tau5 = [
			"Honourable Warriors", "Vengeful", "Unyielding", "Students of Kauyon", "Students of Mont'ka", "Canny Tacticians", "No Heroes", "Tech-minded", "Ghosts", "No One Left Behind"
		];
		var tyranid3 = [
			"Stealth Brood", "Devourer Brood", "Swiftkiller Brood", "Highcrawler Brood", "Bombardment Brood", "Kill-swarm", "Living Barricade", "Alpha Pack", "Ambush Brood", "Kinglsayer Brood"
		];
		var tyranid4 = [
			"Devour", "Infiltrate", "Cull", "Swarm", "Terrify", "Rampage", "Stalk", "Spread", "Protect", "Shroud"
		];
		var tyranid5 = [
			"Ravenous", "Cautious", "Slinking", "Bladed Shoal", "Inescapable Hunters", "Shrieker Blood", "Sizzling Gore", "Heightened Senses", "Shorn of Synapse", "Catalysed"
		];
		var genestealer3 = [
			"Scavenger Cell", "The Prophet's Claw", "Tunnel Skulkers", "Killers in the Fold", "Eyes of the Patriarch", "Iconoclast Cell", "Snatcher Cell", "Shadowstalker Gene-kin", "Snare Setters", "Veterans of the First Cycle"
		];
		var genestealer4 = [
			"Open Their Eyes", "Feed the Progeny", "Raid Supply Lines", "Prepare the Killing Field", "Sabotage Vital Machinery", "Undertunnel Ambush", "They Know Too Much", "Spread the Cult", "Tear Down False Idols", "From Below"
		];
		var genestealer5 = [
			"Deep-dwellers", "Gene-kin Cant", "Rabid Evangelists", "Anarchists", "Devious Scum", "Twisted Physiologies", "Fanatics", "Creeping Killers", "Inhuman Cruelty", "Murderous"
		];
		switch (this.state.race.value) {
			case "Adeptus Astartes":
				this.setState({background: astartes3[Math.floor(Math.random()*9)]})
				this.setState({mission: astartes4[Math.floor(Math.random()*9)]})
				this.setState({squadQuirk: astartes5[Math.floor(Math.random()*9)]})
				break;
			case "Deathwatch":
				this.setState({background: deathwatch3[Math.floor(Math.random()*9)]})
				this.setState({mission: deathwatch4[Math.floor(Math.random()*5)]})
				this.setState({squadQuirk: deathwatch5[Math.floor(Math.random()*5)]})
				break;
			case "Grey Knights":
				this.setState({background: grey3[Math.floor(Math.random()*5)]})
				this.setState({mission: grey4[Math.floor(Math.random()*5)]})
				this.setState({squadQuirk: grey5[Math.floor(Math.random()*5)]})
				break;
			case "Astra Militarum":
				this.setState({background: astra3[Math.floor(Math.random()*9)]})
				this.setState({mission: astra4[Math.floor(Math.random()*9)]})
				this.setState({squadQuirk: astra5[Math.floor(Math.random()*9)]})
				break;
			case "Adeptus Mechanicus":
				this.setState({background: adeptus3[Math.floor(Math.random()*9)]})
				this.setState({mission: adeptus4[Math.floor(Math.random()*9)]})
				this.setState({squadQuirk: adeptus5[Math.floor(Math.random()*9)]})
			break;
			case "Heretic Astartes":
				this.setState({background: heretic3[Math.floor(Math.random()*9)]})
				this.setState({mission: heretic4[Math.floor(Math.random()*9)]})
				this.setState({squadQuirk: heretic5[Math.floor(Math.random()*9)]})
				break;
			case "Death Guard":
				this.setState({background: death3[Math.floor(Math.random()*5)]})
				this.setState({mission: death4[Math.floor(Math.random()*5)]})
				this.setState({squadQuirk: death5[Math.floor(Math.random()*5)]})
				break;
			case "Thousand Sons":
				this.setState({background: thousand3[Math.floor(Math.random()*5)]})
				this.setState({mission: thousand4[Math.floor(Math.random()*5)]})
				this.setState({squadQuirk: thousand5[Math.floor(Math.random()*5)]})
				break;
			case "Asuryani":
				this.setState({background: asur3[Math.floor(Math.random()*9)]})
				this.setState({mission: asur4[Math.floor(Math.random()*9)]})
				this.setState({squadQuirk: asur5[Math.floor(Math.random()*9)]})
				break;
			case "Drukhari":
				this.setState({background: druk3[Math.floor(Math.random()*9)]})
				this.setState({mission: druk4[Math.floor(Math.random()*9)]})
				this.setState({squadQuirk: druk5[Math.floor(Math.random()*9)]})
				break;
			case "Harlequins":
				this.setState({background: harlequins3[Math.floor(Math.random()*5)]})
				this.setState({mission: harlequins4[Math.floor(Math.random()*5)]})
				this.setState({squadQuirk: harlequins5[Math.floor(Math.random()*5)]})
				break;
			case "Necrons":
				this.setState({background: necron3[Math.floor(Math.random()*9)]})
				this.setState({mission: necron4[Math.floor(Math.random()*9)]})
				this.setState({squadQuirk: necron5[Math.floor(Math.random()*9)]})
				break;
			case "Orks":
				this.setState({background: ork3[Math.floor(Math.random()*9)]})
				this.setState({mission: ork4[Math.floor(Math.random()*9)]})
				this.setState({squadQuirk: ork5[Math.floor(Math.random()*9)]})
				break;
			case "Tau Empire":
				this.setState({background: tau3[Math.floor(Math.random()*9)]})
				this.setState({mission: tau4[Math.floor(Math.random()*9)]})
				this.setState({squadQuirk: tau5[Math.floor(Math.random()*9)]})
				break;
			case "Tyranids":
				this.setState({background: tyranid3[Math.floor(Math.random()*9)]})
				this.setState({mission: tyranid4[Math.floor(Math.random()*9)]})
				this.setState({squadQuirk: tyranid5[Math.floor(Math.random()*9)]})
				break;
			case "Genestealer Cults":
				this.setState({background: genestealer3[Math.floor(Math.random()*9)]})
				this.setState({mission: genestealer4[Math.floor(Math.random()*9)]})
				this.setState({squadQuirk: genestealer5[Math.floor(Math.random()*9)]})
				break;
			default:
				this.setState({background: astartes3[Math.floor(Math.random()*9)]})
				this.setState({mission: astartes4[Math.floor(Math.random()*9)]})
				this.setState({squadQuirk: astartes5[Math.floor(Math.random()*9)]})
		}
	}

	randomDemeanour = (event) => {
		event.preventDefault();
		var astartes6 = [
			"Dour", "Ebullient", "Aggressive", "Castellan", "Noble", "Xenophobic", "Ferocious", "Sombre", "Mysterious", "Charismatic"
		];
		var deathwatch6 = [
			"Newcomer", "Black Shield", "Xenobiologist", "Fuelled by Hate", "Tactician", "Huntsman", "Marksman", "Grim", "Contemptuous", "Murderous"
		];
		var grey6 = [
			"Wrathful", "Fanatical", "Mystic", "Methodical", "Firebrand", "Vengeful", "Marksman", "Psychic Nexus", "Merciless", "Stoic"
		];
		var astra6 = [
			"Dutiful", "Haunted", "Nerves of Steel", "Pious", "Eagle-eye", "Courageous", "Vengeful", "Psycho", "Expert", "Gung-ho"
		];
		var adeptus6 = [
			"Meticulously Observant", "Binharic Piety", "Biologis Cognis", "Mechadominus", "Defensor Majoris", "Memeglitch", "Uncompromator Doctrines", "Ironstride", "Strategic Chorister", "Autopuritanical Ballistics"
		];
		var heretic6 = [
			"Ultimate Veteran", "Cannibal", "Deranged", "Blade-master", "Visionary", "Living Canker", "Unstoppable Force", "Twisted", "True Believer", "On the Brink"
		];
		var death6 = [
			"Drudge", "Morbid Fascinations", "Jocular", "Generous", "Belligerent", "Meticulous", "Deathflinger", "Reeking Horror", "Taking Samples", "Stubborn"
		];
		var thousand6 = [
			"Enigmatic", "Exacting", "Ninefold Warrior", "War is an Altar", "The Madness of Tzeentch", "Unspeaking", "Plans Within Plans", "Prophesier", "Pyromaniac", "Seething with Change"
		];
		var asur6 = [
			"Acrobatic", "Mentally Dextrous", "Crystalline Soul", "Damned", "Survivor's Guilt", "Absolute Focus", "Haughty", "Cold as the Void", "Passionate", "Grandiloquent"
		];
		var druk6 = [
			"Predator's Eye", "Dark Flamboyance", "Ravenous", "Extravagant", "Scheming", "Mistrustful", "Darkened Soul", "Unforgiving", "Boundless Ambition", "Vindictive"
		];
		var harlequins6 = [
			"Heroic Protagonist", "Malicious Antagonist", "Bladed Fool", "Sorrowful Killer", "Gleeful Maniac", "Relentless Destroyer", "Sombre Executioner", "Fate's Herald", "Eternal Wanderer", "The Harmonious Herald"
		];
		var necron6 = [
			"Menacing", "Maniacal", "Strategic", "Nihilist", "Tormentor", "Glitching", "Obsessive", "Delusional", "Acquisitive", "Necrochirurgeon"
		];
		var ork6 = [
			"Thick-headed", "Heavily Scarred", "Stubborn", "Light-fingered", "Violent Loon", "Resilient", "Beady-eyed", "Too Dumb to Know Fear", "Foul Gob", "Big and Brawny"
		];
		var tau6 = [
			"Scholar of Puretide", "Pragmatic", "Precise", "Hot-Blooded", "Wise Veteran", "Unflappable", "Perceptice", "Dishonoured", "Farsight Sympathiser", "Monat"
		];
		var tyranid6 = [
			"Hive Node", "Sentient Ammunition", "Entangling Tendrils", "Synaptophage", "Guardian Beast", "Survival Instincts", "Bloodhunger", "Unsettling Presence", "Lurker", "Mimic"
		];
		var genestealer6 = [
			"Acidic Spittle", "Strange Twitching", "Enlightener", "Marker of the Dead", "Unblinking", "Proselytiser", "Tunnelspawn", "Destined Ascension", "Predatory Instincts", "Born Survivor"
		];
		switch (this.state.race.value) {
			case "Adeptus Astartes":
				this.setState({demeanour: astartes6[Math.floor(Math.random()*9)]})
				break;
			case "Deathwatch":
				this.setState({demeanour: deathwatch6[Math.floor(Math.random()*9)]})
				break;
			case "Grey Knights":
				this.setState({demeanour: grey6[Math.floor(Math.random()*9)]})
				break;
			case "Astra Militarum":
				this.setState({demeanour: astra6[Math.floor(Math.random()*9)]})
				break;
			case "Adeptus Mechanicus":
				this.setState({demeanour: adeptus6[Math.floor(Math.random()*9)]})
				break;
			case "Heretic Astartes":
				this.setState({demeanour: heretic6[Math.floor(Math.random()*9)]})
				break;
			case "Death Guard":
				this.setState({demeanour: death6[Math.floor(Math.random()*9)]})
				break;
			case "Thousand Sons":
				this.setState({demeanour: thousand6[Math.floor(Math.random()*9)]})
				break;
			case "Asuryani":
				this.setState({demeanour: asur6[Math.floor(Math.random()*9)]})
				break;
			case "Drukhari":
				this.setState({demeanour: druk6[Math.floor(Math.random()*9)]})
				break;
			case "Harlequins":
				this.setState({demeanour: harlequins6[Math.floor(Math.random()*9)]})
				break;
			case "Necrons":
				this.setState({demeanour: necron6[Math.floor(Math.random()*9)]})
				break;
			case "Orks":
				this.setState({demeanour: ork6[Math.floor(Math.random()*9)]})
				break;
			case "Tau Empire":
				this.setState({demeanour: tau6[Math.floor(Math.random()*9)]})
				break;
			case "Tyranids":
				this.setState({demeanour: tyranid6[Math.floor(Math.random()*9)]})
				break;
			case "Genestealer Cults":
				this.setState({demeanour: genestealer6[Math.floor(Math.random()*9)]})
				break;
			default:
				this.setState({demeanour: astartes6[Math.floor(Math.random()*9)]})
			}
		}

}

export default Random;