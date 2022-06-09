import React, { Component } from "react";
import * as app from "../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

class ForumPostModule extends Component {
    render() {
        return <div>{this.props.reply}</div>;
    }
}

const FormTitle = (props) => {
    const forumRef = app.db.collection(`/forum`);

    const query = forumRef.where("__name__", "==", props.postId);
    const [values, loading, error, snapshot] = useCollectionData(query, {
        idField: "id",
    });

    return <h1> {values && values[0].message}</h1>;
};
export default function ForumPost(props) {
    const forumRef = app.db.collection(`/forum/${props.postId}/replies`);
    const query = forumRef.orderBy("timePosted");
    const [values, loading, error, snapshot] = useCollectionData(query, {
        idField: "id",
    });

    // console.log(values);
    
    return (
        <div>
            <FormTitle postId={props.postId} />
            {values &&
                values.map((reply) => (
                    <ForumPostModule key={reply.id} reply={reply.message} />
                ))}
        </div>
    );
}
