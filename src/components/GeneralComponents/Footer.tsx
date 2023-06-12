import { FC } from 'react'
import tgIcon from "../../assets/icons/tgIcon.png"

const Footer: FC = () => {
  return (
    <footer><div className="footerWrapper">
      <p className="footerInnerText"> &copy; 2023 Все права защищены, Blog-Verse</p>
      <a target='blank' href='https://t.me/temyy44'><img className="footerIcon" src={tgIcon} /></a>
    </div>
    </footer>
  )
}

export default Footer