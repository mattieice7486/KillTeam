import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import Unit from "../../components/Unit";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, InputNumber, TextArea, FormBtn, Select, Checkbox } from "../../components/Form";
import { Option } from "../../components/Select";
import Bolter from "../../components/Guns/Bolter"
import PlasmaGun from "../../components/Guns/PlasmaGun"
import { TableRow } from "../../components/Table";

class Units extends Component {
  state = {
    units: [],
    race: "",
    name: "",
    // modelType: "",
    unitType: "",
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
    total: 0
  };

  componentDidMount() {
    this.loadUnits();
    this.squadTotal();
    this.switcher();
  }

  loadUnits = () => {
    API.getUnits()
      .then(res =>
        this.setState({
        units: res.data,
        race: "",
        name: "",
        // modelType: "",
        unitType: "",
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
    if (this.state.name && this.state.unitType) {
      API.saveUnit({
        race: this.state.race,
        name: this.state.name,
        // modelType: this.state.modelType,
        unitType: this.state.unitType,
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
        pts: this.state.pts
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
    if (this.state.race === "Adeptus Astartes") {
      this.setState({
        move: 6,
        ws: 3,
        bs: 3,
        str: 4,
        tough: 4
      })
    }
    if (this.state.unitType === "Scout") {
      this.setState({
        wounds: 1,
        att: 1,
        ld: 7,
        sv: 4,
        pts: 10,
        equipment: "boltgun, bolt pistol, frag grenades, and krak grenades"
      });
    }
    if (this.state.unitType === "Scout Gunner") {
      this.setState({
        wounds: 1,
        att: 1,
        ld: 7,
        sv: 4,
        pts: 11,
        equipment: "boltgun, bolt pistol, frag grenades, and krak grenades"
      });
    }
    if (this.state.unitType === "Scout Sergeant") {
      this.setState({
        wounds: 1,
        att: 2,
        ld: 8,
        sv: 4,
        pts: 11,
        equipment: "boltgun, bolt pistol, frag grenades, and krak grenades"
      });
    }
    if (this.state.unitType === "Tactical Marine") {
      this.setState({
        wounds: 1,
        att: 1,
        ld: 7,
        sv: 3,
        pts: 12,
        equipment: "boltgun, bolt pistol, frag grenades, and krak grenades"
      });
    }
    if (this.state.unitType === "Tactical Marine Gunner") {
      this.setState({
        wounds: 1,
        att: 1,
        ld: 7,
        sv: 3,
        pts: 13,
        equipment: "boltgun, bolt pistol, frag grenades, and krak grenades"
      });
    }
    if (this.state.unitType === "Tactical Marine Sergeant") {
      this.setState({
        wounds: 1,
        att: 2,
        ld: 8,
        sv: 3,
        pts: 13,
        equipment: "boltgun, bolt pistol, frag grenades, and krak grenades"
      });
    }
    if (this.state.unitType === "Reiver") {
      this.setState({
        wounds: 2,
        att: 2,
        ld: 7,
        sv: 3,
        pts: 16,
        equipment: "bolt carbine, heavy bolt pistol, frag grenades, krak grenades, and shock grenades"
      });
    }
    if (this.state.unitType === "Reiver Sergeant") {
      this.setState({
        wounds: 2,
        att: 3,
        ld: 8,
        sv: 3,
        pts: 17,
        equipment: "bolt carbine, heavy bolt pistol, frag grenades, krak grenades, and shock grenades"
      });
    }
    if (this.state.unitType === "Intercessor") {
      this.setState({
        wounds: 2,
        att: 2,
        ld: 7,
        sv: 3,
        pts: 15,
        equipment: "bolt rifle, bolt pistol, frag grenades, and krak grenades"
      });
    }
    if (this.state.unitType === "Intercessor Gunner") {
      this.setState({
        wounds: 2,
        att: 2,
        ld: 7,
        sv: 3,
        pts: 16,
        equipment: "bolt rifle, bolt pistol, frag grenades, and krak grenades"
      });
    }
    if (this.state.unitType === "Intercessor Sergeant") {
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
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Add a Squad Member</h1>
            </Jumbotron>
            <form>
              <Select
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
              </Select>
              <Input
                value={this.state.name}
                onChange={this.handleInputChange}
                name="name"
                placeholder="Name (required)"
              />
              {/* <Input
                value={this.state.modelType}
                onChange={this.handleInputChange}
                name="modelType"
                placeholder="Model Type (required)"
              /> */}
              <Select
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
              </Select>
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
                disabled={!(this.state.unitType && this.state.name)}
                onClick={this.handleFormSubmit}
              >
                Submit Unit
              </FormBtn>
              <FormBtn
                onClick={this.switcher}
              >
              Autofill
              </FormBtn>
            </form>
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
                        &quot;{unit.name}&quot; {unit.unitType}
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
