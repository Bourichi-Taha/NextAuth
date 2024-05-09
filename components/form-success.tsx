import { CheckCircleIcon } from 'lucide-react';
import React from 'react'

interface FormSuccessProps {
    message?: string;
}

const FormSuccess = (props:FormSuccessProps) => {

    const {message} = props;

    if (!message) {
        return null;
    }

  return (
    <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
        <CheckCircleIcon className='h-5 w-5' />
        <p className="">
            {
                message
            }
        </p>
    </div>
  )
}

export default FormSuccess