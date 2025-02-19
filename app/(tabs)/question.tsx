


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

export default function Question() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <View className={" flex-1 gap-2 bg-[#E8C4AC] justify-center"}>

      <TouchableOpacity onPress={toggleMenu} className={"items-start ml-[20] "}>
        <Image className={"w-8 h-8 px-2 absolute top-[-230]"}source={require('@/assets/images/iconmenu.png')} />
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
          Escala de TDAH
        </Text>
      </View>

      <View className="items-start ml-[24px] absolute top-[350]">
        <Text className="mt-[-160] text-[19px] text-initi-blue font-alegreya-sans text-lg">
        Descrição Descrição Descrição Descrição Descrição Descrição Descrição Descrição Descrição Descrição Descrição Descrição Descrição Descrição Descrição Descrição Descrição Descrição Descrição Descrição 
        Descrição Descrição Descrição?
        </Text>
      </View>

      

        <View className={" flex- items-center justify-center mt-72"}>
            <View className={" items-center mt-8"}>
              <TouchableOpacity onPress={() => setSelectedOption(1)}>
              <Text  className={`px-2 py-3 w-[350] h-[50] text-[17px] text-center rounded-xl font-semibold ${
              selectedOption === 1 ? "bg-indigo-900 text-white" : "bg-[#2D4990] text-[#fdfeff]"}`}>
              Resposta 1
                </Text>
              </TouchableOpacity>
          </View>
        
  
        <View className={" items-center mt-8"}>
          <TouchableOpacity onPress={() => setSelectedOption(2)}>
          <Text className={`px-2 py-3 w-[350] h-[50] text-[17px] text-center rounded-xl font-semibold ${
              selectedOption === 2 ? "bg-indigo-900 text-white" : "bg-[#2D4990] text-[#fdfeff]"}`}>
              Resposta 2
            </Text>
          </TouchableOpacity>
        </View>


        <View className={" items-center mt-8"}>
          <TouchableOpacity onPress={() => setSelectedOption(3)}>
          <Text className={`px-2 py-3 w-[350] h-[50] text-[17px] text-center rounded-xl font-semibold ${
              selectedOption === 3 ? "bg-indigo-900 text-white" : "bg-[#2D4990] text-[#fdfeff]"}`}>
              Resposta 3
            </Text>
          </TouchableOpacity>
        </View>


        <View className={" items-center mt-8"}>
          <TouchableOpacity onPress={() => setSelectedOption(4)}>
          <Text className={`px-2 py-3 w-[350] h-[50] text-[17px] text-center rounded-xl font-semibold ${
              selectedOption === 4 ? "bg-indigo-900 text-white" : "bg-[#2D4990] text-[#fdfeff]"}`}>
              Resposta 4
            </Text>
          </TouchableOpacity>
        </View>

        <View className={"items-center mt-8 ml-[231]"}>
        <TouchableOpacity
          disabled={selectedOption === null}
          className={`px-2 py-3 w-[120] h-[45] text-[17px] text-center rounded-xl font-semibold ${
            selectedOption === null ? "bg-gray-400" : "bg-[#2D4990]"
          }`}
        >
          <Text className="text-[#fdfeff] text-[17px] text-center font-semibold">Continuar</Text>
        </TouchableOpacity>
      </View>

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