import React from 'react'
import styles from "./CheckoutSteps.module.css"
function CheckoutSteps(props) {
  return (
    <div className={styles.Checkout_steps}>
<div className={props.step1 ? `${styles.active}` :" "}>Sign-In</div>
<div className={props.step2 ? `${styles.active}` :" "}>Shipping</div>
<div className={props.step3 ? `${styles.active}` :" "}>Payment</div>
<div className={props.step4 ? `${styles.active}` :" "}>Place Order</div>

    </div>
  )
}

export default CheckoutSteps