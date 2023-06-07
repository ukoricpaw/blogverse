import { createContext } from 'react'
import { ArticlesContentProps } from '../components/ArticleComponents/ArticlesContent';
import { ArticleType } from '../types/articleTypes';

export interface ArticleContext extends ArticlesContentProps {
  PopularNow: ArticleType | null;
}

export const TypeArticleContext = createContext<ArticleContext>({} as ArticleContext);
