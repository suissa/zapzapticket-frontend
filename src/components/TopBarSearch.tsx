import styles from "../styles/Ticket.module.css";
import EntryInputSearch from "./EntryInputSearch";

const TopBar = () => {
  
  return (
    <div className={styles.topBarButtonWrapper}>
      <div className={styles.topBarButtonItem}>
        <EntryInputSearch text="Pesquisar" />
      </div>
    </div>
    )
}

export default TopBar;