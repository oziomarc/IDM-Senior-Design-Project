// const express = require('express');
// const router = express.Router();
// const firestore = require('firebase/firestore');
// const db = firestore.getFirestore();

// const picture = `<p>YEAR<p>`;

// router.use((req, res, next) => {
//     next();
// })

// router.get("/", (req, res) => {
//     res.send(createPostform);
// })

// router.get("/submit", (req, res) => {
//     const queryParams = req.query;
//     const title = queryParams.postTitle;
//     const text = queryParams.postText;
//     const author = queryParams.author;

//     const idFromTitle = title.replace(/\s+/g, "-").toLowerCase();

//     const setBlogPost = firestore.setDoc (
//         firestore.doc(db, "posts", idFromTitle),
//         {
//             title: title,
//             text: text,
//             author: author,
//         }
//     );

//     setBlogPost 
//     .then((response) => {
//         res.send(`
//             <h1>Submission successful!</h1>
//             <p><a href="/create">Add another post</a></p>
//             <p><a href="/">RETURN HOME</a></p>
//         `);
//     })
//     .catch((error) => {
//         console.warn(error)
//         res.send(`error submiting: ${error.toString()}`)
//     })
    
// })

// module.exports = router;