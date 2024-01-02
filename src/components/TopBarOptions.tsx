import styles from "../styles/Ticket.module.css"

const TopBar = () => {
  
  return (
    <div className={styles.topBarOptionWrapper}>
      <div className={`${styles.topBarOptionText} position-relative`}>
        <span className={styles.topBarOptionText}>Atendendo</span>
        <span class={`${styles.badgeNotification} absolute inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full`}>5</span>

      </div>
      <div className={styles.topBarOptionText}>
        <button className={styles.topBarButton}>Em fila</button>
      </div>
    </div>
    )
}

export default TopBar;