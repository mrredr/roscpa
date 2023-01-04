import {
  Button,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  VStack
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

import { Layout } from 'shared/components/layout'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { signInEmailPassword } from 'api/auth'

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

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid }
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
    mode: 'onBlur'
  })

  const onInvalid = () => alert('This form is invalid try again')

  const onSubmit = (formData: any) => signInEmailPassword(formData)

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
        onSubmit={handleSubmit(onSubmit, onInvalid)}
      >
        <Heading>Login form</Heading>
        <FormControl id="email" isInvalid={Boolean(errors.email)}>
          <Input
            type="email"
            placeholder="enter email"
            {...register('email')}
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        <FormControl id="email" isInvalid={Boolean(errors.password)}>
          <Input
            type="password"
            placeholder="password"
            {...register('password')}
          />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        <Button type="submit" disabled={!isValid}>
          Login
        </Button>
      </VStack>
    </Layout>
  )
}
