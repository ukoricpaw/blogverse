import { FC, useEffect, useState, MouseEvent, useRef } from 'react'
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from 'draft-js';
import styles from "../styles/Article.module.scss"
import ArticlePreview from '../components/ArticleComponents/ArticlePreview';
import { addNewArticle } from '../axios/http/addNewArticle';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ArticleTitle from '../components/ArticleComponents/ArticleTitle';
import { NewArticleBody } from '../types/articleTypes';
import { useAppSelector } from '../hooks/reduxHooks';
import SearchTagWindow from '../components/TagListComponents/SearchTagWindow';


const AddNewArticle: FC = () => {


  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useAppSelector(state => state.UserReducer);

  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  const [titleState, setTitleState] = useState<string>("");
  const [tagId, setTagId] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [disabledState, setDisabled] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false);
  const ref = useRef<HTMLFormElement>(null)

  const handleClickButton = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const article = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
    const body: NewArticleBody = {
      "description": article,
      "title": titleState,
      "tag_id": tagId,
    }
    if (file) {
      body["preview"] = file;
    }
    setLoading(true);
    await addNewArticle(body);
    setLoading(false);
    navigate("/")
  }

  useEffect(() => {
    ref.current?.scrollIntoView({
      behavior: "smooth"
    })
    if (Number(id) !== data.id) {
      navigate(`/user/${id}`)
    }

  }, [])



  useEffect(() => {

    const editor = convertToRaw(editorState.getCurrentContent())
    const editorLength = editor.blocks.filter(arr => arr.text.trim() !== "");
    if (titleState.length > 15 && titleState.length < 70 && tagId !== "null" && editorLength.length > 5) {
      setDisabled(false);
    }
    else {
      setDisabled(true);
    }
  }, [titleState, tagId, editorState])

  return (
    <form ref={ref}>
      <div className={styles.addArticleInfo}>
        <ArticleTitle articleTitle={titleState} setArticleTitle={setTitleState} />
        <SearchTagWindow page={"articleEdit"} setTag={setTagId} />
        <ArticlePreview setArticlePreview={setFile} />
      </div>
      <p className={styles.articleTitleLabel}>Ваша статья</p>
      <Editor
        editorStyle={{ width: "100%", background: "white", minHeight: "600px", padding: "10px 30px" }}
        editorState={editorState} onEditorStateChange={setEditorState}
        toolbarClassName='toolbarClassName'
        wrapperClassName='wrapperClassName'
        editorClassName='editorClassName' />
      {loading ? <h2 style={{ margin: "30px 0", textAlign: "center" }}>Пожалуйста подождите...</h2> : <div className={styles.buttonContainer}>
        <button disabled={disabledState} onClick={handleClickButton} className={styles.addArticleButton}>Опубликовать</button>
      </div>}
    </form>
  )
}

export default AddNewArticle