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


class Units extends Component {
  constructor(props) {
    super(props);
    this.state = {
      units: [],
      squadName: "",
      name: "",
      equipment: "",
      move: "",
      ws: "",
      bs: "",
      str: "",
      tough: "",
      wounds: "",
      att: "",
      ld: "",
      sv: "",
      pts: "",
      wargearPts: "",
      total: 0,
      race: {},
      unitType: {},
      wargearOptions: {},
      items: [],
      user: null
    };
    this.handleDatabaseSubmit = this.handleDatabaseSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
  }

  componentDidMount() {
    
    this.loadUnits();
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } 
    });
    
    const itemsRef = firebase.database().ref('Users');
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          user: items[item].user,
          units: items[item].units,
          avatar: items[item].avatar,
        });
      }
      this.setState({
        items: newState
      });
    });
  }

  componentDidUpdate() {
    var i;
    var sum = 0;
    for (i = 0; i < this.state.units.length; i++) {
      sum += this.state.units[i].pts;
      if (this.state.total === 0) {
      this.setState({
        total: sum
      })
      }
    }
    // only works on second click
    // if (this.state.total > 100) {
    //   alert("squad is over 100 points!")
    // }
  }

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
      itemsRef.push(item);
    };
  };

  loadUnits = () => {
    API.getUnits()
      .then(res =>
        this.setState({
        units: res.data,
        squadName: "",
        name: "",
        equipment: "",
        move: "",
        ws: "",
        bs: "",
        str: "",
        tough: "",
        wounds: "",
        att: "",
        ld: "",
        sv: "",
        pts: "",
        wargearPts: "",
        race: {},
        unitType: {},
        wargearOptions: {}
      })
      )
      .catch(err => console.log(err));
  };

  deleteUnit = id => {
    this.confirm1.open('Are you sure?', () => {
    API.deleteUnit(id)
    .then(res => this.loadUnits())
    .catch(err => console.log(err));
    })
  };
  
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
        move: this.state.move,
        ws: this.state.ws,
        bs: this.state.bs,
        str: this.state.str,
        tough: this.state.tough,
        wounds: this.state.wounds,
        att: this.state.att,
        ld: this.state.ld,
        sv: this.state.sv,
        pts: this.state.pts + this.state.wargearPts,
        race: this.state.race.label,
        unitType: this.state.unitType.label,
        wargearOptions: this.state.wargearOptions.label
      })
      .then(res => this.loadUnits())
      .catch(err => console.log(err));
    }
    console.log(this)
  };
  
  squadTotal = () => {
    var i;
    var sum = 0;
    for (i = 0; i < this.state.units.length; i++) {
      sum += this.state.units[i].pts;
      this.setState({
        total: sum
      })
    }
    // only works on second click
    if (this.state.total > 100) {
      alert("squad is over 100 points!")
    }
  }
  handleChange1 = (race) => {
    this.setState({race});
    console.log(this.state.race)
  };

  handleChange2 = (race) => {
    this.setState({unitType: race})
    console.log(this.state.unitType)
    if (this.state.race.value === "Adeptus Astartes") {
      this.setState({
        move: 6,
        ws: 3,
        bs: 3,
        str: 4,
        tough: 4
      })
    }
    if (this.state.unitType.value === "Scout") {
      this.setState({
        wounds: 1,
        att: 1,
        ld: 7,
        sv: 4,
        pts: 10,
        equipment: "boltgun, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (this.state.unitType.value === "Scout Gunner") {
      this.setState({
        wounds: 1,
        att: 1,
        ld: 7,
        sv: 4,
        pts: 11,
        equipment: "boltgun, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (this.state.unitType.value === "Scout Sergeant") {
      this.setState({
        wounds: 1,
        att: 2,
        ld: 8,
        sv: 4,
        pts: 11,
        equipment: "boltgun, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (this.state.unitType.value === "Tactical Marine") {
      this.setState({
        wounds: 1,
        att: 1,
        ld: 7,
        sv: 3,
        pts: 12,
        equipment: "boltgun, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (this.state.unitType.value === "Tactical Marine Gunner") {
      this.setState({
        wounds: 1,
        att: 1,
        ld: 7,
        sv: 3,
        pts: 13,
        equipment: "boltgun, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (this.state.unitType.value === "Tactical Marine Sergeant") {
      this.setState({
        wounds: 1,
        att: 2,
        ld: 8,
        sv: 3,
        pts: 13,
        equipment: "boltgun, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (this.state.unitType.value === "Reiver") {
      this.setState({
        wounds: 2,
        att: 2,
        ld: 7,
        sv: 3,
        pts: 16,
        equipment: "bolt carbine, heavy bolt pistol, frag grenades, krak grenades, shock grenades"
      });
    }
    if (this.state.unitType.value === "Reiver Sergeant") {
      this.setState({
        wounds: 2,
        att: 3,
        ld: 8,
        sv: 3,
        pts: 17,
        equipment: "bolt carbine, heavy bolt pistol, frag grenades, krak grenades, shock grenades"
      });
    }
    if (this.state.unitType.value === "Intercessor") {
      this.setState({
        wounds: 2,
        att: 2,
        ld: 7,
        sv: 3,
        pts: 15,
        equipment: "bolt rifle, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (this.state.unitType.value === "Intercessor Gunner") {
      this.setState({
        wounds: 2,
        att: 2,
        ld: 7,
        sv: 3,
        pts: 16,
        equipment: "bolt rifle, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (this.state.unitType.value === "Intercessor Sergeant") {
      this.setState({
        wounds: 2,
        att: 3,
        ld: 8,
        sv: 3,
        pts: 16,
        equipment: "bolt rifle, bolt pistol, frag grenades, krak grenades"
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
    if (this.state.unitType.value === "Deathwatch Veteran") {
      this.setState({
        att: 2,
        ld: 8,
        pts: 14
      });
    }
    if (this.state.unitType.value === "Deathwatch Veteran Gunner") {
      this.setState({
        att: 2,
        ld: 8,
        pts: 16
      });
    }
    if (this.state.unitType.value === "Black Shield") {
      this.setState({
        att: 3,
        ld: 8,
        pts: 16
      });
    }
    if (this.state.unitType.value === "Watch Sergeant") {
      this.setState({
        att: 3,
        ld: 9,
        pts: 16
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
        equipment: "Nemesis force sword, storm bolter, frag grenades, krak grenades, psyk-out grenades"
      })
    }
    if (this.state.unitType.value === "Grey Knight") {
      this.setState({
        att: 1,
        ld: 7,
        pts: 18
      });
    }
    if (this.state.unitType.value === "Grey Knight Gunner") {
      this.setState({
        att: 1,
        ld: 7,
        pts: 18
      });
    }
    if (this.state.unitType.value === "Justicar") {
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
    if (this.state.unitType.value === "Guardsman") {
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
    if (this.state.unitType.value === "Guardsman Gunner") {
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
    if (this.state.unitType.value === "Sergeant") {
      this.setState({
        ws: 4,
        bs: 4,
        att: 2,
        ld: 7,
        pts: 5,
        sv: 5,
        equipment: "lasgun, frag grenades"
      });
    }
    if (this.state.unitType.value === "Special Weapons Guardsman") {
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
    if (this.state.unitType.value === "Special Weapons Gunner") {
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
    if (this.state.unitType.value === "Scion") {
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
    if (this.state.unitType.value === "Scion Gunner") {
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
    if (this.state.unitType.value === "Tempestor") {
      this.setState({
        ws: 3,
        bs: 3,
        att: 2,
        ld: 7,
        pts: 10,
        sv: 4,
        equipment: "hot-shot lasgun, frag grenades, krak grenades"
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
    if (this.state.unitType.value === "Skitarii Ranger") {
      this.setState({
        move: 6,
        ws: 4,
        str: 3,
        wounds: 1,
        att: 1,
        ld: 6,
        pts: 9,
        equipment: "galvanic rifle"
      });
    }
    if (this.state.unitType.value === "Ranger Gunner") {
      this.setState({
        move: 6,
        ws: 4,
        str: 3,
        wounds: 1,
        att: 1,
        ld: 6,
        pts: 10,
        equipment: "galvanic rifle"
      });
    }
    if (this.state.unitType.value === "Ranger Alpha") {
      this.setState({
        move: 6,
        ws: 4,
        str: 3,
        wounds: 1,
        att: 2,
        ld: 7,
        pts: 10,
        equipment: "galvanic rifle"
      });
    }
    if (this.state.unitType.value === "Skitarii Vanguard") {
      this.setState({
        move: 6,
        ws: 4,
        str: 3,
        wounds: 1,
        att: 1,
        ld: 6,
        pts: 9,
        equipment: "radium carbine"
      });
    }
    if (this.state.unitType.value === "Vanguard Gunner") {
      this.setState({
        move: 6,
        ws: 4,
        str: 3,
        wounds: 1,
        att: 1,
        ld: 6,
        pts: 10,
        equipment: "radium carbine"
      });
    }
    if (this.state.unitType.value === "Vanguard Alpha") {
      this.setState({
        move: 6,
        ws: 4,
        str: 3,
        wounds: 1,
        att: 2,
        ld: 7,
        pts: 10,
        equipment: "radium carbine"
      });
    }
    if (this.state.unitType.value === "Sicarian Ruststalker") {
      this.setState({
        move: 8,
        ws: 3,
        str: 4,
        wounds: 2,
        att: 3,
        ld: 6,
        pts: 14,
        equipment: "transonic razor, chordclaw"
      });
    }
    if (this.state.unitType.value === "Ruststalker Princeps") {
      this.setState({
        move: 8,
        ws: 3,
        str: 4,
        wounds: 2,
        att: 4,
        ld: 7,
        pts: 15,
        equipment: "transonic razor, chordclaw"
      });
    }
    if (this.state.unitType.value === "Sicarian Infiltrator") {
      this.setState({
        move: 8,
        ws: 3,
        str: 4,
        wounds: 2,
        att: 2,
        ld: 6,
        pts: 14,
        equipment: "stub carbine, powersword"
      });
    }
    if (this.state.unitType.value === "Infiltrator Princeps") {
      this.setState({
        move: 8,
        ws: 3,
        str: 4,
        wounds: 2,
        att: 3,
        ld: 7,
        pts: 15,
        equipment: "stub carbine, powersword"
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
    if (this.state.unitType.value === "Chaos Cultist") {
      this.setState({
        ws: 4,
        bs: 4,
        str: 3,
        tough: 3,
        att: 1,
        ld: 5,
        sv: 6,
        pts: 4,
        equipment: "autogun"
      });
    }
    if (this.state.unitType.value === "Chaos Cultist Gunner") {
      this.setState({
        ws: 4,
        bs: 4,
        str: 3,
        tough: 3,
        att: 1,
        ld: 5,
        sv: 6,
        pts: 5,
        equipment: "autogun"
      });
    }
    if (this.state.unitType.value === "Cultist Champion") {
      this.setState({
        ws: 4,
        bs: 4,
        str: 3,
        tough: 3,
        att: 1,
        ld: 6,
        sv: 6,
        pts: 5,
        equipment: "autogun"
      });
    }
    if (this.state.unitType.value === "Chaos Space Marine") {
      this.setState({
        ws: 3,
        bs: 3,
        str: 4,
        tough: 4,
        att: 1,
        ld: 7,
        sv: 3,
        pts: 12,
        equipment: "boltgun, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (this.state.unitType.value === "Chaos Space Marine Gunner") {
      this.setState({
        ws: 3,
        bs: 3,
        str: 3,
        tough: 3,
        att: 1,
        ld: 7,
        sv: 3,
        pts: 13,
        equipment: "boltgun, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (this.state.unitType.value === "Aspiring Champion") {
      this.setState({
        ws: 3,
        bs: 3,
        str: 3,
        tough: 3,
        att: 1,
        ld: 8,
        sv: 3,
        pts: 13,
        equipment: "boltgun, bolt pistol, frag grenades, krak grenades"
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
    if (this.state.unitType.value === "Plague Marine") {
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
        equipment: "plague knife, boltgun, blight grenades, krak grenades"
      });
    }
    if (this.state.unitType.value === "Plague Marine Gunner") {
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
        equipment: "plague knife, boltgun, blight grenades, krak grenades"
      });
    }
    if (this.state.unitType.value === "Plague Marine Fighter") {
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
        equipment: "plague knife, boltgun, blight grenades, krak grenades"
      });
    }
    if (this.state.unitType.value === "Plague Champion") {
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
        equipment: "plague knife, boltgun, blight grenades, krak grenades"
      });
    }
    if (this.state.unitType.value === "Pox Walker") {
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
        equipment: "improvised weapon"
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
    if (this.state.unitType.value === "Rubric Marine") {
      this.setState({
        move: 5,
        bs: 3,
        att: 1,
        ld: 7,
        sv: 3,
        pts: 16,
        equipment: "inferno boltgun"
      });
    }
    if (this.state.unitType.value === "Rubric Marine Gunner") {
      this.setState({
        move: 5,
        bs: 3,
        att: 1,
        ld: 7,
        sv: 3,
        pts: 16,
        equipment: "inferno boltgun"
      });
    }
    if (this.state.unitType.value === "Aspiring Sorcerer") {
      this.setState({
        move: 6,
        bs: 3,
        att: 2,
        ld: 8,
        sv: 3,
        pts: 17,
        equipment: "force stave, inferno bolt pistol"
      });
    }
    if (this.state.unitType.value === "Tzaangor") {
      this.setState({
        move: 6,
        bs: 4,
        att: 1,
        ld: 6,
        sv: 6,
        pts: 7,
        equipment: "Tzaangor blades"
      });
    }
    if (this.state.unitType.value === "Twistbray") {
      this.setState({
        move: 6,
        bs: 4,
        att: 2,
        ld: 7,
        sv: 6,
        pts: 8,
        equipment: "Tzaangor blades"
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
    if (this.state.unitType.value === "Guardian Defender") {
      this.setState({
        ws: 3,
        wounds: 1,
        att: 1,
        ld: 7,
        sv: 5,
        pts: 7,
        equipment: "shuriken catapult, plasma grenades"
      });
    }
    if (this.state.unitType.value === "Heavy Weapon Platform") {
      this.setState({
        ws: 6,
        wounds: 2,
        att: 1,
        ld: 7,
        sv: 3,
        pts: 8,
        equipment: "shuriken cannon"
      });
    }
    if (this.state.unitType.value === "Storm Guardian") {
      this.setState({
        ws: 3,
        wounds: 1,
        att: 1,
        ld: 7,
        sv: 5,
        pts: 6,
        equipment: "shuriken pistol, Aeldari blade, plasma grenades"
      });
    }
    if (this.state.unitType.value === "Storm Guardian Gunner") {
      this.setState({
        ws: 3,
        wounds: 1,
        att: 1,
        ld: 7,
        sv: 5,
        pts: 7,
        equipment: "shuriken pistol, Aeldari blade, plasma grenades"
      });
    }
    if (this.state.unitType.value === "Ranger") {
      this.setState({
        ws: 3,
        wounds: 1,
        att: 1,
        ld: 7,
        sv: 5,
        pts: 11,
        equipment: "shuriken pistol, ranger long rifle"
      });
    }
    if (this.state.unitType.value === "Dire Avenger") {
      this.setState({
        ws: 3,
        wounds: 1,
        att: 1,
        ld: 8,
        sv: 4,
        pts: 10,
        equipment: "shuriken pistol, ranger long rifle"
      });
    }
    if (this.state.unitType.value === "Dire Avenger Exarch") {
      this.setState({
        ws: 3,
        wounds: 2,
        att: 2,
        ld: 8,
        sv: 4,
        pts: 11,
        equipment: "shuriken pistol, ranger long rifle"
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
    if (this.state.unitType.value === "Kabalite Warrior") {
      this.setState({
        move: 7,
        att: 1,
        ld: 7,
        sv: 5,
        pts: 7,
        equipment: "splinter rifle"
      });
    }
    if (this.state.unitType.value === "Kabalite Gunner") {
      this.setState({
        move: 7,
        att: 1,
        ld: 7,
        sv: 5,
        pts: 8,
        equipment: "splinter rifle"
      });
    }
    if (this.state.unitType.value === "Sybarite") {
      this.setState({
        move: 7,
        att: 2,
        ld: 8,
        sv: 5,
        pts: 8,
        equipment: "splinter rifle"
      });
    }
    if (this.state.unitType.value === "Wych") {
      this.setState({
        move: 8,
        att: 2,
        ld: 7,
        sv: 6,
        pts: 8,
        equipment: "splinter pistol, Hekatarii blade, plasma grenades"
      });
    }
    if (this.state.unitType.value === "Wych Fighter") {
      this.setState({
        move: 8,
        att: 2,
        ld: 7,
        sv: 6,
        pts: 9,
        equipment: "splinter pistol, Hekatarii blade, plasma grenades"
      });
    }
    if (this.state.unitType.value === "Hekatrix") {
      this.setState({
        move: 8,
        att: 3,
        ld: 8,
        sv: 6,
        pts: 9,
        equipment: "splinter pistol, Hekatarii blade, plasma grenades"
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
        equipment: "splinter pistol, Harlequin's blade, plasma grenades"
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
        ld: 7
      })
    }
    if (this.state.unitType.value === "Necron Warrior") {
      this.setState({
        bs: 3,
        att: 1,
        sv: 4,
        pts: 12,
        equipment: "gauss flayer"
      });
    }
    if (this.state.unitType.value === "Immortal") {
      this.setState({
        bs: 3,
        att: 1,
        sv: 3,
        pts: 16,
        equipment: "gauss blaster"
      });
    }
    if (this.state.unitType.value === "Flayed One") {
      this.setState({
        bs: 6,
        att: 3,
        sv: 4,
        pts: 10,
        equipment: "flayer claws"
      });
    }
    if (this.state.unitType.value === "Deathmark") {
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
    if (this.state.unitType.value === "Ork Boy") {
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
        equipment: "slugga, choppa, stikkbombs"
      })
    }
    if (this.state.unitType.value === "Ork Boy Gunner") {
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
        equipment: "slugga, choppa, stikkbombs"
      })
    }
    if (this.state.unitType.value === "Boss Nob") {
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
        equipment: "slugga, choppa, stikkbombs"
      })
    }
    if (this.state.unitType.value === "Gretchin") {
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
    if (this.state.unitType.value === "Kommando") {
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
        equipment: "slugga, choppa, stikkbombs"
      })
    }
    if (this.state.unitType.value === "Kommando Boss Nob") {
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
        equipment: "slugga, choppa, stikkbombs"
      })
    }
    if (this.state.unitType.value === "Burna Boy") {
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
        equipment: "burna, stikkbombs"
      })
    }
    if (this.state.unitType.value === "Burna Spanner") {
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
        equipment: "burna, stikkbombs"
      })
    }
    if (this.state.unitType.value === "Loota") {
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
        equipment: "deffgun, stikkbombs"
      })
    }
    if (this.state.unitType.value === "Loota Spanner") {
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
        equipment: "deffgun, stikkbombs"
      })
    }
    ///////////////////////////////////
    //Tau Empire
    ///////////////////////////////////
    if (this.state.unitType.value === "Shasla") {
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
        equipment: "pulse rifle, photon grenades"
      })
    }
    if (this.state.unitType.value === "Shasui") {
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
        equipment: "pulse rifle, photon grenades"
      })
    }
    if (this.state.unitType.value === "DS8 Tactical Support Turret") {
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
        equipment: "missile pod"
      })
    }
    if (this.state.unitType.value === "Pathfinder") {
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
        equipment: "pulse carbine, markerlight, photon grenades"
      })
    }
    if (this.state.unitType.value === "Pathfinder Gunner") {
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
        equipment: "pulse carbine, markerlight, photon grenades"
      })
    }
    if (this.state.unitType.value === "Pathfinder Shasui") {
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
        equipment: "pulse carbine, markerlight, photon grenades"
      })
    }
    if (this.state.unitType.value === "Breacher Shasla") {
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
        equipment: "pulse blaster, photon grenades"
      })
    }
    if (this.state.unitType.value === "Breacher Shasui") {
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
        equipment: "pulse blaster, photon grenades"
      })
    }
    if (this.state.unitType.value === "DS8 Tactical Support Turret") {
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
        equipment: "missile pod"
      })
    }
    if (this.state.unitType.value === "Stealth Shasui") {
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
        equipment: "burst cannon"
      })
    }
    if (this.state.unitType.value === "Stealth Shasvre") {
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
        equipment: "burst cannon"
      })
    }
    if (this.state.unitType.value === "MV1 Gun Drone") {
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
        equipment: "two pulse carbines"
      })
    }
    if (this.state.unitType.value === "MV4 Shield Drone") {
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
        equipment: "shield generator"
      })
    }
    if (this.state.unitType.value === "MV7 Marker Drone") {
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
        equipment: "markerlight"
      })
    }
    if (this.state.unitType.value === "MV36 Guardian Drone") {
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
        equipment: "none"
      })
    }
    if (this.state.unitType.value === "MV33 Grav-Inhibitor Drone") {
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
        equipment: "none"
      })
    }
    if (this.state.unitType.value ==="MV31 Pulse Accelerator Drone") {
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
        equipment: "none"
      })
    }
    if (this.state.unitType.value === "MB3 Recon Drone") {
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
        equipment: "burst cannon"
      })
    }
    ///////////////////////////////////
    //Tyranids
    ///////////////////////////////////
    if (this.state.unitType.value === "Termagant") {
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
        equipment: "fleshborer"
      })
    }
    if (this.state.unitType.value === "Hormagaunt") {
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
        equipment: "scything talons"
      })
    }
    if (this.state.unitType.value === "Lictor") {
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
        equipment: "flesh hooks, grasping talons, rending claws"
      })
    }
    if (this.state.unitType.value === "Tyranid Warrior") {
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
        equipment: "scything talons, devourer"
      })
    }
    if (this.state.unitType.value === "Tyranid Warrior Gunner") {
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
        equipment: "scything talons, devourer"
      })
    }
    if (this.state.unitType.value === "Genestealer") {
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
        equipment: "rending claws"
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
    if (this.state.unitType.value === "Acolyte Hybrid") {
      this.setState({
        ws: 3,
        bs: 4,
        str: 4,
        tough: 3,
        wounds: 1,
        att: 2,
        ld: 7,
        pts: 7,
        equipment: "autopistol, cultist knife, rending claw, blasting charges"
      });
    }
    if (this.state.unitType.value === "Acolyte Fighter") {
      this.setState({
        ws: 3,
        bs: 4,
        str: 4,
        tough: 3,
        wounds: 1,
        att: 2,
        ld: 7,
        pts: 8,
        equipment: "autopistol, cultist knife, rending claw, blasting charges"
      });
    }
    if (this.state.unitType.value === "Acolyte Leader") {
      this.setState({
        ws: 3,
        bs: 4,
        str: 4,
        tough: 3,
        wounds: 1,
        att: 3,
        ld: 8,
        pts: 8,
        equipment: "autopistol, cultist knife, rending claw, blasting charges"
      });
    }
    if (this.state.unitType.value === "Aberrant") {
      this.setState({
        ws: 3,
        bs: 6,
        str: 5,
        tough: 4,
        wounds: 2,
        att: 2,
        ld: 7,
        pts: 15,
        equipment: "power pick, rending claw"
      });
    }
    if (this.state.unitType.value === "Neophyte Hybrid") {
      this.setState({
        ws: 4,
        bs: 4,
        str: 3,
        tough: 3,
        wounds: 1,
        att: 1,
        ld: 7,
        pts: 5,
        equipment: "autogun, autopistol, blasting charges"
      });
    }
    if (this.state.unitType.value === "Neophyte Gunner") {
      this.setState({
        ws: 4,
        bs: 4,
        str: 3,
        tough: 3,
        wounds: 1,
        att: 1,
        ld: 7,
        pts: 6,
        equipment: "autogun, autopistol, blasting charges"
      });
    }
    if (this.state.unitType.value === "Neophyte Leader") {
      this.setState({
        ws: 4,
        bs: 4,
        str: 3,
        tough: 3,
        wounds: 1,
        att: 2,
        ld: 8,
        pts: 6,
        equipment: "autogun, autopistol, blasting charges"
      });
    }
    if (this.state.unitType.value === "Hybrid Metamorph") {
      this.setState({
        ws: 3,
        bs: 4,
        str: 4,
        tough: 3,
        wounds: 1,
        att: 3,
        ld: 7,
        pts: 8,
        equipment: "autopistol, rending claw, Metamorph talon, blasting charges"
      });
    }
    if (this.state.unitType.value === "Hybrid Leader") {
      this.setState({
        ws: 3,
        bs: 4,
        str: 4,
        tough: 3,
        wounds: 1,
        att: 4,
        ld: 8,
        pts: 9,
        equipment: "autopistol, rending claw, Metamorph talon, blasting charges"
      });
    }
  }

  handleChange3 = (unitType) => {
    this.setState({wargearOptions: unitType})
    if (this.state.wargearOptions.value === "flamer" && this.state.unitType.value === "Tactical Marine Gunner") {
      this.setState({
        wargearPts: 3,
        equipment: "flamer, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (this.state.wargearOptions.value === "meltagun" && this.state.unitType.value === "Tactical Marine Gunner") {
      this.setState({
        wargearPts: 3,
        equipment: "meltagun, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (this.state.wargearOptions.value === "plasma gun" && this.state.unitType.value === "Tactical Marine Gunner") {
      this.setState({
        wargearPts: 3,
        equipment: "plasma gun, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (this.state.wargearOptions.value === "grav-gun" && this.state.unitType.value === "Tactical Marine Gunner") {
      this.setState({
        wargearPts: 2,
        equipment: "grav-gun, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (this.state.wargearOptions.value === "missile launcher" && this.state.unitType.value === "Tactical Marine Gunner") {
      this.setState({
        wargearPts: 5,
        equipment: "missile launcher, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (this.state.wargearOptions.value === "heavy bolter" && this.state.unitType.value === "Tactical Marine Gunner") {
      this.setState({
        wargearPts: 3,
        equipment: "heavy bolter, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (this.state.wargearOptions.value === "combi-flamer" && this.state.unitType.value === "Tactical Marine Sergeant") {
      this.setState({
        wargearPts: 3,
        equipment: "combi-flamer, frag grenades, krak grenades"
      });
    }
    if (this.state.wargearOptions.value === "combi-grav" && this.state.unitType.value === "Tactical Marine Sergeant") {
      this.setState({
        wargearPts: 2,
        equipment: "combi-grav, frag grenades, krak grenades"
      });
    }
    if (this.state.wargearOptions.value === "combi-melta" && this.state.unitType.value === "Tactical Marine Sergeant") {
      this.setState({
        wargearPts: 3,
        equipment: "combi-melta, frag grenades, krak grenades"
      });
    }
    if (this.state.wargearOptions.value === "combi-plasma" && this.state.unitType.value === "Tactical Marine Sergeant") {
      this.setState({
        wargearPts: 3,
        equipment: "combi-plasma, frag grenades, krak grenades"
      });
    }
    if (this.state.wargearOptions.value === "bolt pistol auspex" && this.state.unitType.value === "Tactical Marine Sergeant") {
      this.setState({
        wargearPts: 1,
        equipment: "auspex, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (this.state.wargearOptions.value === "bolt pistol chainsword" && this.state.unitType.value === "Tactical Marine Sergeant") {
      this.setState({
        wargearPts: 0,
        equipment: "chainsword, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (this.state.wargearOptions.value === "bolt pistol power fist" && this.state.unitType.value === "Tactical Marine Sergeant") {
      this.setState({
        wargearPts: 4,
        equipment: "power fist, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (this.state.wargearOptions.value === "bolt pistol power sword" && this.state.unitType.value === "Tactical Marine Sergeant") {
      this.setState({
        wargearPts: 2,
        equipment: "power sword, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (this.state.wargearOptions.value === "plasma pistol auspex" && this.state.unitType.value === "Tactical Marine Sergeant") {
      this.setState({
        wargearPts: 2,
        equipment: "auspex, plasma pistol, frag grenades, krak grenades"
      });
    }
    if (this.state.wargearOptions.value === "plasma pistol chainsword" && this.state.unitType.value === "Tactical Marine Sergeant") {
      this.setState({
        wargearPts: 1,
        equipment: "chainsword, plasma pistol, frag grenades, krak grenades"
      });
    }
    if (this.state.wargearOptions.value === "plasma pistol power fist" && this.state.unitType.value === "Tactical Marine Sergeant") {
      this.setState({
        wargearPts: 5,
        equipment: "power fist, plasma pistol, frag grenades, krak grenades"
      });
    }
    if (this.state.wargearOptions.value === "plasma pistol power sword" && this.state.unitType.value === "Tactical Marine Sergeant") {
      this.setState({
        wargearPts: 3,
        equipment: "power sword, plasma pistol, frag grenades, krak grenades"
      });
    }
    if (this.state.wargearOptions.value === "grav-pistol auspex" && this.state.unitType.value === "Tactical Marine Sergeant") {
      this.setState({
        wargearPts: 2,
        equipment: "auspex, grav-pistol, frag grenades, krak grenades"
      });
    }
    if (this.state.wargearOptions.value === "grav-pistol chainsword" && this.state.unitType.value === "Tactical Marine Sergeant") {
      this.setState({
        wargearPts: 1,
        equipment: "chainsword, grav-pistol, frag grenades, krak grenades"
      });
    }
    if (this.state.wargearOptions.value === "grav-pistol power fist" && this.state.unitType.value === "Tactical Marine Sergeant") {
      this.setState({
        wargearPts: 5,
        equipment: "power fist, grav-pistol, frag grenades, krak grenades"
      });
    }
    if (this.state.wargearOptions.value === "grav-pistol power sword" && this.state.unitType.value === "Tactical Marine Sergeant") {
      this.setState({
        wargearPts: 3,
        equipment: "power sword, grav-pistol, frag grenades, krak grenades"
      });
    }
    if (this.state.wargearOptions.value === "combat knife" && this.state.unitType.value === "Scout") {
      this.setState({
        wargearPts: 0,
        equipment: "combat knife, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (this.state.wargearOptions.value === "astartes shotgun" && this.state.unitType.value === "Scout") {
      this.setState({
        wargearPts: 0,
        equipment: "astartes shotgun, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (this.state.wargearOptions.value === "sniper rifle camo cloak" && this.state.unitType.value === "Scout") {
      this.setState({
        wargearPts: 2,
        equipment: "sniper rifle, camo cloak, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (this.state.wargearOptions.value === "heavy bolter" && this.state.unitType.value === "Scout Gunner") {
      this.setState({
        wargearPts: 3,
        equipment: "heavy bolter, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (this.state.wargearOptions.value === "missile launcher" && this.state.unitType.value === "Scout Gunner") {
      this.setState({
        wargearPts: 5,
        equipment: "missile launcher, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (this.state.wargearOptions.value === "missile launcher camo cloak" && this.state.unitType.value === "Scout Gunner") {
      this.setState({
        wargearPts: 6,
        equipment: "missile launcher, camo cloak, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (this.state.wargearOptions.value === "sniper rifle camo cloak" && this.state.unitType.value === "Scout Gunner") {
      this.setState({
        wargearPts: 2,
        equipment: "sniper rifle, camo cloak, bolt pistol, frag grenades, krak grenades"
      });
	}
    if (this.state.wargearOptions.value === "astartes shotgun" && this.state.unitType.value === "Scout Sergeant") {
      this.setState({
        wargearPts: 0,
        equipment: "astartes shotgun, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (this.state.wargearOptions.value === "chainsword" && this.state.unitType.value === "Scout Sergeant") {
      this.setState({
        wargearPts: 0,
        equipment: "chainsword, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (this.state.wargearOptions.value === "sniper rifle camo cloak" && this.state.unitType.value === "Scout Sergeant") {
      this.setState({
        wargearPts: 2,
        equipment: "sniper rifle, camo cloak, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (this.state.wargearOptions.value === "auto bolt rifle" && this.state.unitType.value === "Intercessor") {
      this.setState({
        wargearPts: 0,
        equipment: "auto bolt rifle, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (this.state.wargearOptions.value === "stalker bolt rifle" && this.state.unitType.value === "Intercessor") {
      this.setState({
        wargearPts: 0,
        equipment: "stalker bolt rifle, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (this.state.wargearOptions.value === "auxiliary grenade launcher" && this.state.unitType.value === "Intercessor Gunner") {
      this.setState({
        wargearPts: 0,
        equipment: "auxiliary grenade launcher, bolt rifle, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (this.state.wargearOptions.value === "chainsword" && this.state.unitType.value === "Intercessor Sergeant") {
      this.setState({
        wargearPts: 0,
        equipment: "chainsword, bolt rifle, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (this.state.wargearOptions.value === "power sword" && this.state.unitType.value === "Intercessor Sergeant") {
      this.setState({
        wargearPts: 2,
        equipment: "power sword, bolt rifle, bolt pistol, frag grenades, krak grenades"
      });
    }
    if (this.state.wargearOptions.value === "combat knife" && this.state.unitType.value === "Reiver") {
      this.setState({
        wargearPts: 0,
        equipment: "combat knife, heavy bolt pistol, frag grenades, krak grenades, shock grenades"
      });
    }
    if (this.state.wargearOptions.value === "grav-chute" && this.state.unitType.value === "Reiver") {
      this.setState({
        wargearPts: 1,
        equipment: "grav-chute, bolt carbine, heavy bolt pistol, frag grenades, krak grenades, shock grenades"
      });
    }
    if (this.state.wargearOptions.value === "grapnel launcher" && this.state.unitType.value === "Reiver") {
      this.setState({
        wargearPts: 1,
        equipment: "grapnel launcher, bolt carbine, heavy bolt pistol, frag grenades, krak grenades, shock grenades"
      });
    }
    if (this.state.wargearOptions.value === "combat knife" && this.state.unitType.value === "Reiver Sergeant") {
      this.setState({
        wargearPts: 0,
        equipment: "combat knife, heavy bolt pistol, frag grenades, krak grenades, shock grenades"
      });
    }
    if (this.state.wargearOptions.value === "grav-chute" && this.state.unitType.value === "Reiver Sergeant") {
      this.setState({
        wargearPts: 1,
        equipment: "grav-chute, bolt carbine, heavy bolt pistol, frag grenades, krak grenades, shock grenades"
      });
    }
    if (this.state.wargearOptions.value === "grapnel launcher" && this.state.unitType.value === "Reiver Sergeant") {
      this.setState({
        wargearPts: 1,
        equipment: "grapnel launcher, bolt carbine, heavy bolt pistol, frag grenades, krak grenades, shock grenades"
      });
    }
    if (this.state.wargearOptions.value === "combi-melta" && this.state.unitType.value === "Deathwatch Veteran") {
      this.setState({
        wargearPts: 3,
        equipment: "combi-melta, bolt carbine, heavy bolt pistol, frag grenades, krak grenades"
      });
    }
    if (this.state.wargearOptions.value === "combi-plasma" && this.state.unitType.value === "Deathwatch Veteran") {
      this.setState({
        wargearPts: 4,
        equipment: "combi-plasma, bolt carbine, heavy bolt pistol, frag grenades, krak grenades"
      });
    }
    if (this.state.wargearOptions.value === "stalker pattern boltgun" && this.state.unitType.value === "Deathwatch Veteran") {
      this.setState({
        wargearPts: 4,
        equipment: "stalker pattern boltgun, bolt carbine, heavy bolt pistol, frag grenades, krak grenades"
      });
    }
    if (this.state.wargearOptions.value === "power maul" && this.state.unitType.value === "Deathwatch Veteran") {
      this.setState({
        wargearPts: 2,
        equipment: "power maul, bolt carbine, heavy bolt pistol, frag grenades, krak grenades"
      });
    }
    if (this.state.wargearOptions.value === "power sword" && this.state.unitType.value === "Deathwatch Veteran") {
      this.setState({
        wargearPts: 2,
        equipment: "power sword, bolt carbine, heavy bolt pistol, frag grenades, krak grenades"
      });
    }
    if (this.state.wargearOptions.value === "storm shield" && this.state.unitType.value === "Deathwatch Veteran") {
      this.setState({
        wargearPts: 2,
        equipment: "storm shield, bolt carbine, heavy bolt pistol, frag grenades, krak grenades"
      });
    }
    console.log(this.state.wargearOptions)
  }

  render() {
    const options1 = [
      {value: 'Adeptus Astartes', label: 'Adeptus Astartes'},
      {value: 'Deathwatch', label: 'Deathwatch'},
      {value: 'Grey Knights', label: 'Grey Knights'},
      {value: 'Astra Militarum', label: 'Astra Militarum'},
      {value: 'Adeptus Mechanicus', label: 'Adeptus Mechanicus'},
      {value: 'Heretic Astartes', label: 'Heretic Astartes'},
      {value: 'Death Guard', label: 'Death Guard'},
      {value: 'Thousand Sons', label: 'Thousand Sons'},
      {value: 'Asuryani', label: 'Asuryani'},
      {value: 'Drukhari', label: 'Drukhari'},
      {value: 'Harlequins', label: 'Harlequins'},
      {value: 'Necrons', label: 'Necrons'},
      {value: 'Orks', label: 'Orks'},
      {value: 'Tau Empire', label: 'Tau Empire'},
      {value: 'Tyranids', label: 'Tyranids'},
      {value: 'Genestealer Cults', label: 'Genestealer Cults'}
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
      {value: 'flamer', label: 'flamer +3pts', link: 'Tactical Marine Gunner'},
      {value: 'meltagun', label: 'meltagun +3pts', link: 'Tactical Marine Gunner'},
      {value: 'plasma gun', label: 'plasma gun +3pts', link: 'Tactical Marine Gunner'},
      {value: 'grav-gun', label: 'grav-gun +2pts', link: 'Tactical Marine Gunner'},
      {value: 'missile launcher', label: 'missile launcher +5pts', link: 'Tactical Marine Gunner'},
      {value: 'heavy bolter', label: 'heavy bolter +3pts', link: 'Tactical Marine Gunner'},
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
      {value: 'combat knife', label: 'combat knife +0pts', link: 'Scout'},
      {value: 'astartes shotgun', label: 'astartes shotgun +0pts', link: 'Scout'},
      {value: 'sniper rifle camo cloak', label: 'sniper rifle and camo cloak +2pts', link: 'Scout'},
      {value: 'heavy bolter', label: 'heavy bolter +3pts', link: 'Scout Gunner'},
      {value: 'missile launcher', label: 'missile launcher +5pts', link: 'Scout Gunner'},
      {value: 'missile launcher camo cloak', label: 'missile launcher and camo cloak +6pts', link: 'Scout Gunner'},
      {value: 'sniper rifle camo cloak', label: 'sniper rifle and camo cloak +2pts', link: 'Scout Gunner'},
      {value: 'astartes shotgun', label: 'astartes shotgun +0pts', link: 'Scout Sergeant'},
      {value: 'chainsword', label: 'chainsword +0pts', link: 'Scout Sergeant'},
      {value: 'sniper rifle camo cloak', label: 'sniper rifle and camo cloak +2pts', link: 'Scout Sergeant'},
      {value: 'auto bolt rifle', label: 'auto bolt rifle +0pts', link: 'Intercessor'},
      {value: 'stalker bolt rifle', label: 'stalker bolt rifle +0pts', link: 'Intercessor'},
      {value: 'auxiliary grenade launcher', label: 'auxiliary grenade launcher +0pts', link: 'Intercessor Gunner'},
      {value: 'chainsword', label: 'chainsword +0pts', link: 'Intercessor Sergeant'},
      {value: 'power sword', label: 'power sword +2pts', link: 'Intercessor Sergeant'},
      {value: 'combat knife', label: 'combat knife +0pts', link: 'Reiver'},
      {value: 'grav-chute', label: 'grav-chute +1pts', link: 'Reiver'},
      {value: 'grapnel launcher', label: 'grapnel launcher +1pts', link: 'Reiver'},
      {value: 'combat knife', label: 'combat knife +0pts', link: 'Reiver Sergeant'},
      {value: 'grav-chute', label: 'grav-chute +1pts', link: 'Reiver Sergeant'},
      {value: 'grapnel launcher', label: 'grapnel launcher +1pts', link: 'Reiver Sergeant'},
      {value: 'combi-melta', label: 'combi-melta +3pts', link: 'Deathwatch Veteran'},
      {value: 'combi-plasma', label: 'combi-plasma +4pts', link: 'Deathwatch Veteran'},
      {value: 'stalker pattern boltgun', label: 'stalker pattern boltgun +1pts', link: 'Deathwatch Veteran'},
      {value: 'power sword', label: 'power sword +2pts', link: 'Deathwatch Veteran'},
      {value: 'power maul', label: 'power maul +2pts', link: 'Deathwatch Veteran'},
      {value: 'storm shield', label: 'storm shield +3pts', link: 'Deathwatch Veteran'},
      {value: 'deathwatch frag cannon', label: 'deathwatch frag cannon +5pts', link: 'Deathwatch Veteran Gunner'},
      {value: 'infernus heavy bolter', label: 'infernus heavy bolter +2pts', link: 'Deathwatch Veteran Gunner'},
      {value: 'xenophase blade', label: 'xenophase blade +3pts', link: 'Watch Sergeant'},
      {value: 'nemesis force halberd', label: 'nemesis force halberd +0pts', link: 'Grey Knight'},
      {value: 'nemesis daemon hammer', label: 'nemesis daemon hammer +2pts', link: 'Grey Knight'},
      {value: 'nemesis warding stave', label: 'nemesis warding stave +0pts', link: 'Grey Knight'},
      {value: 'two nemesis falchions', label: 'two nemesis falchions +1pts', link: 'Grey Knight'},
      {value: 'incenerator', label: 'incenerator +3pts', link: 'Grey Knight Gunner'},
      {value: 'psilencer', label: 'psilencer +3pts', link: 'Grey Knight Gunner'},
      {value: 'psycannon', label: 'psycannon +2pts', link: 'Grey Knight Gunner'},
      {value: 'vox-caster', label: 'vox-caster +5pts', link: 'Guardsman'},
      {value: 'flamer', label: 'flamer +3pts', link: 'Guardsman Gunner'},
      {value: 'grenade launcher', label: 'grenade launcher +2pts', link: 'Guardsman Gunner'},
      {value: 'meltagun', label: 'meltagun +3pts', link: 'Guardsman Gunner'},
      {value: 'plasma gun', label: 'plasma gun +3pts', link: 'Guardsman Gunner'},
	    {value: 'sniper rifle', label: 'sniper rifle +1pts', link: 'Guardsman Gunner'},
	  



      {value: 'neuro disruptor', label: 'neuro disruptor +2pts', link: 'Player'},
      {value: 'fusion pistol', label: 'fusion pistol +3pts', link: 'Player'},
      {value: 'tesla carbine', label: 'tesla carbine +3pts', link: 'Immortal'},
    ];

    const filteredOptions = options2.filter((o) => o.link === this.state.race.value)
    const filteredOptions2 = options3.filter((o) => o.link === this.state.unitType.value)
    
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Add a Squad Member</h1>
              <h2>{this.state.race.label}</h2>
            </Jumbotron>
            <form>
              <div>
              <h6 className="text-light">Race</h6>
                <Select
                  name="form-field-name"
                  value={{label : this.state.race.value}}
                  onChange={this.handleChange1}
                  options={options1}
                />
                <br />
                <h6 className="text-light">Unit Type</h6>
                <Select
                  name="form-field-name"
                  value={{label : this.state.unitType.value}}
                  onChange={this.handleChange2}
                  options={filteredOptions}
                />
                <br />
              </div>
              <Input
                value={this.state.name}
                onChange={this.handleInputChange}
                name="name"
                placeholder="Name (required)"
              />
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
                  </tr>
                </tbody>
              </table>
              <TextArea
                value={this.state.equipment}
                onChange={this.handleInputChange}
                name="equipment"
                placeholder="Equipment"
              />
              <h6 className="text-light">Wargear Options</h6>
              <Select
                name="form-field-name"
                value={{label : this.state.wargearOptions.value}}
                onChange={this.handleChange3}
                options={filteredOptions2}
              />
              <br />
              <FormBtn
                disabled={!(this.state.unitType && this.state.name)}
                onClick={this.handleFormSubmit}
              >
                Submit Unit
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Units On My List</h1>
              <h2>Squad Cost: {this.state.total}</h2>
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
            >
              Submit Squad
            </FormBtn>
            <FormBtn
              onClick={this.squadTotal}
            >
            Total
            </FormBtn>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Units;
