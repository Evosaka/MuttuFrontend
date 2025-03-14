


import React, { Component, useEffect, useState } from "react";
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
import { ScrollView } from "react-native-gesture-handler";
import { useAtom } from "jotai";
import { scaleIdAtom } from "../stores";

export default function Question() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);


  const [textEscala, setTextEscala] = useState('');
  const [optionsEscala, setOptionsEscala] = useState ([] as string[]);

  const [data, setData] = useState<any>(null);

    const [scaleId] = useAtom(scaleIdAtom); 
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://muttu-backend.vercel.app/api/scales/${scaleId}`);
        const result = await response.json();
        setData(result);

        if (result.questions && Array.isArray(result.questions)) {
          const perguntas = result.questions.map((q: { id: number; text: string; options: string[]; scaleId: number; }) => {
            return {
              id: q.id,
              text: q.text,
              options: q.options || [],
              scaleId: q.scaleId,
            };
          });
        
          const question = perguntas.find((q: { id: number; scaleId: number }) => 
            scaleId !== null && q.scaleId.toString() === scaleId.toString()
          );          if (question) {
            
            setTextEscala(question.text);

            setOptionsEscala(question.options);
          }
        }
        
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };



  
  return (

    <View className={" flex-1 gap-2 bg-[#E8C4AC] justify-center"}>

     
          

      <TouchableOpacity onPress={toggleMenu} className={"items-start ml-[20] "}>
        <Image className={"w-8 h-8 px-2 absolute top-[-10]"} source={require('@/assets/images/iconmenu.png')} />
      </TouchableOpacity>

      {isMenuOpen && (
        <View className="absolute top-24 left-5 bg-[#2D4990] p-4 w-48 shadow-lg rounded-lg z-50">
          <TouchableOpacity className="py-2">
            <Text className="text-lg text-initi-blue text-white font-bold">Botão 1</Text>
          </TouchableOpacity>
          <TouchableOpacity className="py-2">
            <Text className="text-lg text-initi-blue text-white font-bold">Botão 2</Text>
          </TouchableOpacity>
          <TouchableOpacity className="py-2">
            <Text className="text-lg text-initi-blue text-white font-bold">Botão 3</Text>
          </TouchableOpacity>
          <TouchableOpacity className="py-2">
            <Text className="text-lg text-initi-blue text-white font-bold">Botão 4</Text>
          </TouchableOpacity>
          <TouchableOpacity className="py-2">
            <Text className="text-lg text-initi-blue text-white font-bold">Botão 5</Text>
          </TouchableOpacity>
          <TouchableOpacity className="py-2">
            <Text className="text-lg text-initi-blue text-white font-bold">Botão 6</Text>
          </TouchableOpacity>
          <TouchableOpacity className="py-2">
            <Text className="text-lg text-initi-blue text-white font-bold">Botão 7</Text>
          </TouchableOpacity>
        </View>
      )}

      <View className={" items-start ml-[24] absolute top-[370]"}>
        <Text className={"mt-[-260] text-[26px] text-left text-initi-bluefText font-serif"} >
          {textEscala}
        </Text>
      </View>
    
      <View  className={" flex- items-center justify-center mt-72"}>
         {optionsEscala.map((option, i) => <View className={" items-center mt-8"}>
          <TouchableOpacity onPress={() => setSelectedOption(i)}>
            <Text className={`px-2 py-3 w-[350] h-[50] text-[17px] text-center rounded-xl font-semibold ${selectedOption === 1 ? "bg-indigo-900 text-white" : "bg-[#2D4990] text-[#fdfeff]"}`}>
              {option}
            </Text>
          </TouchableOpacity>
        </View>)}
        

        <View className={"items-center mt-8 ml-[231]"}>
          <TouchableOpacity
            disabled={selectedOption === null}
            className={`px-2 py-3 w-[120] h-[45] text-[17px] text-center rounded-xl font-semibold ${selectedOption === null ? "bg-gray-400" : "bg-[#2D4990]"
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
