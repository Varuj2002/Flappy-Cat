import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { GameEngine } from "react-native-game-engine";
import Physics from "./physics";
import BackgroundAnimation from "./src/components/BackgroundAnimation/index";
import entities from "./src/entities/index";

export default function App() {
  const [running, setRunning] = useState(false);
  const [gameEngine, setGameEngine] = useState(null);
  const [currentPoints, setCurrentPoints] = useState(0);
  useEffect(() => {
    setRunning(false);
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <BackgroundAnimation />
      <GameEngine
        ref={(ref) => {
          setGameEngine(ref);
        }}
        systems={[Physics]}
        entities={entities()}
        running={running}
        onEvent={(e) => {
          switch (e.type) {
            case "game_over":
              break;
            case "new_point":
              setCurrentPoints(currentPoints + 1);
              break;
            default:
              return;
          }
        }}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'transparent', }}
      >
      </GameEngine>
   <Text
        style={{
          textAlign: "center",
          fontSize: 40,
          fontWeight: "bold",
          margin: 20,
          color: '#202123'
        }}
      >
        {currentPoints}
      </Text>
      {!running ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "black",
              paddingHorizontal: 30,
              paddingVertical: 10
            }}
            onPress={() => {
              setCurrentPoints(0);
              setRunning(true);
              gameEngine?.swap(entities());
            }}
          >
            <Text style={{ fontWeight: "bold", color: "white", fontSize: 30 }}>
              START GAME
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}
