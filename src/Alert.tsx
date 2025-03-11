//COMPONENT ALERT
import { ReactNode } from "react"
import style from "./modules_css/Alert.module.css"

//Type
type AlertProps = {
    children: ReactNode
}

function Alert( {children} : AlertProps ) {
  return (
    <div className={style.alert}>{children}</div>
  )
}

export default Alert