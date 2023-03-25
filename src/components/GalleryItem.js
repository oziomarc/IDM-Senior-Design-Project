import React from "react";

const randomNumber = Math.floor(Math.random() * Prompts.length);

function CreatepostForm({sendPost}) {
    return (
        <>
            
            <form className="letterForm" onSubmit={(e) => sendPost(e)}>
                <div className="prompt"><p>{Prompts[randomNumber]}</p></div>

                <label htmlFor="letterText" style={{fontSize: 25}}>Write a letter in response to the prompt.</label>
                <textarea type="text" id="letter-input" name="letterText" maxlength="500"></textarea>

                <button type="submit">Post</button>
            </form>
        </>
        
    )
}

export default CreatepostForm;