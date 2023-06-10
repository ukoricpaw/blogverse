import { FC } from 'react'
import NotConfirmedArticles from '../components/UserComponents/NotConfirmedArticles'
import styles from "../styles/User.module.scss"
import AddNewTag from '../components/UserComponents/AddNewTag'

const AdminPage: FC = () => {
  return (
    <div className={styles.adminPageContainer}>
      <NotConfirmedArticles />
      <div className={styles.tagsContainer}>
        <AddNewTag />
      </div>
    </div>
  )
}

export default AdminPage