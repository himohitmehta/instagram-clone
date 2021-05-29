import { Button, Grid, Input, LinearProgress, Paper } from "@material-ui/core";
import { useState } from "react";
import { db, storage } from "../firebase";
import firebase from "firebase";

const ImageUploader = ({ username }) => {
	const [caption, setCaption] = useState("");
	const [progress, setProgress] = useState(0);
	const [image, setImage] = useState("");

	const handleChange = (e) => {
		if (e.target.files[0]) {
			setImage(e.target.files[0]);
		} 

	};
	const handleUpload = () => {
		const uploadTask = storage.ref(`images/${image.name}`).put(image);
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				///progress logic
				const progress = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100,
				);
				setProgress(progress);
			},
			(error) => {
				console.log(error);
				alert(error.message);
			},
			() => {
				// complete function
				storage
					.ref("images")
					.child(image.name)
					.getDownloadURL()
					.then((url) => {
						db.collection("posts").add({
							timestamp: firebase.firestore.FieldValue.serverTimestamp(),
							caption: caption,
							imageUrl: url,
							username: username,
						});
						setProgress(0);
						setCaption("");
						setImage(null);
					});
			},
		);
	};
	return (
		<div style={{position:'fixed', bottom:'0', }}>
			<Paper style={{ margin: "8px", padding: "16px",opacity:'0.9' }}>
				<Grid container spacing={4}>
					<Grid
						item
						xs={12}
						md={3}
						style={{ display: "flex", justifyContent: "space-between" }}
					>
						<progress value={progress} max="100" style={{ flex: "0.9" }} />
						<p>{progress} %</p>
					</Grid>
					<Grid item xs={12} sm={5} md={3}>
						<Input
							fullWidth
							type="text"
							placeholder="Add Caption... "
							value={caption}
							onChange={(e) => setCaption(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12} sm={5} md={4}>
						<Input fullWidth type="file" onChange={handleChange} />
					</Grid>

					<Grid item xs={12} sm={2} md={1}>
						{" "}
						<Button fullWidth disabled={!caption} onClick={handleUpload}>
							Upload
						</Button>
					</Grid>
					</Grid>
			</Paper>
		</div>
	);
};

export default ImageUploader;
