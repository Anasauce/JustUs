import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/resource-item';
import { Jumbotron } from 'react-bootstrap'

const cx = classNames.bind( styles );

const ResourceItem = ({ index, key , id, description, phone_number, website_url, name }) => {
  return (
    <Jumbotron className={cx('resource_card')}>
      <h1>{name}</h1>
      <p>{description}</p>
      <p>{phone_number}</p>
  </Jumbotron>
  );
};

ResourceItem.propTypes = {
  id: PropTypes.number.isRequired,
};

export default ResourceItem;
