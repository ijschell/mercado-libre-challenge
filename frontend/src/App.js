import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './components/common/header';
import HomePage from './components/pages/home';
import SearchResultPage from './components/pages/search_result';
import ProductExtendedPage from './components/pages/product_extended';

import './common_styles.scss';

function App() {
  return (
    <Router>

      {/* import header */}
      <Header />

      {/* switch pages */}
      <Switch>

        <Route path='/' exact>
          <HomePage />
        </Route>

        <Route path='/items' exact>
          <SearchResultPage />
        </Route>

        <Route path='/items/:id' exact>
          <ProductExtendedPage />
        </Route>

      </Switch>

    </Router>
  );
}

export default App;
