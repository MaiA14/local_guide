import React, { Component } from "react";
import { connect } from "react-redux";

import { addReview } from "../reducers/guide/actionGuide.js";
import { getRandomID } from "../service/utilsService.js";
import RatingStar from "./RatingStar.js";
import { Form, TextArea } from "semantic-ui-react";

class Review extends Component {

  state = {
    id: getRandomID(),
    title: "",
    txt: "",
    createBy: {
      id: "6436373453",
      userName: "",
      fullName: "",
      imgUrl: "http://img.com",
    },
    createdAt: Date.now(),
    rank: 0,
  };
  

  onChangeRateStar = (rating) => {
    this.setState((prevState) => {
      return { ...prevState.state, ["rank"]: rating };
    });
  };

  onChange = (ev) => {
    ev.preventDefault();
    const field = ev.target.name;
    const value = ev.target.value;
    if (field === "userName") {
      this.setState((prevState) => ({
        createBy: { ...prevState.createBy, [field]: value },
      }));
      this.setState((prevState) => ({
        createBy: { ...prevState.createBy, [field]: value },
      }));
    } else {
      this.setState((prevState) => {
        return { ...prevState, [field]: value };
      });
    }
  };

  onSubmit = () => {
    this.props.addReview(this.state, this.props.guide);
    this.setState({ title: '', txt:'', rank: 0});
    this.setState(state => ({ createBy: Object.assign({}, 
      state.createBy, { userName: " " }) }));
  }

  render() {
    return (
      <div>
        <h2 className="guide-review-title">
          Write a review about &nbsp;
          {this.props.guide.name}
        </h2>
        <div>
          <input
            onChange={this.onChange}
            name="userName"
            type="text"
            className="review-input"
            placeholder="Name"
            value = {this.state.createBy.userName}>
            </input>
        </div>
        <div>
          <Form className="review-text">
            <TextArea
              rows={2}
              placeholder="What do you think about me?"
              onChange={this.onChange}
              name="txt"
              value = {this.state.txt}
            />
          </Form>
        </div>
        <div>Rate</div>
        <div>
          <RatingStar onChangeRateStar={this.onChangeRateStar} rank={this.state.rank}></RatingStar>
        </div>
        <button
          className="send-btn"
          onClick={ this.onSubmit}>
          Send
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    guide: state.guides.guide,
  };
};

const mapDispatchToProps = {
  addReview,
};

export default connect(mapStateToProps, mapDispatchToProps)(Review);
