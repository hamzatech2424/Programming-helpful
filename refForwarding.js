import React from 'react';
import {View, Text, TextInput} from 'react-native'

const MyTextInput = React.forwardRef((props, ref) => (
       <TextInput ref={ref} style={{borderWidth:1, borderColor: "black", width:"100%", height: 50}} placeholder='please type here'/>
    ))
export default MyTextInput;
