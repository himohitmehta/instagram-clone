import { Button, Grid, Input, Modal, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import "./App.css";
import Post from "./component/Post";
import { auth, db } from "./firebase";
import firebase from "firebase";
import ImageUploader from "./component/ImageUploader";
import SignIn from "./component/SignIn";
import SignUp from "./component/SignUp";

function App() {
	const [posts, setPosts] = useState([]);
	const [open, setOpen] = useState(false);
	const [openSignIn, setOpenSignIn] = useState(false);
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				//user logged in
				console.log(authUser);
				setUser(authUser);
			} else {
				//user logged out
				setUser(null);
			}
		});

		return () => {
			// perform clean up action
			unsubscribe();
		};
	}, [user]);
	useEffect(() => {
		db.collection("posts")
			.orderBy("timestamp", "desc")
			.onSnapshot((snapshot) => {
				setPosts(
					snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })),
				);
			});
	}, []);

	// const logIn = (e) => {
	// 	e.preventDefault();
	// 	auth
	// 		.signInWithEmailAndPassword(email, password)
	// 		.catch((error) => alert(error.message));
	// 	setOpenSignIn(false);
	// };

	return (
		<div className="app">
			{/* <SignIn logIn={() => logIn()} /> */}
			{/* Sign In Modal */}

			<div>
			<SignIn setOpen={setOpenSignIn} open ={openSignIn} />
			
			</div>
			<div>
			<SignUp setOpen={setOpen} open={open} />
			
			</div>
				

			{/* Sign Up Modal */}
			
			<div
				style={{
					backgroundColor: "white",
					padding: "20px",
					borderBottom: "1px solid lightgray",
				}}
			>
				<div className="app__header">
					<img
						className="app__headerImage"
						src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
						alt="logo"
					/>
					{user ? (
						<Button onClick={() => auth.signOut()}>Logout</Button>
					) : (
						<div>
							<Button onClick={() => setOpen(true)}>Sign Up</Button>

							<Button onClick={() => setOpenSignIn(true)}>Log In</Button>
						</div>
					)}
				</div>
			</div>
			<div style={{ maxWidth: "500px", margin: "auto", marginBottom:'48px' }}>
				{posts.map(({ id, post }) => (
					<Post key={id} postId={id} user={user} post={post} />
				))}
			</div>
			<div style={{ maxWidth: "800px", margin: "auto" }}>
				{user?.displayName ? (
					<ImageUploader username={user.displayName} />
				) : (
					<h3 style={{ textAlign: "center" }}> Sign Up To Start Uploading Images </h3>
				)}
			</div>
		</div>
	);
}

export default App;
