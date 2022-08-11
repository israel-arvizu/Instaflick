import React from 'react'
import ReactTimeAgo from 'react-time-ago'

export default function TimeAgoDate ({ date }) {
  return (
    <div id="time-container">
       <ReactTimeAgo date={date} locale="en-US"/>
    </div>
  )
}
