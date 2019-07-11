import React, { Fragment, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Repos from '../repos/Repos';
import Spinner from '../layout/Spinner';
import GithubContext from '../../context/github/githubContext';

const User = ({ match }) => {
  // ใช้ Context API ในการส่ง State
  const githubContext = useContext(GithubContext);
  // Destructuring Context Object
  const { user, loading, getUser, getUserRepos, repos } = githubContext;

  useEffect(() => {
    getUser(match.params.login);
    getUserRepos(match.params.login);
    // eslint-disable-next-line
  }, []);

  const {
    // destructuring จาก api
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
  } = user;

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
};

export default User;

/**
 * getUserRepos
 *  1) รับ username แล้วส่งไปให้ App (parent)
 *  2) fetch repos จาก App ส่ง state repos ผ่าน props
 *    - set propstype ทั้ง getUserRepos และ repos
 *  3) ส่ง state ลงไปให้ Repos
 *  4) ส่ง state เพื่อ render Repo ใน RepoItem
 * ===
 * วิธีแสดงผล component แบบใช้เงื่อนไข
 *  - {login && (<JSX-expression>)
 *
 *
 */
