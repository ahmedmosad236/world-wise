import Map from "../componants/Map";
import Sidebar from "../componants/Sidebar";
import User from "../componants/User";
import styles from "./AppLayout.module.css";
function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}

export default AppLayout;
