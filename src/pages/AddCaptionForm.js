import React from "react";

function AddCaptionForm ({sendCaption}) {
    return (
        <>
        <form className="captionForm" onSubmit={(e) => sendCaption(e)}>
              <label htmlFor="captionText" style={{fontSize: 24}}>Caption your photo.</label>
              <textarea type="text" id="galleryCaption" name="captionText" maxLength="55"></textarea>
              <button type="submit">done</button>
          </form>
        </>
    )
}

export default AddCaptionForm