import { StyleSheet, Text, View, Dimensions, LayoutAnimation, Platform,UIManager } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import FocusAwareStatusBar from '../../../Components/AbstractComponents/statusbarConfiguration'
import ScreenContainer from '../../../Components/AbstractComponents/abstractScreenContainer'
import { Colors, Fonts } from '../../../themes'
import AbstractStatusBarHeight from '../../../Components/AbstractComponents/abstractStatusBarHeight'
import AbstractStepsBottomsheet from '../../../Components/AbstractComponents/abstractStepsBottomSheet'
import { moderateScale } from 'react-native-size-matters'
import SelectLocation from './selectLocation'
import SelectType from './selectType'
import SelectDate from './selectDate'

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

const SW = Dimensions.get('window').width
const SH = Dimensions.get('window').height

const HeaderTwo = () => {
    return (
        <View style={[styles.viewTwo]}>
            <View style={[{ width: '55%', marginBottom: 20 }]}>
                <Text style={styles.textOne}>
                    What are you looking for?
                </Text>
            </View>
        </View>
    )
}


const HeaderThree = () => {
    return (
        <View style={[styles.viewTwo,]}>
                <View style={{ width: '55%',marginBottom:20 }}>
                    <Text style={styles.textOne}>
                        When will you be there?
                    </Text>
                </View>
        </View>
    )
}

const SearchScreen = () => {

    const [firstStep, setFirstStep] = useState(true)
    const [secondStep, setSecondStep] = useState(false)
    const [thirdStep, setThirdStep] = useState(false)

    let CustomAnimation = {
        duration: 500,
        create: {
          type: LayoutAnimation.Types.spring,
          property: LayoutAnimation.Properties.scaleXY,
          springDamping: 0.9
        },
        update: {
          type: LayoutAnimation.Types.spring,
          springDamping: 0.9
        }
      }


    const goToSecond = () => {
        LayoutAnimation.configureNext(CustomAnimation);
        setFirstStep(false)
        setSecondStep(true)
        setThirdStep(false)
    }

    const goToThird = () => {
        LayoutAnimation.configureNext(CustomAnimation);

        setFirstStep(false)
        setSecondStep(false)
        setThirdStep(true)
    }

    const backToFirst = () => {
        LayoutAnimation.configureNext(CustomAnimation);

        setFirstStep(true)
        setSecondStep(false)
        setThirdStep(false)
    }

    const backToSecond = () => {
        LayoutAnimation.configureNext(CustomAnimation);

        setFirstStep(false)
        setSecondStep(true)
        setThirdStep(false)
    }


    return (
        <ScreenContainer
            upperStyle={{ backgroundColor: Colors.neutralDarkOne }}
            bottomStyle={{ backgroundColor: Colors.neutralDarkOne }}
        >
            <View style={styles.mainConainer}>
                <LinearGradient
                    colors={['#C644FC', '#0F73EE']}
                    useAngle={true}
                    angle={-90}
                    angleCenter={{ x: 0.4, y: 0.4 }}
                    style={[
                        {
                            flex: 1,
                        },
                    ]}
                >
                    <FocusAwareStatusBar
                        barStyle="light-content"
                        backgroundColor={'transparent'}
                        translucent={true}
                    />

                    <AbstractStatusBarHeight color={'transparent'} />

                    {firstStep ?
                        <View style={{ flex: 1, backgroundColor: Colors.neutralLightFive, borderTopRightRadius: 25, borderTopLeftRadius: 25 }} >
                            <SelectLocation onSelect={goToSecond} />
                        </View>
                        : false}

                    {secondStep ?
                               <View style={{position:'absolute',bottom:0,width:'100%'}}>
                                   <HeaderTwo />
                                <SelectType onSelect={goToThird} backToFirst={backToFirst} />
                                </View>
                        : false}

                    {thirdStep ?
                        <View style={{ position:'absolute',bottom:0,width:'100%' }} >
                            <HeaderThree />
                            <SelectDate backToSecond={backToSecond} />
                        </View>
                        : false}



                </LinearGradient>
            </View>
        </ScreenContainer>
    )
}

export default SearchScreen

const styles = StyleSheet.create({
    mainConainer: {
        flex: 1
    },
    viewOne: {
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    textOne: {
        fontSize: moderateScale(27, 0.1),
        fontFamily: Fonts.bold,
        color: Colors.neutralLightFive
    },
    viewTwo: {
        width: '100%',
        alignSelf: 'center',
        width: '90%'
    },
    textOne: {
        fontSize: moderateScale(27, 0.1),
        fontFamily: Fonts.bold,
        color: Colors.neutralLightFive
    },
})














{/* <AbstractStatusBarHeight />   
<AbstractStepsBottomsheet /> */}
