import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  Calendar,
  CalendarList,
  Agenda,
  LocaleConfig,
} from "react-native-calendars";
import { moderateScale } from "react-native-size-matters";
import { Colors, Fonts } from "../../../themes";
import AbstractSimpleButton from "../../AbstractComponents/AbstractButtons/abstractSimpleButton";
import MyConfig from "./calendarConfig";
import ArrowLeftSvg from "../../../Assets/Icons/CalendarSvgs/arrowLeftSvg";
import ArrowRightSvg from "../../../Assets/Icons/CalendarSvgs/arrowRightSvg";
import { Theme } from "./calendarConfig";

MyConfig;
const INITIAL_DATE = "2022-02-02";

const CalendarOne = () => {
  const [selected, setSelected] = useState(INITIAL_DATE);
  const [myTimePeriod, setmyTimePeriod] = useState({
    "2022-02-02": {
      startingDay: true,
      textColor: Colors.neutralLightOne,
      color: "#C644FC",
    },
    "2022-02-03": { textColor: Colors.neutralLightOne, color: "#C644FC" },
    "2022-02-04": { textColor: Colors.neutralLightOne, color: "#C644FC" },
    "2022-02-05": { textColor: Colors.neutralLightOne, color: "#C644FC" },
    "2022-02-06": { textColor: Colors.neutralLightOne, color: "#C644FC" },
    "2022-02-07": { textColor: Colors.neutralLightOne, color: "#C644FC" },
    "2022-02-08": { textColor: Colors.neutralLightOne, color: "#C644FC" },
    "2022-02-09": { textColor: Colors.neutralLightOne, color: "#C644FC" },
    "2022-02-10": {
      endingDay: true,
      textColor: Colors.neutralLightOne,
      color: "#C644FC",
    },
  });

  const [objectOfDates, setObjectOfDates] = useState({});
  //   console.log(objectOfDates)

  const onDayPress = (day) => {
    const dateCustomString = day.dateString;
    const customMade = {};
    customMade[dateCustomString] = {
      startingDay: true,
      textColor: Colors.neutralLightOne,
      color: "#C644FC",
    };

    var size = Object.keys(objectOfDates).length;
    if (size > 0) {
      objectOfDates.map((item, index) => {
        return console.log(item);
      });
    }
    setObjectOfDates({ ...customMade, ...objectOfDates });
  };

  const onMonthChange = (month) => {
    console.log("month changed", month);
  };

  return (
    <View style={styles.mainConatiner}>
      <View style={styles.viewOne}>
        <View style={styles.viewOneA}>
          <Calendar
            style={{ height: 250 }}
            enableSwipeMonths
            current={INITIAL_DATE}
            onDayPress={onDayPress}
            onMonthChange={onMonthChange}
            hideExtraDays={false}
            theme={Theme}
            renderArrow={(direction) =>
              direction === "left" ? <ArrowLeftSvg /> : <ArrowRightSvg />
            }
            markingType={"period"}
            markedDates={{
              [selected]: {
                selected: true,
                disableTouchEvent: true,
                selectedColor: Colors.primaryOne,
                selectedTextColor: Colors.neutralLightFive,
              },
            }}
            markedDates={myTimePeriod}
          />
        </View>
        {/* <View style={styles.viewOneB}>
                    <AbstractSimpleButton width={moderateScale(89, 0.1)} height={moderateScale(36, 0.1)} label={'Reset'} type={'transparent'} />
                    <AbstractSimpleButton width={moderateScale(89, 0.1)} height={moderateScale(36, 0.1)} label={'DONE'} />
                </View> */}
      </View>
    </View>
  );
};

export default CalendarOne;

const styles = StyleSheet.create({
  mainConatiner: {
    width: "100%",
    height: moderateScale(359, 0.1),
    backgroundColor: Colors.neutralLightOne,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.neutralLightFour,
    justifyContent: "center",
    alignItems: "center",
  },
  viewOne: {
    width: "90%",
    height: "90%",
    // backgroundColor: 'red'
  },
  viewOneA: {
    width: "100%",
    height: "80%",
    // backgroundColor: 'green'
  },
  viewOneB: {
    width: "100%",
    height: "20%",
    // backgroundColor: 'yellow',
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
});

