import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import {
  requestPermissionsAsync,
  getCurrentPositionAsync
} from "expo-location";
import { Marker, Callout } from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";

import api from "../../services/api";
import { connect, disconnect, subscribeToNewDevs } from "../../services/socket";

import {
  MapContainer,
  MarkedImage,
  CalloutContainer,
  Name,
  Bio,
  Techs,
  SearchForm,
  SearchInput,
  LoadButton
} from "./styles";

export default function Main({ navigation }) {
  const [devs, setDevs] = useState([]);
  const [currentRegion, setCurrentRegion] = useState(null);
  const [techs, setTechs] = useState("");

  useEffect(() => {
    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync();

      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true
        });

        const { latitude, longitude } = coords;

        setCurrentRegion({
          latitude: -22.1055606,
          longitude: -43.2125219,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04
        });
      }
    }

    loadInitialPosition();
  }, []);

  useEffect(() => {
    subscribeToNewDevs(dev => setDevs([...devs, dev]));
  }, [devs]);

  function setupWebSocket() {
    disconnect();

    const { latitude, longitude } = currentRegion;

    connect(latitude, longitude, techs);
  }

  async function loadDevs() {
    const { latitude, longitude } = currentRegion;

    const response = await api.get("/search", {
      params: {
        latitude,
        longitude,
        techs: techs
      }
    });

    setDevs(response.data.devs);
    setupWebSocket();
  }

  function handleRegionChanged(region) {
    setCurrentRegion(region);
  }

  if (!currentRegion) return null;

  return (
    <>
      <MapContainer
        onRegionChangeComplete={handleRegionChanged}
        initialRegion={currentRegion}
      >
        {devs.map(dev => (
          <Marker
            key={dev._id}
            coordinate={{
              latitude: dev.location.coordinates[1],
              longitude: dev.location.coordinates[0]
            }}
          >
            <MarkedImage
              source={{
                uri: dev.avatar_url
              }}
            />
            <Callout
              onPress={() => {
                navigation.navigate("Profile", {
                  github_username: dev.github_username
                });
              }}
            >
              <CalloutContainer>
                <Name>{dev.name}</Name>
                <Bio>{dev.bio}</Bio>
                <Techs>{dev.techs.join(", ")}</Techs>
              </CalloutContainer>
            </Callout>
          </Marker>
        ))}
      </MapContainer>

      <SearchForm>
        <SearchInput
          placeholder="Buscar devs por techs..."
          style={styles.searchInput}
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs}
        />

        <LoadButton onPress={loadDevs}>
          <MaterialIcons name="my-location" size={20} color="#FFF" />
        </LoadButton>
      </SearchForm>
    </>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4
    },
    elevation: 2
  }
});
