import React from "react";
import PostItem from "./post-item";
import styles from "./posts-grid.module.css";

function PostsGrid(props) {
	return (
		<ul className={styles.grid}>
			{props.posts.map(post => (
				<PostItem key={post.slug} post={post} />
			))}
		</ul>
	);
}

export default PostsGrid;
