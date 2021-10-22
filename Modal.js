import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, TextInput, View, TouchableOpacity, TouchableWithoutFeedback } from "react-native";


const Modal = (props) => {

  return (

    <Modal
      animationType="slide"
      transparent={true}
      visible={props.isVisible}
    >
      <TouchableWithoutFeedback
        onPress={() => { props.setModalVisiblity() }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>


          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>


  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "transparent"
    // marginTop: 22
  },
  modalView: {
    margin: 20,
    height: 150,
    width: 180,
    backgroundColor: "white",
    flexDirection: "column",
    borderRadius: 20,
    // padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },


});

export default Modal;
