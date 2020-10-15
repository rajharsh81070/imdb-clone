import React from 'react';
import './App.css';
import { Route, Switch } from "react-router-dom";
import Header from './components/Header';
import Home from './components/Home';
import Movies from './components/Movies/Movies';
import NotFound from './components/NotFound';
import ManageMoviePage from './components/ManageMoviePage';
import Actors from './components/Actors/Actors';
import Producers from './components/Producers/Producers';

function App() {
  return (
    <div className="container">
      {/* <ToastContainer autoClose={3000} hideProgressBar /> */}
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/movies" exact component={Movies} />
        <Route path="/actors" exact component={Actors} />
        <Route path="/producers" exact component={Producers} />
        <Route path="/movie/:id" component={ManageMoviePage} />
        <Route path="/movie/" component={ManageMoviePage} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
