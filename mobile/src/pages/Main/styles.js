import styled from "styled-components/native";

import MapView from "react-native-maps";

export const MapContainer = styled(MapView)`
  flex: 1;
`;

export const MarkedImage = styled.Image`
  width: 54px;
  height: 54px;
  border-radius: 4px;
  border-width: 4px;
  border-color: #fff;
`;

export const CalloutContainer = styled.View`
  width: 260px;
`;

export const Name = styled.Text`
  font-weight: bold;
  font-size: 16px;
`;

export const Bio = styled.Text`
  color: #666;
  margin-top: 5px;
`;

export const Techs = styled.Text`
  margin-top: 5px;
`;

export const SearchForm = styled.View`
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  z-index: 5;
  flex-direction: row;
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  height: 50px;
  background-color: #fff;
  color: #333;
  border-radius: 25px;
  font-size: 16px;
`;

export const LoadButton = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  background-color: #8e4dff;
  border-radius: 25px;
  justify-content: center;
  align-items: center;
  margin-left: 15px;
`;
