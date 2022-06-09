import React, { Component } from 'react'
import * as app from '../firebase'
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Typography } from '@mui/material';
import { ClassNames } from '@emotion/react';

class Forum extends Component {
  render() {
    return (
      <>
        <Typography variant="h6">
            {this.props.message}
        </Typography>
      </>
    )
  }
}



export default function ForumPost() {

    const forumRef = app.db.collection('forum');
    const query = forumRef.orderBy('message').limit(10);
    
    
    const [values, loading, error, snapshot] = useCollectionData(query, {idField: 'id'});

    console.log(values);
    

    return (<div>
        {values && values.map(message => <Forum key={message.id} message={message.message} />)}
    </div>)



}
