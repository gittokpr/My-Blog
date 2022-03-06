import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';

const app = express();

app.use(bodyParser.json())

const articlesInfo = {
    'learn-react': {
        'upvotes': 0,
        'comments': []
    },
    'learn-node': {
        'upvotes': 0,
        'comments': []
    }
}

const withDB = async (operations, res) => {
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true });
        const db = client.db('my-blog');
        await operations(db);
        client.close();
    } catch (error) {
        res.status(500).json({ message: 'Error connecting to db', error })
    }
}

app.get("/api/article/:name", async (req, res) => {
    withDB(async (db) => {
        const articleName = req.params.name;
        const articleInfo = await db.collection('articles').findOne({ name: articleName });
        res.status(200).json(articleInfo);
    }, res)
})

app.post("/api/article/:name/upvote", async (req, res) => {
    withDB(async (db) => {
        const articleName = req.params.name;
        const articleInfo = await db.collection('articles').findOne({ name: articleName });
        await db.collection('articles').updateOne({ name: articleName }, {
            '$set': {
                upvotes: articleInfo.upvotes + 1
            }
        })
        const updatedArticle = await db.collection('articles').findOne({ name: articleName });
        res.status(200).json(updatedArticle);
    }, res)
})

app.post("/api/article/:name/add-comment", (req, res) => {
    const { user, text } = req.body;
    withDB(async (db) => {
        const articleName = req.params.name;
        const articleInfo = await db.collection('articles').findOne({ name: articleName });
        await db.collection('articles').updateOne({ name: articleName }, {
            '$set': {
                comments: articleInfo.comments.concat({ user, text })
            }
        })
        const updatedArticle = await db.collection('articles').findOne({ name: articleName });
        res.status(200).json(updatedArticle);
    }, res)
})

// app.post("/api/article/:name/add-comment", (req, res) => {
//     const { user, text } = req.body;
//     const articleName = req.params.name;
//     articlesInfo[articleName].comments.push({ user, text });
//     res.status(200).send(articlesInfo[articleName]);
// })

app.listen(8000, () => console.log("Listening on port 8000"));