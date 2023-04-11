import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import { AppHeader, AppFooter, MobileNav, EmailSubscribeModal } from './globals';
import '../scss/admin.scss';

import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { getStorage, ref as _ref, uploadBytes }  from "firebase/storage";
import { findDOMNode } from 'react-dom';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHk8o0H3-zFrZecxuNjZKdDV9PtWDknDQ",
  authDomain: "sbcta-hosting.firebaseapp.com",
  databaseURL: "https://sbcta-hosting-default-rtdb.firebaseio.com",
  projectId: "sbcta-hosting",
  storageBucket: "sbcta-hosting.appspot.com",
  messagingSenderId: "266099656618",
  appId: "1:266099656618:web:a502ec1b39d332edab8dd3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);

interface Member {
	role: string;
	name: string;
	email: string;
}

class MemberRow extends Component<Member> {
	constructor(props: Member | Readonly<Member>) {
		super(props);
	}

	render() {
		return <tr className="member">
			<td><img src={`https://storage.googleapis.com/sbcta-hosting.appspot.com/profile_pictures/${this.props.name.replace(" ", "")}?v=${Date.now()}`} /></td>
			<td>{this.props.name}</td>
			<td>{this.props.role}</td>
			<td>{this.props.email}</td>
			<td><button onClick={() => {
				if(confirm("Are you sure you want to delete user \"" + this.props.name + "\"? This cannot be undone.")) {
					set(ref(database, "users/" + this.props.name.replace(" ", "")), null)
						.then(() => {
							(findDOMNode(this).parentNode as Element).remove();
						});
				}
			}}>Delete User</button></td>
		</tr>;
	}
}

class DocumentRow extends Component<Document> {
	constructor(props: Document | Readonly<Document>) {
		super(props);
	}

	render() {
		return <tr className="member">
			<td>{this.props.name}</td>
			<td>{this.props.url}</td>
			<td>{this.props.description}</td>
			<td><button onClick={() => {
				if(confirm("Are you sure you want to delete document \"" + this.props.name + "\"? This cannot be undone.")) {
					set(ref(database, "documents/" + this.props.name.replace(" ", "")), null)
						.then(() => {
							(findDOMNode(this).parentNode as Element).remove();
						});
				}
			}}>Delete Document</button></td>
		</tr>;
	}
}

interface Document {
	name: string;
	url: string;
	description: string;
}

class App extends Component {

	state: { members: Member[]; documents: Document[] } = {
		members: [],
		documents: []
	}

	componentDidMount(): void {
		onValue(ref(database, 'users'), (snapshot) => {
			let a = [];
			snapshot.forEach((child: any) => {
				a.push(Object.assign(child.val(), {
					uid: child.key
				}));
			});

			if(!snapshot.val()) return;
			this.setState({
				members: a as Member[]
			});
		});

		onValue(ref(database, 'documents'), (snapshot) => {
			let a = [];
			snapshot.forEach((child: any) => {
				a.push(Object.assign(child.val(), {
					uid: child.key
				}));
			});

			if(!snapshot.val()) return;
			this.setState({
				documents: a as Document[]
			});
		});
	}

  render() {
    return <div className='app-root'>
      <AppHeader />
      <MobileNav />
      <EmailSubscribeModal />
      <section className='content'>
				<h1>Admin Console</h1>
				<div>This will be the area to maintain the endpoints for the SBCTA database.</div>
				<br></br>
				<table>
					<thead>
						<tr>
							<th>Avatar</th>
							<th>Name</th>
							<th>Role</th>
							<th>Email</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
					{this.state.members && this.state.members.map((member) => {
						return <MemberRow name={member.name} email={member.email} role={member.role} />
					})}
					</tbody>
				</table>

				<div style={{ height: "3rem"}}></div>

				<form style={{
					display: "flex",
					flexFlow: "column",
					alignItems: "flex-start",
				}} onSubmit={(event) => {
					event.preventDefault();
					const name = (document.getElementById("a") as HTMLInputElement).value;
					const role = (document.getElementById("b") as HTMLInputElement).value;
					const email = (document.getElementById("c") as HTMLInputElement).value;
					const avatar = (document.getElementById("d") as HTMLInputElement).files[0];

					if(!avatar) return;

					if(!name || !role || !email || !avatar) return alert("Invalid input");

					const uid = name.replace(" ", "");
					const imagePath = _ref(storage, "profile_pictures/" + uid);
					uploadBytes(imagePath, avatar)
						.then(() => set(ref(database, "users/" + uid), {
							name,
							role,
							email
						}))
						.then(() => {
							(document.getElementById("a") as HTMLInputElement).value = "";
							(document.getElementById("b") as HTMLInputElement).value = "";
							(document.getElementById("c") as HTMLInputElement).value = "";
							(document.getElementById("d") as HTMLInputElement).value = "";
						});
				}}>
					<h3 style={{
						fontFamily: "var(--header-font)"
					}}>Add Member</h3>
					<input id="a" placeholder="Name"></input>
					<input id="b" placeholder="Role"></input>
					<input id="c" placeholder="Email"></input>
					<div>Upload Avatar<input id="d" type="file" accept="image/*"></input></div>
					<input type="submit" style={{ marginTop: "1rem" }}></input>
				</form>

				<h2>Documents</h2>
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>URL</th>
							<th>Description</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
					{this.state.documents && this.state.documents.map((document) => {
						return <DocumentRow name={document.name} url={document.url} description={document.description} />
					})}
					</tbody>
				</table>

				<form style={{
					display: "flex",
					flexFlow: "column",
					alignItems: "flex-start"
				}} onSubmit={(event) => {
					event.preventDefault();
					const name = (document.getElementById("aa") as HTMLInputElement).value;
					const url = (document.getElementById("bb") as HTMLInputElement).value;
					const description = (document.getElementById("cc") as HTMLInputElement).value;

					if(!name || !url || !description) return alert("Invalid input");

					const uid = name.replace(" ", "");
					set(ref(database, `documents/${uid}`), {
						name,
						url,
						description
					})
					.then(() => {
						(document.getElementById("aa") as HTMLInputElement).value = '';
						(document.getElementById("bb") as HTMLInputElement).value = '';
						(document.getElementById("cc") as HTMLInputElement).value = '';
					});
				}}>
					<h3 style={{
						fontFamily: "var(--header-font)"
					}}>Add Document</h3>
					<input id="aa" placeholder="Name"></input>
					<input id="bb" placeholder="URL (link to document)"></input>
					<input id="cc" placeholder="Description"></input>
					<input type="submit" style={{ marginTop: "1rem" }}></input>
				</form>
			</section>
      <AppFooter />
    </div>;
  }
};

const root = createRoot(document.body);
root.render(<App />);