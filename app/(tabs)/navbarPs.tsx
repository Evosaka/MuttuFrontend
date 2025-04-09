import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function BottomNavBarPS() {
  const router = useRouter();

  return (
    <View className="absolute bottom-0 w-full">
      <Image
        className="w-full h-16 bg-cover"
        source={require("@/assets/images/barranav.png")}
      />
      <View className="absolute bottom-0 w-full h-16 flex-row justify-around items-center">
        <TouchableOpacity onPress={() => router.push("/psico")}>
          <Image
            className="w-10 h-10"
            source={require("@/assets/images/home.png")}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/psico")}>
          <Image
            className="w-10 h-10"
            source={require("@/assets/images/cerebro.png")}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/createscale")}>
          <Image
            className="w-10 h-10"
            source={require("@/assets/images/create.png")}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/listpatient")}>
          <Image
            className="w-10 h-10"
            source={require("@/assets/images/pacientes.png")}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/config")}>
          <Image
            className="w-10 h-10"
            source={require("@/assets/images/config.png")}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
