import React, { useState } from "react";
import { Text, View, Image,ScrollView, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAtom } from "jotai";
import { scalesAtom, scaleIdAtom, patientsAtom } from "../stores";
import { usernameAtom } from '../stores';
import BottomNavBarPS from "./navbarPs";


export default function Psico() {
  const router = useRouter();
  const { username: usernameParam } = useLocalSearchParams();
  const [username] = useAtom(usernameAtom);
  const [scales, setScales] = useAtom(scalesAtom);
  const [, setScaleId] = useAtom(scaleIdAtom);
  const [patients] = useAtom(patientsAtom);

  // Estados para o formulário de criação de escalas
  const [scaleName, setScaleName] = useState("");
  const [scaleDescription, setScaleDescription] = useState("");
  const [questions, setQuestions] = useState<{ text: string; options: string[] }[]>([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [newOption, setNewOption] = useState("");

  const addQuestion = () => {
    if (newQuestion.trim() === "") {
      Alert.alert("Erro", "A pergunta não pode estar vazia.");
      return;
    }
    setQuestions([...questions, { text: newQuestion, options: [] }]);
    setNewQuestion("");
  };

  const addOption = (questionIndex: number) => {
    if (newOption.trim() === "") {
      Alert.alert("Erro", "A opção não pode estar vazia.");
      return;
    }
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.push(newOption);
    setQuestions(updatedQuestions);
    setNewOption("");
  };

  const createScale = async () => {
    if (scaleName.trim() === "" || scaleDescription.trim() === "" || questions.length === 0) {
      Alert.alert("Erro", "Preencha todos os campos e adicione pelo menos uma pergunta.");
      return;
    }

  
    for (const question of questions) {
      if (question.options.length === 0) {
        Alert.alert("Erro", "Todas as perguntas devem ter pelo menos uma opção de resposta.");
        return;
      }
    }

    const newScale = {
      name: scaleName,
      description: scaleDescription,
      questions: questions,
      createdBy: username || usernameParam,
    };

    try {
      const response = await fetch("https://muttu-backend.vercel.app/api/scales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newScale),
      });

      const data = await response.json();
      if (data.success) {
        setScales([...scales, data.scale]); // Atualiza a lista de escalas
        setScaleName("");
        setScaleDescription("");
        setQuestions([]);
      } else {
        Alert.alert("Erro", "Não foi possível criar a escala.");
      }
    } catch (error) {
      console.error("Erro ao criar escala:", error);
      Alert.alert("Erro", "Ocorreu um erro ao tentar criar a escala.");
    }

    
  };

  

  return (
    <>
    <View className="flex-1 bg-[#E8C4AC] p-4">
     

      <ScrollView className="mt-4">
      <View className="items-start mt-20">
        <Text className="text-[22px] text-2xl font-bold font-serif text-[#2D4990]">
          Bem-vindo(a) {username || usernameParam}!
        </Text>
      </View>

      <View className="items-start mt-16">
        <Text className="text-[17px] font-serif">
          Este é um espaço para você psicólogo, aqui você pode criar escalas para ajudar seus pacientes a saber oque estão sentindo e saber como lidar com os seus sentimentos, compartilhando-o com profissionais como você!
        </Text>
      </View>

      <View className="items-start mt-28">
        <Text className="text-[17px] font-serif text-center">
          Clique no botão '+' abaixo para poder criar uma escala.
        </Text>
      </View>

      <View className="items-center">
        <Image className="w-28 h-28 mt-4" source={require('@/assets/images/Happy.png')}resizeMode="contain"/>
        </View>

        <View className="gap-3 p-10 items-center justify-center ">
          <Text className="text-[17px] font-serif text-center mt-5">
            Numero de Pacientes Muttu: {patients.length}
          </Text>
        </View>

      </ScrollView>

      
    </View>
      <BottomNavBarPS />
          
          </>
  );
}