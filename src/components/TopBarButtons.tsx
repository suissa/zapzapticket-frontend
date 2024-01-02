import styles from "../styles/Ticket.module.css"
import ToggleSwitch from "./ToggleSwitch"
import MenuDropdown from "./MenuDropdown"
const TopBar = () => {
  
  return (
    <div className={styles.topBarButtonWrapper}>
      <div className={styles.topBarButtonItem}>
        <button className="btn-border py-2 px-4 rounded text-purple hover:bg-purple-200">
          NOVO
        </button>
      </div>
      <div className={`${styles.topBarButtonItem} text-purple`}>
        TODOS
        <ToggleSwitch on={false} />
      </div>
      <div className={styles.topBarButtonItem}>
        <MenuDropdown />
      </div>
    </div>
    )
}

export default TopBar;