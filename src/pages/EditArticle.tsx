import { FC, useEffect, useState, MouseEvent } from 'react'
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import styles from "../styles/Article.module.scss"
import ArticlePreview from '../components/ArticleComponents/ArticlePreview';
import { setLoading as setLoadingArticle } from '../store/reducers/articleSlice';
import { useNavigate } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ArticleTitle from '../components/ArticleComponents/ArticleTitle';
import { NewArticleBody } from '../types/articleTypes';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import SearchTagWindow from '../components/TagListComponents/SearchTagWindow';
import { useLocation } from 'react-router-dom';
import { fetchSingleArticleThunk } from '../store/action-creators/fetchSingleArticleThunk';
import { updateArticle } from '../axios/http/updateArticle';


const AddNewArticle: FC = () => {


  const location = useLocation();
  const path = location.pathname.split("/")
  const navigate = useNavigate();
  const { data } = useAppSelector(state => state.UserReducer);
  const { currentArticle, isArticlesError } = useAppSelector(state => state.ArticleReducer)
  const dispatch = useAppDispatch();


  const [editorState, setEditorState] = useState<EditorState>();
  const [titleState, setTitleState] = useState<string>("");
  const [tagId, setTagId] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [disabledState, setDisabled] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(true);
  const [deletedPreview, setDeletedPreview] = useState<boolean>(false);

  const handleClickButton = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (editorState) {
      const article = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
      const body: NewArticleBody = {
        "description": article,
        "title": titleState,
        "tag_id": tagId,
      }
      if (deletedPreview) {
        body["delete_img"] = true;
      }
      if (file) {
        body["preview"] = file;
      }
      await updateArticle(Number(path[4]), body);
      navigate("/")
    }
  }

  useEffect(() => {
    if (Number(path[2]) !== data.id) {
      navigate(`/user/${path[2]}`)
      return;
    }
    (async () => {
      setLoading(true);
      await dispatch(fetchSingleArticleThunk(Number(path[4]), true)).then(val => {
        if (val) {
          if (val.user.id !== Number(path[2]) && data.role !== "ADMIN") {
            navigate("/");
            return;
          }
          setTitleState(val.title);
          setTagId(val.tagId.toString());
          const editorContent = convertFromRaw(JSON.parse(val.description));
          setEditorState(() => EditorState.createWithContent(editorContent));
        }
      })
      setLoading(false)
    })()
    return () => {
      dispatch(setLoadingArticle(true))
    }
  }, [])


  useEffect(() => {
    if (editorState) {
      const editor = convertToRaw(editorState.getCurrentContent())
      const editorLength = editor.blocks.filter(arr => arr.text.trim() !== "");
      if (titleState.length > 15 && titleState.length < 70 && tagId !== "null" && editorLength.length > 5) {
        setDisabled(false);
      }
      else {
        setDisabled(true);
      }
    }
  }, [titleState, tagId, editorState])


  if (loading) {
    return <div>Loading...</div>
  }
  if (isArticlesError) {
    return <div>{isArticlesError}</div>
  }




  return (
    <form>
      <h1 className={styles.editArticleTitle}>Редактирование статьи</h1>
      <div className={styles.addArticleInfo}>
        <ArticleTitle articleTitle={titleState} setArticleTitle={setTitleState} />
        <SearchTagWindow tag={currentArticle.tagId} choosed={currentArticle.tag.name} page={"articleEdit"} setTag={setTagId} />
        <ArticlePreview setDeletedPreview={setDeletedPreview} deletedPreview={deletedPreview} file={file}
          articleImage={currentArticle.article_imgs} setArticlePreview={setFile} />
      </div>
      <p className={styles.articleTitleLabel}>Ваша статья</p>
      <Editor
        editorStyle={{ width: "100%", background: "white", minHeight: "300px", padding: "10px 30px" }}
        editorState={editorState} onEditorStateChange={setEditorState}
        toolbarClassName='toolbarClassName'
        wrapperClassName='wrapperClassName'
        editorClassName='editorClassName' />
      <div className={styles.buttonContainer}>
        <button disabled={disabledState} onClick={handleClickButton} className={styles.addArticleButton}>Сохранить</button>
        <button onClick={() => navigate("/")} className={styles.addArticleButton}>Отмена</button>
      </div>
    </form>
  )
}

export default AddNewArticle