


import React, { Component, useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { Link, useLocalSearchParams } from 'expo-router'
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { username } = useLocalSearchParams();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <View className={" flex-1 gap-2 bg-[#E8C4AC] justify-center"}>

      <TouchableOpacity onPress={toggleMenu} className={"items-start ml-[20] "}>
        <Image className={"w-8 h-8 px-2 mt-[-290]"}source={require('@/assets/images/iconmenu.png')} />
      </TouchableOpacity>

      {isMenuOpen && (
        <View className="absolute top-24 left-5 bg-[#2D4990] p-4 w-48 shadow-lg rounded-lg z-50">
          <TouchableOpacity className="py-2">
            <Text className="text-lg text-initi-blue text-white">Botão 1</Text>
          </TouchableOpacity>
          <TouchableOpacity className="py-2">
            <Text className="text-lg text-initi-blue text-white">Botão 2</Text>
          </TouchableOpacity>
          <TouchableOpacity className="py-2">
            <Text className="text-lg text-initi-blue text-white">Botão 3</Text>
          </TouchableOpacity>
          <TouchableOpacity className="py-2">
            <Text className="text-lg text-initi-blue text-white">Botão 4</Text>
          </TouchableOpacity>
          <TouchableOpacity className="py-2">
            <Text className="text-lg text-initi-blue text-white">Botão 5</Text>
          </TouchableOpacity>
          <TouchableOpacity className="py-2">
            <Text className="text-lg text-initi-blue text-white">Botão 6</Text>
          </TouchableOpacity>
          <TouchableOpacity className="py-2">
            <Text className="text-lg text-initi-blue text-white">Botão 7</Text>
          </TouchableOpacity>
        </View>
      )}

      <View className={" items-start ml-[24] absolute top-[370]"}>
        <Text className={"mt-[-240] text-[26px] text-center text-initi-bluefText font-serif"}>
          Bem vindo(a), {username}
        </Text>
      </View>

      <View className="items-start ml-[24px] absolute top-[350]">
        <Text className="mt-[-160] text-[19px] text-initi-blue font-alegreya-sans text-lg">
          Escalas
        </Text>
      </View>

      <View className="flex-row justify-center items-center absolute top-[230] ml-1">
        
      <TouchableOpacity onPress={() => router.push("/tdah") }  style={{ width: 96, height: 108, justifyContent: 'center', alignItems: 'center' }} >
        <Image className="w-32 h-32 mx-[2]" source={require('@/assets/images/Hap.png')} resizeMode="contain" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/")} style={{ width: 96, height: 108, justifyContent: 'center', alignItems: 'center' }} > 
        <Image className="w-32 h-32 mx-[2]" source={require('@/assets/images/Calm.png')} resizeMode="contain"  />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/")} style={{ width: 96, height: 108, justifyContent: 'center', alignItems: 'center' }} >
        <Image className="w-32 h-32 mx-[2]" source={require('@/assets/images/Relax.png')} resizeMode="contain" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/")} style={{  width: 96, height: 108, justifyContent: 'center', alignItems: 'center'}}>
        <Image className="w-32 h-32 mx-[2]" source={require('@/assets/images/Focus.png')} resizeMode="contain" />
        </TouchableOpacity>
      
      </View>

      <View className="items-start ml-48 absolute top-[530] mt-[-200]">
          <Image className="w-6 h-6 mt-[-105]" source={require('@/assets/images/correct.png')} resizeMode="contain" />
      </View>


      <View className="items-start ml-[24px] absolute top-[530]">
        <Text className="mt-[-160] text-[19px] text-initi-blue font-alegreya-sans text-lg">
          Lembretes
        </Text>
      </View>

      <View className="items-center mt-[200]">
        <Image className="w-50 h-40 mt-[-130]" source={require('@/assets/images/Pinkcard.png')} resizeMode="contain" />
        
        <TouchableOpacity onPress={() => router.push("/")}>
          <Image className="w-50 h-40 mt-[-110] ml-[-120]" source={require('@/assets/images/Watchnow.png')} resizeMode="contain" />
          </TouchableOpacity>

        <Text className="ml-[-150] mt-[-127] text-[19px] text-initi-blue font-bold text-lg">
          Consulta Terça
        </Text>
        <Text className="ml-[-150] mt-[-40] text-[19px] text-initi-blue font-bold text-lg">

        </Text>

      </View>

      <View className="absolute bottom-0 w-full">
        <Image
          className="w-full h-16 bg-cover"
          source={require("@/assets/images/barranav.png")}
        />

        <View className="absolute bottom-0 w-full h-16 flex-row justify-around items-center">
          <TouchableOpacity onPress={() => router.push("/")}>
            <Image
              className="w-10 h-10"
              source={require("@/assets/images/homee.png")}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/")}>
            <Image
              className="w-10 h-10"
              source={require("@/assets/images/add.png")}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/")}>
            <Image
              className="w-10 h-10"
              source={require("@/assets/images/conf.png")}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>


    </View>
  );
}