import styles from "./page.module.css";
import List from "./list";

export default function Home() {
  return (
    <main className={styles.main}>
      <List />
    </main>
  );
}
