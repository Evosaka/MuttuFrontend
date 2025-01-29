


  import React, { Component, useState } from "react";
  import {
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    Alert,
  } from "react-native";
  import {Link} from 'expo-router'
  
  const ViewStyled = View;
  const ImageStyled = Image;
  const TextStyled = Text;
  const ButtonStyled =  TouchableOpacity;
  const TextInputStyled = TextInput;
  const LinkStyled = Link;
  
  export default function HomeScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const Login = () => {
      console.log("Email:", email);
      console.log("Password:", password);
    };
  
    const [loading, setLoading] = useState(false);
  
  
    return (
      <ViewStyled className={" flex-1 bg-red-200 justify-center"}>
        <ViewStyled className={" items-center mt-6"}>
          <TextStyled className={" text-[36px] text-initi-bluefText font-black"}>
            Bem vindo de volta!
          </TextStyled>
        </ViewStyled>
  
        <ViewStyled className={" ml-14 mt-3"}>
          <TextStyled className={" text-initi-bluefText font-bold text-lg"}>
            Prencha suas credenciais:
          </TextStyled>
        </ViewStyled>
  
        <ViewStyled className={" items-center mt-6"}>
          <TextInputStyled
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            className={
              " border-2 border-initi-bluefText w-72 rounded-xl mb-6 h-14 p-4 text-base"
            }
          />
          <TextInputStyled
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            className={
              " border-2 border-initi-bluefText w-72 rounded-xl h-14 p-4 text-base text-initi-bluefText"
            }
          />
        </ViewStyled>
  
        <ViewStyled className={" items-center m-2 pl-14 gap-x-16 flex-row "}>
          <TextStyled className={" text-initi-bluefText"}>
            Manter conectado
          </TextStyled>
          <TextStyled className={" text-initi-bluefText"}>
            Esqueci a senha
          </TextStyled>
        </ViewStyled>
  
        <ViewStyled className=" items-center mt-6">
          <ButtonStyled
            disabled={loading}
            
            className=" bg-initi-bluefText w-48 h-12 rounded-[12px] justify-center"
          >
            <LinkStyled href="/dashboard" className=" text-center text-initi-bgGrey text-[20px] font-semibold">
              {loading ? "Entrando..." : "Entrar"}
            </LinkStyled>
          </ButtonStyled>
        </ViewStyled>
  
        <ViewStyled className={" justify-center gap-x-2 flex-row mt-6 "}>
          <TextStyled className={" text-sm font-semibold text-initi-bluefText"}>
            Não possui conta?
          </TextStyled>
          <ButtonStyled>
            <TextStyled className={"text-sm text-initi-orange font-bold"}>
              Clique aqui para criar!
            </TextStyled>
          </ButtonStyled>
        </ViewStyled>
      </ViewStyled>
    );
  }