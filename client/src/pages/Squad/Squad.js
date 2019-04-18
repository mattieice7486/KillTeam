import React, { Component } from "react";
import firebase from 'firebase';
import { auth } from '../../utils/Firebase';
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import Jumbotron from "../../components/Jumbotron";
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
              <h1>Your Squads</h1>
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
                          <div>
                            <table className="table table-dark">
                              <thead>
                                <tr>
                                  <th scope="col">#</th>
                                  <th>
                                    <button className="btn btn-danger" onClick={() => this.removeItem(item.id)}>Remove Squad</button>
                                  </th>
                                  <th scope="col">Username</th>
                                  <th scope="col">
                                    <span>Squad Name&nbsp;
                                    </span>
                                  </th>
                                  <th scope="col">
                                    <span>Squad Total&nbsp;
                                    </span>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr key={item.id}>
                                  <td>{index + 1}</td>
                                  <td><img src={item.avatar} alt="avatar" style={{borderRadius : "50%", height : "50px", width : "auto"}}></img></td>
                                  <td>{item.user}</td>
                                  <td>{item.squadName}</td>
                                  <td>{item.total}</td>
                                </tr>
                              </tbody>
                            </table>
                            <Col size="sm-12">
                              <List>
                                {this.state.items[index].squadMembers.map((squadMember, index) => {
                                  return (
                                    <ListItem key={index}>
																		<span style={{fontSize : "24px", fontStyle : "bold"}}>
                    									{squadMember.unitType}
                    								</span>
                                      <span style={{float : "right"}}>
                                        {squadMember.pts} POINTS
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
                                            <td style={{width : "30%"}}>{squadMember.name}</td>
                                            <td>{squadMember.move}"</td>
                                            <td>{squadMember.ws}+</td>
                                            <td>{squadMember.bs}+</td>
                                            <td>{squadMember.str}</td>
                                            <td>{squadMember.tough}</td>
                                            <td>{squadMember.wounds}</td>
                                            <td>{squadMember.att}</td>
                                            <td>{squadMember.ld}</td>
                                            <td>{squadMember.sv}+</td>
                                          </tr>
                                        </tbody>
                                      </table>
                                      <table className="table table-bordered" style={{backgroundColor : "#cec9c7"}}>
                                        <thead>
																					<tr style={{borderLeft : "none", borderRight : "none", borderTop : "2px solid black", backgroundColor : "#c94309"}}>
																						<th style={{borderLeft : "none", borderRight : "none", width : "25%"}}>WEAPON</th>
																						<th style={{borderLeft : "none", borderRight : "none", width : "5%"}}>RANGE</th>
																						<th style={{borderLeft : "none", borderRight : "none", width : "20%"}}>TYPE</th>
																						<th style={{borderLeft : "none", borderRight : "none", width : "5%"}}>S</th>
																						<th style={{borderLeft : "none", borderRight : "none", width : "5%"}}>AP</th>
																						<th style={{borderLeft : "none", borderRight : "none", width : "5%"}}>D</th>
																						<th style={{borderLeft : "none", borderRight : "none", width : "35%"}}>ABILITIES</th>
                                          </tr>
                                        </thead>
																				{squadMember.equipment.split(', ').map((item, index) => {
																					return (
																						<tbody key={index}>
																							{guns.map((gun, index) => {
																								if (item === gun.weapon) {
																									return (
																										<tr key={index}>
																											<td>{gun.weapon}</td>
																											<td>{gun.range}"</td>
																											<td>{gun.type}</td>
																											<td>{gun.strength}&nbsp;</td>
																											<td>{gun.AP}</td>
																											<td>{gun.damage}</td>
																											<td>{gun.abilities}</td>
																										</tr>
																									)
																								}
																							})}
																						</tbody>
																					)
																				})}
                                      </table>
																			<table className="table" style={{backgroundColor : "#cec9c7",  borderTop : "2px solid black"}}>
																				<thead>
																					<tr style={{ border : "2px solid black" }}>
																						<th>
																							<span style={{float : "left"}}>ABILITIES:&nbsp;</span>
																							<span style={{float : "left", fontWeight : "300"}}>{squadMember.abilities}</span>
																						</th>
																						<th>&nbsp;</th>
																						<th>&nbsp;</th>
																						<th>&nbsp;</th>
																					</tr>
																			
																					<tr style={{ border : "2px solid black" }}>
																						<th>
																							<span style={{float : "left"}}>SPECIALISM:&nbsp;</span>
																							<span style={{float : "left", fontWeight : "300"}}></span>
																						</th>
																						<th>
																							<span style={{float : "left"}}>DEMEANOUR:&nbsp;</span>
																							<span style={{float : "left", fontWeight : "300"}}></span>
																						</th>
																						<th>&nbsp;</th>
																						<th>&nbsp;</th>
																					</tr>
																					<tr style={{ border : "2px solid black" }}>
																						<th>
																							<span style={{float : "left"}}>EXPERIENCE&nbsp;</span>
																						</th>
																						<th>
																							<span style={{float : "left"}}>FLESH WOUNDS&nbsp;</span>
																						</th>
																						<th>
																							<span style={{float : "left"}}>CONVALESCENCE&nbsp;</span>
																						</th>
																						<th>
																							<span style={{float : "left"}}>NEW RECRUIT&nbsp;</span>
																						</th>
																					</tr>
																					<tr style={{ borderTop : "2px solid black" }}>
																						<th>
																							<div className="custom-control custom-checkbox custom-control-inline">
																								<input type="checkbox" className="custom-control-input" id="customCheck1"></input>
																								<label className="custom-control-label" for="customCheck1"></label>
																							</div>
																							<div className="custom-control custom-checkbox custom-control-inline">
																								<input type="checkbox" className="custom-control-input" id="customCheck2"></input>
																								<label className="custom-control-label" for="customCheck2"></label>
																							</div>
																							<div className="custom-control custom-checkbox custom-control-inline">
																								<input type="checkbox" className="custom-control-input" id="customCheck3"></input>
																								<label className="custom-control-label" for="customCheck3"></label>
																							</div>
																							<div className="custom-control custom-checkbox custom-control-inline">
																								<input type="checkbox" className="custom-control-input" id="customCheck4"></input>
																								<label className="custom-control-label" for="customCheck4"></label>
																							</div>
																							<div className="custom-control custom-checkbox custom-control-inline">
																								<input type="checkbox" className="custom-control-input" id="customCheck5"></input>
																								<label className="custom-control-label" for="customCheck5"></label>
																							</div>
																							<div className="custom-control custom-checkbox custom-control-inline">
																								<input type="checkbox" className="custom-control-input" id="customCheck6"></input>
																								<label className="custom-control-label" for="customCheck6"></label>
																							</div>
																							<div className="custom-control custom-checkbox custom-control-inline">
																								<input type="checkbox" className="custom-control-input" id="customCheck7"></input>
																								<label className="custom-control-label" for="customCheck7"></label>
																							</div>
																							<div className="custom-control custom-checkbox custom-control-inline">
																								<input type="checkbox" className="custom-control-input" id="customCheck8"></input>
																								<label className="custom-control-label" for="customCheck8"></label>
																							</div>
																							<div className="custom-control custom-checkbox custom-control-inline">
																								<input type="checkbox" className="custom-control-input" id="customCheck9"></input>
																								<label className="custom-control-label" for="customCheck9"></label>
																							</div>
																							<div className="custom-control custom-checkbox custom-control-inline">
																								<input type="checkbox" className="custom-control-input" id="customCheck10"></input>
																								<label className="custom-control-label" for="customCheck10"></label>
																							</div>
																							<div className="custom-control custom-checkbox custom-control-inline">
																								<input type="checkbox" className="custom-control-input" id="customCheck11"></input>
																								<label className="custom-control-label" for="customCheck11"></label>
																							</div>
																							<div className="custom-control custom-checkbox custom-control-inline">
																								<input type="checkbox" className="custom-control-input" id="customCheck12"></input>
																								<label className="custom-control-label" for="customCheck12"></label>
																							</div>
																						</th>
																						<th>
																							<div className="custom-control custom-checkbox custom-control-inline">
																								<input type="checkbox" className="custom-control-input" id="customCheck13"></input>
																								<label className="custom-control-label" for="customCheck13"></label>
																							</div>
																							<div className="custom-control custom-checkbox custom-control-inline">
																								<input type="checkbox" className="custom-control-input" id="customCheck14"></input>
																								<label className="custom-control-label" for="customCheck14"></label>
																							</div>
																							<div className="custom-control custom-checkbox custom-control-inline">
																								<input type="checkbox" className="custom-control-input" id="customCheck15"></input>
																								<label className="custom-control-label" for="customCheck15"></label>
																							</div>
																						</th>
																						<th>
																							<div className="custom-control custom-checkbox custom-control-inline">
																								<input type="checkbox" className="custom-control-input" id="customCheck16"></input>
																								<label className="custom-control-label" for="customCheck16"></label>
																							</div>
																						</th>
																						<th>
																							<div className="custom-control custom-checkbox custom-control-inline">
																								<input type="checkbox" className="custom-control-input" id="customCheck17"></input>
																								<label className="custom-control-label" for="customCheck17"></label>
																							</div>
																						</th>
																					</tr>
																				</thead>
																			</table>
                                    </ListItem>     
																	)
																})}
                              </List>
                            </Col>
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
