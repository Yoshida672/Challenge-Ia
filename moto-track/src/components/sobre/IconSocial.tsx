import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { useTheme } from "~/src/context/ThemeContext";
import * as Linking from "expo-linking";

interface IconSocialProps {
  url: string;
  source: any;
}

export default function IconSocial({ url, source }: IconSocialProps) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity onPress={() => Linking.openURL(url)}>
      <Image
        source={source}
        style={{ width: 32, height: 32, tintColor: colors.buttonBackground }}
      />
    </TouchableOpacity>
  );
}
