import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, InputNumber, TextArea, FormBtn } from "../../components/Form";
import firebase from "firebase";
import { auth } from '../../utils/Firebase';
import Select from 'react-select';
import Confirm from "../../components/Confirm";
import astartes from "../../assets/astartes1.png";
import astra from "../../assets/astra1.png";
import asuryani from "../../assets/asuryani1.png";
import deathguard from "../../assets/deathguard1.png";
import deathwatch from "../../assets/deathwatch1.png";
import drukhari from "../../assets/drukhari1.png";
import grey from "../../assets/grey1.png";
import genestealer from "../../assets/genestealer1.png";
import harlequin from "../../assets/harlequin1.png";
import heretic from "../../assets/heretic1.png";
import mechanicus from "../../assets/mechanicus1.png";
import necron from "../../assets/necron1.png";
import ork from "../../assets/ork1.png";
import tau from "../../assets/tau1.png";
import thousand from "../../assets/thousand1.png";
import tyranid from "../../assets/tyranid1.png";



class Units extends Component {
  constructor(props) {
    super(props);
    this.state = {
      units: [],
      squadName: "",
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
      items: [],
      user: null
    };
    this.handleDatabaseSubmit = this.handleDatabaseSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
    this.handleChange4 = this.handleChange4.bind(this);
  }

