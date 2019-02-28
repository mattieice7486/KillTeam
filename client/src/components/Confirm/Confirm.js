import React from 'react';

class Confirm extends React.Component {
  state = {
    isOpen: false,
    title: '',
    yesCb: _ => _,
  };
  open = (title, yesCb) => {
    this.setState({
      isOpen: true,
      title,
      yesCb,
    });
  };
  close = () => this.setState({ isOpen: false, title: '' });
  handleNo = e => {
    e.preventDefault();
    this.close();
  };
  handleYes = e => {
    e.preventDefault();
    this.close();
    this.state.yesCb();
  };
  render () {
    if (!this.state.isOpen) return null;
    return (
      <div>
        <h3 className="text-light">{this.state.title}</h3>
        <button className="btn" onClick={this.handleYes}>Yes</button>
        <button className="btn" onClick={this.handleNo}>No</button>
      </div>
    );
  }
}

export default Confirm;