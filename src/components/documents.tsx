import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import { AppHeader, AppFooter, MobileNav, EmailSubscribeModal } from './globals';
import SVGWaves from './svg-waves';
import '../scss/documents.scss';
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref } from 'firebase/database';

interface Document {
	name: string;
	url: string;
	description: string;
}

const DOCUMENTS = await new Promise<Document[]>((resolve) => {
	const app = initializeApp({
		apiKey: "AIzaSyDHk8o0H3-zFrZecxuNjZKdDV9PtWDknDQ",
		authDomain: "sbcta-hosting.firebaseapp.com",
		databaseURL: "https://sbcta-hosting-default-rtdb.firebaseio.com",
		projectId: "sbcta-hosting",
		storageBucket: "sbcta-hosting.appspot.com",
		messagingSenderId: "266099656618",
		appId: "1:266099656618:web:a502ec1b39d332edab8dd3"
	});
	const database = getDatabase(app);

	onValue(ref(database, "documents"), (snapshot) => {
		let a = [];
			snapshot.forEach((child: any) => {
				a.push(Object.assign(child.val(), {
					uid: child.key
				}));
			});
		resolve(a);
	});
});

class App extends Component {
  render() {
    return <div className='app-root'>
      <AppHeader />
      <MobileNav />
      <EmailSubscribeModal />
			<section className="documents">
				<SVGWaves fillColor="#fff" />
				<h1 style={{
          fontSize: '2.4rem',
          fontFamily: 'var(--header-font)',
					maxWidth: '1000px',
					margin: '0 auto 1rem',
					paddingInline: 'var(--gutter-size)',
					boxSizing: 'border-box'
        }}>Documents</h1>
				<div className="documents-container">
					{DOCUMENTS.map((document) => {
						return <div className="document">
							<a href={document.url}><svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 96 960 960" width="18"><path d="M450 776H280q-83 0-141.5-58.5T80 576q0-83 58.5-141.5T280 376h170v60H280q-58.333 0-99.167 40.765-40.833 40.764-40.833 99Q140 634 180.833 675q40.834 41 99.167 41h170v60ZM325 606v-60h310v60H325Zm185 170v-60h170q58.333 0 99.167-40.765 40.833-40.764 40.833-99Q820 518 779.167 477 738.333 436 680 436H510v-60h170q83 0 141.5 58.5T880 576q0 83-58.5 141.5T680 776H510Z"/></svg>{document.name}</a>
							<div>{document.description}</div>
						</div>;
					})}
				</div>
			</section>
      <AppFooter />
    </div>;
  }
};

const root = createRoot(document.body);
root.render(<App />);