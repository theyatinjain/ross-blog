import Head from "next/head";
import React, { Fragment } from "react";
import AllPosts from "../../components/posts/all-posts";
import { getAllPosts } from "../../lib/posts-util";

function AllPostsPage(props) {
	return (
		<Fragment>
			<Head>
				<title>Ross Blog | All Blog</title>
				<meta name='description' content='All the blog posts here.' />
			</Head>
			<AllPosts posts={props.posts} />;
		</Fragment>
	);
}

export async function getStaticProps() {
	const allPosts = getAllPosts();
	return { props: { posts: allPosts } };
}

export default AllPostsPage;