  componentDidMount() {
    
    this.loadUnits();
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } 
    });
    
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
    if (this.state.race.value === "Grey Knights") {
		  this.setState({name: grey1[Math.floor(Math.random()*9)] + " " + grey2[Math.floor(Math.random()*9)]})
    }
    else if (this.state.race.value === "Astra Militarum") {
		  this.setState({name: astra[Math.floor(Math.random()*35)]})
    }
    else if (this.state.race.value === "Adeptus Mechanicus") {
		  this.setState({name: adeptus1[Math.floor(Math.random()*35)] + adeptus2[Math.floor(Math.random()*35)]})
    }
    else if (this.state.race.value === "Heretic Astartes") {
		  this.setState({name: heretic1[Math.floor(Math.random()*9)] + " " + heretic2[Math.floor(Math.random()*9)]})
    }
    else if (this.state.race.value === "Death Guard") {
		  this.setState({name: death1[Math.floor(Math.random()*9)] + " " + death2[Math.floor(Math.random()*9)]})
    }
    else if (this.state.race.value === "Thousand Sons") {
		  this.setState({name: thousand1[Math.floor(Math.random()*9)] + " " + thousand2[Math.floor(Math.random()*9)]})
    }
    else if (this.state.race.value === "Asuryani") {
		  this.setState({name: asur1[Math.floor(Math.random()*71)] + " " + asur2[Math.floor(Math.random()*71)]})
    }
    else if (this.state.race.value === "Drukhari" && (this.state.unitType.value === "Wych" || this.state.unitType.value === "Wych Fighter" || this.state.unitType.value === "Hekatrix")) {
		  this.setState({name: wych1[Math.floor(Math.random()*35)] + " " + wych2[Math.floor(Math.random()*35)]})
    }
    else if (this.state.race.value === "Drukhari") {
		  this.setState({name: kabal1[Math.floor(Math.random()*35)] + " " + kabal2[Math.floor(Math.random()*35)]})
    }
    else if (this.state.race.value === "Harlequins") {
		  this.setState({name: harlequins1[Math.floor(Math.random()*9)] + " " + harlequins2[Math.floor(Math.random()*9)]})
    }
    else if (this.state.race.value === "Necrons") {
		  this.setState({name: necron1[Math.floor(Math.random()*35)] + " " + necron2[Math.floor(Math.random()*35)]})
    }
    else if (this.state.race.value === "Orks") {
		  this.setState({name: ork1[Math.floor(Math.random()*35)] + " " + ork2[Math.floor(Math.random()*35)]})
    }
    else if (this.state.race.value === "Tau Empire") {
		  this.setState({name: tau[Math.floor(Math.random()*35)]})
    }
    else if (this.state.race.value === "Tyranids") {
		  this.setState({name: tyranid1[Math.floor(Math.random()*35)] + " " + tyranid2[Math.floor(Math.random()*35)]})
    }
    else if (this.state.race.value === "Genestealer Cults") {
		  this.setState({name: genestealer1[Math.floor(Math.random()*35)] + " " + genestealer2[Math.floor(Math.random()*35)]})
    }
    else {
		  this.setState({name: first[Math.floor(Math.random()*9)] + " " + last[Math.floor(Math.random()*9)]})
    }
	}

  componentDidUpdate() {
    var sum = 0;
    for (let i = 0; i < this.state.units.length; i++) {
      sum += this.state.units[i].pts;
      if (this.state.total === 0) {
      this.setState({
        total: sum
      })
      }
		}
  }

  loadUnits = () => {
    API.getUnits()
      .then(res =>
        this.setState({
        units: res.data,
        squadName: "",
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
        race: {},
        unitType: {},
        wargearOptions: {},
        wargearOptions2: {}
      }), this.squadTotal()
      )
			.catch(err => console.log(err));
  };

  deleteUnit = id => {
    this.confirm1.open('Delete Unit?', () => {
    API.deleteUnit(id)
    .then(res => this.loadUnits())
    .catch(err => console.log(err));
		})
		
  };

	deleteAll = () => {
		this.confirm1.open('Delete All?', () => {
		API.getUnits()
		.then(res => {for (let i = 0; i < res.data.length; i++) {
			API.deleteUnit(res.data[i]._id)
			this.loadUnits()
		};
		})
		.catch(err => console.log(err));
		})
	}
	
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log(this)
    if (this.state.name && this.state.unitType) {
      API.saveUnit({
        name: this.state.name,
        equipment: this.state.equipment,
        abilities: this.state.abilities,
        move: this.state.move,
        ws: this.state.ws,
        bs: this.state.bs,
        str: this.state.str,
        tough: this.state.tough,
        wounds: this.state.wounds,
        att: this.state.att,
        ld: this.state.ld,
        sv: this.state.sv,
        pts: this.state.pts + this.state.wargearPts + this.state.wargearPts2,
        race: this.state.race.value,
        unitType: this.state.unitType.label,
      })
      .then(res => this.loadUnits())
      .catch(err => console.log(err));
		}
  };
  
  handleDatabaseSubmit(e) {
		const itemsRef = firebase.database().ref('Users');
    if (this.state.user !== null) {
      const item = {
          user: this.state.user.displayName,
          avatar: this.state.user.photoURL,
          units: this.state.units,
          squadName: this.state.squadName,
          total: this.state.total
      }
			itemsRef.push(item)
			API.getUnits()
			.then(res => {for (let i = 0; i < res.data.length; i++) {
				API.deleteUnit(res.data[i]._id);
				this.loadUnits()
				};
			})
			.catch(err => console.log(err));
		};
  };

  squadTotal = () => {
		var sum = 0;
		API.getUnits()
		.then(res => {for (let i = 0; i < res.data.length; i++) {
			sum += res.data[i].pts;
			this.setState({
				total: sum
			})
			if (this.state.total > 100) {
				console.log("squad is over 100 points!")
			}
		}})
		.catch(err => console.log(err));
	}

  handleChange1 = (race) => {
		this.setState({
			race,
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
			unitType: {},
			wargearOptions: {},
			wargearOptions2: {}
		});
  };

  handleChange2 = (unitType) => {
		this.setState({
			unitType: unitType,
			abilities: "",
      wargearPts: 0,
      wargearPts2: 0,
			wargearOptions: {},
			wargearOptions2: {}
		})
    if (this.state.race.value === "Adeptus Astartes") {
			this.setState({
				move: 6,
        ws: 3,
        bs: 3,
        str: 4,
        tough: 4
      })
		}
    if (unitType.value === "Scout") {
			this.setState({
				wounds: 1,
        att: 1,
        ld: 7,
        sv: 4,
        pts: 10,
        equipment: "boltgun, bolt pistol, frag grenades, krak grenades",
        abilities: "And They Shall Know No Fear, Transhuman Physiology"
      });
		}

    if (unitType.value === "Scout Gunner") {
      this.setState({
        wounds: 1,
        att: 1,
        ld: 7,
        sv: 4,
        pts: 11,
        equipment: "boltgun, bolt pistol, frag grenades, krak grenades",
        abilities: "And They Shall Know No Fear, Transhuman Physiology"
      });
    }
    if (unitType.value === "Scout Sergeant") {
      this.setState({
        wounds: 1,
        att: 2,
        ld: 8,
        sv: 4,
        pts: 11,
        equipment: "boltgun, bolt pistol, frag grenades, krak grenades",
        abilities: "And They Shall Know No Fear, Transhuman Physiology"
      });
    }
    if (unitType.value === "Tactical Marine") {
      this.setState({
        wounds: 1,
        att: 1,
        ld: 7,
        sv: 3,
        pts: 12,
        equipment: "boltgun, bolt pistol, frag grenades, krak grenades",
        abilities: "And They Shall Know No Fear, Transhuman Physiology"
      });
    }
    if (unitType.value === "Tactical Marine Gunner") {
      this.setState({
        wounds: 1,
        att: 1,
        ld: 7,
        sv: 3,
        pts: 13,
        equipment: "boltgun, bolt pistol, frag grenades, krak grenades",
        abilities: "And They Shall Know No Fear, Transhuman Physiology"
      });
    }
    if (unitType.value === "Tactical Marine Sergeant") {
      this.setState({
        wounds: 1,
        att: 2,
        ld: 8,
        sv: 3,
        pts: 13,
        equipment: "boltgun, bolt pistol, frag grenades, krak grenades",
        abilities: "And They Shall Know No Fear, Transhuman Physiology"
      });
    }
    if (unitType.value === "Reiver") {
      this.setState({
        wounds: 2,
        att: 2,
        ld: 7,
        sv: 3,
        pts: 16,
        equipment: "bolt carbine, heavy bolt pistol, frag grenades, krak grenades, shock grenades",
        abilities: "And They Shall Know No Fear, Transhuman Physiology, Terror Troops"
      });
    }
    if (unitType.value === "Reiver Sergeant") {
      this.setState({
        wounds: 2,
        att: 3,
        ld: 8,
        sv: 3,
        pts: 17,
        equipment: "bolt carbine, heavy bolt pistol, frag grenades, krak grenades, shock grenades",
        abilities: "And They Shall Know No Fear, Transhuman Physiology, Terror Troops"
      });
    }
    if (unitType.value === "Intercessor") {
      this.setState({
        wounds: 2,
        att: 2,
        ld: 7,
        sv: 3,
        pts: 15,
        equipment: "bolt rifle, bolt pistol, frag grenades, krak grenades",
        abilities: "And They Shall Know No Fear, Transhuman Physiology"
      });
    }
    if (unitType.value === "Intercessor Gunner") {
      this.setState({
        wounds: 2,
        att: 2,
        ld: 7,
        sv: 3,
        pts: 16,
        equipment: "bolt rifle, bolt pistol, frag grenades, krak grenades",
        abilities: "And They Shall Know No Fear, Transhuman Physiology"
      });
    }
    if (unitType.value === "Intercessor Sergeant") {
      this.setState({
        wounds: 2,
        att: 3,
        ld: 8,
        sv: 3,
        pts: 16,
        equipment: "bolt rifle, bolt pistol, frag grenades, krak grenades",
        abilities: "And They Shall Know No Fear, Transhuman Physiology"
      });
    }
    ///////////////////////////////////
    //Deathwatch
    ///////////////////////////////////
    if (this.state.race.value === "Deathwatch") {
      this.setState({
        move: 6,
        ws: 3,
        bs: 3,
        str: 4,
        tough: 4,
        wounds: 1,
        sv: 3,
        equipment: "boltgun, frag grenades, krak grenades"
      })
    }
    if (unitType.value === "Deathwatch Veteran") {
      this.setState({
        att: 2,
        ld: 8,
        pts: 14,
        abilities: "Special Issue Ammunition, And They Shall Know No Fear, Transhuman Physiology"
      });
    }
    if (unitType.value === "Deathwatch Veteran Gunner") {
      this.setState({
        att: 2,
        ld: 8,
        pts: 16,
        abilities: "Special Issue Ammunition, And They Shall Know No Fear, Transhuman Physiology"
      });
    }
    if (unitType.value === "Black Shield") {
      this.setState({
        att: 3,
        ld: 8,
        pts: 16,
        abilities: "Special Issue Ammunition, And They Shall Know No Fear, Transhuman Physiology, atonement through honour"
      });
    }
    if (unitType.value === "Watch Sergeant") {
      this.setState({
        att: 3,
        ld: 9,
        pts: 16,
        abilities: "Special Issue Ammunition, And They Shall Know No Fear, Transhuman Physiology"
      });
    }
    ///////////////////////////////////
    //Grey Knights
    ///////////////////////////////////
    if (this.state.race.value === "Grey Knights") {
      this.setState({
        move: 6,
        ws: 3,
        bs: 3,
        str: 4,
        tough: 4,
        wounds: 1,
        sv: 3,
        equipment: "nemesis force sword, storm bolter, frag grenades, krak grenades, psyk-out grenades",
        abilities: "And They Shall Know No Fear, Daemon hunters, Transhuman Physiology, Rites of Banishment"
      })
    }
    if (unitType.value === "Grey Knight") {
      this.setState({
        att: 1,
        ld: 7,
        pts: 18
      });
    }
    if (unitType.value === "Grey Knight Gunner") {
      this.setState({
        att: 1,
        ld: 7,
        pts: 18
      });
    }
    if (unitType.value === "Justicar") {
      this.setState({
        att: 2,
        ld: 8,
        pts: 19
      });
    }
    ///////////////////////////////////
    //Astra Militarum
    ///////////////////////////////////
    if (this.state.race.value === "Astra Militarum") {
      this.setState({
        move: 6,
        str: 3,
        tough: 3,
        wounds: 1
      })
    }
    if (unitType.value === "Guardsman") {
      this.setState({
        ws: 4,
        bs: 4,
        att: 1,
        ld: 6,
        pts: 5,
        sv: 5,
        equipment: "lasgun, frag grenades"
      });
    }
    if (unitType.value === "Guardsman Gunner") {
      this.setState({
        ws: 4,
        bs: 4,
        att: 1,
        ld: 6,
        pts: 5,
        sv: 5,
        equipment: "lasgun, frag grenades"
      });
    }
    if (unitType.value === "Sergeant") {
      this.setState({
        ws: 4,
        bs: 4,
        att: 2,
        ld: 7,
        pts: 5,
        sv: 5,
        equipment: "lasgun, frag grenades",
        abilities: "Voice of Command"
      });
    }
    if (unitType.value === "Special Weapons Guardsman") {
      this.setState({
        ws: 4,
        bs: 4,
        att: 1,
        ld: 6,
        pts: 5,
        sv: 5,
        equipment: "lasgun, frag grenades",
        abilities: "Voice of Command"
      });
    }
    if (unitType.value === "Special Weapons Gunner") {
      this.setState({
        ws: 4,
        bs: 4,
        att: 1,
        ld: 6,
        pts: 5,
        sv: 5,
        equipment: "lasgun, frag grenades",
        abilities: "Voice of Command"
      });
    }
    if (unitType.value === "Scion") {
      this.setState({
        ws: 4,
        bs: 3,
        att: 1,
        ld: 6,
        pts: 9,
        sv: 4,
        equipment: "hot-shot lasgun, frag grenades, krak grenades"
      });
    }
    if (unitType.value === "Scion Gunner") {
      this.setState({
        ws: 4,
        bs: 3,
        att: 1,
        ld: 6,
        pts: 10,
        sv: 4,
        equipment: "hot-shot lasgun, frag grenades, krak grenades"
      });
    }
    if (unitType.value === "Tempestor") {
      this.setState({
        ws: 3,
        bs: 3,
        att: 2,
        ld: 7,
        pts: 10,
        sv: 4,
        equipment: "hot-shot lasgun, frag grenades, krak grenades",
        abilities: "Voice of Command"
      });
    }
    ///////////////////////////////////
    //Adeptus Mechanicus
    ///////////////////////////////////
    if (this.state.race.value === "Adeptus Mechanicus") {
      this.setState({
        bs: 3,
        tough: 3,
        sv: 4
      })
    }
    if (unitType.value === "Skitarii Ranger") {
      this.setState({
        move: 6,
        ws: 4,
        str: 3,
        wounds: 1,
        att: 1,
        ld: 6,
        pts: 9,
        equipment: "galvanic rifle",
        abilities: "Canticles of the Omnissiah, Bionics"
      });
    }
    if (unitType.value === "Ranger Gunner") {
      this.setState({
        move: 6,
        ws: 4,
        str: 3,
        wounds: 1,
        att: 1,
        ld: 6,
        pts: 10,
        equipment: "galvanic rifle",
        abilities: "Canticles of the Omnissiah, Bionics"
      });
    }
    if (unitType.value === "Ranger Alpha") {
      this.setState({
        move: 6,
        ws: 4,
        str: 3,
        wounds: 1,
        att: 2,
        ld: 7,
        pts: 10,
        equipment: "galvanic rifle",
        abilities: "Canticles of the Omnissiah, Bionics"
      });
    }
    if (unitType.value === "Skitarii Vanguard") {
      this.setState({
        move: 6,
        ws: 4,
        str: 3,
        wounds: 1,
        att: 1,
        ld: 6,
        pts: 9,
        equipment: "radium carbine",
        abilities: "Canticles of the Omnissiah, Bionics, Rad-Saturation"
      });
    }
    if (unitType.value === "Vanguard Gunner") {
      this.setState({
        move: 6,
        ws: 4,
        str: 3,
        wounds: 1,
        att: 1,
        ld: 6,
        pts: 10,
        equipment: "radium carbine",
        abilities: "Canticles of the Omnissiah, Bionics, Rad-Saturation"
      });
    }
    if (unitType.value === "Vanguard Alpha") {
      this.setState({
        move: 6,
        ws: 4,
        str: 3,
        wounds: 1,
        att: 2,
        ld: 7,
        pts: 10,
        equipment: "radium carbine",
        abilities: "Canticles of the Omnissiah, Bionics, Rad-Saturation"
      });
    }
    if (unitType.value === "Sicarian Ruststalker") {
      this.setState({
        move: 8,
        ws: 3,
        str: 4,
        wounds: 2,
        att: 3,
        ld: 6,
        pts: 14,
        equipment: "transonic razor, chordclaw",
        abilities: "Canticles of the Omnissiah, Bionics"
      });
    }
    if (unitType.value === "Ruststalker Princeps") {
      this.setState({
        move: 8,
        ws: 3,
        str: 4,
        wounds: 2,
        att: 4,
        ld: 7,
        pts: 15,
        equipment: "transonic razor, chordclaw",
        abilities: "Canticles of the Omnissiah, Bionics"
      });
    }
    if (unitType.value === "Sicarian Infiltrator") {
      this.setState({
        move: 8,
        ws: 3,
        str: 4,
        wounds: 2,
        att: 2,
        ld: 6,
        pts: 14,
        equipment: "stub carbine, power sword",
        abilities: "Canticles of the Omnissiah, Bionics, neurostatic aura"
      });
    }
    if (unitType.value === "Infiltrator Princeps") {
      this.setState({
        move: 8,
        ws: 3,
        str: 4,
        wounds: 2,
        att: 3,
        ld: 7,
        pts: 15,
        equipment: "stub carbine, power sword",
        abilities: "Canticles of the Omnissiah, Bionics, neurostatic aura"
      });
    }
    ///////////////////////////////////
    //Heretic Astartes
    ///////////////////////////////////
    if (this.state.race.value === "Heretic Astartes") {
      this.setState({
        move: 6,
        wounds: 1
      })
    }
    if (unitType.value === "Chaos Cultist") {
      this.setState({
        ws: 4,
        bs: 4,
        str: 3,
        tough: 3,
        att: 1,
        ld: 5,
        sv: 6,
        pts: 4,
        equipment: "autogun",
        abilities: "Mark of Chaos"
      });
    }
    if (unitType.value === "Chaos Cultist Gunner") {
      this.setState({
        ws: 4,
        bs: 4,
        str: 3,
        tough: 3,
        att: 1,
        ld: 5,
        sv: 6,
        pts: 5,
        equipment: "autogun",
        abilities: "Mark of Chaos"
      });
    }
    if (unitType.value === "Cultist Champion") {
      this.setState({
        ws: 4,
        bs: 4,
        str: 3,
        tough: 3,
        att: 1,
        ld: 6,
        sv: 6,
        pts: 5,
        equipment: "autogun",
        abilities: "Mark of Chaos"
      });
    }
    if (unitType.value === "Chaos Space Marine") {
      this.setState({
        ws: 3,
        bs: 3,
        str: 4,
        tough: 4,
        att: 1,
        ld: 7,
        sv: 3,
        pts: 12,
        equipment: "boltgun, bolt pistol, frag grenades, krak grenades",
        abilities: "Death to the False Emperor, Transhuman Physiology, Mark of Chaos"
      });
    }
    if (unitType.value === "Chaos Space Marine Gunner") {
      this.setState({
        ws: 3,
        bs: 3,
        str: 4,
        tough: 4,
        att: 1,
        ld: 7,
        sv: 3,
        pts: 13,
        equipment: "boltgun, bolt pistol, frag grenades, krak grenades",
        abilities: "Death to the False Emperor, Transhuman Physiology, Mark of Chaos"
      });
    }
    if (unitType.value === "Aspiring Champion") {
      this.setState({
        ws: 3,
        bs: 3,
        str: 4,
        tough: 4,
        att: 2,
        ld: 8,
        sv: 3,
        pts: 13,
        equipment: "boltgun, bolt pistol, frag grenades, krak grenades",
        abilities: "Death to the False Emperor, Transhuman Physiology, Mark of Chaos"
      });
    }
    ///////////////////////////////////
    //Death Guard
    ///////////////////////////////////
    if (this.state.race.value === "Death Guard") {
      this.setState({
        wounds: 1
      })
    }
    if (unitType.value === "Plague Marine") {
      this.setState({
        move: 5,
        ws: 3,
        bs: 3,
        str: 4,
        tough: 5,
        att: 1,
        ld: 7,
        sv: 3,
        pts: 14,
        equipment: "boltgun, plague knife, blight grenades, krak grenades",
        abilities: "Death to the False Emperor, Transhuman Physiology, Disgustingly Resilient"
      });
    }
    if (unitType.value === "Plague Marine Gunner") {
      this.setState({
        move: 5,
        ws: 3,
        bs: 3,
        str: 4,
        tough: 5,
        att: 1,
        ld: 7,
        sv: 3,
        pts: 15,
        equipment: "boltgun, plague knife, blight grenades, krak grenades",
        abilities: "Death to the False Emperor, Transhuman Physiology, Disgustingly Resilient"
      });
    }
    if (unitType.value === "Plague Marine Fighter") {
      this.setState({
        move: 5,
        ws: 3,
        bs: 3,
        str: 4,
        tough: 5,
        att: 2,
        ld: 7,
        sv: 3,
        pts: 15,
        equipment: "boltgun, plague knife, blight grenades, krak grenades",
        abilities: "Death to the False Emperor, Transhuman Physiology, Disgustingly Resilient"
      });
    }
    if (unitType.value === "Plague Champion") {
      this.setState({
        move: 5,
        ws: 3,
        bs: 3,
        str: 4,
        tough: 5,
        att: 2,
        ld: 8,
        sv: 3,
        pts: 15,
        equipment: "boltgun, plague knife, blight grenades, krak grenades",
        abilities: "Death to the False Emperor, Transhuman Physiology, Disgustingly Resilient"
      });
    }
    if (unitType.value === "Poxwalker") {
      this.setState({
        move: 4,
        ws: 5,
        bs: 6,
        str: 3,
        tough: 3,
        att: 1,
        ld: 4,
        sv: 7,
        pts: 3,
        equipment: "improvised weapon",
        abilities: "Disgustingly Resilient"
      });
    }
    ///////////////////////////////////
    //Thousand Sons
    ///////////////////////////////////
    if (this.state.race.value === "Thousand Sons") {
      this.setState({
        ws: 3,
        str: 4,
        tough: 4,
        wounds: 1
      })
    }
    if (unitType.value === "Rubric Marine") {
      this.setState({
        move: 5,
        bs: 3,
        att: 1,
        ld: 7,
        sv: 3,
        pts: 16,
        equipment: "inferno boltgun",
        abilities: "Death to the False Emperor, All is Dust, Favoured of Tzeentch"
      });
    }
    if (unitType.value === "Rubric Marine Gunner") {
      this.setState({
        move: 5,
        bs: 3,
        att: 1,
        ld: 7,
        sv: 3,
        pts: 16,
        equipment: "inferno boltgun",
        abilities: "Death to the False Emperor, All is Dust, Favoured of Tzeentch"
      });
    }
    if (unitType.value === "Aspiring Sorcerer") {
      this.setState({
        move: 6,
        bs: 3,
        att: 2,
        ld: 8,
        sv: 3,
        pts: 17,
        equipment: "force stave, inferno bolt pistol",
        abilities: "Death to the False Emperor, All is Dust, Favoured of Tzeentch, Transhuman Physiology"
      });
    }
    if (unitType.value === "Tzaangor") {
      this.setState({
        move: 6,
        bs: 4,
        att: 1,
        ld: 6,
        sv: 6,
        pts: 7,
        equipment: "Tzaangor blades",
        abilities: "Aura of Dark Glory"
      });
    }
    if (unitType.value === "Twistbray") {
      this.setState({
        move: 6,
        bs: 4,
        att: 2,
        ld: 7,
        sv: 6,
        pts: 8,
        equipment: "Tzaangor blades",
        abilities: "Aura of Dark Glory"
      });
    }
    ///////////////////////////////////
    //Asuryani
    ///////////////////////////////////
    if (this.state.race.value === "Asuryani") {
      this.setState({
        move: 7,
        bs: 3,
        str: 3,
        tough: 3,
      })
    }
    if (unitType.value === "Guardian Defender") {
      this.setState({
        ws: 3,
        wounds: 1,
        att: 1,
        ld: 7,
        sv: 5,
        pts: 7,
        equipment: "shuriken catapult, plasma grenades",
        abilities: "Ancient Doom, Battle Focus"
      });
    }
    if (unitType.value === "Heavy Weapon Platform") {
      this.setState({
        ws: 6,
        wounds: 2,
        att: 1,
        ld: 7,
        sv: 3,
        pts: 8,
        equipment: "shuriken cannon",
        abilities: "Crewed Weapon"
      });
    }
    if (unitType.value === "Storm Guardian") {
      this.setState({
        ws: 3,
        wounds: 1,
        att: 1,
        ld: 7,
        sv: 5,
        pts: 6,
        equipment: "shuriken pistol, aeldari blade, plasma grenades",
        abilities: "Ancient Doom, Battle Focus"
      });
    }
    if (unitType.value === "Storm Guardian Gunner") {
      this.setState({
        ws: 3,
        wounds: 1,
        att: 1,
        ld: 7,
        sv: 5,
        pts: 7,
        equipment: "shuriken pistol, aeldari blade, plasma grenades",
        abilities: "Ancient Doom, Battle Focus"
      });
    }
    if (unitType.value === "Ranger") {
      this.setState({
        ws: 3,
        wounds: 1,
        att: 1,
        ld: 7,
        sv: 5,
        pts: 11,
        equipment: "shuriken pistol, ranger long rifle",
        abilities: "Ancient Doom, Battle Focus, Cameleoline Cloak"
      });
    }
    if (unitType.value === "Dire Avenger") {
      this.setState({
        ws: 3,
        wounds: 1,
        att: 1,
        ld: 8,
        sv: 4,
        pts: 10,
        equipment: "avenger shuriken catapult, plasma grenades",
        abilities: "Ancient Doom, Battle Focus, Defence Tactics"
      });
    }
    if (unitType.value === "Dire Avenger Exarch") {
      this.setState({
        ws: 3,
        wounds: 2,
        att: 2,
        ld: 8,
        sv: 4,
        pts: 11,
        equipment: "avenger shuriken catapult, plasma grenades",
        abilities: "Ancient Doom, Battle Focus, Defence Tactics, Battle Fortune"
      });
    }
    ///////////////////////////////////
    //Drukhari
    ///////////////////////////////////
    if (this.state.race.value === "Drukhari") {
      this.setState({
        ws: 3,
        bs: 3,
        str: 3,
        tough: 3,
        wounds: 1
      })
    }
    if (unitType.value === "Kabalite Warrior") {
      this.setState({
        move: 7,
        att: 1,
        ld: 7,
        sv: 5,
        pts: 7,
        equipment: "splinter rifle",
        abilities: "Power from Pain"
      });
    }
    if (unitType.value === "Kabalite Gunner") {
      this.setState({
        move: 7,
        att: 1,
        ld: 7,
        sv: 5,
        pts: 8,
        equipment: "splinter rifle",
        abilities: "Power from Pain"
      });
    }
    if (unitType.value === "Sybarite") {
      this.setState({
        move: 7,
        att: 2,
        ld: 8,
        sv: 5,
        pts: 8,
        equipment: "splinter rifle",
        abilities: "Power from Pain"
      });
    }
    if (unitType.value === "Wych") {
      this.setState({
        move: 8,
        att: 2,
        ld: 7,
        sv: 6,
        pts: 8,
        equipment: "splinter pistol, hekatarii blade, plasma grenades",
        abilities: "Power from Pain, Combat Drugs, Dodge, No Escape"
      });
    }
    if (unitType.value === "Wych Fighter") {
      this.setState({
        move: 8,
        att: 2,
        ld: 7,
        sv: 6,
        pts: 9,
        equipment: "splinter pistol, hekatarii blade, plasma grenades",
        abilities: "Power from Pain, Combat Drugs, Dodge, No Escape"
      });
    }
    if (unitType.value === "Hekatrix") {
      this.setState({
        move: 8,
        att: 3,
        ld: 8,
        sv: 6,
        pts: 9,
        equipment: "splinter pistol, hekatarii blade, plasma grenades",
        abilities: "Power from Pain, Combat Drugs, Dodge, No Escape"
      });
    }
    ///////////////////////////////////
    //Harlequins
    ///////////////////////////////////
    if (this.state.race.value === "Harlequins") {
      this.setState({
        move: 8,
        ws: 3,
        bs: 3,
        str: 3,
        tough: 3,
        wounds: 1,
        att: 4,
        ld: 8,
        sv: 6,
        pts: 12,
        equipment: "splinter pistol, harlequin's blade, plasma grenades",
        abilities: "Flip belt, Holo-Suit, Rising Crescendo"
      })
    }
    ///////////////////////////////////
    //Necrons
    ///////////////////////////////////
    if (this.state.race.value === "Necrons") {
      this.setState({
        move: 5,
        ws: 3,
        str: 4,
        tough: 4,
        wounds: 1,
        ld: 7,
        abilities: "Reanimation Protocols"
      })
    }
    if (unitType.value === "Necron Warrior") {
      this.setState({
        bs: 3,
        att: 1,
        sv: 4,
        pts: 12,
        equipment: "gauss flayer"
      });
    }
    if (unitType.value === "Immortal") {
      this.setState({
        bs: 3,
        att: 1,
        sv: 3,
        pts: 16,
        equipment: "gauss blaster"
      });
    }
    if (unitType.value === "Flayed One") {
      this.setState({
        bs: 6,
        att: 3,
        sv: 4,
        pts: 10,
        equipment: "flayer claws"
      });
    }
    if (unitType.value === "Deathmark") {
      this.setState({
        bs: 3,
        att: 1,
        sv: 3,
        pts: 15,
        equipment: "synaptic disintegrator"
      });
    }
    ///////////////////////////////////
    //Orks
    ///////////////////////////////////
    if (unitType.value === "Ork Boy") {
      this.setState({
        move: 5,
        ws: 3,
        bs: 5,
        str: 4,
        tough: 4,
        wounds: 1,
        att: 2,
        ld: 6,
        sv: 6,
        pts: 6,
        equipment: "slugga, choppa, stikkbombs",
        abilities: "'Ere We Go"
      })
    }
    if (unitType.value === "Ork Boy Gunner") {
      this.setState({
        move: 5,
        ws: 3,
        bs: 5,
        str: 4,
        tough: 4,
        wounds: 1,
        att: 2,
        ld: 6,
        sv: 6,
        pts: 7,
        equipment: "slugga, choppa, stikkbombs",
        abilities: "'Ere We Go"
      })
    }
    if (unitType.value === "Boss Nob") {
      this.setState({
        move: 5,
        ws: 3,
        bs: 5,
        str: 5,
        tough: 4,
        wounds: 2,
        att: 3,
        ld: 7,
        sv: 6,
        pts: 10,
        equipment: "slugga, choppa, stikkbombs",
        abilities: "'Ere We Go"
      })
    }
    if (unitType.value === "Gretchin") {
      this.setState({
        move: 5,
        ws: 5,
        bs: 4,
        str: 2,
        tough: 2,
        wounds: 1,
        att: 1,
        ld: 4,
        sv: 6,
        pts: 3,
        equipment: "grot blasta"
      })
    }
    if (unitType.value === "Kommando") {
      this.setState({
        move: 6,
        ws: 3,
        bs: 5,
        str: 4,
        tough: 4,
        wounds: 1,
        att: 2,
        ld: 6,
        sv: 6,
        pts: 8,
        equipment: "slugga, choppa, stikkbombs",
        abilities: "'Ere We Go, Sneaky Gits"
      })
    }
    if (unitType.value === "Kommando Boss Nob") {
      this.setState({
        move: 6,
        ws: 3,
        bs: 5,
        str: 5,
        tough: 4,
        wounds: 2,
        att: 3,
        ld: 7,
        sv: 6,
        pts: 12,
        equipment: "slugga, choppa, stikkbombs",
        abilities: "'Ere We Go, Sneaky Gits"
      })
    }
    if (unitType.value === "Burna Boy") {
      this.setState({
        move: 5,
        ws: 3,
        bs: 5,
        str: 4,
        tough: 4,
        wounds: 1,
        att: 2,
        ld: 6,
        sv: 6,
        pts: 12,
        equipment: "burna, stikkbombs",
        abilities: "'Ere We Go"
      })
    }
    if (unitType.value === "Burna Spanner") {
      this.setState({
        move: 5,
        ws: 3,
        bs: 5,
        str: 4,
        tough: 4,
        wounds: 1,
        att: 2,
        ld: 6,
        sv: 6,
        pts: 10,
        equipment: "burna, stikkbombs",
        abilities: "'Ere We Go"
      })
    }
    if (unitType.value === "Loota") {
      this.setState({
        move: 5,
        ws: 3,
        bs: 5,
        str: 4,
        tough: 4,
        wounds: 1,
        att: 2,
        ld: 6,
        sv: 6,
        pts: 12,
        equipment: "deffgun, stikkbombs",
        abilities: "'Ere We Go"
      })
    }
    if (unitType.value === "Loota Spanner") {
      this.setState({
        move: 5,
        ws: 3,
        bs: 5,
        str: 4,
        tough: 4,
        wounds: 1,
        att: 2,
        ld: 6,
        sv: 6,
        pts: 10,
        equipment: "deffgun, stikkbombs",
        abilities: "'Ere We Go"
      })
    }
    ///////////////////////////////////
    //Tau Empire
    ///////////////////////////////////
    if (unitType.value === "Shasla") {
      this.setState({
        move: 6,
        ws: 5,
        bs: 4,
        str: 3,
        tough: 3,
        wounds: 1,
        att: 1,
        ld: 6,
        sv: 4,
        pts: 8,
        equipment: "pulse rifle, photon grenades",
        abilities: "For the Greater Good, Bonding Knife Ritual"
      })
    }
    if (unitType.value === "Shasui") {
      this.setState({
        move: 6,
        ws: 5,
        bs: 4,
        str: 3,
        tough: 3,
        wounds: 1,
        att: 2,
        ld: 7,
        sv: 4,
        pts: 8,
        equipment: "pulse rifle, photon grenades",
        abilities: "For the Greater Good, Bonding Knife Ritual"
      })
    }
    if (unitType.value === "DS8 Tactical Support Turret") {
      this.setState({
        move: 0,
        ws: 0,
        bs: 4,
        str: 3,
        tough: 3,
        wounds: 1,
        att: 0,
        ld: 4,
        sv: 4,
        pts: 0,
        equipment: "missile pod",
        abilities: "DS8 Tactical Support Turret, For the Greater Good"
      })
    }
    if (unitType.value === "Pathfinder") {
      this.setState({
        move: 7,
        ws: 5,
        bs: 4,
        str: 3,
        tough: 3,
        wounds: 1,
        att: 1,
        ld: 6,
        sv: 5,
        pts: 6,
        equipment: "pulse carbine, markerlight, photon grenades",
        abilities: "For the Greater Good, Bonding Knife Ritual"
      })
    }
    if (unitType.value === "Pathfinder Gunner") {
      this.setState({
        move: 7,
        ws: 5,
        bs: 4,
        str: 3,
        tough: 3,
        wounds: 1,
        att: 1,
        ld: 6,
        sv: 5,
        pts: 7,
        equipment: "pulse carbine, markerlight, photon grenades",
        abilities: "For the Greater Good, Bonding Knife Ritual"
      })
    }
    if (unitType.value === "Pathfinder Shasui") {
      this.setState({
        move: 7,
        ws: 5,
        bs: 4,
        str: 3,
        tough: 3,
        wounds: 1,
        att: 2,
        ld: 7,
        sv: 5,
        pts: 7,
        equipment: "pulse carbine, markerlight, photon grenades",
        abilities: "For the Greater Good, Bonding Knife Ritual"
      })
    }
    if (unitType.value === "Breacher Shasla") {
      this.setState({
        move: 6,
        ws: 5,
        bs: 4,
        str: 3,
        tough: 3,
        wounds: 1,
        att: 1,
        ld: 6,
        sv: 4,
        pts: 8,
        equipment: "pulse blaster, photon grenades",
        abilities: "For the Greater Good, Bonding Knife Ritual"
      })
    }
    if (unitType.value === "Breacher Shasui") {
      this.setState({
        move: 6,
        ws: 5,
        bs: 4,
        str: 3,
        tough: 3,
        wounds: 1,
        att: 2,
        ld: 7,
        sv: 4,
        pts: 8,
        equipment: "pulse blaster, photon grenades",
        abilities: "For the Greater Good, Bonding Knife Ritual"
      })
    }
    if (unitType.value === "DS8 Tactical Support Turret") {
      this.setState({
        move: 0,
        ws: 0,
        bs: 4,
        str: 3,
        tough: 3,
        wounds: 1,
        att: 0,
        ld: 4,
        sv: 4,
        pts: 0,
        equipment: "missile pod",
        abilities: "DS8 Tactical Support Turret, For the Greater Good"
      })
    }
    if (unitType.value === "Stealth Shasui") {
      this.setState({
        move: 8,
        ws: 5,
        bs: 4,
        str: 4,
        tough: 4,
        wounds: 2,
        att: 2,
        ld: 7,
        sv: 3,
        pts: 20,
        equipment: "burst cannon",
        abilities: "For the Greater Good, Bonding Knife Ritual, Camouflage Fields"
      })
    }
    if (unitType.value === "Stealth Shasvre") {
      this.setState({
        move: 8,
        ws: 5,
        bs: 4,
        str: 4,
        tough: 4,
        wounds: 2,
        att: 3,
        ld: 8,
        sv: 3,
        pts: 20,
        equipment: "burst cannon",
        abilities: "For the Greater Good, Bonding Knife Ritual, Camouflage Fields"
      })
    }
    if (unitType.value === "MV1 Gun Drone") {
      this.setState({
        move: 8,
        ws: 5,
        bs: 5,
        str: 3,
        tough: 4,
        wounds: 1,
        att: 1,
        ld: 6,
        sv: 5,
        pts: 7,
        equipment: "two pulse carbines",
        abilities: "Support Subroutines, For the Greater Good, Saviour Protocols"
      })
    }
    if (unitType.value === "MV4 Shield Drone") {
      this.setState({
        move: 8,
        ws: 5,
        bs: 5,
        str: 3,
        tough: 4,
        wounds: 1,
        att: 1,
        ld: 6,
        sv: 5,
        pts: 7,
        equipment: "shield generator",
        abilities: "Support Subroutines, For the Greater Good, Saviour Protocols, Shield Generator"
      })
    }
    if (unitType.value === "MV7 Marker Drone") {
      this.setState({
        move: 8,
        ws: 5,
        bs: 5,
        str: 3,
        tough: 4,
        wounds: 1,
        att: 1,
        ld: 6,
        sv: 5,
        pts: 7,
        equipment: "markerlight",
        abilities: "Support Subroutines, For the Greater Good, Saviour Protocols"
      })
    }
    if (unitType.value === "MV36 Guardian Drone") {
      this.setState({
        move: 8,
        ws: 5,
        bs: 5,
        str: 3,
        tough: 4,
        wounds: 1,
        att: 1,
        ld: 6,
        sv: 5,
        pts: 7,
        equipment: "none",
        abilities: "Support Subroutines, For the Greater Good, Saviour Protocols, Guardian Fields"
      })
    }
    if (unitType.value === "MV33 Grav-Inhibitor Drone") {
      this.setState({
        move: 8,
        ws: 5,
        bs: 5,
        str: 3,
        tough: 4,
        wounds: 1,
        att: 1,
        ld: 6,
        sv: 5,
        pts: 7,
        equipment: "none",
        abilities: "Support Subroutines, For the Greater Good, Saviour Protocols, Gravity Wave Projector"
      })
    }
    if (unitType.value === "MV31 Pulse Accelerator Drone") {
      this.setState({
        move: 8,
        ws: 5,
        bs: 5,
        str: 3,
        tough: 4,
        wounds: 1,
        att: 1,
        ld: 6,
        sv: 5,
        pts: 7,
        equipment: "none",
        abilities: "Support Subroutines, For the Greater Good, Saviour Protocols, Pulse Accelerator"
      })
    }
    if (unitType.value === "MB3 Recon Drone") {
      this.setState({
        move: 8,
        ws: 5,
        bs: 5,
        str: 3,
        tough: 4,
        wounds: 2,
        att: 1,
        ld: 6,
        sv: 5,
        pts: 7,
        equipment: "burst cannon",
        abilities: "Support Subroutines, For the Greater Good, Saviour Protocols, Recon Suite"
      })
    }
    ///////////////////////////////////
    //Tyranids
    ///////////////////////////////////
    if (unitType.value === "Termagant") {
      this.setState({
        move: 6,
        ws: 4,
        bs: 4,
        str: 3,
        tough: 3,
        wounds: 1,
        att: 1,
        ld: 5,
        sv: 6,
        pts: 4,
        equipment: "fleshborer",
        abilities: "Instinctive Behaviour"
      })
    }
    if (unitType.value === "Hormagaunt") {
      this.setState({
        move: 8,
        ws: 4,
        bs: 4,
        str: 3,
        tough: 3,
        wounds: 1,
        att: 2,
        ld: 5,
        sv: 6,
        pts: 4,
        equipment: "scything talons",
        abilities: "Instinctive Behaviour, Bounding Leap"
      })
    }
    if (unitType.value === "Lictor") {
      this.setState({
        move: 9,
        ws: 2,
        bs: 4,
        str: 6,
        tough: 4,
        wounds: 4,
        att: 3,
        ld: 9,
        sv: 5,
        pts: 25,
        equipment: "flesh hooks, grasping talons, rending claws",
        abilities: "Chameleonic Skin"
      })
    }
    if (unitType.value === "Tyranid Warrior") {
      this.setState({
        move: 6,
        ws: 3,
        bs: 4,
        str: 4,
        tough: 4,
        wounds: 3,
        att: 3,
        ld: 9,
        sv: 4,
        pts: 20,
        equipment: "scything talons, devourer",
        abilities: "Synapse, Shadow in the Warp"
      })
    }
    if (unitType.value === "Tyranid Warrior Gunner") {
      this.setState({
        move: 6,
        ws: 3,
        bs: 4,
        str: 4,
        tough: 4,
        wounds: 3,
        att: 3,
        ld: 9,
        sv: 4,
        pts: 20,
        equipment: "scything talons, devourer",
        abilities: "Synapse, Shadow in the Warp"
      })
    }
    if (unitType.value === "Genestealer") {
      this.setState({
        move: 8,
        ws: 3,
        bs: 4,
        str: 4,
        tough: 4,
        wounds: 1,
        att: 3,
        ld: 9,
        sv: 5,
        pts: 11,
        equipment: "rending claws",
        abilities: "Lightning Reflexes, Swift and Deadly"
      })
    }
    ///////////////////////////////////
    //Genestealer Cults
    ///////////////////////////////////
    if (this.state.race.value === "Genestealer Cults") {
      this.setState({
        move: 6,
        sv: 5
      })
    }
    if (unitType.value === "Acolyte Hybrid") {
      this.setState({
        ws: 3,
        bs: 4,
        str: 4,
        tough: 3,
        wounds: 1,
        att: 2,
        ld: 7,
        pts: 7,
        equipment: "autopistol, cultist knife, rending claw, blasting charges",
        abilities: "Cult Ambush"
      });
    }
    if (unitType.value === "Acolyte Fighter") {
      this.setState({
        ws: 3,
        bs: 4,
        str: 4,
        tough: 3,
        wounds: 1,
        att: 2,
        ld: 7,
        pts: 8,
        equipment: "autopistol, cultist knife, rending claw, blasting charges",
        abilities: "Cult Ambush"
      });
    }
    if (unitType.value === "Acolyte Leader") {
      this.setState({
        ws: 3,
        bs: 4,
        str: 4,
        tough: 3,
        wounds: 1,
        att: 3,
        ld: 8,
        pts: 8,
        equipment: "autopistol, cultist knife, rending claw, blasting charges",
        abilities: "Cult Ambush"
      });
    }
    if (unitType.value === "Aberrant") {
      this.setState({
        ws: 3,
        bs: 6,
        str: 5,
        tough: 4,
        wounds: 2,
        att: 2,
        ld: 7,
        pts: 15,
        equipment: "power pick, rending claw",
        abilities: "Cult Ambush, Bestial Vigour"
      });
    }
    if (unitType.value === "Neophyte Hybrid") {
      this.setState({
        ws: 4,
        bs: 4,
        str: 3,
        tough: 3,
        wounds: 1,
        att: 1,
        ld: 7,
        pts: 5,
        equipment: "autogun, autopistol, blasting charges",
        abilities: "Cult Ambush"
      });
    }
    if (unitType.value === "Neophyte Gunner") {
      this.setState({
        ws: 4,
        bs: 4,
        str: 3,
        tough: 3,
        wounds: 1,
        att: 1,
        ld: 7,
        pts: 6,
        equipment: "autogun, autopistol, blasting charges",
        abilities: "Cult Ambush"
      });
    }
    if (unitType.value === "Neophyte Leader") {
      this.setState({
        ws: 4,
        bs: 4,
        str: 3,
        tough: 3,
        wounds: 1,
        att: 2,
        ld: 8,
        pts: 6,
        equipment: "autogun, autopistol, blasting charges",
        abilities: "Cult Ambush"
      });
    }
    if (unitType.value === "Hybrid Metamorph") {
      this.setState({
        ws: 3,
        bs: 4,
        str: 4,
        tough: 3,
        wounds: 1,
        att: 3,
        ld: 7,
        pts: 8,
        equipment: "autopistol, rending claw, metamorph talon, blasting charges",
        abilities: "Cult Ambush"
      });
    }
    if (unitType.value === "Hybrid Leader") {
      this.setState({
        ws: 3,
        bs: 4,
        str: 4,
        tough: 3,
        wounds: 1,
        att: 4,
        ld: 8,
        pts: 9,
        equipment: "autopistol, rending claw, metamorph talon, blasting charges",
        abilities: "Cult Ambush"
      });
    }
  }

  handleChange3 = (wargearOptions) => {
    this.setState({wargearOptions: wargearOptions})
    if (wargearOptions.value === "none" && this.state.unitType.value === "Tactical Marine Gunner") {
      this.setState({
        wargearPts: 0,
        equipment: "boltgun, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "flamer" && this.state.unitType.value === "Tactical Marine Gunner") {
      this.setState({
        wargearPts: 3,
        equipment: "flamer, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "meltagun" && this.state.unitType.value === "Tactical Marine Gunner") {
      this.setState({
        wargearPts: 3,
        equipment: "meltagun, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "plasma gun" && this.state.unitType.value === "Tactical Marine Gunner") {
      this.setState({
        wargearPts: 3,
        equipment: "plasma gun, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "grav-gun" && this.state.unitType.value === "Tactical Marine Gunner") {
      this.setState({
        wargearPts: 2,
        equipment: "grav-gun, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "missile launcher" && this.state.unitType.value === "Tactical Marine Gunner") {
      this.setState({
        wargearPts: 5,
        equipment: "missile launcher, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "heavy bolter" && this.state.unitType.value === "Tactical Marine Gunner") {
      this.setState({
        wargearPts: 3,
        equipment: "heavy bolter, bolt pistol, frag grenades, krak grenades"
      });
		}
		
		if (wargearOptions.value === "none" && this.state.unitType.value === "Tactical Marine Sergeant") {
      this.setState({
        wargearPts: 0,
        equipment: "boltgun, bolt pistol, frag grenades, krak grenades"
      });
		}
		if (wargearOptions.value === "combi-flamer" && this.state.unitType.value === "Tactical Marine Sergeant") {
      this.setState({
        wargearPts: 3,
        equipment: "combi-flamer, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "combi-grav" && this.state.unitType.value === "Tactical Marine Sergeant") {
      this.setState({
        wargearPts: 2,
        equipment: "combi-grav, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "combi-melta" && this.state.unitType.value === "Tactical Marine Sergeant") {
      this.setState({
        wargearPts: 3,
        equipment: "combi-melta, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "combi-plasma" && this.state.unitType.value === "Tactical Marine Sergeant") {
      this.setState({
        wargearPts: 3,
        equipment: "combi-plasma, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "bolt pistol auspex" && this.state.unitType.value === "Tactical Marine Sergeant") {
      this.setState({
        wargearPts: 1,
        equipment: "auspex, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "bolt pistol chainsword" && this.state.unitType.value === "Tactical Marine Sergeant") {
      this.setState({
        wargearPts: 0,
        equipment: "chainsword, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "bolt pistol power fist" && this.state.unitType.value === "Tactical Marine Sergeant") {
      this.setState({
        wargearPts: 4,
        equipment: "power fist, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "bolt pistol power sword" && this.state.unitType.value === "Tactical Marine Sergeant") {
      this.setState({
        wargearPts: 2,
        equipment: "power sword, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "plasma pistol auspex" && this.state.unitType.value === "Tactical Marine Sergeant") {
      this.setState({
        wargearPts: 2,
        equipment: "auspex, plasma pistol, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "plasma pistol chainsword" && this.state.unitType.value === "Tactical Marine Sergeant") {
      this.setState({
        wargearPts: 1,
        equipment: "chainsword, plasma pistol, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "plasma pistol power fist" && this.state.unitType.value === "Tactical Marine Sergeant") {
      this.setState({
        wargearPts: 5,
        equipment: "power fist, plasma pistol, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "plasma pistol power sword" && this.state.unitType.value === "Tactical Marine Sergeant") {
      this.setState({
        wargearPts: 3,
        equipment: "power sword, plasma pistol, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "grav-pistol auspex" && this.state.unitType.value === "Tactical Marine Sergeant") {
      this.setState({
        wargearPts: 2,
        equipment: "auspex, grav-pistol, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "grav-pistol chainsword" && this.state.unitType.value === "Tactical Marine Sergeant") {
      this.setState({
        wargearPts: 1,
        equipment: "chainsword, grav-pistol, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "grav-pistol power fist" && this.state.unitType.value === "Tactical Marine Sergeant") {
      this.setState({
        wargearPts: 5,
        equipment: "power fist, grav-pistol, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "grav-pistol power sword" && this.state.unitType.value === "Tactical Marine Sergeant") {
      this.setState({
        wargearPts: 3,
        equipment: "power sword, grav-pistol, frag grenades, krak grenades"
      });
		}
		
		if (wargearOptions.value === "none" && this.state.unitType.value === "Scout") {
      this.setState({
        wargearPts: 0,
        equipment: "boltgun, bolt pistol, frag grenades, krak grenades"
      });
		}
		if (wargearOptions.value === "combat knife" && this.state.unitType.value === "Scout") {
      this.setState({
        wargearPts: 0,
        equipment: "combat knife, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "astartes shotgun" && this.state.unitType.value === "Scout") {
      this.setState({
        wargearPts: 0,
        equipment: "astartes shotgun, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "sniper rifle camo cloak" && this.state.unitType.value === "Scout") {
      this.setState({
        wargearPts: 2,
        equipment: "sniper rifle, camo cloak, bolt pistol, frag grenades, krak grenades"
      });
		}
		
		if (wargearOptions.value === "none" && this.state.unitType.value === "Scout Gunner") {
      this.setState({
        wargearPts: 0,
        equipment: "boltgun, bolt pistol, frag grenades, krak grenades"
      });
		}
		if (wargearOptions.value === "heavy bolter" && this.state.unitType.value === "Scout Gunner") {
      this.setState({
        wargearPts: 3,
        equipment: "heavy bolter, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "missile launcher" && this.state.unitType.value === "Scout Gunner") {
      this.setState({
        wargearPts: 5,
        equipment: "missile launcher, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "missile launcher camo cloak" && this.state.unitType.value === "Scout Gunner") {
      this.setState({
        wargearPts: 6,
        equipment: "missile launcher, camo cloak, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "sniper rifle camo cloak" && this.state.unitType.value === "Scout Gunner") {
      this.setState({
        wargearPts: 2,
        equipment: "sniper rifle, camo cloak, bolt pistol, frag grenades, krak grenades"
      });
		}

		if (wargearOptions.value === "none" && this.state.unitType.value === "Scout Sergeant") {
      this.setState({
        wargearPts: 0,
        equipment: "boltgun, bolt pistol, frag grenades, krak grenades"
      });
		}
		if (wargearOptions.value === "astartes shotgun" && this.state.unitType.value === "Scout Sergeant") {
      this.setState({
        wargearPts: 0,
        equipment: "astartes shotgun, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "chainsword" && this.state.unitType.value === "Scout Sergeant") {
      this.setState({
        wargearPts: 0,
        equipment: "chainsword, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "sniper rifle camo cloak" && this.state.unitType.value === "Scout Sergeant") {
      this.setState({
        wargearPts: 2,
        equipment: "sniper rifle, camo cloak, bolt pistol, frag grenades, krak grenades"
      });
		}
		
		if (wargearOptions.value === "none" && this.state.unitType.value === "Intercessor") {
      this.setState({
        wargearPts: 0,
        equipment: "bolt rifle, bolt pistol, frag grenades, krak grenades"
      });
		}
		if (wargearOptions.value === "auto bolt rifle" && this.state.unitType.value === "Intercessor") {
      this.setState({
        wargearPts: 0,
        equipment: "auto bolt rifle, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "stalker bolt rifle" && this.state.unitType.value === "Intercessor") {
      this.setState({
        wargearPts: 0,
        equipment: "stalker bolt rifle, bolt pistol, frag grenades, krak grenades"
      });
		}
		
		if (wargearOptions.value === "none" && this.state.unitType.value === "Intercessor Gunner") {
      this.setState({
        wargearPts: 0,
        equipment: "bolt rifle, bolt pistol, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "auxiliary grenade launcher" && this.state.unitType.value === "Intercessor Gunner") {
      this.setState({
        wargearPts: 0,
        equipment: "auxiliary grenade launcher, bolt rifle, bolt pistol, frag grenades, krak grenades"
      });
		}

		if (wargearOptions.value === "none" && this.state.unitType.value === "Intercessor Sergeant") {
      this.setState({
        wargearPts: 0,
        equipment: "bolt rifle, bolt pistol, frag grenades, krak grenades"
			});
		}
    if (wargearOptions.value === "chainsword" && this.state.unitType.value === "Intercessor Sergeant") {
      this.setState({
        wargearPts: 0,
        equipment: "chainsword, bolt rifle, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "power sword" && this.state.unitType.value === "Intercessor Sergeant") {
      this.setState({
        wargearPts: 2,
        equipment: "power sword, bolt rifle, bolt pistol, frag grenades, krak grenades"
      });
		}

		if (wargearOptions.value === "none" && this.state.unitType.value === "Reiver") {
      this.setState({
        wargearPts: 0,
        equipment: "bolt carbine, heavy bolt pistol, frag grenades, krak grenades, shock grenades"
			});
		}
    if (wargearOptions.value === "combat knife" && this.state.unitType.value === "Reiver") {
      this.setState({
        wargearPts: 0,
        equipment: "combat knife, heavy bolt pistol, frag grenades, krak grenades, shock grenades"
      });
    }

		if (wargearOptions.value === "none" && this.state.unitType.value === "Reiver Sergeant") {
      this.setState({
        wargearPts: 0,
        equipment: "bolt carbine, heavy bolt pistol, frag grenades, krak grenades, shock grenades"
			});
		}
    if (wargearOptions.value === "combat knife" && this.state.unitType.value === "Reiver Sergeant") {
      this.setState({
        wargearPts: 0,
        equipment: "combat knife, heavy bolt pistol, frag grenades, krak grenades, shock grenades"
      });
    }

    if (wargearOptions.value === "combi-melta" && this.state.unitType.value === "Deathwatch Veteran") {
      this.setState({
        wargearPts: 3,
        equipment: "combi-melta, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "combi-plasma" && this.state.unitType.value === "Deathwatch Veteran") {
      this.setState({
        wargearPts: 4,
        equipment: "combi-plasma, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "stalker pattern boltgun" && this.state.unitType.value === "Deathwatch Veteran") {
      this.setState({
        wargearPts: 4,
        equipment: "stalker pattern boltgun, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "power maul" && this.state.unitType.value === "Deathwatch Veteran") {
      this.setState({
        wargearPts: 2,
        equipment: "power maul, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "power sword" && this.state.unitType.value === "Deathwatch Veteran") {
      this.setState({
        wargearPts: 2,
        equipment: "power sword, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "storm shield" && this.state.unitType.value === "Deathwatch Veteran") {
      this.setState({
        wargearPts: 2,
        equipment: "storm shield, frag grenades, krak grenades"
      });
		}
		



    if (wargearOptions.value === "none" && this.state.unitType.value === "Grey Knight") {
      this.setState({
        wargearPts: 0,
        equipment: "nemesis force sword, storm bolter, frag grenades, krak grenades, psyk-out grenades"
      });
    }
    if (wargearOptions.value === "nemesis force halberd" && this.state.unitType.value === "Grey Knight") {
			this.setState({
				wargearPts: 0,
        equipment: "nemesis force halberd, storm bolter, frag grenades, krak grenades, psyk-out grenades"
      });
    }
    if (wargearOptions.value === "nemesis daemon hammer" && this.state.unitType.value === "Grey Knight") {
			this.setState({
				wargearPts: 2,
        equipment: "nemesis daemon hammer, storm bolter, frag grenades, krak grenades, psyk-out grenades"
      });
    }
    if (wargearOptions.value === "nemesis warding stave" && this.state.unitType.value === "Grey Knight") {
			this.setState({
				wargearPts: 0,
        equipment: "nemesis warding stave, storm bolter, frag grenades, krak grenades, psyk-out grenades"
      });
    }
    if (wargearOptions.value === "two nemesis falchions" && this.state.unitType.value === "Grey Knight") {
			this.setState({
				wargearPts: 1,
        equipment: "two nemesis falchions, storm bolter, frag grenades, krak grenades, psyk-out grenades"
      });
		}

		if (wargearOptions.value === "none" && this.state.unitType.value === "Justicar") {
			this.setState({
				wargearPts: 0,
				equipment: "nemesis force sword, storm bolter, frag grenades, krak grenades, psyk-out grenades"
			});
		}
    if (wargearOptions.value === "nemesis force halberd" && this.state.unitType.value === "Justicar") {
      this.setState({
        wargearPts: 0,
        equipment: "nemesis force halberd, storm bolter, frag grenades, krak grenades, psyk-out grenades"
      });
    }
    if (wargearOptions.value === "nemesis daemon hammer" && this.state.unitType.value === "Justicar") {
      this.setState({
        wargearPts: 2,
        equipment: "nemesis daemon hammer, storm bolter, frag grenades, krak grenades, psyk-out grenades"
      });
    }
    if (wargearOptions.value === "nemesis warding stave" && this.state.unitType.value === "Justicar") {
      this.setState({
        wargearPts: 0,
        equipment: "nemesis warding stave, storm bolter, frag grenades, krak grenades, psyk-out grenades"
      });
    }
    if (wargearOptions.value === "two nemesis falchions" && this.state.unitType.value === "Justicar") {
      this.setState({
        wargearPts: 1,
        equipment: "two nemesis falchions, storm bolter, frag grenades, krak grenades, psyk-out grenades"
      });
		}

		if (wargearOptions.value === "none" && this.state.unitType.value === "Grey Knight Gunner") {
      this.setState({
        wargearPts: 0,
        equipment: "nemesis force sword, storm bolter, frag grenades, krak grenades, psyk-out grenades"
      });
    }
		if (wargearOptions.value === "incinerator" && this.state.unitType.value === "Grey Knight Gunner") {
      this.setState({
        wargearPts: 3,
        equipment: "incinerator, frag grenades, krak grenades, psyk-out grenades"
      });
    }
		if (wargearOptions.value === "psilencer" && this.state.unitType.value === "Grey Knight Gunner") {
      this.setState({
        wargearPts: 3,
        equipment: "psilencer, frag grenades, krak grenades, psyk-out grenades"
      });
    }
		if (wargearOptions.value === "psycannon" && this.state.unitType.value === "Grey Knight Gunner") {
      this.setState({
        wargearPts: 2,
        equipment: "psycannon, frag grenades, krak grenades, psyk-out grenades"
      });
		}
		
		if (wargearOptions.value === "none" && this.state.unitType.value === "Guardsman Gunner") {
      this.setState({
        wargearPts: 0,
        equipment: "lasgun, frag grenades"
      });
    }
		if (wargearOptions.value === "flamer" && this.state.unitType.value === "Guardsman Gunner") {
      this.setState({
        wargearPts: 3,
        equipment: "flamer, frag grenades"
      });
    }
		if (wargearOptions.value === "grenade launcher" && this.state.unitType.value === "Guardsman Gunner") {
      this.setState({
        wargearPts: 2,
        equipment: "grenade launcher, frag grenades"
      });
    }
		if (wargearOptions.value === "meltagun" && this.state.unitType.value === "Guardsman Gunner") {
      this.setState({
        wargearPts: 3,
        equipment: "meltagun, frag grenades"
      });
    }
		if (wargearOptions.value === "plasma gun" && this.state.unitType.value === "Guardsman Gunner") {
      this.setState({
        wargearPts: 3,
        equipment: "plasma gun, frag grenades"
      });
    }
		if (wargearOptions.value === "sniper rifle" && this.state.unitType.value === "Guardsman Gunner") {
      this.setState({
        wargearPts: 1,
        equipment: "sniper rifle, frag grenades"
      });
		}
		
		if (wargearOptions.value === "none" && this.state.unitType.value === "Sergeant") {
      this.setState({
        wargearPts: 0,
        equipment: "laspistol, chainsword, frag grenades"
      });
    }
		if (wargearOptions.value === "bolt pistol" && this.state.unitType.value === "Sergeant") {
      this.setState({
        wargearPts: 0,
        equipment: "bolt pistol, chainsword, frag grenades"
      });
    }
		if (wargearOptions.value === "power sword" && this.state.unitType.value === "Sergeant") {
      this.setState({
        wargearPts: 1,
        equipment: "laspistol, power sword, frag grenades"
      });
    }
		if (wargearOptions.value === "plasma pistol" && this.state.unitType.value === "Sergeant") {
      this.setState({
        wargearPts: 1,
        equipment: "plasma pistol, chainsword, frag grenades"
      });
    }
		if (wargearOptions.value === "bolt pistol power sword" && this.state.unitType.value === "Sergeant") {
      this.setState({
        wargearPts: 1,
        equipment: "bolt pistol, power sword, frag grenades"
      });
    }
		if (wargearOptions.value === "plasma pistol power sword" && this.state.unitType.value === "Sergeant") {
      this.setState({
        wargearPts: 2,
        equipment: "plasma pistol, power sword, frag grenades"
      });
		}
		
		if (wargearOptions.value === "none" && this.state.unitType.value === "Special Weapons Gunner") {
      this.setState({
        wargearPts: 0,
        equipment: "lasgun, frag grenades"
      });
    }
		if (wargearOptions.value === "flamer" && this.state.unitType.value === "Special Weapons Gunner") {
      this.setState({
        wargearPts: 3,
        equipment: "flamer, frag grenades"
      });
    }
		if (wargearOptions.value === "grenade launcher" && this.state.unitType.value === "Special Weapons Gunner") {
      this.setState({
        wargearPts: 2,
        equipment: "grenade launcher, frag grenades"
      });
    }
		if (wargearOptions.value === "meltagun" && this.state.unitType.value === "Special Weapons Gunner") {
      this.setState({
        wargearPts: 3,
        equipment: "meltagun, frag grenades"
      });
    }
		if (wargearOptions.value === "plasma gun" && this.state.unitType.value === "Special Weapons Gunner") {
      this.setState({
        wargearPts: 3,
        equipment: "plasma gun, frag grenades"
      });
    }
		if (wargearOptions.value === "sniper rifle" && this.state.unitType.value === "Special Weapons Gunner") {
      this.setState({
        wargearPts: 1,
        equipment: "sniper rifle, frag grenades"
      });
		}

		if (wargearOptions.value === "none" && this.state.unitType.value === "Scion Gunner") {
      this.setState({
        wargearPts: 0,
        equipment: "hot-shot lasgun, frag grenades, krak grenades"
      });
    }
		if (wargearOptions.value === "flamer" && this.state.unitType.value === "Scion Gunner") {
      this.setState({
        wargearPts: 3,
        equipment: "flamer, frag grenades, krak grenades"
      });
    }
		if (wargearOptions.value === "meltagun" && this.state.unitType.value === "Scion Gunner") {
			this.setState({
				wargearPts: 3,
        equipment: "meltagun, frag grenades, krak grenades"
      });
    }
		if (wargearOptions.value === "plasma gun" && this.state.unitType.value === "Scion Gunner") {
			this.setState({
				wargearPts: 3,
        equipment: "plasma gun, frag grenades, krak grenades"
      });
    }
		if (wargearOptions.value === "hot-shot volley gun" && this.state.unitType.value === "Scion Gunner") {
			this.setState({
				wargearPts: 3,
				equipment: "hot-shot volley gun, frag grenades, krak grenades"
			});
		}

		if (wargearOptions.value === "none" && this.state.unitType.value === "Tempestor") {
      this.setState({
        wargearPts: 0,
        equipment: "hot-shot laspistol, chainsword, chainsword, frag grenades, krak grenades"
      });
    }
		if (wargearOptions.value === "bolt pistol" && this.state.unitType.value === "Tempestor") {
      this.setState({
        wargearPts: 0,
        equipment: "bolt pistol, chainsword, frag grenades, krak grenades"
      });
    }
		if (wargearOptions.value === "plasma pistol" && this.state.unitType.value === "Tempestor") {
			this.setState({
				wargearPts: 1,
        equipment: "plasma pistol, chainsword, frag grenades, krak grenades"
      });
    }
		if (wargearOptions.value === "power sword" && this.state.unitType.value === "Tempestor") {
			this.setState({
				wargearPts: 1,
        equipment: "hot-shot laspistol, power sword, frag grenades, krak grenades"
      });
    }
		if (wargearOptions.value === "bolt pistol power sword" && this.state.unitType.value === "Tempestor") {
			this.setState({
				wargearPts: 1,
				equipment: "bolt pistol, power sword, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "plasma pistol power sword" && this.state.unitType.value === "Tempestor") {
			this.setState({
				wargearPts: 2,
				equipment: "plasma pistol, power sword, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "plasma pistol power fist" && this.state.unitType.value === "Tempestor") {
			this.setState({
				wargearPts: 3,
				equipment: "plasma pistol, power fist, frag grenades, krak grenades"
			});
		}
		
		if (wargearOptions.value === "none" && this.state.unitType.value === "Ranger Gunner") {
			this.setState({
				wargearPts: 0,
				equipment: "galvanic rifle"
			});
		}
		if (wargearOptions.value === "arc rifle" && this.state.unitType.value === "Ranger Gunner") {
			this.setState({
				wargearPts: 0,
				equipment: "arc rifle"
			});
		}
		if (wargearOptions.value === "plasma caliver" && this.state.unitType.value === "Ranger Gunner") {
			this.setState({
				wargearPts: 3,
				equipment: "plasma caliver"
			});
		}
		if (wargearOptions.value === "transuranic arquebus" && this.state.unitType.value === "Ranger Gunner") {
			this.setState({
				wargearPts: 5,
				equipment: "transuranic arquebus"
			});
		}
		
		if (wargearOptions.value === "none" && this.state.unitType.value === "Ranger Alpha") {
			this.setState({
				wargearPts: 0,
				equipment: "galvanic rifle"
			});
		}
		if (wargearOptions.value === "arc pistol arc maul" && this.state.unitType.value === "Ranger Alpha") {
			this.setState({
				wargearPts: 0,
				equipment: "arc pistol, arc maul"
			});
		}
		if (wargearOptions.value === "arc pistol power sword" && this.state.unitType.value === "Ranger Alpha") {
			this.setState({
				wargearPts: 0,
				equipment: "arc pistol, power sword"
			});
		}
		if (wargearOptions.value === "arc pistol taser goad" && this.state.unitType.value === "Ranger Alpha") {
			this.setState({
				wargearPts: 1,
				equipment: "arc pistol, taser goad"
			});
		}
		if (wargearOptions.value === "radium pistol arc maul" && this.state.unitType.value === "Ranger Alpha") {
			this.setState({
				wargearPts: 0,
				equipment: "radium pistol, arc maul"
			});
		}
		if (wargearOptions.value === "radium pistol power sword" && this.state.unitType.value === "Ranger Alpha") {
			this.setState({
				wargearPts: 0,
				equipment: "radium pistol, power sword"
			});
		}
		if (wargearOptions.value === "radium pistol taser goad" && this.state.unitType.value === "Ranger Alpha") {
			this.setState({
				wargearPts: 1,
				equipment: "radium pistol, taser goad"
			});
		}
		if (wargearOptions.value === "phosphor blast pistol arc maul" && this.state.unitType.value === "Ranger Alpha") {
			this.setState({
				wargearPts: 0,
				equipment: "phosphor blast pistol, arc maul"
			});
		}
		if (wargearOptions.value === "phosphor blast pistol power sword" && this.state.unitType.value === "Ranger Alpha") {
			this.setState({
				wargearPts: 0,
				equipment: "phosphor blast pistol, power sword"
			});
		}
		if (wargearOptions.value === "phosphor blast pistol taser goad" && this.state.unitType.value === "Ranger Alpha") {
			this.setState({
				wargearPts: 1,
				equipment: "phosphor blast pistol, taser goad"
			});
		}

		if (wargearOptions.value === "none" && this.state.unitType.value === "Vanguard Gunner") {
			this.setState({
				wargearPts: 0,
				equipment: "radium carbine"
			});
		}
		if (wargearOptions.value === "arc rifle" && this.state.unitType.value === "Vanguard Gunner") {
			this.setState({
				wargearPts: 0,
				equipment: "arc rifle"
			});
		}
		if (wargearOptions.value === "plasma caliver" && this.state.unitType.value === "Vanguard Gunner") {
			this.setState({
				wargearPts: 3,
				equipment: "plasma caliver"
			});
		}
		if (wargearOptions.value === "transuranic arquebus" && this.state.unitType.value === "Vanguard Gunner") {
			this.setState({
				wargearPts: 5,
				equipment: "transuranic arquebus"
			});
		}
		
		if (wargearOptions.value === "none" && this.state.unitType.value === "Vanguard Alpha") {
			this.setState({
				wargearPts: 0,
				equipment: "radium carbine"
			});
		}
		if (wargearOptions.value === "arc pistol arc maul" && this.state.unitType.value === "Vanguard Alpha") {
			this.setState({
				wargearPts: 0,
				equipment: "arc pistol, arc maul"
			});
		}
		if (wargearOptions.value === "arc pistol power sword" && this.state.unitType.value === "Vanguard Alpha") {
			this.setState({
				wargearPts: 0,
				equipment: "arc pistol, power sword"
			});
		}
		if (wargearOptions.value === "arc pistol taser goad" && this.state.unitType.value === "Vanguard Alpha") {
			this.setState({
				wargearPts: 1,
				equipment: "arc pistol, taser goad"
			});
		}
		if (wargearOptions.value === "radium pistol arc maul" && this.state.unitType.value === "Vanguard Alpha") {
			this.setState({
				wargearPts: 0,
				equipment: "radium pistol, arc maul"
			});
		}
		if (wargearOptions.value === "radium pistol power sword" && this.state.unitType.value === "Vanguard Alpha") {
			this.setState({
				wargearPts: 0,
				equipment: "radium pistol, power sword"
			});
		}
		if (wargearOptions.value === "radium pistol taser goad" && this.state.unitType.value === "Vanguard Alpha") {
			this.setState({
				wargearPts: 1,
				equipment: "radium pistol, taser goad"
			});
		}
		if (wargearOptions.value === "phosphor blast pistol arc maul" && this.state.unitType.value === "Vanguard Alpha") {
			this.setState({
				wargearPts: 0,
				equipment: "phosphor blast pistol, arc maul"
			});
		}
		if (wargearOptions.value === "phosphor blast pistol power sword" && this.state.unitType.value === "Vanguard Alpha") {
			this.setState({
				wargearPts: 0,
				equipment: "phosphor blast pistol, power sword"
			});
		}
		if (wargearOptions.value === "phosphor blast pistol taser goad" && this.state.unitType.value === "Vanguard Alpha") {
			this.setState({
				wargearPts: 1,
				equipment: "phosphor blast pistol, taser goad"
			});
		}
		
		if (wargearOptions.value === "none" && this.state.unitType.value === "Sicarian Ruststalker") {
			this.setState({
				wargearPts: 0,
				equipment: "transonic razor, chordclaw"
			});
		}
		if (wargearOptions.value === "transonic blades" && this.state.unitType.value === "Sicarian Ruststalker") {
			this.setState({
				wargearPts: 0,
				equipment: "transonic blades"
			});
		}
		
		if (wargearOptions.value === "none" && this.state.unitType.value === "Ruststalker Princeps") {
			this.setState({
				wargearPts: 0,
				equipment: "transonic razor, chordclaw"
			});
		}
		if (wargearOptions.value === "transonic blades" && this.state.unitType.value === "Ruststalker Princeps") {
			this.setState({
				wargearPts: 0,
				equipment: "transonic blades, chordclaw"
			});
		}
		
		if (wargearOptions.value === "none" && this.state.unitType.value === "Sicarian Infiltrator") {
			this.setState({
				wargearPts: 0,
				equipment: "stub carbine, power sword"
			});
		}
		if (wargearOptions.value === "flechette blaster taser goad" && this.state.unitType.value === "Sicarian Infiltrator") {
			this.setState({
				wargearPts: 1,
				equipment: "flechette blaster, taser goad"
			});
		}
		
		if (wargearOptions.value === "none" && this.state.unitType.value === "Infiltrator Princeps") {
			this.setState({
				wargearPts: 0,
				equipment: "stub carbine, power sword"
			});
		}
		if (wargearOptions.value === "flechette blaster taser goad" && this.state.unitType.value === "Infiltrator Princeps") {
			this.setState({
				wargearPts: 1,
				equipment: "flechette blaster, taser goad"
			});
		}
		
		if (wargearOptions.value === "none" && this.state.unitType.value === "Chaos Cultist") {
			this.setState({
				wargearPts: 0,
				equipment: "autogun"
			});
		}
		if (wargearOptions.value === "brutal assault weapon autopistol" && this.state.unitType.value === "Chaos Cultist") {
			this.setState({
				wargearPts: 0,
				equipment: "brutal assault weapon, autopistol"
			});
		}
		
		if (wargearOptions.value === "none" && this.state.unitType.value === "Chaos Cultist Gunner") {
			this.setState({
				wargearPts: 0,
				equipment: "autogun"
			});
		}
		if (wargearOptions.value === "flamer" && this.state.unitType.value === "Chaos Cultist Gunner") {
			this.setState({
				wargearPts: 3,
				equipment: "flamer"
			});
		}
		if (wargearOptions.value === "heavy stubber" && this.state.unitType.value === "Chaos Cultist Gunner") {
			this.setState({
				wargearPts: 0,
				equipment: "heavy stubber"
			});
		}
		
		
		if (wargearOptions.value === "none" && this.state.unitType.value === "Cultist Champion") {
			this.setState({
				wargearPts: 0,
				equipment: "autogun"
			});
		}
		if (wargearOptions.value === "shotgun" && this.state.unitType.value === "Cultist Champion") {
			this.setState({
				wargearPts: 0,
				equipment: "shotgun"
			});
		}
		if (wargearOptions.value === "brutal assault weapon autopistol" && this.state.unitType.value === "Cultist Champion") {
			this.setState({
				wargearPts: 0,
				equipment: "brutal assault weapon, autopistol"
			});
		}
		
		if (wargearOptions.value === "none" && this.state.unitType.value === "Chaos Space Marine") {
			this.setState({
				wargearPts: 0,
				equipment: "boltgun, bolt pistol, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "chainsword" && this.state.unitType.value === "Chaos Space Marine") {
			this.setState({
				wargearPts: 0,
				equipment: "chainsword, bolt pistol, frag grenades, krak grenades"
			});
		}
		
		if (wargearOptions.value === "none" && this.state.unitType.value === "Chaos Space Marine Gunner") {
			this.setState({
				wargearPts: 0,
				equipment: "boltgun, bolt pistol, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "flamer" && this.state.unitType.value === "Chaos Space Marine Gunner") {
			this.setState({
				wargearPts: 3,
				equipment: "flamer, bolt pistol, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "meltagun" && this.state.unitType.value === "Chaos Space Marine Gunner") {
			this.setState({
				wargearPts: 3,
				equipment: "meltagun, bolt pistol, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "plasma gun" && this.state.unitType.value === "Chaos Space Marine Gunner") {
			this.setState({
				wargearPts: 3,
				equipment: "plasma gun, bolt pistol, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "heavy bolter" && this.state.unitType.value === "Chaos Space Marine Gunner") {
			this.setState({
				wargearPts: 3,
				equipment: "heavy bolter, bolt pistol, frag grenades, krak grenades"
			});
		}		

		if (wargearOptions.value === "none" && this.state.unitType.value === "Aspiring Champion") {
			this.setState({
				wargearPts: 0,
				equipment: "boltgun, bolt pistol, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "bolt pistol chainsword" && this.state.unitType.value === "Aspiring Champion") {
			this.setState({
				wargearPts: 0,
				equipment: "chainsword, bolt pistol, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "bolt pistol power fist" && this.state.unitType.value === "Aspiring Champion") {
			this.setState({
				wargearPts: 4,
				equipment: "power fist, bolt pistol, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "bolt pistol power sword" && this.state.unitType.value === "Aspiring Champion") {
			this.setState({
				wargearPts: 2,
				equipment: "power sword, bolt pistol, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "plasma pistol chainsword" && this.state.unitType.value === "Aspiring Champion") {
			this.setState({
				wargearPts: 1,
				equipment: "chainsword, plasma pistol, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "plasma pistol power fist" && this.state.unitType.value === "Aspiring Champion") {
			this.setState({
				wargearPts: 5,
				equipment: "power fist, plasma pistol, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "plasma pistol power sword" && this.state.unitType.value === "Aspiring Champion") {
			this.setState({
				wargearPts: 3,
				equipment: "power sword, plasma pistol, frag grenades, krak grenades"
			});
		}
				
		if (wargearOptions.value === "none" && this.state.unitType.value === "Plague Marine Gunner") {
			this.setState({
				wargearPts: 0,
				equipment: "boltgun, plague knife, blight grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "blight launcher" && this.state.unitType.value === "Plague Marine Gunner") {
			this.setState({
				wargearPts: 3,
				equipment: "blight launcher, plague knife, blight grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "meltagun" && this.state.unitType.value === "Plague Marine Gunner") {
			this.setState({
				wargearPts: 3,
				equipment: "meltagun, plague knife, blight grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "plasma gun" && this.state.unitType.value === "Plague Marine Gunner") {
			this.setState({
				wargearPts: 3,
				equipment: "plasma gun, plague knife, blight grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "plague belcher" && this.state.unitType.value === "Plague Marine Gunner") {
			this.setState({
				wargearPts: 3,
				equipment: "plague belcher, plague knife, blight grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "plague spewer" && this.state.unitType.value === "Plague Marine Gunner") {
			this.setState({
				wargearPts: 4,
				equipment: "plague spewer, plague knife, blight grenades, krak grenades"
			});
		}		
				
		if (wargearOptions.value === "none" && this.state.unitType.value === "Plague Marine Fighter") {
			this.setState({
				wargearPts: 0,
				equipment: "boltgun, plague knife, blight grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "bubotic axe" && this.state.unitType.value === "Plague Marine Fighter") {
			this.setState({
				wargearPts: 2,
				equipment: "bubotic axe, plague knife, blight grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "great plague cleaver" && this.state.unitType.value === "Plague Marine Fighter") {
			this.setState({
				wargearPts: 4,
				equipment: "great plague cleaver, plague knife, blight grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "flail of corruption" && this.state.unitType.value === "Plague Marine Fighter") {
			this.setState({
				wargearPts: 4,
				equipment: "flail of corruption, plague knife, blight grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "second plague knife" && this.state.unitType.value === "Plague Marine Fighter") {
			this.setState({
				wargearPts: 0,
				equipment: "plague knife, plague knife, blight grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "mace of corruption bubotic axe" && this.state.unitType.value === "Plague Marine Fighter") {
			this.setState({
				wargearPts: 5,
				equipment: "mace of corruption, bubotic axe, plague knife, blight grenades, krak grenades"
			});
		}		
				
		if (wargearOptions.value === "none" && this.state.unitType.value === "Plague Champion") {
			this.setState({
				wargearPts: 0,
				equipment: "boltgun, plague knife, blight grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "plaguesword" && this.state.unitType.value === "Plague Champion") {
			this.setState({
				wargearPts: 0,
				equipment: "plaguesword, boltgun, blight grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "bolt pistol" && this.state.unitType.value === "Plague Champion") {
			this.setState({
				wargearPts: 0,
				equipment: "bolt pistol, plague knife, blight grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "plasma pistol" && this.state.unitType.value === "Plague Champion") {
			this.setState({
				wargearPts: 1,
				equipment: "plasma pistol, plague knife, blight grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "plasma gun" && this.state.unitType.value === "Plague Champion") {
			this.setState({
				wargearPts: 3,
				equipment: "plasma gun, plague knife, blight grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "power fist" && this.state.unitType.value === "Plague Champion") {
			this.setState({
				wargearPts: 4,
				equipment: "boltgun, power fist, blight grenades, krak grenades"
			});
		}		
		if (wargearOptions.value === "plaguesword bolt pistol" && this.state.unitType.value === "Plague Champion") {
			this.setState({
				wargearPts: 0,
				equipment: "plaguesword, bolt pistol, blight grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "plaguesword plasma pistol" && this.state.unitType.value === "Plague Champion") {
			this.setState({
				wargearPts: 1,
				equipment: "plaguesword, plasma pistol, blight grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "plaguesword plasma gun" && this.state.unitType.value === "Plague Champion") {
			this.setState({
				wargearPts: 3,
				equipment: "plaguesword, plasma gun, blight grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "power fist bolt pistol" && this.state.unitType.value === "Plague Champion") {
			this.setState({
				wargearPts: 4,
				equipment: "power fist, bolt pistol, blight grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "power fist plasma pistol" && this.state.unitType.value === "Plague Champion") {
			this.setState({
				wargearPts: 5,
				equipment: "power fist, plasma pistol, blight grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "power fist plasma gun" && this.state.unitType.value === "Plague Champion") {
			this.setState({
				wargearPts: 7,
				equipment: "power fist, plasma gun, blight grenades, krak grenades"
			});
		}
		
		if (wargearOptions.value === "none" && this.state.unitType.value === "Rubric Marine") {
			this.setState({
				wargearPts: 0,
				equipment: "inferno boltgun"
			});
		}
		if (wargearOptions.value === "warpflamer" && this.state.unitType.value === "Rubric Marine") {
			this.setState({
				wargearPts: 4,
				equipment: "warpflamer"
			});
		}
		
		if (wargearOptions.value === "none" && this.state.unitType.value === "Rubric Marine Gunner") {
			this.setState({
				wargearPts: 0,
				equipment: "inferno boltgun"
			});
		}
		if (wargearOptions.value === "soulreaper cannon" && this.state.unitType.value === "Rubric Marine Gunner") {
			this.setState({
				wargearPts: 4,
				equipment: "soulreaper cannon"
			});
		}
		
		if (wargearOptions.value === "none" && this.state.unitType.value === "Aspiring Sorcerer") {
			this.setState({
				wargearPts: 0,
				equipment: "force stave, inferno bolt pistol"
			});
		}
		if (wargearOptions.value === "warpflame pistol" && this.state.unitType.value === "Aspiring Sorcerer") {
			this.setState({
				wargearPts: 1,
				equipment: "force stave, warpflame pistol"
			});
		}
		
		if (wargearOptions.value === "none" && this.state.unitType.value === "Tzaangor") {
			this.setState({
				wargearPts: 0,
				equipment: "tzaangor blades"
			});
		}
		if (wargearOptions.value === "autopistol chainsword" && this.state.unitType.value === "Tzaangor") {
			this.setState({
				wargearPts: 0,
				equipment: "autopistol, chainsword"
			});
		}
		
		if (wargearOptions.value === "none" && this.state.unitType.value === "Heavy Weapon Platform") {
			this.setState({
				wargearPts: 0,
				equipment: "shuriken cannon"
			});
		}
		if (wargearOptions.value === "aeldari missile launcher" && this.state.unitType.value === "Heavy Weapon Platform") {
			this.setState({
				wargearPts: 5,
				equipment: "aeldari missile launcher"
			});
		}
		if (wargearOptions.value === "bright lance" && this.state.unitType.value === "Heavy Weapon Platform") {
			this.setState({
				wargearPts: 4,
				equipment: "bright lance"
			});
		}
		if (wargearOptions.value === "scatter laser" && this.state.unitType.value === "Heavy Weapon Platform") {
			this.setState({
				wargearPts: 2,
				equipment: "scatter laser"
			});
		}
		if (wargearOptions.value === "starcannon" && this.state.unitType.value === "Heavy Weapon Platform") {
			this.setState({
				wargearPts: 3,
				equipment: "starcannon"
			});
		}
				
		if (wargearOptions.value === "none" && this.state.unitType.value === "Storm Guardian") {
			this.setState({
				wargearPts: 0,
				equipment: "shuriken pistol, aeldari blade, plasma grenades"
			});
		}
		if (wargearOptions.value === "chainsword" && this.state.unitType.value === "Storm Guardian") {
			this.setState({
				wargearPts: 0,
				equipment: "shuriken pistol, chainsword, plasma grenades"
			});
		}
				
		if (wargearOptions.value === "none" && this.state.unitType.value === "Storm Guardian Gunner") {
			this.setState({
				wargearPts: 0,
				equipment: "shuriken pistol, aeldari blade, plasma grenades"
			});
		}
		if (wargearOptions.value === "flamer" && this.state.unitType.value === "Storm Guardian Gunner") {
			this.setState({
				wargearPts: 3,
				equipment: "flamer, plasma grenades"
			});
		}
		if (wargearOptions.value === "fusion gun" && this.state.unitType.value === "Storm Guardian Gunner") {
			this.setState({
				wargearPts: 3,
				equipment: "fusion gun, plasma grenades"
			});
		}

		if (wargearOptions.value === "none" && this.state.unitType.value === "Dire Avenger Exarch") {
			this.setState({
				wargearPts: 0,
        equipment: "avenger shuriken catapult, plasma grenades"
			});
		}
		if (wargearOptions.value === "shuriken pistol power glaive" && this.state.unitType.value === "Dire Avenger Exarch") {
			this.setState({
				wargearPts: 1,
        equipment: "shuriken pistol, power glaive, plasma grenades"
			});
		}
		if (wargearOptions.value === "shuriken pistol diresword" && this.state.unitType.value === "Dire Avenger Exarch") {
			this.setState({
				wargearPts: 2,
        equipment: "shuriken pistol, diresword, plasma grenades"
			});
		}
		if (wargearOptions.value === "shimmershield power glaive" && this.state.unitType.value === "Dire Avenger Exarch") {
			this.setState({
				wargearPts: 2,
        equipment: "shimmershield, power glaive, plasma grenades"
			});
		}

		if (wargearOptions.value === "none" && this.state.unitType.value === "Kabalite Gunner") {
			this.setState({
				wargearPts: 0,
        equipment: "splinter rifle"
			});
		}
		if (wargearOptions.value === "splinter cannon" && this.state.unitType.value === "Kabalite Gunner") {
			this.setState({
				wargearPts: 0,
        equipment: "splinter cannon"
			});
		}
		if (wargearOptions.value === "dark lance" && this.state.unitType.value === "Kabalite Gunner") {
			this.setState({
				wargearPts: 4,
        equipment: "dark lance"
			});
		}
		if (wargearOptions.value === "shredder" && this.state.unitType.value === "Kabalite Gunner") {
			this.setState({
				wargearPts: 1,
        equipment: "shredder"
			});
		}
		if (wargearOptions.value === "blaster" && this.state.unitType.value === "Kabalite Gunner") {
			this.setState({
				wargearPts: 3,
        equipment: "blaster"
			});
		}

		if (wargearOptions.value === "none" && this.state.unitType.value === "Sybarite") {
			this.setState({
				wargearPts: 0,
        equipment: "splinter rifle"
			});
		}
		if (wargearOptions.value === "power sword" && this.state.unitType.value === "Sybarite") {
			this.setState({
				wargearPts: 2,
        equipment: "splinter rifle, power sword"
			});
		}
		if (wargearOptions.value === "agonizer" && this.state.unitType.value === "Sybarite") {
			this.setState({
				wargearPts: 2,
        equipment: "splinter rifle, agonizer"
			});
		}
		if (wargearOptions.value === "phantasm grenade launcher" && this.state.unitType.value === "Sybarite") {
			this.setState({
				wargearPts: 1,
        equipment: "splinter rifle, phantasm grenade launcher"
			});
		}
		if (wargearOptions.value === "splinter pistol" && this.state.unitType.value === "Sybarite") {
			this.setState({
				wargearPts: 0,
        equipment: "splinter pistol"
			});
		}
		if (wargearOptions.value === "blast pistol" && this.state.unitType.value === "Sybarite") {
			this.setState({
				wargearPts: 2,
        equipment: "blast pistol"
			});
		}
		if (wargearOptions.value === "power sword phantasm grenade launcher" && this.state.unitType.value === "Sybarite") {
			this.setState({
				wargearPts: 3,
        equipment: "power sword, phantasm grenade launcher"
			});
		}
		if (wargearOptions.value === "agonizer phantasm grenade launcher" && this.state.unitType.value === "Sybarite") {
			this.setState({
				wargearPts: 3,
        equipment: "agonizer, phantasm grenade launcher"
			});
		}
		if (wargearOptions.value === "power sword blast pistol" && this.state.unitType.value === "Sybarite") {
			this.setState({
				wargearPts: 4,
        equipment: "power sword, blast pistol"
			});
		}
		if (wargearOptions.value === "agonizer blast pistol" && this.state.unitType.value === "Sybarite") {
			this.setState({
				wargearPts: 4,
        equipment: "agonizer, blast pistol"
			});
		}
		if (wargearOptions.value === "power sword splinter pistol" && this.state.unitType.value === "Sybarite") {
			this.setState({
				wargearPts: 2,
        equipment: "power sword, splinter pistol"
			});
		}
		if (wargearOptions.value === "agonizer splinter pistol" && this.state.unitType.value === "Sybarite") {
			this.setState({
				wargearPts: 2,
        equipment: "agonizer, splinter pistol"
			});
		}
		if (wargearOptions.value === "power sword splinter pistol phantasm grenade launcher" && this.state.unitType.value === "Sybarite") {
			this.setState({
				wargearPts: 3,
        equipment: "power sword, splinter pistol, phantasm grenade launcher"
			});
		}
		if (wargearOptions.value === "agonizer splinter pistol phantasm grenade launcher" && this.state.unitType.value === "Sybarite") {
			this.setState({
				wargearPts: 3,
        equipment: "agonizer, splinter pistol, phantasm grenade launcher"
			});
		}
		if (wargearOptions.value === "power sword blast pistol phantasm grenade launcher" && this.state.unitType.value === "Sybarite") {
			this.setState({
				wargearPts: 5,
        equipment: "power sword, blast pistol, phantasm grenade launcher"
			});
		}
		if (wargearOptions.value === "agonizer blast pistol phantasm grenade launcher" && this.state.unitType.value === "Sybarite") {
			this.setState({
				wargearPts: 5,
        equipment: "agonizer, blast pistol, phantasm grenade launcher"
			});
		}

    if (wargearOptions.value === "none" && this.state.unitType.value === "Wych Fighter") {
			this.setState({
				wargearPts: 0,
        equipment: "splinter pistol, hekatarii blade, plasma grenades"
			});
		}
		if (wargearOptions.value === "hydra gauntlets" && this.state.unitType.value === "Wych Fighter") {
			this.setState({
				wargearPts: 2,
        equipment: "hydra gauntlets, plasma grenades"
			});
		}
		if (wargearOptions.value === "razorflails" && this.state.unitType.value === "Wych Fighter") {
			this.setState({
				wargearPts: 2,
        equipment: "razorflails, plasma grenades"
			});
		}
		if (wargearOptions.value === "shardnet and impaler" && this.state.unitType.value === "Wych Fighter") {
			this.setState({
				wargearPts: 2,
        equipment: "shardnet and impaler, plasma grenades"
			});
		}

    if (wargearOptions.value === "none" && this.state.unitType.value === "Hekatrix") {
			this.setState({
				wargearPts: 0,
        equipment: "splinter pistol, hekatarii blade, plasma grenades"
			});
		}
		if (wargearOptions.value === "power sword" && this.state.unitType.value === "Hekatrix") {
			this.setState({
				wargearPts: 2,
        equipment: "splinter pistol, power sword, plasma grenades"
			});
		}
		if (wargearOptions.value === "agonizer" && this.state.unitType.value === "Hekatrix") {
			this.setState({
				wargearPts: 2,
        equipment: "splinter pistol, agonizer, plasma grenades"
			});
		}
		if (wargearOptions.value === "blast pistol" && this.state.unitType.value === "Hekatrix") {
			this.setState({
				wargearPts: 2,
        equipment: "blast pistol, hekatarii blade, plasma grenades"
			});
		}
		if (wargearOptions.value === "power sword blast pistol" && this.state.unitType.value === "Hekatrix") {
			this.setState({
				wargearPts: 4,
        equipment: "blast pistol, power sword, plasma grenades"
			});
		}
		if (wargearOptions.value === "agonizer blast pistol" && this.state.unitType.value === "Hekatrix") {
			this.setState({
				wargearPts: 4,
        equipment: "blast pistol, agonizer, plasma grenades"
			});
		}
		if (wargearOptions.value === "phantasm grenade launcher" && this.state.unitType.value === "Hekatrix") {
			this.setState({
				wargearPts: 1,
        equipment: "phantasm grenade launcher, splinter pistol, hekatarii blade, plasma grenades"
			});
		}
		if (wargearOptions.value === "power sword phantasm grenade launcher" && this.state.unitType.value === "Hekatrix") {
			this.setState({
				wargearPts: 3,
        equipment: "phantasm grenade launcher, splinter pistol, power sword, plasma grenades"
			});
		}
		if (wargearOptions.value === "agonizer phantasm grenade launcher" && this.state.unitType.value === "Hekatrix") {
			this.setState({
				wargearPts: 3,
        equipment: "phantasm grenade launcher, splinter pistol, agonizer, plasma grenades"
			});
		}
		if (wargearOptions.value === "power sword blast pistol phantasm grenade launcher" && this.state.unitType.value === "Hekatrix") {
			this.setState({
				wargearPts: 5,
        equipment: "phantasm grenade launcher, splinter pistol, power sword, blast pistol, plasma grenades"
			});
		}
		if (wargearOptions.value === "agonizer blast pistol phantasm grenade launcher" && this.state.unitType.value === "Hekatrix") {
			this.setState({
				wargearPts: 5,
        equipment: "phantasm grenade launcher, splinter pistol, agonizer, blast pistol, plasma grenades"
			});
		}

    if (wargearOptions.value === "none" && this.state.unitType.value === "Player") {
			this.setState({
				wargearPts: 0,
        equipment: "shuriken pistol, harlequin's blade, plasma grenades"
			});
		}
		if (wargearOptions.value === "neuro disruptor" && this.state.unitType.value === "Player") {
			this.setState({
				wargearPts: 2,
        equipment: "neuro disruptor, harlequin's blade, plasma grenades"
			});
		}
		if (wargearOptions.value === "fusion pistol" && this.state.unitType.value === "Player") {
			this.setState({
				wargearPts: 3,
        equipment: "fusion pistol, harlequin's blade, plasma grenades"
			});
		}
		if (wargearOptions.value === "harlequin's caress" && this.state.unitType.value === "Player") {
			this.setState({
				wargearPts: 3,
        equipment: "shuriken pistol, harlequin's caress, plasma grenades"
			});
		}
		if (wargearOptions.value === "harlequin's embrace" && this.state.unitType.value === "Player") {
			this.setState({
				wargearPts: 2,
        equipment: "shuriken pistol, harlequin's embrace, plasma grenades"
			});
		}
		if (wargearOptions.value === "harlequin's kiss" && this.state.unitType.value === "Player") {
			this.setState({
				wargearPts: 4,
        equipment: "shuriken pistol, harlequin's kiss, plasma grenades"
			});
		}
		if (wargearOptions.value === "neuro disruptor harlequin's caress" && this.state.unitType.value === "Player") {
			this.setState({
				wargearPts: 5,
        equipment: "neuro disruptor, harlequin's caress, plasma grenades"
			});
		}
		if (wargearOptions.value === "neuro disruptor harlequin's embrace" && this.state.unitType.value === "Player") {
			this.setState({
				wargearPts: 4,
        equipment: "neuro disruptor, harlequin's embrace, plasma grenades"
			});
		}
		if (wargearOptions.value === "neuro disruptor harlequin's kiss" && this.state.unitType.value === "Player") {
			this.setState({
				wargearPts: 6,
        equipment: "neuro disruptor, harlequin's kiss, plasma grenades"
			});
		}
		if (wargearOptions.value === "fusion pistol harlequin's caress" && this.state.unitType.value === "Player") {
			this.setState({
				wargearPts: 6,
        equipment: "fusion pistol, harlequin's caress, plasma grenades"
			});
		}
		if (wargearOptions.value === "fusion pistol harlequin's embrace" && this.state.unitType.value === "Player") {
			this.setState({
				wargearPts: 5,
        equipment: "fusion pistol, harlequin's embrace, plasma grenades"
			});
		}
		if (wargearOptions.value === "fusion pistol harlequin's kiss" && this.state.unitType.value === "Player") {
			this.setState({
				wargearPts: 7,
        equipment: "fusion pistol, harlequin's kiss, plasma grenades"
			});
		}

		if (wargearOptions.value === "none" && this.state.unitType.value === "Immortal") {
			this.setState({
				wargearPts: 0,
        equipment: "gauss blaster"
			});
		}
		if (wargearOptions.value === "tesla carbine" && this.state.unitType.value === "Immortal") {
			this.setState({
				wargearPts: 0,
        equipment: "tesla carbine"
			});
		}

		if (wargearOptions.value === "none" && this.state.unitType.value === "Ork Boy") {
			this.setState({
				wargearPts: 0,
        equipment: "slugga, choppa, stikkbombs"
			});
		}
		if (wargearOptions.value === "shoota" && this.state.unitType.value === "Ork Boy") {
			this.setState({
				wargearPts: 0,
        equipment: "shoota, stikkbombs"
			});
		}

		if (wargearOptions.value === "none" && this.state.unitType.value === "Ork Boy Gunner") {
			this.setState({
				wargearPts: 0,
        equipment: "slugga, choppa, stikkbombs"
			});
		}
		if (wargearOptions.value === "big shoota" && this.state.unitType.value === "Ork Boy Gunner") {
			this.setState({
				wargearPts: 0,
        equipment: "big shoota, stikkbombs"
			});
		}
		if (wargearOptions.value === "rokkit launcha" && this.state.unitType.value === "Ork Boy Gunner") {
			this.setState({
				wargearPts: 3,
        equipment: "rokkit launcha, stikkbombs"
			});
		}

		if (wargearOptions.value === "none" && this.state.unitType.value === "Boss Nob") {
			this.setState({
				wargearPts: 0,
        equipment: "slugga, choppa, stikkbombs"
			});
		}
		if (wargearOptions.value === "big choppa" && this.state.unitType.value === "Boss Nob") {
			this.setState({
				wargearPts: 2,
        equipment: "slugga, big choppa, stikkbombs"
			});
		}
		if (wargearOptions.value === "power klaw" && this.state.unitType.value === "Boss Nob") {
			this.setState({
				wargearPts: 4,
        equipment: "slugga, power klaw, stikkbombs"
			});
		}
		if (wargearOptions.value === "kombi-weapon with rokkit launcha" && this.state.unitType.value === "Boss Nob") {
			this.setState({
				wargearPts: 3,
        equipment: "kombi-weapon with rokkit launcha, choppa, stikkbombs"
			});
		}
		if (wargearOptions.value === "big choppa kombi-weapon with rokkit launcha" && this.state.unitType.value === "Boss Nob") {
			this.setState({
				wargearPts: 5,
        equipment: "kombi-weapon with rokkit launcha, big choppa, stikkbombs"
			});
		}
		if (wargearOptions.value === "power klaw kombi-weapon with rokkit launcha" && this.state.unitType.value === "Boss Nob") {
			this.setState({
				wargearPts: 7,
        equipment: "kombi-weapon with rokkit launcha, power klaw, stikkbombs"
			});
		}
		if (wargearOptions.value === "kombi-weapon with skorcha" && this.state.unitType.value === "Boss Nob") {
			this.setState({
				wargearPts: 4,
        equipment: "kombi-weapon with skorcha, choppa, stikkbombs"
			});
		}
		if (wargearOptions.value === "big choppa kombi-weapon with skorcha" && this.state.unitType.value === "Boss Nob") {
			this.setState({
				wargearPts: 6,
        equipment: "kombi-weapon with skorcha, big choppa, stikkbombs"
			});
		}
		if (wargearOptions.value === "power klaw kombi-weapon with skorcha" && this.state.unitType.value === "Boss Nob") {
			this.setState({
				wargearPts: 8,
        equipment: "kombi-weapon with skorcha, power klaw, stikkbombs"
			});
		}

		if (wargearOptions.value === "none" && this.state.unitType.value === "Kommando Boss Nob") {
			this.setState({
				wargearPts: 0,
        equipment: "slugga, choppa, stikkbombs"
			});
		}
		if (wargearOptions.value === "power klaw" && this.state.unitType.value === "Kommando Boss Nob") {
			this.setState({
				wargearPts: 4,
        equipment: "slugga, power klaw, stikkbombs"
			});
		}

		if (wargearOptions.value === "none" && this.state.unitType.value === "Burna Spanner") {
			this.setState({
				wargearPts: 0,
        equipment: "burna, stikkbombs"
			});
		}
		if (wargearOptions.value === "kustom mega-blasta" && this.state.unitType.value === "Burna Spanner") {
			this.setState({
				wargearPts: 0,
        equipment: "kustom mega-blasta, stikkbombs"
			});
		}
		if (wargearOptions.value === "rokkit launcha" && this.state.unitType.value === "Burna Spanner") {
			this.setState({
				wargearPts: 3,
        equipment: "rokkit launcha, stikkbombs"
			});
		}

		if (wargearOptions.value === "none" && this.state.unitType.value === "Loota Spanner") {
			this.setState({
				wargearPts: 0,
        equipment: "deffgun, stikkbombs"
			});
		}
		if (wargearOptions.value === "kustom mega-blasta" && this.state.unitType.value === "Loota Spanner") {
			this.setState({
				wargearPts: 0,
        equipment: "kustom mega-blasta, stikkbombs"
			});
		}
		if (wargearOptions.value === "rokkit launcha" && this.state.unitType.value === "Loota Spanner") {
			this.setState({
				wargearPts: 3,
        equipment: "rokkit launcha, stikkbombs"
			});
		}

		if (wargearOptions.value === "none" && this.state.unitType.value === "Shasla") {
			this.setState({
				wargearPts: 0,
        equipment: "pulse rifle, photon grenades"
			});
		}
		if (wargearOptions.value === "pulse carbine" && this.state.unitType.value === "Shasla") {
			this.setState({
				wargearPts: 0,
        equipment: "pulse carbine, photon grenades"
			});
		}
		if (wargearOptions.value === "pulse pistol" && this.state.unitType.value === "Shasla") {
			this.setState({
				wargearPts: 0,
        equipment: "pulse rifle, pulse pistol, photon grenades"
			});
		}

		if (wargearOptions.value === "none" && this.state.unitType.value === "Shasui") {
			this.setState({
				wargearPts: 0,
        equipment: "pulse rifle, photon grenades"
			});
		}
		if (wargearOptions.value === "pulse carbine" && this.state.unitType.value === "Shasui") {
			this.setState({
				wargearPts: 0,
        equipment: "pulse carbine, photon grenades"
			});
		}
		if (wargearOptions.value === "pulse pistol" && this.state.unitType.value === "Shasui") {
			this.setState({
				wargearPts: 0,
        equipment: "pulse rifle, pulse pistol, photon grenades"
			});
		}
		if (wargearOptions.value === "markerlight" && this.state.unitType.value === "Shasui") {
			this.setState({
				wargearPts: 0,
        equipment: "pulse rifle, markerlight, photon grenades"
			});
		}
		if (wargearOptions.value === "pulse carbine markerlight" && this.state.unitType.value === "Shasui") {
			this.setState({
				wargearPts: 0,
        equipment: "pulse carbine, markerlight, photon grenades"
			});
		}
		if (wargearOptions.value === "pulse pistol markerlight" && this.state.unitType.value === "Shasui") {
			this.setState({
				wargearPts: 0,
        equipment: "pulse pistol, markerlight, photon grenades"
			});
		}

		if (wargearOptions.value === "none" && this.state.unitType.value === "Pathfinder Gunner") {
			this.setState({
				wargearPts: 0,
        equipment: "pulse carbine, markerlight, photon grenades"
			});
		}
		if (wargearOptions.value === "ion rifle" && this.state.unitType.value === "Pathfinder Gunner") {
			this.setState({
				wargearPts: 3,
        equipment: "ion rifle, photon grenades"
			});
		}
		if (wargearOptions.value === "rail rifle" && this.state.unitType.value === "Pathfinder Gunner") {
			this.setState({
				wargearPts: 5,
        equipment: "rail rifle, photon grenades"
			});
		}

		if (wargearOptions.value === "none" && this.state.unitType.value === "Pathfinder Shasui") {
			this.setState({
				wargearPts: 0,
        equipment: "pulse carbine, markerlight, photon grenades"
			});
		}
		if (wargearOptions.value === "pulse pistol" && this.state.unitType.value === "Pathfinder Shasui") {
			this.setState({
				wargearPts: 0,
        equipment: "pulse carbine, pulse pistol, markerlight, photon grenades"
			});
		}

		if (wargearOptions.value === "none" && this.state.unitType.value === "Breacher Shasla") {
			this.setState({
				wargearPts: 0,
        equipment: "pulse blaster, photon grenades"
			});
		}
		if (wargearOptions.value === "pulse pistol" && this.state.unitType.value === "Breacher Shasla") {
			this.setState({
				wargearPts: 0,
        equipment: "pulse blaster, pulse pistol, photon grenades"
			});
		}

		if (wargearOptions.value === "none" && this.state.unitType.value === "Breacher Shasui") {
			this.setState({
				wargearPts: 0,
        equipment: "pulse blaster, photon grenades"
			});
		}
		if (wargearOptions.value === "pulse pistol" && this.state.unitType.value === "Breacher Shasui") {
			this.setState({
				wargearPts: 0,
        equipment: "pulse blaster, pulse pistol, photon grenades"
			});
		}
		if (wargearOptions.value === "markerlight" && this.state.unitType.value === "Breacher Shasui") {
			this.setState({
				wargearPts: 0,
        equipment: "pulse blaster, markerlight, photon grenades"
			});
		}
		if (wargearOptions.value === "pulse pistol markerlight" && this.state.unitType.value === "Breacher Shasui") {
			this.setState({
				wargearPts: 0,
        equipment: "pulse blaster, pulse pistol, markerlight, photon grenades"
			});
		}

		if (wargearOptions.value === "none" && this.state.unitType.value === "Stealth Shasui") {
			this.setState({
				wargearPts: 0,
        equipment: "burst cannon"
			});
		}
		if (wargearOptions.value === "fusion blaster" && this.state.unitType.value === "Stealth Shasui") {
			this.setState({
				wargearPts: 4,
        equipment: "fusion blaster"
			});
		}

		if (wargearOptions.value === "none" && this.state.unitType.value === "Stealth Shasvre") {
			this.setState({
				wargearPts: 0,
        equipment: "burst cannon"
			});
		}
		if (wargearOptions.value === "fusion blaster" && this.state.unitType.value === "Stealth Shasvre") {
			this.setState({
				wargearPts: 4,
        equipment: "fusion blaster"
			});
		}
		if (wargearOptions.value === "markerlight and target lock" && this.state.unitType.value === "Stealth Shasvre") {
			this.setState({
				wargearPts: 1,
        equipment: "burst cannon, markerlight"
			});
		}
		if (wargearOptions.value === "fusion blaster markerlight and target lock" && this.state.unitType.value === "Stealth Shasvre") {
			this.setState({
				wargearPts: 5,
        equipment: "fusion blaster, markerlight"
			});
		}

		if (wargearOptions.value === "none" && this.state.unitType.value === "Termagant") {
			this.setState({
				wargearPts: 0,
        equipment: "fleshborer"
			});
		}
		if (wargearOptions.value === "devourer" && this.state.unitType.value === "Termagant") {
			this.setState({
				wargearPts: 3,
        equipment: "devourer"
			});
		}
		if (wargearOptions.value === "spinefists" && this.state.unitType.value === "Termagant") {
			this.setState({
				wargearPts: 0,
        equipment: "spinefists"
			});
		}

		if (wargearOptions.value === "none" && this.state.unitType.value === "Tyranid Warrior") {
			this.setState({
				wargearPts: 0,
        equipment: "scything talons, devourer"
			});
		}
		if (wargearOptions.value === "rending claws" && this.state.unitType.value === "Tyranid Warrior") {
			this.setState({
				wargearPts: 1,
        equipment: "rending claws, devourer"
			});
		}
		if (wargearOptions.value === "boneswords" && this.state.unitType.value === "Tyranid Warrior") {
			this.setState({
				wargearPts: 0,
        equipment: "boneswords, devourer"
			});
		}
		if (wargearOptions.value === "lash whip and bonesword" && this.state.unitType.value === "Tyranid Warrior") {
			this.setState({
				wargearPts: 1,
        equipment: "lash whip and bonesword, devourer"
			});
		}
		if (wargearOptions.value === "deathspitter" && this.state.unitType.value === "Tyranid Warrior") {
			this.setState({
				wargearPts: 2,
        equipment: "scything talons, deathspitter"
			});
		}
		if (wargearOptions.value === "rending claws deathspitter" && this.state.unitType.value === "Tyranid Warrior") {
			this.setState({
				wargearPts: 2,
        equipment: "rending claws, deathspitter"
			});
		}
		if (wargearOptions.value === "boneswords deathspitter" && this.state.unitType.value === "Tyranid Warrior") {
			this.setState({
				wargearPts: 2,
        equipment: "boneswords, deathspitter"
			});
		}
		if (wargearOptions.value === "lash whip and bonesword deathspitter" && this.state.unitType.value === "Tyranid Warrior") {
			this.setState({
				wargearPts: 3,
        equipment: "lash whip and bonesword, deathspitter"
			});
		}
		if (wargearOptions.value === "spinefists" && this.state.unitType.value === "Tyranid Warrior") {
			this.setState({
				wargearPts: 0,
        equipment: "scything talons, spinefists"
			});
		}
		if (wargearOptions.value === "rending claws spinefists" && this.state.unitType.value === "Tyranid Warrior") {
			this.setState({
				wargearPts: 0,
        equipment: "rending claws, spinefists"
			});
		}
		if (wargearOptions.value === "boneswords spinefists" && this.state.unitType.value === "Tyranid Warrior") {
			this.setState({
				wargearPts: 0,
        equipment: "boneswords, spinefists"
			});
		}
		if (wargearOptions.value === "lash whip and bonesword spinefists" && this.state.unitType.value === "Tyranid Warrior") {
			this.setState({
				wargearPts: 1,
        equipment: "lash whip and bonesword, spinefists"
			});
		}
		if (wargearOptions.value === "scything talons rending claws" && this.state.unitType.value === "Tyranid Warrior") {
			this.setState({
				wargearPts: 0,
        equipment: "scything talons, rending claws"
			});
		}
		if (wargearOptions.value === "rending claws x2" && this.state.unitType.value === "Tyranid Warrior") {
			this.setState({
				wargearPts: 0,
        equipment: "rending claws, rending claws"
			});
		}
		if (wargearOptions.value === "boneswords rending claws" && this.state.unitType.value === "Tyranid Warrior") {
			this.setState({
				wargearPts: 0,
        equipment: "boneswords, rending claws"
			});
		}
		if (wargearOptions.value === "lash whip and bonesword rending claws" && this.state.unitType.value === "Tyranid Warrior") {
			this.setState({
				wargearPts: 1,
        equipment: "lash whip and bonesword, rending claws"
			});
		}
		if (wargearOptions.value === "scything talons x2" && this.state.unitType.value === "Tyranid Warrior") {
			this.setState({
				wargearPts: 0,
        equipment: "scything talons, scything talons"
			});
		}
		if (wargearOptions.value === "boneswords scything talons " && this.state.unitType.value === "Tyranid Warrior") {
			this.setState({
				wargearPts: 0,
        equipment: "boneswords, scything talons"
			});
		}
		if (wargearOptions.value === "lash whip and bonesword scything talons" && this.state.unitType.value === "Tyranid Warrior") {
			this.setState({
				wargearPts: 1,
        equipment: "lash whip and bonesword, scything talons"
			});
		}
		if (wargearOptions.value === "boneswords x2" && this.state.unitType.value === "Tyranid Warrior") {
			this.setState({
				wargearPts: 0,
        equipment: "boneswords, boneswords"
			});
		}
		if (wargearOptions.value === "lash whip and bonesword boneswords" && this.state.unitType.value === "Tyranid Warrior") {
			this.setState({
				wargearPts: 0,
        equipment: "lash whip and bonesword, boneswords"
			});
		}
		if (wargearOptions.value === "lash whip and bonesword x2" && this.state.unitType.value === "Tyranid Warrior") {
			this.setState({
				wargearPts: 2,
        equipment: "lash whip and bonesword, lash whip and bonesword"
			});
		}

		if (wargearOptions.value === "none" && this.state.unitType.value === "Tyranid Warrior Gunner") {
			this.setState({
				wargearPts: 0,
        equipment: "scything talons, devourer"
			});
		}
		if (wargearOptions.value === "rending claws" && this.state.unitType.value === "Tyranid Warrior Gunner") {
			this.setState({
				wargearPts: 1,
        equipment: "rending claws, devourer"
			});
		}
		if (wargearOptions.value === "boneswords" && this.state.unitType.value === "Tyranid Warrior Gunner") {
			this.setState({
				wargearPts: 0,
        equipment: "boneswords, devourer"
			});
		}
		if (wargearOptions.value === "lash whip and bonesword" && this.state.unitType.value === "Tyranid Warrior Gunner") {
			this.setState({
				wargearPts: 1,
        equipment: "lash whip and bonesword, devourer"
			});
		}
		if (wargearOptions.value === "deathspitter" && this.state.unitType.value === "Tyranid Warrior Gunner") {
			this.setState({
				wargearPts: 2,
        equipment: "scything talons, deathspitter"
			});
		}
		if (wargearOptions.value === "rending claws deathspitter" && this.state.unitType.value === "Tyranid Warrior Gunner") {
			this.setState({
				wargearPts: 2,
        equipment: "rending claws, deathspitter"
			});
		}
		if (wargearOptions.value === "boneswords deathspitter" && this.state.unitType.value === "Tyranid Warrior Gunner") {
			this.setState({
				wargearPts: 2,
        equipment: "boneswords, deathspitter"
			});
		}
		if (wargearOptions.value === "lash whip and bonesword deathspitter" && this.state.unitType.value === "Tyranid Warrior Gunner") {
			this.setState({
				wargearPts: 3,
        equipment: "lash whip and bonesword, deathspitter"
			});
		}
		if (wargearOptions.value === "spinefists" && this.state.unitType.value === "Tyranid Warrior Gunner") {
			this.setState({
				wargearPts: 0,
        equipment: "scything talons, spinefists"
			});
		}
		if (wargearOptions.value === "rending claws spinefists" && this.state.unitType.value === "Tyranid Warrior Gunner") {
			this.setState({
				wargearPts: 0,
        equipment: "rending claws, spinefists"
			});
		}
		if (wargearOptions.value === "boneswords spinefists" && this.state.unitType.value === "Tyranid Warrior Gunner") {
			this.setState({
				wargearPts: 0,
        equipment: "boneswords, spinefists"
			});
		}
		if (wargearOptions.value === "lash whip and bonesword spinefists" && this.state.unitType.value === "Tyranid Warrior Gunner") {
			this.setState({
				wargearPts: 1,
        equipment: "lash whip and bonesword, spinefists"
			});
		}
		if (wargearOptions.value === "scything talons rending claws" && this.state.unitType.value === "Tyranid Warrior Gunner") {
			this.setState({
				wargearPts: 0,
        equipment: "scything talons, rending claws"
			});
		}
		if (wargearOptions.value === "rending claws x2" && this.state.unitType.value === "Tyranid Warrior Gunner") {
			this.setState({
				wargearPts: 0,
        equipment: "rending claws, rending claws"
			});
		}
		if (wargearOptions.value === "boneswords rending claws" && this.state.unitType.value === "Tyranid Warrior Gunner") {
			this.setState({
				wargearPts: 0,
        equipment: "boneswords, rending claws"
			});
		}
		if (wargearOptions.value === "lash whip and bonesword rending claws" && this.state.unitType.value === "Tyranid Warrior Gunner") {
			this.setState({
				wargearPts: 1,
        equipment: "lash whip and bonesword, rending claws"
			});
		}
		if (wargearOptions.value === "scything talons x2" && this.state.unitType.value === "Tyranid Warrior Gunner") {
			this.setState({
				wargearPts: 0,
        equipment: "scything talons, scything talons"
			});
		}
		if (wargearOptions.value === "boneswords scything talons " && this.state.unitType.value === "Tyranid Warrior Gunner") {
			this.setState({
				wargearPts: 0,
        equipment: "boneswords, scything talons"
			});
		}
		if (wargearOptions.value === "lash whip and bonesword scything talons" && this.state.unitType.value === "Tyranid Warrior Gunner") {
			this.setState({
				wargearPts: 1,
        equipment: "lash whip and bonesword, scything talons"
			});
		}
		if (wargearOptions.value === "boneswords x2" && this.state.unitType.value === "Tyranid Warrior Gunner") {
			this.setState({
				wargearPts: 0,
        equipment: "boneswords, boneswords"
			});
		}
		if (wargearOptions.value === "lash whip and bonesword boneswords" && this.state.unitType.value === "Tyranid Warrior Gunner") {
			this.setState({
				wargearPts: 0,
        equipment: "lash whip and bonesword, boneswords"
			});
		}
		if (wargearOptions.value === "lash whip and bonesword x2" && this.state.unitType.value === "Tyranid Warrior Gunner") {
			this.setState({
				wargearPts: 2,
        equipment: "lash whip and bonesword, lash whip and bonesword"
			});
		}
		if (wargearOptions.value === "barbed strangler" && this.state.unitType.value === "Tyranid Warrior Gunner") {
			this.setState({
				wargearPts: 3,
        equipment: "scything talons, barbed strangler"
			});
		}
  	if (wargearOptions.value === "rending claws barbed strangler" && this.state.unitType.value === "Tyranid Warrior Gunner") {
			this.setState({
				wargearPts: 3,
        equipment: "rending claws, barbed strangler"
			});
		}
		if (wargearOptions.value === "boneswords barbed strangler" && this.state.unitType.value === "Tyranid Warrior Gunner") {
			this.setState({
				wargearPts: 3,
        equipment: "boneswords, barbed strangler"
			});
		}
		if (wargearOptions.value === "lash whip and bonesword barbed strangler" && this.state.unitType.value === "Tyranid Warrior Gunner") {
			this.setState({
				wargearPts: 4,
        equipment: "lash whip and bonesword, barbed strangler"
			});
		}
		if (wargearOptions.value === "venom cannon" && this.state.unitType.value === "Tyranid Warrior Gunner") {
			this.setState({
				wargearPts: 4,
        equipment: "scything talons, venom cannon"
			});
		}
  	if (wargearOptions.value === "rending claws venom cannon" && this.state.unitType.value === "Tyranid Warrior Gunner") {
			this.setState({
				wargearPts: 4,
        equipment: "rending claws, venom cannon"
			});
		}
		if (wargearOptions.value === "boneswords venom cannon" && this.state.unitType.value === "Tyranid Warrior Gunner") {
			this.setState({
				wargearPts: 4,
        equipment: "boneswords, venom cannon"
			});
		}
		if (wargearOptions.value === "lash whip and bonesword venom cannon" && this.state.unitType.value === "Tyranid Warrior Gunner") {
			this.setState({
				wargearPts: 5,
        equipment: "lash whip and bonesword, venom cannon"
			});
		}

		if (wargearOptions.value === "none" && this.state.unitType.value === "Genestealer") {
			this.setState({
				wargearPts: 0,
        equipment: "rending claws"
			});
		}
		if (wargearOptions.value === "scything talons" && this.state.unitType.value === "Genestealer") {
			this.setState({
				wargearPts: 0,
        equipment: "rending claws, scything talons"
			});
		}
		if (wargearOptions.value === "flesh hooks" && this.state.unitType.value === "Genestealer") {
			this.setState({
				wargearPts: 0,
        equipment: "rending claws, flesh hooks"
			});
		}
		if (wargearOptions.value === "scything talons flesh hooks" && this.state.unitType.value === "Genestealer") {
			this.setState({
				wargearPts: 0,
        equipment: "scything talons, flesh hooks"
			});
		}
		if (wargearOptions.value === "acid maw" && this.state.unitType.value === "Genestealer") {
			this.setState({
				wargearPts: 0,
        equipment: "rending claws, acid maw"
			});
		}
		if (wargearOptions.value === "scything talons acid maw" && this.state.unitType.value === "Genestealer") {
			this.setState({
				wargearPts: 0,
        equipment: "scything talons, acid maw"
			});
		}

		if (wargearOptions.value === "none" && this.state.unitType.value === "Acolyte Hybrid") {
			this.setState({
				wargearPts: 0,
        equipment: "autopistol, cultist knife, rending claw, blasting charges"
			});
		}
		if (wargearOptions.value === "hand flamer" && this.state.unitType.value === "Acolyte Hybrid") {
			this.setState({
				wargearPts: 2,
        equipment: "hand flamer, cultist knife, rending claw, blasting charges"
			});
		}

		if (wargearOptions.value === "none" && this.state.unitType.value === "Acolyte Fighter") {
			this.setState({
				wargearPts: 0,
        equipment: "autopistol, cultist knife, rending claw, blasting charges"
			});
		}
		if (wargearOptions.value === "hand flamer" && this.state.unitType.value === "Acolyte Fighter") {
			this.setState({
				wargearPts: 2,
        equipment: "hand flamer, cultist knife, rending claw, blasting charges"
			});
		}
		if (wargearOptions.value === "heavy rock drill" && this.state.unitType.value === "Acolyte Fighter") {
			this.setState({
				wargearPts: 5,
        equipment: "autopistol, heavy rock drill, blasting charges"
			});
		}
		if (wargearOptions.value === "heavy rock saw" && this.state.unitType.value === "Acolyte Fighter") {
			this.setState({
				wargearPts: 4,
        equipment: "autopistol, heavy rock saw, blasting charges"
			});
		}
		if (wargearOptions.value === "heavy rock cutter" && this.state.unitType.value === "Acolyte Fighter") {
			this.setState({
				wargearPts: 4,
        equipment: "autopistol, heavy rock cutter, blasting charges"
			});
		}
		if (wargearOptions.value === "demolition charges" && this.state.unitType.value === "Acolyte Fighter") {
			this.setState({
				wargearPts: 3,
        equipment: "autopistol, demolition charges, blasting charges"
			});
		}
		if (wargearOptions.value === "hand flamer heavy rock drill" && this.state.unitType.value === "Acolyte Fighter") {
			this.setState({
				wargearPts: 5,
        equipment: "hand flamer, heavy rock drill, blasting charges"
			});
		}
		if (wargearOptions.value === "hand flamer heavy rock saw" && this.state.unitType.value === "Acolyte Fighter") {
			this.setState({
				wargearPts: 4,
        equipment: "hand flamer, heavy rock saw, blasting charges"
			});
		}
		if (wargearOptions.value === "hand flamer heavy rock cutter" && this.state.unitType.value === "Acolyte Fighter") {
			this.setState({
				wargearPts: 4,
        equipment: "hand flamer, heavy rock cutter, blasting charges"
			});
		}
		if (wargearOptions.value === "hand flamer demolition charges" && this.state.unitType.value === "Acolyte Fighter") {
			this.setState({
				wargearPts: 3,
        equipment: "hand flamer, demolition charges, blasting charges"
			});
		}

		if (wargearOptions.value === "none" && this.state.unitType.value === "Acolyte Leader") {
			this.setState({
				wargearPts: 0,
        equipment: "autopistol, cultist knife, rending claw, blasting charges"
			});
		}
		if (wargearOptions.value === "hand flamer" && this.state.unitType.value === "Acolyte Leader") {
			this.setState({
				wargearPts: 2,
        equipment: "hand flamer, cultist knife, rending claw, blasting charges"
			});
		}
		if (wargearOptions.value === "bonesword" && this.state.unitType.value === "Acolyte Leader") {
			this.setState({
				wargearPts: 1,
        equipment: "autopistol, bonesword, rending claw, blasting charges"
			});
		}
		if (wargearOptions.value === "lash whip and bonesword" && this.state.unitType.value === "Acolyte Leader") {
			this.setState({
				wargearPts: 2,
        equipment: "lash whip and bonesword, rending claw, blasting charges"
			});
		}

		if (wargearOptions.value === "none" && this.state.unitType.value === "Aberrant") {
			this.setState({
				wargearPts: 0,
        equipment: "power pick, rending claw"
			});
		}
		if (wargearOptions.value === "power hammer" && this.state.unitType.value === "Aberrant") {
			this.setState({
				wargearPts: 4,
        equipment: "power hammer, rending claw"
			});
		}

		if (wargearOptions.value === "none" && this.state.unitType.value === "Neophyte Hybrid") {
			this.setState({
				wargearPts: 0,
        equipment: "autogun, autopistol, blasting charges"
			});
		}
		if (wargearOptions.value === "shotgun" && this.state.unitType.value === "Neophyte Hybrid") {
			this.setState({
				wargearPts: 0,
        equipment: "shotgun, autopistol, blasting charges"
			});
		}

		if (wargearOptions.value === "none" && this.state.unitType.value === "Neophyte Gunner") {
			this.setState({
				wargearPts: 0,
        equipment: "autogun, autopistol, blasting charges"
			});
		}
		if (wargearOptions.value === "shotgun" && this.state.unitType.value === "Neophyte Gunner") {
			this.setState({
				wargearPts: 0,
        equipment: "shotgun, autopistol, blasting charges"
			});
		}
		if (wargearOptions.value === "flamer" && this.state.unitType.value === "Neophyte Gunner") {
			this.setState({
				wargearPts: 3,
        equipment: "flamer, autopistol, blasting charges"
			});
		}
		if (wargearOptions.value === "grenade launcher" && this.state.unitType.value === "Neophyte Gunner") {
			this.setState({
				wargearPts: 2,
        equipment: "grenade launcher, autopistol, blasting charges"
			});
		}
		if (wargearOptions.value === "webber" && this.state.unitType.value === "Neophyte Gunner") {
			this.setState({
				wargearPts: 1,
        equipment: "webber, autopistol, blasting charges"
			});
		}
		if (wargearOptions.value === "heavy stubber" && this.state.unitType.value === "Neophyte Gunner") {
			this.setState({
				wargearPts: 0,
        equipment: "heavy stubber, autopistol, blasting charges"
			});
		}
		if (wargearOptions.value === "mining laser" && this.state.unitType.value === "Neophyte Gunner") {
			this.setState({
				wargearPts: 3,
        equipment: "mining laser, autopistol, blasting charges"
			});
		}
		if (wargearOptions.value === "seismic cannon" && this.state.unitType.value === "Neophyte Gunner") {
			this.setState({
				wargearPts: 2,
        equipment: "seismic cannon, autopistol, blasting charges"
			});
		}

		if (wargearOptions.value === "none" && this.state.unitType.value === "Hybrid Metamorph") {
			this.setState({
				wargearPts: 0,
        equipment: "autopistol, rending claw, metamorph talon, blasting charges"
			});
		}
		if (wargearOptions.value === "metamorph talon" && this.state.unitType.value === "Hybrid Metamorph") {
			this.setState({
				wargearPts: 0,
        equipment: "autopistol, metamorph talon, metamorph talon, blasting charges"
			});
		}
		if (wargearOptions.value === "metamorph whip" && this.state.unitType.value === "Hybrid Metamorph") {
			this.setState({
				wargearPts: 1,
        equipment: "autopistol, rending claw, metamorph whip, blasting charges"
			});
		}
		if (wargearOptions.value === "metamorph claw" && this.state.unitType.value === "Hybrid Metamorph") {
			this.setState({
				wargearPts: 2,
        equipment: "autopistol, metamorph claw, blasting charges"
			});
		}
		if (wargearOptions.value === "hand flamer metamorph talon" && this.state.unitType.value === "Hybrid Metamorph") {
			this.setState({
				wargearPts: 1,
        equipment: "hand flamer, metamorph talon, metamorph talon, blasting charges"
			});
		}
		if (wargearOptions.value === "hand flamer metamorph whip" && this.state.unitType.value === "Hybrid Metamorph") {
			this.setState({
				wargearPts: 0,
        equipment: "hand flamer, rending claw, metamorph whip, blasting charges"
			});
		}
		if (wargearOptions.value === "hand flamer metamorph claw" && this.state.unitType.value === "Hybrid Metamorph") {
			this.setState({
				wargearPts: 3,
        equipment: "hand flamer, metamorph claw, blasting charges"
			});
		}

		if (wargearOptions.value === "none" && this.state.unitType.value === "Metamorph Leader") {
			this.setState({
				wargearPts: 0,
        equipment: "autopistol, rending claw, metamorph talon, blasting charges"
			});
		}
		if (wargearOptions.value === "metamorph talon" && this.state.unitType.value === "Metamorph Leader") {
			this.setState({
				wargearPts: 0,
        equipment: "autopistol, metamorph talon, metamorph talon, blasting charges"
			});
		}
		if (wargearOptions.value === "metamorph whip" && this.state.unitType.value === "Metamorph Leader") {
			this.setState({
				wargearPts: 1,
        equipment: "autopistol, rending claw, metamorph whip, blasting charges"
			});
		}
		if (wargearOptions.value === "metamorph claw" && this.state.unitType.value === "Metamorph Leader") {
			this.setState({
				wargearPts: 2,
        equipment: "autopistol, metamorph claw, blasting charges"
			});
		}
		if (wargearOptions.value === "hand flamer metamorph talon" && this.state.unitType.value === "Metamorph Leader") {
			this.setState({
				wargearPts: 1,
        equipment: "hand flamer, metamorph talon, metamorph talon, blasting charges"
			});
		}
		if (wargearOptions.value === "hand flamer metamorph whip" && this.state.unitType.value === "Metamorph Leader") {
			this.setState({
				wargearPts: 0,
        equipment: "hand flamer, rending claw, metamorph whip, blasting charges"
			});
		}
		if (wargearOptions.value === "hand flamer metamorph claw" && this.state.unitType.value === "Metamorph Leader") {
			this.setState({
				wargearPts: 3,
        equipment: "hand flamer, metamorph claw, blasting charges"
			});
		}


	}
			
	handleChange4 = (wargearOptions2) => {
    this.setState({wargearOptions2: wargearOptions2})
    if (wargearOptions2.value === "none" && this.state.unitType.value === "Reiver") {
      this.setState({
        wargearPts2: 0,
        abilities: "And They Shall Know No Fear, Transhuman Physiology, terror troops"
      });
    }
    if (wargearOptions2.value === "Grav-Chute" && this.state.unitType.value === "Reiver") {
      this.setState({
        wargearPts2: 1,
        abilities: "And They Shall Know No Fear, Transhuman Physiology, terror troops, Grav-Chute"
      });
    }
    if (wargearOptions2.value === "Grapnel Launcher" && this.state.unitType.value === "Reiver") {
      this.setState({
        wargearPts2: 1,
        abilities: "And They Shall Know No Fear, Transhuman Physiology, terror troops, Grapnel Launcher"
      });
    }
    if (wargearOptions2.value === "Grav-Chute Grapnel Launcher" && this.state.unitType.value === "Reiver") {
      this.setState({
        wargearPts2: 2,
        abilities: "And They Shall Know No Fear, Transhuman Physiology, terror troops, Grav-Chute, Grapnel Launcher"
      });
    }

    if (wargearOptions2.value === "none" && this.state.unitType.value === "Reiver Sergeant") {
      this.setState({
        wargearPts2: 0,
        abilities: "And They Shall Know No Fear, Transhuman Physiology, terror troops"
      });
    }
    if (wargearOptions2.value === "Grav-Chute" && this.state.unitType.value === "Reiver Sergeant") {
      this.setState({
        wargearPts2: 1,
        abilities: "And They Shall Know No Fear, Transhuman Physiology, terror troops, Grav-Chute"
      });
    }
    if (wargearOptions2.value === "Grapnel Launcher" && this.state.unitType.value === "Reiver Sergeant") {
      this.setState({
        wargearPts2: 1,
        abilities: "And They Shall Know No Fear, Transhuman Physiology, terror troops, grapnel chute"
      });
    }
    if (wargearOptions2.value === "Grav-Chute Grapnel Launcher" && this.state.unitType.value === "Reiver Sergeant") {
      this.setState({
        wargearPts2: 2,
        abilities: "And They Shall Know No Fear, Transhuman Physiology, terror troops, Grav-Chute, Grapnel Launcher"
      });
    }

    if (wargearOptions2.value === "none" && this.state.unitType.value === "Guardsman") {
      this.setState({
        wargearPts2: 0,
        abilities: ""
      });
    }
    if (wargearOptions2.value === "Vox-Caster" && this.state.unitType.value === "Guardsman") {
      this.setState({
        wargearPts2: 5,
        abilities: "Vox-Caster"
      });
    }

    if (wargearOptions2.value === "none" && this.state.unitType.value === "Scion") {
      this.setState({
        wargearPts2: 0,
        abilities: ""
      });
    }
    if (wargearOptions2.value === "Vox-Caster" && this.state.unitType.value === "Scion") {
      this.setState({
        wargearPts2: 5,
        abilities: "Vox-Caster"
      });
    }

    if (wargearOptions2.value === "none" && this.state.unitType.value === "Skitarii Ranger") {
      this.setState({
        wargearPts2: 0,
        abilities: "Canticles of the Omnissiah, Bionics"
      });
    }
    if (wargearOptions2.value === "Enhanced Data-Tether" && this.state.unitType.value === "Skitarii Ranger") {
      this.setState({
        wargearPts2: 5,
        abilities: "Canticles of the Omnissiah, Bionics, Enhanced Data-Tether"
      });
    }
    if (wargearOptions2.value === "Omnispex" && this.state.unitType.value === "Skitarii Ranger") {
      this.setState({
        wargearPts2: 1,
        abilities: "Canticles of the Omnissiah, Bionics, Omnispex"
      });
    }

    if (wargearOptions2.value === "none" && this.state.unitType.value === "Skitarii Vanguard") {
      this.setState({
        wargearPts2: 0,
        abilities: "Canticles of the Omnissiah, Bionics, Rad-Saturation"
      });
    }
    if (wargearOptions2.value === "Enhanced Data-Tether" && this.state.unitType.value === "Skitarii Vanguard") {
      this.setState({
        wargearPts2: 5,
        abilities: "Canticles of the Omnissiah, Bionics, Rad-Saturation, Enhanced Data-Tether"
      });
    }
    if (wargearOptions2.value === "Omnispex" && this.state.unitType.value === "Skitarii Vanguard") {
      this.setState({
        wargearPts2: 1,
        abilities: "Canticles of the Omnissiah, Bionics, Rad-Saturation, Omnispex"
      });
    }

    if (wargearOptions2.value === "none" && this.state.unitType.value === "Chaos Space Marine") {
      this.setState({
        wargearPts2: 0,
        abilities: "Death to the False Emperor, Transhuman Physiology, Mark of Chaos"
      });
    }
    if (wargearOptions2.value === "Icon of Despair" && this.state.unitType.value === "Chaos Space Marine") {
      this.setState({
        wargearPts2: 3,
        abilities: "Death to the False Emperor, Transhuman Physiology, mark of nurgle, Icon of Despair"
      });
    }
    if (wargearOptions2.value === "Icon of Wrath" && this.state.unitType.value === "Chaos Space Marine") {
      this.setState({
        wargearPts2: 5,
        abilities: "Death to the False Emperor, Transhuman Physiology, mark of khorne, Icon of Wrath"
      });
    }
    if (wargearOptions2.value === "Icon of Flame" && this.state.unitType.value === "Chaos Space Marine") {
      this.setState({
        wargearPts2: 1,
        abilities: "Death to the False Emperor, Transhuman Physiology, mark of tzeentch, Icon of Flame"
      });
    }
    if (wargearOptions2.value === "Icon of Excess" && this.state.unitType.value === "Chaos Space Marine") {
      this.setState({
        wargearPts2: 5,
        abilities: "Death to the False Emperor, Transhuman Physiology, mark of slaanesh, Icon of Excess"
      });
    }
    if (wargearOptions2.value === "Icon of Vengeance" && this.state.unitType.value === "Chaos Space Marine") {
      this.setState({
        wargearPts2: 1,
        abilities: "Death to the False Emperor, Transhuman Physiology, Mark of Chaos, Icon of Vengeance"
      });
    }

    if (wargearOptions2.value === "none" && this.state.unitType.value === "Plague Marine") {
      this.setState({
        wargearPts2: 0,
        abilities: "Death to the False Emperor, Transhuman Physiology, Disgustingly Resilient"
      });
    }
    if (wargearOptions2.value === "Icon of Despair" && this.state.unitType.value === "Plague Marine") {
      this.setState({
        wargearPts2: 3,
        abilities: "Death to the False Emperor, Transhuman Physiology, Disgustingly Resilient, Icon of Despair"
      });
    }

    if (wargearOptions2.value === "none" && this.state.unitType.value === "Rubric Marine") {
      this.setState({
        wargearPts2: 0,
        abilities: "Death to the False Emperor, All is Dust, Favoured of Tzeentch"
      });
    }
    if (wargearOptions2.value === "Icon of Flame" && this.state.unitType.value === "Rubric Marine") {
      this.setState({
        wargearPts2: 1,
        abilities: "Death to the False Emperor, All is Dust, Favoured of Tzeentch, Icon of Flame"
      });
    }

    if (wargearOptions2.value === "none" && this.state.unitType.value === "Tzaangor") {
      this.setState({
        wargearPts2: 0,
        abilities: "Aura of Dark Glory"
      });
    }
    if (wargearOptions2.value === "Brayhorn" && this.state.unitType.value === "Tzaangor") {
      this.setState({
        wargearPts2: 3,
        abilities: "Aura of Dark Glory, brayhord"
      });
    }

    if (wargearOptions2.value === "none" && this.state.unitType.value === "Termagant") {
      this.setState({
        wargearPts2: 0,
        abilities: "Instinctive Behaviour"
      });
    }
    if (wargearOptions2.value === "Adrenal Glands" && this.state.unitType.value === "Termagant") {
      this.setState({
        wargearPts2: 1,
        abilities: "Instinctive Behaviour, Adrenal Glands"
      });
    }
    if (wargearOptions2.value === "Toxin Sacs" && this.state.unitType.value === "Termagant") {
      this.setState({
        wargearPts2: 1,
        abilities: "Instinctive Behaviour, Toxin Sacs"
      });
    }
    if (wargearOptions2.value === "Adrenal Glands Toxin Sacs" && this.state.unitType.value === "Termagant") {
      this.setState({
        wargearPts2: 2,
        abilities: "Instinctive Behaviour, Adrenal Glands, toxin glands"
      });
    }

    if (wargearOptions2.value === "none" && this.state.unitType.value === "Hormagaunt") {
      this.setState({
        wargearPts2: 0,
        abilities: "Instinctive Behaviour, Bounding Leap"
      });
    }
    if (wargearOptions2.value === "Adrenal Glands" && this.state.unitType.value === "Hormagaunt") {
      this.setState({
        wargearPts2: 1,
        abilities: "Instinctive Behaviour, Bounding Leap, Adrenal Glands"
      });
    }
    if (wargearOptions2.value === "Toxin Sacs" && this.state.unitType.value === "Hormagaunt") {
      this.setState({
        wargearPts2: 1,
        abilities: "Instinctive Behaviour, Bounding Leap, Toxin Sacs"
      });
    }
    if (wargearOptions2.value === "Adrenal Glands Toxin Sacs" && this.state.unitType.value === "Hormagaunt") {
      this.setState({
        wargearPts2: 2,
        abilities: "Instinctive Behaviour, Bounding Leap, Adrenal Glands, Toxin Sacs"
      });
    }

    if (wargearOptions2.value === "none" && this.state.unitType.value === "Genestealer") {
      this.setState({
        wargearPts2: 0,
        abilities: "Lightning Reflexes, Swift and Deadly"
      });
    }
    if (wargearOptions2.value === "Extended Carapace" && this.state.unitType.value === "Genestealer") {
      this.setState({
        wargearPts2: 0,
        abilities: "Lightning Reflexes, Extended Carapace"
      });
    }
    if (wargearOptions2.value === "Toxin Sacs" && this.state.unitType.value === "Genestealer") {
      this.setState({
        wargearPts2: 1,
        abilities: "Lightning Reflexes, Swift and Deadly, Toxin Sacs"
      });
    }
    if (wargearOptions2.value === "Extended Carapace Toxin Sacs" && this.state.unitType.value === "Genestealer") {
      this.setState({
        wargearPts2: 1,
        abilities: "Lightning Reflexes, Extended Carapace, Toxin Sacs"
      });
    }

    if (wargearOptions2.value === "none" && this.state.unitType.value === "Tyranid Warrior") {
      this.setState({
        wargearPts2: 0,
        abilities: "Synapse, Shadow in the Warp"
      });
    }
    if (wargearOptions2.value === "Adrenal Glands" && this.state.unitType.value === "Tyranid Warrior") {
      this.setState({
        wargearPts2: 1,
        abilities: "Synapse, Shadow in the Warp, Adrenal Glands"
      });
    }
    if (wargearOptions2.value === "Toxin Sacs" && this.state.unitType.value === "Tyranid Warrior") {
      this.setState({
        wargearPts2: 1,
        abilities: "Synapse, Shadow in the Warp, Toxin Sacs"
      });
    }
    if (wargearOptions2.value === "flesh hooks" && this.state.unitType.value === "Tyranid Warrior") {
      this.setState({
        wargearPts2: 0,
        abilities: "Synapse, Shadow in the Warp, flesh hooks"
      });
    }
    if (wargearOptions2.value === "Adrenal Glands Toxin Sacs" && this.state.unitType.value === "Tyranid Warrior") {
      this.setState({
        wargearPts2: 2,
        abilities: "Synapse, Shadow in the Warp, Adrenal Glands, Toxin Sacs"
      });
    }
    if (wargearOptions2.value === "Adrenal Glands flesh hooks" && this.state.unitType.value === "Tyranid Warrior") {
      this.setState({
        wargearPts2: 1,
        abilities: "Synapse, Shadow in the Warp, Adrenal Glands, flesh hooks"
      });
    }
    if (wargearOptions2.value === "Toxin Sacs flesh hooks" && this.state.unitType.value === "Tyranid Warrior") {
      this.setState({
        wargearPts2: 1,
        abilities: "Synapse, Shadow in the Warp, Toxin Sacs, flesh hooks"
      });
    }
    if (wargearOptions2.value === "Adrenal Glands Toxin Sacs flesh hooks" && this.state.unitType.value === "Tyranid Warrior") {
      this.setState({
        wargearPts2: 2,
        abilities: "Synapse, Shadow in the Warp, Adrenal Glands, Toxin Sacs, flesh hooks"
      });
    }

    if (wargearOptions2.value === "none" && this.state.unitType.value === "Tyranid Warrior Gunner") {
      this.setState({
        wargearPts2: 0,
        abilities: "Synapse, Shadow in the Warp"
      });
    }
    if (wargearOptions2.value === "Adrenal Glands" && this.state.unitType.value === "Tyranid Warrior Gunner") {
      this.setState({
        wargearPts2: 1,
        abilities: "Synapse, Shadow in the Warp, Adrenal Glands"
      });
    }
    if (wargearOptions2.value === "Toxin Sacs" && this.state.unitType.value === "Tyranid Warrior Gunner") {
      this.setState({
        wargearPts2: 1,
        abilities: "Synapse, Shadow in the Warp, Toxin Sacs"
      });
    }
    if (wargearOptions2.value === "flesh hooks" && this.state.unitType.value === "Tyranid Warrior Gunner") {
      this.setState({
        wargearPts2: 0,
        abilities: "Synapse, Shadow in the Warp, flesh hooks"
      });
    }
    if (wargearOptions2.value === "Adrenal Glands Toxin Sacs" && this.state.unitType.value === "Tyranid Warrior Gunner") {
      this.setState({
        wargearPts2: 2,
        abilities: "Synapse, Shadow in the Warp, Adrenal Glands, Toxin Sacs"
      });
    }
    if (wargearOptions2.value === "Adrenal Glands flesh hooks" && this.state.unitType.value === "Tyranid Warrior Gunner") {
      this.setState({
        wargearPts2: 1,
        abilities: "Synapse, Shadow in the Warp, Adrenal Glands, flesh hooks"
      });
    }
    if (wargearOptions2.value === "Toxin Sacs flesh hooks" && this.state.unitType.value === "Tyranid Warrior Gunner") {
      this.setState({
        wargearPts2: 1,
        abilities: "Synapse, Shadow in the Warp, Toxin Sacs, flesh hooks"
      });
    }
    if (wargearOptions2.value === "Adrenal Glands Toxin Sacs flesh hooks" && this.state.unitType.value === "Tyranid Warrior Gunner") {
      this.setState({
        wargearPts2: 2,
        abilities: "Synapse, Shadow in the Warp, Adrenal Glands, Toxin Sacs, flesh hooks"
      });
    }

    if (wargearOptions2.value === "none" && this.state.unitType.value === "Acolyte Hybrid") {
      this.setState({
        wargearPts2: 0,
        abilities: "Cult Ambush"
      });
    }
    if (wargearOptions2.value === "Cult Icon" && this.state.unitType.value === "Acolyte Hybrid") {
      this.setState({
        wargearPts2: 5,
        abilities: "Cult Ambush, Cult Icon"
      });
    }

    if (wargearOptions2.value === "none" && this.state.unitType.value === "Neophyte Hybrid") {
      this.setState({
        wargearPts2: 0,
        abilities: "Cult Ambush"
      });
    }
    if (wargearOptions2.value === "Cult Icon" && this.state.unitType.value === "Neophyte Hybrid") {
      this.setState({
        wargearPts2: 5,
        abilities: "Cult Ambush, Cult Icon"
      });
    }

    if (wargearOptions2.value === "none" && this.state.unitType.value === "Hybrid Metamorph") {
      this.setState({
        wargearPts2: 0,
        abilities: "Cult Ambush"
      });
    }
    if (wargearOptions2.value === "Cult Icon" && this.state.unitType.value === "Hybrid Metamorph") {
      this.setState({
        wargearPts2: 5,
        abilities: "Cult Ambush, Cult Icon"
      });
    }
	}			
			
  render() {
    const options1 = [
      {value: 'Adeptus Astartes', label: <img src={astartes} alt="astartes"></img>},
      {value: 'Deathwatch', label: <img src={deathwatch} alt="deathwatch"></img>},
      {value: 'Grey Knights', label: <img src={grey} alt="grey"></img>},
      {value: 'Astra Militarum', label: <img src={astra} alt="astra"></img>},
      {value: 'Adeptus Mechanicus', label: <img src={mechanicus} alt="mechanicus"></img>},
      {value: 'Heretic Astartes', label: <img src={heretic} alt="heretic"></img>},
      {value: 'Death Guard', label: <img src={deathguard} alt="deathguard"></img>},
      {value: 'Thousand Sons', label: <img src={thousand} alt="thousand"></img>},
      {value: 'Asuryani', label: <img src={asuryani} alt="asuryani"></img>},
      {value: 'Drukhari', label: <img src={drukhari} alt="drukhari"></img>},
      {value: 'Harlequins', label: <img src={harlequin} alt="harlequin"></img>},
      {value: 'Necrons', label: <img src={necron} alt="necron"></img>},
      {value: 'Orks', label: <img src={ork} alt="ork"></img>},
      {value: 'Tau Empire', label: <img src={tau} alt="tau"></img>},
      {value: 'Tyranids', label: <img src={tyranid} alt="tyranid"></img>},
      {value: 'Genestealer Cults', label: <img src={genestealer} alt="genestealer"></img>}
    ];

    const options2 = [
      {value: 'Tactical Marine', label: 'Tactical Marine', link: 'Adeptus Astartes'},
      {value: 'Tactical Marine Gunner', label: 'Tactical Marine Gunner', link: 'Adeptus Astartes'},
      {value: 'Tactical Marine Sergeant', label: 'Tactical Marine Sergeant', link: 'Adeptus Astartes'},
      {value: 'Scout', label: 'Scout', link: 'Adeptus Astartes'},
      {value: 'Scout Gunner', label: 'Scout Gunner', link: 'Adeptus Astartes'},
      {value: 'Scout Sergeant', label: 'Scout Sergeant', link: 'Adeptus Astartes'},
      {value: 'Intercessor', label: 'Intercessor', link: 'Adeptus Astartes'},
      {value: 'Intercessor Gunner', label: 'Intercessor Gunner', link: 'Adeptus Astartes'},
      {value: 'Intercessor Sergeant', label: 'Intercessor Sergeant', link: 'Adeptus Astartes'},
      {value: 'Reiver', label: 'Reiver', link: 'Adeptus Astartes'},
			{value: 'Reiver Sergeant', label: 'Reiver Sergeant', link: 'Adeptus Astartes'},
			
      {value: 'Deathwatch Veteran', label: 'Deathwatch Veteran', link: 'Deathwatch'},
      {value: 'Deathwatch Veteran Gunner', label: 'Deathwatch Veteran Gunner', link: 'Deathwatch'},
      {value: 'Black Shield', label: 'Black Shield', link: 'Deathwatch'},
			{value: 'Watch Sergeant', label: 'Watch Sergeant', link: 'Deathwatch'},
			
      {value: 'Grey Knight', label: 'Grey Knight', link: 'Grey Knights'},
      {value: 'Grey Knight Gunner', label: 'Grey Knight Gunner', link: 'Grey Knights'},
			{value: 'Justicar', label: 'Justicar', link: 'Grey Knights'},
			
      {value: 'Guardsman', label: 'Guardsman', link: 'Astra Militarum'},
      {value: 'Guardsman Gunner', label: 'Guardsman Gunner', link: 'Astra Militarum'},
      {value: 'Sergeant', label: 'Sergeant', link: 'Astra Militarum'},
      {value: 'Special Weapons Guardsman', label: 'Special Weapons Guardsman', link: 'Astra Militarum'},
      {value: 'Special Weapons Gunner', label: 'Special Weapons Gunner', link: 'Astra Militarum'},
      {value: 'Scion', label: 'Scion', link: 'Astra Militarum'},
      {value: 'Scion Gunner', label: 'Scion Gunner', link: 'Astra Militarum'},
			{value: 'Tempestor', label: 'Tempestor', link: 'Astra Militarum'},
			
      {value: 'Skitarii Ranger', label: 'Skitarii Ranger', link: 'Adeptus Mechanicus'},
      {value: 'Ranger Gunner', label: 'Ranger Gunner', link: 'Adeptus Mechanicus'},
      {value: 'Ranger Alpha', label: 'Ranger Alpha', link: 'Adeptus Mechanicus'},
      {value: 'Skitarii Vanguard', label: 'Skitarii Vanguard', link: 'Adeptus Mechanicus'},
      {value: 'Vanguard Gunner', label: 'Vanguard Gunner', link: 'Adeptus Mechanicus'},
      {value: 'Vanguard Alpha', label: 'Vanguard Alpha', link: 'Adeptus Mechanicus'},
      {value: 'Sicarian Ruststalker', label: 'Sicarian Ruststalker', link: 'Adeptus Mechanicus'},
      {value: 'Ruststalker Princeps', label: 'Ruststalker Princeps', link: 'Adeptus Mechanicus'},
      {value: 'Sicarian Infiltrator', label: 'Sicarian Infiltrator', link: 'Adeptus Mechanicus'},
			{value: 'Infiltrator Princeps', label: 'Infiltrator Princeps', link: 'Adeptus Mechanicus'},
			
      {value: 'Chaos Cultist', label: 'Chaos Cultist', link: 'Heretic Astartes'},
      {value: 'Chaos Cultist Gunner', label: 'Chaos Cultist Gunner', link: 'Heretic Astartes'},
      {value: 'Cultist Champion', label: 'Cultist Champion', link: 'Heretic Astartes'},
      {value: 'Chaos Space Marine', label: 'Chaos Space Marine', link: 'Heretic Astartes'},
      {value: 'Chaos Space Marine Gunner', label: 'Chaos Space Marine Gunner', link: 'Heretic Astartes'},
			{value: 'Aspiring Champion', label: 'Aspiring Champion', link: 'Heretic Astartes'},
			
      {value: 'Plague Marine', label: 'Plague Marine', link: 'Death Guard'},
      {value: 'Plague Marine Gunner', label: 'Plague Marine Gunner', link: 'Death Guard'},
      {value: 'Plague Marine Fighter', label: 'Plague Marine Fighter', link: 'Death Guard'},
      {value: 'Plague Champion', label: 'Plague Champion', link: 'Death Guard'},
			{value: 'Poxwalker', label: 'Poxwalker', link: 'Death Guard'},
			
      {value: 'Rubric Marine', label: 'Rubric Marine', link: 'Thousand Sons'},
      {value: 'Rubric Marine Gunner', label: 'Rubric Marine Gunner', link: 'Thousand Sons'},
      {value: 'Aspiring Sorcerer', label: 'Aspiring Sorcerer', link: 'Thousand Sons'},
      {value: 'Tzaangor', label: 'Tzaangor', link: 'Thousand Sons'},
			{value: 'Twistbray', label: 'Twistbray', link: 'Thousand Sons'},
			
      {value: 'Guardian Defender', label: 'Guardian Defender', link: 'Asuryani'},
      {value: 'Heavy Weapon Platform', label: 'Heavy Weapon Platform', link: 'Asuryani'},
      {value: 'Storm Guardian', label: 'Storm Guardian', link: 'Asuryani'},
      {value: 'Storm Guardian Gunner', label: 'Storm Guardian Gunner', link: 'Asuryani'},
      {value: 'Ranger', label: 'Ranger', link: 'Asuryani'},
      {value: 'Dire Avenger', label: 'Dire Avenger', link: 'Asuryani'},
			{value: 'Dire Avenger Exarch', label: 'Dire Avenger Exarch', link: 'Asuryani'},
			
      {value: 'Kabalite Warrior', label: 'Kabalite Warrior', link: 'Drukhari'},
      {value: 'Kabalite Gunner', label: 'Kabalite Gunner', link: 'Drukhari'},
      {value: 'Sybarite', label: 'Sybarite', link: 'Drukhari'},
      {value: 'Wych', label: 'Wych', link: 'Drukhari'},
      {value: 'Wych Fighter', label: 'Wych Fighter', link: 'Drukhari'},
			{value: 'Hekatrix', label: 'Hekatrix', link: 'Drukhari'},
			
			{value: 'Player', label: 'Player', link: 'Harlequins'},
			
      {value: 'Necron Warrior', label: 'Necron Warrior', link: 'Necrons'},
      {value: 'Immortal', label: 'Immortal', link: 'Necrons'},
      {value: 'Flayed One', label: 'Flayed One', link: 'Necrons'},
			{value: 'Deathmark', label: 'Deathmark', link: 'Necrons'},
			
      {value: 'Ork Boy', label: 'Ork Boy', link: 'Orks'},
      {value: 'Ork Boy Gunner', label: 'Ork Boy Gunner', link: 'Orks'},
      {value: 'Boss Nob', label: 'Boss Nob', link: 'Orks'},
      {value: 'Gretchin', label: 'Gretchin', link: 'Orks'},
      {value: 'Kommando', label: 'Kommando', link: 'Orks'},
      {value: 'Kommando Boss Nob', label: 'Kommando Boss Nob', link: 'Orks'},
      {value: 'Burna Boy', label: 'Burna Boy', link: 'Orks'},
      {value: 'Burna Spanner', label: 'Burna Spanner', link: 'Orks'},
      {value: 'Loota', label: 'Loota', link: 'Orks'},
			{value: 'Loota Spanner', label: 'Loota Spanner', link: 'Orks'},
			
      {value: 'Shasla', label: 'Shasla', link: 'Tau Empire'},
      {value: 'Shasui', label: 'Shasui', link: 'Tau Empire'},
      {value: 'DS8 Tactical Support Turret', label: 'DS8 Tactical Support Turret', link: 'Tau Empire'},
      {value: 'Pathfinder', label: 'Pathfinder', link: 'Tau Empire'},
      {value: 'Pathfinder Gunner', label: 'Pathfinder Gunner', link: 'Tau Empire'},
      {value: 'Pathfinder Shasui', label: 'Pathfinder Shasui', link: 'Tau Empire'},
      {value: 'Breacher Shasla', label: 'Breacher Shasla', link: 'Tau Empire'},
      {value: 'Breacher Shasui', label: 'Breacher Shasui', link: 'Tau Empire'},
      {value: 'DS8 Tactical Support Turret', label: 'DS8 Tactical Support Turret', link: 'Tau Empire'},
      {value: 'Stealth Shasui', label: 'Stealth Shasui', link: 'Tau Empire'},
      {value: 'Stealth Shasvre', label: 'Stealth Shasvre', link: 'Tau Empire'},
      {value: 'MV1 Gun Drone', label: 'MV1 Gun Drone', link: 'Tau Empire'},
      {value: 'MV4 Shield Drone', label: 'MV4 Shield Drone', link: 'Tau Empire'},
      {value: 'MV7 Marker Drone', label: 'MV7 Marker Drone', link: 'Tau Empire'},
      {value: 'MV36 Guardian Drone', label: 'MV36 Guardian Drone', link: 'Tau Empire'},
      {value: 'MV33 Grav-Inhibitor Drone', label: 'MV33 Grav-Inhibitor Drone', link: 'Tau Empire'},
      {value: 'MV31 Pulse Accelerator Drone', label: 'MV31 Pulse Accelerator Drone', link: 'Tau Empire'},
			{value: 'MB3 Recon Drone', label: 'MB3 Recon Drone', link: 'Tau Empire'},
			
      {value: 'Termagant', label: 'Termagant', link: 'Tyranids'},
      {value: 'Hormagaunt', label: 'Hormagaunt', link: 'Tyranids'},
      {value: 'Lictor', label: 'Lictor', link: 'Tyranids'},
      {value: 'Tyranid Warrior', label: 'Tyranid Warrior', link: 'Tyranids'},
      {value: 'Tyranid Warrior Gunner', label: 'Tyranid Warrior Gunner', link: 'Tyranids'},
			{value: 'Genestealer', label: 'Genestealer', link: 'Tyranids'},
			
      {value: 'Acolyte', label: 'Acolyte', link: 'Genestealer Cults'},
      {value: 'Acolyte Fighter', label: 'Acolyte Fighter', link: 'Genestealer Cults'},
      {value: 'Acolyte Leader', label: 'Acolyte Leader', link: 'Genestealer Cults'},
      {value: 'Aberrant', label: 'Aberrant', link: 'Genestealer Cults'},
      {value: 'Neophyte Hybrid', label: 'Neophyte Hybrid', link: 'Genestealer Cults'},
      {value: 'Neophyte Gunner', label: 'Neophyte Gunner', link: 'Genestealer Cults'},
      {value: 'Neophyte Leader', label: 'Neophyte Leader', link: 'Genestealer Cults'},
      {value: 'Hybrid Metamorph', label: 'Hybrid Metamorph', link: 'Genestealer Cults'},
      {value: 'Metamorph Leader', label: 'Metamorph Leader', link: 'Genestealer Cults'}
    ];

    const options3 = [
			{value: 'none', label: 'none', link: 'Tactical Marine'},
			
      {value: 'none', label: 'none', link: 'Tactical Marine Gunner'},
      {value: 'flamer', label: 'flamer +3pts', link: 'Tactical Marine Gunner'},
      {value: 'meltagun', label: 'meltagun +3pts', link: 'Tactical Marine Gunner'},
      {value: 'plasma gun', label: 'plasma gun +3pts', link: 'Tactical Marine Gunner'},
      {value: 'grav-gun', label: 'grav-gun +2pts', link: 'Tactical Marine Gunner'},
      {value: 'missile launcher', label: 'missile launcher +5pts', link: 'Tactical Marine Gunner'},
			{value: 'heavy bolter', label: 'heavy bolter +3pts', link: 'Tactical Marine Gunner'},

			{value: 'none', label: 'none', link: 'Tactical Marine Sergeant'},
      {value: 'combi-flamer', label: 'combi-flamer +3pts', link: 'Tactical Marine Sergeant'},
      {value: 'combi-grav', label: 'combi-grav +2pts', link: 'Tactical Marine Sergeant'},
      {value: 'combi-melta', label: 'combi-melta +3pts', link: 'Tactical Marine Sergeant'},
      {value: 'combi-plasma', label: 'combi-plasma +4pts', link: 'Tactical Marine Sergeant'},
      {value: 'bolt pistol auspex', label: 'bolt pistol and auspex +1pts', link: 'Tactical Marine Sergeant'},
      {value: 'bolt pistol chainsword', label: 'bolt pistol and chainsword +0pts', link: 'Tactical Marine Sergeant'},
      {value: 'bolt pistol power fist', label: 'bolt pistol and power fist +4pts', link: 'Tactical Marine Sergeant'},
      {value: 'bolt pistol power sword', label: 'bolt pistol and power sword +2pts', link: 'Tactical Marine Sergeant'},
      {value: 'plasma pistol auspex', label: 'plasma pistol and auspex +2pts', link: 'Tactical Marine Sergeant'},
      {value: 'plasma pistol chainsword', label: 'plasma pistol and chainsword +1pts', link: 'Tactical Marine Sergeant'},
      {value: 'plasma pistol power fist', label: 'plasma pistol and power fist +5pts', link: 'Tactical Marine Sergeant'},
      {value: 'plasma pistol power sword', label: 'plasma pistol and power sword +3pts', link: 'Tactical Marine Sergeant'},
      {value: 'grav-pistol auspex', label: 'grav-pistol and auspex +2pts', link: 'Tactical Marine Sergeant'},
      {value: 'grav-pistol chainsword', label: 'grav-pistol and chainsword +1pts', link: 'Tactical Marine Sergeant'},
      {value: 'grav-pistol power fist', label: 'grav-pistol and power fist +5pts', link: 'Tactical Marine Sergeant'},
			{value: 'grav-pistol power sword', label: 'grav-pistol and power sword +3pts', link: 'Tactical Marine Sergeant'},
			
			{value: 'none', label: 'none', link: 'Scout'},
			{value: 'combat knife', label: 'combat knife +0pts', link: 'Scout'},
      {value: 'astartes shotgun', label: 'astartes shotgun +0pts', link: 'Scout'},
			{value: 'sniper rifle camo cloak', label: 'sniper rifle and camo cloak +2pts', link: 'Scout'},
			
			{value: 'none', label: 'none', link: 'Scout Gunner'},
			{value: 'heavy bolter', label: 'heavy bolter +3pts', link: 'Scout Gunner'},
      {value: 'missile launcher', label: 'missile launcher +5pts', link: 'Scout Gunner'},
      {value: 'missile launcher camo cloak', label: 'missile launcher and camo cloak +6pts', link: 'Scout Gunner'},
			{value: 'sniper rifle camo cloak', label: 'sniper rifle and camo cloak +2pts', link: 'Scout Gunner'},
			
			{value: 'none', label: 'none', link: 'Scout Sergeant'},
			{value: 'astartes shotgun', label: 'astartes shotgun +0pts', link: 'Scout Sergeant'},
      {value: 'chainsword', label: 'chainsword +0pts', link: 'Scout Sergeant'},
			{value: 'sniper rifle camo cloak', label: 'sniper rifle and camo cloak +2pts', link: 'Scout Sergeant'},
			
			{value: 'none', label: 'none', link: 'Intercessor'},
			{value: 'auto bolt rifle', label: 'auto bolt rifle +0pts', link: 'Intercessor'},
			{value: 'stalker bolt rifle', label: 'stalker bolt rifle +0pts', link: 'Intercessor'},
			
			{value: 'none', label: 'none', link: 'Intercessor Gunner'},
			{value: 'auxiliary grenade launcher', label: 'auxiliary grenade launcher +0pts', link: 'Intercessor Gunner'},

			{value: 'none', label: 'none', link: 'Intercessor Sergeant'},
			{value: 'chainsword', label: 'chainsword +0pts', link: 'Intercessor Sergeant'},
			{value: 'power sword', label: 'power sword +2pts', link: 'Intercessor Sergeant'},
			
			{value: 'none', label: 'none', link: 'Reiver'},
			{value: 'combat knife', label: 'combat knife +0pts', link: 'Reiver'},
			
			{value: 'none', label: 'none', link: 'Reiver Sergeant'},
			{value: 'combat knife', label: 'combat knife +0pts', link: 'Reiver Sergeant'},

			{value: 'none', label: 'none', link: 'Deathwatch Veteran'},
			{value: 'combi-melta', label: 'combi-melta +3pts', link: 'Deathwatch Veteran'},
      {value: 'combi-plasma', label: 'combi-plasma +4pts', link: 'Deathwatch Veteran'},
      {value: 'stalker pattern boltgun', label: 'stalker pattern boltgun +1pts', link: 'Deathwatch Veteran'},
      {value: 'power sword', label: 'power sword +2pts', link: 'Deathwatch Veteran'},
      {value: 'power maul', label: 'power maul +2pts', link: 'Deathwatch Veteran'},
			{value: 'storm shield', label: 'storm shield +3pts', link: 'Deathwatch Veteran'},
			
			{value: 'none', label: 'none', link: 'Deathwatch Veteran Gunner'},
			{value: 'deathwatch frag cannon', label: 'deathwatch frag cannon +5pts', link: 'Deathwatch Veteran Gunner'},
			{value: 'infernus heavy bolter', label: 'infernus heavy bolter +2pts', link: 'Deathwatch Veteran Gunner'},
			
			{value: 'none', label: 'none', link: 'Watch Sergeant'},
			{value: 'xenophase blade', label: 'xenophase blade +3pts', link: 'Watch Sergeant'},

			{value: 'none', label: 'none', link: 'Grey Knight'},
			{value: 'nemesis force halberd', label: 'nemesis force halberd +0pts', link: 'Grey Knight'},
      {value: 'nemesis daemon hammer', label: 'nemesis daemon hammer +2pts', link: 'Grey Knight'},
      {value: 'nemesis warding stave', label: 'nemesis warding stave +0pts', link: 'Grey Knight'},
			{value: 'two nemesis falchions', label: 'two nemesis falchions +1pts', link: 'Grey Knight'},
			
			{value: 'none', label: 'none', link: 'Grey Knight Gunner'},
			{value: 'incenerator', label: 'incenerator +3pts', link: 'Grey Knight Gunner'},
      {value: 'psilencer', label: 'psilencer +3pts', link: 'Grey Knight Gunner'},
			{value: 'psycannon', label: 'psycannon +2pts', link: 'Grey Knight Gunner'},
			
			{value: 'none', label: 'none', link: 'Justicar'},
			{value: 'nemesis force halberd', label: 'nemesis force halberd +0pts', link: 'Justicar'},
      {value: 'nemesis daemon hammer', label: 'nemesis daemon hammer +2pts', link: 'Justicar'},
      {value: 'nemesis warding stave', label: 'nemesis warding stave +0pts', link: 'Justicar'},
			{value: 'two nemesis falchions', label: 'two nemesis falchions +1pts', link: 'Justicar'},

			{value: 'none', label: 'none', link: 'Guardsman Gunner'},
      {value: 'flamer', label: 'flamer +3pts', link: 'Guardsman Gunner'},
      {value: 'grenade launcher', label: 'grenade launcher +2pts', link: 'Guardsman Gunner'},
      {value: 'meltagun', label: 'meltagun +3pts', link: 'Guardsman Gunner'},
      {value: 'plasma gun', label: 'plasma gun +3pts', link: 'Guardsman Gunner'},
			{value: 'sniper rifle', label: 'sniper rifle +1pts', link: 'Guardsman Gunner'},
			
	    {value: 'none', label: 'none', link: 'Sergeant'},
	    {value: 'bolt pistol', label: 'bolt pistol +0pts', link: 'Sergeant'},
	    {value: 'plasma pistol', label: 'plasma pistol +1pts', link: 'Sergeant'},
	    {value: 'power sword', label: 'power sword +1pts', link: 'Sergeant'},
	    {value: 'bolt pistol power sword', label: 'bolt pistol and power sword +1pts', link: 'Sergeant'},
			{value: 'plasma pistol power sword', label: 'plasma pistol and power sword +2pts', link: 'Sergeant'},

			{value: 'none', label: 'none', link: 'Special Weapons Guardsman'},

			{value: 'none', label: 'none', link: 'Special Weapons Gunner'},
      {value: 'flamer', label: 'flamer +3pts', link: 'Special Weapons Gunner'},
      {value: 'grenade launcher', label: 'grenade launcher +2pts', link: 'Special Weapons Gunner'},
      {value: 'meltagun', label: 'meltagun +3pts', link: 'Special Weapons Gunner'},
      {value: 'plasma gun', label: 'plasma gun +3pts', link: 'Special Weapons Gunner'},
			{value: 'sniper rifle', label: 'sniper rifle +1pts', link: 'Special Weapons Gunner'},

			{value: 'none', label: 'none', link: 'Scion Gunner'},
			{value: 'flamer', label: 'flamer +3pts', link: 'Scion Gunner'},
      {value: 'meltagun', label: 'meltagun +3pts', link: 'Scion Gunner'},
      {value: 'plasma gun', label: 'plasma gun +3pts', link: 'Scion Gunner'},
			{value: 'hot-shot volley gun', label: 'hot-shot volley gun +3pts', link: 'Scion Gunner'},

	    {value: 'none', label: 'none', link: 'Tempestor'},
	    {value: 'bolt pistol', label: 'bolt pistol +0pts', link: 'Tempestor'},
	    {value: 'plasma pistol', label: 'plasma pistol +1pts', link: 'Tempestor'},
	    {value: 'power sword', label: 'power sword +1pts', link: 'Tempestor'},
	    {value: 'power fist', label: 'power fist +2pts', link: 'Tempestor'},
	    {value: 'bolt pistol power sword', label: 'bolt pistol and power sword +1pts', link: 'Tempestor'},
			{value: 'plasma pistol power sword', label: 'plasma pistol and power sword +2pts', link: 'Tempestor'},
	    {value: 'bolt pistol power fist', label: 'bolt pistol and power fist +2pts', link: 'Tempestor'},
			{value: 'plasma pistol power fist', label: 'plasma pistol and power fist +3pts', link: 'Tempestor'},

			{value: 'none', label: 'none', link: 'Ranger Gunner'},
			{value: 'arc rifle', label: 'arc rifle +0pts', link: 'Ranger Gunner'},
			{value: 'plasma caliver', label: 'plasma caliver +3pts', link: 'Ranger Gunner'},
			{value: 'transuranic arquebus', label: 'transuranic arquebus +5pts', link: 'Ranger Gunner'},

			{value: 'none', label: 'none', link: 'Ranger Alpha'},
			{value: 'arc pistol arc maul', label: 'arc pistol and arc maul +0pts', link: 'Ranger Alpha'},
			{value: 'arc pistol power sword', label: 'arc pistol and power sword +0pts', link: 'Ranger Alpha'},
			{value: 'arc pistol taser goad', label: 'arc pistol and taser goad +1pts', link: 'Ranger Alpha'},
			{value: 'radium pistol arc maul', label: 'radium pistol and arc maul +0pts', link: 'Ranger Alpha'},
			{value: 'radium pistol power sword', label: 'radium pistol and power sword +0pts', link: 'Ranger Alpha'},
			{value: 'radium pistol taser goad', label: 'radium pistol and taser goad +1pts', link: 'Ranger Alpha'},
			{value: 'phosphor blast pistol arc maul', label: 'phosphor blast pistol and arc maul +0pts', link: 'Ranger Alpha'},
			{value: 'phosphor blast pistol power sword', label: 'phosphor blast pistol and power sword +0pts', link: 'Ranger Alpha'},
			{value: 'phosphor blast pistol taser goad', label: 'phosphor blast pistol and taser goad +1pts', link: 'Ranger Alpha'},

			{value: 'none', label: 'none', link: 'Vanguard Gunner'},
			{value: 'arc rifle', label: 'arc rifle +0pts', link: 'Vanguard Gunner'},
			{value: 'plasma caliver', label: 'plasma caliver +3pts', link: 'Vanguard Gunner'},
			{value: 'transuranic arquebus', label: 'transuranic arquebus +5pts', link: 'Vanguard Gunner'},

			{value: 'none', label: 'none', link: 'Vanguard Alpha'},
			{value: 'arc pistol arc maul', label: 'arc pistol and arc maul +0pts', link: 'Vanguard Alpha'},
			{value: 'arc pistol power sword', label: 'arc pistol and power sword +0pts', link: 'Vanguard Alpha'},
			{value: 'arc pistol taser goad', label: 'arc pistol and taser goad +1pts', link: 'Vanguard Alpha'},
			{value: 'radium pistol arc maul', label: 'radium pistol and arc maul +0pts', link: 'Vanguard Alpha'},
			{value: 'radium pistol power sword', label: 'radium pistol and power sword +0pts', link: 'Vanguard Alpha'},
			{value: 'radium pistol taser goad', label: 'radium pistol and taser goad +1pts', link: 'Vanguard Alpha'},
			{value: 'phosphor blast pistol arc maul', label: 'phosphor blast pistol and arc maul +0pts', link: 'Vanguard Alpha'},
			{value: 'phosphor blast pistol power sword', label: 'phosphor blast pistol and power sword +0pts', link: 'Vanguard Alpha'},
			{value: 'phosphor blast pistol taser goad', label: 'phosphor blast pistol and taser goad +1pts', link: 'Vanguard Alpha'},

			{value: 'none', label: 'none', link: 'Sicarian Ruststalker'},
			{value: 'transonic blades', label: 'transonic blades +0pts', link: 'Sicarian Ruststalker'},

			{value: 'none', label: 'none', link: 'Ruststalker Princeps'},
			{value: 'transonic blades', label: 'transonic blades +0pts', link: 'Ruststalker Princeps'},

			{value: 'none', label: 'none', link: 'Sicarian Infiltrator'},
			{value: 'flechette blaster taser goad', label: 'flechette blaster and taser goad +1pts', link: 'Sicarian Infiltrator'},

			{value: 'none', label: 'none', link: 'Infiltrator Princeps'},
			{value: 'flechette blaster taser goad', label: 'flechette blaster and taser goad +1pts', link: 'Infiltrator Princeps'},

			{value: 'none', label: 'none', link: 'Chaos Cultist'},
			{value: 'brutal assault weapon autopistol', label: 'brutal assault and weapon autopistol +0pts', link: 'Chaos Cultist'},

			{value: 'none', label: 'none', link: 'Chaos Cultist Gunner'},
			{value: 'flamer', label: 'flamer +3pts', link: 'Chaos Cultist Gunner'},
			{value: 'heavy stubber', label: 'heavy stubber +0pts', link: 'Chaos Cultist Gunner'},

			{value: 'none', label: 'none', link: 'Cultist Champion'},
			{value: 'shotgun', label: 'shotgun +0pts', link: 'Cultist Champion'},
			{value: 'brutal assault weapon autopistol', label: 'brutal assault and weapon autopistol +0pts', link: 'Cultist Champion'},

			{value: 'none', label: 'none', link: 'Chaos Space Marine'},
			{value: 'chainsword', label: 'chainsword +0pts', link: 'Chaos Space Marine'},

			{value: 'none', label: 'none', link: 'Chaos Space Marine Gunner'},
			{value: 'flamer', label: 'flamer +3pts', link: 'Chaos Space Marine Gunner'},
			{value: 'meltagun', label: 'meltagun +3pts', link: 'Chaos Space Marine Gunner'},
			{value: 'plasma gun', label: 'plasma gun +3pts', link: 'Chaos Space Marine Gunner'},
			{value: 'heavy bolter', label: 'heavy bolter +3pts', link: 'Chaos Space Marine Gunner'},

			{value: 'none', label: 'none', link: 'Aspiring Champion'},
      {value: 'bolt pistol chainsword', label: 'bolt pistol and chainsword +0pts', link: 'Aspiring Champion'},
      {value: 'bolt pistol power fist', label: 'bolt pistol and power fist +4pts', link: 'Aspiring Champion'},
      {value: 'bolt pistol power sword', label: 'bolt pistol and power sword +2pts', link: 'Aspiring Champion'},
      {value: 'plasma pistol chainsword', label: 'plasma pistol and chainsword +1pts', link: 'Aspiring Champion'},
      {value: 'plasma pistol power fist', label: 'plasma pistol and power fist +5pts', link: 'Aspiring Champion'},
			{value: 'plasma pistol power sword', label: 'plasma pistol and power sword +3pts', link: 'Aspiring Champion'},

			{value: 'none', label: 'none', link: 'Plague Marine Gunner'},
			{value: 'blight launcher', label: 'blight launcher +3pts', link: 'Plague Marine Gunner'},
			{value: 'meltagun', label: 'meltagun +3pts', link: 'Plague Marine Gunner'},
			{value: 'plague spewer', label: 'plague spewer +4pts', link: 'Plague Marine Gunner'},
			{value: 'plague belcher', label: 'plague belcher +3pts', link: 'Plague Marine Gunner'},
			{value: 'plasma gun', label: 'plasma gun +3pts', link: 'Plague Marine Gunner'},

			{value: 'none', label: 'none', link: 'Plague Marine Fighter'},
			{value: 'bubotic axe', label: 'bubotic axe +2pts', link: 'Plague Marine Fighter'},
			{value: 'great plague cleaver', label: 'great plague cleaver +4pts', link: 'Plague Marine Fighter'},
			{value: 'flail of corruption', label: 'flail of corruption +4pts', link: 'Plague Marine Fighter'},
			{value: 'second plague knife', label: 'second plague knife +0pts', link: 'Plague Marine Fighter'},
			{value: 'mace of contagion bubotic axe', label: 'mace of contagion and bubotic axe +5pts', link: 'Plague Marine Fighter'},

			{value: 'none', label: 'none', link: 'Plague Champion'},
			{value: 'plaguesword', label: 'plaguesword +0pts', link: 'Plague Champion'},
			{value: 'bolt pistol', label: 'bolt pistol +0pts', link: 'Plague Champion'},
			{value: 'plasma pistol', label: 'plasma pistol +1pts', link: 'Plague Champion'},
			{value: 'plasma gun', label: 'plasma gun +3pts', link: 'Plague Champion'},
			{value: 'power fist', label: 'power fist +4pts', link: 'Plague Champion'},
			{value: 'plaguesword bolt pistol', label: 'plaguesword and bolt pistol +0pts', link: 'Plague Champion'},
			{value: 'plaguesword plasma pistol', label: 'plaguesword and plasma pistol +1pts', link: 'Plague Champion'},
			{value: 'plaguesword plasma gun', label: 'plaguesword and plasma gun +3pts', link: 'Plague Champion'},
			{value: 'power fist bolt pistol', label: 'power fist and bolt pistol +4pts', link: 'Plague Champion'},
			{value: 'power fist plasma pistol', label: 'power fist and plasma pistol +5pts', link: 'Plague Champion'},
			{value: 'power fist plasma gun', label: 'power fist and plasma gun +7pts', link: 'Plague Champion'},

			{value: 'none', label: 'none', link: 'Rubric Marine'},
			{value: 'Icon of Flame', label: 'Icon of Flame +1pts', link: 'Rubric Marine'},
			{value: 'warpflamer', label: 'warpflamer +4pts', link: 'Rubric Marine'},
			
			{value: 'none', label: 'none', link: 'Rubric Marine Gunner'},
			{value: 'soulreaper cannon', label: 'soulreaper cannon +4pts', link: 'Rubric Marine Gunner'},
			
			{value: 'none', label: 'none', link: 'Aspiring Sorcerer'},
			{value: 'warpflame pistol', label: 'warpflame pistol +1pts', link: 'Aspiring Sorcerer'},
			
			{value: 'none', label: 'none', link: 'Tzaangor'},
			{value: 'Brayhorn', label: 'Brayhorn +3pts', link: 'Tzaangor'},
			{value: 'autopistol chainsword', label: 'autopistol and chainsword +0pts', link: 'Tzaangor'},
			
			{value: 'none', label: 'none', link: 'Heavy Weapon Platform'},
			{value: 'aeldari missile launcher', label: 'aeldari missile launcher +5pts', link: 'Heavy Weapon Platform'},
			{value: 'bright lance', label: 'bright lance +4pts', link: 'Heavy Weapon Platform'},
			{value: 'scatter laser', label: 'scatter laser +2pts', link: 'Heavy Weapon Platform'},
			{value: 'starcannon', label: 'starcannon +3pts', link: 'Heavy Weapon Platform'},
			
			{value: 'none', label: 'none', link: 'Storm Guardian'},
			{value: 'chainsword', label: 'chainsword +0pts', link: 'Storm Guardian'},
			
			{value: 'none', label: 'none', link: 'Storm Guardian Gunner'},
			{value: 'flamer', label: 'flamer +3pts', link: 'Storm Guardian Gunner'},
			{value: 'fusion gun', label: 'fusion gun +3pts', link: 'Storm Guardian Gunner'},
			
			{value: 'none', label: 'none', link: 'Dire Avenger Exarch'},
			{value: 'two avenger shuriken catapults', label: 'two avenger shuriken catapults +0pts', link: 'Dire Avenger Exarch'},
			{value: 'shuriken pistol power glaive', label: 'shuriken pistol and power glaive +1pts', link: 'Dire Avenger Exarch'},
			{value: 'shuriken pistol diresword', label: 'shuriken pistol and diresword +2pts', link: 'Dire Avenger Exarch'},
			{value: 'shimmershield power glaive', label: 'shimmershield and power glaive +5pts', link: 'Dire Avenger Exarch'},
			
      {value: 'none', label: 'none', link: 'Kabalite Gunner'},
			{value: 'splinter cannon', label: 'splinter cannon +0pts', link: 'Kabalite Gunner'},
			{value: 'dark lance', label: 'dark lance +4pts', link: 'Kabalite Gunner'},
			{value: 'shredder', label: 'shredder +1pts', link: 'Kabalite Gunner'},
			{value: 'blaster', label: 'blaster +3pts', link: 'Kabalite Gunner'},
			
      {value: 'none', label: 'none', link: 'Sybarite'},
			{value: 'power sword', label: 'power sword +2pts', link: 'Sybarite'},
			{value: 'agonizer', label: 'agonizer +2pts', link: 'Sybarite'},
			{value: 'phantasm grenade launcher', label: 'phantasm grenade launcher +1pts', link: 'Sybarite'},
			{value: 'splinter pistol', label: 'splinter pistol +0pts', link: 'Sybarite'},
			{value: 'blast pistol', label: 'blast pistol +2pts', link: 'Sybarite'},
			{value: 'power sword phantasm grenade launcher', label: 'power sword and phantasm grenade launcher +3pts', link: 'Sybarite'},
			{value: 'power sword blast pistol', label: 'agonizer and phantasm grenade launcher +3pts', link: 'Sybarite'},
			{value: 'power sword blast pistol', label: 'power sword and blast pistol +4pts', link: 'Sybarite'},
			{value: 'agonizer blast pistol', label: 'agonizer and blast pistol +4pts', link: 'Sybarite'},
			{value: 'power sword splinter pistol', label: 'power sword and splinter pistol +2pts', link: 'Sybarite'},
			{value: 'agonizer splinter pistol', label: 'agonizer and splinter pistol +2pts', link: 'Sybarite'},
			{value: 'power sword splinter pistol phantasm grenade launcher', label: 'power sword, splinter pistol, and phantasm grenade launcher +3pts', link: 'Sybarite'},
			{value: 'agonizer splinter pistol phantasm grenade launcher', label: 'agonizer, splinter pistol, and phantasm grenade launcher +3pts', link: 'Sybarite'},
			{value: 'power sword blast pistol phantasm grenade launcher', label: 'power sword, blast pistol, and phantasm grenade launcher +5pts', link: 'Sybarite'},
			{value: 'agonizer blast pistol phantasm grenade launcher', label: 'agonizer, blast pistol, and phantasm grenade launcher +5pts', link: 'Sybarite'},
			
      {value: 'none', label: 'none', link: 'Wych Fighter'},
			{value: 'hydra gauntlets', label: 'hydra gauntlets +2pts', link: 'Wych Fighter'},
			{value: 'razorflails', label: 'razorflails +2pts', link: 'Wych Fighter'},
			{value: 'shardnet and impaler', label: 'shardnet and impaler +2pts', link: 'Wych Fighter'},
			
      {value: 'none', label: 'none', link: 'Hekatrix'},
			{value: 'power sword', label: 'power sword +2pts', link: 'Hekatrix'},
			{value: 'agonizer', label: 'agonizer +2pts', link: 'Hekatrix'},
			{value: 'blast pistol', label: 'blast pistol +2pts', link: 'Hekatrix'},
			{value: 'power sword blast pistol', label: 'power sword and blast pistol +4pts', link: 'Hekatrix'},
			{value: 'agonizer blast pistol', label: 'agonizer and blast pistol +4pts', link: 'Hekatrix'},
      {value: 'phantasm grenade launcher', label: 'phantasm grenade launcher +1pts', link: 'Hekatrix'},
      {value: 'power sword phantasm grenade launcher', label: 'power sword phantasm grenade launcher +3pts', link: 'Hekatrix'},
      {value: 'agonizer phantasm grenade launcher', label: 'agonizer phantasm grenade launcher +3pts', link: 'Hekatrix'},
			{value: 'power sword blast pistol phantasm grenade launcher', label: 'power sword, blast pistol, and phantasm grenade launcher +5pts', link: 'Hekatrix'},
			{value: 'agonizer blast pistol phantasm grenade launcher', label: 'agonizer, blast pistol, and phantasm grenade launcher +5pts', link: 'Hekatrix'},
			
			{value: 'none', label: 'none', link: 'Player'},
			{value: 'neuro disruptor', label: 'neuro disruptor +2pts', link: 'Player'},
      {value: 'fusion pistol', label: 'fusion pistol +3pts', link: 'Player'},
      {value: "harlequin's caress", label: "harlequin's caress +3pts", link: "Player"},
      {value: "harlequin's embrace", label: "harlequin's embrace +2pts", link: "Player"},
      {value: "harlequin's kiss", label: "harlequin's kiss +4pts", link: "Player"},
      {value: "neuro disruptor harlequin's caress", label: "neuro disruptor and harlequin's caress +5pts", link: "Player"},
      {value: "neuro disruptor harlequin's embrace", label: "neuro disruptor and harlequin's embrace +4pts", link: "Player"},
      {value: "neuro disruptor harlequin's kiss", label: "neuro disruptor and harlequin's kiss +6pts", link: "Player"},
      {value: "fusion pistol harlequin's caress", label: "fusion pistol and harlequin's caress +6pts", link: "Player"},
      {value: "fusion pistol harlequin's embrace", label: "fusion pistol and harlequin's embrace +5pts", link: "Player"},
			{value: "fusion pistol harlequin's kiss", label: "fusion pistol and harlequin's kiss +7pts", link: "Player"},
			
			{value: 'none', label: 'none', link: 'Immortal'},
			{value: 'tesla carbine', label: 'tesla carbine +0pts', link: 'Immortal'},
			
			{value: 'none', label: 'none', link: 'Ork Boy'},
			{value: 'shoota', label: 'shoota +0pts', link: 'Ork Boy'},
			
			{value: 'none', label: 'none', link: 'Ork Boy Gunner'},
			{value: 'big shoota', label: 'big shoota +0pts', link: 'Ork Boy Gunner'},
			{value: 'rokkit launcha', label: 'rokkit launcha +3pts', link: 'Ork Boy Gunner'},
			
			{value: 'none', label: 'none', link: 'Boss Nob'},
			{value: 'big choppa', label: 'big choppa +2pts', link: 'Boss Nob'},
			{value: 'power klaw', label: 'power klaw +4pts', link: 'Boss Nob'},
			{value: 'kombi-weapon with rokkit launcha', label: 'kombi-weapon with rokkit launcha +3pts', link: 'Boss Nob'},
			{value: 'big choppa kombi-weapon with rokkit launcha', label: 'big choppa and kombi-weapon with rokkit launcha +5pts', link: 'Boss Nob'},
			{value: 'kombi-weapon with skorcha', label: 'kombi-weapon with skorcha +4pts', link: 'Boss Nob'},
			{value: 'big choppa kombi-weapon with skorcha', label: 'big choppa and kombi-weapon with skorcha +6pts', link: 'Boss Nob'},
			{value: 'power klaw kombi-weapon with rokkit launcha', label: 'power klaw and kombi-weapon with rokkit launcha +7pts', link: 'Boss Nob'},
			{value: 'power klaw kombi-weapon with skorcha', label: 'power klaw and kombi-weapon with skorcha +8pts', link: 'Boss Nob'},
			
			{value: 'none', label: 'none', link: 'Kommando Boss Nob'},
			{value: 'power klaw', label: 'power klaw +4pts', link: 'Kommando Boss Nob'},
			
			{value: 'none', label: 'none', link: 'Burna Spanner'},
			{value: 'kustom mega-blasta', label: 'kustom mega-blasta +0pts', link: 'Burna Spanner'},
			{value: 'rokkit launcha', label: 'rokkit launcha +3pts', link: 'Burna Spanner'},
			
			{value: 'none', label: 'none', link: 'Loota Spanner'},
			{value: 'kustom mega-blasta', label: 'kustom mega-blasta +0pts', link: 'Loota Spanner'},
			{value: 'rokkit launcha', label: 'rokkit launcha +3pts', link: 'Loota Spanner'},
			
			{value: 'none', label: 'none', link: 'Shasla'},
			{value: 'pulse carbine', label: 'pulse carbine +0pts', link: 'Shasla'},
			{value: 'pulse pistol', label: 'pulse pistol +0pts', link: 'Shasla'},
			
			{value: 'none', label: 'none', link: 'Shasui'},
			{value: 'pulse carbine', label: 'pulse carbine +0pts', link: 'Shasui'},
			{value: 'pulse pistol', label: 'pulse pistol +0pts', link: 'Shasui'},
			{value: 'markerlight', label: 'markerlight +0pts', link: 'Shasui'},
			{value: 'pulse carbine markerlight', label: 'pulse carbine and markerlight +0pts', link: 'Shasui'},
			{value: 'pulse pistol markerlight', label: 'pulse pistol and markerlight +0pts', link: 'Shasui'},
			
			{value: 'none', label: 'none', link: 'Pathfinder Gunner'},
			{value: 'ion rifle', label: 'ion rifle +3pts', link: 'Pathfinder Gunner'},
			{value: 'rail rifle', label: 'rail rifle +5pts', link: 'Pathfinder Gunner'},
			
			{value: 'none', label: 'none', link: 'Pathfinder Shasui'},
			{value: 'pulse pistol', label: 'pulse pistol +0pts', link: 'Pathfinder Shasui'},
			
			{value: 'none', label: 'none', link: 'Breacher Shasla'},
			{value: 'pulse pistol', label: 'pulse pistol +0pts', link: 'Breacher Shasla'},
			
			{value: 'none', label: 'none', link: 'Breacher Shasui'},
			{value: 'pulse pistol', label: 'pulse pistol +0pts', link: 'Breacher Shasui'},
			{value: 'markerlight', label: 'markerlight +0pts', link: 'Breacher Shasui'},
			{value: 'pulse pistol markerlight', label: 'pulse pistol and markerlight +0pts', link: 'Breacher Shasui'},
			
			{value: 'none', label: 'none', link: 'Stealth Shasui'},
			{value: 'fusion blaster', label: 'fusion blaster +4pts', link: 'Stealth Shasui'},
			
			{value: 'none', label: 'none', link: 'Stealth Shasvre'},
			{value: 'fusion blaster', label: 'fusion blaster +4pts', link: 'Stealth Shasvre'},
			{value: 'markerlight and target lock', label: 'markerlight and target lock +1pts', link: 'Stealth Shasvre'},
			{value: 'fusion blaster markerlight and target lock', label: 'fusion blaster, markerlight, and target lock +5pts', link: 'Stealth Shasvre'},
			
			{value: 'none', label: 'none', link: 'Termagant'},
			{value: 'devourer', label: 'devourer +3pts', link: 'Termagant'},
			{value: 'spinefists', label: 'spinefists +0pts', link: 'Termagant'},
			
			{value: 'none', label: 'none', link: 'Tyranid Warrior'},
			{value: 'rending claws', label: 'rending claws +0pts', link: 'Tyranid Warrior'},
			{value: 'boneswords', label: 'boneswords +0pts', link: 'Tyranid Warrior'},
			{value: 'lash whip and bonesword', label: 'lash whip and bonesword +1pts', link: 'Tyranid Warrior'},
			{value: 'deathspitter', label: 'deathspitter +2pts', link: 'Tyranid Warrior'},
			{value: 'rending claws deathspitter', label: 'rending claws and deathspitter +2pts', link: 'Tyranid Warrior'},
			{value: 'boneswords deathspitter', label: 'boneswords and deathspitter +2pts', link: 'Tyranid Warrior'},
			{value: 'lash whip and bonesword deathspitter', label: 'lash whip and bonesword and deathspitter +3pts', link: 'Tyranid Warrior'},
			{value: 'spinefists', label: 'spinefists +0pts', link: 'Tyranid Warrior'},
			{value: 'rending claws spinefists', label: 'rending claws and spinefists +1pts', link: 'Tyranid Warrior'},
			{value: 'boneswords spinefists', label: 'boneswords and spinefists +0pts', link: 'Tyranid Warrior'},
			{value: 'lash whip and bonesword spinefists', label: 'lash whip and bonesword and spinefists +1pts', link: 'Tyranid Warrior'},
			{value: 'rending claws x2', label: 'rending claws x2 +0pts', link: 'Tyranid Warrior'},
			{value: 'scything talons rending claws', label: 'scything talons and rending claws +0pts', link: 'Tyranid Warrior'},
			{value: 'boneswords rending claws', label: 'boneswords and rending claws +0pts', link: 'Tyranid Warrior'},
			{value: 'lash whip and bonesword rending claws', label: 'lash whip and bonesword and rending claws +1pts', link: 'Tyranid Warrior'},
			{value: 'scything talons x2', label: 'scything talons x2 +0pts', link: 'Tyranid Warrior'},
			{value: 'boneswords scything talons', label: 'boneswords and scything talons +0pts', link: 'Tyranid Warrior'},
			{value: 'lash whip and bonesword scything talons', label: 'lash whip and bonesword and scything talons +1pts', link: 'Tyranid Warrior'},
			{value: 'boneswords x2', label: 'boneswords x2 +0pts', link: 'Tyranid Warrior'},
			{value: 'boneswords lash whip and bonesword', label: 'boneswords, lash whip and bonesword +1pts', link: 'Tyranid Warrior'},
			{value: 'lash whip and bonesword x2', label: 'lash whip and bonesword x2 +2pts', link: 'Tyranid Warrior'},
			
			{value: 'none', label: 'none', link: 'Tyranid Warrior Gunner'},
			{value: 'rending claws', label: 'rending claws +0pts', link: 'Tyranid Warrior Gunner'},
			{value: 'boneswords', label: 'boneswords +0pts', link: 'Tyranid Warrior Gunner'},
			{value: 'lash whip and bonesword', label: 'lash whip and bonesword +1pts', link: 'Tyranid Warrior Gunner'},
			{value: 'deathspitter', label: 'deathspitter +2pts', link: 'Tyranid Warrior Gunner'},
			{value: 'rending claws deathspitter', label: 'rending claws and deathspitter +2pts', link: 'Tyranid Warrior Gunner'},
			{value: 'boneswords deathspitter', label: 'boneswords and deathspitter +2pts', link: 'Tyranid Warrior Gunner'},
			{value: 'lash whip and bonesword deathspitter', label: 'lash whip and bonesword and deathspitter +3pts', link: 'Tyranid Warrior Gunner'},
			{value: 'spinefists', label: 'spinefists +0pts', link: 'Tyranid Warrior Gunner'},
			{value: 'rending claws spinefists', label: 'rending claws and spinefists +1pts', link: 'Tyranid Warrior Gunner'},
			{value: 'boneswords spinefists', label: 'boneswords and spinefists +0pts', link: 'Tyranid Warrior Gunner'},
			{value: 'lash whip and bonesword spinefists', label: 'lash whip and bonesword and spinefists +1pts', link: 'Tyranid Warrior Gunner'},
			{value: 'rending claws x2', label: 'rending claws x2 +0pts', link: 'Tyranid Warrior Gunner'},
			{value: 'scything talons rending claws', label: 'scything talons and rending claws +0pts', link: 'Tyranid Warrior Gunner'},
			{value: 'boneswords rending claws', label: 'boneswords and rending claws +0pts', link: 'Tyranid Warrior Gunner'},
			{value: 'lash whip and bonesword rending claws', label: 'lash whip and bonesword and rending claws +1pts', link: 'Tyranid Warrior Gunner'},
			{value: 'scything talons x2', label: 'scything talons x2 +0pts', link: 'Tyranid Warrior Gunner'},
			{value: 'boneswords scything talons', label: 'boneswords and scything talons +0pts', link: 'Tyranid Warrior Gunner'},
			{value: 'lash whip and bonesword scything talons', label: 'lash whip and bonesword and scything talons +1pts', link: 'Tyranid Warrior Gunner'},
			{value: 'boneswords x2', label: 'boneswords x2 +0pts', link: 'Tyranid Warrior Gunner'},
			{value: 'boneswords lash whip and bonesword', label: 'boneswords, lash whip and bonesword +1pts', link: 'Tyranid Warrior Gunner'},
			{value: 'lash whip and bonesword x2', label: 'lash whip and bonesword x2 +2pts', link: 'Tyranid Warrior Gunner'},
			{value: 'barbed strangler', label: 'barbed strangler +3pts', link: 'Tyranid Warrior Gunner'},
			{value: 'rending claws barbed strangler', label: 'rending claws and barbed strangler +3pts', link: 'Tyranid Warrior Gunner'},
			{value: 'boneswords barbed strangler', label: 'boneswords and barbed strangler +3pts', link: 'Tyranid Warrior Gunner'},
			{value: 'lash whip and bonesword barbed strangler', label: 'lash whip and bonesword, barbed strangler +4pts', link: 'Tyranid Warrior Gunner'},
			{value: 'venom cannon', label: 'venom cannon +4pts', link: 'Tyranid Warrior Gunner'},
			{value: 'rending claws venom cannon', label: 'rending claws and venom cannon +4pts', link: 'Tyranid Warrior Gunner'},
			{value: 'boneswords venom cannon', label: 'boneswords and venom cannon +4pts', link: 'Tyranid Warrior Gunner'},
			{value: 'lash whip and bonesword venom cannon', label: 'lash whip and bonesword, venom cannon +5pts', link: 'Tyranid Warrior Gunner'},
			
			{value: 'none', label: 'none', link: 'Genestealer'},
			{value: 'scything talons', label: 'scything talons +0pts', link: 'Genestealer'},
			{value: 'flesh hooks', label: 'flesh hooks +0pts', link: 'Genestealer'},
			{value: 'scything talons flesh hooks', label: 'scything talons and flesh hooks +0pts', link: 'Genestealer'},
			{value: 'acid maw', label: 'acid maw +0pts', link: 'Genestealer'},
			{value: 'scything talons acid maw', label: 'scything talons and acid maw +0pts', link: 'Genestealer'},
			
			{value: 'none', label: 'none', link: 'Acolyte Hybrid'},
			{value: 'hand flamer', label: 'hand flamer +2pts', link: 'Acolyte Hybrid'},
      
			{value: 'none', label: 'none', link: 'Acolyte Hybrid Fighter'},
			{value: 'hand flamer', label: 'hand flamer +2pts', link: 'Acolyte Hybrid Fighter'},
			{value: 'heavy rock drill', label: 'heavy rock drill +5pts', link: 'Acolyte Hybrid Fighter'},
			{value: 'heavy rock saw', label: 'heavy rock saw +4pts', link: 'Acolyte Hybrid Fighter'},
			{value: 'heavy rock cutter', label: 'heavy rock cutter +4pts', link: 'Acolyte Hybrid Fighter'},
			{value: 'demolition charges', label: 'demolition charges +3pts', link: 'Acolyte Hybrid Fighter'},
			{value: 'hand flamer heavy rock drill', label: 'hand flamer and heavy rock drill +7pts', link: 'Acolyte Hybrid Fighter'},
			{value: 'hand flamer heavy rock saw', label: 'hand flamer and heavy rock saw +6pts', link: 'Acolyte Hybrid Fighter'},
			{value: 'hand flamer heavy rock cutter', label: 'hand flamer and heavy rock cutter +6pts', link: 'Acolyte Hybrid Fighter'},
			{value: 'hand flamer demolition charges', label: 'hand flamer and demolition charges +5pts', link: 'Acolyte Hybrid Fighter'},
			
			{value: 'none', label: 'none', link: 'Acolyte Leader'},
			{value: 'hand flamer', label: 'hand flamer +2pts', link: 'Acolyte Leader'},
			{value: 'bonesword', label: 'bonesword +1pts', link: 'Acolyte Leader'},
			{value: 'lash whip and bonesword', label: 'lash whip and bonesword +2pts', link: 'Acolyte Leader'},
			
			{value: 'none', label: 'none', link: 'Aberrant'},
			{value: 'power hammer', label: 'power hammer +4pts', link: 'Aberrant'},
			
			{value: 'none', label: 'none', link: 'Neophyte Hybrid'},
			{value: 'shotgun', label: 'shotgun +0pts', link: 'Neophyte Hybrid'},
			
			{value: 'none', label: 'none', link: 'Neophyte Gunner'},
			{value: 'shotgun', label: 'shotgun +0pts', link: 'Neophyte Gunner'},
			{value: 'flamer', label: 'flamer +3pts', link: 'Neophyte Gunner'},
			{value: 'grenade launcher', label: 'grenade launcher +2pts', link: 'Neophyte Gunner'},
			{value: 'webber', label: 'webber +1pts', link: 'Neophyte Gunner'},
			{value: 'heavy stubber', label: 'heavy stubber +0pts', link: 'Neophyte Gunner'},
			{value: 'mining laser', label: 'mining laser +3pts', link: 'Neophyte Gunner'},
			{value: 'seismic cannon', label: 'seismic cannon +2pts', link: 'Neophyte Gunner'},
			
			{value: 'none', label: 'none', link: 'Neophyte Leader'},
			{value: 'shotgun', label: 'shotgun +0pts', link: 'Neophyte Leader'},
			{value: 'autopistol chainsword', label: 'autopistol and chainsword +0pts', link: 'Neophyte Leader'},
			{value: 'autopistol power maul', label: 'autopistol and power maul +1pts', link: 'Neophyte Leader'},
			{value: 'autopistol power pick', label: 'autopistol and power pick +3pts', link: 'Neophyte Leader'},
			{value: 'bolt pistol chainsword', label: 'bolt pistol and chainsword +0pts', link: 'Neophyte Leader'},
			{value: 'bolt Pistol power maul', label: 'bolt Pistol and power maul +1pts', link: 'Neophyte Leader'},
			{value: 'bolt pistol power pick', label: 'bolt pistol and power pick +3pts', link: 'Neophyte Leader'},
			{value: 'web pistol chainsword', label: 'web pistol and chainsword +0pts', link: 'Neophyte Leader'},
			{value: 'web pistol power maul', label: 'web pistol and power maul +1pts', link: 'Neophyte Leader'},
			{value: 'web pistol power pick', label: 'web pistol and power pick +3pts', link: 'Neophyte Leader'},
			
			{value: 'none', label: 'none', link: 'Hybrid Metamorph'},
			{value: 'metamorph talon', label: 'metamorph talon +0pts', link: 'Hybrid Metamorph'},
			{value: 'metamorph whip', label: 'metamorph whip +1pts', link: 'Hybrid Metamorph'},
			{value: 'metamorph claw', label: 'metamorph claw +1pts', link: 'Hybrid Metamorph'},
			{value: 'hand flamer metamorph talon', label: 'hand flamer and metamorph talon +2pts', link: 'Hybrid Metamorph'},
			{value: 'hand flamer metamorph whip', label: 'hand flamer and metamorph whip +3pts', link: 'Hybrid Metamorph'},
			{value: 'hand flamer metamorph claw', label: 'hand flamer and metamorph claw +3pts', link: 'Hybrid Metamorph'},
			
			{value: 'none', label: 'none', link: 'Metamorph Leader'},
			{value: 'metamorph talon', label: 'metamorph talon +0pts', link: 'Metamorph Leader'},
			{value: 'metamorph whip', label: 'metamorph whip +1pts', link: 'Metamorph Leader'},
			{value: 'metamorph claw', label: 'metamorph claw +1pts', link: 'Metamorph Leader'},
			{value: 'hand flamer metamorph talon', label: 'hand flamer and metamorph talon +2pts', link: 'Metamorph Leader'},
			{value: 'hand flamer metamorph whip', label: 'hand flamer and metamorph whip +3pts', link: 'Metamorph Leader'},
			{value: 'hand flamer metamorph claw', label: 'hand flamer and metamorph claw +3pts', link: 'Metamorph Leader'},
			{value: 'bonesword metamorph talon', label: 'bonesword metamorph talon +1pts', link: 'Metamorph Leader'},
			{value: 'bonesword metamorph whip', label: 'bonesword metamorph whip +2pts', link: 'Metamorph Leader'},
			{value: 'bonesword metamorph claw', label: 'bonesword metamorph claw +2pts', link: 'Metamorph Leader'},
			{value: 'bonesword hand flamer metamorph talon', label: 'bonesword hand flamer and metamorph talon +3pts', link: 'Metamorph Leader'},
			{value: 'bonesword hand flamer metamorph whip', label: 'bonesword hand flamer and metamorph whip +4pts', link: 'Metamorph Leader'},
			{value: 'bonesword hand flamer metamorph claw', label: 'bonesword hand flamer and metamorph claw +4pts', link: 'Metamorph Leader'},
    ];
		
		const options4 = [
			{value: 'none', label: 'none', link: 'Reiver'},
      {value: 'Grav-Chute', label: 'Grav-Chute +1pts', link: 'Reiver'},
			{value: 'Grapnel Launcher', label: 'Grapnel Launcher +1pts', link: 'Reiver'},
			{value: 'Grav-Chute Grapnel Launcher', label: 'Grav-Chute and Grapnel Launcher +2pts', link: 'Reiver'},
			
      {value: 'none', label: 'none', link: 'Reiver Sergeant'},
      {value: 'Grav-Chute', label: 'Grav-Chute +1pts', link: 'Reiver Sergeant'},
			{value: 'Grapnel Launcher', label: 'Grapnel Launcher +1pts', link: 'Reiver Sergeant'},
			{value: 'Grav-Chute Grapnel Launcher', label: 'Grav-Chute and Grapnel Launcher +2pts', link: 'Reiver Sergeant'},
			
			{value: 'none', label: 'none', link: 'Guardsman'},
			{value: 'Vox-Caster', label: 'Vox-Caster +5pts', link: 'Guardsman'},
			
			{value: 'none', label: 'none', link: 'Scion'},
			{value: 'Vox-Caster', label: 'Vox-Caster +5pts', link: 'Scion'},
			
			{value: 'none', label: 'none', link: 'Skitarii Ranger'},
			{value: 'Enhanced Data-Tether', label: 'Enhanced Data-Tether +5pts', link: 'Skitarii Ranger'},
			{value: 'Omnispex', label: 'Omnispex +1pts', link: 'Skitarii Ranger'},
			
			{value: 'none', label: 'none', link: 'Skitarii Vanguard'},
			{value: 'Enhanced Data-Tether', label: 'Enhanced Data-Tether +5pts', link: 'Skitarii Vanguard'},
			{value: 'Omnispex', label: 'Omnispex +1pts', link: 'Skitarii Vanguard'},
			
			{value: 'none', label: 'none', link: 'Chaos Space Marine'},
			{value: 'Icon of Despair', label: 'Icon of Despair +3pts', link: 'Chaos Space Marine'},
			{value: 'Icon of Wrath', label: 'Icon of Wrath +5pts', link: 'Chaos Space Marine'},
			{value: 'Icon of Flame', label: 'Icon of Flame +1pts', link: 'Chaos Space Marine'},
			{value: 'Icon of Excess', label: 'Icon of Excess +5pts', link: 'Chaos Space Marine'},
			{value: 'Icon of Vengeance', label: 'Icon of Vengeance +1pts', link: 'Chaos Space Marine'},
			
			{value: 'none', label: 'none', link: 'Plague Marine'},
			{value: 'Icon of Despair', label: 'Icon of Despair +3pts', link: 'Plague Marine'},

			{value: 'none', label: 'none', link: 'Rubric Marine'},
			{value: 'Icon of Flame', label: 'Icon of Flame +1pts', link: 'Rubric Marine'},
			
			{value: 'none', label: 'none', link: 'Tzaangor'},
			{value: 'Brayhorn', label: 'Brayhorn +3pts', link: 'Tzaangor'},
			
			{value: 'none', label: 'none', link: 'Termagant'},
			{value: 'Adrenal Glands', label: 'Adrenal Glands +1pts', link: 'Termagant'},
			{value: 'Toxin Sacs', label: 'Toxin Sacs +1pts', link: 'Termagant'},
			{value: 'Adrenal Glands Toxin Sacs', label: 'Adrenal Glands and Toxin Sacs +2pts', link: 'Termagant'},
						
			{value: 'none', label: 'none', link: 'Hormagaunt'},
			{value: 'Adrenal Glands', label: 'Adrenal Glands +1pts', link: 'Hormagaunt'},
			{value: 'Toxin Sacs', label: 'Toxin Sacs +1pts', link: 'Hormagaunt'},
			{value: 'Adrenal Glands Toxin Sacs', label: 'Adrenal Glands and Toxin Sacs +2pts', link: 'Hormagaunt'},

			{value: 'none', label: 'none', link: 'Genestealer'},
			{value: 'Extended Carapace', label: 'Extended Carapace +0pts', link: 'Genestealer'},
			{value: 'Toxin Sacs', label: 'Toxin Sacs +1pts', link: 'Genestealer'},
			{value: 'Extended Carapace Toxin Sacs', label: 'Extended Carapace and Toxin Sacs +1pts', link: 'Genestealer'},

			{value: 'none', label: 'none', link: 'Tyranid Warrior'},
			{value: 'Toxin Sacs', label: 'Toxin Sacs +1pts', link: 'Tyranid Warrior'},
			{value: 'Adrenal Glands', label: 'Adrenal Glands +1pts', link: 'Tyranid Warrior'},
			{value: 'flesh hooks', label: 'flesh hooks +0pts', link: 'Tyranid Warrior'},
			{value: 'Adrenal Glands Toxin Sacs', label: 'Adrenal Glands and Toxin Sacs +2pts', link: 'Tyranid Warrior'},
			{value: 'Adrenal Glands flesh hooks', label: 'Adrenal Glands and flesh hooks +1pts', link: 'Tyranid Warrior'},
			{value: 'Toxin Sacs flesh hooks', label: 'Toxin Sacs and flesh hooks +1pts', link: 'Tyranid Warrior'},
			{value: 'Adrenal Glands Toxin Sacs flesh hooks', label: 'Adrenal Glands, Toxin Sacs, and flesh hooks +2pts', link: 'Tyranid Warrior'},

			{value: 'none', label: 'none', link: 'Tyranid Warrior Gunner'},
			{value: 'Toxin Sacs', label: 'Toxin Sacs +1pts', link: 'Tyranid Warrior Gunner'},
			{value: 'Adrenal Glands', label: 'Adrenal Glands +1pts', link: 'Tyranid Warrior Gunner'},
			{value: 'flesh hooks', label: 'flesh hooks +0pts', link: 'Tyranid Warrior Gunner'},
			{value: 'Adrenal Glands Toxin Sacs', label: 'Adrenal Glands and Toxin Sacs +2pts', link: 'Tyranid Warrior Gunner'},
			{value: 'Adrenal Glands flesh hooks', label: 'Adrenal Glands and flesh hooks +1pts', link: 'Tyranid Warrior Gunner'},
			{value: 'Toxin Sacs flesh hooks', label: 'Toxin Sacs and flesh hooks +1pts', link: 'Tyranid Warrior Gunner'},
			{value: 'Adrenal Glands Toxin Sacs flesh hooks', label: 'Adrenal Glands, Toxin Sacs, and flesh hooks +2pts', link: 'Tyranid Warrior Gunner'},

			{value: 'none', label: 'none', link: 'Acolyte Hybrid'},
			{value: 'Cult Icon', label: 'Cult Icon +5pts', link: 'Acolyte Hybrid'},

			{value: 'none', label: 'none', link: 'Neophyte Hybrid'},
			{value: 'Cult Icon', label: 'Cult Icon +5pts', link: 'Neophyte Hybrid'},

			{value: 'none', label: 'none', link: 'Hybrid Metamorph'},
			{value: 'Cult Icon', label: 'Cult Icon +5pts', link: 'Hybrid Metamorph'},
		]
    const filteredOptions = options2.filter((o) => o.link === this.state.race.value)
    const filteredOptions2 = options3.filter((o) => o.link === this.state.unitType.value)
		const filteredOptions3 = options4.filter((o) => o.link === this.state.unitType.value)
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h2>Add a Squad Member</h2>
              <h2>{this.state.race.label}</h2>
            </Jumbotron>
            <form>
              <div>
              <h6 className="text-light">Race</h6>
                <Select
                  name="race"
                  value={{label : this.state.race.value}}
                  onChange={this.handleChange1}
                  options={options1}
                />
                <br />
                <h6 className="text-light">Unit Type</h6>
                <Select
                  name="unit-type"
                  value={{label : this.state.unitType.value}}
                  onChange={this.handleChange2}
                  options={filteredOptions}
                />
                <br />
              </div>
							<table>
								<tbody>
								<tr>
									<td
										style={{ "width": "100%"}}
									>
								<Input
									value={this.state.name}
									onChange={this.handleInputChange}
									style={{ "width": "100%"}}
									name="name"
									placeholder="Name (required)"
								/>
								</td>
								<td
									style={{ "float": "left"}}
								>
								<FormBtn
									onClick={this.randomName}
									className="btn btn-success"
								>
									Random
								</FormBtn>
								</td>
								</tr>
								</tbody>
							</table>
              <table>
                <tbody>
                  <tr>
                    <td className="text-light">
                      M
                    </td>
                    <td className="text-light">
                      WS
                    </td>
                    <td className="text-light">
                      BS
                    </td>
                    <td className="text-light">
                      S
                    </td>
                    <td className="text-light">
                      T
                    </td>
                    <td className="text-light">
                      W
                    </td>
                    <td className="text-light">
                      A
                    </td>
                    <td className="text-light">
                      LD
                    </td>
                    <td className="text-light">
                      SV
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <InputNumber 
                        value={this.state.move}
                        onChange={this.handleInputChange}
                        name="move"
                        style={{ "paddingRight": "0", "paddingLeft" : "5px"  }}
                      />
                    </td>
                    <td>
                      <InputNumber 
                        value={this.state.ws}
                        onChange={this.handleInputChange}
                        name="ws"
                        style={{ "paddingRight": "0", "paddingLeft" : "5px"  }}
                      />
                    </td>
                    <td>
                      <InputNumber 
                        value={this.state.bs}
                        onChange={this.handleInputChange}
                        name="bs"
                        style={{ "paddingRight": "0", "paddingLeft" : "5px"  }}
                      />
                    </td>
                    <td>
                      <InputNumber
                        value={this.state.str}
                        onChange={this.handleInputChange}
                        name="str"
                        style={{ "paddingRight": "0", "paddingLeft" : "5px"  }}
                      />
                    </td>
                    <td>
                      <InputNumber 
                        value={this.state.tough}
                        onChange={this.handleInputChange}
                        name="tough"
                        style={{ "paddingRight": "0", "paddingLeft" : "5px"  }}
                      />
                    </td>
                    <td>
                      <InputNumber 
                        value={this.state.wounds}
                        onChange={this.handleInputChange}
                        name="wounds"
                        style={{ "paddingRight": "0", "paddingLeft" : "5px"  }}
                      />
                    </td>
                    <td>
                      <InputNumber
                        value={this.state.att}
                        onChange={this.handleInputChange}
                        name="att"
                        style={{ "paddingRight": "0", "paddingLeft" : "5px"  }}
                      />
                    </td>
                    <td>
                      <InputNumber 
                        value={this.state.ld}
                        onChange={this.handleInputChange}
                        name="ld"
                        style={{ "paddingRight": "0", "paddingLeft" : "5px"  }}
                      />
                    </td>
                    <td>
                      <InputNumber
                        value={this.state.sv}
                        onChange={this.handleInputChange}
                        name="sv"
                        style={{ "paddingRight": "0", "paddingLeft" : "5px"  }}
                      />
                    </td>
                  </tr>
                    <tr className="text-light">
                      <td>
                        PTS
                      </td>
                      <td>
                        &nbsp;
                      </td>
                      <td>
                        Wargear
                      </td>
                      <td>
                        &nbsp;
                      </td>
                      <td>
                        Options
                      </td>
                    </tr>
                  <tr>
                    <td>
										<InputNumber
												value={this.state.pts}
												onChange={this.handleInputChange}
												name="pts"
												style={{ paddingRight: "0", paddingLeft : "5px"  }}
											/>
                    </td>
										<td className="text-light" style={{ textAlign : "center", fontSize : "40px", paddingBottom : "25px"}}>
											+
										</td>
                    <td>
                    <InputNumber
                      value={this.state.wargearPts}
                      onChange={this.handleInputChange}
                      name="wargearPts"
                      style={{ paddingRight: "0", paddingLeft : "5px"  }}
                    />
                    </td>
										<td className="text-light" style={{ textAlign : "center", fontSize : "40px", paddingBottom : "25px"}}>
											+
										</td>
                    <td>
                    <InputNumber
                      value={this.state.wargearPts2}
                      onChange={this.handleInputChange}
                      name="wargearPts2"
                      style={{ paddingRight: "0", paddingLeft : "5px"  }}
                    />
                    </td>
                  </tr>
                </tbody>
              </table>
              <TextArea
                value={this.state.equipment}
                onChange={this.handleInputChange}
                name="equipment"
                placeholder="Equipment"
              />
              <span className="text-light" style={{ float: "left", width : "50%" }}>Wargear Options</span>
							<span className="text-light" style={{ float: "left", width : "50%" }}>Other Options</span>
              <div style={{ float: "left", width : "50%" }}>
								<Select
									name="wargear"
									value={{label : this.state.wargearOptions.value}}
									onChange={this.handleChange3}
									options={filteredOptions2}
								/>
							</div>
							<div style={{ float: "left", width : "50%" }}>
								<Select
									name="other-options"
									value={{label : this.state.wargearOptions2.value}}
									onChange={this.handleChange4}
									options={filteredOptions3}
								/>
							</div>
              <br />
              <FormBtn
                disabled={!(this.state.unitType && this.state.name)}
								onClick={this.handleFormSubmit}
								className="btn btn-success"
              >
                Submit Unit
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h2>Units On My List</h2>
              <h3>Squad Cost: {this.state.total}</h3>
            </Jumbotron>
            {this.state.units.length ? (
              <div>
                <Input
                  value={this.state.squadName}
                  onChange={this.handleInputChange}
                  name="squadName"
                  placeholder="Squad Name"
                />
                <List>
                  {this.state.units.map(unit => (
                    <ListItem key={unit._id}>
											&nbsp;
                      <Link to={"/units/" + unit._id}>
                        <strong>
                          &quot;{unit.name}&quot; {unit.unitType}
                        </strong>
                          &nbsp;
                        <span className="list-points">
                          {unit.pts} points
                        </span>
                      </Link>
                      <DeleteBtn onClick={() => this.deleteUnit(unit._id)} />
                      <Confirm ref={el => this.confirm1 = el} /> 
                    </ListItem>
                  ))}
                </List>
              </div>
            ) : (
              <h3>No Results to Display</h3>
            )}
            <br />
            <FormBtn
              disabled={(this.state.units.length === 0) || (this.state.user == null)}
							onClick={this.handleDatabaseSubmit}
							className="btn btn-success"
            >
              Submit Squad
            </FormBtn>
            <FormBtn
              disabled={(this.state.units.length === 0)}
							onClick={this.deleteAll}
							className="btn btn-danger"
            >
              Delete Squad
            </FormBtn>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Units;
