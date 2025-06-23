import { useState } from 'react';
import faqData from './faqData';
import type { IFAQItem } from './faqData';
import Banner from '../../common/Banner/banner';
import bannerImg from '../../../assets/images/faq.png';
import './faq.scss';

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleItemClick = (index: number) => {
  setActiveIndex((activeIndex === index ? null : index));
  };
  return (
    <section>
      <Banner title='FAQ' description="Got questions? We've got answers. Explore our most common topics to find quick and clear solutions." image={bannerImg}/>

      <div className='faq-section'>
        <h1 className='faq-section-title'>Questions and answers</h1>
        <p className='faq-section-text'>You can find answers to frequently asked questions here.</p>

        {faqData.map((item:IFAQItem, index: number) => (
          <div key={index} className='faq-section-item' onClick={() => handleItemClick(index)}>
            <div className='faq-section-item-question'>
             <h3>{item.question}</h3>
             <span>{activeIndex === index ? "−" : "+"}</span>
            </div>
            <div className={`faq-section-item-answer ${activeIndex === index ? 'faq-section-item-answer-open' : ''}`}>
             <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Faq
