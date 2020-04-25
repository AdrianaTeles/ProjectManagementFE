import React, { Component } from 'react';
import './App.css';
import Project from './Project/Project'
import axios from 'axios';

class App extends Component {

 state = {
    projects: []
  }

  addDurationbyInputHandler =( event, id) => {
    const projectIndex = this.state.projects.findIndex(p=>{
      return p.id === id;
    });

    const project = {
      ...this.state.projects[projectIndex]
    };
    //alternativa
    //const project = Object.assign({}, this.state.projects[projectIndex]);

    project.duration = event.target.value;

    const projects =[...this.state.projects];
    projects[projectIndex] = project;
    this.setState({projects:projects })


    /*let config = {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        }
      }
    const object = {
        time : event.target.value,
        projectId : id         
    }
    console.log(object);
    axios.post('https://localhost:44309/TimeManagement', object, config)
      .then(response => {
        console.log(response);
      });*/
  }
  addDurationByInputValueHandler =(projectId, duration) => {
    
    let config = {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        }
      }
    const object = {
        time : duration,
        projectId : projectId        
    }
    console.log(object);
    axios.put('https://timemanagementservice.herokuapp.com/TimeManagement', object, config)
      .then(response => {
        console.log(response);
      });
   }

  toggleProjectsHandler =  () => { 
   const doesShow = this.state.showProjects;
   this.setState({showProjects : !doesShow})
  }

  componentDidMount(){
    axios.get('https://timemanagementservice.herokuapp.com/TimeManagement')
        .then(response=> {
          this.setState({projects:response.data.projectInformations});
        });
  }

  render() {
    const style = {
        backgroundColor: 'white',
        font: 'inherit',
        border: '1px solid blue',
        padding: '8px',
        cursor: 'pointer'
    }

    let projects = null;

    if(this.state.showProjects){
      projects = (
        <div> 
          {this.state.projects.map((project, index) => {
            return <Project 
                    click={()=>this.addDurationByInputValueHandler(project.id, project.duration)}
                    name= {project.projectName} 
                    duration ={project.duration}
                    key= {project.id}
                    changed={(event)=>this.addDurationbyInputHandler(event, project.id)}/>
          })} 
        </div> 
      );
    }

    return (
      <div className="App">
       <h1> Hi, Im a React app </h1>
       <p> This is really working </p>
       <button 
          style={style}
          onClick={this.toggleProjectsHandler}>See All Projects</button>
          {projects}
      </div>  
    );
      // return React.createElement('div',{className:'App'},React.createElement('h1',null,  'Hi, I\'m a React App !!!'));

  }
}

export default App;
