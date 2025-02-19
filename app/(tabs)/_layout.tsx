import { Stack } from 'expo-router';

   export default function Layout() {
     return (
       <Stack>
         <Stack.Screen name="index" options={{ headerShown: false }} />
         <Stack.Screen name="login" options={{ headerShown: false }} />
         <Stack.Screen name="register" options={{ headerShown: false }} />
         <Stack.Screen name="home" options={{ headerShown: false }} />
         <Stack.Screen name="tdah" options={{ headerShown: false }} />
         <Stack.Screen name="question" options={{ headerShown: false }} />


       </Stack>
     );
   }