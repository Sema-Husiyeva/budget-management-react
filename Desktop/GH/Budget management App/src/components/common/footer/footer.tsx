import React, { useState } from 'react';
import { NavLink } from 'react-router';
import Button from '../../UI/Button/button';
import Modal from '../../UI/Modal/modal';
import facebookIcon from '../../../assets/svg/facebook-icon.svg';
import instagramIcon from '../../../assets/svg/instagram-icon.svg';
import youtubeIcon from '../../../assets/svg/youtube-icon.svg';
import twitterIcon from '../../../assets/svg/twitter-icon.svg';
import linkedinIcon from '../../../assets/svg/linkedin-icon.svg';
import subscribeImg from '../../../assets/images/subscribe.png';
import './footer.scss';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isActiveModal, setIsActiveModal] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setEmail(e.target.value);
    }

    const handleSubscribe = () => {
        if(email === '') {
            setError("Can't be empty!");
            return;
        }

        if(!email.includes('@gmail.com')) {
            setError("@gmail.com was omitted!");
            return;
        }
        setEmail('');
        setError('');
        setIsActiveModal(true);
    }

    const handleClose = () => {
       setIsActiveModal(false);
    }
  return (
    <footer className='footer-section container'>
     <div className='footer-section-main'>   
      <div className='footer-section-info'>
        <h1 className='footer-section-info-logo'>Monux</h1>
        <div className='footer-section-info-list'>
            <NavLink className='footer-section-info-list-item' to="/privacy">Privacy Policy</NavLink>
            <NavLink className='footer-section-info-list-item' to="/terms">Terms and Conditions</NavLink>
            <NavLink className='footer-section-info-list-item' to="/contact">Contact Us</NavLink>
        </div>
      </div>

      <div className='footer-section-contact'>
        <p className='footer-section-contact-title'>Newsletter</p>
        <div className='footer-section-contact-email'>
            <div className='footer-section-contact-email-input'>
            <input type="email" value={email} onChange={handleChange} placeholder='E-mail' />
            <Button text='Subscribe' onClick={handleSubscribe} variant='blue' className='footer-section-contact-email-input-btn' />
            {isActiveModal && (
             <Modal active={isActiveModal} onClick={handleClose} text='Close'>
                <img src={subscribeImg} alt="success" />
                <p>Thanks for subscribing!</p>
             </Modal>
            )}
            </div>
            {error && <p className="footer-section-contact-email-error">{error}</p>}
        </div>
        <div className='footer-section-contact-social-media'>
            <img src={facebookIcon} onClick={() => window.open('https://facebook.com')} alt="facebook-icon" />
            <img src={instagramIcon} onClick={() => window.open('https://instagram.com')} alt="instagram-icon" />
            <img src={youtubeIcon} onClick={() => window.open('https://youtube.com')} alt="youtube-icon" />
            <img src={twitterIcon} onClick={() => window.open('https://twitter.com')} alt="twitter-icon" />
            <img src={linkedinIcon} onClick={() => window.open('https://linkedin.com')} alt="linkedin-icon" />
        </div>
      </div>

      <div className='footer-section-navbar'>
        <NavLink className='footer-section-navbar-link' to="/" end>
            Home
        </NavLink>
        <NavLink className='footer-section-navbar-link' to="/help" end>
            Help
        </NavLink>
        <NavLink className='footer-section-navbar-link' to="/faq">FAQ</NavLink>
        <NavLink className='footer-section-navbar-link' to="/blog">Blog</NavLink>
        <NavLink className='footer-section-navbar-link' to="/subscription">Subscription</NavLink>
      </div>
     </div> 


    
    <div className='footer-section-navbar-responsive'>
        <div className='footer-section-navbar-responsive-link'>
          <NavLink className='footer-section-navbar-link' to="/" end>
          Home
          </NavLink>
          <NavLink className='footer-section-navbar-link' to="/help" end>
            Help
          </NavLink>
        </div>
        <div className='footer-section-navbar-responsive-link'>
          <NavLink className='footer-section-navbar-link' to="/faq">FAQ</NavLink>
          <NavLink className='footer-section-navbar-link' to="/blog">Blog</NavLink>
        </div>
        <NavLink className='footer-section-navbar-link' to="/subscription">Subscription</NavLink>
    </div>


     <div className='footer-section-contact-responsive'>
        <p className='footer-section-contact-title'>Newsletter</p>
        <div className='footer-section-contact-email'>
            <div className='footer-section-contact-email-input'>
            <input type="email" value={email} onChange={handleChange} placeholder='E-mail' />
            <Button text='Subscribe' onClick={handleSubscribe} variant='blue' className='footer-section-contact-email-input-btn' />
            {isActiveModal && (
             <Modal active={isActiveModal} onClick={handleClose} text='Close'>
                <img src={subscribeImg} alt="success" />
                <p>Thanks for subscribing!</p>
             </Modal>
            )}
            </div>
            {error && <p className="footer-section-contact-email-error">{error}</p>}
        </div>
        <div className='footer-section-contact-social-media'>
            <img src={facebookIcon} onClick={() => window.open('https://facebook.com')} alt="facebook-icon" />
            <img src={instagramIcon} onClick={() => window.open('https://instagram.com')} alt="instagram-icon" />
            <img src={youtubeIcon} onClick={() => window.open('https://youtube.com')} alt="youtube-icon" />
            <img src={twitterIcon} onClick={() => window.open('https://twitter.com')} alt="twitter-icon" />
            <img src={linkedinIcon} onClick={() => window.open('https://linkedin.com')} alt="linkedin-icon" />
        </div>
      </div>

     <p className='footer-section-copyright'>© 2025 «Budget» ASC. All Rights Reserved.</p>
    </footer>
  )
}

export default Footer
