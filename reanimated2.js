import React from 'react'
import { StyleSheet, Text, View,Image,ImageBackground, StatusBar } from 'react-native'
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    useAnimatedScrollHandler,
    interpolate,
    interpolateColors
} from 'react-native-reanimated';



const WhatsappScrollAnim = () => {

    const translationY = useSharedValue(0); 

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event)=>{
         translationY.value = event.contentOffset.y
        }
    });
    
      const stylez = useAnimatedStyle(() => {
        const scale = interpolate(translationY.value, [0, 200], [0, -200], { extrapolate: 'clamp' });
        const imageOpacity = interpolate(translationY.value,[0,200],[1,0],{extrapolate:'clamp'})
        return {
          transform: [
            {
              translateY: scale
            },
          ],
          opacity:imageOpacity
        };
      });



      const namePosition = useAnimatedStyle(()=>{
       const leftPosition = interpolate(translationY.value,[0,200],[0,90],{extrapolate:'clamp'}) 

        return {
          left:leftPosition
        }
      })

      const bgColor = Animated.interpolateColors(translationY.value, {
        inputRange: [0, 200],
        outputColorRange: ['skyblue','white'],
        extrapolate:'clamp'
      });

    //   console.log(translationY.value)

    return (
        <View style={styles.mainContainer}>
            <StatusBar barStyle='light-content' translucent={true} backgroundColor={'transparent'} />
            <Animated.View style={[{...StyleSheet.absoluteFillObject},{backgroundColor:bgColor}]}>
            <Animated.View style={[{width:'100%',height:300},stylez]}>
            <Image source={require('../images/imgOne.jpg')} style={{width:'100%',height:'100%'}} />
            </Animated.View> 
            </Animated.View>

            <View style={[{...StyleSheet.absoluteFillObject},styles.overView]}>
             <Animated.ScrollView
             onScroll={scrollHandler}
             style={{flex:1}}>
                 <View style={{width:'100%',height:300,backgroundColor:'transparent'}} />
                 <View style={{width:'100%',height:800,backgroundColor:'white'}}>
                <Animated.View style={[{position:'absolute',top:-40,paddingLeft:20},namePosition]}>
                 <Text style={styles.textOne}>Elizabeth Brooks</Text>
                 </Animated.View>
                 </View>
             </Animated.ScrollView>
            </View>



        </View>
    )
}

export default WhatsappScrollAnim

const styles = StyleSheet.create({
    mainContainer:{
      flex:1
    },
    backimageView:{
        // backgroundColor:'green',
    },
    overView:{
        // backgroundColor:'blue'
    },
    textOne:{
      fontSize:24,
      color:'white'
    }
})
