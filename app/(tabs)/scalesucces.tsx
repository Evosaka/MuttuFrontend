import React, { useState } from "react";
import { Text, View,TouchableOpacity} from "react-native";
import { useRouter } from "expo-router";
import BottomNavBarPS from "./navbarPs";

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
        <Text className="text-[15px] font-serif text-left">
            Agora você pode associar a sua escala criada a um paciente, clique em escala para fazer a associação.
        </Text>
      </View>

      <View className="items-start mt-20">
        <Text className="text-[18px] font-serif text-center">
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
    <BottomNavBarPS />
          
          </>
  );
}