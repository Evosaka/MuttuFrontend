import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useAtom } from "jotai";
import { scaleIdAtom, scalesAtom, patientIdAtom } from "../stores";

interface Option {
  text: string;
  value: number;
}

interface Question {
  id: number;
  text: string;
  options: Option[];
  scaleId?: number;
}

export default function QuestionScreen() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ text: string; value: number }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFinishing, setIsFinishing] = useState(false);

  const [scaleId] = useAtom(scaleIdAtom);
  const [scales, setScales] = useAtom(scalesAtom);
  const [patientId] = useAtom(patientIdAtom);

  const selectedScale = scales.find((scale) => scale.id === scaleId);
  const questions: Question[] = selectedScale?.questions || [];
  const currentQuestion = questions[currentQuestionIndex];

  const handleNextQuestion = () => {
    if (selectedOption === null) {
      Alert.alert("Atenção", "Selecione uma opção antes de prosseguir.");
      return;
    }

    const isLastQuestion = currentQuestionIndex === questions.length - 1;
    if (isLastQuestion) {
      setIsFinishing(true);
    }

    const selectedOptionData = currentQuestion.options[selectedOption];
    setAnswers((prev) => [
      ...prev,
      {
        text: selectedOptionData.text,
        value: selectedOptionData.value,
      },
    ]);

    if (!isLastQuestion) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
    }
  };

  useEffect(() => {
    if (answers.length === questions.length && questions.length > 0 && !isSubmitting) {
      sendAnswersToBackend();
    }
  }, [answers]);

  const sendAnswersToBackend = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("https://muttu-backend.vercel.app/api/submit-scale-response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          scaleId,
          patientId,
          answers: answers.map((answer) => String(answer.value)),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Erro ao enviar respostas");
      }

      setScales((prevScales) =>
        prevScales.map((scale) =>
          scale.id === scaleId ? { ...scale, hasResponded: true } : scale
        )
      );

      if (result.success) {
        router.push({
          pathname: "/resultquestion",
          params: { result: JSON.stringify(result) },
        });
      } else if (result.error === "Patient has already completed this scale") {
        Alert.alert("Atenção", "Você já respondeu essa escala anteriormente.");
        router.push("/home");
      }
    } catch (error) {
      console.error("Erro:", error);
      Alert.alert("Erro", error instanceof Error ? error.message : "Erro desconhecido");
    } finally {
      setIsSubmitting(false);
      setIsFinishing(false);
    }
  };

  if (questions.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-[#E8C4AC]">
        <Text className="text-lg">Nenhuma questão disponível para esta escala.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 gap-2 bg-[#E8C4AC] justify-center">
      <View className="items-center mt-[20]">
        <Text className="text-[22px] text-left text-initi-bluefText font-serif px-10">
          {currentQuestion.text}
        </Text>
      </View>

      <View className="items-center mt-14">
        {currentQuestion.options.map((option, index) => (
          <TouchableOpacity
            key={`option-${option.value}-${index}`}
            className={`px-7 py-4 my-2 w-96 rounded-2xl ${
              selectedOption === index ? "bg-[#1A3365]" : "bg-[#2D4990]"
            }`}
            onPress={() => setSelectedOption(index)}
          >
            <Text className="text-white text-center font-bold text-[17px]">
              {option.text}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View className="flex-row items-center justify-center mt-14">
        <TouchableOpacity
          className="px-6 py-3 mx-2 bg-[#2D4990] rounded-lg"
          onPress={() => router.push("/")}
        >
          <Text className="text-white font-bold">Voltar</Text>
        </TouchableOpacity>

        <TouchableOpacity
        className={`px-6 py-3 mx-2 bg-[#2D4990] rounded-lg ${
          isSubmitting ? "opacity-50" : ""
        }`}
        onPress={handleNextQuestion}
        disabled={isSubmitting || isFinishing}
      >
        {isFinishing ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text className="text-white font-bold">
            {currentQuestionIndex < questions.length - 1 ? "Próxima" : "Concluir"}
          </Text>
        )}
      </TouchableOpacity>
      </View>
    </View>
  );
}