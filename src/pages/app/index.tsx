import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LoginPage from './login';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/app'>
          <Route index element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
