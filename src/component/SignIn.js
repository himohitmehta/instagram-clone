import { Button, Input, makeStyles, Modal } from "@material-ui/core";
import { useState } from "react";
import { auth } from "../firebase";

const useStyles = makeStyles((theme) => ({
	root: {
		margin: "8px",
		backgroundColor: theme.palette.common.white,
	},
}));
const SignIn = ({ setOpen, open }) => {

	const classes = useStyles();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");



	const logIn = (e) => {
		e.preventDefault();
		auth
			.signInWithEmailAndPassword(email, password)
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
				<h2> Sign In to Instagram Clone</h2>
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

					<Button fullWidth type="submit" onClick={logIn}>
						Log In
					</Button>
				</form>
			</div>
		</Modal>
	</div>

	);
};

export default SignIn;
