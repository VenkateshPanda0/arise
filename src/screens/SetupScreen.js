import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

import { STATS } from "../constants/stats";
import { createUser } from "../system/user";
import { saveUser } from "../storage/storage";

export default function SetupScreen({ onComplete }) {
  const [name, setName] = useState("");

  const [inputs, setInputs] = useState(
    STATS.reduce((acc, statObj) => ({
      ...acc,
      [statObj.key]: "MID"
    }), {})
  );

  const setStat = (stat, value) => {
    setInputs({ ...inputs, [stat]: value });
  };

  const start = async () => {
    if (!name.trim()) return;
    const user = createUser(name, inputs);
    await saveUser(user);
    onComplete(user);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ARISE</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter name"
        placeholderTextColor="#555"
        value={name}
        onChangeText={setName}
      />

      {STATS.map(statObj => {
        const stat = statObj.key;

        return (
          <View key={stat} style={styles.row}>
            <Text style={styles.stat}>{statObj.label}</Text>

            {["LOW","MID","HIGH"].map(level => (
              <TouchableOpacity
                key={level}
                style={[styles.option, inputs[stat]===level && styles.active]}
                onPress={()=>setStat(stat, level)}
              >
                <Text style={styles.text}>{level}</Text>
              </TouchableOpacity>
            ))}
          </View>
        );
      })}

      <TouchableOpacity style={styles.button} onPress={start}>
        <Text style={{color:"#000"}}>START</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,backgroundColor:"#0A0A0A",padding:20},
  title:{color:"#fff",fontSize:28,marginBottom:20},
  input:{borderBottomWidth:1,borderColor:"#333",color:"#fff"},
  row:{flexDirection:"row",alignItems:"center",marginVertical:5},
  stat:{width:120,color:"#fff"},
  option:{padding:6,borderWidth:1,borderColor:"#333",marginHorizontal:3},
  active:{borderColor:"#00D1FF"},
  text:{color:"#fff"},
  button:{marginTop:20,padding:15,backgroundColor:"#00D1FF",alignItems:"center"}
});