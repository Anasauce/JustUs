import React, { PropTypes } from 'react';
import ResourceItem from 'components/ResourceItem';
import classNames from 'classnames/bind';
import styles from 'css/components/feed';

const cx = classNames.bind(styles);

const Feed = ({resources}) => {
  console.log('these are resources--->' , resources);
  const resourceItems = resources.map((resource, key) => {
      return (
        <ResourceItem
          index={key}
          key={key}
          id={resource.id}
          description={resource.description}
          phone_number={resource.phone_number}
          website_url={resource.website_url}
          name={resource.name} />);
    });
    return (
    <div className={cx('main-section')}>
      <ul className={cx('list')}>{resourceItems}</ul>
    </div>
    )
}



Feed.propTypes = {
  resources: PropTypes.array.isRequired,
}

export default Feed;
