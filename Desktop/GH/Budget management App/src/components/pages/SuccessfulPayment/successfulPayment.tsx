import { useNavigate } from 'react-router';
import Banner from '../../common/Banner/banner';
import Button from '../../UI/Button/button';
import bannerImg from '../../../assets/images/payment.png';
import successImg from '../../../assets/images/succesfulPayment.png';
import './successfulPayment.scss';

const SuccessfulPayment = () => {
  const navigate = useNavigate();
  return (
    <section className='successful-payment-section'>
        <Banner title='Payment page' description='Secure your access to premium features with a quick and easy payment. Choose the plan that fits your needs and take control of your finances today. Your journey to smarter budgeting starts here.' image={bannerImg}/>

        <div className='successful-payment-section-message'>
            <div className='successful-payment-section-message-card'>
              <img src={successImg} alt="successfulPayment" />
              <h1>Payment was successful!</h1>
              <p>Thank you for a good choice</p>
              <Button text='Return to the home page' onClick={() => navigate('/')} variant='blue'/>
            </div>
        </div>
    </section>
  )
}

export default SuccessfulPayment
