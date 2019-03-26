import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import guns from "../../utils/guns";


class Detail extends Component {
  state = {
    unit: {}
  };
  // When this component mounts, grab the unit with the _id of this.props.match.params.id
  // e.g. localhost:3000/units/599dcb67f0f16317844583fc
  componentDidMount() {
    API.getUnit(this.props.match.params.id)
      .then(res => this.setState({ unit: res.data }))
      .catch(err => console.log(err));
  }

  render() {
		console.log(this.state.unit)
    return (
			<Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>&ldquo;{this.state.unit.name}&rdquo;</h1>
              <h2>{this.state.unit.unitType}</h2>
            </Jumbotron>
          </Col>
        </Row>
				{this.state.unit ? (
        <Row>
          <Col size="md-2 md-offset-1">&nbsp;</Col>
          <Col size="md-8 md-offset-1">
            <List>
							<ListItem>
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
                      <td style={{width : "30%"}}>
                        {this.state.unit.name}
                      </td>
                      <td>
                        {this.state.unit.move}"
                      </td>
                      <td>
                        {this.state.unit.ws}+
                      </td>
                      <td>
                        {this.state.unit.bs}+
                      </td>
                      <td>
                        {this.state.unit.str}
                      </td>
                      <td>
                        {this.state.unit.tough}
                      </td>
                      <td>
                        {this.state.unit.wounds}
                      </td>
                      <td>
                        {this.state.unit.att}
                      </td>
                      <td>
                        {this.state.unit.ld}
                      </td>
                      <td>
                        {this.state.unit.sv}+
                      </td>
                    </tr>
                  </tbody>
              </table>
							{/* <table className="table table-bordered" style={{backgroundColor : "#cec9c7"}}>
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
									{this.state.equipment.split(', ').map((item, index) => {
									return (
											<tbody>
												{guns.map((gun, index) => {
													if (item === gun.weapon) {
														return (
															<tr key={index}>
																<td>{gun.weapon}</td>
																<td>{gun.range}"</td>
																<td>{gun.type}</td>
																<td>{gun.strength}&nbsp;</td>
																<td>-{gun.AP}</td>
																<td>{gun.damage}</td>
																<td>{gun.abilities}</td>
															</tr>
														)
													}
												})}
											</tbody>
										)
									})}
							</table> */}
							<table className="table table-bordered" style={{backgroundColor : "#cec9c7",  borderTop : "2px solid black"}}>
								<thead>
									<tr>
										<th>
											<span style={{float : "left"}}>EQUIPMENT:&nbsp;</span>
											<span style={{float : "left", fontWeight : "300"}}>{this.state.unit.equipment}</span>
										</th>
									</tr>
								</thead>
							</table>
							<table className="table table-bordered" style={{backgroundColor : "#cec9c7",  borderTop : "2px solid black"}}>
								<thead>
									<tr>
										<th>
											<span style={{float : "left"}}>ABILITIES:&nbsp;</span>
											<span style={{float : "left", fontWeight : "300"}}>{this.state.unit.wargearOptions2}</span>
										</th>
									</tr>
								</thead>
							</table>
							</ListItem>
            </List>
          </Col>
				</Row>

				) : (
					<h3>No Results to Display</h3>
				)}
        <Row>
          <Col size="md-2">
            <Link to="/">← Back to Units</Link>
          </Col>
        </Row>
      </Container>
		);
  }
}

export default Detail;
