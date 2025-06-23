import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { signup } from '../../../store/features/authSlice';
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
import './signup.scss';

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string; repeatPassword?: string }>({});

  const [showPassword, setShowPassword] = useState(false);
  const [isActiveModal, setIsActiveModal] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

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

   if (!repeatPassword) {
     newErrors.repeatPassword = 'Please repeat your password';
  } else if (repeatPassword !== password) {
     newErrors.repeatPassword = 'Passwords do not match';
   }

   setErrors(newErrors);
   return Object.keys(newErrors).length === 0;
  };

  const handleSignup = () => {
    if (!validateForm()) return;

    dispatch(signup({ email, password }));
    setEmail('');
    setPassword('');
    setRepeatPassword('');
    setErrors({});
    setIsActiveModal(true);
  };

  return (
    <section className='signup-section'>
        <div className='signup-section-slider'> 
        <Swiper pagination={{ clickable: true }} modules={[Pagination]} className="mySwiper">
        <SwiperSlide>
          <div className='signup-section-slider-info'>
            <img src={firstImg} alt="first-login-img" />
            <h2>Register by entering your email or phone number</h2>
            <p>We suggest you spend smarter, not less</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='signup-section-slider-info'>
            <img src={secondImg} alt="second-login-img" />
            <h2>Create an account to control your cash flow</h2>
            <p>The most convenient way to track your expenses</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='signup-section-slider-info'>
            <img src={thirdImg} alt="third-login-img" />
            <h2>Start controlling your budget by adding your expenses or income.</h2>
            <p>The app that shapes your budget</p>
          </div>
        </SwiperSlide>
      </Swiper>
     </div> 

     <div className='signup-section-form'>
      <div className='signup-section-form-input'>
        <label>E-mail</label>
        <input className={errors.email ? 'signup-section-form-input-email error' : 'signup-section-form-input-email'} type="text" placeholder='Type your e-mail' onChange={(e) => setEmail(e.target.value)} value={email} />
        {errors.email && <p className="signup-section-form-input-error">{errors.email}</p>}
      </div>
      <div className='signup-section-form-input'>
        <label>Password</label>
        <div className={errors.password ? 'signup-section-form-input-password error' : 'signup-section-form-input-password'}>
          <input type={showPassword ? 'text' : 'password'} placeholder='Type your password' onChange={(e) => setPassword(e.target.value)} value={password} />
          <img src={showPassword ? eyeVisible : eyeInvisible} alt={showPassword ? 'eye-visible' : 'eye-invisible'} onClick={togglePasswordVisibility} />
        </div>
        {errors.password && <p className="signup-section-form-input-error">{errors.password}</p>}
      </div>
      <div className='signup-section-form-input'>
        <label>Repeate password</label>
        <div className={errors.password ? 'signup-section-form-input-password error' : 'signup-section-form-input-password'}>
          <input type={showPassword ? 'text' : 'password'} placeholder='Type your password again' value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
          <img src={showPassword ? eyeVisible : eyeInvisible} alt={showPassword ? 'eye-visible' : 'eye-invisible'} onClick={togglePasswordVisibility} />
        </div>
        {errors.repeatPassword && <p className="signup-section-form-input-error">{errors.repeatPassword}</p>}
      </div>
      <Button text='Sign up' onClick={handleSignup} variant='blue'/>
      {isActiveModal && (
        <Modal active={isActiveModal} onClick={() => navigate('/login')} text='Login'>
          <img src={success} alt="success" />
          <p>You have successfully registered! You can now go to the login page.</p>
        </Modal>
      )}
      
      <div className='signup-section-form-signin'>
        <p>Already have an account?</p>
        <Button text='Login' onClick={() => navigate('/login')} variant='white'/>
      </div>
     </div>
    </section>
  )
}

export default Signup

 
  