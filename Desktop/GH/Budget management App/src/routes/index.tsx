import {Routes, Route} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { fetchBudgetArticles } from '../api/budgetApi'
import Layout from '../components/layout/layout'
import Home from '../components/pages/Home/home'
import Help from '../components/pages/Help/help'
import Faq from '../components/pages/FAQ/faq'
import Blog from '../components/pages/Blog/blog'
import Subscription from '../components/pages/Subscription/subscription'
import Login from '../components/pages/Login/login'
import Payment from '../components/pages/Payment/payment'
import BlogDetail from '../components/pages/BlogDetail/blogDetail'
import SuccessfulPayment from '../components/pages/SuccessfulPayment/successfulPayment'
import Signup from '../components/pages/Signup/signup'
import Privacy from '../components/pages/Privacy/privacy'
import Terms from '../components/pages/Terms/terms'
import Contact from '../components/pages/Contact/contact'
import Banner from '../components/common/Banner/banner'
import notFoundImg from '../assets/images/404.png';

export interface IArticle {
    id: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
  }

const AppRoutes = () => {
    const [articles, setArticles] = useState<IArticle[]>([]);
    useEffect(() => {
        fetchBudgetArticles("budget OR finance OR saving money")
          .then((res) => {
            const mapped = res.data.articles.map((item: any) => ({
              id:`${item.title.toLowerCase().replace(/\s+/g, "-")}-${item.publishedAt}`,
              title: item.title,
              description: item.description,
              url: item.url,
              urlToImage: item.urlToImage,
              publishedAt: item.publishedAt,
            }));
            setArticles(mapped);
          })
          .catch((err) => {
            console.error("Error fetching articles", err);
          });
      }, []);

  return (
    <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="help" element={<Help />} />
          <Route path="faq" element={<Faq />} />
          <Route path="blog" element={<Blog articles={articles} />} />
          <Route path="subscription" element={<Subscription />} />
          <Route path="payment" element={<Payment />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="contact" element={<Contact />} />
          <Route path="/blog/:id" element={<BlogDetail articles={articles} />} />
          <Route path="/payment/successfulPayment" element={<SuccessfulPayment />} />
          <Route path="*" element={<Banner title='404 Error' description='Page Not Found' image={notFoundImg} showButtons={false} returnButton = {true} />} />
        </Route>

        <Route path="login" element={<Login />} />
        <Route path='signup' element={<Signup />}/>
    </Routes>
  )
}

export default AppRoutes
