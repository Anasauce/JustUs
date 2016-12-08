import React from 'react';
import Feed from '../components/Feed'

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
const Dashboard = () => {
    return (
    <Feed />
  )
}

export default Dashboard;
