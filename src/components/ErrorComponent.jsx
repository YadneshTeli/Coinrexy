import { Alert ,AlertIcon} from '@chakra-ui/react'
import React from 'react'

const ErrorComponent = ({message}) => {
  return (
    <Alert status='error' 
    position={'fixed'} 
    top={'24'} 
    left={'50%'} 
    transform={'translateX(-50%)'} 
    w={[300, 400, 700]}
    >
    <AlertIcon />
      {message}
    </Alert>
  )
}

export default ErrorComponent