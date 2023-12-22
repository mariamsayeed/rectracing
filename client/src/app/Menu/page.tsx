'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencil, faEraser, faRotateLeft, faFileArrowDown } from "@fortawesome/free-solid-svg-icons"
import styles from './index.module.css'

export default function Home() {
  return (
    <div className={styles.menuContainer}>
      <div className={styles.iconWrapper}>
        <FontAwesomeIcon icon={faPencil} className={styles.icon} />
      </div>
      <div className={styles.iconWrapper}>
        <FontAwesomeIcon icon={faEraser} className={styles.icon}/>
      </div>
      <div className={styles.iconWrapper}>
        <FontAwesomeIcon icon={faRotateLeft} className={styles.icon}/>
      </div>
      <div className={styles.iconWrapper}>
        <FontAwesomeIcon icon={faFileArrowDown} className={styles.icon}/>
      </div>
    </div>
    
    
  )
}

