import React, { Component } from 'react';
import {Route} from 'react-router-dom'

import Layout from './components/Layout/Layout';
import BurguerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout'

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Route path='/checkout' exact component={Checkout}/>
          <Route path='/' exact component={BurguerBuilder}/>
        </Layout>
      </div>
      
    );
  }
}

export default App;
