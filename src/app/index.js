import React from 'react';

import { useState, useEffect } from 'react'
import './styles.css'
import HomePage from './components/HomePage'
import Login from './components/Login'
import Register from './components/Register'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { CssBaseline, CircularProgress } from '@material-ui/core'
import firebase from './components/firebase'

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Products, PageNotFound, Cart, Favorites, SingleProduct } from './pages';
import { Layout, BackgroundColorProvider, ShopProvider } from './components';
import { ROUTES } from '../constants';

const theme = createMuiTheme()

function App() {

	const [firebaseInitialized, setFirebaseInitialized] = useState(false)

	useEffect(() => {
		firebase.isInitialized().then(val => {
			setFirebaseInitialized(val)
		})
	})

  return firebaseInitialized !== false ? (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/register" component={Register} />
          <ShopProvider>
      <BackgroundColorProvider>
        <Router>         
          <Layout>
            <Switch>
              <Route path={ROUTES.defaultPage} exact component={Products} />
              <Route path={ROUTES.cart} exact component={Cart} />
              <Route path={ROUTES.favorites} exact component={Favorites} />
              <Route path={ROUTES.product} exact component={SingleProduct} />
              <Redirect exact from={ROUTES.home} to={ROUTES.eShop} />
              <Route component={PageNotFound} />
            </Switch>
          </Layout>
        </Router>
      </BackgroundColorProvider>
    </ShopProvider>
		</Switch>
		</Router>
    </MuiThemeProvider>
    
   
	) : <div id="loader"><CircularProgress /></div>
  
}

export default App;
