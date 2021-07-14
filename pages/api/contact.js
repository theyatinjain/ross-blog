import { MongoClient } from "mongodb";

const uri = `mongodb+srv://newUser101:kUWIzvfcrAkLeay9@cluster0.7pm51.mongodb.net/rossblog?retryWrites=true&w=majority`;

async function handler(req, res) {
	if (req.method === "POST") {
		const { name, email, message } = req.body;
		if (
			!email ||
			!email.includes("@") ||
			!name ||
			name.trim() === 0 ||
			!message ||
			message.trim() === 0
		) {
			return res.status(422).json({ message: "Invalid Inputs!" });
		}

		const newMessage = { name, email, message };

		let client;

		try {
			client = await MongoClient.connect(uri, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			});
		} catch (err) {
			return res
				.status(500)
				.json({ message: "Connection to database failed!" });
		}

		const db = client.db();

		try {
			const result = await db.collection("messages").insertOne(newMessage);
			newMessage._id = result.insertedId;
		} catch (err) {
			client.close();
			console.log(err);
			return res
				.status(500)
				.json({ message: "Insertion of data failed!", err });
		}

		client.close();
		res
			.status(201)
			.json({ message: "Message stored successfully", message: newMessage });
	}
}

export default handler;
