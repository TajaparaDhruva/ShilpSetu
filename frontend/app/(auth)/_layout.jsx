import { Stack } from 'expo-router';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export default function AuthLayout() {
  return (/*#__PURE__*/
    _jsxs(Stack, { screenOptions: { headerShown: false, animation: 'slide_from_right' }, children: [/*#__PURE__*/
      _jsx(Stack.Screen, { name: "login" }), /*#__PURE__*/
      _jsx(Stack.Screen, { name: "signup" }), /*#__PURE__*/
      _jsx(Stack.Screen, { name: "otp" }), /*#__PURE__*/
      _jsx(Stack.Screen, { name: "forgot-password" })] }
    ));

}