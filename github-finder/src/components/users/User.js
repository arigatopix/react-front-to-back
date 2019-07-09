import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Repos from '../repos/Repos';
import Spinner from '../layout/Spinner';

class User extends Component {
  // fetch user โดยส่งจาก User (child) > App (Parent)
  componentDidMount() {
    this.props.getUser(this.props.match.params.login);
    this.props.getUserRepos(this.props.match.params.login);
  }

  static propTypes = {
    user: PropTypes.object.isRequired,
    repos: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    getUser: PropTypes.func.isRequired,
    getUserRepos: PropTypes.func.isRequired
  };

  render() {
    // check variable ของ props ผ่าน Route
    // console.log(this.props);

    const {
      name,
      avatar_url,
      bio,
      blog,
      company,
      login,
      location,
      html_url,
      followers,
      following,
      public_repos,
      public_gists,
      hireable
    } = this.props.user;

    const { loading, repos } = this.props;

    // Wait to fetch data
    if (loading) {
      return <Spinner />;
    }

    return (
      <Fragment>
        <Link to="/" className="btn btn-light">
          Back to Search
        </Link>
        Hireable:{' '}
        {hireable ? (
          <i className="fas fa-check text-success" />
        ) : (
          <i className="fas fa-times-circle text-danger" />
        )}
        <div className="card grid-2">
          <div className="all-center">
            <img
              src={avatar_url}
              alt="avatar"
              className="round-img"
              style={{ width: '150px' }}
            />
            <h1 className="my-1">{name}</h1>
            {location && (
              <Fragment>
                <p>Location: {location}</p>
              </Fragment>
            )}
          </div>
          <div>
            {bio && (
              <Fragment>
                <h3>Bio</h3>
                <p>{bio}</p>
              </Fragment>
            )}
            <a href={html_url} className="btn btn-dark my-1">
              Visit GitHub Profile
            </a>
            <ul>
              <li>
                {login && (
                  <Fragment>
                    <strong>Username: </strong> {login}
                  </Fragment>
                )}
              </li>
              <li>
                {company && (
                  <Fragment>
                    <strong>Company: </strong> {company}
                  </Fragment>
                )}
              </li>
              <li>
                {blog && (
                  <Fragment>
                    <strong>Blog: </strong> {blog}
                  </Fragment>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className="card text-center">
          <div className="badge badge-primary">Followers: {followers}</div>
          <div className="badge badge-success">Following: {following}</div>
          <div className="badge badge-light">Public Repos: {public_repos}</div>
          <div className="badge badge-dark">Public Gists: {public_gists}</div>
        </div>
        <Repos repos={repos} />
      </Fragment>
    );
  }
}

export default User;

/**
 * getUserRepos
 *  1) รับ username แล้วส่งไปให้ App (parent)
 *  2) fetch repos จาก App ส่ง state repos ผ่าน props
 *    - set propstype ทั้ง getUserRepos และ repos
 *  3) ส่ง state ลงไปให้ Repos
 *  4) ส่ง state เพื่อ render Repo ใน RepoItem
 */
