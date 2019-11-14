import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
// import ReactTooltip from 'react-tooltip'
import randomName from "../../utils/randomName";
// import Options1 from "../../utils/options1";
import options2 from "../../utils/options2";
import options3 from "../../utils/options3";
import options4 from "../../utils/options4";
import options5 from "../../utils/options5";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, InputNumber, TextArea, FormBtn, Radio } from "../../components/Form";
import firebase from "firebase/app";
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
      special: "none",
      demeanour: "",
      chapter: "",
      user: null,
			counter: (Object.values(sessionStorage).length),
    };
    this.handleDatabaseSubmit = this.handleDatabaseSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
    this.handleChange4 = this.handleChange4.bind(this);
    this.handleChange5 = this.handleChange5.bind(this);
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
		switch (this.state.race.value) {
			case "Adeptus Astartes":
			case "Deathwatch":
				if (this.state.chapter === "Imperial Fists") {
					this.setState({name: randomName.if1[Math.floor(Math.random()*10)] + " " + randomName.if2[Math.floor(Math.random()*10)]})
				} else if (this.state.chapter === "Blood Angels") {
					this.setState({name: randomName.ba1[Math.floor(Math.random()*10)] + " " + randomName.ba2[Math.floor(Math.random()*10)]})
				} else if (this.state.chapter === "Raven Guard") {
					this.setState({name: randomName.rg1[Math.floor(Math.random()*10)] + " " + randomName.rg2[Math.floor(Math.random()*10)]})
				} else if (this.state.chapter === "White Scars") {
					this.setState({name: randomName.ws1[Math.floor(Math.random()*10)] + " " + randomName.ws2[Math.floor(Math.random()*10)]})
				} else if (this.state.chapter === "Iron Hands") {
					this.setState({name: randomName.ih1[Math.floor(Math.random()*10)] + " " + randomName.ih2[Math.floor(Math.random()*10)]})
				} else if (this.state.chapter === "Space Wolves") {
					this.setState({name: randomName.sw1[Math.floor(Math.random()*10)] + " " + randomName.sw2[Math.floor(Math.random()*10)]})
				} else if (this.state.chapter === "Salamanders") {
					this.setState({name: randomName.sal1[Math.floor(Math.random()*10)] + " " + randomName.sal2[Math.floor(Math.random()*10)]})
				} else if (this.state.chapter === "Dark Angels") {
					this.setState({name: randomName.da1[Math.floor(Math.random()*10)] + " " + randomName.da2[Math.floor(Math.random()*10)]})
				} else {
					this.setState({name: randomName.ultra1[Math.floor(Math.random()*10)] + " " + randomName.ultra2[Math.floor(Math.random()*10)]})
				}
				break;
			case "Grey Knights":
				this.setState({name: randomName.grey1[Math.floor(Math.random()*10)] + " " + randomName.grey2[Math.floor(Math.random()*10)]})
				break;
			case "Astra Militarum":
				if (this.state.chapter === "Catachan") {
						this.setState({name: randomName.catachan[Math.floor(Math.random()*36)]})
					} else if (this.state.chapter === "Valhallan") {
						this.setState({name: randomName.valhallan[Math.floor(Math.random()*36)]})
					} else if (this.state.chapter === "Tallarn") {
						this.setState({name: randomName.tallarn[Math.floor(Math.random()*36)]})
					} else {
						this.setState({name: randomName.cadian[Math.floor(Math.random()*36)]})
					}
					break;
			case "Adeptus Mechanicus":
				this.setState({name: randomName.adeptus1[Math.floor(Math.random()*36)] + randomName.adeptus2[Math.floor(Math.random()*36)]})
				break;
			case "Heretic Astartes":
				if (this.state.chapter === "Alpha Legion") {
					this.setState({name: randomName.al1[Math.floor(Math.random()*10)] + " " + randomName.al2[Math.floor(Math.random()*10)]})
				} else if (this.state.chapter === "Emperor's Children") {
					this.setState({name: randomName.ec1[Math.floor(Math.random()*10)] + " " + randomName.ec2[Math.floor(Math.random()*10)]})
				} else if (this.state.chapter === "World Eaters") {
					this.setState({name: randomName.we1[Math.floor(Math.random()*10)] + " " + randomName.we2[Math.floor(Math.random()*10)]})
				} else {
					this.setState({name: randomName.bl1[Math.floor(Math.random()*10)] + " " + randomName.bl2[Math.floor(Math.random()*10)]})
				}
				break;
			case "Death Guard":
				this.setState({name: randomName.death1[Math.floor(Math.random()*10)] + " " + randomName.death2[Math.floor(Math.random()*10)]})
				break;
			case "Thousand Sons":
				this.setState({name: randomName.thousand1[Math.floor(Math.random()*10)] + " " + randomName.thousand2[Math.floor(Math.random()*10)]})
				break;
			case "Asuryani":
				if (this.state.chapter === "Male") {
					this.setState({name: randomName.asur1m[Math.floor(Math.random()*36)] + " " + randomName.asur2m[Math.floor(Math.random()*36)]})
				} else {
					this.setState({name: randomName.asur1f[Math.floor(Math.random()*36)] + " " + randomName.asur2f[Math.floor(Math.random()*36)]})
				}
				break;
			case "Drukhari":
				if (this.state.unitType.value === "Wych" || this.state.unitType.value === "Wych Fighter" || this.state.unitType.value === "Hekatrix") {
					this.setState({name: randomName.wych1[Math.floor(Math.random()*36)] + " " + randomName.wych2[Math.floor(Math.random()*36)]})
				} else {
					this.setState({name: randomName.kabal1[Math.floor(Math.random()*36)] + " " + randomName.kabal2[Math.floor(Math.random()*36)]})
				}
				break;
			case "Harlequins":
				this.setState({name: randomName.harlequins1[Math.floor(Math.random()*10)] + " " + randomName.harlequins2[Math.floor(Math.random()*10)]})
				break;
			case "Necrons":
				this.setState({name: randomName.necron1[Math.floor(Math.random()*36)] + " " + randomName.necron2[Math.floor(Math.random()*36)]})
				break;
			case "Orks":
				this.setState({name: randomName.ork1[Math.floor(Math.random()*36)] + " " + randomName.ork2[Math.floor(Math.random()*36)]})
				break;
			case "Tau Empire":
				this.setState({name: randomName.tau[Math.floor(Math.random()*36)]})
				break;
			case "Tyranids":
				this.setState({name: randomName.tyranid1[Math.floor(Math.random()*36)] + " " + randomName.tyranid2[Math.floor(Math.random()*36)]})
				break;
			case "Genestealer Cults":
				this.setState({name: randomName.genestealer1[Math.floor(Math.random()*36)] + " " + randomName.genestealer2[Math.floor(Math.random()*36)]})
				break;
			default:
				this.setState({name: randomName.ultra1[Math.floor(Math.random()*10)] + " " + randomName.ultra2[Math.floor(Math.random()*10)]})
			}
		}
							
	randomBackground = (event) => {
		event.preventDefault();
		switch (this.state.race.value) {
			case "Deathwatch":
				this.setState({background: randomName.deathwatch3[Math.floor(Math.random()*10)]})
				this.setState({mission: randomName.deathwatch4[Math.floor(Math.random()*6)]})
				this.setState({squadQuirk: randomName.deathwatch5[Math.floor(Math.random()*6)]})
				break;
			case "Grey Knights":
				this.setState({background: randomName.grey3[Math.floor(Math.random()*6)]})
				this.setState({mission: randomName.grey4[Math.floor(Math.random()*6)]})
				this.setState({squadQuirk: randomName.grey5[Math.floor(Math.random()*6)]})
				break;
			case "Astra Militarum":
				this.setState({background: randomName.astra3[Math.floor(Math.random()*10)]})
				this.setState({mission: randomName.astra4[Math.floor(Math.random()*10)]})
				this.setState({squadQuirk: randomName.astra5[Math.floor(Math.random()*10)]})
				break;
			case "Adeptus Mechanicus":
				this.setState({background: randomName.adeptus3[Math.floor(Math.random()*10)]})
				this.setState({mission: randomName.adeptus4[Math.floor(Math.random()*10)]})
				this.setState({squadQuirk: randomName.adeptus5[Math.floor(Math.random()*10)]})
			break;
			case "Heretic Astartes":
				this.setState({background: randomName.heretic3[Math.floor(Math.random()*10)]})
				this.setState({mission: randomName.heretic4[Math.floor(Math.random()*10)]})
				this.setState({squadQuirk: randomName.heretic5[Math.floor(Math.random()*10)]})
				break;
			case "Death Guard":
				this.setState({background: randomName.death3[Math.floor(Math.random()*6)]})
				this.setState({mission: randomName.death4[Math.floor(Math.random()*6)]})
				this.setState({squadQuirk: randomName.death5[Math.floor(Math.random()*6)]})
				break;
			case "Thousand Sons":
				this.setState({background: randomName.thousand3[Math.floor(Math.random()*6)]})
				this.setState({mission: randomName.thousand4[Math.floor(Math.random()*6)]})
				this.setState({squadQuirk: randomName.thousand5[Math.floor(Math.random()*6)]})
				break;
			case "Asuryani":
				this.setState({background: randomName.asur3[Math.floor(Math.random()*10)]})
				this.setState({mission: randomName.asur4[Math.floor(Math.random()*10)]})
				this.setState({squadQuirk: randomName.asur5[Math.floor(Math.random()*10)]})
				break;
			case "Drukhari":
				this.setState({background: randomName.druk3[Math.floor(Math.random()*10)]})
				this.setState({mission: randomName.druk4[Math.floor(Math.random()*10)]})
				this.setState({squadQuirk: randomName.druk5[Math.floor(Math.random()*10)]})
				break;
			case "Harlequins":
				this.setState({background: randomName.harlequins3[Math.floor(Math.random()*6)]})
				this.setState({mission: randomName.harlequins4[Math.floor(Math.random()*6)]})
				this.setState({squadQuirk: randomName.harlequins5[Math.floor(Math.random()*6)]})
				break;
			case "Necrons":
				this.setState({background: randomName.necron3[Math.floor(Math.random()*10)]})
				this.setState({mission: randomName.necron4[Math.floor(Math.random()*10)]})
				this.setState({squadQuirk: randomName.necron5[Math.floor(Math.random()*10)]})
				break;
			case "Orks":
				this.setState({background: randomName.ork3[Math.floor(Math.random()*10)]})
				this.setState({mission: randomName.ork4[Math.floor(Math.random()*10)]})
				this.setState({squadQuirk: randomName.ork5[Math.floor(Math.random()*10)]})
				break;
			case "Tau Empire":
				this.setState({background: randomName.tau3[Math.floor(Math.random()*10)]})
				this.setState({mission: randomName.tau4[Math.floor(Math.random()*10)]})
				this.setState({squadQuirk: randomName.tau5[Math.floor(Math.random()*10)]})
				break;
			case "Tyranids":
				this.setState({background: randomName.tyranid3[Math.floor(Math.random()*10)]})
				this.setState({mission: randomName.tyranid4[Math.floor(Math.random()*10)]})
				this.setState({squadQuirk: randomName.tyranid5[Math.floor(Math.random()*10)]})
				break;
			case "Genestealer Cults":
				this.setState({background: randomName.genestealer3[Math.floor(Math.random()*10)]})
				this.setState({mission: randomName.genestealer4[Math.floor(Math.random()*10)]})
				this.setState({squadQuirk: randomName.genestealer5[Math.floor(Math.random()*10)]})
				break;
			default:
				this.setState({background: randomName.astartes3[Math.floor(Math.random()*10)]})
				this.setState({mission: randomName.astartes4[Math.floor(Math.random()*10)]})
				this.setState({squadQuirk: randomName.astartes5[Math.floor(Math.random()*10)]})
		}
	}

	randomDemeanour = (event) => {
		event.preventDefault();
		switch (this.state.race.value) {
			case "Deathwatch":
				this.setState({demeanour: randomName.deathwatch6[Math.floor(Math.random()*10)]})
				break;
			case "Grey Knights":
				this.setState({demeanour: randomName.grey6[Math.floor(Math.random()*10)]})
				break;
			case "Astra Militarum":
				this.setState({demeanour: randomName.astra6[Math.floor(Math.random()*10)]})
				break;
			case "Adeptus Mechanicus":
				this.setState({demeanour: randomName.adeptus6[Math.floor(Math.random()*10)]})
				break;
			case "Heretic Astartes":
				this.setState({demeanour: randomName.heretic6[Math.floor(Math.random()*10)]})
				break;
			case "Death Guard":
				this.setState({demeanour: randomName.death6[Math.floor(Math.random()*10)]})
				break;
			case "Thousand Sons":
				this.setState({demeanour: randomName.thousand6[Math.floor(Math.random()*10)]})
				break;
			case "Asuryani":
				this.setState({demeanour: randomName.asur6[Math.floor(Math.random()*10)]})
				break;
			case "Drukhari":
				this.setState({demeanour: randomName.druk6[Math.floor(Math.random()*10)]})
				break;
			case "Harlequins":
				this.setState({demeanour: randomName.harlequins6[Math.floor(Math.random()*10)]})
				break;
			case "Necrons":
				this.setState({demeanour: randomName.necron6[Math.floor(Math.random()*10)]})
				break;
			case "Orks":
				this.setState({demeanour: randomName.ork6[Math.floor(Math.random()*10)]})
				break;
			case "Tau Empire":
				this.setState({demeanour: randomName.tau6[Math.floor(Math.random()*10)]})
				break;
			case "Tyranids":
				this.setState({demeanour: randomName.tyranid6[Math.floor(Math.random()*10)]})
				break;
			case "Genestealer Cults":
				this.setState({demeanour: randomName.genestealer6[Math.floor(Math.random()*10)]})
				break;
			default:
				this.setState({demeanour: randomName.astartes6[Math.floor(Math.random()*10)]})
			}
		}

  loadUnits = () => {
		let newArray = []; 
		for (let i = 0; i < Object.values(sessionStorage).length; i++) {
			newArray.push(JSON.parse(Object.values(sessionStorage)[i]))
		}
		this.setState({
			units: newArray,
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
			unitType: {},
			wargearOptions: {},
			wargearOptions2: {},
			specialism: {},
			special: "none",
			demeanour: "",
			counter: (Object.values(sessionStorage).length)
		})
  };

  deleteUnit = id => {
    this.confirm1.open('Delete Unit?', () => {
			sessionStorage.removeItem(`sessionUnit${id}`)
			this.loadUnits();
		})
  };

	deleteAll = () => {
		this.confirm1.open('Delete All?', () => {
		for (let i = 0; i < this.state.units.length; i++) {
				sessionStorage.removeItem(`sessionUnit${i}`)
				this.loadUnits()
			};
		})
	}
	
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
		const item = {
			id: this.state.counter,
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
			special: this.state.special,
			demeanour: this.state.demeanour,
		}
    event.preventDefault();
    if ((this.state.units[0] === undefined) || (this.state.race.value === this.state.units[0].race)) {
			sessionStorage.setItem(`sessionUnit${item.id}`, JSON.stringify(item));
			this.loadUnits();
		} else {
			alert("Squad must all match race type")
		}
  };

  handleDatabaseSubmit(e) {
		const itemsRef = firebase.database().ref('Users');
		if (this.state.squadName === "") {
			this.confirm1.open('Submit squad with no name?', () => {
				if (this.state.user !== null) {
					const item = {
						user: this.state.user.displayName,
						avatar: this.state.user.photoURL,
						units: this.state.units,
						squadName: this.state.squadName,
						background: this.state.background,
						mission: this.state.mission,
						squadQuirk: this.state.squadQuirk,
						total: this.state.total
					}
					itemsRef.push(item)
						for (let i = 0; i < this.state.units.length; i++) {
							sessionStorage.removeItem(`sessionUnit${i}`)
							this.loadUnits()
						};
					this.setState({total: 0})
				};
			})
		} else {
			if (this.state.user !== null) {
				const item = {
					user: this.state.user.displayName,
					avatar: this.state.user.photoURL,
					units: this.state.units,
					squadName: this.state.squadName,
					background: this.state.background,
					mission: this.state.mission,
					squadQuirk: this.state.squadQuirk,
					total: this.state.total
				}
				itemsRef.push(item)
					for (let i = 0; i < this.state.units.length; i++) {
						sessionStorage.removeItem(`sessionUnit${i}`)
						this.loadUnits()
					};
			};
		}
  };

	componentDidUpdate() {
		this.squadTotal(this.state.total)
	}

  squadTotal = (stateSum) => {
		var sum = 0;
		for (let i = 0; i < this.state.units.length; i++) {
			sum += this.state.units[i].pts;
		}
		if (stateSum !== sum) {
			this.setState({
				total: sum
			})
		}
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
			wargearOptions2: {},
      specialism: "none",
      demeanour: "",
		})
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
        abilities: "Special Issue Ammunition, And They Shall Know No Fear, Transhuman Physiology, Atonement Through Honour"
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
        pts: 19
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
        att: 2,
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
        equipment: "big shoota, stikkbombs",
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
        equipment: "big shoota, stikkbombs",
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

    if (wargearOptions.value === "none" && this.state.unitType.value === "Deathwatch Veteran") {
      this.setState({
        wargearPts: 0,
        equipment: "boltgun, frag grenades, krak grenades"
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
        wargearPts: 1,
        equipment: "stalker pattern boltgun, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "power maul" && this.state.unitType.value === "Deathwatch Veteran") {
			this.setState({
				wargearPts: 2,
        equipment: "boltgun, power maul, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "power sword" && this.state.unitType.value === "Deathwatch Veteran") {
			this.setState({
				wargearPts: 2,
        equipment: "boltgun, power sword, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "storm shield power maul" && this.state.unitType.value === "Deathwatch Veteran") {
			this.setState({
				wargearPts: 5,
        equipment: "storm shield, power maul, frag grenades, krak grenades"
      });
		}
    if (wargearOptions.value === "storm shield power sword" && this.state.unitType.value === "Deathwatch Veteran") {
			this.setState({
				wargearPts: 5,
        equipment: "storm shield, power sword, frag grenades, krak grenades"
      });
		}
		if (wargearOptions.value === "combi-melta power sword" && this.state.unitType.value === "Deathwatch Veteran") {
			this.setState({
				wargearPts: 5,
				equipment: "combi-melta, power sword, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "combi-plasma power sword" && this.state.unitType.value === "Deathwatch Veteran") {
			this.setState({
				wargearPts: 6,
				equipment: "combi-plasma, power sword, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "stalker pattern boltgun power sword" && this.state.unitType.value === "Deathwatch Veteran") {
			this.setState({
				wargearPts: 3,
				equipment: "stalker pattern boltgun, power sword, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "combi-melta power maul" && this.state.unitType.value === "Deathwatch Veteran") {
			this.setState({
				wargearPts: 5,
				equipment: "combi-melta, power maul, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "combi-plasma power maul" && this.state.unitType.value === "Deathwatch Veteran") {
			this.setState({
				wargearPts: 6,
				equipment: "combi-plasma, power maul, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "stalker pattern boltgun power maul" && this.state.unitType.value === "Deathwatch Veteran") {
			this.setState({
				wargearPts: 3,
				equipment: "stalker pattern boltgun, power maul, frag grenades, krak grenades"
			});
		}
    if (wargearOptions.value === "deathwatch shotgun" && this.state.unitType.value === "Deathwatch Veteran") {
			this.setState({
				wargearPts: 2,
        equipment: "deathwatch shotgun, frag grenades, krak grenades"
      });
		}
    if (wargearOptions.value === "heavy thunder hammer" && this.state.unitType.value === "Deathwatch Veteran") {
      this.setState({
        wargearPts: 5,
        equipment: "heavy thunder hammer, frag grenades, krak grenades"
      });
		}

    if (wargearOptions.value === "none" && this.state.unitType.value === "Deathwatch Veteran Gunner") {
      this.setState({
        wargearPts: 0,
        equipment: "boltgun, frag grenades, krak grenades"
      });
		}
		if (wargearOptions.value === "combi-melta" && this.state.unitType.value === "Deathwatch Veteran Gunner") {
      this.setState({
        wargearPts: 3,
        equipment: "combi-melta, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "combi-plasma" && this.state.unitType.value === "Deathwatch Veteran Gunner") {
      this.setState({
        wargearPts: 4,
        equipment: "combi-plasma, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "stalker pattern boltgun" && this.state.unitType.value === "Deathwatch Veteran Gunner") {
      this.setState({
        wargearPts: 1,
        equipment: "stalker pattern boltgun, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "power maul" && this.state.unitType.value === "Deathwatch Veteran Gunner") {
			this.setState({
				wargearPts: 2,
        equipment: "boltgun, power maul, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "power sword" && this.state.unitType.value === "Deathwatch Veteran Gunner") {
			this.setState({
				wargearPts: 2,
        equipment: "boltgun, power sword, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "storm shield power maul" && this.state.unitType.value === "Deathwatch Veteran Gunner") {
			this.setState({
				wargearPts: 5,
        equipment: "storm shield, power maul, frag grenades, krak grenades"
      });
		}
    if (wargearOptions.value === "storm shield power sword" && this.state.unitType.value === "Deathwatch Veteran Gunner") {
			this.setState({
				wargearPts: 5,
        equipment: "storm shield, power sword, frag grenades, krak grenades"
      });
		}
		if (wargearOptions.value === "combi-melta power sword" && this.state.unitType.value === "Deathwatch Veteran Gunner") {
			this.setState({
				wargearPts: 5,
				equipment: "combi-melta, power sword, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "combi-plasma power sword" && this.state.unitType.value === "Deathwatch Veteran Gunner") {
			this.setState({
				wargearPts: 6,
				equipment: "combi-plasma, power sword, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "stalker pattern boltgun power sword" && this.state.unitType.value === "Deathwatch Veteran Gunner") {
			this.setState({
				wargearPts: 3,
				equipment: "stalker pattern boltgun, power sword, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "combi-melta power maul" && this.state.unitType.value === "Deathwatch Veteran Gunner") {
			this.setState({
				wargearPts: 5,
				equipment: "combi-melta, power maul, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "combi-plasma power maul" && this.state.unitType.value === "Deathwatch Veteran Gunner") {
			this.setState({
				wargearPts: 6,
				equipment: "combi-plasma, power maul, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "stalker pattern boltgun power maul" && this.state.unitType.value === "Deathwatch Veteran Gunner") {
			this.setState({
				wargearPts: 3,
				equipment: "stalker pattern boltgun, power maul, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "deathwatch frag cannon" && this.state.unitType.value === "Deathwatch Veteran Gunner") {
			this.setState({
				wargearPts: 5,
				equipment: "deathwatch frag cannon, frag grenades, krak grenades"
			});
		}
    if (wargearOptions.value === "infernus heavy bolter" && this.state.unitType.value === "Deathwatch Veteran Gunner") {
			this.setState({
				wargearPts: 2,
        equipment: "infernus heavy bolter, frag grenades, krak grenades"
      });
		}

    if (wargearOptions.value === "none" && this.state.unitType.value === "Black Shield") {
      this.setState({
        wargearPts: 0,
        equipment: "boltgun, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "combi-melta" && this.state.unitType.value === "Black Shield") {
      this.setState({
        wargearPts: 3,
        equipment: "combi-melta, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "combi-plasma" && this.state.unitType.value === "Black Shield") {
      this.setState({
        wargearPts: 4,
        equipment: "combi-plasma, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "stalker pattern boltgun" && this.state.unitType.value === "Black Shield") {
      this.setState({
        wargearPts: 1,
        equipment: "stalker pattern boltgun, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "power maul" && this.state.unitType.value === "Black Shield") {
			this.setState({
				wargearPts: 2,
        equipment: "boltgun, power maul, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "power sword" && this.state.unitType.value === "Black Shield") {
			this.setState({
				wargearPts: 2,
        equipment: "boltgun, power sword, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "storm shield power maul" && this.state.unitType.value === "Black Shield") {
			this.setState({
				wargearPts: 5,
        equipment: "storm shield, power maul, frag grenades, krak grenades"
      });
		}
    if (wargearOptions.value === "storm shield power sword" && this.state.unitType.value === "Black Shield") {
			this.setState({
				wargearPts: 5,
        equipment: "storm shield, power sword, frag grenades, krak grenades"
      });
		}
		if (wargearOptions.value === "combi-melta power sword" && this.state.unitType.value === "Black Shield") {
			this.setState({
				wargearPts: 5,
				equipment: "combi-melta, power sword, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "combi-plasma power sword" && this.state.unitType.value === "Black Shield") {
			this.setState({
				wargearPts: 6,
				equipment: "combi-plasma, power sword, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "stalker pattern boltgun power sword" && this.state.unitType.value === "Black Shield") {
			this.setState({
				wargearPts: 3,
				equipment: "stalker pattern boltgun, power sword, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "combi-melta power maul" && this.state.unitType.value === "Black Shield") {
			this.setState({
				wargearPts: 5,
				equipment: "combi-melta, power maul, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "combi-plasma power maul" && this.state.unitType.value === "Black Shield") {
			this.setState({
				wargearPts: 6,
				equipment: "combi-plasma, power maul, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "stalker pattern boltgun power maul" && this.state.unitType.value === "Black Shield") {
			this.setState({
				wargearPts: 3,
				equipment: "stalker pattern boltgun, power maul, frag grenades, krak grenades"
			});
		}

		if (wargearOptions.value === "none" && this.state.unitType.value === "Watch Sergeant") {
			this.setState({
				wargearPts: 0,
				equipment: "boltgun, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "combi-melta" && this.state.unitType.value === "Watch Sergeant") {
      this.setState({
        wargearPts: 3,
        equipment: "combi-melta, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "combi-plasma" && this.state.unitType.value === "Watch Sergeant") {
      this.setState({
        wargearPts: 4,
        equipment: "combi-plasma, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "stalker pattern boltgun" && this.state.unitType.value === "Watch Sergeant") {
      this.setState({
        wargearPts: 1,
        equipment: "stalker pattern boltgun, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "power maul" && this.state.unitType.value === "Watch Sergeant") {
			this.setState({
				wargearPts: 2,
        equipment: "boltgun, power maul, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "power sword" && this.state.unitType.value === "Watch Sergeant") {
			this.setState({
				wargearPts: 2,
        equipment: "boltgun, power sword, frag grenades, krak grenades"
      });
    }
    if (wargearOptions.value === "storm shield power maul" && this.state.unitType.value === "Watch Sergeant") {
			this.setState({
				wargearPts: 5,
        equipment: "storm shield, power maul, frag grenades, krak grenades"
      });
		}
    if (wargearOptions.value === "storm shield power sword" && this.state.unitType.value === "Watch Sergeant") {
			this.setState({
				wargearPts: 5,
        equipment: "storm shield, power sword, frag grenades, krak grenades"
      });
		}
		if (wargearOptions.value === "combi-melta power sword" && this.state.unitType.value === "Watch Sergeant") {
			this.setState({
				wargearPts: 5,
				equipment: "combi-melta, power sword, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "combi-plasma power sword" && this.state.unitType.value === "Watch Sergeant") {
			this.setState({
				wargearPts: 6,
				equipment: "combi-plasma, power sword, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "stalker pattern boltgun power sword" && this.state.unitType.value === "Watch Sergeant") {
			this.setState({
				wargearPts: 3,
				equipment: "stalker pattern boltgun, power sword, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "combi-melta power maul" && this.state.unitType.value === "Watch Sergeant") {
			this.setState({
				wargearPts: 5,
				equipment: "combi-melta, power maul, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "combi-plasma power maul" && this.state.unitType.value === "Watch Sergeant") {
			this.setState({
				wargearPts: 6,
				equipment: "combi-plasma, power maul, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "stalker pattern boltgun power maul" && this.state.unitType.value === "Watch Sergeant") {
			this.setState({
				wargearPts: 3,
				equipment: "stalker pattern boltgun, power maul, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "xenophase blade" && this.state.unitType.value === "Watch Sergeant") {
			this.setState({
				wargearPts: 3,
				equipment: "xenophase blade, boltgun, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "storm shield xenophase blade" && this.state.unitType.value === "Watch Sergeant") {
			this.setState({
				wargearPts: 6,
				equipment: "storm shield, xenophase blade, boltgun, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "combi-melta xenophase blade" && this.state.unitType.value === "Watch Sergeant") {
			this.setState({
				wargearPts: 6,
				equipment: "combi-melta, xenophase blade, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "combi-plasma xenophase blade" && this.state.unitType.value === "Watch Sergeant") {
			this.setState({
				wargearPts: 7,
				equipment: "combi-plasma, xenophase blade, frag grenades, krak grenades"
			});
		}
		if (wargearOptions.value === "stalker pattern boltgun xenophase blade" && this.state.unitType.value === "Watch Sergeant") {
			this.setState({
				wargearPts: 4,
				equipment: "stalker pattern boltgun, xenophase blade, frag grenades, krak grenades"
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
		if (wargearOptions.value === "power fist" && this.state.unitType.value === "Tempestor") {
			this.setState({
				wargearPts: 2,
        equipment: "hot-shot laspistol, power fist, frag grenades, krak grenades"
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
		if (wargearOptions.value === "mace of contagion bubotic axe" && this.state.unitType.value === "Plague Marine Fighter") {
			this.setState({
				wargearPts: 5,
				equipment: "mace of contagion, bubotic axe, plague knife, blight grenades, krak grenades"
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
        equipment: "big shoota, stikkbombs"
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
        equipment: "big shoota, stikkbombs"
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
        abilities: "And They Shall Know No Fear, Transhuman Physiology, Terror Troops"
      });
    }
    if (wargearOptions2.value === "Grav-Chute" && this.state.unitType.value === "Reiver") {
      this.setState({
        wargearPts2: 1,
        abilities: "And They Shall Know No Fear, Transhuman Physiology, Terror Troops, Grav-Chute"
      });
    }
    if (wargearOptions2.value === "Grapnel Launcher" && this.state.unitType.value === "Reiver") {
      this.setState({
        wargearPts2: 1,
        abilities: "And They Shall Know No Fear, Transhuman Physiology, Terror Troops, Grapnel Launcher"
      });
    }
    if (wargearOptions2.value === "Grav-Chute Grapnel Launcher" && this.state.unitType.value === "Reiver") {
      this.setState({
        wargearPts2: 2,
        abilities: "And They Shall Know No Fear, Transhuman Physiology, Terror Troops, Grav-Chute, Grapnel Launcher"
      });
    }

    if (wargearOptions2.value === "none" && this.state.unitType.value === "Reiver Sergeant") {
      this.setState({
        wargearPts2: 0,
        abilities: "And They Shall Know No Fear, Transhuman Physiology, Terror Troops"
      });
    }
    if (wargearOptions2.value === "Grav-Chute" && this.state.unitType.value === "Reiver Sergeant") {
      this.setState({
        wargearPts2: 1,
        abilities: "And They Shall Know No Fear, Transhuman Physiology, Terror Troops, Grav-Chute"
      });
    }
    if (wargearOptions2.value === "Grapnel Launcher" && this.state.unitType.value === "Reiver Sergeant") {
      this.setState({
        wargearPts2: 1,
        abilities: "And They Shall Know No Fear, Transhuman Physiology, Terror Troops, grapnel chute"
      });
    }
    if (wargearOptions2.value === "Grav-Chute Grapnel Launcher" && this.state.unitType.value === "Reiver Sergeant") {
      this.setState({
        wargearPts2: 2,
        abilities: "And They Shall Know No Fear, Transhuman Physiology, Terror Troops, Grav-Chute, Grapnel Launcher"
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
        abilities: "Aura of Dark Glory, Brayhorn"
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

	handleChange5 = (specialism) => {
    this.setState({
			special: specialism.label,
			specialism: specialism
			})
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

    const filteredOptions = options2.filter((o) => o.link === this.state.race.value)
    const filteredOptions2 = options3.filter((o) => o.link === this.state.unitType.value)
		const filteredOptions3 = options4.filter((o) => o.link === this.state.unitType.value)
		const filteredOptions4 = options5.filter((o) => o.link === this.state.unitType.value)

    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h2>Add a Squad Member</h2>
              <h2>{this.state.race.label}</h2>
            </Jumbotron>
            <form>
              <h6 className="text-light">Race</h6>
                <Select
                  name="race"
                  value={{label : this.state.race.value}}
                  onChange={this.handleChange1}
                  options={options1}
                />
								{this.state.race.label ? (
									<div>
										<br />
										<h6 className="text-light">Unit Type</h6>
										<Select
											name="unit-type"
											value={{label : this.state.unitType.value}}
											onChange={this.handleChange2}
											options={filteredOptions}
										/>
										<br />
											{this.state.unitType.label ? (
												<div>
													{((this.state.race.value === "Adeptus Astartes") || (this.state.race.value === "Deathwatch")) ? (
														<div className="btn-groups">
															<label className="btn btn-secondary">
																<Radio
																	value="Ultramarines"
																	onChange={this.handleInputChange}
																	style={{ "float" : "left" }}
																	name="chapter"
																	id="Ultramarines"
																/> Ultramarines &nbsp;
															</label>
															<label className="btn btn-secondary">
																<Radio
																	value="Imperial Fists"
																	onChange={this.handleInputChange}
																	style={{ "float" : "left" }}
																	name="chapter"
																	id="Imperial Fists"
																/> Imperial Fists &nbsp;
															</label>
															<label className="btn btn-secondary">
																<Radio
																	value="Blood Angels"
																	onChange={this.handleInputChange}
																	style={{ "float" : "left" }}
																	name="chapter"
																	id="Blood Angels"
																/> Blood Angels &nbsp;
															</label>
															<label className="btn btn-secondary">
																<Radio
																	value="Raven Guard"
																	onChange={this.handleInputChange}
																	style={{ "float" : "left" }}
																	name="chapter"
																	id="Raven Guard"
																/> Raven Guard &nbsp;
															</label>
															<label className="btn btn-secondary">
																<Radio
																	value="White Scars"
																	onChange={this.handleInputChange}
																	style={{ "float" : "left" }}
																	name="chapter"
																	id="White Scars"
																/> White Scars &nbsp;
															</label>
															<label className="btn btn-secondary">
																<Radio
																	value="Iron Hands"
																	onChange={this.handleInputChange}
																	style={{ "float" : "left" }}
																	name="chapter"
																	id="Iron Hands"
																/> Iron Hands &nbsp;
																</label>
															<label className="btn btn-secondary">
																<Radio
																	value="Space Wolves"
																	onChange={this.handleInputChange}
																	style={{ "float" : "left" }}
																	name="chapter"
																	id="Space Wolves"
																/> Space Wolves &nbsp;
															</label>
															<label className="btn btn-secondary">
																<Radio
																	value="Salamanders"
																	onChange={this.handleInputChange}
																	style={{ "float" : "left" }}
																	name="chapter"
																	id="Salamanders"
																/> Salamanders &nbsp;
															</label>
															<label className="btn btn-secondary">
																<Radio
																	value="Dark Angels"
																	onChange={this.handleInputChange}
																	style={{ "float" : "left" }}
																	name="chapter"
																	id="Dark Angels"
																/> Dark Angels &nbsp;
															</label>
														</div>
													) : (
														null												
													)}
													{(this.state.race.value === "Astra Militarum") ? (
														<div className="btn-groups">
															<label className="btn btn-secondary">
																<Radio
																	value="Cadian"
																	onChange={this.handleInputChange}
																	style={{ "float" : "left" }}
																	name="chapter"
																	id="Cadian"
																/> Cadian &nbsp;
															</label>
															<label className="btn btn-secondary">
															<Radio
																value="Catachan"
																onChange={this.handleInputChange}
																style={{ "float" : "left" }}
																name="chapter"
																id="Catachan"
															/> Catachan &nbsp;
															</label>
															<label className="btn btn-secondary">
															<Radio
																value="Valhallan"
																onChange={this.handleInputChange}
																style={{ "float" : "left" }}
																name="chapter"
																id="Valhallan"
															/> Valhallan &nbsp;
															</label>
															<label className="btn btn-secondary">
															<Radio
																value="Tallarn"
																onChange={this.handleInputChange}
																style={{ "float" : "left" }}
																name="chapter"
																id="Tallarn"
															/> Tallarn &nbsp;
															</label>
															<br />
														</div>
													) : (
														null												
													)}
													{(this.state.race.value === "Heretic Astartes") ? (
														<div className="btn-groups">
															<label className="btn btn-secondary">
																<Radio
																	value="Black Legion"
																	onChange={this.handleInputChange}
																	style={{ "float" : "left" }}
																	name="chapter"
																	id="Black Legion"
																/> Black Legion &nbsp;
															</label>
															<label className="btn btn-secondary">
																<Radio
																	value="Alpha Legion"
																	onChange={this.handleInputChange}
																	style={{ "float" : "left" }}
																	name="chapter"
																	id="Alpha Legion"
																/> Alpha Legion &nbsp;
															</label>
															<label className="btn btn-secondary">
																<Radio
																	value="World Eaters"
																	onChange={this.handleInputChange}
																	style={{ "float" : "left" }}
																	name="chapter"
																	id="World Eaters"
																/> World Eaters &nbsp;
															</label>
															<label className="btn btn-secondary">
																<Radio
																	value="Emperor's Children"
																	onChange={this.handleInputChange}
																	style={{ "float" : "left" }}
																	name="chapter"
																	id="Emperor's Children"
																/> Emperor's Children &nbsp;
															</label>
															<br />
														</div>
													) : (
														null												
													)}
													{(this.state.race.value === "Asuryani") ? (
														<div>
															<label className="btn btn-secondary">
																<Radio
																	value="Female"
																	onChange={this.handleInputChange}
																	style={{ "float" : "left" }}
																	name="chapter"
																	id="Female"
																/> Female &nbsp;
															</label>
															<label className="btn btn-secondary">
																<Radio
																	value="Male"
																	onChange={this.handleInputChange}
																	style={{ "float" : "left" }}
																	name="chapter"
																	id="Male"
																/> Male &nbsp;
															</label>
															<br />
															<br />
														</div>
													) : (
														null												
													)}
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
																	style={{ padding: "1px" }}
																>
																	Random<span role="img" aria-label="Random">🔀</span>
																</FormBtn>
																</td>
															</tr>
														</tbody>
													</table>
													{this.state.name ? (
														<div>
															<table>
																<tbody>
																	<tr>
																		<td className="text-light" style={{textAlign: "center"}}>M</td>
																		<td className="text-light" style={{textAlign: "center"}}>WS</td>
																		<td className="text-light" style={{textAlign: "center"}}>BS</td>
																		<td className="text-light" style={{textAlign: "center"}}>S</td>
																		<td className="text-light" style={{textAlign: "center"}}>T</td>
																		<td className="text-light" style={{textAlign: "center"}}>W</td>
																		<td className="text-light" style={{textAlign: "center"}}>A</td>
																		<td className="text-light" style={{textAlign: "center"}}>LD</td>
																		<td className="text-light" style={{textAlign: "center"}}>SV</td>
																	</tr>
																	<tr>
																		<td>
																			<InputNumber 
																				value={this.state.move}
																				onChange={this.handleInputChange}
																				name="move"
																			/>
																		</td>
																		<td>
																			<InputNumber 
																				value={this.state.ws}
																				onChange={this.handleInputChange}
																				name="ws"
																			/>
																		</td>
																		<td>
																			<InputNumber 
																				value={this.state.bs}
																				onChange={this.handleInputChange}
																				name="bs"
																			/>
																		</td>
																		<td>
																			<InputNumber
																				value={this.state.str}
																				onChange={this.handleInputChange}
																				name="str"
																			/>
																		</td>
																		<td>
																			<InputNumber 
																				value={this.state.tough}
																				onChange={this.handleInputChange}
																				name="tough"
																			/>
																		</td>
																		<td>
																			<InputNumber 
																				value={this.state.wounds}
																				onChange={this.handleInputChange}
																				name="wounds"
																			/>
																		</td>
																		<td>
																			<InputNumber
																				value={this.state.att}
																				onChange={this.handleInputChange}
																				name="att"
																			/>
																		</td>
																		<td>
																			<InputNumber 
																				value={this.state.ld}
																				onChange={this.handleInputChange}
																				name="ld"
																			/>
																		</td>
																		<td>
																			<InputNumber
																				value={this.state.sv}
																				onChange={this.handleInputChange}
																				name="sv"
																			/>
																		</td>
																	</tr>
																		<tr className="text-light">
																			<td>PTS</td>
																			<td>&nbsp;</td>
																			<td>Wargear</td>
																			<td>&nbsp;</td>
																			<td>Options</td>
																		</tr>
																	<tr>
																		<td>
																		<InputNumber
																				value={this.state.pts}
																				onChange={this.handleInputChange}
																				name="pts"
																			/>
																		</td>
																		<td className="text-light" style={{ textAlign : "center", fontSize : "40px", paddingTop : "-25px"}}>
																			+
																		</td>
																		<td>
																		<InputNumber
																			value={this.state.wargearPts}
																			onChange={this.handleInputChange}
																			name="wargearPts"
																		/>
																		</td>
																		<td className="text-light" style={{ textAlign : "center", fontSize : "40px", paddingTop : "-25px"}}>
																			+
																		</td>
																		<td>
																		<InputNumber
																			value={this.state.wargearPts2}
																			onChange={this.handleInputChange}
																			name="wargearPts2"
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
																style={{ "backgroundColor" : "#c2c2c2", "fontWeight" : "bold" }}
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
															{this.state.specialism.label ? (
																<div>
																	<span className="text-light" style={{ float: "left", width : "50%" }}>Specialism</span>
																	<span className="text-light" style={{ float: "left", width : "50%" }}>Demeanour</span>
																</div>
															) : (
																<div>
																	<span className="text-light" style={{ float: "left", width : "50%" }}>Specialism</span>
																	<span className="text-light" style={{ float: "left", width : "50%" }}>&nbsp;</span>
																</div>
															)}
															<div style={{ float: "left", width : "50%" }}>
																<Select
																	name="specialism"
																	value={{label : this.state.specialism.value}}
																	onChange={this.handleChange5}
																	options={filteredOptions4}
																/>
															</div>
																{this.state.specialism.label ? (
																	<table>
																		<tbody>
																		<tr>
																			<td
																				style={{padding: "0px", "width": "100%"}}
																			>
																		<Input
																			value={this.state.demeanour}
																			onChange={this.handleInputChange}
																			style={{ "width": "100%"}}
																			name="demeanour"
																			placeholder="Demeanour"
																		/>
																		</td>
																		<td style={{ padding: "0px" }}>
																			<FormBtn
																				onClick={this.randomDemeanour}
																				className="btn btn-success"
																				style={{ padding: "1px" }}
																				disabled={!(this.state.specialism.label)}
																			>
																				Random<span role="img" aria-label="Random">🔀</span>
																			</FormBtn>
																			</td>
																		</tr>
																		</tbody>
																	</table>
														) : (null)}
													<br />
													<div >
														<FormBtn
															disabled={!(this.state.unitType && this.state.name)}
															onClick={this.handleFormSubmit}
															style={{ float : "right" }}
															className="btn btn-success"
														>
															Submit Unit
														</FormBtn>
													</div>
												</div>) : (null)}
											</div>) : (null)}
									</div>) : (null)}
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h2>Units On My Squad</h2>
              <h3>Squad Cost: {this.state.total}</h3>
            </Jumbotron>
            {this.state.units.length ? (
              <div>
							<span className="text-light" style={{ float: "left" }}>Squad Name</span>
                <Input
                  value={this.state.squadName}
                  onChange={this.handleInputChange}
                  name="squadName"
                  placeholder="Squad Name"
                />
							<span className="text-light" style={{ float: "left", width : "30%" }}>Background</span>
							<span className="text-light" style={{ float: "left", width : "30%" }}>Mission</span>
							<span className="text-light" style={{ float: "left", width : "30%" }}>Squad Quirk</span>
							<table>
								<tbody>
								<tr>
									<td
										style={{ "width": "32%"}}
									>
								<Input
									value={this.state.background}
									onChange={this.handleInputChange}
									style={{ "width": "100%", float: "left"}}
									name="background"
									placeholder="Background"
								/>
								</td>
								<td
									style={{ "width": "32%"}}
								>
								<Input
									value={this.state.mission}
									onChange={this.handleInputChange}
									style={{ "width": "100%", float: "left"}}
									name="mission"
									placeholder="Mission"
								/>
								</td>
								<td
									style={{ "width": "32%"}}
								>
								<Input
									value={this.state.squadQuirk}
									onChange={this.handleInputChange}
									style={{ "width": "100%", float: "left"}}
									name="squadQuirk"
									placeholder="Squad Quirk"
								/>
								</td>
								<td
									style={{ "float": "left"}}
								>
								<FormBtn
									onClick={this.randomBackground}
									className="btn btn-success"
									style={{padding: "1px", margin: "auto"}}
								>
									Random<span role="img" aria-label="Random">🔀</span>
								</FormBtn>
								</td>
								</tr>
								</tbody>
							</table>
                <List>
                  {this.state.units.map(unit => (
                    <ListItem key={unit.id}>
											&nbsp;
                      <Link to={"/units/" + unit.id}>
                        <strong>
                          &quot;{unit.name}&quot; {unit.unitType}
                        </strong>
                      </Link>
											<span className="list-points" style={{"float":"right"}}>
												{unit.pts} points
											</span>
                      <DeleteBtn onClick={() => this.deleteUnit(unit.id)} />
                      <Confirm ref={el => this.confirm1 = el} /> 
                    </ListItem>
                  ))}
                </List>
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
              </div>
            ) : (
              <h3 className="text-light" style={{ "textAlign" : "center" }}>No Results to Display</h3>
            )}
          </Col>
        </Row>
				<br />
      </Container>
    );
  }
}
export default Units;
