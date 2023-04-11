import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import { AppFooter, AppHeader, EmailSubscribeModal, MobileNav } from './globals';
import SVGWaves from './svg-waves';
import '../scss/leadership.scss';
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref } from 'firebase/database';

interface Member {
	role: string;
	name: string;
	email: string;
}

const MEMBERS = await new Promise<Member[]>((resolve) => {
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

	onValue(ref(database, "users"), (snapshot) => {
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
			<section className='header'>
				<div className='blur-overlay'>
					<h1>SBCTA Elected Officials</h1>
				</div>
			</section>
			<section className='executive-board-members'>
				<SVGWaves fillColor='#fff' />
				<div>
					<h2>Executive Board Members</h2>
					<div className='members-container'>
						{MEMBERS.map((member) => {
							const { role, name, email } = member;
							const imageUrl = `https://storage.googleapis.com/sbcta-hosting.appspot.com/profile_pictures/${name.replace(" ", "")}`
							return <div className='member-card'>
								<div className='image-container'>
									<img src={imageUrl} />
								</div>
								<h3>{role}</h3>
								<a href={`mailto:${email}`}>{name}</a>
							</div>;
						})}
					</div>
				</div>
			</section>
			<AppFooter />
		</div>;
	}
}

const root = createRoot(document.body);
root.render(<App />);