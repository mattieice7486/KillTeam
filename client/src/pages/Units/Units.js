import React, { Component } from "react";
import { render } from 'react-dom';
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, InputNumber, TextArea, FormBtn } from "../../components/Form";
import { Option } from "../../components/Select";
import firebase from "firebase";
import { auth, provider } from '../../utils/Firebase';
import Bolter from "../../components/Guns/Bolter";
import PlasmaGun from "../../components/Guns/PlasmaGun";
import Select from 'react-select';


class Units extends Component {
  constructor(props) {
    super(props);
    this.state = {
      units: [],
      // race: "",
      name: "",
      // unitType: "",
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
      total: 0,
      selectedOption: {},
      selectedOption2: {},
      items: [],
      user: null
    };
  }

  handleChange1 = (selectedOption) => {
    this.setState({selectedOption});
    console.log(this.state.selectedOption)
  };

  handleChange2 = (selectedOption) => {
    this.setState({selectedOption2: selectedOption})
    console.log(this.state.selectedOption2)
  }

  componentDidMount() {
    
    this.loadUnits();
    this.squadTotal();
    this.switcher();

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

  logout() {
    auth.signOut()
    .then(() => {
      this.setState({
        user: null
      });
    });
  };

  login() {
    auth.signInWithPopup(provider) 
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
      });
  };

  handleSubmit(e) {
    const itemsRef = firebase.database().ref('Users');
    if (this.state.user !== null) {
      const item = {
          user: this.state.user.displayName,
          units: this.state.units,
          avatar: this.state.user.photoURL
      }
      itemsRef.push(item);
    };
  };

  loadUnits = () => {
    API.getUnits()
      .then(res =>
        this.setState({
        units: res.data,
        // race: "",
        name: "",
        // unitType: "",
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
        selectedOption: {},
        selectedOption2: {}
      })
      )
      .catch(err => console.log(err));
  };

  deleteUnit = id => {
    // how do you change this to "confirm" not "alert"?
    alert("are you sure?");
    API.deleteUnit(id)
    .then(res => this.loadUnits())
    .catch(err => console.log(err));
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
    if (this.state.name && this.state.selectedOption2) {
      API.saveUnit({
        // race: this.state.race,
        name: this.state.name,
        // unitType: this.state.unitType,
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
        pts: this.state.pts,
        selectedOption: this.state.selectedOption.label,
        selectedOption2: this.state.selectedOption2.label
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
    console.log("squad total: " + this.state.total);
  }

  switcher = () => {
    if (this.state.selectedOption.value === "Adeptus Astartes") {
      this.setState({
        move: 6,
        ws: 3,
        bs: 3,
        str: 4,
        tough: 4
      })
    }
    if (this.state.selectedOption2.value === "Scout") {
      this.setState({
        wounds: 1,
        att: 1,
        ld: 7,
        sv: 4,
        pts: 10,
        equipment: "boltgun, bolt pistol, frag grenades, and krak grenades"
      });
    }
    if (this.state.selectedOption2.value === "Scout Gunner") {
      this.setState({
        wounds: 1,
        att: 1,
        ld: 7,
        sv: 4,
        pts: 11,
        equipment: "boltgun, bolt pistol, frag grenades, and krak grenades"
      });
    }
    if (this.state.selectedOption2.value === "Scout Sergeant") {
      this.setState({
        wounds: 1,
        att: 2,
        ld: 8,
        sv: 4,
        pts: 11,
        equipment: "boltgun, bolt pistol, frag grenades, and krak grenades"
      });
    }
    if (this.state.selectedOption2.value === "Tactical Marine") {
      this.setState({
        wounds: 1,
        att: 1,
        ld: 7,
        sv: 3,
        pts: 12,
        equipment: "boltgun, bolt pistol, frag grenades, and krak grenades"
      });
    }
    if (this.state.selectedOption2.value === "Tactical Marine Gunner") {
      this.setState({
        wounds: 1,
        att: 1,
        ld: 7,
        sv: 3,
        pts: 13,
        equipment: "boltgun, bolt pistol, frag grenades, and krak grenades"
      });
    }
    if (this.state.selectedOption2.value === "Tactical Marine Sergeant") {
      this.setState({
        wounds: 1,
        att: 2,
        ld: 8,
        sv: 3,
        pts: 13,
        equipment: "boltgun, bolt pistol, frag grenades, and krak grenades"
      });
    }
    if (this.state.selectedOption2.value === "Reiver") {
      this.setState({
        wounds: 2,
        att: 2,
        ld: 7,
        sv: 3,
        pts: 16,
        equipment: "bolt carbine, heavy bolt pistol, frag grenades, krak grenades, and shock grenades"
      });
    }
    if (this.state.selectedOption2.value === "Reiver Sergeant") {
      this.setState({
        wounds: 2,
        att: 3,
        ld: 8,
        sv: 3,
        pts: 17,
        equipment: "bolt carbine, heavy bolt pistol, frag grenades, krak grenades, and shock grenades"
      });
    }
    if (this.state.selectedOption2.value === "Intercessor") {
      this.setState({
        wounds: 2,
        att: 2,
        ld: 7,
        sv: 3,
        pts: 15,
        equipment: "bolt rifle, bolt pistol, frag grenades, and krak grenades"
      });
    }
    if (this.state.selectedOption2.value === "Intercessor Gunner") {
      this.setState({
        wounds: 2,
        att: 2,
        ld: 7,
        sv: 3,
        pts: 16,
        equipment: "bolt rifle, bolt pistol, frag grenades, and krak grenades"
      });
    }
    if (this.state.selectedOption2.value === "Intercessor Sergeant") {
      this.setState({
        wounds: 2,
        att: 3,
        ld: 8,
        sv: 3,
        pts: 16,
        equipment: "bolt rifle, bolt pistol, frag grenades, and krak grenades"
      });
    }
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
      {value: 'Special Weapons Guardsman Gunner', label: 'Special Weapons Guardsman Gunner', link: 'Astra Militarum'},
      {value: 'Scion', label: 'Scion', link: 'Astra Militarum'},
      {value: 'Scion Gunner', label: 'Scion Gunner', link: 'Astra Militarum'},
      {value: 'Tempestor', label: 'Tempestor', link: 'Astra Militarum'},
      {value: 'Skitarii Ranger', label: 'Skitarii Ranger', link: 'Adeptus Mechanicus'},
      {value: 'Skitarii Gunner', label: 'Skitarii Gunner', link: 'Adeptus Mechanicus'},
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

    const filteredOptions = options2.filter((o) => o.link === this.state.selectedOption.value)
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Add a Squad Member</h1>
              <h2>{this.state.selectedOption.label}</h2>
            </Jumbotron>
            <div>
                    {this.state.user ?
                        <button className="logout" onClick={this.logout}>Logout</button>                
                        :
                        <button className="login" onClick={this.login}>Log In</button>              
                    }
                    {this.state.user ?
                        <div className="profilePic">
                            <img className="us" src={this.state.user.photoURL} style={{borderRadius : "50%", height : "50px", width : "auto"}}/>
                        </div>
                        :
                        <p id="loginStatement">You must be logged in to save your squad.</p>
                    }
                </div>
            <form>
              <div>
                <Select
                  name="form-field-name"
                  value={this.state.selectedOption.value}
                  onChange={this.handleChange1}
                  options={options1}
                />
                <Select
                  name="form-field-name"
                  value={this.state.selectedOption2.value}
                  onChange={this.handleChange2}
                  options={filteredOptions}
                />
              </div>
              {/* <select
                  name="race"            
                  value={this.state.race}                
                  onChange={this.handleInputChange}
                  >
                <option disabled>
                  -- Choose army --
                </option>
                <option value="Adeptus Astartes">
                  Adeptus Astartes
                </option>
                <option value="Deathwatch">
                  Deathwatch
                </option>
                <option value="Grey Knights">
                  Grey Knights
                </option>
                <option value="Astra Militarum">
                  Astra Militarum
                </option>
                <option value="Adeptus Mechanicus">
                  Adeptus Mechanicus
                </option>
                <option value="Heretic Astartes">
                  Heretic Astartes
                </option>
                <option value="Death Guard">
                  Death Guard
                </option>
                <option value="Thousand Sons">
                  Thousand Sons
                </option>
                <option value="Asuryani">
                  Asuryani
                </option>
                <option value="Drukhari">
                  Drukhari
                </option>
                <option value="Harlequins">
                  Harlequins
                </option>
                <option value="Necrons">
                  Necrons
                </option>
                <option value="Orks">
                  Orks
                </option>
                <option value="T'au Empire">
                  T'au Empire
                </option>
                <option value="Tyranids">
                  Tyranids
                </option>
                <option value="Genestealer Cults">
                  Genestealer Cults
                </option>
              </select> */}
              <Input
                value={this.state.name}
                onChange={this.handleInputChange}
                name="name"
                placeholder="Name (required)"
              />
              {/* <select
                name="unitType"            
                value={this.state.unitType}                
                onChange={this.handleInputChange}
              >
                <option disabled>
                  -- Choose Unit --
                </option>
                <option value="Tactical Marine">
                  Tactical Marine
                </option>
                <option value="Tactical Marine Gunner">
                  Tactical Marine Gunner
                </option>
                <option value="Tactical Marine Sergeant">
                  Tactical Marine Sergeant
                </option>
                <option value="Scout">
                  Scout
                </option>
                <option value="Scout Gunner">
                  Scout Gunner
                </option>
                <option value="Scout Sergeant">
                  Scout Sergeant
                </option>
                <option value="Intercessor">
                  Intercessor
                </option>
                <option value="Intercessor Gunner">
                  Intercessor Gunner
                </option>
                <option value="Intercessor Sergeant">
                  Intercessor Sergeant
                </option>
                <option value="Reiver">
                  Reiver
                </option>
                <option value="Reiver Sergeant">
                  Reiver Sergeant
                </option>
              </select> */}
              <table>
                <tbody>
                  <tr>
                    <td>
                      <InputNumber 
                        value={this.state.move}
                        onChange={this.handleInputChange}
                        name="move"
                        placeholder="M"
                      />
                    </td>
                    <td>
                      <InputNumber 
                        value={this.state.ws}
                        onChange={this.handleInputChange}
                        name="ws"
                        placeholder="WS"
                      />
                    </td>
                    <td>
                      <InputNumber 
                        value={this.state.bs}
                        onChange={this.handleInputChange}
                        name="bs"
                        placeholder="BS"
                      />
                    </td>
                    <td>
                      <InputNumber
                        value={this.state.str}
                        onChange={this.handleInputChange}
                        name="str"
                        placeholder="S"
                      />
                    </td>
                    <td>
                      <InputNumber 
                        value={this.state.tough}
                        onChange={this.handleInputChange}
                        name="tough"
                        placeholder="T"
                      />
                    </td>
                    <td>
                      <InputNumber 
                        value={this.state.wounds}
                        onChange={this.handleInputChange}
                        name="wounds"
                        placeholder="W"
                      />
                    </td>
                    <td>
                      <InputNumber
                        value={this.state.att}
                        onChange={this.handleInputChange}
                        name="att"
                        placeholder="A"
                      />
                    </td>
                    <td>
                      <InputNumber 
                        value={this.state.ld}
                        onChange={this.handleInputChange}
                        name="ld"
                        placeholder="Ld"
                      />
                    </td>
                    <td>
                      <InputNumber
                        value={this.state.sv}
                        onChange={this.handleInputChange}
                        name="sv"
                        placeholder="Sv"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <InputNumber
                value={this.state.pts}
                onChange={this.handleInputChange}
                name="pts"
                placeholder="Points"
              />
              <TextArea
                value={this.state.equipment}
                onChange={this.handleInputChange}
                name="equipment"
                placeholder="Equipment (Optional)"
              />
            <select className="custom-select form-group" id="inputGroupSelect01">
              <Option>
                Plasma Gun
                <PlasmaGun />
              </Option>
              <Option>
                Bolter
                <Bolter />
              </Option>
            </select>
              <FormBtn
                disabled={!(this.state.selectedOption2 && this.state.name)}
                onClick={this.handleFormSubmit}
              >
                Submit Unit
              </FormBtn>
            </form>
            <FormBtn
              onClick={this.switcher}
            >
            Autofill
            </FormBtn>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Units On My List</h1>
              <h2>Squad Cost: {this.state.total}</h2>
            </Jumbotron>
            {this.state.units.length ? (
              <List>
                {this.state.units.map(unit => (
                  <ListItem key={unit._id}>
                    <Link to={"/units/" + unit._id}>
                      <strong>
                        &quot;{unit.name}&quot; {unit.selectedOption2}
                      </strong>
                        &nbsp;
                      <span className="list-points">
                        {unit.pts} points
                      </span>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteUnit(unit._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
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
