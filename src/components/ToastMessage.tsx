//@ts-nocheck
import React, { useEffect } from "react";
import ToastManager, { Toast } from 'toastify-react-native'

const ToastMessage = (props: {
  message: string,
  setMessage: (message: string) => void
}) => {
  const { message, setMessage } = props;

  const notify = () => Toast.success(`
    Achievement unlocked:
    ${message}
  `);

  useEffect(() => {
    if (message === '') return

    notify()
    setMessage('')
  }, [message])

  return (
    <ToastManager
      height={150}
      width={350}
      animationIn={'slideInLeft'}
      animationOut={'slideOutRight'}
      duration={6000}
    />
  )
}

export default ToastMessage;
