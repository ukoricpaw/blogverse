import { FC, useEffect, useState, MouseEvent } from 'react'
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from 'draft-js';
import styles from "../styles/Article.module.scss"
import SearchTag from '../components/TagListComponents/SearchTag';
import ArticlePreview from '../components/ArticleComponents/ArticlePreview';
import { addNewArticle } from '../axios/http/addNewArticle';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ArticleTitle from '../components/ArticleComponents/ArticleTitle';
import { NewArticleBody } from '../types/articleTypes';
import { useAppSelector } from '../hooks/reduxHooks';


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
    await addNewArticle(body);
    navigate("/")
  }

  useEffect(() => {
    if (Number(id) !== data.id) {
      navigate(`/user/${id}`)
    }
  }, [])


  useEffect(() => {

    const editor = convertToRaw(editorState.getCurrentContent())
    const editorLength = editor.blocks.filter(arr => arr.text.trim() !== "");
    if (titleState.length > 15 && titleState.length < 70 && tagId && editorLength.length > 5) {
      setDisabled(false);
    }
    else {
      setDisabled(true);
    }
  }, [titleState, tagId, editorState])

  return (
    <form>
      <ArticleTitle articleTitle={titleState} setArticleTitle={setTitleState} />
      <SearchTag articleTag={tagId} setArticleTag={setTagId} />
      <ArticlePreview setArticlePreview={setFile} />
      <p className={styles.articleTitleLabel}>Ваша статья</p>
      <Editor
        editorStyle={{ width: "100%", background: "white", minHeight: "300px", padding: "10px 30px" }}
        editorState={editorState} onEditorStateChange={setEditorState}
        toolbarClassName='toolbarClassName'
        wrapperClassName='wrapperClassName'
        editorClassName='editorClassName' />
      <div className={styles.buttonContainer}>
        <button disabled={disabledState} onClick={handleClickButton} className={styles.addArticleButton}>Опубликовать</button>
      </div>
    </form>
  )
}

export default AddNewArticle