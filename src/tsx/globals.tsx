import React, { Component, FormEvent, MouseEvent, RefObject } from 'react';

export class AppHeader extends Component {
  render() {
    return <header className="main-header">
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
          <li><a href="/">Home</a></li>
          <li><a href="/news">News</a></li>
          <li><a href="/members">Members</a></li>
          <li><a href="/agendas">Minutes</a></li>
          <li><a href="/events">Events</a></li>
          <li><a href="/conferences">Conferences</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
      <button className="subscribe-button" onClick={() => {
        const overlay = document.getElementById('subscribe-overlay');
        const modal = overlay.getElementsByClassName('subscribe-modal')[0] as HTMLDivElement;

        if(overlay.classList.contains('hidden')) {
          overlay.classList.remove('hidden');
          modal.classList.add('toggled');
        } else {
          if(!modal.classList.contains('toggled')) {
            modal.classList.add('toggled');
          } else {
            modal.classList.remove('toggled');
            modal.ontransitionend = () => {
              modal.classList.remove('toggled');
              overlay.classList.add('hidden');
            };
          }
        }
      }}>Subscribe</button>
    </header>;
  }
}

export class AppFooter extends Component {
  render() {
    return <footer>
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
              <li><a href="/">Home</a></li>
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
    </footer>;
  }
}

export class MobileNav extends Component {
  render() {
    return <nav className="mobile-nav">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/news">News</a></li>
        <li><a href="/members">Members</a></li>
        <li><a href="/agendas">Minutes</a></li>
        <li><a href="/events">Events</a></li>
        <li><a href="/conferences">Conferences</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>;
  }
}

export class EmailSubscribeModal extends Component {
  constructor(props: {} | Readonly<{}>) {
    super(props);
  }

  handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log('completed form');
  }

  render() {
    return <div id="subscribe-overlay" className="subscribe-overlay hidden">
      <div className="subscribe-modal">
        <button className="close-modal"
        onClick={(event: MouseEvent) => {
          const target = event.target as HTMLButtonElement;
          target.parentElement.parentElement.classList.add('hidden');
        }}>x</button>
        <h2>Join Our Newsletter</h2>
        <div style={{
          marginBottom: '2rem',
          color: '#73777b'
        }}>Sign up to our newsletter to receive important updates</div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input type="first-name" placeholder="First Name" />
            <input type="last-name" placeholder="Last Name" />
          </div>
          <input type="email" placeholder="Email Address" />
          <div style={{
            marginTop: '1rem',
            columnGap: '.75rem'
          }}>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider"></span>
            </label>
            Receive free updates
          </div>
          <input type="submit" value="Sign Up" />
        </form>
      </div>
    </div>;
  }
}