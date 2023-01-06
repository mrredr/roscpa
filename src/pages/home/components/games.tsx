import { Heading, Stack } from '@chakra-ui/react'
import { firestore, Player, PlayerContext } from 'app/App'
import {
  collection,
  doc,
  DocumentData,
  query,
  where,
  WhereFilterOp
} from 'firebase/firestore'
import { useContext, useEffect, useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { Loader } from 'shared/components/loader'
import { CreateGame } from './create-game'
import { GameItem } from './game-item'

export const NotMyGamesList = ({ title }: { title: string }) => {
  const player: Player = useContext(PlayerContext) as Player
  const playerDocRef = doc(firestore, 'players', player?.id)
  const [values, loading, error] = useCollection(
    query(
      collection(firestore, 'games'),
      where('player1.ref', '!=', playerDocRef),
      where('status', '==', 'start')
    )
  )

  if (loading) return <Loader />

  if (error) throw new Error(error?.toString())

  if (values?.docs.length === 0) return null

  return (
    <Stack spacing={4}>
      <Heading as="h4" size="md">
        {title}
      </Heading>
      <Stack spacing={4}>
        {values &&
          values.docs.map((value) => (
            <GameItem gameData={value} key={value.id} />
          ))}
      </Stack>
    </Stack>
  )
}

export const MyGamesList = ({
  title,
  status,
  condition
}: {
  title: string
  status: string
  condition: WhereFilterOp
}) => {
  const player: Player = useContext(PlayerContext) as Player
  const playerDocRef = doc(firestore, 'players', player?.id)
  const [valuesDocs, setValuesDocs] = useState<DocumentData[]>([])
  const [values1, loading1, error1] = useCollection(
    query(
      collection(firestore, 'games'),
      where('player1.ref', '==', playerDocRef),
      where('status', condition, status)
    )
  )
  const [values2, loading2, error2] = useCollection(
    query(
      collection(firestore, 'games'),
      where('player2.ref', '==', playerDocRef),
      where('status', condition, status)
    )
  )

  useEffect(() => {
    setValuesDocs([
      ...(values1?.docs ? values1.docs : []),
      ...(values2?.docs ? values2.docs : [])
    ])
  }, [values1, values2])

  if (loading1 || loading2) return <Loader />

  if (error1 || error2)
    throw new Error(error1?.toString() || error2?.toString())

  if (valuesDocs.length === 0) return null

  return (
    <Stack spacing={4}>
      <Heading as="h4" size="md">
        {title}
      </Heading>
      <Stack spacing={4}>
        {valuesDocs.map((valueDoc) => (
          <GameItem gameData={valueDoc} key={valueDoc.id} />
        ))}
      </Stack>
    </Stack>
  )
}

export const Games = () => {
  return (
    <Stack spacing={4}>
      <CreateGame />
      <MyGamesList title="Games in progress" status="end" condition="!=" />
      <NotMyGamesList title="Invites to play" />
      <MyGamesList title="Finished games" status="end" condition="==" />
    </Stack>
  )
}
