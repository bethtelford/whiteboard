import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchGroups, fetchProjects, fetchBoards } from './../../ducks/actions/index';

import Loader from './../Loader/Loader.js';
import SideNav from './SideNav/SideNav';
import BoardGrid from './BoardGrid/BoardGrid';

import './Dashboard.css';

class Dashboard extends Component {
  componentWillReceiveProps(newProps) {
    if (!newProps.userInfo.loggedIn && !newProps.userInfo.loggedLoading) {
      this.props.history.push('/')
    }
    // let id = newProps.userInfo.id;
    // if (this.props.userInfo.id !== newProps.userInfo.id ) {
    //   this.props.fetchGroups(id);
    //   this.props.fetchProjects(id);
    //   this.props.fetchBoards(id);
    // }
  }
  render() {
    return (
      <div id='Dashboard'>
         {this.props.groupsLoad && this.props.projectsLoad && this.props.boardsLoad
        ?
          <Loader small={false}/>
        :
          null
        } 
        <SideNav />
        <Switch>
          <Route path='/dashboard' exact render={() => {
            return <div className='Dashboard_selected'>
              <h1>Select a group to get started</h1>
              <h2>If you don't have any groups yet, click the '+' button next to 'Your Groups' to add one</h2>
            </div>
          }} />
          <Route path='/dashboard/:groupid' exact render={() => {
            return <div className='Dashboard_selected'>
              <h1>Select a project to see all of its whiteboards</h1>
              <h2>If you don't have any projects yet, hover over the group name and select 'Add Project' from the dropdown menu</h2>
            </div>
          }} />
          <Route path='/dashboard/:groupid/:projectid' component={BoardGrid} />
        </Switch>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    userInfo: state.userInfo,
    groupsLoad: state.userData.groupsLoad,
    projectsLoad: state.userData.projectsLoad,
    boardsLoad: state.userData.boardsLoad
  }
}
export default connect(mapStateToProps, { fetchGroups, fetchProjects, fetchBoards })(Dashboard);
