import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LoginPage from './login';
import NotFoundPage from '../404';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/app'>
          <Route index element={<LoginPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
