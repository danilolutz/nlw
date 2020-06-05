import React, { useEffect, useState } from 'react';
import { Feather as Icon} from '@expo/vector-icons';
import {StyleSheet, ActivityIndicator, ImageBackground, Image, Text, View} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';

interface IBGEUFResponse
{
    sigla:string;
}

interface IBGECityResponse
{
    id: number;
    nome:string;
}

interface Option
{
  key: string;
  value: string;
  label: string;
}

const Home = () => {
    const navigation = useNavigation();
    const [loadingCity, setLoadingCity] = useState<boolean>(false); 
    const [ufs, setUfs] = useState<Option[]>([]);
    const [cities, setCities] = useState<Option[]>([]);

    const [selectedUf, setSelectedUf] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');

    useEffect(() => {
      axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome').then(response => {
          const ufInitials = response.data.map(uf => ({ key: uf.sigla, value: uf.sigla, label: uf.sigla }));
          setUfs(ufInitials);
      });
  }, []);

  useEffect(() => {
      if (selectedUf === '0') {
          return;
      }
      setLoadingCity(true);
      axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios?orderBy=nome`).then(response => {
          const cities = response.data.map(city => ({ key: String(city.id), value: city.nome, label: city.nome }));
          setCities(cities);
      });
      setLoadingCity(false);
  }, [selectedUf]);

  function handleSelectUf(uf: string) {
      setSelectedUf(uf);
  }

  function handleSelectCity(city: string) {
      setSelectedCity(city);
  }

    function handleNavigationToPoints() {
        navigation.navigate('Points', {
          uf: selectedUf,
          city: selectedCity,
        });
    }

    return (
        <ImageBackground 
            source={require('../../assets/home-background.png')} 
            style={styles.container}
            imageStyle={{ width: 274, height: 368 }}
        >
            <View style={styles.main}>
                <Image source={require('../../assets/logo.png')} />
                <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
                <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
            </View>

            <View style={styles.footer}>
                <RNPickerSelect
                  useNativeAndroidPickerStyle={false}
                  style={{
                    ...pickerSelectStyles,
                    iconContainer: {
                      top: 25,
                      right: 10,
                    },
                  }}
                  onValueChange={(value) => handleSelectUf(value)}
                  placeholder={{ value: '0', label: "Selecione um Estado(UF)"}}
                  items={ufs}
                  Icon={() => {
                    return (
                      <View
                        style={{
                          backgroundColor: 'transparent',
                          borderTopWidth: 10,
                          borderTopColor: '#aaa',
                          borderRightWidth: 10,
                          borderRightColor: 'transparent',
                          borderLeftWidth: 10,
                          borderLeftColor: 'transparent',
                          width: 0,
                          height: 0,
                        }}
                      />)}}
                />

                { loadingCity ? (<ActivityIndicator color="#666" />) : (
                  <RNPickerSelect
                      useNativeAndroidPickerStyle={false}
                      onValueChange={(value) => handleSelectCity(value)}
                      placeholder={{ value: '0', label: "Selecione uma cidade"}}
                      style={{
                        ...pickerSelectStyles,
                        iconContainer: {
                          top: 25,
                          right: 10,
                        },
                      }}
                      items={cities}
                      Icon={() => {
                        return (
                          <View
                            style={{
                              backgroundColor: 'transparent',
                              borderTopWidth: 10,
                              borderTopColor: '#aaa',
                              borderRightWidth: 10,
                              borderRightColor: 'transparent',
                              borderLeftWidth: 10,
                              borderLeftColor: 'transparent',
                              width: 0,
                              height: 0,
                            }}
                          />)}}
                  />)}
              

                <RectButton style={styles.button} onPress={() => handleNavigationToPoints()}>
                    <View style={styles.buttonIcon}>
                        <Text>
                            <Icon name="arrow-right" color="#FFF" size={24} />
                        </Text>
                    </View>
                    <Text style={styles.buttonText}>
                        Entrar
                    </Text>
                </RectButton>
            </View>
        </ImageBackground>
    )
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },
  inputAndroid: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 4,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },
});

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
    },
  
    main: {
      flex: 1,
      justifyContent: 'center',
    },
  
    title: {
      color: '#322153',
      fontSize: 32,
      fontFamily: 'Ubuntu_700Bold',
      maxWidth: 260,
      marginTop: 64,
    },
  
    description: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 16,
      fontFamily: 'Roboto_400Regular',
      maxWidth: 260,
      lineHeight: 24,
    },
  
    footer: {},
  
    select: {},
  
    input: {
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16,
    },
  
    button: {
      backgroundColor: '#34CB79',
      height: 60,
      flexDirection: 'row',
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: 'center',
      marginTop: 8,
    },
  
    buttonIcon: {
      height: 60,
      width: 60,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    buttonText: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
      color: '#FFF',
      fontFamily: 'Roboto_500Medium',
      fontSize: 16,
    }
  });

  export default Home;