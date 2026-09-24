import React from "react";

export const Image = React.forwardRef(({ src, alt, fittingType, originWidth, originHeight, focalPointX, focalPointY, quality, onError, className, ...props }, ref) => {
  return (
    <img 
      ref={ref} 
      src={src} 
      alt={alt} 
      className={className} 
      {...props} 
    />
  );
});
Image.displayName = "Image";