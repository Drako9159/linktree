import { Link } from "react-router-dom";
import styles from "./DashboardWrapper.module.css";

export default function DashboardWrapper({ children }) {
  return (
    <div>
      <nav className={styles.nav}>
        <div className={styles.logo}>Logotipo</div>
        <Link to="/dashboard"></Link>
        <Link to="/dashboard/profile">Profile</Link>
        <Link to="/signout">Signout</Link>
      </nav>
      <div className="main-container">{children}</div>
    </div>
  );
}
