import { FC, Dispatch, SetStateAction, useState } from 'react'
import styles from "../../styles/Main.module.scss"
import { deleteArticle } from '../../axios/http/deleteArticle';
import { useNavigate } from 'react-router-dom';

interface ModalEditTrashIProps {
  setModalActive: Dispatch<SetStateAction<boolean>>;
  typeModal: "delete" | "edit";
  title: string;
  id: number;
}

const ModalEditTrash: FC<ModalEditTrashIProps> = ({ typeModal, setModalActive, title, id }) => {

  const [response, setResponse] = useState<string | null>(null)
  const [loadingModal, setLoadingModal] = useState<boolean>(false);
  const navigate = useNavigate();


  const handlerModalFalse = () => {
    const body = document.querySelector('body');
    if (body !== null) {
      body.style.overflowY = "scroll"
    }
    setModalActive(false);
    if (response) {
      navigate("/")
    }
  }

  const handlerDeleteArticle = async () => {
    setLoadingModal(true);
    await deleteArticle(id).then(val => setResponse(val))
    setLoadingModal(false);
  }


  return (
    <div className={styles.modalTrashEditContainer} onClick={handlerModalFalse}>
      {loadingModal ? <div className={styles.modalWindow}>Подождите пожалуйста...</div> :
        <div className={styles.modalWindow} onClick={(e) => e.stopPropagation()}>
          {!response ? typeModal === "delete" ? <>
            <h2>Удалить статью?</h2>
            <p className={styles.modalTitle}>{title}</p>
            <div className={styles.deleteContainer}>
              <p onClick={handlerDeleteArticle} className={styles.deleteContainer__delete}>Удалить</p>
              <p onClick={handlerModalFalse} className={styles.deleteContainer__cancel}>Отмена</p>
            </div>
          </> : <></> : <h2>{response}</h2>}
        </div>}
    </div>
  )
}

export default ModalEditTrash