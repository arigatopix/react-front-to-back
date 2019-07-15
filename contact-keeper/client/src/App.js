import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import ContactState from './context/contact/ContactState';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Navbar from './components/layout/Navbar';

const App = () => {
  return (
    <ContactState>
      <Router>
        <Fragment>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
              <h1>My App</h1>
            </Switch>
          </div>
        </Fragment>
      </Router>
    </ContactState>
  );
};

export default App;

/**NOTE
 * --- Package ---
 * - ใช้ concurrently ในการ run ทั้ง backend และ frontend
 * - ลองดูการติตตั้ง package อยู่ใน folder ของ backend
 * --- Component ---
 */
