import ImageGallery from "react-image-gallery";
const defaultPic = [
  {
    original: "/static/images/default.jpg",
  },
];

export default function PublicFacingImageGallery(props) {
  if (props.images && props.images.length > 0) {
    return (
      <ImageGallery
        items={
          (defaultPic,
          props.images.map((pic) => ({
            original: pic.location,
            originalAlt: pic.bucket,
            originalHeight: 300,
          })))
        }
        showThumbnails={false}
        showPlayButton={false}
        showBullets={true}
        showFullscreenButton={false}
        onErrorImageURL={"/static/images/default.jpg"}
      />
    );
  } else return null;
}
