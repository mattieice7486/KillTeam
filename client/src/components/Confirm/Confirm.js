import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class Confirm extends React.Component {
	constructor(props, context) {
		super(props, context);
		
		this.state = {
			isOpen: false,
			title: '',
			yesCb: _ => _,
		};
		
		this.open = this.open.bind(this);
		this.close = this.close.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
	}

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }

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
        <Modal
          isOpen={this.state.isOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Confirm Modal"
        >
 
					<h3>{this.state.title}</h3>
					<button className="btn" onClick={this.handleYes}>Yes</button>
					<button className="btn" onClick={this.handleNo}>No</button>
          {/* <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2> */}
        </Modal>
				</div>
    );
  }
}

export default Confirm;