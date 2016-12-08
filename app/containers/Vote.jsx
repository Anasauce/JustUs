import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import EntryBox from 'components/EntryBox';
import Feed from 'components/Feed';
import Scoreboard from 'components/Scoreboard';
import { createResource, typing, incrementCount,
  decrementCount, destroyResource } from 'actions/resources';
import styles from 'css/components/vote';

const cx = classNames.bind(styles);

class Vote extends Component {

  render() {
    const {newResource, resources, typing, createResource, destroyResource, incrementCount, decrementCount } = this.props;
    return (
      <div className={cx('vote')}>

      </div>
    );
  }
}

Vote.propTypes = {
  resources: PropTypes.array.isRequired,
  typing: PropTypes.func.isRequired,
  createResource: PropTypes.func.isRequired,
  destroyResource: PropTypes.func.isRequired,
  incrementCount: PropTypes.func.isRequired,
  decrementCount: PropTypes.func.isRequired,
  newResource: PropTypes.string
};

function mapStateToProps(state) {
  return {
    resources: state.resource.resources,
    newResource: state.resource.newResource
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, { createResource, typing, incrementCount, decrementCount, destroyResource })(Vote);
