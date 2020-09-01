import React, {Component} from 'react';

class TOC extends Component {
  shouldComponentUpdate(newProps, newState){
    console.log("===> shouldComponentUpdate", 
    this.props.data, 
    newProps);

    if(this.props.data === newProps.data) {
      return false;
    } 

    return true;
  }
    render(){
      console.log("===> TOC render")
        var lists=[];
        var data = this.props.data;
        var i = 0; 
        console.log(this.props)

        while(i < data.length) {
        lists.push(
          <li key={data[i].id}>
            <a href= {"/content/"+ data[i].id}
               data-id = {data[i].id} //data로 시작하는 애는 e.target.dateset 하위에서 찾을 수 있다.
               onClick={ function(e) {
                e.preventDefault();
                this.props.onChangePage(e.target.dataset.id);
               }.bind(this)
               }>{data[i].title}</a>


          {/* <a href= {"/content/"+ data[i].id}
               data-id = {data[i].id} 
               onClick={ function(id, e) { //2. function의 첫번째 매개변수로 들어오게 된다. 
                e.preventDefault();
                this.props.onChangePage(id); //3. 여기서 이렇게 써주면 위의 예제와 동일하게 동작한다. 
               }.bind(this, data[i].id) // 1. bind의 두번째 매개변수로 넣으면 
               }>{data[i].title}</a>  */}
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