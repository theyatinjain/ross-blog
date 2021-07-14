import Head from "next/head";
import React, { Fragment } from "react";
import ContactForm from "../components/contact/contact-form";

function ContactPage() {
	return (
		<Fragment>
			<Head>
				<title>Ross Blog | Contact</title>
				<meta name='description' content='Send me your messages.' />
			</Head>
			<ContactForm />
		</Fragment>
	);
}

export default ContactPage;
