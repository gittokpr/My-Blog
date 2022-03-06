import { Link } from 'react-router-dom';

const ArticleContent = ({ articles }) => {
    return (
        <>
            {
                articles.map((article, key) => {
                    return (
                        <Link className="article-list-item" key={key} to={`/article/${article.name}`}>
                            <h1>{article.title}</h1>
                            <p>{article.content[0].substring(0, 150)}...</p>
                        </Link>
                    )
                })
            }
        </>
    )
}

export default ArticleContent;