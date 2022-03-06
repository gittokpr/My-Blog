import ArticleContent from '../components/ArticleContent';
import articles from './ArticleContent';

const ArticleList = () => {
    return (
        <>
            <h1>Articles</h1>
            <ArticleContent articles={articles} />
        </>
    )
}

export default ArticleList