import React, { useState } from "react";
import { Text, View, Image, TouchableOpacity, TextInput, ScrollView, Alert } from "react-native";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useAtom } from "jotai";
import { scalesAtom, scaleIdAtom, Scale } from "../stores";
import { usernameAtom } from '../stores';

export default function Psico() {
  const router = useRouter();
  const { username: usernameParam } = useLocalSearchParams();
  const [username] = useAtom(usernameAtom);
  const [scales, setScales] = useAtom(scalesAtom);
  const [, setScaleId] = useAtom(scaleIdAtom);

  // Estados para o formulário de criação de escalas
  const [scaleName, setScaleName] = useState("");
  const [scaleDescription, setScaleDescription] = useState("");
  const [questions, setQuestions] = useState<{ text: string; options: string[] }[]>([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [newOption, setNewOption] = useState("");

  // Função para adicionar uma nova pergunta à escala
  const addQuestion = () => {
    if (newQuestion.trim() === "") {
      Alert.alert("Erro", "A pergunta não pode estar vazia.");
      return;
    }
    setQuestions([...questions, { text: newQuestion, options: [] }]);
    setNewQuestion("");
  };

  // Função para adicionar uma nova opção de resposta à pergunta
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

  // Função para criar uma nova escala
  const createScale = async () => {
    if (scaleName.trim() === "" || scaleDescription.trim() === "" || questions.length === 0) {
      Alert.alert("Erro", "Preencha todos os campos e adicione pelo menos uma pergunta.");
      return;
    }

    // Verifica se todas as perguntas têm pelo menos uma opção de resposta
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
      createdBy: username || usernameParam, // Associa a escala ao terapeuta logado
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
        Alert.alert("Sucesso", "Escala criada com sucesso!");
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
      {/* Cabeçalho */}
      <ScrollView className="mt-4">
      <View className="items-start mt-20">
        <Text className="text-[22px] text-initi-bluefText font-serif">
          Bem-vindo(a), {username || usernameParam}!
        </Text>
      </View>

      <View className="items-start mt-10">
        <Text className="text-[17px] text-initi-blue font-serif">
          Este é um espaço para você psicólogo, aqui você pode criar escalas para ajudar seus pacientes a saber oque estão sentindo e saber como lidar com os seus sentimentos, compartilhando-o com profissionais como você!
        </Text>
      </View>

      {/* <View className="items-center mt-4">
              <Image className="w-28 h-28" source={require('@/assets/images/logo-muttu.png')} />
            </View> */}

      <View className="items-start mt-10">
        <Text className="text-[17px] text-initi-blue font-serif text-center">
          Clique no botão '+' abaixo para poder criar uma escala.
        </Text>
      </View>

      <View className="items-center">
        <Image className="w-28 h-28 mt-4" source={require('@/assets/images/Happy.png')}resizeMode="contain"/>
        </View>

      </ScrollView>

      
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