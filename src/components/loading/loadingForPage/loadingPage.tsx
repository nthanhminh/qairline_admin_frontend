'use client'
import Player from 'lottie-react';
import styles from './styles.module.css';
import animationData from '../../../../public/images/loading/loading.json';
const LottieAnimation = () => {
  return (
    <div className={styles.container}>
      <Player
        autoplay
        loop
        animationData={animationData}
        style={{ height: '400', width: '400px' }}
      />
    </div>
  );
};

export default LottieAnimation;
