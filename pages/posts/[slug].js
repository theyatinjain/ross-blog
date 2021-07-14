//posts/some-title-of-page slug->some-title-of-page
import Head from "next/head";
import React, { Fragment } from "react";
import PostContent from "../../components/posts/post-detail/post-content";
import { getPostData, getPostsFiles } from "../../lib/posts-util";

function PostDetailPage(props) {
	return (
		<Fragment>
			<Head>
				<title>{props.post.title}</title>
				<meta name='description' content={props.post.excerpt} />
			</Head>
			<PostContent post={props.post} />;
		</Fragment>
	);
}

export async function getStaticProps(context) {
	const postData = getPostData(context.params.slug);
	return { props: { post: postData }, revalidate: 3600 };
}

export async function getStaticPaths() {
	const postFileNames = getPostsFiles();
	const slugs = postFileNames.map(fileName => fileName.replace(/\.md$/, ""));
	return {
		paths: slugs.map(slug => ({ params: { slug } })),
		fallback: false,
	};
}

export default PostDetailPage;
