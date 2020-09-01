import React, {Component} from 'react';

class UpdateContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.data.id, 
      title : this.props.data.title, 
      desc : this.props.data.subject
    }
    this.inputFormHandler = this.inputFormHandler.bind(this);
  }

  inputFormHandler(e) {
    this.setState({[e.target.name] : e.target.value})
  }
    render(){
      console.log(this.props.data)
      console.log("UpdateContent render")
      return(
        <article>
          <h2>
          Update
          </h2>
          <form action="/create_process" method="post"
            onSubmit={function(e){
              e.preventDefault();
              this.props.onSubmit(
                this.state.id, 
                e.target.title.value, 
                e.target.desc.value);
            }.bind(this)
            }>
            <input type="hidden" name="id" value={this.state.id}></input>
            <p>
              <input 
                type = "text" 
                name = "title" 
                placeholder="title"
                value ={this.state.title} // 여기서 props를 안쓰는 이유는 props는 readonly여서 수정이 안되므로 state로 변경해서 처리
                onChange= { this.inputFormHandler}
              ></input>
            </p>
            <p>
              <textarea 
                name = "desc" 
                placeholder="description"
                value = {this.state.desc}
                onChange= {this.inputFormHandler}>
              </textarea>
            </p>
            <p>
              <input type="submit">

              </input>
            </p>
          </form>
        </article>
      );
    }
  }

  export default UpdateContent;