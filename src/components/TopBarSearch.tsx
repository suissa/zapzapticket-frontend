import styles from "../styles/Ticket.module.css";
import EntryInputSearch from "./EntryInputSearch";

const TopBarSearch = ({ onKeyDown }) => {
  
  return (
    <div className={styles.topBarButtonWrapper}>
      <div className={styles.topBarButtonItem}>
        <EntryInputSearch text="Pesquisar" onKeyDown={onKeyDown} />
      </div>
    </div>
    )
}

export default TopBarSearch;