import classNames from "classnames";
import Button from "../Button/button";
import './modal.scss';


type TModal = {
    active: boolean;
    onClick: () => void;
    text: string;
    children: React.ReactNode;
}

const Modal:React.FC<TModal> = ({active, onClick, text, children}) => {
  return (
    <div className={classNames('modal', {'modal-active': active})}>
      {children}
      <Button text={text} onClick={onClick}  isActive={false} variant='blue'/>
    </div>
  )
}

export default Modal