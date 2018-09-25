import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { TableRow } from "../../components/Table";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";

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
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>
              &quot;{this.state.unit.name}&quot; {this.state.unit.modelType}
              </h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">
            <article>
              <h1>Equipment</h1>
              <p>
                {this.state.unit.equipment}
              </p>
              <table>
                  <thead>
                    <tr>
                    <th>
                      {this.state.unit.move}
                    </th>
                    <th>
                      {this.state.unit.ws}
                    </th>
                    <th>
                      {this.state.unit.bs}
                    </th>
                    <th>
                      {this.state.unit.str}
                    </th>
                    <th>
                      {this.state.unit.tough}
                    </th>
                    <th>
                      {this.state.unit.wounds}
                    </th>
                    <th>
                      {this.state.unit.att}
                    </th>
                    <th>
                      {this.state.unit.ld}
                    </th>
                    <th>
                      {this.state.unit.sv}
                    </th>
                    </tr>
                  </thead>
              </table>
            </article>
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

export default Detail;
