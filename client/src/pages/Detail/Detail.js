import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import Jumbotron from "../../components/Jumbotron";
import ReactTooltip from 'react-tooltip'
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
                      <Td style={{width : "30%"}}>
                        {this.state.unit.name}
                      </Td>
                      <Td>
                        {this.state.unit.move}"
                      </Td>
                      <Td>
                        {this.state.unit.ws}+
                      </Td>
                      <Td>
                        {this.state.unit.bs}+
                      </Td>
                      <Td>
                        {this.state.unit.str}
                      </Td>
                      <Td>
                        {this.state.unit.tough}
                      </Td>
                      <Td>
                        {this.state.unit.wounds}
                      </Td>
                      <Td>
                        {this.state.unit.att}
                      </Td>
                      <Td>
                        {this.state.unit.ld}
                      </Td>
                      <Td>
                        {this.state.unit.sv}+
                      </Td>
                    </Tr>
                  </Tbody>
              </Table>
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
								<Table className="table table-bordered" style={{backgroundColor : "#cec9c7"}}>
									<Thead>
										<Tr>
											<Th>
												EQUIPMENT:
											</Th>
										</Tr>
									</Thead>
									<Tbody>
										<Tr>
											<Td>
												<a data-tip data-for='unit-equipment'>	{this.state.unit.equipment} </a>
												<ReactTooltip id='unit-equipment' type='error'>
													<span>Equipment info goes here</span>
												</ReactTooltip>
											</Td>
										</Tr>
									</Tbody>
								</Table>
								<Table className="table table-bordered" style={{backgroundColor : "#cec9c7"}}>
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
												<a data-tip data-for='unit-abilities'> {this.state.unit.abilities} </a>
												<ReactTooltip id='unit-abilities' type='warning' effect='solid'>
													<span>Ability info goes here</span>
												</ReactTooltip>
											</Td>
										</Tr>
									</Tbody>
								</Table>
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
