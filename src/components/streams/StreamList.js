import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }
  renderAdminPanel = () => {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: 'right' }}>
          <Link to="/streams/new" className="ui button primary">
            Create Stream
          </Link>
        </div>
      );
    } else {
      return <div>Login to manage streams</div>;
    }
  };
  renderAdminList = () => {
    if (this.props.isSignedIn) {
      return this.props.streams
        .filter(stream => stream.userId === this.props.currentUserId)
        .map(stream => {
          return (
            <div className="item" key={stream.id}>
              <div className="right floated content">
                <Link
                  className="ui button primary"
                  to={`/streams/edit/${stream.id}`}
                >
                  Edit
                </Link>
                <Link
                  to={`/streams/delete/${stream.id}`}
                  className="ui button negative"
                >
                  Delete
                </Link>
              </div>
              <i className="large middle aligned icon camera" />
              <div className="content">
                <Link to={`/streams/${stream.id}`}>{stream.title}</Link>
                <div className="description">{stream.description}</div>
              </div>
            </div>
          );
        });
    }
  };
  renderList = () => {
    return this.props.streams.map(stream => {
      return (
        <div className="item" key={stream.id}>
          <i className="large middle aligned icon camera" />
          <div className="content">
            <Link to={`/streams/${stream.id}`}>{stream.title}</Link>
            <div className="description">{stream.description}</div>
          </div>
        </div>
      );
    });
  };
  render() {
    return (
      <div>
        <h2>My Streams</h2>
        <div className="ui celled list">{this.renderAdminList()}</div>
        <div>{this.renderAdminPanel()}</div>
        <h2>Streams</h2>
        <div className="ui celled list">{this.renderList()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(
  mapStateToProps,
  { fetchStreams }
)(StreamList);
