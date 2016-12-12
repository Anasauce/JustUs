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
      <div className={cx('about__info-section-1')}>
        <h1 className={cx('header')}>JustUs</h1>
        <p className={cx('description')}>Safe solutions for when you need help.</p>
        <Button href="/dashboard" className={cx('button', 'about__button')}>Find Resources Now</Button>
      </div>
      <div className={cx('about__image-section')}></div>
      <div className={cx('about__info-section-1')}>
        <h1 className={cx('header')}>What is JustUs?</h1>
        <p className={cx('description')}>A forum for alternatives to Calling police in crisis situations.</p>
      </div>
    </div>
  );
};

export default About;
