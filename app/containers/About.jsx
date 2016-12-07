import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/about';
import { Button } from 'react-bootstrap'

const cx = classNames.bind(styles);

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
const About = () => {
  return (
    <div className={cx('about')}>
      <h1 className={cx('header')}>JustUs</h1>
      <div className={cx('description')}>
        <p>Safe solutions for when you need help.</p>
      </div>

      <Button href="/" className={cx('btn-primary')}>Find Resources Now</Button>
      <div className={cx('section-2')}></div>
      <div className={cx('contribute')}>
        <h1>What is Just Us?</h1>
        <p>A forum for alternatives to Calling police in crisis situations.</p>
      </div>
    </div>
  );
};

export default About;
