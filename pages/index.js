import Head from "next/head";
import { Fragment } from "react";
import FeaturedPosts from "../components/home-page/featured-posts";
import Hero from "../components/home-page/hero";
import { getFeaturedPosts } from "../lib/posts-util";

function Home(props) {
	return (
		<Fragment>
			<Head>
				<title>Ross Blog | Home</title>
				<meta name='description' content='I blog about paleontology.' />
			</Head>
			<Hero />
			<FeaturedPosts posts={props.posts} />
		</Fragment>
	);
}

export async function getStaticProps() {
	const featuredPosts = getFeaturedPosts();
	return { props: { posts: featuredPosts } };
}

export default Home;
