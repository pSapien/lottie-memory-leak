import {useState, useRef, useEffect} from 'react';
import {View, Text, StatusBar} from 'react-native';
import LottieView from 'lottie-react-native';

StatusBar.setHidden(true);

const lottieImage = require('./assets/money_mouth_face.json');
// const lottieImage = require('./assets/lottie_airbnb_example_1.json');
// const lottieImage = require('./assets/lottie_airbnb_example_2.json');

const RE_RENDER_LIMIT = 50;
const INTERVAL_LIMIT = 1500;
const LOTTIE_VIEW_COUNT = 12;

export default function App() {
  const [show, setShow] = useState(false);
  const renderCountRef = useRef(0);

  useEffect(() => {
    const lastIntervalRef = setInterval(() => {
      if (renderCountRef.current >= RE_RENDER_LIMIT) {
        setShow(false);
        clearInterval(lastIntervalRef);
      } else {
        renderCountRef.current++;
        setShow(p => !p);
      }
    }, INTERVAL_LIMIT);
  }, []);

  if (renderCountRef.current >= RE_RENDER_LIMIT) return <Text>Done...</Text>;

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {show ? (
        Array.from({length: LOTTIE_VIEW_COUNT}).map((p, idx) => {
          return (
            <LottieView
              source={lottieImage}
              style={{height: 40, width: 40}}
              key={idx}
              autoPlay
              renderMode="HARDWARE"
            />
          );
        })
      ) : (
        <Text>Re-rendering...</Text>
      )}
    </View>
  );
}
