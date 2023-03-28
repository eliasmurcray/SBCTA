import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import '../scss/index.scss';
import { AppHeader, AppFooter, MobileNav, EmailSubscribeModal } from './globals';

class App extends Component {
  render() {
    return <div className="app-root">
      <AppHeader />
      <MobileNav />
      <EmailSubscribeModal />
      <div className="contact-hero">
        <div className="contact-modal">
          
        </div>
      </div>
      <AppFooter />
    </div>;
  }
}

const root = createRoot(document.body);
root.render(<App />);