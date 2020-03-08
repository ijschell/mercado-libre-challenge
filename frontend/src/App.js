// core modules
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Provider } from 'react-redux';

// components and pages
import Header from './components/common/header';
import LoaderLine from './components/common/loader';
import Author from './components/common/author';
import HomePage from './components/pages/home';
import SearchResultPage from './components/pages/search_result';
import ProductExtendedPage from './components/pages/product_extended';

// styles
import './common_styles.scss';

// store
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <Router>

        {/* import header */}
        <Header />

        {/* {import loader} */}
        <LoaderLine />

        {/* My name :) */}
        <Author />

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
    </Provider>
  );
}

export default App;
