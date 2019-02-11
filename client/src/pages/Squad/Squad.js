import React, { Component } from "react";
import firebase from 'firebase';
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List } from "../../components/List";
import { FormBtn } from "../../components/Form";
import Jumbotron from "../../components/Jumbotron";
import Confirm from "../../components/Confirm";

class Squad extends Component {
  constructor() {
    super();
    this.state = {
      units: [],
      items: []
    };
  }
    // When this component mounts, grab the unit with the _id of this.props.match.params.id
    // e.g. localhost:3000/units/599dcb67f0f16317844583fc
    componentDidMount() {
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
            // name: items[item].units[0].name,
            // unitType: items[item].units[0].unitType,
            // move: items[item].units[0].move,
            // ws: items[item].units[0].ws,
            // bs: items[item].units[0].bs,
            // str: items[item].units[0].str,
            // tough: items[item].units[0].tough,
            // wounds: items[item].units[0].wounds,
            // att: items[item].units[0].att,
            // ld: items[item].units[0].ld,
            // sv: items[item].units[0].sv,
            // equipment: items[item].units[0].equipment,
            // wargearOptions: items[item].units[0].wargearOptions,
            avatar: items[item].avatar,
            squadMembers: items[item].units
          });
          counter += 1;
        }
        this.setState({
          items: newState
        });
      });
    //   API.getUnit(this.props.match.params.id)
    //     .then(res => this.setState({ unit: res.data }))
    //     .catch(err => console.log(err));
    //   API.getUnits()
    //     .then(res =>
    //       this.setState({
    //         units: res.data,
    //         name: "",
    //         equipment: "",
    //         move: "",
    //         ws: "",
    //         bs: "",
    //         str: "",
    //         tough: "",
    //         wounds: "",
    //         att: "",
    //         ld: "",
    //         sv: "",
    //         pts: "",
    //         race: {},
    //         unitType: {},
    //         wargearOptions: {}
    //       })
    //     )
    //     .catch(err => console.log(err));
    //     console.log(this.state.items)
    }

  console = () => {
    console.log(this.state.items);
    console.log(this.state.items[0].squadMembers);
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
            Total
            </FormBtn>
          </Col>
        </Row>
        <Row>
          <Col size="sm-12">
            {this.state.items.length ? (
              <div>
                {this.state.items.map((item, index) => {
                    return (
                      <div>
                        <button className="btn btn-danger" onClick={() => this.removeItem(item.id)}>Remove Squad</button>
                        <Confirm ref={el => this.confirm1 = el} /> 
                        <table className="table table-dark">
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th></th>
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
                          <h2 className="text-light">&ldquo;{item.squadMembers[0].name}&rdquo;</h2>
                          <h3 className="text-light">{item.squadMembers[0].unitType}</h3>
                          &nbsp;
                          <h4 className="text-light" style={{textAlign : "right"}}>
                            {item.squadMembers[0].pts} points
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
                              <tr key={item.squadMembers._id}>
                                <td>{item.squadMembers[0].move}"</td>
                                <td>{item.squadMembers[0].ws}+</td>
                                <td>{item.squadMembers[0].bs}+</td>
                                <td>{item.squadMembers[0].str}</td>
                                <td>{item.squadMembers[0].tough}</td>
                                <td>{item.squadMembers[0].wounds}</td>
                                <td>{item.squadMembers[0].att}</td>
                                <td>{item.squadMembers[0].ld}</td>
                                <td>{item.squadMembers[0].sv}+</td>
                              </tr>
                            </tbody>
                          </table>
                          <h2 className="text-light">Equipment</h2>
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
                            <tr key={item.squadMembers._id}>
                              <td>{item.squadMembers[0].equipment}</td>
                              <td>{item.squadMembers[0].ws}"</td>
                              <td>{item.squadMembers[0].equipment}</td>
                              <td>{item.squadMembers[0].str}</td>
                              <td>-{item.squadMembers[0].tough}</td>
                              <td>{item.squadMembers[0].wounds}</td>
                              <td>{item.squadMembers[0].equipment}</td>
                            </tr>
                            <tr>
                              <td>{item.squadMembers[0].wargearOptions}</td>
                              <td>{item.squadMembers[0].ws}"</td>
                              <td>{item.squadMembers[0].wargearOptions}</td>
                              <td>{item.squadMembers[0].str}</td>
                              <td>-{item.squadMembers[0].tough}</td>
                              <td>{item.squadMembers[0].wounds}</td>
                              <td>{item.squadMembers[0].wargearOptions}</td>
                            </tr>
                          </tbody>
                      </table>
                      </List>
                        </Col>
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
