import React, { useState } from "react";
import Gallery from "react-photo-gallery";
import { photoList } from "./PhotoList";
import Photo from "./utility/Photo";
import arrayMove from "array-move";
import { SortableContainer, SortableElement } from "react-sortable-hoc";

const SortablePhoto = SortableElement(item => <Photo {...item} />);
const SortableGallery = SortableContainer(({ items }) => (
  <Gallery photos={items} renderImage={props => <SortablePhoto {...props} />} />
));

/* popout the browser and maximize to see more rows! -> */
const PhotoGrid = () => {
  const [items, setItems] = useState(photoList);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setItems(arrayMove(items, oldIndex, newIndex));
  };
  return (
    <div>
      <SortableGallery items={items} onSortEnd={onSortEnd} axis={"xy"} />
    </div>
  );
};

export default PhotoGrid;
