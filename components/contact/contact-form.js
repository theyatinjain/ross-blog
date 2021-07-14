import React, { useEffect, useRef, useState } from "react";
import styles from "./contact-form.module.css";
import Notification from "../ui/notification";

async function sendContactData(contactData) {
	const response = await fetch("/api/contact", {
		method: "POST",
		body: JSON.stringify(contactData),
		headers: { "Content-Type": "application/json" },
	});
	const data = response.json();
	if (!response.ok) throw new Error(data.message || "Something went wrong!");
}

function ContactForm() {
	const emailInputRef = useRef();
	const nameInputRef = useRef();
	const messageInputRef = useRef();
	const [requestStatus, setRequestStatus] = useState(); // pending, success, error
	const [requestError, setRequestError] = useState();
	useEffect(() => {
		if (requestStatus === "success" || requestStatus === "error") {
			const timer = setTimeout(() => {
				setRequestError(null);
				setRequestStatus(null);
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [requestStatus]);
	const onSubmitHandler = async event => {
		const email = emailInputRef.current.value;
		const name = nameInputRef.current.value;
		const message = messageInputRef.current.value;
		event.preventDefault();

		setRequestStatus("pending");
		try {
			await sendContactData({ email, name, message });
			setRequestStatus("success");
			emailInputRef.current.value = null;
			nameInputRef.current.value = null;
			messageInputRef.current.value = null;
		} catch (error) {
			setRequestError(error.message);
			setRequestStatus("error");
		}
	};

	let notification;
	if (requestStatus === "success") {
		notification = {
			title: "Success!",
			message: "Message sent successfully!",
			status: "success",
		};
	}
	if (requestStatus === "pending") {
		notification = {
			title: "Sending Message...",
			message: "Message is on its way!",
			status: "pending",
		};
	}
	if (requestStatus === "error") {
		notification = {
			title: "Error",
			message: requestError,
			status: "error",
		};
	}

	return (
		<section className={styles.contact}>
			<h1>How can I help you?</h1>
			<form className={styles.form} onSubmit={onSubmitHandler}>
				<div className={styles.controls}>
					<div className={styles.control}>
						<label htmlFor='email'>Email</label>
						<input type='email' id='email' ref={emailInputRef} required />
					</div>
					<div className={styles.control}>
						<label htmlFor='name'>Your Name</label>
						<input type='text' id='name' ref={nameInputRef} required />
					</div>
				</div>
				<div className={styles.control}>
					<label htmlFor='message'>Your Message</label>
					<textarea
						type='text'
						id='message'
						rows='5'
						ref={messageInputRef}
						required></textarea>
				</div>
				<div className={styles.action}>
					<button type='submit'>Send Message</button>
				</div>
			</form>
			{notification && (
				<Notification
					title={notification.title}
					message={notification.message}
					status={notification.status}
				/>
			)}
		</section>
	);
}

export default ContactForm;
