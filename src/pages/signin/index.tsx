import {
  Button,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  VStack
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { Link } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'

import { Layout } from 'shared/components/layout'
import { firebaseAuth } from 'app/App'

type FormInputs = {
  email: string
  password: string
}

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required()
  })
  .required()

export const SigninPage = () => {
  const [signInWithEmailAndPassword, user, loading, signInError] =
    useSignInWithEmailAndPassword(firebaseAuth)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
    mode: 'onBlur'
  })

  const onSubmit = ({ email, password }: { email: string; password: string }) =>
    signInWithEmailAndPassword(email, password)

  return (
    <Layout>
      <VStack
        as="form"
        minWidth="30%"
        bgColor="#FFF"
        padding="2em"
        borderRadius="12px"
        shadow="md"
        mt="4em"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Heading>Sign in form</Heading>
        <FormControl id="emailSignin" isInvalid={Boolean(errors.email)}>
          <Input
            type="email"
            placeholder="enter email"
            {...register('email')}
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        <FormControl id="passwordSignin" isInvalid={Boolean(errors.password)}>
          <Input
            type="password"
            placeholder="password"
            {...register('password')}
          />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        <Button type="submit" disabled={!isValid || loading}>
          Sign in
        </Button>
        <Link as={RouterLink} to="/signup">
          Go to sign up form{' '}
        </Link>
        <FormControl isInvalid={Boolean(signInError)}>
          <FormErrorMessage>{signInError?.message}</FormErrorMessage>
        </FormControl>
      </VStack>
    </Layout>
  )
}
