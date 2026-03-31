import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from "react-native";

import { STATS } from "../constants/stats";
import { createUser } from "../system/user";
import { saveUser } from "../storage/storage";

const RANK_OPTIONS = ["E", "D", "C", "B", "A", "S"];

export default function AuthScreen({ setUser }) {
  const [name, setName] = useState("");

  const [inputs, setInputs] = useState(
    STATS.reduce((acc, stat) => {
      acc[stat.key] = "E";
      return acc;
    }, {})
  );

  const handleSelect = (stat, rank) => {
    setInputs(prev => ({
      ...prev,
      [stat]: rank,
    }));
  };

  const handleStart = async () => {
    if (!name) return;

    const user = createUser(name, inputs);

    await saveUser(user);
    setUser(user);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>ARISE</Text>

      <TextInput
        placeholder="Enter your name"
        placeholderTextColor="#666"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.section}>Select Your Current Rank</Text>

      {STATS.map(stat => (
        <View key={stat.key} style={styles.statBlock}>
          <Text style={styles.label}>{stat.label}</Text>

          <View style={styles.row}>
            {RANK_OPTIONS.map(rank => (
              <TouchableOpacity
                key={rank}
                style={[
                  styles.rankBtn,
                  inputs[stat.key] === rank && styles.selected
                ]}
                onPress={() => handleSelect(stat.key, rank)}
              >
                <Text style={styles.rankText}>{rank}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.button} onPress={handleStart}>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#070707",
    padding:20
  },

  title:{
    color:"#00D1FF",
    fontSize:28,
    marginBottom:20,
    alignSelf:"center"
  },

  input:{
    borderWidth:1,
    borderColor:"#333",
    padding:10,
    color:"#fff",
    marginBottom:20
  },

  section:{
    color:"#888",
    marginBottom:10
  },

  statBlock:{
    marginBottom:15
  },

  label:{
    color:"#fff",
    marginBottom:5
  },

  row:{
    flexDirection:"row",
    flexWrap:"wrap"
  },

  rankBtn:{
    borderWidth:1,
    borderColor:"#333",
    padding:8,
    marginRight:5,
    marginBottom:5,
    borderRadius:6
  },

  selected:{
    backgroundColor:"#00D1FF"
  },

  rankText:{
    color:"#fff"
  },

  button:{
    marginTop:20,
    backgroundColor:"#00D1FF",
    padding:15,
    alignItems:"center",
    borderRadius:8
  },

  buttonText:{
    color:"#000",
    fontWeight:"bold"
  }
});