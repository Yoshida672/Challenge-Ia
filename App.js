import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

const PatioPlanta = () => {
  const [tags, setTags] = useState([]);
  
  // Função para pegar as posições mais recentes
  const fetchTags = async () => {
    try {
      const response = await fetch('http://10.3.75.15:8080/tags');  // Altere para seu endpoint
      const data = await response.json();
      setTags(data.content || []);
    } catch (error) {
      console.error('Erro ao buscar tags:', error);
    }
  };

  useEffect(() => {
    fetchTags();  // Chama logo ao iniciar

    const intervalId = setInterval(() => {
      fetchTags();  // Chama a cada 3 segundos (3000 ms)
    }, 3000);  // Ajuste o tempo conforme necessário

    // Limpeza do interval quando o componente for desmontado
    return () => clearInterval(intervalId);
  }, []);

  const maxX = 10; // Largura máxima do pátio (em metros ou outra unidade)
  const maxY = 10; // Altura máxima do pátio (em metros ou outra unidade)

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./assets/mapa-patio.png')}  // Imagem do mapa
        style={styles.planta}
        resizeMode="contain"
      >
        {tags
          .filter(tag => tag.localizacao)  // Ignora tags que não possuem localizacao
          .map(tag => {
            const { xCoord, yCoord } = tag.localizacao;

            return (
              <View
                key={tag.id}
                style={{
                  position: 'absolute',
                  left: `${(xCoord / maxX) * 100}%`,  // Calcula a posição relativa
                  top: `${(yCoord / maxY) * 100}%`,    // Calcula a posição relativa
                  transform: [{ translateX: -8 }, { translateY: -8 }],
                }}
              >
                <View style={styles.tagMarker}>
                  <Text style={styles.tagText}>{tag.codigo}</Text>
                </View>
              </View>
            );
          })}
      </ImageBackground>
    </View>
  );
};

export default PatioPlanta;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  planta: {
    width: '100%',
    height: 400, // altura fixa para garantir que aparece
    borderWidth: 1,
    borderColor: 'blue',
  },
  tagMarker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagText: {
    color: 'white',
    fontSize: 8,
    fontWeight: 'bold',
  },
});
