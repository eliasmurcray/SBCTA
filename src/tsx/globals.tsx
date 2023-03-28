import React, { Component, FormEvent, MouseEvent, RefObject, createRef } from 'react';
import randomAnimalName from 'random-animal-name';

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
      <button className="subscribe-button" onClick={(event) => {
        event.stopPropagation();
        const overlay = document.getElementById('subscribe-overlay');
        const modal = overlay.getElementsByClassName('subscribe-modal')[0] as HTMLDivElement;

        function func() {
          modal.removeEventListener('transitionend', func);
          modal.classList.remove('toggled');
          overlay.classList.add('hidden');
        }

        if(overlay.classList.contains('hidden')) {
          overlay.classList.remove('hidden');
          modal.classList.add('toggled');
        } else {
          if(!modal.classList.contains('toggled')) {
            modal.classList.add('toggled');
          } else {
            modal.addEventListener('transitionend', func, {
              passive: true
            });
            modal.classList.remove('toggled');
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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.firstNameRef = createRef();
    this.lastNameRef = createRef();
    this.emailRef = createRef();
  }

  private firstNameRef: RefObject<HTMLInputElement>;
  private lastNameRef: RefObject<HTMLInputElement>;
  private emailRef: RefObject<HTMLInputElement>;
  private recaptchaToken: string;

  state = {
    subscribed: false,
    disabled: false
  }

  componentDidMount() {
    const recaptchaScript = document.createElement('script');
    recaptchaScript.src = 'https://www.google.com/recaptcha/api.js';
    document.head.append(recaptchaScript);

    let component = this;
    window['recaptchaCallback'] = function(token: string) {
      component.recaptchaToken = token;
    };

    window['recaptchaExpiredCallback'] = function() {
      component.recaptchaToken = '';
    };
  }

  handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let token = this.recaptchaToken;
    if(!token) return console.error('Missing token value');

    let email = this.emailRef?.current?.value;

    if(!email) {
      return console.error('Missing email value');
    }

    this.setState({
      disabled: true
    });

    let firstName = this.firstNameRef?.current?.value;
    let lastName = this.lastNameRef?.current?.value;
    let animalNames = randomAnimalName().split(' ');
    
    if(!firstName) {
      firstName = animalNames[0];
    }
    if(!lastName) {
      lastName = animalNames[1];
    }

    console.log('Attempting to send email...');

    const data = {
      firstName,
      lastName,
      email,
      token
    };

    fetch('https://api.sanbernardinocountyteachersassociation.com:3000/signup', {
      method: 'POST',
      headers: new Headers({
        'Accept': 'text/plain',
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(data)
    })
    .then(async (response) => {
      if(response.status === 200) {
        console.log('Sign up success!');
        window['grecaptcha'].reset();
        this.setState({
          subscribed: true
        })
      } else {
        const text = await response.text();
        throw new Error('Error in subscribing: ' + text);
      }

      this.setState({
        disabled: false
      });
    })
    .catch(console.error);
  }

  closeModal(event: MouseEvent) {
    event.stopPropagation();
    const target = event.target as HTMLButtonElement;
    const modal = target.parentElement;
    const overlay = modal.parentElement;

    function func() {
      modal.removeEventListener('transitionend', func);
      modal.classList.remove('toggled');
      overlay.classList.add('hidden');
    }

    if(!modal.classList.contains('toggled')) {
      modal.classList.add('toggled');
    } else {
      modal.addEventListener('transitionend', func, {
        passive: true
      });
      modal.classList.remove('toggled');
    }
  }

  render() {
    return <div id="subscribe-overlay" className="subscribe-overlay hidden">
      <div className="subscribe-modal">
        <button className="close-modal" onClick={this.closeModal}>x</button>
        {this.state.subscribed ? <div className="subscribed">
          <h2>Subscribed!</h2>
          <div>Thank you for subscribing to our newsletter!</div>
        </div>
        : <div><h2>Join Our Newsletter</h2>
        <div className="disclaimer">Sign up to our newsletter to receive important updates from SBCTA</div>
        <form onSubmit={this.handleSubmit}>
          <div className="name-inputs">
            <input ref={this.firstNameRef} type="first-name" placeholder="First Name" />
            <input ref={this.lastNameRef} type="last-name" placeholder="Last Name" />
          </div>
          <input ref={this.emailRef} type="email" placeholder="Email Address" />
          <div className="g-recaptcha" data-sitekey="6LfWpjQlAAAAABn9WPAg4LePch6T1SBegi3NTa9V" data-callback="recaptchaCallback" data-expired-callback="recaptchaExpiredCallback"></div>
          <input type="submit" value="Sign Up" disabled={this.state.disabled} />
        </form></div>}
      </div>
    </div>;
  }
}