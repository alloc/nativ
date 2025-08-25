import { Text, View } from '~/ui'

export default function HomePage() {
  return (
    <View
      flex={1}
      backgroundColor="background"
      justifyContent="center"
      alignItems="center"
      padding="lg">
      <Text variant="heading" marginBottom="md">
        Welcome to nativ!
      </Text>
      <Text variant="body" textAlign="center" color="mutedForeground">
        Your app is ready to go. Start building by editing this file.
      </Text>
    </View>
  )
}
