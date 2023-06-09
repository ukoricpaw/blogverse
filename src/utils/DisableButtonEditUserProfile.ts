import { Dispatch, SetStateAction } from "react"

export const disableButtonForEditing = (setDisabledButton: Dispatch<SetStateAction<boolean>>,
  image: File | null, username: string, dataUsername: string, deleteImg: boolean) => {
  if (deleteImg) {
    if (username.trim() === "") {
      setDisabledButton(true);
      return;
    }
    setDisabledButton(false);
  }
  else if (!image) {
    if (username.trim() === "" || username === dataUsername) {
      setDisabledButton(true);
      return;
    }
    setDisabledButton(false);
  }
  else {
    if (username.trim() === "") {
      setDisabledButton(true);
      return;
    }
    setDisabledButton(false);
  }
}