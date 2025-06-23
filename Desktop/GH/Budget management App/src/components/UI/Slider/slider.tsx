import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import classNames from 'classnames';
import 'swiper/css';
import 'swiper/css/navigation';
import './slider.scss';


interface ISliderProps {
  items: { id:number; icon: string; title?: string; subtitle?: string; text: string; avatar?:string; name?: string}[];
  title?: string;
  stars?: string;
  className?: string;
  variant1?: string;
  variant2?: string;
  navigationId?: string;
}

const Slider: React.FC<ISliderProps> = ({ items, title, variant1, variant2, className, navigationId }) => {
  const prevClass = `.swiper-button-prev.${navigationId}`;
  const nextClass = `.swiper-button-next.${navigationId}`;

  return (
    <section className="slider-section">
      <div className="slider-section-header">
        <h2>{title}</h2>

        <div className={`slider-section-header-buttons ${navigationId}`}>
          <button className={`swiper-button-prev ${navigationId} filled`}></button>
          <button className={`swiper-button-next ${navigationId} filled`}></button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: nextClass,
          prevEl: prevClass,
        }}
        slidesPerView={3}
        breakpoints={{
        0: {
          slidesPerView: 1.5,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
  }}
        spaceBetween={30}
        className={className}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <div className={classNames('slider-section-card', className, {
                        'slider-section-card-blue-bg': variant1 === 'blue',
                        'slider-section-card-none-bg': variant1 === 'none',
                        'slider-section-card-white-bg': variant1 === 'white',
                  })}>
              <img className={classNames('slider-section-card-img', className, {
                'slider-section-card-img-star': variant2 === 'star',
              })} src={item.icon} alt="icon" />
              {item.title && <h3>{item.title}</h3>}
              <p className="text">{item.text}</p>

              <div className='slider-section-card-user'>
                {item.avatar && <img src={item.avatar} alt="avatar" />}
                {item.name && <h3>{item.name}</h3>}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={`slider-section-header-buttons-responsive ${navigationId}`}>
          <button className={`swiper-button-prev ${navigationId} filled`}></button>
          <button className={`swiper-button-next ${navigationId} filled`}></button>
      </div>
    </section>
  );
};

export default Slider;