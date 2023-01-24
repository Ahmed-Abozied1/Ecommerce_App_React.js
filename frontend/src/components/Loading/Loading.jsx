import React from 'react'
import { Circles } from "react-loader-spinner";
import styles from "./Loading.module.css"
function Loading() {
  return (
    <div className={styles.spinner}>

<Circles
              height="80"
              width="80"
              color="#114D5A"
              ariaLabel="circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
    </div>
  )
}

export default Loading