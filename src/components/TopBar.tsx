import styles from "../styles/Ticket.module.css"
import { IconResolved, IconInbox, IconSearch } from "./Icons"

const TopBar = () => {
  
  return (
    <div className={styles.topBar}>
      <div className={styles.topBarItem}>
        <button>
          <p className={`${styles.topBarIcon}`}>
            <IconInbox className="text-purple-600" />
          </p>
          <p>
            Caixa de Entrada
          </p>
          </button>
      </div>
      <div className={styles.topBarItem}>
        <button>
          <p className={`${styles.topBarIcon}`}>
            <IconResolved className="text-purple-600" />
          </p>
          <p>
            Resolvidos
          </p>
          </button>
      </div>
      <div className={styles.topBarItem}>
        <button>
          <p className={`${styles.topBarIcon}`}>
            <IconSearch className="text-purple-600" />
          </p>
          <p>
            Pesquisar
          </p>
          </button>
      </div>
    </div>
    )
}

export default TopBar;