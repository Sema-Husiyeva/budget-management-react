import { type FC } from 'react';
import { useNavigate } from 'react-router';
import classNames from 'classnames';
import Button from '../../UI/Button/button';
import googlePlayIcon from '../../../assets/svg/google-play.svg';
import appStoreIcon from '../../../assets/svg/app-store.svg';
import newsImg from '../../../assets/images/news.jpeg';
import './banner.scss';

interface IBanner {
    title: string;
    description: string;
    image: string;
    showButtons?: boolean;
    returnButton?: boolean;
    className?: string;
    variant?: string;
    buttonVariants?: string[];
    buttonIcons?: string[];
}

const Banner: FC<IBanner> = ({ title, description, image, showButtons = true, returnButton = false, className, variant, buttonVariants = ['blue', 'blue'] , buttonIcons = [googlePlayIcon, appStoreIcon]} ) => {
  const navigate = useNavigate();
  return (
    <section className={classNames('banner-section', className, {
            'white': variant === 'white',
        })}>
      <div className="banner-section-content">
        <h1 className={classNames('banner-section-content-title', className, {'font-color': variant === 'white',})}>{title}</h1>
        <p className={classNames('banner-section-content-desc', className, {'font-color': variant === 'white', })}>{description}</p>
        {showButtons && (
          <div className="banner-section-content-buttons">
            <Button text="Google Play" onClick={() => window.open('https://play.google.com/store/search?q=wallet%20budget&c=apps', '_blank')} variant={buttonVariants[0]} icon={buttonIcons[0]}  />
            <Button text="App Store" onClick={() => window.open('https://apps.apple.com/az/app/wallet-budget-money-manager/id1032467659', '_blank')} variant={buttonVariants[0]} icon={buttonIcons[1]}  />
          </div>
        )}
        {returnButton && (
          <div className="banner-section-content-buttons">
            <Button text="Return to home page" onClick={() => navigate('/')} variant='blue'  />
          </div>
        )}
      </div>

      <img className={classNames('banner-section-image', className, {'white': variant === 'white',})} src={image} alt={title} onError={(e) => {const target = e.target as HTMLImageElement;target.onerror = null;target.src = newsImg;}} />
    </section>
  )
}

export default Banner
