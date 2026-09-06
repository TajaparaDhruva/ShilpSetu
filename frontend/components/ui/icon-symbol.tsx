// icon-symbol.tsx — simplified stub, SF Symbols not used in ShilpSetu.
// Uses lucide-react-native and direct StyleSheet instead.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type MaterialIconName = ComponentProps<typeof MaterialIcons>['name'];

const MAPPING: Record<string, MaterialIconName> = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
};

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: string;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: string;
}) {
  const iconName: MaterialIconName = (MAPPING[name] ?? 'home') as MaterialIconName;
  return <MaterialIcons color={color} size={size} name={iconName} style={style} />;
}
