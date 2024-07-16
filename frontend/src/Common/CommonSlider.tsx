import React, { FC, ReactNode } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface commonSliderProps {
  settings?: Settings;
  children?: ReactNode;
}

const CommonSlider: FC<commonSliderProps> = ({ settings, children }) => {
  return <Slider {...settings}>{children}</Slider>;
};

export default CommonSlider;
