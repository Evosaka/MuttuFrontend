import React from "react";
import { Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams, Link } from "expo-router";
import BottomNavBar from "./navbarPa";
import { usernameAtom, emailidAtom } from "../stores";
import { useAtom } from "jotai";





export default function Config() {
    const router = useRouter();

    const [username] = useAtom(usernameAtom); // <- isso precisa estar aqui dentro
    const { username: usernameParam } = useLocalSearchParams();

    const [email] = useAtom(emailidAtom);
    console.log("Email no Config:", email);
    console.log("Username no Config:", username);

    return (
        <View className="flex-1 p-4" style={{ backgroundColor: '#142142' }}>

            <View className="absolute top-0 left-0 right-0 bg-[#2D4990] h-24 z-50 flex-row items-center">
                <TouchableOpacity onPress={() => router.back()} className="ml-4">
                    <Image
                        className="w-7 h-7 mt-8"
                        style={{ tintColor: '#ffffff' }}
                        source={require('@/assets/images/arrow.png')}
                    />
                </TouchableOpacity>

                <Text className="text-white text-xl ml-2 font-serif mt-8">
                    Configurações
                </Text>
            </View>

            <ScrollView
                className="flex-1 pt-20" // Padding-top igual à altura da TopBar
                contentContainerStyle={{ paddingBottom: 80 }} // Espaço para o BottomNavBar
            >

                <View className="items-start ml-6 mt-8">
                    <Text className="text-[25px] text-initi-blue font-alegreya-sans text-white font-serif">
                        Informações Pessoais:
                    </Text>
                </View>

                <View className="items-start ml-6 mt-4">
                    <Text className="text-[22px] text-initi-blue font-alegreya-sans text-white">
                        Nome
                    </Text>
                </View>

                <View className="items-start ml-6 mt-1">
                    <Text className="text-[18px] font-alegreya-sans" style={{ color: '#d3d3d3' }}>
                        {username || usernameParam || "Úsuario não encontrado"}
                    </Text>
                </View>

                <View className="items-start ml-6 mt-5">
                    <Text className="text-[22px] text-initi-blue font-alegreya-sans text-white">
                        Email
                    </Text>
                </View>

                <View className="items-start ml-6 mt-1" >
                    <Text className="text-[18px] text-initi-blue font-alegreya-sans" style={{ color: '#d3d3d3' }}>
                        {email}
                    </Text>
                </View>

                <View className="items-start ml-6 mt-10">
                    <Text className="text-[25px] text-initi-blue font-alegreya-sans text-white font-serif">
                        Informações Muttu:
                    </Text>
                </View>

                <View className="items-start ml-6 mt-1">
                    <Text className="text-[12px] font-alegreya-sans " style={{ color: '#d3d3d3', textAlign: 'justify' }}>
                        Somos psicólogos especializados em Mapeamento de Saúde Mental e intervenções psicológicas para empresas, com foco na promoção do bem-estar e na adequação às normas trabalhistas.
                        Desde a aprovação da Lei 14.831, em março de 2024, e em conformidade com a NR-1, a Muttu tem auxiliado empresas na identificação de riscos psicossociais e na implementação de estratégias eficazes para a saúde mental no ambiente corporativo.
                    </Text>
                    </View>

                    <View className="items-center mt-10">
                        <Image className="w-40 h-40" source={require('@/assets/images/timemuttu.png')} resizeMode="contain" />
                    </View>

                    <View className="flex-row gap-5 justify-center items-center mt-10">

                        <TouchableOpacity onPress={() => router.push("https://www.instagram.com/muttu.psi/")}>
                            <Image
                                className="w-8 h-8"
                                style={{ tintColor: '#ffffff' }}
                                source={require('@/assets/images/instagram.png')}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => router.push("https://www.linkedin.com/in/muttu-psicologia-97b76b25b/")}>
                            <Image
                                className="w-8 h-8"
                                style={{ tintColor: '#ffffff' }}
                                source={require('@/assets/images/linkedin.png')}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => router.push("https://api.whatsapp.com/send/?phone=%2B5511913564050&text&type=phone_number&app_absent=0")}>
                            <Image
                                className="w-8 h-8"
                                style={{ tintColor: '#ffffff' }}
                                source={require('@/assets/images/whatsapp.png')}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => router.push("mailto:psicologia@muttu.com.br")}>
                            <Image
                                className="w-8 h-8"
                                style={{ tintColor: '#ffffff' }}
                                source={require('@/assets/images/email.png')}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => router.push("https://www.google.com/maps/@-23.5731434,-46.6893129,3a,72.3y,55.65h,87.04t/data=!3m7!1e1!3m5!1si85v9_8PWX0FxQe3Qr7-oQ!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D2.955116448442695%26panoid%3Di85v9_8PWX0FxQe3Qr7-oQ%26yaw%3D55.64541481064011!7i16384!8i8192?entry=ttu&g_ep=EgoyMDI1MDQwNi4wIKXMDSoASAFQAw%3D%3Dhttps://www.google.com/maps/@-23.5731434,-46.6893129,3a,72.3y,55.65h,87.04t/data=!3m7!1e1!3m5!1si85v9_8PWX0FxQe3Qr7-oQ!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D2.955116448442695%26panoid%3Di85v9_8PWX0FxQe3Qr7-oQ%26yaw%3D55.64541481064011!7i16384!8i8192?entry=ttu&g_ep=EgoyMDI1MDQwNi4wIKXMDSoASAFQAw%3D%3D")}>
                            <Image
                                className="w-8 h-8"
                                style={{ tintColor: '#ffffff' }}
                                source={require('@/assets/images/localizacao.png')}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>

                    <View className="items-center mt-">
                        <Link href="https://muttu.com.br/" className=" text-lg font-alegreya-sans mt-">
                            <Text style={{ color: '#2e799f', textDecorationLine: 'underline' }}>Clique aqui e visite nosso site!</Text>
                        </Link>
                    </View>

                    <View className="flex-row items-center justify-center mt-14">
                            <TouchableOpacity
                              className="px-6 py-3 mx-2 rounded-lg"
                              style={{ backgroundColor: '#902d2d' }}
                              onPress={() => router.push("/")}
                            >
                              <Text className="text-white font-extrabold">Desconectar</Text>
                            </TouchableOpacity>
                    </View>

                    
            </ScrollView>

        </View>
    );
}