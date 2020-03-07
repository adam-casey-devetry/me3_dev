import React from "react";
import Gallery from "react-photo-gallery";
import { photoList } from "./PhotoList";

/* popout the browser and maximize to see more rows! -> */
const PhotoGrid = () => <Gallery photos={photoList} />;

export default PhotoGrid;
