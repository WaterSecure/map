import React, { useEffect } from "react";
import Carousel, { Modal, ModalGateway } from "react-images";
import {
  activeLocationSelector,
  closeModal,
  locationModalIsOpenSelector,
  openModal,
  setActiveLocation,
  urlToLocationMapSelector,
} from "./locationSlice";
import { connect } from "react-redux";
import { push } from "connected-react-router";

// const images = [
//   {
//     source:
//       "https://images.unsplash.com/photo-1533065910160-c0d469dc81c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
//   },
//   {
//     source:
//       "https://images.unsplash.com/photo-1497716374638-94edb30852e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
//   },
// ];

class LocationModal extends React.Component {
  closeModal = () => {
    this.props.push("/");
    this.props.closeModal();
  };
  render() {
    let images;
    if (this.props.location) {
      images = this.props.location.media
        .filter((media) => media.type === "image")
        .map((media) => {
          return {
            source: media.url,
            caption: this.props.location.description,
          };
        });
    } else {
      images = [];
    }

    return (
      <ModalGateway>
        {/*<Modal onClose={this.closeModal}>*/}
        {/*    <Carousel*/}
        {/*        views={images}*/}
        {/*    />*/}
        {/*</Modal>*/}

        {this.props.isOpen && this.props.location ? (
          <Modal onClose={this.closeModal}>
            <Carousel
              styles={{
                footer: (base) => ({
                  ...base,
                  backgroundColor: "rgba(0,0,0,0.5) !important",
                  color: "#FFFF",
                  opacity: 100,
                  // padding: 0,
                  // paddingTop: 20,
                  // position: "static",

                  "& a": {
                    color: "black",
                  },
                }),
                view: (base) => ({
                  ...base,
                  overflow: "hidden",
                }),
              }}
              hideControlsWhenIdle={false}
              caption={"123"}
              views={images}
            />
          </Modal>
        ) : null}
      </ModalGateway> // <ModalGateway>
      //     {this.props.is_active ? (
      //         <Modal onClose={this.toggleModal}>
      //             <Carousel views={this.props.images} />
      //         </Modal>
      //     ) : null}
      // </ModalGateway>
    );
  }
}

function mapStateToProps(state) {
  return {
    isOpen: locationModalIsOpenSelector(state),
    location: activeLocationSelector(state),
  };
}

let LocationOpener = (props) => {
  useEffect(() => {
    if (!props.location) {
      props.setActiveLocation(props.urlLocation);
      props.openModal();
      // Update the document title using the browser API
    } else {
      if (props.site_name_in_location) {
        document.title = props.location.title + " | " + props.siteName;
      } else {
        document.title = props.location.title;
      }
    }
  });
  return <></>;
};

export default connect(mapStateToProps, { push, closeModal })(LocationModal);

LocationOpener = connect(
  (state) => {
    let urlLocation = urlToLocationMapSelector(state)[
      state.router.location.pathname.slice(1)
    ];
    return {
      location: activeLocationSelector(state),
      urlLocation: urlLocation,
      siteName: state.location.brandAltText,
      site_name_in_location: state.location.features.site_name_in_location,
    };
  },
  {
    push,
    openModal,
    setActiveLocation,
  }
)(LocationOpener);
export { LocationOpener };

// export default Cards;
