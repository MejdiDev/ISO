import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

// Styles
import "@fortawesome/fontawesome-free/css/all.min.css";
import './assets/styles/tailwind.css';

// layouts
import Admin from './layouts/Admin.js';
import Auth from './layouts/Auth.js';

// views without layouts
import Landing from './views/Landing.js';
import Profile from './views/Profile.js';
import Welcome from './views/Welcome.js';
import FormAddAudit from './views/FormAddAudit.js';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        {/* avec layout */}
        <Route path="/admin" component={Admin} />
        <Route path="/auth" component={Auth} />

        {/* sans layout */}
        <Route path="/landing" component={Landing} />
        <Route path="/profile" component={Profile} />
        <Route path="/FormAddAudit" component={FormAddAudit} />
        <Route exact path="/" component={Welcome} />

        {/* redirection si aucun match */}
        <Redirect to="/" />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
