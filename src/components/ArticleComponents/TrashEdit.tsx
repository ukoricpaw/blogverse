import { FC, SetStateAction, Dispatch } from 'react'
import styles from "../../styles/Main.module.scss"
import editIcon from "../../assets/icons/editIcon.png";
import trashIcon from "../../assets/icons/trash.png";
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHooks';



interface TrashEditIProps {
  setModalActive: Dispatch<SetStateAction<boolean>>;
  setTypeModal: Dispatch<SetStateAction<"delete" | "edit">>;
  id: number;
}


const TrashEdit: FC<TrashEditIProps> = ({ setModalActive, setTypeModal, id }) => {

  const navigate = useNavigate();
  const { data } = useAppSelector(state => state.UserReducer);

  const deleteHandler = () => {
    const html = document.querySelector('html');
    if (html !== null) {
      html.style.overflowY = "hidden"
    }
    setModalActive(true);
    setTypeModal("delete");
  }
  const editHandler = () => {
    navigate(`/user/${data.id}/edit/${id}`)
  }


  return (
    <div className={styles.trashEditContainer}>
      <div className={styles.trashContainer}>
        <img onClick={deleteHandler} className={styles.trashContainer__trashIcon} src={trashIcon} />
        <p>Удалить</p>
      </div>
      <div className={styles.editContainer}>
        <img onClick={editHandler} className={styles.editContainer__editIcon} src={editIcon} />
        <p>Редактировать</p>
      </div>
    </div>
  )
}

export default TrashEdit