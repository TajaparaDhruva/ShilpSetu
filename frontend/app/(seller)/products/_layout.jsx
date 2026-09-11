import { Stack } from 'expo-router';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export default function ProductsLayout() {
  return (/*#__PURE__*/
    _jsxs(Stack, { screenOptions: { headerShown: false }, children: [/*#__PURE__*/
      _jsx(Stack.Screen, { name: "index" }), /*#__PURE__*/
      _jsx(Stack.Screen, { name: "create" }), /*#__PURE__*/
      _jsx(Stack.Screen, { name: "[id]" })] }
    ));

}