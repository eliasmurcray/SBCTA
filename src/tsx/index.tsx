import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import '../scss/index.scss';
import { AppHeader, AppFooter, MobileNav } from './globals';

class App extends Component {
  render() {
    return <div>
      <AppHeader />
      <MobileNav />
      <section className="hero">
          <header className="hero__header">
            <img src="leaf.png" width="148" />
            <h1>San Bernardino County Teacher's Assocation</h1>
            <div>Empowering educators, enriching communities</div>
          </header>
      </section>
      <section className="about">
        <svg className="waves" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" fill="#2e94d3">
          <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          </defs>
          <g className="parallax">
            <use xlinkHref="#gentle-wave" x="48" y="1" />
            <use xlinkHref="#gentle-wave" x="48" y="3" />
            <use xlinkHref="#gentle-wave" x="48" y="5" />
            <use xlinkHref="#gentle-wave" x="48" y="7" />
          </g>
        </svg>
        <div>
          <h2>Mission Statement</h2>
          SBCTA is a union of professionals that value high-quality public education for our students, families, and communities. We are dedicated to protecting and enhancing equitable access, justice, and resources for all of San Bernardino County Superintendent of School's students, teachers, and classrooms. Working in collaboration with SBCSS, school districts, families, other agencies, and our community we provide leadership, advocacy, and services to ensure innovative, inspiring educational practice.<br />
          <a href="/members">View Board Members</a>
        </div>
      </section>
      <AppFooter />
    </div>;
  }
};

const root = createRoot(document.body);
root.render(<App />);