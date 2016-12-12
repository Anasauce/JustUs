import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/resource-item';
import { Jumbotron } from 'react-bootstrap'

const cx = classNames.bind( styles );

const ResourceItem = ({
  index,
  key ,
  id,
  name,
  phone_number,
  type,
  description,
  website_url,
  address
}) => { return (
    <Jumbotron className={cx('resource_card')}>
      <div className={cx('resource_main_info')}>
        <h1 className={cx('resource_header')}>{ name }</h1>
        <div className={cx('resource_phone')}>{ phone_number }</div>
      </div>
      <div>{ type }</div>
      <div className={cx('resource_info')}>
        <h2 className={cx('resource_decription')}>Description:</h2>
        <div>{ description }</div>
        <h3 className={cx('resource_website')}>Website:</h3>
        <div>{ website_url }</div>
      </div>
    </Jumbotron>
  );
};

ResourceItem.propTypes = {
  id: PropTypes.number.isRequired,
};

export default ResourceItem;
