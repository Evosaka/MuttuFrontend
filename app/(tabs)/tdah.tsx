import React, { useEffect, useState } from "react";
import { Text, View,TouchableOpacity, Alert } from "react-native";
import { Link, useRouter } from "expo-router";
import { useAtom } from "jotai";
import { scalesAtom, scaleIdAtom, Scale } from "../stores";
import BottomNavBar from "./navbarPa";

export default function Tdah() {
  const router = useRouter();
  const [descriptionEscala, setDescriptionEscala] = useState('');
  const [questionsEscala, setQuestionsEscala] = useState(0);
  const [nameEscala, setNameEscala] = useState('');

  const [scales] = useAtom(scalesAtom);
  const [scaleId] = useAtom(scaleIdAtom); 
  useEffect(() => {
    if (scaleId !== null) {
      const escala = scales.find((item: Scale) => item.id === scaleId);
      if (escala) {
        setDescriptionEscala(escala.description);
        setQuestionsEscala(escala.questions ? escala.questions.length : 0);
        setNameEscala(escala.name);
      } else {
        Alert.alert("Erro", "Escala não encontrada.");
      }
    }
  }, [scaleId, scales]);

  

  return (
    <View className="flex-1 gap-2 bg-[#E8C4AC] justify-center">

      <View className="items-start ml-[24] -mt-48">
        <Text className="text-[26px] text-center text-initi-bluefText font-serif">
          {nameEscala}
        </Text>
      </View>

      <View className="items-start ml-[24px] mt-2">
        <Text className="text-[19px] font-alegreya-sans text-lg">
          {descriptionEscala}
        </Text>
      </View>

      <View className="items-start ml-[24px] mt-72">
        <Text className="text-[19px] font-alegreya-sans text-lg">
          Deseja Iniciar esta escala?
        </Text>
      </View>

      <View className="items-start ml-[24px] -mt-2">
        <Text className="text-[14px] font-alegreya-sans text-lg">
          Número de Questões: {questionsEscala}
        </Text>
      </View>

      <View className="flex-row items-center justify-center">
        <View className="items-center mt-4 mx-[65]">
          <TouchableOpacity>
            <Link href="./home" className="px-2 py-3 w-[120] h-[45] text-[17px] text-center text-[#2D4990] border border-[#2D4990] rounded-xl hover:bg-[#2D4990] hover:text-white">
              Voltar
            </Link>
          </TouchableOpacity>
        </View>

        <View className="items-center mt-4 mx-[65] ml-3">
          <TouchableOpacity>
            <Link href="./question" className="px-2 py-3 w-[120] h-[45] text-[17px] text-center text-[#fdfeff] bg-[#2D4990] rounded-xl hover:bg-[#2D4990] hover:text-white">
              Iniciar
            </Link>
          </TouchableOpacity>
        </View>
      </View>

      <BottomNavBar />
    </View>
  );
}