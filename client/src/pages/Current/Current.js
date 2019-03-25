import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import Confirm from "../../components/Confirm";
import guns from "../../utils/guns";



class Squad extends Component {
  state = {
    units: [],
    items: []
  };
  // When this component mounts, grab the unit with the _id of this.props.match.params.id
  // e.g. localhost:3000/units/599dcb67f0f16317844583fc
  componentDidMount() {
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
  }

  deleteUnit = id => {
    this.confirm1.open('Are you sure?', () => {
    // how do you change this to "confirm" not "alert"?
    API.deleteUnit(id)
    .then(res => this.loadUnits())
    .catch(err => console.log(err));
    })
  };

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
                    <DeleteBtn onClick={() => this.deleteUnit(unit._id)} />
                    <Confirm ref={el => this.confirm1 = el} /> 
                    <Link to={"/units/" + unit._id}>
                    <span style={{fontSize : "24px", fontStyle : "bold"}}>
                    	{unit.unitType}
                    </span>
                    </Link>
                      <span style={{float : "right"}}>
                        {unit.pts} POINTS
                      </span>
                      <table className="table table-bordered" style={{backgroundColor : "#cec9c7"}}>
                          <thead>
                            <tr style={{borderLeft : "none", borderRight : "none", borderTop : "2px solid black", backgroundColor : "#c94309"}}>
                              <th style={{borderLeft : "none", borderRight : "none", width : "30%"}}>NAME</th>
                              <th style={{borderLeft : "none", borderRight : "none"}}>M&nbsp;</th>
                              <th style={{borderLeft : "none", borderRight : "none"}}>WS</th>
                              <th style={{borderLeft : "none", borderRight : "none"}}>BS</th>
                              <th style={{borderLeft : "none", borderRight : "none"}}>S&nbsp;</th>
                              <th style={{borderLeft : "none", borderRight : "none"}}>T&nbsp;</th>
                              <th style={{borderLeft : "none", borderRight : "none"}}>W&nbsp;</th>
                              <th style={{borderLeft : "none", borderRight : "none"}}>A&nbsp;</th>
                              <th style={{borderLeft : "none", borderRight : "none"}}>LD</th>
                              <th style={{borderLeft : "none", borderRight : "none"}}>SV</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td style={{width : "30%"}}>{unit.name}</td>
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
											<table className="table table-bordered" style={{borderLeft : "none", borderRight : "none", backgroundColor : "#cec9c7"}}>
												<thead>
													<tr style={{backgroundColor : "#c94309", borderTop : "2px solid black"}}>
														<th style={{borderLeft : "none", borderRight : "none", width : "25%"}}>WEAPON</th>
														<th style={{borderLeft : "none", borderRight : "none", width : "5%"}}>RANGE</th>
														<th style={{borderLeft : "none", borderRight : "none", width : "20%"}}>TYPE</th>
														<th style={{borderLeft : "none", borderRight : "none", width : "5%"}}>S</th>
														<th style={{borderLeft : "none", borderRight : "none", width : "5%"}}>AP</th>
														<th style={{borderLeft : "none", borderRight : "none", width : "5%"}}>D</th>
														<th style={{borderLeft : "none", borderRight : "none", width : "35%"}}>ABILITIES</th>
													</tr>
												</thead>
												{unit.equipment.split(', ').map((item, index) => {
													return (
														<tbody key={index}>
															{guns.map((gun, index) => {
																if (item === gun.weapon) {
																	return (
																		<tr key={index}>
																			<td style={{width : "25%"}}>{gun.weapon}</td>
																			<td style={{width : "5%"}}>{gun.range}"</td>
																			<td style={{width : "20%"}}>{gun.type}</td>
																			<td style={{width : "5%"}}>{gun.strength}</td>
																			<td style={{width : "5%"}}>{gun.AP}</td>
																			<td style={{width : "5%"}}>{gun.damage}</td>
																			<td style={{width : "35%"}}>{gun.abilities}</td>
																		</tr>
																	)
																}
															})}
														</tbody>
													)
												})}
										</table>
										<table className="table table-bordered" style={{backgroundColor : "#cec9c7",  borderTop : "2px solid black"}}>
											<thead>
												<tr>
													<th>
														<span style={{float : "left"}}>ABILITIES:&nbsp;</span>
														<span style={{float : "left", fontWeight : "300"}}>{unit.wargearOptions2}</span>
													</th>
												</tr>
											</thead>
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
