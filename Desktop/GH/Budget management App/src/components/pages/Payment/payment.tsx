import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { setSubscriptionPlan } from '../../../store/features/authSlice';
import Banner from '../../common/Banner/banner';
import Button from '../../UI/Button/button';
import Select from 'react-select';
import bannerImg from '../../../assets/images/payment.png';
import CVCImg from '../../../assets/svg/cvc.svg';
import './payment.scss';

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const amount = location.state?.amount || "0";
  const planType = location.state?.planType || "Unknown";

  const numberAmount = parseFloat(amount.replace('$', ''));
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(numberAmount);
  const [promocodeError, setPromocodeError] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cvc, setCVC] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [errors, setErrors] = useState({
  cardName: '',
  cardNumber: '',
  month: '',
  year: '',
  cvc: ''
  });

const handlePayment = () => {
  let valid = true;
  const newErrors = {
    cardName: '',
    cardNumber: '',
    month: '',
    year: '',
    cvc: ''
  };

  if (!/^[A-Za-z\s]+$/.test(cardName)) {
    newErrors.cardName = 'Card name cannot contain numbers';
    valid = false;
  }

  if (!/^\d{16}$/.test(cardNumber)) {
    newErrors.cardNumber = 'Card number must be exactly 16 digits';
    valid = false;
  }

  if (!(+month >= 1 && +month <= 12)) {
    newErrors.month = 'Month must be between 01 and 12';
    valid = false;
  }

  if (!(+year >= 25)) {
    newErrors.year = 'Year must be 25 or greater';
    valid = false;
  }

  if (!/^\d{3}$/.test(cvc)) {
    newErrors.cvc = 'CVC must be exactly 3 digits';
    valid = false;
  }

  setErrors(newErrors);

  if (valid) {
    dispatch(setSubscriptionPlan({ amount, planType }));
    navigate('./successfulPayment');
  }
 };

  const handlePromoCode = () => {
    if (promoCode.toLowerCase() === 'welcome20') {
      const discountAmount = numberAmount * 0.2;
      setDiscount(discountAmount);
      setTotalAmount(numberAmount - discountAmount);
      setPromocodeError('');
    } else {
      setDiscount(0);
      setTotalAmount(numberAmount);
      setPromocodeError('Invalid promo code!');
    }
    setPromoCode('');
  }

  const options = [
  { value: 'visa', label: 'Visa' },
  { value: 'mastercard', label: 'Mastercard' },
  ];
  return (
    <section>
      <Banner title='Payment page' description='Secure your access to premium features with a quick and easy payment. Choose the plan that fits your needs and take control of your finances today. Your journey to smarter budgeting starts here.' image={bannerImg}/>

      <div className='payment-section'>
        <div className='payment-section-left'>
         <div className='payment-section-left-input'>
            <label htmlFor="type">Payment Details</label>
            <Select
             options={options}
             placeholder="Select card type"
             className='select'
             classNamePrefix="select"
           />
         </div>
         <div className='payment-section-left-input'>
          <label htmlFor="name">Card Name</label>
          <input className={errors.cardName ? 'input error' : 'input'} value={cardName} onChange={(e) => setCardName(e.target.value)} type="text" />
          {errors.cardName && <p className="payment-section-left-error">{errors.cardName}</p>}
         </div>
         <div className='payment-section-left-input'>
          <label htmlFor="number">Card Number</label>
          <input className={errors.cardNumber ? 'input error' : 'input'} value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} type="number" />
          {errors.cardNumber && <p className="payment-section-left-error">{errors.cardNumber}</p>}
         </div>

         <div>
          <div className='payment-section-left-label'>
            <p>Expiration</p>
            <div className='payment-section-left-label-cvc'>
              <p>CVC</p> 
              <img src={CVCImg} alt="cvc" />
            </div>
           </div>
          <div className='payment-section-left-expiration'>
            <input className={errors.month ? 'input error' : 'input'} value={month} onChange={(e) => setMonth(e.target.value)} type="number" />
            <span>/</span>
            <input className={errors.year ? 'input error' : 'input'} value={year} onChange={(e) => setYear(e.target.value)} type="number" />
            <input className={errors.cvc ? 'input error' : 'input'} value={cvc} onChange={(e) => setCVC(e.target.value)} type="number" />
          </div>
          <div>
            {errors.month && <p className="payment-section-left-error">{errors.month}</p>}
            {errors.year && <p className="payment-section-left-error">{errors.year}</p>}
            {errors.cvc && <p className="payment-section-left-error">{errors.cvc}</p>}
          </div>
         </div>
         <br />
         <div className='payment-section-left-buttons'>
          <Button text={`Pay $${totalAmount.toFixed(2)}`} onClick={handlePayment}  variant='blue'/>
         </div>
        </div>

        <div className='payment-section-right'>
          <h3 className='payment-section-right-order'>Order</h3>

          <div className='payment-section-right-order'>
            <h3>Starter</h3>
            <h3>{amount}</h3>
          </div>

          <div className='payment-section-right-order-promo'>
            <div>
              <p>Promokod</p>
              <input type="text"
              value={promoCode}
              onChange={(e) => {
                setPromoCode(e.target.value);
                setPromocodeError('');
              }} 
              placeholder='Enter promo code' 
              />
            </div>
            <Button text='Apply' onClick={handlePromoCode} variant='blue'/>
          </div>
          {promocodeError && <p>{promocodeError}</p>}
          
          <div className='payment-section-right-order'>
            <p>Time</p>
            <p>{planType}</p>
          </div>

          <div className='payment-section-right-order'>
            <h3>Total</h3>
            <h3>{`$${totalAmount.toFixed(2)}`}</h3>
          </div>
        </div>

        <div className='payment-section-right-responsive'>
          <h3 className='payment-section-right-order'>Order</h3>

          <div className='payment-section-right-order'>
            <h3>Starter</h3>
            <h3>{amount}</h3>
          </div>

          <div className='payment-section-right-order-promo'>
            <div>
              <p>Promokod</p>
              <input type="text"
              value={promoCode}
              onChange={(e) => {
                setPromoCode(e.target.value);
                setPromocodeError('');
              }} 
              placeholder='Enter promo code' 
              />
            </div>
            <Button text='Apply' onClick={handlePromoCode} variant='blue'/>
          </div>
          {promocodeError && <p>{promocodeError}</p>}
          
          <div className='payment-section-right-order'>
            <p>Time</p>
            <p>{planType}</p>
          </div>

          <div className='payment-section-right-order'>
            <h3>Total</h3>
            <h3>{`$${totalAmount.toFixed(2)}`}</h3>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Payment
