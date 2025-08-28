import { BaseTheme, createBox, ResponsiveColor } from '@shopify/restyle'
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient'
import { ReactNode, Ref, useEffect } from 'react'
import { ViewStyle } from 'react-native'
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'

export type GradientBorderProps<Theme extends BaseTheme> = {
  sliderWidth?: number
  sliderHeight?: number
  delayInAnimation?: number
  pathColor?: ResponsiveColor<Theme>
  sliderColor?: `#${string}`
  innerContainerColor?: ResponsiveColor<Theme>
  children?: ReactNode
  style?: Omit<ViewStyle, 'borderRadius'> & {
    borderRadius?: number
  }
}

const View = createBox<any>()
type View = import('react-native').View

/**
 * Animated gradient border component using Reanimated and Expo
 * LinearGradient.
 */
export const createGradientBorder = <Theme extends BaseTheme>() =>
  createBox<Theme, GradientBorderProps<Theme>>(function GradientBorder({
    sliderWidth = 80,
    sliderHeight = 5,
    delayInAnimation = 3000,
    pathColor = '#A684E4',
    sliderColor = '#FFDA47',
    innerContainerColor = '#854CF0',
    children,
    ...props
  }: GradientBorderProps<Theme> & {
    ref?: Ref<View>
  }) {
    const { borderRadius = 0 } = props.style || {}

    // Measure self: store measured width/height as shared values
    const measuredWidth = useSharedValue(0)
    const measuredHeight = useSharedValue(0)

    const progress = useSharedValue(0)

    useEffect(() => {
      progress.value = 0
      progress.value = withRepeat(
        withTiming(1, {
          duration: delayInAnimation,
          easing: Easing.linear,
        }),
        -1,
        false
      )
    }, [delayInAnimation])

    const animatedStyle = useAnimatedStyle(() => {
      const w = measuredWidth.value
      const h = measuredHeight.value

      const isCircle = w === h && borderRadius >= w / 2
      const diagonal = Math.sqrt(w * w + h * h)

      const leftEdge = -w / 2 + borderRadius
      const rightEdge = w / 2 - borderRadius

      const rotate = `${progress.value * 360}deg`
      const translateX = isCircle
        ? 0
        : interpolate(
            progress.value,
            [0, 0.25, 0.5, 0.75, 1],
            [leftEdge, rightEdge, rightEdge, leftEdge, leftEdge]
          )

      return {
        transform: [{ translateX }, { rotate }],
        height: diagonal,
        width: sliderWidth,
        position: 'absolute' as const,
      }
    }, [borderRadius, sliderWidth])

    return (
      <View
        {...props}
        backgroundColor={pathColor}
        justifyContent="center"
        alignItems="center"
        overflow="hidden"
        onLayout={({ nativeEvent }) => {
          const { width, height } = nativeEvent.layout
          measuredWidth.value = width
          measuredHeight.value = height
        }}>
        <Animated.View style={animatedStyle}>
          <ExpoLinearGradient
            colors={[
              `${sliderColor}02`,
              `${sliderColor}60`,
              sliderColor,
              `${sliderColor}60`,
              `${sliderColor}02`,
            ]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={{ flex: 1 }}
          />
          <View flex={1} backgroundColor={pathColor} />
        </Animated.View>
        <View
          position="absolute"
          top={0}
          right={0}
          bottom={0}
          left={0}
          borderRadius={Math.max(0, borderRadius - 2)}
          margin={sliderHeight}
          backgroundColor={innerContainerColor}
          overflow="hidden">
          {children}
        </View>
      </View>
    )
  })
