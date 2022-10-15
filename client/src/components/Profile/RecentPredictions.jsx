import { useState, useContext } from "react";
import RecentPrediction from "./RecentPrediction";
import * as app from "../../firebase";
import { UserContext } from "../../Providers/UserContext";

export default function RecentPredictions({ predictions }) {
    // console.log(predictions)
    const [pred, setPred] = useState(predictions);
    const [loading, setLoading] = useState(true);
    const { userData } = useContext(UserContext);

    if (pred === undefined) {
        app.db
            .collection("/user")
            .doc(userData.uid)
            .collection("/votes")
            .orderBy("date", "desc")
            .limit(10)
            .get()
            .then((data) => data.docs)
            .then((docs) => {
                setPred(docs.map((doc) => ({ ...doc.data(), id: doc.id })));
                setLoading(false);
            });
    }

    if (loading) {
        if(pred !== undefined) {
            setLoading(false)
        }


        return <div>Loading...</div>;
    }
    return (
        <>
            {pred.map((doc) => (
                <RecentPrediction key={doc.id} data={doc} />
            ))}
        </>
    );
}
