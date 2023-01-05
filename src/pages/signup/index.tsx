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
import { Link as RouterLink, useNavigate } from 'react-router-dom'

import { Layout } from 'shared/components/layout'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { firebaseAuth } from 'app/App'
import { createPlayer } from 'api/player'

type FormInputs = {
  email: string
  nickname: string
  password: string
}

const schema = yup
  .object({
    email: yup.string().email().required(),
    nickname: yup.string().min(2).required(),
    password: yup.string().min(6).required()
  })
  .required()

export const SignupPage = () => {
  const [signUpWithEmailAndPassword, user, loading, signUpError] =
    useCreateUserWithEmailAndPassword(firebaseAuth)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid }
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
    mode: 'onBlur'
  })

  const onSubmit = ({
    email,
    password,
    nickname
  }: {
    email: string
    password: string
    nickname: string
  }) => {
    signUpWithEmailAndPassword(email, password).then((user) => {
      if (user !== undefined) createPlayer({ nickname, user })
    })
  }

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
        autoComplete="new-password"
      >
        <Heading>Sign up form</Heading>
        <FormControl id="emailSignup" isInvalid={Boolean(errors.email)}>
          <Input
            type="email"
            placeholder="enter email"
            autoComplete="new-password"
            {...register('email')}
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        <FormControl id="nicknameSignup" isInvalid={Boolean(errors.nickname)}>
          <Input
            placeholder="nickname"
            autoComplete="new-password"
            {...register('nickname')}
          />
          <FormErrorMessage>{errors.nickname?.message}</FormErrorMessage>
        </FormControl>
        <FormControl id="passwordSignup" isInvalid={Boolean(errors.password)}>
          <Input
            type="password"
            autoComplete="new-password"
            placeholder="password"
            {...register('password')}
          />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        <Button
          type="submit"
          disabled={!isValid || loading || user !== undefined}
        >
          Sign up
        </Button>
        <Link as={RouterLink} to="/signin">
          Go to sign in form{' '}
        </Link>
        <FormControl isInvalid={Boolean(signUpError)}>
          <FormErrorMessage>{signUpError?.message}</FormErrorMessage>
        </FormControl>
      </VStack>
    </Layout>
  )
}
