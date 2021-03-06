import React from 'react';
import './App.css';
import { Route, Switch } from "react-router-dom";
import Header from './components/Header';
import Home from './components/Home';
import Movies from './components/Movies/Movies';
import NotFound from './components/NotFound';
import MovieForm from './components/MovieForm';
import Actors from './components/Actors/Actors';
import Producers from './components/Producers/Producers';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="container">
      <ToastContainer autoClose={3000} />
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/movies" exact component={Movies} />
        <Route path="/actors" exact component={Actors} />
        <Route path="/producers" exact component={Producers} />
        <Route path="/movie/:id" component={MovieForm} />
        <Route path="/movie/" component={MovieForm} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
