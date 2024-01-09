import styles from "../styles/Ticket.module.css"
import { IconResolved, IconInbox, IconSearch } from "./Icons"

const TopBar = () => {
  
  return (
    <div className={styles.topBar}>
      <div className={styles.topBarItem}>
        <button>
          <p className={`${styles.topBarIcon}`}>
            <IconResolved className="text-purple-600" />
          </p>
          <p className={`${styles.topBarText} text-purple`}>
            RESOLVIDOS
          </p>
        </button>
      </div>
      <div className={styles.topBarItem}>
        <button>
          <p className={`${styles.topBarIcon}`}>
            <IconInbox className="text-purple-600" />
          </p>
          <p className={`${styles.topBarText} text-purple`}>
            ENTRADA
          </p>
          </button>
      </div>
      {/* <div className={styles.topBarItem}>
        <button>
          <p className={`${styles.topBarIcon}`}>
            <IconSearch className="text-purple-600" />
          </p>
          <p className={`${styles.topBarText} text-purple`}>
            PESQUISAR
          </p>
          </button>
      </div> */}
    </div>
    )
}

export default TopBar;