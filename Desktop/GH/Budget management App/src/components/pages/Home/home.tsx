import { useNavigate } from 'react-router';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSubscriptionPlan } from '../../../store/features/authSlice';
import Banner from '../../common/Banner/banner';
import Button from '../../UI/Button/button';
import Slider from '../../UI/Slider/slider';
import bannerImg from '../../../assets/images/slogan.png';
import startActivityIcon from '../../../assets/svg/home-start-activity.svg';
import startWalletIcon from '../../../assets/svg/home-start-wallet.svg';
import startPaperIcon from '../../../assets/svg/home-start-paper.svg';
import startLineIcon from '../../../assets/svg/home-start-line.svg';
import budgetVideo from '../../../assets/videos/budget-video.mp4';
import activityIcon from '../../../assets/svg/home-slider-activity.svg';
import walletIcon from '../../../assets/svg/home-slider-wallet.svg';
import paperIcon from '../../../assets/svg/home-slider-paper.svg';
import cardIcon from '../../../assets/svg/home-slider-card.svg';
import './home.scss';


const Home = () => {
   const items = [
    { id:1, icon: activityIcon, text: "Simple interface/app that makes it easy to control your cash flows" },
    { id:2, icon: walletIcon, text: "Fast transaction entry - Add all transactions with one click" },
    { id:3, icon: paperIcon, text: "Creating templates to simplify and speed up the entry of transactions" },
    { id:4, icon: cardIcon, text: "Ability to control expenses of different accounts from one source" },
    { id:5, icon: activityIcon, text: "Simple interface that makes it easy to control your cash flows" },
    { id:6, icon: walletIcon, text: "Fast transaction entry. Add all transactions with one click" },
    { id:7, icon: paperIcon, text: "Creating templates to simplify and speed up the entry of transactions!" },
    { id:8, icon: cardIcon, text: "Ability to control expenses of different accounts from one source." },
    ];
    const navigate = useNavigate();
    const [isMonthly, setIsMonthly] = useState(true);

    const handleToggle = () => {
      setIsMonthly(!isMonthly);
    };

    const dispatch = useDispatch();
    const loginSuccess = useSelector((state: any) => state.auth.loginSuccess);

    const handleNavigate = (amount: string, planType: string) => {
          if (!loginSuccess) {
           dispatch(setSubscriptionPlan({ amount, planType }));
           navigate('/login');
          } else {
           navigate('/payment', { state: { amount, planType } });
          }
    }; 
  return (
    <section className='home-section'>

      <Banner
        title='Slogan'
        description='Take control of your finances with ease. Track your spending, set smart goals, and save more every day. Budgeting has never been this simple.'
        image={bannerImg}
      />

      <div className='home-section-start'>
        <h1 className='home-section-start-title'>How to start</h1>

        <div className='home-section-start-icons'>
          <div className='home-section-start-icons-info'>
            <div className='home-section-start-icons-info-activity'>
             <img src={startActivityIcon} alt="start-activity-icon" />
            </div>
            <p>Register with email or phone number.</p>
          </div>
          <img className='home-section-start-icons-line' src={startLineIcon} alt="start-line-icon" />
          <div className='home-section-start-icons-info'>
            <div className='home-section-start-icons-info-wallet'>
             <img src={startWalletIcon} alt="start-wallet-icon" />
            </div>
            <p>He creates his initial account to record his transactions.</p>
          </div>
          <img className='home-section-start-icons-line' src={startLineIcon} alt="start-line-icon" />
          <div className='home-section-start-icons-info'>
            <div className='home-section-start-icons-info-paper'>
             <img src={startPaperIcon} alt="start-paper-icon" />
            </div>
            <p>You can add transactions and track your account.</p>
          </div>
        </div>

        <div className='home-section-start-video'>
          <video src={budgetVideo} controls autoPlay muted loop />
        </div>

        <Slider items={items} title='What the app does' variant1='blue' />
      </div>


      <section className='home-section-subscription'>
        <h1 className='home-section-subscription-title'>Subscription Plans</h1>
        <p className='home-section-subscription-text'>Choose the best plan for your business.</p>

        <div className='home-section-subscription-switch'>
          <p className='home-section-subscription-switch-name'>Yearly</p>
          <label>
            <input type="checkbox" checked={isMonthly} onChange={handleToggle} />
            <span className='slider'></span>
          </label>
          <p className='home-section-subscription-switch-name'>Monthly</p>
        </div>

        <div className='home-section-subscription-cards'>
          <div className='home-section-subscription-card left'>
            <h2>Basic plan</h2>
            <h1>{isMonthly ? "$3/Month" : "$30/Year"}</h1>
            <p>Access to basic features</p>
            <p>Monthly budget tracking</p>
            <p>Cancel anytime</p>
            <Button text="Get Started" onClick={() => handleNavigate(isMonthly ? "$3" : "$30", isMonthly ? "Basic (Monthly)" : "Basic (Yearly)")} className='subscription-banner-section-card-btn' variant="blue" />
          </div>

          <div className='home-section-subscription-card right'>
            <h2>Premium plan</h2>
            <h1>{isMonthly ? "$25/Month" : "$250/Year"}</h1>
            <p>Advanced analytics & insights</p>
            <p>Team collaboration tools</p>
            <p>Customizable budgeting tools</p>
            <Button text="Get Started" onClick={() => handleNavigate(isMonthly ? "$25" : "$250", isMonthly ? "Premium (Monthly)" : "Premium (Yearly)")} className='subscription-banner-section-card-btn' variant="white" />
          </div>
        </div>
      </section>
    </section>
  );
}


export default Home;
