import React from "react";
import {
  UncontrolledCollapse,
  CardBody,
  Card,
  Label,
  Form,
  FormGroup,
  Input,
  InputGroup,
} from "reactstrap";
import MultiSelect from "@khanacademy/react-multi-select";
import {
  allCategoriesSelector,
  setMaxDistanceFilter,
  setTextFilter,
  setCategoryFilter,
  allFilterSelector,
} from "./locationSlice";
import { connect } from "react-redux";
// TODO: use mapDispatchToProps
import store from "../../app/store";

class FilterCard extends React.Component {
  handleChange = async (event) => {
    const { target } = event;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const { name } = target;
    if (name === "max_distance") {
      store.dispatch(setMaxDistanceFilter(Number(value)));
    }
    if (name === "contains") {
      store.dispatch(setTextFilter(value));
    }
  };

  handleCategoryChanged(selected) {
    store.dispatch(setCategoryFilter(selected));
  }

  render() {
    const categories = this.props.categories.map((category) => {
      return { label: category.name, value: category.id };
    });
    return (
      <div>
        <UncontrolledCollapse toggler={`#${this.props.toggleSelector}`}>
          <Card>
            <CardBody>
              <Form>
                <FormGroup>
                  <Label for="categoryMultiSelect">Category</Label>
                  <MultiSelect
                    options={categories}
                    onSelectedChanged={this.handleCategoryChanged.bind(this)}
                    selected={this.props.filters.categories}
                    hasSelectAll={false}
                    disableSearch
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="text"
                    name="contains"
                    placeholder="Search names and descriptions..."
                    onChange={(e) => {
                      this.handleChange(e);
                    }}
                  />
                </FormGroup>
                {this.props.show_distance ? (
                  <FormGroup>
                    <InputGroup>
                      <Input
                        type="number"
                        name="max_distance"
                        placeholder="Max Distance (km)"
                        onChange={(e) => {
                          this.handleChange(e);
                        }}
                      />
                      {/*<InputGroupAddon addonType="append">km</InputGroupAddon>*/}
                    </InputGroup>
                  </FormGroup>
                ) : null}
              </Form>
            </CardBody>
          </Card>
        </UncontrolledCollapse>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: allCategoriesSelector(state),
    // filters: {
    //     max_distance: 0,
    //     contains_text: "",
    //     categories: []
    // }}
    show_distance: state.location.features.show_distance,
    filters: allFilterSelector(state),
  };
}

export default connect(mapStateToProps)(FilterCard);
