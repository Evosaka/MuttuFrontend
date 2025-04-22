import React, { useState } from "react";
import { Text, View, Image, TouchableOpacity, TextInput, ScrollView, Alert, ActivityIndicator, Switch } from "react-native";
import { useRouter } from "expo-router";
import { useAtom } from "jotai";
import { scalesAtom, userIdAtom, usernameAtom } from "../stores";
import BottomNavBarPS from "./navbarPs";

interface Question {
  text: string;
  options: {
    text: string;
    value: number;
  }[];
}

interface ScoreRange {
  minScore: number;
  maxScore: number;
  result: string;
  description: string;
}

export default function CreateScale() {
  const router = useRouter();
  const [username] = useAtom(usernameAtom);
  const [userId] = useAtom(userIdAtom);
  const [scales, setScales] = useAtom(scalesAtom);
  const [loading, setLoading] = useState(false);

  const [scaleName, setScaleName] = useState("");
  const [scaleDescription, setScaleDescription] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [scoreRanges, setScoreRanges] = useState<ScoreRange[]>([
    {
      minScore: 0,
      maxScore: 0,
      result: "",
      description: "",
    },
  ]);
  const [isNumericType, setIsNumericType] = useState(false);

  const [newQuestion, setNewQuestion] = useState("");
  const [newOption, setNewOption] = useState("");
  const [newOptionValue, setNewOptionValue] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number | null>(null);

  // Adiciona uma nova pergunta à escala
  const addQuestion = () => {
    if (newQuestion.trim() === "") {
      Alert.alert("Erro", "A pergunta não pode estar vazia.");
      return;
    }
    setQuestions([...questions, { text: newQuestion, options: [] }]);
    setNewQuestion("");
  };

  // Adiciona uma opção à pergunta atual
  const addOption = (questionIndex: number) => {
    if (newOption.trim() === "") {
      Alert.alert("Erro", "A opção não pode estar vazia.");
      return;
    }

    // Só valida o valor numérico se for tipo numérico
    if (isNumericType) {
      if (newOptionValue.trim() === "") {
        Alert.alert("Erro", "O valor não pode estar vazio para tipo numérico.");
        return;
      }

      const value = Number(newOptionValue);
      if (isNaN(value)) {
        Alert.alert("Erro", "O valor deve ser um número.");
        return;
      }
    }

    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.push({ 
      text: newOption, 
      value: isNumericType ? Number(newOptionValue) : 0 // Se não for numérico, usa 0 como valor padrão
    });
    setQuestions(updatedQuestions);
    setNewOption("");
    setNewOptionValue("");
  };

  // Adiciona um novo intervalo de pontuação
  const addScoreRange = () => {
    setScoreRanges([...scoreRanges, {
      minScore: 0,
      maxScore: 0,
      result: "",
      description: ""
    }]);
  };

  // Atualiza um intervalo de pontuação existente
  const updateScoreRange = (index: number, field: keyof ScoreRange, value: string) => {
    const updatedRanges = [...scoreRanges];
    updatedRanges[index] = {
      ...updatedRanges[index],
      [field]: field.includes('Score') ? Number(value) : value
    };
    setScoreRanges(updatedRanges);
  };

  // Validação do formulário
  const validateForm = () => {
    if (scaleName.trim() === "" || scaleDescription.trim() === "") {
      Alert.alert("Erro", "Preencha o nome e a descrição da escala.");
      return false;
    }

    if (questions.length === 0) {
      Alert.alert("Erro", "Adicione pelo menos uma pergunta.");
      return false;
    }

    for (const question of questions) {
      if (question.options.length === 0) {
        Alert.alert("Erro", `A pergunta "${question.text}" não tem opções de resposta.`);
        return false;
      }
    }

    if (isNumericType) {
      for (const range of scoreRanges) {
        if (isNaN(range.minScore) || isNaN(range.maxScore) || 
            range.result.trim() === "" || range.description.trim() === "") {
          Alert.alert("Erro", "Preencha todos os campos dos intervalos de pontuação.");
          return false;
        }
      }
    }

    return true;
  };

  // Envia a escala para o backend
  const createScale = async () => {
    if (!validateForm()) return;
  
    if (userId === null) {
      Alert.alert("Erro", "ID de usuário inválido. Faça login novamente.");
      return;
    }
  
    setLoading(true);
  
    try {
      const scaleData = {
        name: scaleName,
        description: scaleDescription,
        type: isNumericType ? "NUMERIC" : "GENERAL", // Alterado para GENERAL
        questions: questions.map(question => ({
          text: question.text,
          options: question.options.map(option => ({
            text: option.text,
            value: option.value
          }))
        })),
        createdBy: userId,
        ...(isNumericType && { 
          scoreRanges: scoreRanges.map(range => ({
            minScore: range.minScore,
            maxScore: range.maxScore,
            result: range.result,
            description: range.description
          })) 
        })
      };
  
      console.log("Dados sendo enviados:", scaleData);
  
      const response = await fetch("https://muttu-backend.vercel.app/api/scales", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify(scaleData)
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        console.error("Erro na resposta:", data);
        throw new Error(data.message || "Erro ao criar escala");
      }
  
      Alert.alert("Sucesso", "Escala criada com sucesso!");
      setScales([...scales, data]);
      resetForm();
      router.push("/scalesucces");
  
    } catch (error) {
      console.error("Erro ao criar escala:", error);
      Alert.alert(
        "Erro", "Ocorreu um erro ao criar a escala. Verifique os dados e tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  // Reseta o formulário após criação
  const resetForm = () => {
    setScaleName("");
    setScaleDescription("");
    setQuestions([]);
    setScoreRanges([{
      minScore: 0,
      maxScore: 0,
      result: "",
      description: "",
    }]);
    setIsNumericType(false);
  };

  return (
    <>
      <View className="flex-1 bg-[#E8C4AC] p-4">
        <ScrollView className="mt-4">
          <View className="items-start mt-20">
            <Text className="text-[22px] font-serif text-2xl font-bold text-[#2D4990]">
              Criar Nova Escala
            </Text>
          </View>

          {/* Campos básicos da escala */}
          <TextInput
            placeholder="Nome da escala" 
            value={scaleName} 
            onChangeText={setScaleName} 
            className="bg-[#ffffff60] rounded-lg p-4 mb-4 mt-3" 
          />
          
          <TextInput 
            placeholder="Descrição da escala" 
            value={scaleDescription} 
            onChangeText={setScaleDescription} 
            multiline 
            className="bg-[#ffffff60] rounded-lg p-4 mb-4 h-20 " 
          />

          {/* Toggle para tipo numérico */}
          <View className="flex-row items-center justify-between p-4 bg-[#ffffff60] mb-4 h-14 rounded-lg">
            <Text className="text-[#2D4990] font-semibold">Tipo Numérico</Text>
            <Switch
              value={isNumericType}
              onValueChange={setIsNumericType}
              trackColor={{ false: "#767577", true: "#1f326283" }}
              thumbColor={isNumericType ? "#2d4990" : "#f4f3f4"}
            />
          </View>

          {/* Seção de perguntas */}
          <View className="mb-6">
            <Text className="text-[18px] font-bold text-[#2D4990] mb-2">Perguntas</Text>
            
            <TextInput 
              placeholder="Adicionar nova pergunta" 
              value={newQuestion} 
              onChangeText={setNewQuestion} 
              className="bg-[#ffffff60] rounded-lg p-4 mb-2" 
            />
            <TouchableOpacity 
              onPress={addQuestion} 
              className="px-4 py-3 bg-[#2D4990] rounded-lg items-center mt-2"
            >
              <Text className="text-white font-semibold">Adicionar Pergunta</Text>
            </TouchableOpacity>

            {questions.map((question, questionIndex) => (
              <View key={questionIndex} className="mt-4 p-4 bg-[#ffffff60] rounded-lg">
                <Text className="font-bold text-[#2D4990] mb-2">
                  Pergunta {questionIndex + 1}: {question.text}
                </Text>

                <TextInput
                  placeholder="Adicionar nova opção"
                  value={newOption}
                  onChangeText={setNewOption}
                  className="bg-[#ffffff60] rounded-lg p-4 mb-2 "
                />
                
                {/* Input de valor numérico - só aparece se isNumericType for true */}
                {isNumericType && (
                  <TextInput
                    placeholder="Valor numérico"
                    value={newOptionValue}
                    onChangeText={setNewOptionValue}
                    keyboardType="numeric"
                    className="bg-[#ffffff60] rounded-lg p-4 mb-2"
                  />
                )}
                
                <TouchableOpacity 
                  onPress={() => addOption(questionIndex)} 
                  className="px-4 py-3 bg-[#2D4990] rounded-lg items-center mb-4"
                >
                  <Text className="text-white font-semibold">Adicionar Resposta</Text>
                </TouchableOpacity>

                <Text className="font-semibold text-[#2D4990] mb-2">Opções:</Text>
                {question.options.map((option, optionIndex) => (
                  <View key={optionIndex} className="bg-[#ffffff60] p-3 rounded-lg mb-2">
                    <Text>
                      {option.text} 
                      {isNumericType && ` (Valor: ${option.value})`}
                    </Text>
                  </View>
                ))}
              </View>
            ))}
          </View>

          {/* Seção de intervalos de pontuação - só aparece se isNumericType for true */}
          {isNumericType && (
            <View className="mb-6 mt-10">
              <Text className="text-[18px] font-bold text-[#2D4990] mb-2">Interpretação dos Resultados</Text>
              
              {scoreRanges.map((range, index) => (
                <View key={index} className="mt-4 p-4 bg-[#ffffff60] rounded-lg ">
                  <Text className="font-bold text-[#2D4990] mb-2">Intervalo {index + 1}</Text>
                  
                  <View className="flex-row space-x-2 gap-2">
                    <View className="flex-1">
                      <Text>Pontuação Mínima</Text>
                      <TextInput
                        value={range.minScore.toString()}
                        onChangeText={(text) => updateScoreRange(index, 'minScore', text)}
                        keyboardType="numeric"
                        className="bg-[#ffffff60] rounded-lg p-4 mb-2 "
                      />
                    </View>
                    <View className="flex-1">
                      <Text>Pontuação Máxima</Text>
                      <TextInput
                        value={range.maxScore.toString()}
                        onChangeText={(text) => updateScoreRange(index, 'maxScore', text)}
                        keyboardType="numeric"
                        className="bg-[#ffffff60] rounded-lg p-4 mb-2"
                      />
                    </View>
                  </View>
                  
                  <TextInput
                    placeholder="Resultado (ex: Depressão leve)"
                    value={range.result}
                    onChangeText={(text) => updateScoreRange(index, 'result', text)}
                    className="bg-[#ffffff60] rounded-lg p-4 mb-2 "
                  />
                  
                  <TextInput
                    placeholder="Descrição"
                    value={range.description}
                    onChangeText={(text) => updateScoreRange(index, 'description', text)}
                    multiline
                    className="bg-[#ffffff60] rounded-lg p-4 mb-2 h-20 "
                  />
                </View>
              ))}

              <TouchableOpacity 
                onPress={addScoreRange} 
                className="px-4 py-3 bg-[#2D4990] rounded-lg items-center mt-4"
              >
                <Text className="text-white font-semibold">Adicionar Intervalo</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Botão de submissão */}
          <TouchableOpacity 
            onPress={createScale} 
            disabled={loading}
            className="px-4 py-3 bg-[#192e64] rounded-lg items-center mb-20"
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-extrabold">Criar Escala</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </View>

      <BottomNavBarPS />
    </>
  );
}