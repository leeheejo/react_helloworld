import React, {Component} from 'react';

class Subject extends Component { //컴포넌트는 하나의 최상의 태그만 사용해야 한다!

    render(){
      return(
        <header>
          <h2><a href="/" onClick={
              function(e) {
                  e.preventDefault();
                  this.props.onChangePage();
          }.bind(this)}>{this.props.title}</a></h2>
          {this.props.subject}
        </header> 
      );
    }
  }


  export default Subject;