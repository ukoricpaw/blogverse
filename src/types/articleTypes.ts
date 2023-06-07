import { UserStateData } from "./userTypes";

export interface NewArticleBody {
  title: string;
  description: string;
  tag_id: string;
  preview?: File;
}


export interface ArticleInitialState {
  loadHtml: boolean;
  isError: string | null;
  data: ArticlesInterface<ArticleInterface> | ArticlesInterface<FavoriteArticle>;
  currentArticle: SingleArticleInterface;
  currentPage: number;
  headerArticles: ArticlesInterface<ArticleInterface>,
  isArticlesError: null | string,
  isLoadingArticles: boolean,
  currentTitleState: string,
  tags: TagArticle[];
}

interface TimingInterface {
  createdAt: string,
  updatedAt: string
}

export interface ArticlesInterface<T> {
  count: number,
  rows: T[];
  tagName?: string | null;
}

export interface ArticleInterface extends TimingInterface {
  id: number,
  title: string,
  views: number,
  likes: number,
  dislikes: number,
  userId: number,
  tagId: number,
  article_imgs: ArticleImage[],
  tag: TagArticle,
  user: UserStateData,
}

export type ArticleType = "popular" | "now" | "popularnow"

export interface SingleArticleInterface extends ArticleInterface {
  description: string,
  user_article_likes?: UserCommentLikes[];
  article_favorite?: FavoriteArticle[];
}

export interface FavoriteArticle {
  id: number;
  articleId: number;
  userId: number;
  article: ArticleInterface;
}

interface ArticlesType {
  data: ArticlesInterface<ArticleInterface>;
  favArticles: false;
}

interface ArticlesFavoriteType {
  data: ArticlesInterface<FavoriteArticle>;
  favArticles: true;
}

export type FavArticleType = ArticlesType | ArticlesFavoriteType;

export interface ArticleImage extends TimingInterface {
  id: number,
  imgName: string,
}

export interface TagArticle extends TimingInterface {
  id: number,
  name: string
}



// comments

export interface InitialStateComments {
  isLoading: boolean,
  isError: string | null,
  comments: CommentsListInterface,
  currentPage: number,
}

export interface CommentsListInterface {
  count: number;
  rows: CommentInterface[];
}

export interface CommentInterface extends TimingInterface {
  articleId: number,
  id: number,
  userId: number,
  description: string,
  user: UserStateData,
  user_comment_likes?: UserCommentLikes[];
  dislikes: number;
  likes: number;
  views: number;
}

export interface UserArticleLikes {
  id: number,
  isLike: boolean,
  userId: number,
  articleId: number,
}

export interface UserCommentLikes {
  id: number,
  isLike: boolean,
  userId: number,
  commentId: number,
}

export interface CommentBody {
  id: number;
  description: string;
}


// 
export interface SingleArticleInfo {
  tag: TagArticle,
  title: string,
  article_imgs: ArticleImage[],
}

export interface SingleInfoProps {
  info: {
    tag: TagArticle,
    article_imgs: ArticleImage[],
    title: string,
  },
  html: string;
}