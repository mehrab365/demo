import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';

// Import actions here!!

class ManageCoursePage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      course: Object.assign({}, props.course),
      // authors: Object.assign({}, props.authors),
      errors:{}
    };
    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  updateCourseState(event){
    const field = event.target.name;
    let course = this.state.course;
    course[field] = event.target.value;
    return this.setState({course:course});
  }

  saveCourse(event){
    event.preventDefault();
    this.props.action.saveCourse(this.state.course);
  }

  render() {
    console.log('enter to render method');
    console.log(this.state.authors);
    console.log(this.state.course);
    return (
        <CourseForm course={this.state.course} allAuthors={this.props.authors} errors={this.state.errors}
        onChange={this.updateCourseState} onSave={this.saveCourse}/>
    );

  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  let course = {id: '', title: '', watchHref: '', authorId: '', length: '',  category: '' };
  const authorFormattedForDropdown = state.authors.map(author => {
    return{
      value: author.id,
      text: author.firstName + ' ' + author.lastName
    };
  });
  return {
    course: course,
    authors: authorFormattedForDropdown
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
