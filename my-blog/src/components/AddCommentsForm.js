import { useState } from "react";

const AddCommentsForm = ({ articleName, setArticleInfo }) => {
    const [user, setUser] = useState('');
    const [commentTxt, setCommentTxt] = useState('');

    const addComment = async () => {
        const result = await fetch(`/api/article/${articleName}/add-comment`, {
            method: "post",
            body: JSON.stringify({ user, text: commentTxt }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const body = await result.json();
        setArticleInfo(body);
        setUser('');
        setCommentTxt('');
    }

    return (
        <div id="add-comment-form">
            <h3>Add a Comment</h3>
            <label >
                UserName:
                <input type="text"
                    value={user}
                    onChange={(event) => setUser(event.target.value)} />
            </label>
            <label >
                Comment:
                <textarea cols="50" rows="4"
                    value={commentTxt}
                    onChange={(event) => setCommentTxt(event.target.value)}>Add Comments
                </textarea>
            </label>
            <button onClick={() => addComment()}>Submit</button>
        </div>
    );
}

export default AddCommentsForm;