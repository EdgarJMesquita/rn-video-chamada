import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { UseAuth } from "../../hooks/UseAuth";
import { styles } from "./styles";

export function Register() {
  const { signIn } = UseAuth();
  const [input, setInput] = useState("");

  function handleRegister() {
    if (!input) return alert("Nome é obrigatório");
    signIn(input);
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Digite seu nome:</Text>
        <TextInput
          value={input}
          placeholder="Jon Doe..."
          style={styles.input}
          onChangeText={setInput}
        />
        <TouchableOpacity
          disabled={!input}
          onPress={handleRegister}
          style={styles.button}
        >
          <Text style={styles.btnTitle}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
