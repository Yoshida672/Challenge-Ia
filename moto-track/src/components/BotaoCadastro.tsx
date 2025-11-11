import React from "react";
import BotaoAnimado from "./BotaoAnimado";

interface BotaoCadastroMotoProps {
  onPress: () => void;
  isEditing: boolean;
  label: string;
  labelEdit: string;
}

export default function BotaoCadastro({
  onPress,
  isEditing,
  label,
  labelEdit,
}: BotaoCadastroMotoProps) {
  return (
    <BotaoAnimado
      label={isEditing ? labelEdit : label}
      onPress={onPress}
      marginTop={20}
    />
  );
}
