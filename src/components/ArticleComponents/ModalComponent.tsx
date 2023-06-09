import { FC, useState } from 'react'
import TrashEdit from './TrashEdit';
import ModalEditTrash from './ModalEditTrash';

const ModalComponent: FC<{ title: string; id: number }> = ({ title, id }) => {
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [typeModal, setTypeModal] = useState<"delete" | "edit">("edit");
  return (
    <>
      <TrashEdit id={id} setModalActive={setModalActive} setTypeModal={setTypeModal} />
      {modalActive && <ModalEditTrash id={id} setModalActive={setModalActive} typeModal={typeModal} title={title} />}
    </>
  )
}
export default ModalComponent