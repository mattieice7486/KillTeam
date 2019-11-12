import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import ReactTooltip from 'react-tooltip'
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
			let newArray = []; 
		for (let i = 0; i < Object.values(sessionStorage).length; i++) {
			newArray.push(JSON.parse(Object.values(sessionStorage)[i]))
        this.setState({
        units: newArray,
      })  
		}
  }

  deleteUnit = id => {
    this.confirm1.open('Are you sure?', () => {
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
              <h1>Squad Summary</h1>
            </Jumbotron>
            {this.state.units.length ? (
              <List>
                {this.state.units.map(unit => (
                  <ListItem key={unit.id}>
                    <DeleteBtn onClick={() => this.deleteUnit(unit.id)} />
                    <Confirm ref={el => this.confirm1 = el} /> 
                    <Link to={"/units/" + unit.id}>
                    <span style={{fontSize : "24px", fontStyle : "bold"}}>
                    	{unit.unitType}
                    </span>
                    </Link>
                      <span style={{float : "right"}}>
                        {unit.pts} POINTS
                      </span>
                      	<Table className="table table-bordered" style={{backgroundColor : "#cec9c7"}}>
                          <Thead>
                            <Tr style={{borderLeft : "none", borderRight : "none", borderTop : "2px solid black", backgroundColor : "#c94309"}}>
                              <Th style={{borderLeft : "none", borderRight : "none", width : "30%"}}>NAME</Th>
                              <Th style={{borderLeft : "none", borderRight : "none"}}>M&nbsp;</Th>
                              <Th style={{borderLeft : "none", borderRight : "none"}}>WS</Th>
                              <Th style={{borderLeft : "none", borderRight : "none"}}>BS</Th>
                              <Th style={{borderLeft : "none", borderRight : "none"}}>S&nbsp;</Th>
                              <Th style={{borderLeft : "none", borderRight : "none"}}>T&nbsp;</Th>
                              <Th style={{borderLeft : "none", borderRight : "none"}}>W&nbsp;</Th>
                              <Th style={{borderLeft : "none", borderRight : "none"}}>A&nbsp;</Th>
                              <Th style={{borderLeft : "none", borderRight : "none"}}>LD</Th>
                              <Th style={{borderLeft : "none", borderRight : "none"}}>SV</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            <Tr>
                              <Td style={{width : "30%"}}>{unit.name}</Td>
                              <Td>{unit.move}"</Td>
                              <Td>{unit.ws}+</Td>
                              <Td>{unit.bs}+</Td>
                              <Td>{unit.str}</Td>
                              <Td>{unit.tough}</Td>
                              <Td>{unit.wounds}</Td>
                              <Td>{unit.att}</Td>
                              <Td>{unit.ld}</Td>
                              <Td>{unit.sv}+</Td>
                            </Tr>
                          </Tbody>
                      </Table>
											<Table className="table table-bordered" style={{borderLeft : "none", borderRight : "none", backgroundColor : "#cec9c7"}}>
												<Thead>
													<Tr style={{backgroundColor : "#c94309", borderTop : "2px solid black"}}>
														<Th style={{borderLeft : "none", borderRight : "none", width : "25%"}}>WEAPON</Th>
														<Th style={{borderLeft : "none", borderRight : "none", width : "5%"}}>RANGE</Th>
														<Th style={{borderLeft : "none", borderRight : "none", width : "20%"}}>TYPE</Th>
														<Th style={{borderLeft : "none", borderRight : "none", width : "5%"}}>S</Th>
														<Th style={{borderLeft : "none", borderRight : "none", width : "5%"}}>AP</Th>
														<Th style={{borderLeft : "none", borderRight : "none", width : "5%"}}>D</Th>
														<Th style={{borderLeft : "none", borderRight : "none", width : "35%"}}>ABILITIES</Th>
													</Tr>
												</Thead>
												{unit.equipment.split(', ').map((item, index) => {
													return (
														<Tbody key={index}>
															{guns.map((gun, index) => {
																if (item === gun.weapon) {
																	return (
																		<Tr key={index}>
																			<Td style={{width : "25%"}}>{gun.weapon}</Td>
																			<Td style={{width : "5%"}}>{gun.range}"</Td>
																			<Td style={{width : "20%"}}>{gun.type}</Td>
																			<Td style={{width : "5%"}}>{gun.strength}</Td>
																			<Td style={{width : "5%"}}>{gun.AP}</Td>
																			<Td style={{width : "5%"}}>{gun.damage}</Td>
																			<Td style={{width : "35%"}}>{gun.abilities}</Td>
																		</Tr>
																	)
																} else {
																	return null;
																}
															})}
														</Tbody>
													)
												})}
										</Table>
										<Table className="table table-bordered" style={{backgroundColor : "#cec9c7",  borderTop : "2px solid black"}}>
											<Thead>
												<Tr>
													<Th>
														ABILITIES:
													</Th>
												</Tr>
											</Thead>
											<Tbody>
												<Tr>
													<Td>
														<a data-tip data-for='unit-abilities'> {unit.abilities} </a>
														<ReactTooltip id='unit-abilities' type='warning' effect='solid'>
															<span>Ability info goes here</span>
														</ReactTooltip>
													</Td>
												</Tr>
											</Tbody>
										</Table>
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
