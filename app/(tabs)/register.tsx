


import React, { Component, useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import {Link, router} from 'expo-router'


export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  async function Signin() {
    setLoading(true);
    if (email === "" || password === "" ) {
      Alert.alert("Preencha os campos!");
      setLoading(false);

      return;

    }

    if (password.length < 8){
      Alert.alert("Preencha a senha com no mínimo 8 caracteres!");
      setLoading(false);

      return
    }

    if (password !== password2){
      Alert.alert("As senhas não coincidem!");
      setLoading(false);

      return;
    }

    const response = await fetch("https://muttu-backend.vercel.app/api/create-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: name,
        email: email,
        password: password,

      }),
    });

    const data = await response.json();
    console.log(data);
    console.log(data.token);
    console.log(data.user.id);
    console.log(data.user.username);

    if (data.success) {
      Signin();
      setLoading(false);
      router.push({ pathname: "/home", params: { username: data.user.username } });
    }
    console.log("Email:", email);
    console.log("Password:", password);
  };

  const [loading, setLoading] = useState(false);


  return (
    <View className={" pt-50 gap-2 flex-1 bg-[#E8C4AC] justify-center"}>
    
          <View className={" items-center mb-8"}>
            <Text className={" text-[26px] text-center text-initi-bluefText font-bold"}>
              Bem vindo(a)!
            </Text>
          </View>
    
          <View className={"items-center mt-9 px-16"}>
            <Text className={" text-[15px] text-initi-bluefText font-inter text-lg"}>
                Preencha os detalhes da sua nova conta!
            </Text>
          </View>
    
          <View className={" items-center mt-6 gap-5"}>
            <TextInput
              placeholder="Nome Completo"
              value={name}
              onChangeText={setName}
              className={
                "bg-[#ffffff60] border-initi-bluefText w-80 rounded-lg h-14 p-4 text-base"
              }
            />
            <TextInput
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              className={
                "bg-[#ffffff60]  border-initi-bluefText w-80 rounded-lg h-14 p-4 text-base text-initi-bluefText"
              }
            />

          <TextInput
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              autoCapitalize="none"
              className={
                "bg-[#ffffff60]  border-initi-bluefText w-80 rounded-lg h-14 p-4 text-base text-initi-bluefText"
              }
            />

            <TextInput
              placeholder="Confirme sua senha"
              value={password2}
              onChangeText={setPassword2}
              secureTextEntry={true}
              autoCapitalize="none"
              className={
                "bg-[#ffffff60]  border-initi-bluefText w-80 rounded-lg h-14 p-4 text-base text-initi-bluefText"
              }
            />
        </View>

          <View className=" items-center mt-12">
                  <TouchableOpacity
                    disabled={loading}
                    onPress={Signin} 
                    className=" items-center px-2 py-3 w-[157] h-[45] text-[19px] text-center bg-[#2D4990] rounded hover:bg-violet-[#2D4990] hover:text-white active:bg-indigo-900 focus:outline-none focus:ring">
                    <Text className={" text-[19px] text-center text-initi-bluefText text-[#fdfeff]"}>
                      {loading ? "Entrando..." : "Entrar"}
                    </Text>
                  </TouchableOpacity>
                </View>
    
          <View className={" justify-center gap-x-2 flex-row mt-6"}>
            <TouchableOpacity>
              <Text className={"text-sm text-initi-orange font-bold"}>
                Manter conectado!
              </Text>
            </TouchableOpacity>
          </View>
    
          <View className={"items-center mt-6 mr-"}>
            <Text className={" text-[13px] text-initi-bluefText font-inter text-lg"}>
            OU
            </Text>
          </View>
    
          <View className={" justify-center gap-x-2 flex-row mt-6 "}>
            <Text className={" text-sm font-semibold text-initi-bluefText"}>
            Já possui conta?
            </Text>
            <TouchableOpacity>
              <Link href="./login" className={" text-sm font-semibold text-initi-bluefText text-[#2D4990]"}>
              Clique aqui para Entrar!
              </Link>
            </TouchableOpacity>
          </View>
        </View>
  )
};