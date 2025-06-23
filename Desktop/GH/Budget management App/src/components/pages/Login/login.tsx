import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../store/features/authSlice';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Button from '../../UI/Button/button';
import Modal from '../../UI/Modal/modal';
import firstImg from '../../../assets/images/first-login-img.png';
import secondImg from '../../../assets/images/second-login-img.png';
import thirdImg from '../../../assets/images/third-login-img.png';
import eyeVisible from '../../../assets/svg/eye-visible.svg';
import eyeInvisible from '../../../assets/svg/eye-invisible.svg';
import success from '../../../assets/svg/success.svg';
import 'swiper/css';
import 'swiper/css/pagination';
import './login.scss';



const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector((state: any) => state.auth.user);
  const fromSubscription = location.state?.fromSubscription;
  const loginSuccess = useSelector((state: any) => state.auth.loginSuccess);
  const [errors, setErrors] = useState<{ email?: string; password?: string; repeatPassword?: string }>({});
  const subscriptionPlan = useSelector((state: any) => state.auth.subscriptionPlan);

  const [showPassword, setShowPassword] = useState(false);
  const [isActiveModal, setIsActiveModal] = useState(false);


  const validateForm = () => {
   const newErrors: typeof errors = {};

   if (!email) {
     newErrors.email = 'Email is required';
   } else if (!/\S+@\S+\.\S+/.test(email)) {
     newErrors.email = 'Invalid email format';
   }

   if (!password) {
     newErrors.password = 'Password is required';
   } else if (password.length < 8) {
     newErrors.password = 'Password must be at least 8 characters';
   }

   setErrors(newErrors);
   return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (!validateForm()) return;

    if (!user) {
    setErrors({ email: 'No user found. Please sign up first.' });
    return;
    }

    if (email !== user.email || password !== user.password) {
    setErrors({ password: 'Invalid email or password' });
    return;
    }
    
    dispatch(login({ email, password }));
    setEmail('');
    setPassword('');
    setErrors({});

    if (fromSubscription) {
    navigate('/payment');
    } else {
      setIsActiveModal(true);
    }
  };

  useEffect(() => {
  if (loginSuccess && fromSubscription && subscriptionPlan) {
    navigate('/payment', {
        state: {
        amount: location.state.amount,
        planType: location.state.planType,
      },
       
   } );
  }
  }, [loginSuccess]);

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <section className='login-section'>
     <div className='login-section-slider'> 
      <Swiper pagination={{ clickable: true }} modules={[Pagination]} className="mySwiper">
        <SwiperSlide>
          <div className='login-section-slider-info'>
            <img src={firstImg} alt="first-login-img" />
            <h2>Register by entering your email or phone number</h2>
            <p>We suggest you spend smarter, not less</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='login-section-slider-info'>
            <img src={secondImg} alt="second-login-img" />
            <h2>Create an account to control your cash flow</h2>
            <p>The most convenient way to track your expenses</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='login-section-slider-info'>
            <img src={thirdImg} alt="third-login-img" />
            <h2>Start controlling your budget by adding your expenses or income.</h2>
            <p>The app that shapes your budget</p>
          </div>
        </SwiperSlide>
      </Swiper>
     </div> 

     <div className='login-section-form'>
      <div className='login-section-form-title'>
        <h1>Welcome</h1>
        <p>Enter your login and password to log in</p>
      </div>

      <div className='login-section-form-input'>
        <label>E-mail</label>
        <input className={errors.email ? 'login-section-form-input-email error' : 'login-section-form-input-email'} type="text" placeholder='Type your e-mail' onChange={(e) => setEmail(e.target.value)} />
        {errors.email && <p className="signup-section-form-input-error">{errors.email}</p>}
      </div>
      <div className='login-section-form-input'>
        <label>Password</label>
        <div className={errors.password ? 'login-section-form-input-password error' : 'login-section-form-input-password'}>
          <input type={showPassword ? 'text' : 'password'} placeholder='Type your password' onChange={(e) => setPassword(e.target.value)} />
          <img src={showPassword ? eyeVisible : eyeInvisible} alt={showPassword ? 'eye-visible' : 'eye-invisible'} onClick={togglePasswordVisibility} />
        </div>
        {errors.password && <p className="signup-section-form-input-error">{errors.password}</p>}
      </div>
      <Button text='Login' onClick={handleLogin} variant='blue'/>
      {isActiveModal && (
       <Modal active={isActiveModal} onClick={() => navigate('/')} text='Go to home page'>
        <img src={success} alt="success" />
         <p>You have successfully logged in!</p>
       </Modal>
      )}
      <div className='login-section-form-signin'>
        <p>Don't have an account?</p>
        <Button text='Sign up' onClick={() => navigate('/signup')} variant='white'/>
      </div>
     </div>
    </section>
  )
}

export default Login
