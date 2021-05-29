import { Button, Input, Modal } from "@material-ui/core";
import { useState } from "react";
import { auth } from "../firebase";

const SignUp = ({setOpen, open}) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");

	const signUp = (e) => {
		e.preventDefault();
		auth
			.createUserWithEmailAndPassword(email, password)
			.then((authUser) => {
				return authUser.user.updateProfile({
					displayName: username,
				});
			})
			.catch((error) => alert(error.message));
		setOpen(false);
	};
	return (
		<div>
			<Modal open={open} onClose={() => setOpen(false)}>
				<div
					style={{
						backgroundColor: "white",
						margin: "48px auto",
						padding: "16px",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "space-evenly",
						maxWidth: "500px",
						height: "300px",
					}}
				>
					<h2> Sign Up to Instagram Clone</h2>
					<form
						style={{
							height: "inherit",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							marginTop: "32px",
							width: "100%",
							justifyContent: "space-between",
						}}
					>
						<Input
							fullWidth
							value={username}
							type="text"
							placeholder="Enter Username"
							onChange={(e) => setUsername(e.target.value)}
						/>

						<Input
							fullWidth
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>

						<Input
							type="password"
							value={password}
							fullWidth
							onChange={(e) => setPassword(e.target.value)}
						/>

						<Button fullWidth type="submit" onClick={signUp}>
							SignUp
						</Button>
					</form>
				</div>
			</Modal>
		</div>
	);
};

export default SignUp;
