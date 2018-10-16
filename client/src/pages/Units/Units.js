import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import Unit from "../../components/Unit";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, InputNumber, TextArea, FormBtn, Checkbox } from "../../components/Form";
import { Option } from "../../components/Select";
import { TableRow } from "../../components/Table";

class Units extends Component {
  state = {
    units: [],
    name: "",
    modelType: "",
    newRecruit: "",
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
    pts: ""
  };

  componentDidMount() {
    this.loadUnits();
  }

  loadUnits = () => {
    API.getUnits()
      .then(res =>
        this.setState({
        units: res.data,
        name: "",
        modelType: "",
        newRecruit: false,
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
        pts: ""
      })
      )
      .catch(err => console.log(err));
  };

  deleteUnit = id => {
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
    if (this.state.name && this.state.modelType) {
      API.saveUnit({
        name: this.state.name,
        modelType: this.state.modelType,
        newRecruit: this.state.newRecruit,
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

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Add a Squad Member</h1>
            </Jumbotron>
            <form>
              <select>
                <Option
                  value=""
                >
                Adeptus Astartes
                </Option>
                <Option
                  value=""
                >
                Deathwatch
                </Option>
                <Option
                  value=""
                >
                Grey Knights
                </Option>
                <Option
                  value=""
                >
                Astra Militarum
                </Option>
                <Option
                  value=""
                >
                Adeptus Mechanicus
                </Option>
                <Option
                  value=""
                >
                Heretic Astartes
                </Option>
                <Option
                  value=""
                >
                Death Guard
                </Option>
                <Option
                  value=""
                >
                Thousand Sons
                </Option>
                <Option
                  value=""
                >
                Asuryani
                </Option>
                <Option
                  value=""
                >
                Drukhari
                </Option>
                <Option
                  value=""
                >
                Harlequins
                </Option>
                <Option
                  value=""
                >
                Necrons
                </Option>
                <Option
                  value=""
                >
                Orks
                </Option>
                <Option
                  value=""
                >
                T'au Empire
                </Option>
                <Option
                  value=""
                >
                Tyranids
                </Option>
                <Option
                  value=""
                >
                Genestealer Cults
                </Option>
              </select>
              <Input
                value={this.state.name}
                onChange={this.handleInputChange}
                name="name"
                placeholder="Name (required)"
              />
              <Input
                value={this.state.modelType}
                onChange={this.handleInputChange}
                name="modelType"
                placeholder="Model Type (required)"
              />
              <Checkbox
                value={this.state.newRecruit}
                onChange={this.handleInputChange}
                name="newRecruit"
              />
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
              <FormBtn
                disabled={!(this.state.modelType && this.state.name)}
                onClick={this.handleFormSubmit}
              >
                Submit Unit
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Units On My List</h1>
            </Jumbotron>
            {this.state.units.length ? (
              <List>
                {this.state.units.map(unit => (
                  <ListItem key={unit._id}>
                    <Link to={"/units/" + unit._id}>
                      <strong>
                      &quot;{unit.name}&quot; {unit.modelType}
                      </strong>
                      &nbsp;
                    </Link>
                    <DeleteBtn onClick={() => this.deleteUnit(unit._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Units;
