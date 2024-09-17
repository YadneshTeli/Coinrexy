import { Avatar, Box, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import cat from "../assests/cat.png"
import { Link } from 'react-router-dom'

const Footer = () => {
  return (

    <Box 
    bgColor={'blackAlpha.900'} 
    color={'whiteAlpha.700'}
    minH={'45'}
    px={'16'}
    py={['16','8']}
    >
     
    <Stack direction={['column','row']}
    h={'full'}
    justify={'space-between'}
    alignItems={'center'}>
    <VStack w={'full'} alignItems={['center','flex-start']}>
        <Text fontWeight={'bold'}>About Us</Text>
        <Text 
        fontSize={'sm'}
        letterSpacing={'widest'}
        textAlign={['center','left']}>
            We are the best crypto trading app in India, we provide our guidance at a very reasonable price

        </Text>
    </VStack>
    <VStack>
        <Link to={''}>
        <Avatar boxSize={'14'} mt={['4',"0"]} ml={'3'} mb={['2']} src={cat}/>
        <Text w={'100px'} fontSize={'sm'}>Our Founders</Text>
        </Link>
    </VStack>
    </Stack>
    </Box>
  )
}

export default Footer


