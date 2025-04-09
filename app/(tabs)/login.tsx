import React, { useState } from "react";
import { Text, View, Image, TouchableOpacity, TextInput, Alert } from "react-native";
import { Link, router } from 'expo-router';
import { useAtom } from "jotai";
import { scalesAtom, usernameAtom, patientIdAtom, userIdAtom, emailidAtom } from "../stores"; // Importe o patientIdAtom

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [, setScales] = useAtom(scalesAtom); 
  const [, setUsername] = useAtom(usernameAtom);
  const [, setPatientId] = useAtom(patientIdAtom);
  const [, setUserId] = useAtom(userIdAtom);
  const [, setEmailid] = useAtom(emailidAtom);

  async function handleLogin() {
    setLoading(true);

    //Validação dos campos
    if (email === "" || password === "") {
      Alert.alert("Erro", "Preencha todos os campos!");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      Alert.alert("Erro", "A senha deve ter no mínimo 8 caracteres!");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://muttu-backend.vercel.app/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();
       console.log("Resposta da API:", data);

      if (data.success) {
        setScales(data.scales); // Armazena as escalas no estado global
        setUsername(data.user.username); // Armazena o nome de usuário no estado global
        setUserId(data.user.id); // Armazena o ID do usuário no estado global
        setPatientId(data.user.id); // Armazena o ID do paciente no estado global
        setEmailid(data.user.email); // Armazena o email do paciente no estado global

        // Redireciona com base no role
        if (data.user.role === "PSYCHOLOGIST") {
          router.push({ pathname: "/psico",  params: { username: data.user.username } });
        } else if (data.user.role === "PATIENT") {
          router.push({ pathname: "/home", params: { username: data.user.username } });
        } else {
          Alert.alert("Erro", "Tipo de usuário desconhecido.");
        }
      } else {
        Alert.alert("Erro", data.message || "Email ou senha incorretos!");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      Alert.alert("Erro", "Ocorreu um erro ao tentar fazer login. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View className={"pt-50 gap-2 flex-1 bg-[#E8C4AC] justify-center"}>
      {/* Cabeçalho */}
      <View className={"items-center mb-8"}>
        <Text className={"text-[26px] text-center text-initi-bluefText font-bold"}>
          Bem-vindo de Volta!
        </Text>
      </View>

      {/* Instruções */}
      <View className={"items-start mt-9 px-16"}>
        <Text className={"text-[13px] text-initi-bluefText font-inter text-lg"}>
          Preencha suas credenciais
        </Text>
      </View>

      {/* Campos de entrada */}
      <View className={"items-center mt-6 -gap-"}>
        <TextInput
          keyboardType="email-address"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          className={"bg-[#ffffff60] border-initi-bluefText w-80 rounded-lg mb-6 h-14 p-4 text-base"}
        />
        <TextInput
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          autoCapitalize="none"
          className={"bg-[#ffffff60] border-initi-bluefText w-80 rounded-lg h-14 p-4 text-base text-initi-bluefText"}
        />
      </View>

      {/* Link "Esqueci a senha" */}
      <View className={"justify-end gap-x-2 flex-row mr-16"}>
        <TouchableOpacity>
          <Link href='/tdah' className={"text-sm text-initi-orange font-bold"}>
            Esqueci a senha!
          </Link>
        </TouchableOpacity>
      </View>

      {/* Checkbox "Manter conectado" */}
      <View className={"items-start mt-[-20] ml-16"}>
        <Image className={"w-4 h-4"} source={require('@/assets/images/taskdone.png')} />
      </View>
      <View className={"items-start flex-row ml-[73] mt-[-25]"}>
        <TouchableOpacity>
          <Link href='/home' className={"text-sm text-initi-orange font-bold"}>
            Manter conectado!
          </Link>
        </TouchableOpacity>
      </View>

      {/* Botão de login */}
      <View className="items-center mt-12">
        <TouchableOpacity
          disabled={loading}
          onPress={handleLogin}
          className="items-center px-2 py-3 w-[157] h-[45] text-[19px] text-center bg-[#2D4990] rounded hover:bg-violet-[#2D4990] hover:text-white active:bg-indigo-900 focus:outline-none focus:ring">
          <Text className={"text-[19px] text-center text-initi-bluefText text-[#fdfeff]"}>
            {loading ? "Entrando..." : "Entrar"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Divisor */}
      <View className={"items-center mt-6 mr-"}>
        <Text className={"text-[13px] text-initi-bluefText font-inter text-lg"}>
          OU
        </Text>
      </View>

      {/* Link para registro */}
      <View className={"justify-center gap-x-2 flex-row mt-6"}>
        <Text className={"text-sm font-semibold text-initi-bluefText"}>
          Não possui conta?
        </Text>
        <TouchableOpacity>
          <Link href="./register" className={"text-sm font-semibold text-initi-bluefText text-[#2D4990]"}>
            Clique aqui para criar!
          </Link>
        </TouchableOpacity>
      </View>
    </View>
  );
}