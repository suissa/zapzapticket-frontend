import styles from "../styles/Ticket.module.css"

const TopBar = () => {
  
  return (
    <div className={styles.topBarOptionWrapper}>
      <div className={`${styles.topBarOptionText} position-relative`}>
        <span className={`${styles.topBarOptionText} text-purple`}>ATENDENDO</span>
        <span className={`${styles.badgeNotification} text-purple} absolute inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full`}>5</span>

      </div>
      <div className={styles.topBarOptionText}>
        <button className={`${styles.topBarButton} text-purple`}>EM FILA</button>
      </div>
    </div>
    )
}

export default TopBar;