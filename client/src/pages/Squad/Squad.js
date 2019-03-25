import React, { Component } from "react";
import firebase from 'firebase';
import { auth } from '../../utils/Firebase';
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { FormBtn } from "../../components/Form";
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
      let counter = 0;
      for (let item in items) {
        if (counter > 5) break;
        newState.push({
          id: item,
          user: items[item].user,
          squadName: items[item].squadName,
          total: items[item].total,
          avatar: items[item].avatar,
          squadMembers: items[item].units
        });
        counter += 1;
      }
      this.setState({
        items: newState
      });
    });
  }

  console = () => {
    for (let item in this.state.items) {
      for (let squadMember in this.state.items[item].squadMembers)
      console.log(this.state.items[item].squadMembers[squadMember].name);
    }
    console.log(this.state.items)
    console.log(this.state.user);
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
            <FormBtn
              onClick={this.console}
							>
            Console
            </FormBtn>
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
                            <Col size="sm-10">
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
																			<table className="table table-bordered" style={{backgroundColor : "#cec9c7",  borderTop : "2px solid black"}}>
																				<thead>
																					<tr>
																						<th>
																							<span style={{float : "left"}}>ABILITIES:&nbsp;</span>
																							<span style={{float : "left", fontWeight : "300"}}>{squadMember.wargearOptions2}</span>
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
