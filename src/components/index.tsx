import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import { AppHeader, AppFooter, MobileNav, EmailSubscribeModal } from './globals';
import SVGWaves from './svg-waves';
import '../scss/index.scss';

class App extends Component {
  render() {
    return <div className='app-root'>
      <AppHeader />
      <MobileNav />
      <EmailSubscribeModal />
      <section className='hero'>
          <header className='hero__header'>
            <img src='leaf.png' width='148' height='148' />
            <h1>San Bernardino County Teacher's Assocation</h1>
            <div>Empowering educators, enriching communities</div>
          </header>
      </section>
      <section className='about'>
        <SVGWaves fillColor='#2e94d3'/>
        <div>
          <h2>Mission Statement</h2>
          SBCTA is a union of professionals that value high-quality public education for our students, families, and communities. We are dedicated to protecting and enhancing equitable access, justice, and resources for all of San Bernardino County Superintendent of School's students, teachers, and classrooms. Working in collaboration with SBCSS, school districts, families, other agencies, and our community we provide leadership, advocacy, and services to ensure innovative, inspiring educational practice.<br />
          <a href='/leadership'>View Board Members</a>
        </div>
      </section>
      <section className='follow-on-facebook'>
        <SVGWaves fillColor='#fff' />
        <div>
          <h2>Follow Us on Facebook</h2>
          <div>Be sure to <a href='https://www.facebook.com/groups/490016196220727' target='_blank'>follow us on Facebook</a> to stay up to date!</div>
          <img src="people-talking.jpeg" width="100%" height="100%" />
        </div>
      </section>
      <AppFooter />
    </div>;
  }
};

const root = createRoot(document.body);
root.render(<App />);