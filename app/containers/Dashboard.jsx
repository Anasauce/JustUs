import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import EntryBox from 'components/EntryBox';
import Feed from 'components/Feed';
import Scoreboard from 'components/Scoreboard';
import { createResource, typing, incrementCount,
  decrementCount, destroyResource } from 'actions/resources';
import styles from 'css/components/dashboard';
import { Button, Jumbotron } from 'react-bootstrap';

const cx = classNames.bind(styles);

class Dashboard extends Component {

  render() {
    const { resources } = this.props;
    return (
      <div>
        <div className={cx('dashboard')}>
          <div className={cx('dashboard-header')}>
            <h1 className={cx('header')}>Oakland</h1>
            <Button href="/new_resource" className={cx('button')}>Add Resource</Button>
          </div>
        </div>
          <Feed resources={ resources } />
      </div>
    );
  }
}

Dashboard.propTypes = {
  resources: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    resources: state.resource.resources
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps)(Dashboard);
