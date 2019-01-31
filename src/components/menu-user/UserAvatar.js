import React, { Component } from "react";
import { Image, Loader, Dimmer, Icon } from "semantic-ui-react";
import md5 from "md5";

export class UserAvatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageLoading: false,
      imageError: false
    };
  }

  setGravatarUrl() {
    this.setState({
      imageLoading: true,
      imageError: false,
      gravatarUrl: `https://www.gravatar.com/avatar/${md5(this.props.email.toLowerCase())}?d=404`
    });
  }

  componentDidMount() {
    if (this.props.email) {
      this.setGravatarUrl();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.email !== prevProps.email) {
      this.setGravatarUrl();
    }
  }

  handleImageLoaded() {
    this.setState(state => ({
      ...state,
      imageLoading: false
    }));
  }

  handleImageErrored() {
    this.setState({
      imageLoading: false,
      imageError: true
    });
  }

  render() {
    const loading = this.props.loading || this.state.imageLoading;
    const image =
      this.state.imageError || !this.state.gravatarUrl ? (
        <Image circular className="user-avatar" avatar>
          <Icon name="user circle" size="big" className="user-avatar__icon" />
        </Image>
      ) : (
        <Image circular className="user-avatar" avatar>
          <img
            src={this.state.gravatarUrl}
            onLoad={this.handleImageLoaded.bind(this)}
            onError={this.handleImageErrored.bind(this)}
          />
        </Image>
      );

    return (
      <React.Fragment>
        <Dimmer active={loading}>
          <Loader />
        </Dimmer>
        {image}
      </React.Fragment>
    );
  }
}
