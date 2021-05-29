import {
	Avatar,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CardMedia,
	Grid,
	TextField,
	Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import "./Post.css";
import firebase from "firebase";

const Post = ({ user, post, postId }) => {
	const [comments, setComments] = useState([]);
	const [comment, setComment] = useState("");
	useEffect(() => {
		let unsubscribe;
		if (postId) {
			unsubscribe = db
				.collection("posts")
				.doc(postId)
				.collection("comments")
				.orderBy("timestamp", "asc")
				.onSnapshot((snapshot) => {
					setComments(snapshot.docs.map((doc) => doc?.data()));
				});
		}
		return () => {
			unsubscribe();
		};
	}, [postId]);

	const postComment = (e) => {
		e.preventDefault();
		db.collection("posts").doc(postId).collection("comments").add({
			text: comment,
			username: user?.displayName,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		});
		setComment("");
	};
	return (
		<div className="post">
			<Card variant="outlined">
				<CardHeader
					avatar={
						<Avatar
							src={post?.profilePicUrl || "https://source.unsplash.com/random"}
							alt={post?.username || "username"}
						/>
					}
					title={post?.username || "Username"}
					subheader={post?.timestamp?.toDate().toString()}
				/>
				<CardMedia
					component="img"
					className="post__image"
					src={post?.imageUrl || "https://source.unsplash.com/random"}
				/>
				<CardContent>
					<Typography>
						<strong>{post?.username || "UserName"} </strong>
						{post?.caption || "Post Caption"}
					</Typography>
					<div>
						{comments?.map((comment) => (
							<p>
								<strong>{comment.username} </strong> {comment.text}
							</p>
						))}
					</div>
				</CardContent>
				{user && (
					<CardActions style={{width:'100%',padding:'16px'}}>

						<form style={{width:'inherit'}}>
							<Grid container spacing={4}>
								<Grid item xs={8} md={9} sm={8}>
								<TextField

								placeholder="Comment..."
								type="text"
								fullWidth
								value={comment}
								onChange={(e) => setComment(e.target.value)}
							/>
								</Grid>
								<Grid item xs={4} md={3} sm={4}>
								<Button
								 disabled={!comment} onClick={postComment} type="submit">
								Comment
							</Button>
							
								</Grid>
							
							</Grid>
						</form>
					</CardActions>
				)}{" "}
			</Card>
		</div>
	);
};

export default Post;
