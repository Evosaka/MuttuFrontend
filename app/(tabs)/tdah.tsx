import React, { useEffect, useState } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { useRouter } from "expo-router";
import { useAtom } from "jotai";
import { scaleIdAtom } from "../stores";

export default function Tdah() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [descriptionEscala, setDescriptionEscala] = useState('');
  const [questionsEscala, setQuestionsEscala] = useState('');
  const [nameEscala, setNameEscala] = useState('');
  const [data, setData] = useState([]);

  const [scaleId] = useAtom(scaleIdAtom); 

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://muttu-backend.vercel.app/api/all-scales');
      const data = await response.json();
      setData(data);

      const escala = data.find((item: { id: number }) => item.id.toString() === scaleId);
      if (escala) {
        setDescriptionEscala(escala.description);
        setQuestionsEscala(escala._count.questions);
        setNameEscala(escala.name);
      }
    };
    fetchData();
  }, [scaleId]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <View className="flex-1 gap-2 bg-[#E8C4AC] justify-center">
      <TouchableOpacity onPress={toggleMenu} className="items-start ml-[20]">
        <Image className="w-8 h-8 px-2 absolute top-[-230]" source={require('@/assets/images/iconmenu.png')} />
      </TouchableOpacity>

      {isMenuOpen && (
        <View className="absolute top-24 left-5 bg-[#2D4990] p-4 w-48 shadow-lg rounded-lg z-50">
          <TouchableOpacity className="py-2"><Text className="text-lg text-white font-bold">Botão 1</Text></TouchableOpacity>
          <TouchableOpacity className="py-2"><Text className="text-lg text-white font-bold">Botão 2</Text></TouchableOpacity>
          <TouchableOpacity className="py-2"><Text className="text-lg text-white font-bold">Botão 3</Text></TouchableOpacity>
        </View>
      )}

      <View className="items-start ml-[24] absolute top-[370]">
        <Text className="mt-[-240] text-[26px] text-center text-initi-bluefText font-serif">
          Escala de {nameEscala}
        </Text>
      </View>

      <View className="items-start ml-[24px] absolute top-[350]">
        <Text className="mt-[-160] text-[19px] text-initi-blue font-alegreya-sans text-lg">
          {descriptionEscala}
        </Text>
      </View>

      <View className="items-start ml-[24px] absolute top-[650]">
        <Text className="mt-[-160] text-[19px] text-initi-blue font-alegreya-sans text-lg">
          Deseja Iniciar esta escala?
        </Text>
      </View>

      <View className="items-start ml-[24px] absolute top-[670]">
        <Text className="mt-[-160] text-[14px] text-initi-blue font-alegreya-sans text-lg">
          Número de Questões: {questionsEscala}
        </Text>
      </View>

      <View className="flex-row items-center justify-center">
        <View className="items-center mt-80 mx-[65]">
          <TouchableOpacity>
            <Link href="./home" className="px-2 py-3 w-[120] h-[45] text-[17px] text-center text-[#2D4990] border border-[#2D4990] rounded-xl hover:bg-[#2D4990] hover:text-white">
              Voltar
            </Link>
          </TouchableOpacity>
        </View>

        <View className="items-center mt-80 mx-[65] ml-3">
          <TouchableOpacity>
            <Link href="./question" className="px-2 py-3 w-[120] h-[45] text-[17px] text-center text-[#fdfeff] bg-[#2D4990] rounded-xl hover:bg-[#2D4990] hover:text-white">
              Iniciar
            </Link>
          </TouchableOpacity>
        </View>
      </View>

      <View className="absolute bottom-0 w-full">
        <Image className="w-full h-16 bg-cover" source={require("@/assets/images/barranav.png")} />

        <View className="absolute bottom-0 w-full h-16 flex-row justify-around items-center">
          <TouchableOpacity onPress={() => router.push("/")}>
            <Image className="w-10 h-10" source={require("@/assets/images/homee.png")} resizeMode="contain" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/")}>
            <Image className="w-10 h-10" source={require("@/assets/images/add.png")} resizeMode="contain" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/")}>
            <Image className="w-10 h-10" source={require("@/assets/images/conf.png")} resizeMode="contain" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
