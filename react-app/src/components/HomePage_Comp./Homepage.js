import React from 'react';
import { useSelector } from 'react-redux';
import UserNavBar from '../UserNavBar/UserNavBar';

function Homepage()  {
  const user = useSelector(state => state.session.user)

  return (
    <div>
        <UserNavBar user={user}/>
        <div id='home-post-left-container'>
          <h2>POSTs</h2>
        </div>
        <div id='home-left-container'>
          <div id='home-profile-section'>
              {'user profile pic '}
              {user.name}
              {user.username}
          </div>
          <div>
              <span>Suggested For You</span>
              <div id='home-suggestion-container'>
                  User Suggestion section
                  User.map...
              </div>
          </div>
        </div>
      </div>
  );
}

export default Homepage;
