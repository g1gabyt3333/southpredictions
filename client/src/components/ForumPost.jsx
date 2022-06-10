import React, { Component } from "react";
import * as app from "../firebase";
import {
    useCollectionData,
    useDocumentData,
} from "react-firebase-hooks/firestore";

class ForumPostModule extends Component {
    render() {
        return <div>{this.props.reply}</div>;
    }
}

const FormTitle = (props) => {
    const forumRef = app.db.collection(`/forum`).doc(props.postId);

    // const query = forumRef.where("__name__", "==", props.postId);
    const [values] = useDocumentData(forumRef, {
        //reminder to add loading later
        idField: "id",
    });
    return <h1> {values && values.message}</h1>;
};
export default function ForumPost(props) {
    const forumRef = app.db
        .collection(`/forum`)
        .doc(props.postId)
        .collection("replies");
    const query = forumRef.orderBy("timePosted");
    const [values] = useCollectionData(query, {
        //reminder to add loading later
        idField: "id",
    });

    return (
        <div>
            <FormTitle postId={props.postId} />
            {values &&
                values.map((reply) => (
                    <ForumPostModule key={reply.id} reply={reply.message} />
                ))}
            <ForumReply postId={props.postId} />
        </div>
    );
}

const ForumReply = (props) => {
    const [message, setMessage] = React.useState("");

    const handleChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const forumRef = app.db
            .collection(`/forum`)
            .doc(props.postId)
            .collection("replies");
        const newDoc = await forumRef.add({
            message: message,
            timePosted: app.makeTimestamp(new Date()),
        });
        console.log("Message added to forum ", newDoc.id);
        setMessage("");
    };
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={message}
                onChange={handleChange}
                placeholder="Type a message..."
                required
            />
            <button type="submit">Send</button>
        </form>
    );
};
