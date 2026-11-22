import { Link, useNavigate } from "react-router";
import styles from "./NotFound.module.css";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <section className={styles.notFound}>
      <h1 className={styles.code}>404</h1>
      <p className={styles.title}>페이지를 찾을 수 없어요</p>
      <p className={styles.desc}>
        요청하신 페이지가 존재하지 않거나 이동되었을 수 있어요.
      </p>
      <div className={styles.actions}>
        <button className={styles.btn} onClick={() => navigate(-1)}>
          이전 페이지
        </button>
        <Link to="/" className={`${styles.btn} ${styles.primary}`}>
          홈으로 가기
        </Link>
      </div>
    </section>
  );
}
