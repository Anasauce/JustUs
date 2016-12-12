import React, { PropTypes } from 'react';
import ResourceItem from 'components/ResourceItem';
import classNames from 'classnames/bind';
import styles from 'css/components/feed';

const cx = classNames.bind(styles);

const Feed = ({resources}) => {
  // console.log('these are resources--->' , resources);
  const resourceItems = resources.map((resource, key) => {
      return (
        <ResourceItem
          index={ key }
          key={ key }
          id={ resource.id }
          name={ resource.name }
          phone_number={ resource.phone_number }
          type={ resource.resource_type }
          description={ resource.description }
          website_url={ resource.website_url }
          address={ resource.address }
        />);
    });
    return (
    <div className={cx('main-section')}>
      <div>{resourceItems}</div>
    </div>
    )
}



Feed.propTypes = {
  resources: PropTypes.array.isRequired,
}

export default Feed;
