import React, { useEffect, useRef } from 'react';
import {
  SafeAreaView,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import SpriteSheet, { SpriteSheetRef } from 'rn-sprite-sheet';

const CoinSprite: React.FC = () => {
  const catRef = useRef<SpriteSheetRef>(null);

  const play = (type: string) => {
    if (catRef.current) {
      catRef.current.play({
        type,
        fps: 10,
        loop: true,
        resetAfterFinish: false,
        onFinish: () => { }
      });
    }
  };

  const stop = () => {
    if (catRef.current) {
      catRef.current.stop(() => { });
    }
  };


  useEffect(() => {
    if (catRef.current) {
      play('rotate')
    }
  }, [])

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <SpriteSheet
            ref={catRef}
            source={require('../images/coin.png')}
            columns={5}
            rows={2}
            imageStyle={{}}
            viewStyle={{}}
            animations={{
              rotate: [0, 1, 2, 3, 4, 5, 8, 9, 10]
            }}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default CoinSprite;
