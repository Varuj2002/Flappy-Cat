import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  View,
  Button,
  TextInput,
  Switch,
  Text,
  KeyboardAvoidingView,
} from 'react-native';
import SpriteSheet, {SpriteSheetRef} from 'rn-sprite-sheet';

const CatSprite: React.FC = () => {
  const catRef = useRef<SpriteSheetRef>(null);
  const [loop, setLoop] = useState(false);
  const [resetAfterFinish, setResetAfterFinish] = useState(false);
  const [fps, setFps] = useState('10');
  const [spriteColumns, setSpriteColumns] = useState(5);

  const play = (type: string) => {
    if (catRef.current) {
      catRef.current.play({
        type,
        fps: Number(fps),
        loop,
        resetAfterFinish,
        onFinish: () => {}
      });
    }
  };

  const stop = () => {
    if (catRef.current) {
      catRef.current.stop(() => {});
    }
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <SpriteSheet
            ref={catRef}
            key={spriteColumns}
            source={require('../images/cat.png')}
            columns={spriteColumns}
            rows={5}
            imageStyle={{}}
            viewStyle={{}}
            animations={{
              tired: [0, 1, 2, 3, 4],
              rotate: Array.from({length: 8}, (v, i) => i + 5),
              hit: Array.from({length: 4}, (v, i) => i + 12),
              attack: Array.from({length: 6}, (v, i) => i + 14),
            }}
          />
        </View>
        <View style={{paddingVertical: 30, paddingHorizontal: 30}}>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            {/* <Button
              onPress={() => {
                setSpriteColumns(5);
                play('tired');
              }}
              title="tired"
            />
            <View
              style={{
                width: 25,
              }}
            />
            <Button
              onPress={() => {
                setSpriteColumns(5);
                play('rotate');
              }}
              title="rotate"
            />
            <View
              style={{
                width: 25,
              }}
            />
            <Button
              onPress={() => {
                setSpriteColumns(4);
                play('attack');
              }}
              title="attack"
            />
            <View
              style={{
                width: 25,
              }}
            />
            <Button
              onPress={() => {
                setSpriteColumns(4);
                play('hit');
              }}
              title="hit"
            /> */}
          </View>
          {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 16, marginRight: 10}}>FPS</Text>
            <TextInput
              style={{flex: 1, borderBottomWidth: 1, fontSize: 16}}
              value={fps}
              keyboardType="number-pad"
              onChangeText={setFps}
            />
          </View> */}
          {/* <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 25}}>
            <Text style={{fontSize: 16, marginRight: 10}}>Loop</Text>
            <Switch value={loop} onValueChange={setLoop} />
          </View> */}
          {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 16, marginRight: 10}}>
              Reset After Finish
            </Text>
            <Switch
              value={resetAfterFinish}
              onValueChange={setResetAfterFinish}
            />
          </View> */}
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default CatSprite;
