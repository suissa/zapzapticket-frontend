import styles from "../styles/Ticket.module.css"

const TopBar = () => {
  
  return (
    <div className={styles.topBarButtonWrapper}>
      <div className={styles.topBarItem}>
        <button>
          novo
        </button>
      </div>
      <div className={styles.topBarItem}>
        <button>todos
          </button>
      </div>
      <div className={styles.topBarItem}>
        <select name="selectQueues" id="selectQueues">
          <option value="fila1">Fila 1</option>
          <option value="fila2">Fila 2</option>
          <option value="fila3">Fila 3</option>
          <option value="fila4">Fila 4</option>
        </select>
      </div>
    </div>
    )
}

export default TopBar;