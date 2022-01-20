import React, { useEffect, useRef, useState} from 'react';
import ActionSheet from 'react-native-actions-sheet';
import { Colors } from '../../themes';



const AbstractBottomSheet =  (props) => {
    
    const actionSheetRef = useRef();
  const scrollViewRef = useRef();

    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef();
  
    const onHasReachedTop = (hasReachedTop) => {
    // console.log(`OnReached Top: ${hasReachedTop}`)
    //   if (hasReachedTop){
        //   actionSheetRef.current?.setNativeProps({
        //       scrollEnabled: hasReachedTop,
        //     });
    //    }
    };
  
    // useEffect(() => {
    //   addHasReachedTopListener(onHasReachedTop);
    //   return () => {
    //     removeHasReachedTopListener(onHasReachedTop);
    //   };
    // }, []);

    useEffect(() => {
        
        if(isVisible){
            // addHasReachedTopListener(onHasReachedTop);
            actionSheetRef.current?.setModalVisible(true)
        }else{
            // addHasReachedTopListener(onHasReachedTop);
            actionSheetRef.current?.setModalVisible(false)
        }
    }, [isVisible])

    useEffect(() => {
        if(props.isVisible){
            setIsVisible(true)
        }else{
            closeModal()
        }
    }, [props.isVisible])

    const onClose = () => {
        // console.log(`On close`)
        setIsVisible(false)
        if(props.onClose){
            props.onClose()
        }
      };
    
      const onOpen = () => {
        // console.log(`On Sheet Open...`)
        if(isVisible){
            scrollViewRef.current?.setNativeProps({
                scrollEnabled: true,
            });
        }
      };

      const closeModal = () => {
        actionSheetRef.current?.setModalVisible();
        setTimeout(() => {
            if(props.onRequestClose){
                props.onRequestClose()
                setIsVisible(false)
            }
        }, 700)
      }

     

     if(isVisible){
        return (    
            <ActionSheet
                ref={actionSheetRef}
                initialOffsetFromBottom={1}
                onOpen={onOpen}
                statusBarTranslucent={false}
                onPositionChanged={onHasReachedTop}
                bounceOnOpen={true}
                containerStyle={{backgroundColor: Colors.blueSecondary,}}
                bounciness={2}
                drawUnderStatusBar  
                gestureEnabled={true}
                onClose={onClose}
                CustomHeaderComponent={props.MyHeader}
                defaultOverlayOpacity={0.3}>
                   
                    {props.children}
                   
            </ActionSheet>
        )
     }else{
         return( <>
         </>);
     }

    }
export default AbstractBottomSheet;
