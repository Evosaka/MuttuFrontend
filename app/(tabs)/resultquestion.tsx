import React, { useEffect, useState } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useAtom } from "jotai";
import { scalesAtom, scaleIdAtom } from "../stores";
import BottomNavBar from "./navbarPa";


// Defina a interface do objeto result
interface UserScale {
    id: number;
    userId: number;
    scaleId: number;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
}

interface Response {
    id: number;
    userId: number;
    scaleId: number;
    questionId: number;
    answer: string;
    createdAt: string;
    updatedAt: string;
}

interface Result {
    success: boolean;
    userScale: UserScale;
    responses: Response[];
    result: string;
    resultDescription: string;
}

export default function ResultQuestion() {
    const router = useRouter();
    const params = useLocalSearchParams(); // Acessa os parâmetros passados
    const [result, setResult] = useState<Result | null>(null); // Define o tipo do estado

    // Verificação dos parâmetros recebidos
    console.log("Params recebidos:", params);

    // Extrai e desserializa o parâmetro result
    useEffect(() => {
        console.log("useEffect executado"); // Verificação
        if (params.result) {
            try {
                const parsedResult = JSON.parse(params.result as string) as Result; // Converte a string de volta para objeto
                setResult(parsedResult);
                console.log("Resultado desserializado:", parsedResult);
            } catch (error) {
                console.error("Erro ao desserializar result:", error);
            }
        }
    }, [params.result]);

    console.log("Result:", result); // Verificação



    return (
        <View className="flex-1 gap-2 bg-[#E8C4AC] justify-center">
            <View className="items-start ml-[24] absolute top-[370]">
                <Text className="mt-[-240] text-[25px] text-start text-initi-bluefText font-serif">
                    {result?.result || "Escala em Revisão"}
                </Text>
            </View>

            <View className="items-start ml-4 mt-32 p-5">
                <Text className=" text-[14px] text-initi-blue font-alegreya-sans text-lg text-start">
                    {result?.resultDescription || "Um resultado gerado pela equipe sera disponibilizado em breve."}
                </Text>
            </View>


            <View className="flex-row items-center justify-center">
                

                <View className="items-center mt-32 mx-[65]">
                    <TouchableOpacity
                              className="px-8 py-3 mx-2 bg-[#2D4990] rounded-lg "
                              onPress={() => router.push("/home")}
                            >
                              <Text className="text-white font-bold text-[15px]">Voltar</Text>
                            </TouchableOpacity>
                </View>
            </View>

            <BottomNavBar />
        </View>
    );
}