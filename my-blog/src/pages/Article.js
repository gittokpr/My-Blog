import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ArticleContent from "../components/ArticleContent";
import CommentsList from "../components/CommentsList";
import UpvoteSection from "../components/UpvoteSection";
import articles from './ArticleContent';
import PageNotFound from "./PageNotFound";
import AddCommentForm from "../components/AddCommentsForm";

const Article = () => {
    let params = useParams();

    const articleName = params.name;

    const [articleInfo, setArticleInfo] = useState({
        upvotes: 0,
        comments: []
    });

    useEffect(() => {
        const fetchArticleInfo = async () => {
            const result = await fetch(`/api/article/${articleName}`);
            const body = await result.json();
            setArticleInfo(body);
        }
        fetchArticleInfo();
    }, [articleName]);


    const article = articles.find(article => article.name === articleName);
    if (!article) return <PageNotFound />

    const otherArticles = articles.filter(article => article.name !== articleName);

    return (
        <>
            <h1>{article.title}</h1>
            <UpvoteSection
                articleName={articleName}
                upvotes={articleInfo.upvotes}
                setArticleInfo={setArticleInfo} />
            {
                article.content.map((paragraph, key) => (
                    <p key={key}>{paragraph}</p>
                ))
            }
            <CommentsList comments={articleInfo.comments} />
            <AddCommentForm articleName={articleName} setArticleInfo={setArticleInfo} />
            <h3>Other Articles:</h3>
            <ArticleContent articles={otherArticles} />
        </>
    )
}

export default Article;