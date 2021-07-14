import React from "react";
import styles from "./hero.module.css";
import Image from "next/image";

function Hero() {
	return (
		<section className={styles.hero}>
			<div className={styles.image}>
				<Image
					src='/images/site/ross.jpg'
					alt='An Image Showing Ross Geller'
					width={300}
					height={300}
				/>
			</div>
			<h1>Hi, I am Ross Geller.</h1>
			<p>I blog about Paleontology - or, as Joey says about Dinosaurs.</p>
		</section>
	);
}

export default Hero;
