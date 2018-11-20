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
              <h1>&ldquo;{this.state.unit.name}&rdquo;</h1>
              <h2>{this.state.unit.modelType}</h2>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-6 md-offset-1">
            <article>
              <h1 className="text-light">Equipment</h1>
              <p className="text-light">
                {this.state.unit.equipment}
              </p>
              <h2 className="text-light">Race</h2>
              <p className="text-light">
                {this.state.unit.race}
              </p>
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
