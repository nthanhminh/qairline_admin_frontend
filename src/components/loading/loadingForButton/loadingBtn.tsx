import styles from './styles.module.css';

export const LoadingBtn = () => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
    </div>
  );
};
