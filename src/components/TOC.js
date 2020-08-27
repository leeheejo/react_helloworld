import React, {Component} from 'react';

class TOC extends Component {
    render(){
        var lists=[];
        var data = this.props.data;
        var i = 0; 
        console.log(this.props)

        while(i < data.length) {
        lists.push(
          <li key={data[i].id}>
            <a href= {"/content/"+ data[i].id}
               data-id = {data[i].id}
               onClick={ function(e) {
                e.preventDefault();
                this.props.onChangePage(e.target.dataset.id);
               }.bind(this)
               }>{data[i].title}</a>
          </li>);
            i++;
        }
      return(
        <nav>
          <ul>
            {lists}
          </ul>
        </nav>
      );
    }
  }

  // 외부에서 사용할 수 있게 허용 
  export default TOC;