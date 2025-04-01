import React, { useState } from "react";
import { Text, View, Image, TouchableOpacity} from "react-native";
import { useRouter } from "expo-router";

export default function Psico() {
  const router = useRouter();


  return (
    <>
    <View className="flex-1 bg-[#E8C4AC] p-4">
      {/* Cabeçalho */}
      <View className="items-start mt-60">
        <Text className="text-[22px] text-initi-bluefText font-serif">
        Escala criada com sucesso!
        </Text>
      </View>

      <View className="items-start mt-5">
        <Text className="text-[15px] text-initi-blue font-serif text-left">
            Agora você pode associar a sua escala criada a um paciente, clique em escala para fazer a associação.
        </Text>
      </View>

      <View className="items-start mt-20">
        <Text className="text-[18px] text-initi-blue font-serif text-center">
            Deseja criar outra escala ou ver a lista de escalas?
        </Text>
      </View>

       <View className="flex-row items-center justify-center mt-2">
              <TouchableOpacity
                className="px-6 py-3 mx-2 bg-[#2D4990] rounded-lg"
                onPress={() => router.push("/createscale")}
              >
                <Text className="text-white font-bold">Criar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="px-6 py-3 mx-2 bg-[#2D4990] rounded-lg"
                onPress={() => router.push("/listpatient")}
              >
                <Text className="text-white font-bold">Escalas</Text>
              </TouchableOpacity>
        </View>

      
    </View>
     <View className="absolute bottom-0 w-full">
            <Image
              className="w-full h-16 bg-cover"
              source={require("@/assets/images/barranav.png")}
            />
            <View className="absolute bottom-0 w-full h-16 flex-row justify-around items-center">
              <TouchableOpacity onPress={() => router.push("/psico")}>
                <Image
                  className="w-10 h-10"
                  source={require("@/assets/images/homee.png")}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push("/createscale")}>
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
          
          </>
  );
}