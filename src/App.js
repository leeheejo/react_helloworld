import React, { Component } from 'react';
import TOC from './components/TOC';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';
import Subject from './components/Subject';
import Control from './components/Control';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    //컴포넌트 초기화
    this.max_content_id = 3; //UI 구현에 필요한 값이 아니므로 state로 안함. 불필요한 렌더링을 발생시킬 수 있다.
    this.state = {
      mode: "welcome",
      selected_content_id: 2,
      subject: {
        title: "WEB",
        subject: "world wide web!"
      },
      welcome: {
        title: "welcome",
        description: "Hello, React!"
      },
      contents: [
        {
          id: 1,
          title: "HTML",
          subject: "HTML is HyperText Markup Language."
        }, {
          id: 2,
          title: "CSS",
          subject: "CSS is for design."
        },
        {
          id: 3,
          title: "JS",
          subject: "JS is for interactive."
        }
      ]
    } //state 초기화
  }

  getReadContent(){
    var i = 0;
    while (i < this.state.contents.length) {
      var data = this.state.contents[i];
      if (data.id === this.state.selected_content_id) {
        return data;
      }
      i++;
    }
  }
  getContent(){
    var _title, _desc, _article, _content = null;
    if (this.state.mode === "welcome") {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.description;
      _article = <ReadContent title={_title} subject={_desc}></ReadContent>
    } else if (this.state.mode === "read") {
      _content = this.getReadContent();
      _article = <ReadContent title={_content.title} subject={_content.subject}></ReadContent>
    } else if (this.state.mode === "create") {
      _article = <CreateContent onSubmit={
        function(_title, _desc) {
          this.max_content_id++;
          var _contents = this.state.contents.concat(
            {
              id: this.max_content_id,
              title: _title, 
              subject: _desc
            }
          )

          //push를 통해 원본을 변경하지 않고 처리하는 방법
          // var newContents = Array.from(this.state.contents);
          // newContents.push(          
          //     {
          //       id: this.max_content_id,
          //       title: _title, 
          //       desc: _desc
          //     }
          //   )
          // object의 경우에는 var b = Object.assign({}, a);


          // this.state.contents.push(
          //   {
          //     id: this.max_content_id,
          //     title: _title, 
          //     desc: _desc
          //   }
          // )

          // push vs concat 
          // push 는 원본을 바꾸고, concat은 원본을 바꾸지 않는다. 원본을 변경한 새로운 배열이 리턴된다. 
          // state를 변경할때는 concat을 권장한다.
          this.setState({
            contents: _contents, 
            mode: "read", 
            selected_content_id : this.max_content_id
          })
          console.log(_title, _desc);
        }.bind(this)
      }></CreateContent>
    } else if (this.state.mode === "update") {
      _content = this.getReadContent();
      _article = <UpdateContent data = {_content} onSubmit={
        function(_id, _title, _desc) {
          var _contents = Array.from(this.state.contents);
          var i =0; 
          while (i < _contents.length) {
            if(_contents[i].id === _id) {
              _contents[i] = {
                id :  _id, 
                title : _title,
                subject : _desc
              }
              break;
            }
            i++;
          }
          
          this.setState({
            contents: _contents, 
            mode : "read" 
          })
          
        }.bind(this)
      }></UpdateContent>
    }

    return _article;
  }
  render() {
    
    return (
      <div className="App">
        <Subject
          title={this.state.subject.title}
          subject={this.state.subject.subject}
          onChangePage={
            function () {
              this.setState({ mode: "welcome" });
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
          function (id) {
            this.setState({
              mode: "read",
              selected_content_id: Number(id)
            });
          }.bind(this)}
          data={this.state.contents}></TOC>
        <Control onChangeMode={
          function (_mode) {
            if(_mode === 'delete') {
              if(window.confirm("really??")){
                var _contents = Array.from(this.state.contents)
                var i = 0; 
                while(i < _contents.length) {
                  if(_contents[i].id === this.state.selected_content_id) {
                    _contents.splice(i, 1); //i 부터 1개 지우겠다. 
                    break;
                  }
                  i++;
                }

                this.setState({
                  contents : _contents, 
                  mode : "welcome"
                })
              }
            } else {
            this.setState({mode: _mode});
            }
          }.bind(this)     
        }></Control>
        {this.getContent()}
        
      </div>
    );
  }
}
export default App;


/*
  전달 받은 props는 readonly
  state는 setState를 통해서 값 변경 가능
*/