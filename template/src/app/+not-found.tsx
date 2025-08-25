import { Link } from 'expo-router'
import { Text, View } from '~/ui'

export default function NotFoundScreen() {
  return (
    <View
      flex={1}
      backgroundColor="background"
      justifyContent="center"
      alignItems="center"
      padding="lg">
      <Text variant="heading" marginBottom="md">
        404 - Not Found
      </Text>
      <Text
        variant="body"
        textAlign="center"
        color="mutedForeground"
        marginBottom="lg">
        The page you're looking for doesn't exist.
      </Text>
      <Link href="/">
        <Text variant="body" color="primary">
          Go back home
        </Text>
      </Link>
    </View>
  )
}
