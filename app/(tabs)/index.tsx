import React, { useEffect, useState } from "react";
import { Text, View, Image, TouchableOpacity, Alert } from "react-native";
import { Link } from 'expo-router';
import { useAtom } from 'jotai';
import { scalesAtom, questionsAtom, Scale } from '../stores';

export default function Welcome() {
  const [, setScales] = useAtom(scalesAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const scalesResponse = await fetch('https://muttu-backend.vercel.app/api/all-scales');
        const scalesData: Scale[] = await scalesResponse.json();
        setScales(scalesData);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#E8C4AC]">
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#E8C4AC] justify-center">
      <View className="items-center mt-6">
        <Image className="w-60 h-60" source={require('@/assets/images/logo-muttu.png')} />
      </View>

      <View className="items-center px-24 mt-6">
        <Text className="text-[27px] text-center text-initi-bluefText font-inter">
          Bem vindo ao App da Muttu!
        </Text>
      </View>

      <View className="items-center mt-3">
        <Text className="text-[12px] text-initi-bluefText font-inter text-lg">
          Dando suporte ao seu tratamento 24Hrs por dia
        </Text>
      </View>

      <View className="items-center mt-6">
        <TouchableOpacity>
          <Link href="./login" className="px-2 py-3 w-[300] h-[45] text-[17px] text-center text-[#fdfeff] bg-[#2D4990] rounded hover:bg-violet-[#2D4990] hover:text-white active:bg-indigo-900 focus:outline-none focus:ring">
            Entrar
          </Link>
        </TouchableOpacity>
      </View>

      <View className="items-center mt-4">
        <TouchableOpacity>
          <Link href="./register" className="px-2 py-3 w-[300] h-[45] text-[17px] text-center text-[#2D4990] border border-[#2D4990] rounded hover:bg-violet-[#2D4990] hover:text-white active:bg-indigo-100 focus:outline-none focus:ring">
            Cadastrar
          </Link>
        </TouchableOpacity>
      </View>
    </View>
  );
}