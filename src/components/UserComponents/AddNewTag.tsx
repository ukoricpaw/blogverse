import { FC, useState, useEffect } from 'react'
import styles from "../../styles/User.module.scss"
import { addNewTag } from '../../axios/http/addNewTag';

const AddNewTag: FC = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const [tag, setTag] = useState<string>("");
  const [disabledBtn, setDisabledBtn] = useState<boolean>(true);
  const [res, setRes] = useState<string | null>(null);


  const handleClick = async () => {
    setLoading(true);
    await addNewTag(tag)
      .then(val => {
        setLoading(false);
        if (typeof val === "string") {
          setRes(val);
          return;
        }
        setRes("Тэг был добавлен")
      })
  }

  useEffect(() => {
    if (tag.trim() !== "") {
      setDisabledBtn(false);
      return;
    }
    setDisabledBtn(true);
  }, [tag])

  return (
    <div className={styles.addTagForm}>
      <label className={styles.tagLabel} htmlFor='tag'>Добавить тэг</label>
      <input id='tag' placeholder='Введите тэг' className={styles.tagInput} value={tag} onChange={(e) => setTag(e.target.value)} />
      {loading ? <p>Подождите пожалуйста...</p> : <button onClick={handleClick} disabled={disabledBtn} className={styles.addTagButton}>Добавить</button>}
      {res && <p>{res}</p>}
    </div>
  )
}

export default AddNewTag