import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import App from './App';
import GameInfo from './GameInfo';
const CustomRoutes = () => {
    return (
      <BrowserRouter>
      <Routes>
        <Route path="/" component={App} />
        <Route path="/game/:id" component={GameInfo} />
        </Routes>
      </BrowserRouter>
    );
  }

export default CustomRoutes;