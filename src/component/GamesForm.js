import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { saveGame } from '../actions';
import { Redirect } from 'react-router-dom';

class GamesForm extends React.Component {
  state = {
    title: '',
    cover: '',
    errors: '',
    isLoading: false,
    done: false
  };

  handleChange = (e) => {
    e.stopPropagation();
    if(!!this.state.errors[e.target.name]) {
      const errors = Object.assign({}, this.state.errors)
      delete errors[e.target.name]
      this.setState({
        [e.target.name]: e.target.value,
        errors
      })
    } else {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if(this.state.title === '') { errors.title = "Title can't be blank"}
    if(this.state.cover === '') { errors.cover = "Cover can't be blank"}
    this.setState({errors});
    const isValid = Object.keys(this.state.errors).length === 0
    if(isValid) {
      const { title, cover } = this.state;
      this.setState({isLoading: true});
      this.props.saveGame({ title, cover }).then(
        () => {this.setState({ done: true })},
        (err) => err.response.json().then(({errors}) => this.setState({errors, isLoading: false}))
      );
    }
  }
  render() {
    const form = (
      <form className={classnames("ui", "form", { loading: this.state.isLoading})} onSubmit={this.handleSubmit}>
        <h1>Add new game</h1>
        {!!this.state.errors.global && <div className="ui negative message"><p>{this.state.errors.global}</p></div>}
        <div className={classnames("field", { error: !!this.state.errors.title})}>
          <label htmlFor="title">Title</label>
          <input name="title" id="title" type="text" value={this.state.title} onChange={this.handleChange}/>
        </div>
        <div className={classnames("field", { error: !!this.state.errors.cover})}>
          <label htmlFor="cover">Cover URL</label>
          <input name="cover" id="cover-url" type="text" value={this.state.cover} onChange={this.handleChange} />
        </div>
        <div className="field">
          {this.state.cover.trim() === '' ? '' : <img className="ui small bordered image" src={this.state.cover} alt="cover" /> }
        </div>
        <div className="field"><button className="ui primary button">Save</button></div>
      </form>
    );
    return (
      <div>
        {this.state.done ? <Redirect to="/games" /> : form}
      </div>
    );
  }
}
function mapStateToProps(state) {
  this.props = {
    title: state.title,
    cover: state.cover
  }
}
export default connect(mapStateToProps, { saveGame })(GamesForm);
