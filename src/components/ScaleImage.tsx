import { useEffect, useMemo, useState } from "react";
import { Image, StyleSheet } from "react-native";
import PropTypes from "prop-types";

interface Props {
    style: any;
    source: any
}

function ScaleImage({ style, source, ...restProps }: Props) {
    const flattenedStyles = useMemo(() => StyleSheet.flatten(style), [style]);
    if (
      typeof flattenedStyles.width !== "number" &&
      typeof flattenedStyles.height !== "number"
    ) {
      throw new Error("ScaleImage requires either width or height");
    }
  
    const [size, setSize] = useState({
      width: flattenedStyles.width,
      height: flattenedStyles.height
    });
  
    useEffect(() => {
      if (!flattenedStyles.width || !flattenedStyles.height) {

        let width = Image.resolveAssetSource(source).width;
        let height = Image.resolveAssetSource(source).height;
        const ratio = width / height;
        setSize({
          width: flattenedStyles.width || ratio * flattenedStyles.height || 0,
          height: flattenedStyles.height || flattenedStyles.width / ratio || 0
        });
        /*
        Image.getSize(uri, (w, h) => {
          const ratio = w / h;
          setSize({
            width: flattenedStyles.width || ratio * flattenedStyles.height || 0,
            height: flattenedStyles.height || flattenedStyles.width / ratio || 0
          });
        });
        */
      }
    }, [source, flattenedStyles.width, flattenedStyles.height]);
  
    return <Image source={source} style={[style, size]} {...restProps} />;
  }
  
  ScaleImage.propTypes = {
    source: PropTypes.number.isRequired,
    style: PropTypes.object
  };
  
  ScaleImage.defaultProps = {
    style: {}
  };
  
  export default ScaleImage;