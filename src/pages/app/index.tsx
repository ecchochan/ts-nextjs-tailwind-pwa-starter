import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import StaticContent from '@/components/StaticContent';

import { useHeader } from '@/store/app';

import MainLayout from '@/layouts/MainLayout';

import LoginPage from './login';
import NotFoundPage from '../404';

export default function App() {
  useHeader();

  return (
    <StaticContent>
      <div suppressHydrationWarning>
        <MainLayout>
          {typeof window === 'undefined' ? null : (
            <BrowserRouter>
              <Routes>
                <Route path='/app' element={<LoginPage />} />
                <Route path='/app*' element={<NotFoundPage />} />
              </Routes>
            </BrowserRouter>
          )}
        </MainLayout>
      </div>
    </StaticContent>
  );
}
