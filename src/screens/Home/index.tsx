import React from 'react';
import {
  ActivityIndicator,
  Share,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from './styles';
import * as Linking from 'expo-linking';
import { Feather } from '@expo/vector-icons';
import { UsePeer } from '../../hooks/UsePeer';
import { NavigatorScreenProps } from '../../routes/types';

export function Home({ navigation }: NavigatorScreenProps) {
  const { callerId, calleeId, isCalling, handleCall, setCalleeId } = UsePeer();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Meu ID:</Text>
        <TouchableOpacity
          style={styles.field}
          onPress={() =>
            Share.share({
              message: callerId,
              title: 'Compartilhe seu ID',
            })
          }
        >
          <Text numberOfLines={1} style={[styles.title, { flex: 1 }]}>
            {callerId || 'Carregando'}
          </Text>
          <Feather name="paperclip" size={20} color={'rgba(0,0,0,0.8)'} />
        </TouchableOpacity>
        <Text style={styles.title}>ID para chamar:</Text>
        <TextInput
          value={calleeId}
          placeholder="ID para chamar..."
          style={styles.input}
          onChangeText={setCalleeId}
        />
        <TouchableOpacity
          disabled={isCalling}
          onPress={handleCall}
          style={styles.button}
        >
          {isCalling ? (
            <ActivityIndicator size={20} color="#FFFFFF" />
          ) : (
            <Text style={styles.btnTitle}>Call</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
