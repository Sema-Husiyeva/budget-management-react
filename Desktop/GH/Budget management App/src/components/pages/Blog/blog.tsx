import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import type { IArticle } from "../../../routes";
import Button from "../../UI/Button/button";
import Banner from "../../common/Banner/banner";
import bannerImg from '../../../assets/images/blog.png';
import newsImg from '../../../assets/images/news.jpeg';
import './blog.scss';

interface IBlogProps {
  articles: IArticle[];
}

const Blog: React.FC<IBlogProps> = ({ articles }) => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleCount, setVisibleCount] = useState(6);
  const articlesPerPage = 6;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const uniqueArticles = articles.filter((article, index, self) =>
    index === self.findIndex(
      (a) => a.title === article.title && a.publishedAt === article.publishedAt
    )
  );

  const totalPages = Math.ceil(uniqueArticles.length / articlesPerPage);
  const start = (currentPage - 1) * articlesPerPage;
  const paginatedArticles = uniqueArticles.slice(start, start + articlesPerPage);
  const visibleArticles = uniqueArticles.slice(0, visibleCount);

  const handleClick = (article: IArticle) => {
    navigate(`/blog/${article.id}`, { state: { article, articles } });
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const getPaginationRange = (current: number, total: number): (number | string)[] => {
    const delta = 1;
    const range: (number | string)[] = [];
    range.push(1);

    if (current - delta > 2) range.push("...");

    for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
      range.push(i);
    }

    if (current + delta < total - 1) range.push("...");
    if (total > 1) range.push(total);

    return range;
  };

  const paginationItems = getPaginationRange(currentPage, totalPages);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + articlesPerPage);
  };
  
  return (
    <>
      <Banner
        title="Blog"
        description="Discover insights, tips, and stories that inspire. Our blog brings you the latest updates and practical advice to manage your finances better. Learn from experts and real-life experiences. Stay informed, stay empowered."
        image={bannerImg}
      />

      <div className="blogs-section">
        {(isMobile ? visibleArticles : paginatedArticles).map((article) => (
          <div
            key={article.id}
            onClick={() => handleClick(article)}
            className="blogs-section-card"
          >
            <Link to={`/blog/${article.id}`}>
              <img
                className="blogs-section-card-img"
                src={article.urlToImage || newsImg}
                alt={article.title}
                onError={(e) => {
                 const target = e.target as HTMLImageElement;
                 target.onerror = null;
                 target.src = newsImg;
                }}
              />
            </Link>
            <p className="blogs-section-card-date">
              {new Date(article.publishedAt).toLocaleDateString("az-AZ")}
            </p>
            <h3 className="blogs-section-card-title">{article.title}</h3>
            <p className="blogs-section-card-desc">{article.description}</p>
          </div>
        ))}

  
        {isMobile && visibleCount < uniqueArticles.length && (
          <div className="blogs-section-readmore">
            <Button text="Read more" onClick={handleLoadMore} variant="blue"/>
          </div>
        )}

    
        {!isMobile && (
          <div className="blogs-section-pagination">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              &lt;
            </button>

            {paginationItems.map((page, idx) =>
              page === "..." ? (
                <span key={`dots-${idx}`} className="dots">
                  ...
                </span>
              ) : (
                <button
                  key={`page-${page}`}
                  className={currentPage === page ? "active" : ""}
                  onClick={() => handlePageChange(Number(page))}
                >
                  {page}
                </button>
              )
            )}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default Blog
