import styles from "./PublicLink.module.css";

export default function PublicLink({ url, title }) {
  return (
    <a className={styles.publicLinkContainer} href={url}>
      <div>{title}</div>
    </a>
  );
}
