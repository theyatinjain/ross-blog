import Image from "next/image";
import React from "react";
import ReactMarkdown from "react-markdown";
import styles from "./post-content.module.css";
import PostHeader from "./post-header";

function PostContent(props) {
	const imagePath = `/images/posts/${props.post.slug}/${props.post.image}`;
	const customComponents = {
		// img(image) {
		// 	<Image
		// 		src={`/images/posts/${props.post.slug}/${image.src}`}
		// 		alt={image.alt}
		// 		width={600}
		// 		height={300}
		// 	/>;
		// },
		p(paragraph) {
			const { node } = paragraph;
			if (node.children[0].tagName === "img") {
				const image = node.children[0];
				return (
					<div className={styles.image}>
						<Image
							src={`/images/posts/${props.post.slug}/${image.properties.src}`}
							alt={image.alt}
							width={600}
							height={300}
						/>
					</div>
				);
			}
			return <p>{paragraph.children}</p>;
		},
	};
	return (
		<article className={styles.content}>
			<PostHeader title={props.post.title} image={imagePath} />
			<ReactMarkdown components={customComponents}>
				{props.post.content}
			</ReactMarkdown>
		</article>
	);
}

export default PostContent;
