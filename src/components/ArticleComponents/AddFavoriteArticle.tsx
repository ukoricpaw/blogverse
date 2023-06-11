import { FC, useState } from 'react'
import { addOrDeleteFavoriteArticle } from '../../axios/http/addOrDeleteFavoriteArticle'
import favoriteIcon from "../../assets/icons/favoriteIcon.png"
import favoriteIconActive from "../../assets/icons/favoriteIconActive.png"
import { FavoriteArticle } from '../../types/articleTypes'
import styles from "../../styles/SingleArticle.module.scss"

interface AddFavoriteArticleProps {
  articleId: number,
  favoriteArticle: FavoriteArticle[]
}

const AddFavoriteArticle: FC<AddFavoriteArticleProps> = ({ articleId, favoriteArticle }) => {

  const favoriteArticleCondition = favoriteArticle.length > 0 ? true : false;

  const [favorite, setFavorite] = useState<boolean>(favoriteArticleCondition);
  const [disabled, setDisabled] = useState<boolean>(false);

  const deleteFavorite = async () => {
    if (!disabled) {
      setDisabled(true);
      setFavorite(false);
      await addOrDeleteFavoriteArticle(articleId, "delete")
      setTimeout(() => {
        setDisabled(false);
      }, 1000)
    }
  };

  const addFavorite = async () => {
    if (!disabled) {
      setDisabled(true);
      setFavorite(true);
      await addOrDeleteFavoriteArticle(articleId, "add")
      setTimeout(() => {
        setDisabled(false);
      }, 1000)
    }
  };
  return (
    favorite ?
      <img onClick={deleteFavorite} title={"Удалить из избранных"} className={styles.favIconActive} src={favoriteIconActive} />
      : <img onClick={addFavorite} title={"Добавить в избранное"} className={styles.favIcon} src={favoriteIcon} />
  )
}

export default AddFavoriteArticle