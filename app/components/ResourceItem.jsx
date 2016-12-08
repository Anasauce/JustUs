import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/resource-item';

const cx = classNames.bind(styles);

const ResourceItem = ({ resource }) => {
  return (
    <p>{resource}</p>
  );
};

ResourceItem.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  incrementCount: PropTypes.func.isRequired,
  decrementCount: PropTypes.func.isRequired,
  destroyResource: PropTypes.func.isRequired
};

export default ResourceItem;
