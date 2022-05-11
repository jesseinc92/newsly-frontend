import React from 'react';
import { render } from '@testing-library/react';
import UserContext from '../UserContext';

const user = {
  user: {
    username: 'test1',
    firstName: 'test',
    lastName: 'user',
    bookmarks: [],
    metrics: {
      goal: 'goal',
      metricsqueue: []
    }
  }
}


const renderWithContext = (component, props = user) => {
  return render(
    <UserContext.Provider value={{...props}}>
      {component}
    </UserContext.Provider>
  )
}


export default renderWithContext;