import { FC } from 'react'
import { addOrDeleteFavoriteArticle } from '../../axios/http/addOrDeleteFavoriteArticle'
import favoriteIcon from "../../assets/icons/favoriteIcon.png"
import favoriteIconActive from "../../assets/icons/favoriteIconActive.png"
import { FavoriteArticle } from '../../types/articleTypes'
import styles from "../../styles/SingleArticle.module.scss"
import { useAppDispatch } from '../../hooks/reduxHooks'
import { fetchSingleArticleThunk } from '../../store/action-creators/fetchSingleArticleThunk'

interface AddFavoriteArticleProps {
  articleId: number,
  favoriteArticle: FavoriteArticle[]
}

const AddFavoriteArticle: FC<AddFavoriteArticleProps> = ({ articleId, favoriteArticle }) => {

  const dispatch = useAppDispatch();
  const deleteFavorite = async () => {
    await addOrDeleteFavoriteArticle(articleId, "delete")
    dispatch(fetchSingleArticleThunk(articleId, true));
  };

  const addFavorite = async () => {
    await addOrDeleteFavoriteArticle(articleId, "add")
    dispatch(fetchSingleArticleThunk(articleId, true));
  };
  return (
    favoriteArticle.length > 0 ?
      <img onClick={deleteFavorite} title={"Удалить из избранных"} className={styles.favIconActive} src={favoriteIconActive} />
      : <img onClick={addFavorite} title={"Добавить в избранное"} className={styles.favIcon} src={favoriteIcon} />
  )
}

export default AddFavoriteArticle