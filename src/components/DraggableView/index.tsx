import React, { ReactNode } from 'react';
import { View, ViewProps } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { styles } from './styles';

interface Props {
  children: ReactNode;
  style?: ViewProps['style'];
}

export function DraggableView({ children, style }: Props) {
  const x = useSharedValue(0);
  const y = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startX = x.value;
      ctx.startY = y.value;
    },
    onActive: (event, ctx) => {
      x.value = ctx.startX + event.translationX;
      y.value = ctx.startY + event.translationY;
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: x.value,
      },
      {
        translateY: y.value,
      },
    ],
  }));

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.container, style, animatedStyle]}>
        {children}
      </Animated.View>
    </PanGestureHandler>
  );
}
