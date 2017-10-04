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
      errors:{},
      saving: false
    };
    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(this.props.course.id != nextProps.course.id){
      this.setState(Object.assign({}, nextProps.course));
    }
  }
  updateCourseState(event){
    const field = event.target.name;
    let course = this.state.course;
    course[field] = event.target.value;
    return this.setState({course:course});
  }

  saveCourse(event){
    event.preventDefault();
    this.setState({saving:true});
    this.props.actions.saveCourse(this.state.course).then(()=> this.redirect());
  }

  redirect(){
    this.setState({saving:false});
    this.context.router.push('/courses');
  }
  render() {
    console.log('enter to render method');
    console.log(this.state.authors);
    console.log(this.state.course);
    return (
        <CourseForm course={this.state.course} allAuthors={this.props.authors} errors={this.state.errors}
        onChange={this.updateCourseState} onSave={this.saveCourse} saving={this.state.saving}/>
    );

  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

function getCourseById(courses, courseId) {
  const course = courses.filter(c => c.id == courseId);
  if(course) return course[0];
  return null;
}

function mapStateToProps(state, ownProps) {
  const courseId = ownProps.params.id;
  let course = {id: '', title: '', watchHref: '', authorId: '', length: '',  category: '' };
  if (courseId && state.courses.length > 0){
    course = getCourseById(state.courses, courseId);
  }
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
