import React from 'react';

function Homepage()  {

        return (
            <div>
              <div id='home-post-left-container'>
                <h2>POSTS</h2>
              </div>
              <div id='home-left-container'>
                <div id='home-profile-section'>
                    {'user profile pic'}
                    User Name
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
