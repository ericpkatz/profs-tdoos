import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

//TODO - move me!
const Input = ({ name, label, value, onChange})=> {
  return (
    <div>
      <label htmlFor={ name }>
        { label }
      </label>
      <br />
      <input onChange={ onChange } id={ name } name={ name } value={ value } />
    </div>
  );
};

export default class TodoForm extends Component {
  constructor(){
    super();
    this.state = {
      assignee: '',
      taskName: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }
  async componentDidMount(){
    if(this.props.match){
      const response = await axios.get(`/api/todos/${this.props.match.params.id}`);
      const { assignee, taskName } = response.data;
      this.setState({
        assignee,
        taskName
      });
    }
  }
  async onSave(ev){
    ev.preventDefault();
    if(this.props.match){
      await axios.put(`/api/todos/${this.props.match.params.id}`, this.state);
      this.props.history.push('/');
    }
    else {
      this.props.create(this.state);
      this.setState({
        assignee: '',
        taskName: ''
      });
    }
  }
  onChange(ev){
    this.setState({ [ev.target.name]: ev.target.value });
  }
  render () {
    const { assignee, taskName } = this.state;
    const { onChange, onSave } = this;
    const updating = !!this.props.match;
    return (
      <form onSubmit={ onSave }>
        <Input label='Assign to' value={ assignee } onChange={ onChange } name='assignee' />
        <Input label='Task' value={ taskName } onChange={ onChange } name='taskName' />
        <button>{ updating ? 'Update': 'Create'}</button>
        {
          updating && <Link to='/'>Cancel</Link>
        }
      </form>
    )
  }
}
