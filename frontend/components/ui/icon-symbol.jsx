import React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const MAPPING = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'chevron.left': 'chevron-left',
  'magnifyingglass': 'search',
  'bell.fill': 'notifications',
  'star.fill': 'star',
  'heart.fill': 'favorite',
  'heart': 'favorite-border',
  'mappin.circle.fill': 'location-on',
  'clock.fill': 'access-time',
  'plus.circle.fill': 'add-circle',
  'plus': 'add',
  'bubble.left.and.bubble.right.fill': 'chat',
  'bubble.left.fill': 'chat-bubble',
  'safari.fill': 'explore',
  'doc.text.fill': 'description',
  'sparkles': 'auto-awesome',
  'person.fill': 'person',
  'pawprint.fill': 'pets',
  'hand.raised.fill': 'front-hand',
  'hammer.fill': 'construction',
  'flame.fill': 'local-fire-department',
  'slider.horizontal.3': 'tune',
  'cube.box.fill': 'inventory',
  'indianrupeesign.circle.fill': 'payments',
  'checkmark.circle.fill': 'check-circle',
  'checkmark.seal.fill': 'verified',
  'xmark.circle.fill': 'cancel',
  'tray.fill': 'inbox',
  'exclamationmark.triangle.fill': 'warning',
  'arrow.clockwise': 'refresh',
  'hourglass': 'hourglass-empty',
  'info.circle.fill': 'info',
  'globe': 'language',
  'questionmark.circle.fill': 'help-outline',
  'arrow.right.square': 'logout',
};

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}) {
  const mappedName = MAPPING[name] || 'help-outline';
  return <MaterialIcons color={color} size={size} name={mappedName} style={style} />;
}
