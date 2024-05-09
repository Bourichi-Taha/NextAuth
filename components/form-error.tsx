import React from 'react'
import {  BsFillExclamationTriangleFill } from 'react-icons/bs';

interface FormErrorProps {
    message?: string;
}

const FormError = (props:FormErrorProps) => {

    const {message} = props;

    if (!message) {
        return null;
    }

  return (
    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
        <BsFillExclamationTriangleFill className='h-5 w-5' />
        <p className="">
            {
                message
            }
        </p>
    </div>
  )
}

export default FormError