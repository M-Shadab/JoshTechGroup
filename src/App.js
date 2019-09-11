import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Home from './pages/home'
import 'react-tagsinput/react-tagsinput.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

function App() {
  return (
    <main>
      <Switch>
        <Route path="/" exact component={Home} />
        <Redirect to="/" />
      </Switch>
    </main>
  )
}

export default App
