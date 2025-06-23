import { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from "../../UI/Slider/slider";
import Banner from "../../common/Banner/banner";
import appImg from '../../../assets/images/app.jpeg';
import starIcon from '../../../assets/images/stars-icon.png';
import bannerImg from '../../../assets/images/help.png';
import budgetAppImg from '../../../assets/images/budget-app.png';
import googlePlayColored from '../../../assets/svg/google-play-colored.svg';
import appStoreColored from '../../../assets/svg/app-store-colored.svg';
import cashbackIcon from '../../../assets/svg/help-slider-cashback.svg';
import salaryIcon from '../../../assets/svg/help-slider-salary.svg';
import templateIcon from '../../../assets/svg/help-slider-template.svg';
import categoryIcon from '../../../assets/svg/help-slider-category.svg';
import './help.scss';

interface ISliderItem {
  id:number;
  icon: string;        
  title: string;    
  subtitle: string;   
  text: string; 
  name: string;
  avatar:string;      
}

const Help = () => {
  const items = [
    { id:1, icon: cashbackIcon, title:'User account:', text: "Protect your personal budget by creating an account on Android (iOS) and browser." },
    { id:2, icon: salaryIcon, title:'Account:', text: "A quick summary of your budget - Track information about your cash and bank accounts in one central location." },
    { id:3, icon: templateIcon, title:'Template:', text: "Creating templates to simplify and speed up the entry of transactions" },
    { id:4, icon: categoryIcon, title:'Category:', text: "To analyze your cash flow, divide it into specific categories. For example: Expenses: food, shopping or income: salary, gifts" },
    { id:5, icon: cashbackIcon, title:'User account:', text: "Protect your personal budget by creating an account on Android (iOS) and browser." },
    { id:6, icon: salaryIcon, title:'Account:', text: "A quick summary of your budget - Track information about your cash and bank accounts in one central location." },
    { id:7, icon: templateIcon, title:'Template:', text: "Creating templates to simplify and speed up the entry of transactions!" },
    { id:8, icon: categoryIcon, title:'Category:', text: "To analyze your cash flow, divide it into specific categories. For example: Expenses: food, shopping or income: salary, gifts" },
    ];

   const [reviews, setRewies] = useState<ISliderItem[]>([]);

   useEffect(() => {
    axios.get('https://dummyjson.com/comments?limit=8')
    .then(res => {
      const comments = res.data.comments;
      const reviews = comments.map((comment:any) => ({
        id: comment.id,
        icon: starIcon,
        text: comment.body,
        subtitle: 'Baku, Azerbaijan',
        name: comment.user.username,
        avatar: `https://i.pravatar.cc/150?u=${comment.user.id}`,
      }));
      setRewies(reviews);
      console.log(comments)
    });
    }, []);

  return (
    <section className="help-section">
      <Banner title='Help' description="Need assistance? We're here to help you every step of the way. Find guides, tips, and support to make your experience smoother. Whether you're just getting started or need help with something specific, we've got your back. Let us make things easier for you." image={bannerImg}/>

      <div className="help-section-main">
        <div className="help-section-services">
         <img className="help-section-services-img" src={budgetAppImg} alt="budgetAppImg" />
         <div className="help-section-services-info">
           <h2 className="help-section-services-info-title">Services</h2>
           <p className="help-section-services-info-text">We have put the management of your financial flows into a simple interface. Through our application, you will be able to categorize your income and expenses and easily prepare your reports using various filters.</p>
         </div>
        </div>

        <Slider items={items} variant1="none" navigationId="slider1" className='mySwiper slider-section-first' />

        <Slider title='Review our clients' items={reviews} variant1= 'white' variant2='star' className='mySwiper slider-section-second' navigationId="slider2" />
      </div>

      <Banner title='Start using our app' description='Take control of your finances with ease. Track your spending, set smart budgets, and stay on top of your goals. Our app is designed for simplicity and efficiency. Download now and make money management effortless.' image={appImg} variant='white' buttonVariants={['white', 'white']} buttonIcons={[googlePlayColored, appStoreColored]}/>
    </section>
  )
}

export default Help
