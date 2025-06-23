import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import Button from '../../UI/Button/button';
import Banner from '../../common/Banner/banner';
import planImg from '../../../assets/images/plan.jpeg';
import appImg from '../../../assets/images/app.jpeg';
import googlePlayColored from '../../../assets/svg/google-play-colored.svg';
import appStoreColored from '../../../assets/svg/app-store-colored.svg';
import './subscription.scss';


const Subscription = () => {
    const navigate = useNavigate();
    const [isMonthly, setIsMonthly] = useState(true);
    const loginSuccess = useSelector((state: any) => state.auth.loginSuccess);

    const handleToggle = () => {
      setIsMonthly(!isMonthly);
    };

    const handleNavigate = (amount: string, planType: string) => {
      if (!loginSuccess) {
       navigate('/login', { state: { fromSubscription: true, amount, planType } });
      } else {
       navigate('/payment', { state: { amount, planType } });
      }
    }; 
  return (
    <>
      <section className='subscription-banner-section'>
        <h1 className='subscription-banner-section-title'>Subscription Plans</h1>
        <p className='subscription-banner-section-text'>Choose the best plan for your business.</p>

        <div className='subscription-banner-section-switch'>
          <p className='subscription-banner-section-switch-name'>Yearly</p>
          <label>
           <input type="checkbox" checked={isMonthly} onChange={handleToggle} />
             <span className='slider'></span>
           </label>
           <p className='subscription-banner-section-switch-name'>Monthly</p>
        </div>

        <div className='subscription-banner-section-cards'>
            <div className='subscription-banner-section-card left'>
              <h2>Basic plan</h2>
              <h1>{isMonthly ? "$3/Month" : "$30/Year"}</h1>
              <p>Access to basic features</p>
              <p>Monthly budget tracking</p>
              <p>Cancel anytime</p>
              <Button text="Get Started" onClick={() => handleNavigate(isMonthly ? "$3" : "$30", isMonthly ? "Basic (Monthly)" : "Basic (Yearly)")} className='subscription-banner-section-card-btn' variant="blue"/>
            </div>    

            <div className='subscription-banner-section-card right'>
              <h2>Premium plan</h2>
              <h1>{isMonthly ? "$25/Month" : "$250/Year"}</h1>
              <p>Advanced analytics & insights</p>
              <p>Team collaboration tools</p>
              <p>Customizable budgeting tools</p>
            <Button text="Get Started" onClick={() => handleNavigate(isMonthly ? "$25" : "$250", isMonthly ? "Premium (Monthly)" : "Premium (Yearly)")} className='subscription-banner-section-card-btn' variant="white"/>
            </div>    
        </div>

      </section>

      <section className='plans-section container'>
        <img className='plans-section-img-responsive' src={planImg} alt="plan-image" />
        <h1 className='plans-section-title'>Advantages of Plans</h1>
        <div className='plans-section-info'>
            <img className='plans-section-img' src={planImg} alt="plan-image" />
            <div>
                <h3 className='plans-section-info-title'>You will use the services of our application by subscribing to the plans:</h3>
                <ul className='plans-section-info-list'>
                    <li>1. Create unlimited accounts</li>
                    <li>2. Detailed graphs for analysis</li>
                    <li>3. Unlimited use of income and expense categories(and subcategories)</li>
                    <li>4. Monitoring money movements from one center</li>
                    <li>5. Multicurrency system</li>
                    <li>6. Synchronization between Web, IOS, Android versions</li>
                    <li>7. Using new features</li>
                    <li>8. The app will be free to use for the first 30 days</li>
                </ul>
            </div>
        </div>
      </section>

      <Banner title='Start using our app' description='Take control of your finances with ease. Track your spending, set smart budgets, and stay on top of your goals. Our app is designed for simplicity and efficiency. Download now and make money management effortless.' image={appImg} variant='white' buttonVariants={['white', 'white']} buttonIcons={[googlePlayColored, appStoreColored]}/>
    </>
  )
}

export default Subscription
