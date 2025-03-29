import React, { useState } from "react";
import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAtom } from "jotai";
import { scalesAtom, scaleIdAtom, Scale, questionsAtom } from "../stores";
import { usernameAtom } from '../stores';

export default function Home() {
  const router = useRouter();

  const { username: usernameParam } = useLocalSearchParams();
  const [username] = useAtom(usernameAtom);

  const [scales] = useAtom(scalesAtom);
  const [, setScaleId] = useAtom(scaleIdAtom); // Função para definir o ID da escala selecionada
  const [, setQuestions] = useAtom(questionsAtom);

  const handlePress = (id: number) => {
    setScaleId(id); // Define o ID da escala selecionada
    router.push({ pathname: "/tdah", params: { scaleId: id.toString() } }); // Passa o scaleId como parâmetro
  };


console.log("scales:", scales);

  return (
    <View className="flex-1 gap-2 bg-[#E8C4AC] justify-center">

      <View className="items-start ml-[24] absolute top-[370]">
        <Text className="mt-[-240] text-[22px] text-center text-initi-bluefText font-serif">
          Bem vindo(a) {username || usernameParam}!
        </Text>
      </View>

      <View className="items-start ml-[24px] absolute top-[350]">
        <Text className="mt-[-160] text-[19px] text-initi-blue font-alegreya-sans text-lg">
          Escalas
        </Text>
      </View>

      <View className="flex-row justify-center items-center absolute top-[220] ml-1 overflow-x-auto">
        <ScrollView horizontal={true} style={{ height: 150 }}>
          <View className="flex-row">
            {scales.map((scale: Scale) => (
              <TouchableOpacity
              key={scale.id}
              onPress={() => {
                if (scale.hasResponded) {
                  // Exibe um alerta ou mensagem informando que a escala já foi concluída
                  alert("Esta escala já foi concluída!");
                } else {
                  // Chama a função handlePress apenas se a escala não foi respondida
                  handlePress(scale.id);
                }
              }}
              disabled={scale.hasResponded} // Desabilita o botão se a escala já foi respondida
              style={{
                width: 96,
                height: 130,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 16,
              }}
            >
              {/* Container relativo para posicionar a imagem "correct" */}
              <View className="gap-2" style={{ position: 'relative', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                {/* Imagem da escala com opacidade reduzida se já foi respondida */}
                <Image
                  style={{
                    width: 96,
                    height: 108,
                    opacity: scale.hasResponded ? 0.6 : 1, // Aplica opacidade apenas à imagem da escala
                  }}
                  source={require('@/assets/images/Happy.png')}
                  resizeMode="contain"
                />
            
                {/* Texto da escala */}
                <View style={{ marginTop: -11, width: 96 }}>
                  <Text style={{ textAlign: 'center', height: 36 }}>{scale.name}</Text>
                </View>
            
                {/* Condicional para mostrar a imagem "correct" */}
                {scale.hasResponded && (
                  <View style={{ position: 'absolute', top: 0, right: 0 }}>
                    <Image
                      style={{ width: 24, height: 24 }} // Tamanho menor para o canto superior direito
                      source={require('@/assets/images/correct.png')}
                      resizeMode="contain"
                    />
                  </View>
                )}
              </View>
            </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <View className="items-start ml-[24px] absolute top-[530]">
        <Text className="mt-[-160] text-[19px] text-initi-blue font-alegreya-sans text-lg">
          Lembretes
        </Text>
      </View>

      <View className="items-center mt-[200]">
        <Image
          className="w-50 h-40 mt-[-130]"
          source={require('@/assets/images/Pinkcard.png')}
          resizeMode="contain"
        />
        <TouchableOpacity onPress={() => router.push("/resultquestion")}>
          <Image
            className="w-50 h-40 mt-[-110] ml-[-120]"
            source={require('@/assets/images/Watchnow.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text className="ml-[-150] mt-[-127] text-[19px] text-initi-blue font-bold text-lg">
          Consulta Terça
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