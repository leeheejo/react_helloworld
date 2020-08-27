import React, {Component} from 'react';
import TOC from './components/TOC';
import Content from './components/Content';
import Subject from './components/Subject';

import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    //컴포넌트 초기화
    this.state = {
      mode : "read",
      selected_content_id:2,
      subject :{
        title : "WEB", 
        subject : "world wide web!"
      }, 
      welcome: {
        title: "welcome", 
        description: "Hello, React!"
      },
      contents : [
        {
          id:1, 
          title:"HTML",
          subject: "HTML is HyperText Markup Language."
        }, {
          id:2, 
          title:"CSS",
          subject: "CSS is for design."
        }, 
        {
          id:3, 
          title:"JS",
          subject: "JS is for interactive."
        }
      ]
    } //state 초기화
  }

  render(){
    var _title, _desc = null;
    if(this.state.mode === "welcome") {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.description;
    } else if(this.state.mode ==="read") {
      var i = 0; 
      while(i < this.state.contents.length) {
        var data = this.state.contents[i];
        if( data.id === this.state.selected_content_id) {
          _title = data.title;
          _desc = data.subject;
          break;
        }
        i++;
      }
    }
    return (
      <div className ="App">
        <Subject 
          title = {this.state.subject.title} 
          subject = {this.state.subject.subject} 
          onChangePage = {
            function(){
              this.setState({mode:"welcome"});
            }.bind(this)
          }> 
        </Subject>
        {/* <header>
          <h2><a href="/" onClick= {function(e){
            console.log(e);
            e.preventDefault(); // a태그의 기본적인 동작방법을 금지시킨다. (화면 리로딩)
            alert('hi');
            // this.state.mode = "welcome"; 이렇게 state의 값을 변경하면 안된다 => this.setState()로 극-복
            // constructor에서는 this.state.어쩌구 = "" 이런 식으로 값 변경 가능
            // 리엑트 입장에서 setState를 사용하지 않으면 state 값이 변경된 것을 알 수가 없음. 
            this.setState({
              mode:'welcome'
            }) 
            //function안에서 this 는 컴포넌트의 this가 아니다. => bind(this)를 함수 뒤에 추가해서 극복한다.
            
          }.bind(this)}> 
            {this.state.subject.title}</a></h2>
          {this.state.subject.subject}
        </header>  */}
        <TOC onChangePage={ 
            function(){
              this.setState({mode: "read", 
              selected_content_id : 0});
              alert('hi');
            }.bind(this) } 
            data = {this.state.contents}></TOC>
        <Content title = {_title} subject = {_desc}></Content>
      </div>
    );
  }
}
export default App;
