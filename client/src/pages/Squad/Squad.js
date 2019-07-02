import React, { Component } from "react";
import firebase from 'firebase';
import { auth } from '../../utils/Firebase';
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import Jumbotron from "../../components/Jumbotron";
import ReactTooltip from 'react-tooltip'
import Confirm from "../../components/Confirm";
import guns from "../../utils/guns";

class Squad extends Component {
  constructor() {
    super();
    this.state = {
      units: [],
      items: [],
      user: null
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } 
    });
    const itemsRef = firebase.database().ref('Users');
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      // let counter = 0;
      for (let item in items) {
        // if (counter > 5) break;
        newState.push({
          id: item,
          user: items[item].user,
          squadName: items[item].squadName,
          background: items[item].background,
          mission: items[item].mission,
          squadQuirk: items[item].squadQuirk,
          total: items[item].total,
          avatar: items[item].avatar,
          squadMembers: items[item].units
        });
        // counter += 1;
      }
      this.setState({
        items: newState
      });
    });
  }
  
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  removeItem(itemId) {
    this.confirm1.open('Are you sure?', () => {
      const itemRef = firebase.database().ref(`/Users/${itemId}`);
      itemRef.remove();
    })
  }

  render() {
		return (
			<Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
						{this.state.items.map((item, index) => {
							console.log(index)
							if (index === 1) {
								return (
									<div key={index}>
									{item.user === this.state.user.displayName || item.user === this.state.user.email ?
									<h1><img src={item.avatar} alt="avatar" style={{borderRadius : "50%", height : "50px", width : "auto"}}></img>{item.user}'s Squads</h1>
									: null}
									{console.log(this)}
									</div>
								)
							}
						})}
            </Jumbotron>
            <Confirm ref={el => this.confirm1 = el} />
          </Col>
        </Row>
        <Row>
          <Col size="sm-12">
            {this.state.items.length ? (
							<div>
                {this.state.items.map((item, index) => {
                    return (
                      <div key={index}>
                        {item.user === this.state.user.displayName || item.user === this.state.user.email ?
                          <div key={item.id}>
														<nav className="navbar navbar-dark" style={{backgroundColor : "#222"}}>
															<button className="btn btn-danger" onClick={() => this.removeItem(item.id)}>Remove Squad</button>
															<div  style={{color : "#fff", fontSize : "24px", 	cursor: "pointer"}}>
																<span className="nav-item" data-toggle="collapse" data-target={"#squadTitle" + index} aria-controls={"squadTitle" + index} aria-expanded="false">
																	{item.squadName} 
																</span>
															</div>
															<div style={{color : "#fff"}}>
																<span className="nav-item">
																	SQUAD TOTAL: {item.total}&nbsp;
																</span>
															<button className="navbar-toggler" type="button" data-toggle="collapse" data-target={"#squadTitle" + index} aria-controls={"squadTitle" + index} aria-expanded="false" aria-label="Toggle navigation">
																<span className="navbar-toggler-icon"></span>
															</button>
															</div>
															<div className="collapse" id={"squadTitle" + index}>
																<div style={{ padding: "10px" }}>
																	<span className="text-light" style={{ float: "left", width : "33%", textAlign: "left" }}>BACKGROUND: {item.background}</span>
																	<span className="text-light" style={{ float: "left", width : "33%", textAlign: "center" }}>MISSION: {item.mission}</span>
																	<span className="text-light" style={{ float: "left", width : "33%", textAlign: "right" }}>SQUAD QUIRK: {item.squadQuirk}</span>
																</div>
															{/*
															*
															*
															* Temporary fix for mobile screens. caused by text wrapping from the background/mission/squad quirk items.
															*
															*/}
															<br />
															<br />
															<br />
																<List>
																	{this.state.items[index].squadMembers.map((squadMember, index) => {
																		return (
																			<ListItem key={index} style={{ marginBottom: "10px", width: "100%" }}>
																			<span style={{fontSize : "24px", fontStyle : "bold"}}>
																				{squadMember.unitType}
																			</span>
																				<span style={{float : "right"}}>
																					{squadMember.pts} POINTS
																				</span>
																				<Table className="table table-bordered" style={{backgroundColor : "#cec9c7"}}>
																					<Thead>
																						<Tr style={{borderLeft : "none", borderRight : "none", border : "2px solid black", backgroundColor : "#c94309"}}>
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
																							<Td style={{width : "30%"}}>{squadMember.name}</Td>
																							<Td>{squadMember.move}"</Td>
																							<Td>{squadMember.ws}+</Td>
																							<Td>{squadMember.bs}+</Td>
																							<Td>{squadMember.str}</Td>
																							<Td>{squadMember.tough}</Td>
																							<Td>{squadMember.wounds}</Td>
																							<Td>{squadMember.att}</Td>
																							<Td>{squadMember.ld}</Td>
																							<Td>{squadMember.sv}+</Td>
																						</Tr>
																					</Tbody>
																				</Table>
																				<Table className="table table-bordered" style={{backgroundColor : "#cec9c7"}}>
																					<Thead>
																						<Tr style={{borderLeft : "none", borderRight : "none", border : "2px solid black", backgroundColor : "#c94309"}}>
																							<Th style={{borderLeft : "none", borderRight : "none", width : "25%"}}>WEAPON</Th>
																							<Th style={{borderLeft : "none", borderRight : "none", width : "5%"}}>RANGE</Th>
																							<Th style={{borderLeft : "none", borderRight : "none", width : "20%"}}>TYPE</Th>
																							<Th style={{borderLeft : "none", borderRight : "none", width : "5%"}}>S</Th>
																							<Th style={{borderLeft : "none", borderRight : "none", width : "5%"}}>AP</Th>
																							<Th style={{borderLeft : "none", borderRight : "none", width : "5%"}}>D</Th>
																							<Th style={{borderLeft : "none", borderRight : "none", width : "35%"}}>ABILITIES</Th>
																						</Tr>
																					</Thead>
																					{squadMember.equipment.split(', ').map((item, index) => {
																						return (
																							<Tbody key={index}>
																								{guns.map((gun, index) => {
																									if (item === gun.weapon) {
																										return (
																											<Tr key={index}>
																												<Td>{gun.weapon}</Td>
																												<Td>{gun.range}"</Td>
																												<Td>{gun.type}</Td>
																												<Td>{gun.strength}&nbsp;</Td>
																												<Td>{gun.AP}</Td>
																												<Td>{gun.damage}</Td>
																												<Td>{gun.abilities}</Td>
																											</Tr>
																										)
																									}
																								})}
																							</Tbody>
																						)
																					})}
																				</Table>
																				<Table className="table" style={{backgroundColor : "#cec9c7", marginBottom : "none" }}>
																					<Thead>
																						<Tr style={{ border : "2px solid black" }}>
																							<Th>
																								ABILITIES:
																							</Th>
																						</Tr>
																					</Thead>
																					<Tbody>
																						<Tr style={{ border : "2px solid black" }}>
																							<Td>
																								<a data-tip data-for='unit-abilities'> {squadMember.abilities} </a>
																								<ReactTooltip id='unit-abilities' type='warning' effect='solid'>
																									<span>Ability info goes here</span>
																								</ReactTooltip>
																							</Td>
																						</Tr>
																					</Tbody>
																				</Table>
																				<Table className="table" style={{backgroundColor : "#cec9c7", marginBottom : "none" }}>
																					<Thead>
																						<Tr style={{ border : "2px solid black" }}>
																							<Th>
																							SPECIALISM:
																							</Th>
																							<Th>
																							DEMEANOUR:
																							</Th>
																						</Tr>
																					</Thead>
																					<Tbody>
																						<Tr style={{ border : "2px solid black" }}>
																							<Td>
																								{squadMember.specialism}
																							</Td>
																							<Td>
																								{squadMember.demeanour}
																							</Td>
																						</Tr>
																					</Tbody>
																				</Table>
																				<Table className="table" style={{backgroundColor : "#cec9c7", marginBottom : "none" }}>
																					<Thead>
																						<Tr style={{ border : "2px solid black" }}>
																							<Th>
																								EXPERIENCE
																							</Th>
																							<Th>
																								FLESH WOUNDS
																							</Th>
																							<Th>
																								CONVALESCENCE
																							</Th>
																							<Th>
																								NEW RECRUIT
																							</Th>
																						</Tr>
																						</Thead>
																						<Tbody>
																							<Tr style={{ border : "2px solid black" }}>
																								<Td>
																									<div className="custom-control custom-checkbox custom-control-inline">
																										<input type="checkbox" className="custom-control-input" id="customCheck1"></input>
																										<label className="custom-control-label" htmlFor="customCheck1"></label>
																									</div>
																									<div className="custom-control custom-checkbox custom-control-inline">
																										<input type="checkbox" className="custom-control-input" id="customCheck2"></input>
																										<label className="custom-control-label" htmlFor="customCheck2"></label>
																									</div>
																									<div className="custom-control custom-checkbox custom-control-inline">
																										<input type="checkbox" className="custom-control-input" id="customCheck3"></input>
																										<label className="custom-control-label" htmlFor="customCheck3"></label>
																									</div>
																									<div className="custom-control custom-checkbox custom-control-inline">
																										<input type="checkbox" className="custom-control-input" id="customCheck4"></input>
																										<label className="custom-control-label" htmlFor="customCheck4"></label>
																									</div>
																									<div className="custom-control custom-checkbox custom-control-inline">
																										<input type="checkbox" className="custom-control-input" id="customCheck5"></input>
																										<label className="custom-control-label" htmlFor="customCheck5"></label>
																									</div>
																									<div className="custom-control custom-checkbox custom-control-inline">
																										<input type="checkbox" className="custom-control-input" id="customCheck6"></input>
																										<label className="custom-control-label" htmlFor="customCheck6"></label>
																									</div>
																									<div className="custom-control custom-checkbox custom-control-inline">
																										<input type="checkbox" className="custom-control-input" id="customCheck7"></input>
																										<label className="custom-control-label" htmlFor="customCheck7"></label>
																									</div>
																									<div className="custom-control custom-checkbox custom-control-inline">
																										<input type="checkbox" className="custom-control-input" id="customCheck8"></input>
																										<label className="custom-control-label" htmlFor="customCheck8"></label>
																									</div>
																									<div className="custom-control custom-checkbox custom-control-inline">
																										<input type="checkbox" className="custom-control-input" id="customCheck9"></input>
																										<label className="custom-control-label" htmlFor="customCheck9"></label>
																									</div>
																									<div className="custom-control custom-checkbox custom-control-inline">
																										<input type="checkbox" className="custom-control-input" id="customCheck10"></input>
																										<label className="custom-control-label" htmlFor="customCheck10"></label>
																									</div>
																									<div className="custom-control custom-checkbox custom-control-inline">
																										<input type="checkbox" className="custom-control-input" id="customCheck11"></input>
																										<label className="custom-control-label" htmlFor="customCheck11"></label>
																									</div>
																									<div className="custom-control custom-checkbox custom-control-inline">
																										<input type="checkbox" className="custom-control-input" id="customCheck12"></input>
																										<label className="custom-control-label" htmlFor="customCheck12"></label>
																									</div>
																								</Td>
																								<Td>
																									<div className="custom-control custom-checkbox custom-control-inline">
																										<input type="checkbox" className="custom-control-input" id="customCheck13"></input>
																										<label className="custom-control-label" htmlFor="customCheck13"></label>
																									</div>
																									<div className="custom-control custom-checkbox custom-control-inline">
																										<input type="checkbox" className="custom-control-input" id="customCheck14"></input>
																										<label className="custom-control-label" htmlFor="customCheck14"></label>
																									</div>
																									<div className="custom-control custom-checkbox custom-control-inline">
																										<input type="checkbox" className="custom-control-input" id="customCheck15"></input>
																										<label className="custom-control-label" htmlFor="customCheck15"></label>
																									</div>
																								</Td>
																								<Td>
																									<div className="custom-control custom-checkbox custom-control-inline">
																										<input type="checkbox" className="custom-control-input" id="customCheck16"></input>
																										<label className="custom-control-label" htmlFor="customCheck16"></label>
																									</div>
																								</Td>
																								<Td>
																									<div className="custom-control custom-checkbox custom-control-inline">
																										<input type="checkbox" className="custom-control-input" id="customCheck17"></input>
																										<label className="custom-control-label" htmlFor="customCheck17"></label>
																									</div>
																								</Td>
																							</Tr>
																					</Tbody>
																				</Table>
																			</ListItem>     
																		)
																	})}
																</List>
															</div>
														</nav>
                            </div>
                          : null}
                      </div>
                    )                
                })}
              </div>
            ) : (
              <h3 className="text-light">You must log in to see your squads</h3>
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
