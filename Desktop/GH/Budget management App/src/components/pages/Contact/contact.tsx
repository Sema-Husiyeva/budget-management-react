import { useState } from 'react';
import Button from '../../UI/Button/button';
import Modal from '../../UI/Modal/modal';
import success from '../../../assets/svg/success.svg';
import './contact.scss';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [isActiveModal, setIsActiveModal] = useState(false);

  const validateForm = () => {
    const newErrors = { name: '', email: '', message: '' };
    let valid = true;

    if (!name) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    if (!email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^\S+@gmail\.com$/.test(email)) {
      newErrors.email = 'Only Gmail addresses are accepted';
      valid = false;
    }

    if (!message) {
      newErrors.message = 'Message cannot be empty';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsActiveModal(true);
    }
    setName('');
    setEmail('');
    setMessage('');
  };

  const handleCancel = () => {
   setIsActiveModal(false);
  }
  return (
   <div className="contact-us">
    <h1>Contact Us</h1>
    <p className="subtitle">Have questions or feedback? We’d love to hear from you.</p>

    <div className="contact-content">
      <div className="contact-info">
        <h2>Get in Touch</h2>
        <p>Email us anytime at <a href="mailto:support@monux.com">support@monux.com</a></p>
        <div className="social-media">
          <a href="https://facebook.com" target="_blank">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com" target="_blank">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://instagram.com" target="_blank">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://linkedin.com/company" target="_blank">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
        {errors.name && <span className="form-error">{errors.name}</span>}
        <input type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        {errors.email && <span className="form-error">{errors.email}</span>}
        <textarea placeholder="Your Message" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
        {errors.message && <span className="form-error">{errors.message}</span>}
        <Button text='Send' variant='blue' type='submit'/>
      </form>
      {isActiveModal && (
        <Modal active={isActiveModal} onClick={handleCancel} text='Close' >
            <img src={success} alt="success" />
            <p>Your message has been sent!</p>
        </Modal>
      )}
    </div>
   </div>
  )
}

export default Contact
