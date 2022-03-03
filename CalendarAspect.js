import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CalendarPicker from 'react-native-calendar-picker';
import { Colors, Fonts } from '../../../themes'
import { moderateScale } from 'react-native-size-matters';
import AbstractSimpleButton from '../../AbstractComponents/AbstractButtons/abstractSimpleButton';
import ArrowLeftSvg from '../../../Assets/Icons/CalendarSvgs/arrowLeftSvg'
import ArrowRightSvg from '../../../Assets/Icons/CalendarSvgs/arrowRightSvg'

const SH = Dimensions.get('window').height

const NewCalendar = () => {
    return (
        <View style={styles.mainConatiner}>
            <View style={styles.viewOne}>
                <View style={styles.viewOneA}>
                    <CalendarPicker
                        showDayStragglers={true}
                        allowRangeSelection={true}
                        selectedRangeStyle={{ backgroundColor: "#9f4ef8"}}
                        selectedDayTextColor={Colors.neutralLightFive}
                        textStyle={{ fontFamily: Fonts.medium, fontSize: 14 }}
                        height={SH*0.5}
                        weekdays={['S', 'M', 'T', 'W', 'T', 'F', 'S',]}
                        previousComponent={<ArrowLeftSvg />}
                        nextComponent={<ArrowRightSvg />}
                        dayLabelsWrapper={{ borderBottomColor: 'transparent', borderTopColor: 'transparent' }}
                        monthTitleStyle={{ fontFamily: Fonts.bold, fontSize: moderateScale(16, 0.1) }}
                        yearTitleStyle={{ fontFamily: Fonts.bold, fontSize: moderateScale(16, 0.1) }}
                        headerWrapperStyle={{ backgroundColor: 'transparent', width: '100%' }}
                        customDayHeaderStyles={(dayOfWeek) => <Text style={{ color: 'red' }}>{dayOfWeek}</Text>}
                        todayBackgroundColor={'#4166f2'}
                        todayTextStyle={{color:Colors.neutralLightFive}}
                    />

                </View>
                <View style={styles.viewOneB}>
                    <AbstractSimpleButton width={moderateScale(89, 0.1)} height={moderateScale(36, 0.1)} label={'Reset'} type={'transparent'} />
                    <AbstractSimpleButton width={moderateScale(89, 0.1)} height={moderateScale(36, 0.1)} label={'DONE'} />
                </View>
            </View>
        </View>
    )
}

export default NewCalendar

const styles = StyleSheet.create({
    mainConatiner: {
        width: '100%',
        height: moderateScale(359, 0.1),
        backgroundColor: Colors.neutralLightOne,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Colors.neutralLightFour,
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewOne: {
        width: '90%',
        height: '90%',
        // backgroundColor: 'red'
    },
    viewOneA: {
        width: '100%',
        height: '80%',
        // backgroundColor: 'green'
    },
    viewOneB: {
        width: '100%',
        height: '20%',
        // backgroundColor: 'yellow',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between'
    },
})
