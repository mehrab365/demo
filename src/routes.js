import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import HomePage from './components/home/homePage';
import AboutPage from './components/about/aboutPage';
import c from './components/course/CoursesPage';
import m from './components/course/ManageCoursePage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="courses" component={c}/>
    <Route path="course" component={m}/>
    <Route path="course/:id" component={m}/>
    <Route path="about" component={AboutPage} />
  </Route>
);
