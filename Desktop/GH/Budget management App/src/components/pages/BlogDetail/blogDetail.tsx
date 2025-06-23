import { NavLink, useParams } from 'react-router-dom';
import {FacebookShareButton,TwitterShareButton,LinkedinShareButton} from "react-share";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { IArticle } from '../../../routes';
import Banner from '../../common/Banner/banner';
import fbIcon from '../../../assets/svg/share-fb.svg';
import linkedinIcon from '../../../assets/svg/share-in.svg';
import twitterIcon from '../../../assets/svg/share-twitter.svg';
import newsImg from '../../../assets/images/news.jpeg';
import notFoundImg from '../../../assets/images/404.png';
import "./blogDetail.scss";
import 'swiper/css';
import 'swiper/css/navigation';


interface IBlogDetailProps {
    articles: IArticle[];
  }

const BlogDetail = ({ articles }: IBlogDetailProps) => {
  const { id } = useParams<{ id: string }>();
  const article = articles.find((a) => a.id === id);

  const currentUrl = window.location.href;

  if (!article) return <Banner title='404 Error' description='Page Not Found' image={notFoundImg} showButtons={false} returnButton = {true}/>;

  const title = article.title;

 function shuffleArray<T>(array: T[]): T[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); 
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }
  const filteredArticles = articles.filter((a)=> a.id !== article.id);
  const nextArticles = shuffleArray(filteredArticles).slice(0, 3);

  return (
    <section className="blog-detail-section">
        <Banner title={article.title} description={article.description} image={article.urlToImage || newsImg} className='blog-detail-section-banner' showButtons = {false}/>

        <div className="blog-detail-section-info">
          <h1 className='blog-detail-section-info-title'>{article.title}</h1>
          <img src={article.urlToImage || newsImg} alt={article.title} onError={(e) => {const target = e.target as HTMLImageElement;target.onerror = null;target.src = newsImg;}} className="blog-detail-section-info-img" />
          <h2 className='blog-detail-section-info-desc'>{article.description}</h2>
          <p className='blog-detail-section-info-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eu velit tempus erat egestas efficitur. In hac habitasse platea dictumst. Fusce a nunc eget ligula suscipit finibus. Aenean pharetra quis lacus at viverra. </p>
          <p className='blog-detail-section-info-text'>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam quis posuere ligula. In eu dui molestie, molestie lectus eu, semper lectus. </p>
          <p className='blog-detail-section-info-text'>Duis eu velit tempus erat egestas efficitur. In hac habitasse platea dictumst. Fusce a nunc eget ligula suscipit finibus. Aenean pharetra quis lacus at viverra. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. </p>
          <p className='blog-detail-section-info-text'>Morbi efficitur auctor metus, id mollis lorem pellentesque id. Nullam posuere maximus dui et fringilla. </p>

          <div className="blog-detail-section-info-share-buttons">
          <h2>Share</h2>
          <div>
           <FacebookShareButton url={currentUrl} title={title}>
            <img src={fbIcon} alt="Facebook" />
           </FacebookShareButton>

           <LinkedinShareButton url={currentUrl} title={title}>
            <img src={linkedinIcon} alt="Linkedin" />
           </LinkedinShareButton>

           <TwitterShareButton url={currentUrl} title={title}>
            <img src={twitterIcon} alt="Twitter" />
           </TwitterShareButton>
          </div>
        </div>

        <div className="blog-detail-section-info-next-articles">
            <h3 className="blog-detail-section-info-next-articles-title">What to read next</h3>
            <div className="blog-detail-section-info-next-articles-cards">
            {nextArticles.map((item: IArticle) => (
             <div className="blog-detail-section-info-next-articles-card" key={item.id}>
                <NavLink to={`/blog/${item.id}`} state={item}>
                 <img className="blog-detail-section-info-next-articles-card-img" src={item.urlToImage || newsImg} onError={(e) => {e.currentTarget.src = newsImg;}} alt={article.title} />
                </NavLink>
                <p className="blog-detail-section-info-next-articles-card-date">{new Date(item.publishedAt).toLocaleDateString('az-AZ')}</p>
                <h3 className="blog-detail-section-info-next-articles-card-title">{item.title}</h3>
                <p className="blog-detail-section-info-next-articles-card-desc">{item.description}</p>
            </div>
            ))}
            </div>
          </div>

        <div className="blog-detail-section-info-next-articles-responsive-cards">
          <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: 'swiper-button-prev',
          prevEl: 'swiper-button-next',
        }}
        slidesPerView={3}
        breakpoints={{
        0: {
          slidesPerView: 1.5,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
  }}
        spaceBetween={30}
      >
        {nextArticles.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="blog-detail-section-info-next-articles-responsive-cards-card">
               <NavLink to={`/blog/${item.id}`} state={item}>
                 <img className="blog-detail-section-info-next-articles-card-img" src={item.urlToImage || newsImg} onError={(e) => {e.currentTarget.src = newsImg;}} alt={article.title} />
                </NavLink>
                <p className="blog-detail-section-info-next-articles-card-date">{new Date(item.publishedAt).toLocaleDateString('az-AZ')}</p>
                <h3 className="blog-detail-section-info-next-articles-card-title">{item.title}</h3>
                <p className="blog-detail-section-info-next-articles-card-desc">{item.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      </div>
    </div>  
    </section>
  );
};

export default BlogDetail;
