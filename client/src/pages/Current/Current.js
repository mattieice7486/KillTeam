import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";

class Squad extends Component {
  state = {
    units: [],
    items: []
  };
  // When this component mounts, grab the unit with the _id of this.props.match.params.id
  // e.g. localhost:3000/units/599dcb67f0f16317844583fc
  componentDidMount() {
    API.getUnit(this.props.match.params.id)
      .then(res => this.setState({ unit: res.data }))
      .catch(err => console.log(err));
    API.getUnits()
      .then(res =>
        this.setState({
          units: res.data,
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
          race: {},
          unitType: {},
          wargearOptions: {}
        })
      )
      .catch(err => console.log(err));
      console.log(this.state.items)
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>&ldquo;Squad Name&rdquo;</h1>
            </Jumbotron>
            {this.state.units.length ? (
              <List>
                {this.state.units.map(unit => (
                  <ListItem key={unit._id}>
                    <Link to={"/units/" + unit._id}>
                    <DeleteBtn onClick={() => this.deleteUnit(unit._id)} />
                    <h2>
                      &ldquo;{unit.name}&rdquo;
                    </h2>
                    </Link>
                    <h2>
                    {unit.unitType}
                    </h2>
                        &nbsp;
                      <h4 style={{textAlign : "right"}}>
                        {unit.pts} points
                      </h4>
                      <table className="table table-bordered table-dark">
                          <thead>
                            <tr>
                              <th>M&nbsp;</th>
                              <th>WS</th>
                              <th>BS</th>
                              <th>S&nbsp;</th>
                              <th>T&nbsp;</th>
                              <th>W&nbsp;</th>
                              <th>A&nbsp;</th>
                              <th>LD</th>
                              <th>SV</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{unit.move}"</td>
                              <td>{unit.ws}+</td>
                              <td>{unit.bs}+</td>
                              <td>{unit.str}</td>
                              <td>{unit.tough}</td>
                              <td>{unit.wounds}</td>
                              <td>{unit.att}</td>
                              <td>{unit.ld}</td>
                              <td>{unit.sv}+</td>
                            </tr>
                          </tbody>
                      </table>
                      <h2>Equipment</h2>
                      <table className="table table-bordered table-dark">
                          <thead>
                            <tr>
                              <th>Weapon</th>
                              <th>Range</th>
                              <th>Type</th>
                              <th>S&nbsp;</th>
                              <th>AP</th>
                              <th>D&nbsp;</th>
                              <th>Abilities</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{unit.equipment}</td>
                              <td>{unit.ws}"</td>
                              <td>{unit.equipment}</td>
                              <td>{unit.str}</td>
                              <td>-{unit.tough}</td>
                              <td>{unit.wounds}</td>
                              <td>{unit.equipment}</td>
                            </tr>
                            <tr>
                              <td>{unit.wargearOptions}</td>
                              <td>{unit.ws}"</td>
                              <td>{unit.wargearOptions}</td>
                              <td>{unit.str}</td>
                              <td>-{unit.tough}</td>
                              <td>{unit.wounds}</td>
                              <td>{unit.wargearOptions}</td>
                            </tr>
                          </tbody>
                      </table>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
          </Row>
        <Row>
          <Col size="md-2">
            <Link to="/">← Back to Units</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Squad;
