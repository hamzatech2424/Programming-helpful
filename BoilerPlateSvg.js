import React from 'react';
import {SvgXml} from 'react-native-svg';






const BoilerPlateSvg = ({height,width,color,size}) => {
  const defaultHeight = height ? height : 10;
  const defaultWidth = width ? width : 10
  const defaultColor = color ? color : 'white'
  const defaultSize = size ? size : 12

  return (
    <SvgXml
      // width={defaultWidth}
      // height={defaultHeight}
      xml={` `}
    />
  );
};


export default BoilerPlateSvg;
