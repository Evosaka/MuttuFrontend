import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { useAtom } from "jotai";
import { scalesAtom, usernameAtom, } from '../stores';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

interface Scale {
  id: number;
  name: string;
  description: string;
  type: string;
  createdBy: number;
}

interface Association {
  id: number;
  userId: number;
  scaleId: number;
  completed: boolean;
  user: User;
  scale: Scale;
}

export default function PatientScaleAssociation() {
  const router = useRouter();
  const [username] = useAtom(usernameAtom);
  const [scales, setScales] = useAtom(scalesAtom);
  const [patients, setPatients] = useState<User[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [associations, setAssociations] = useState<{ [key: number]: Association[] }>({});
  const [processingAssociation, setProcessingAssociation] = useState<{ 
    patientId: number | null; 
    scaleId: number | null 
  }>({ patientId: null, scaleId: null });

  const handleResponse = async (response: Response) => {
    const text = await response.text();
    
    // Tratar resposta vazia para DELETE bem-sucedido
    if (response.status === 204) return { success: true };
    
    try {
      const data = text ? JSON.parse(text) : {};
      if (!response.ok) throw new Error(data.message || `HTTP ${response.status}`);
      return data;
    } catch (e) {
      throw new Error(`Resposta inválida: ${text.slice(0, 100)}...`);
    }
  };

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const [usersResponse, scalesResponse, associationsResponse] = await Promise.all([
        fetch("https://muttu-backend.vercel.app/api/users"),
        fetch("https://muttu-backend.vercel.app/api/all-scales"),
        fetch("https://muttu-backend.vercel.app/api/all-associations")
      ]);

      const usersData = await handleResponse(usersResponse);
      const scalesData = await handleResponse(scalesResponse);
      const associationsData = await handleResponse(associationsResponse);

      const associationsMap: { [key: number]: Association[] } = {};
      associationsData.forEach((association: Association) => {
        if (!associationsMap[association.userId]) {
          associationsMap[association.userId] = [];
        }
        associationsMap[association.userId].push(association);
      });

      setPatients(usersData.filter((user: User) => user.role === 'PATIENT'));
      setScales(scalesData);
      setAssociations(associationsMap);

    } catch (err) {
      let errorMessage = "Erro ao carregar dados";
      if (err instanceof Error) {
        errorMessage = err.message.startsWith("Resposta inválida:") 
          ? "Formato de resposta inesperado do servidor" 
          : err.message;
      }
      setError(errorMessage);
      console.error("Erro completo:", err);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );

  const handleAssociation = async (patientId: number, scaleId: number) => {
    setProcessingAssociation({ patientId, scaleId });
  
    try {
      const isAssociated = associations[patientId]?.some(a => a.scaleId === scaleId);
  
      if (isAssociated) {
        console.log("Tentando desassociar:", patientId, scaleId);
        
        const response = await fetch(`https://muttu-backend.vercel.app/api/desassociate-scale`, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({ 
            userId: patientId, 
            scaleId 
          }),
        });
  
        const data = await response.text();
        console.log("Resposta da API:", response.status, data);
  
        if (!response.ok) throw new Error(`Erro ao desassociar: ${response.status}`);
  
        setAssociations(prev => ({
          ...prev,
          [patientId]: prev[patientId].filter(a => a.scaleId !== scaleId)
        }));
  
      } else {
        console.log("Tentando associar:", patientId, scaleId);
  
        const response = await fetch(`https://muttu-backend.vercel.app/api/associate-scale`, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({ 
            userId: patientId, 
            scaleId,
            therapist: username
          }),
        });
  
        const data = await response.json();
        console.log("Resposta da API (associar):", data);
  
        if (!response.ok) throw new Error(`Erro ao associar: ${response.status}`);
  
        setAssociations(prev => ({
          ...prev,
          [patientId]: [...(prev[patientId] || []), { 
            id: Date.now(),
            userId: patientId,
            scaleId,
            completed: false,
            user: patients.find(p => p.id === patientId)!,
            scale: scales.find(s => s.id === scaleId)!
          }]
        }));
      }
  
    } catch (error) {
      console.error('Erro detalhado:', error);
      Alert.alert("Erro","Operação falhou. Tente novamente.");
      loadData();
    } finally {
      setProcessingAssociation({ patientId: null, scaleId: null });
    }
  };
  

  const isScaleAssociated = (patientId: number, scaleId: number) => {
    return associations[patientId]?.some(a => a.scaleId === scaleId);
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#E8C4AC]">
        <ActivityIndicator size="large" color="#2D4990" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-[#E8C4AC]">
        <Text className="text-red-500 text-lg">{error}</Text>
        <TouchableOpacity onPress={loadData} className="mt-4 p-2 bg-[#2D4990] rounded">
          <Text className="text-white">Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#E8C4AC]">
      <ScrollView className="p-4">
        <Text className="text-2xl font-bold text-[#2D4990] mb-4 mt-16">Pacientes</Text>
        
        {patients.map((patient) => (
          <View key={patient.id} className="mb-4 bg-[#ffffff7b] rounded-lg p-4">
            <TouchableOpacity onPress={() => setSelectedPatient(patient.id === selectedPatient ? null : patient.id)}>
              <Text className="text-lg font-semibold text-[#2D4990]">
                {patient.username}
              </Text>
              <Text className="text-gray-600">{patient.email}</Text>
              <Text className="text-sm text-gray-500 mt-1">
                {associations[patient.id]?.length || 0} escalas associadas
              </Text>
            </TouchableOpacity>

            {selectedPatient === patient.id && (
              <View className="mt-4">
                <Text className="text-md font-bold text-[#2D4990] mb-2">Escalas Disponíveis</Text>
                
                {scales.map((scale) => {
                  const associated = isScaleAssociated(patient.id, scale.id);
                  const isProcessing = processingAssociation.patientId === patient.id && 
                                    processingAssociation.scaleId === scale.id;

                  return (
                    <TouchableOpacity
                      key={scale.id}
                      className={`p-3 rounded-lg mb-2 ${associated ? 'bg-red-100' : 'bg-green-100'}`}
                      onPress={() => handleAssociation(patient.id, scale.id)}
                      disabled={isProcessing}
                    >
                      <View className="flex-row justify-between items-center">
                        <View>
                          <Text className={`font-medium ${associated ? 'text-red-600' : 'text-green-600'}`}>
                            {scale.name}
                          </Text>
                          <Text className="text-gray-600 text-sm">{scale.description}</Text>
                        </View>
                        
                        {isProcessing ? (
                          <ActivityIndicator 
                            size="small" 
                            color={associated ? '#dc2626' : '#16a34a'} 
                          />
                        ) : (
                          <Text className={`font-bold ${associated ? 'text-red-600' : 'text-green-600'}`}>
                            {associated ? 'REMOVER' : 'ASSOCIAR'}
                          </Text>
                        )}
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </View>
        ))}
      </ScrollView>

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
    </View>
  );
}