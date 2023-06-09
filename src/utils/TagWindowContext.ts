import { createContext, SetStateAction, Dispatch } from 'react';
import { TagArticle } from '../types/articleTypes';

export interface tagWindowContextInterface {
  choosedTag: string | null;
  setChoosedTag: Dispatch<SetStateAction<string | null>>;
  tagId: number | null;
  setTagId: Dispatch<SetStateAction<number | null>>;
  page: "main" | "articleEdit",
  setTags: Dispatch<SetStateAction<TagArticle[] | null>>;
  setTitle: Dispatch<SetStateAction<string>>;
}

export const tagWindowContext = createContext<tagWindowContextInterface>({} as tagWindowContextInterface)