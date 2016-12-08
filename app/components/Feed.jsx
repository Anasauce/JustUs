import React, { PropTypes } from 'react';
import ResourceItem from 'components/ResourceItem';
import classNames from 'classnames/bind';
import styles from 'css/components/main-section';

const cx = classNames.bind(styles);

const Feed = ({resources}) => {
  const resourceItems = resources.map((resource, key) => {
      return (
        <ResourceItem
          index={key}
          id={resource.id}
          key={key}
          description={resource.description}
          phone_number={resource.phone_number}
          website_url={resource.website_url} />);
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
