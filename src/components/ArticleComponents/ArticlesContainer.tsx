import { FC, Dispatch, SetStateAction, useMemo } from 'react';
import mainStyles from "../../styles/Main.module.scss";
import PopularNew from './PopularNew';
import SearchArticle from './SearchArticle';
import ArticlesList from './ArticlesList';
import Pagination from '../PaginationComponents/Pagination';
import { ArticleInterface, ArticleType, FavArticleType } from '../../types/articleTypes';
import { ArticlesInterface } from '../../types/articleTypes';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

interface ArticlesContainerProps<T extends string> {
  typeArticle: ArticleType | null;
  setType: Dispatch<SetStateAction<ArticleType | null>>;
  loading: boolean;
  isArticlesError: null | string;
  currentPage: number;
  data: ArticlesInterface<ArticleInterface>;
  setCurrentPage: ActionCreatorWithPayload<number, T>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
}


const ArticlesContainer: FC<ArticlesContainerProps<string>> = ({
  typeArticle, setType, setCurrentPage,
  loading, isArticlesError,
  data, setLoading, title, setTitle,
  currentPage
}) => {

  const getData = useMemo(() => {
    return {
      data: data,
      favArticles: false
    } as FavArticleType
  }, [data])


  return (
    <div className={mainStyles.articlesContainer}>
      {!isArticlesError && <>
        {data.tagName && <h2 style={{ margin: "30px 0 0 0" }}>#{data.tagName}</h2>}
        <PopularNew typeArticle={typeArticle} setType={setType} />
        <SearchArticle setLoading={setLoading} title={title} setTitle={setTitle} />
      </>}

      {loading ? <div>Loading...</div>
        : isArticlesError ? <div style={{ margin: "30px 0" }}>{isArticlesError}</div>
          : data.rows.length > 0 ? <ArticlesList notConfirmed={false} articles={
            getData
          } /> : "Статей по запросу не найдено"
      }
      {!isArticlesError && <Pagination currentPage={currentPage} count={Math.ceil(data.count / 6)} setCurrentPage={setCurrentPage} />}
    </div>
  )
}

export default ArticlesContainer