import React from 'react'
import { Grid } from "semantic-ui-react"
import Routes from '../../../../routes/Routes';
import { BrowserRouter as Router } from "react-router-dom"
import "./LoggedLayout.scss"

export default function LoggedLayout(props) {
  const { user } = props;

  console.log(user)

  return (
    <Router>
      <Grid className='logged-layout'>
        <Grid.Row>
          <Grid.Column width={3}>
            menuLeft
          </Grid.Column>
          <Grid.Column width={13}>
            <h2>TopBar</h2>
            <Routes />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            Player
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Router>
  )
}
