import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import { AppHeader, AppFooter, MobileNav, EmailSubscribeModal } from './globals';
import '../scss/global.scss';

class App extends Component {
  render() {
    return <div className="app-root">
      <AppHeader />
      <MobileNav />
      <EmailSubscribeModal />
      <div style={{
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        boxSizing: 'border-box',
        width: '100%',
        height: 'calc(100vh - 55px)',
        maxHeight: 'calc(100dvh - 55px)',
      }}>
        <h1 style={{
          fontSize: '5rem',
          fontFamily: 'var(--header-font)'
        }}>404</h1>
        <div style={{
          fontSize: '1.8rem'
        }}>Page Not Found</div>
      </div>
      <AppFooter />
    </div>;
  }
};

const root = createRoot(document.body);
root.render(<App />);