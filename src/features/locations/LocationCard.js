import React from "react";
import { Card, CardSubtitle, CardText, CardTitle } from "reactstrap";
import { connect } from "react-redux";

function limit_characters(string, length) {
  if (string.length > length) {
    return string.substr(0, length - 1) + "...";
  } else {
    return string;
  }
}

class LocationCard extends React.Component {
  render() {
    return (
      <Card
        id={"location-" + String(this.props.location.id)}
        body
        outline
        color="secondary"
      >
        <CardTitle>{this.props.location.title}</CardTitle>
        {this.props.show_distance_in_subtitle && (
          <CardSubtitle>
            {this.props.location.distance}
            km away
          </CardSubtitle>
        )}
        <CardText>
          {limit_characters(this.props.location.description, 250)}
        </CardText>
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return {
    show_distance_in_subtitle: state.location.features.show_distance,
  };
}

export default connect(mapStateToProps)(LocationCard);

// export default LocationCard;
