import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import '../scss/index.scss';

class App extends Component {
  constructor(props: {} | Readonly<{}>) {
    super(props);
  }

  render() {
    return <div>
      <header className="main-header">
        <div>
          <button className="mobile-toggle" onClick={(e)=>{
            let element = e.target as HTMLButtonElement;
            element.classList.toggle('toggled');
            let nav = document.getElementsByClassName('mobile-nav')[0] as HTMLElement;
            nav.classList.toggle('toggled');
          }}>
            <svg width="35" height="35" viewBox="0 0 100 100" fill="#0000" stroke="#000" stroke-width="5" strokeLinecap="round">
              <path className="line1" d="M20 30H80L80 80L20 20"/>
              <path className="line2" d="M20 50H80"/>
              <path className="line3" d="M20 70H80L80 20L20 80"/>
            </svg>
          </button>
          <img src="leaf.png" height="34" />
          <h2>SBCTA</h2>
        </div>
        <nav className="web-nav">
          <ul>
            <li><a href="/welcome">Welcome</a></li>
            <li><a href="/news">News</a></li>
            <li><a href="/members">Members</a></li>
            <li><a href="/agendas">Minutes</a></li>
            <li><a href="/events">Events</a></li>
            <li><a href="/conferences">Conferences</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
        <button className="subscribe-button" onClick={void 0}>
          Subscribe
        </button>
      </header>
      <nav className="mobile-nav">
        <ul>
          <li><a href="/welcome">Welcome</a></li>
          <li><a href="/news">News</a></li>
          <li><a href="/members">Members</a></li>
          <li><a href="/agendas">Minutes</a></li>
          <li><a href="/events">Events</a></li>
          <li><a href="/conferences">Conferences</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
      <section className="hero">
          <div className="hero__header">
            <img src="leaf.png" width="148" />
            <h1>San Bernardino County Teacher's Assocation</h1>
            <div>Empowering educators, enriching communities</div>
          </div>
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
      <footer>
        <div className="footer-top">
          <article>
            <header><h3>Contact</h3></header>
            123 Main Street<br />
            Anytown, CA 12345<br />
            example@gmail.com<br />
            555-555-5555
          </article>
          <article>
            <header><h3>Pages</h3></header>
            <nav>
              <ul>
                <li><a href="/welcome">Welcome</a></li>
                <li><a href="/news">News</a></li>
                <li><a href="/members">Members</a></li>
                <li><a href="/agendas">Minutes</a></li>
                <li><a href="/events">Events</a></li>
                <li><a href="/conferences">Conferences</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </nav>
          </article>
        </div>
        <div className="footer-bottom">
          <img src="leaf.png" height="34" />
          <a href="https://www.flaticon.com/free-icons/leaf" title="leaf icons" target="_blank">Leaf icons created by bqlqn - Flaticon</a>
        </div>
      </footer>
    </div>;
  }
};

const root = createRoot(document.body);
root.render(<App />);