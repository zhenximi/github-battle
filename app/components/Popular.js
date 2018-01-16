var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');
var Loading = require('./Loading');

function SelectedLanguage (props) {
  var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
  return (
    <ul className='languages'>
      {languages.map(function (lang) {
    return (
      <li
        style={lang === props.selectedLanguage ? {color: '#d0021b'} : null}
        onClick={props.onSelect.bind(null, lang)}
        key={lang}>
        {lang}
      </li>
    )
  })}
  </ul>
  )
}

function RepoGrid (props) {
  return (
    <ul className = 'popular-list'>
      {props.repos.map (function (repo, index) {
        return (
          <li key={repo.name} className = 'popular-item'>
            <div className = 'poplar-rank'>#{index + 1}
            </div>
            <ul className = 'space-list-items'>
              <li>
                <img
                  className = 'avatar'
                  src = {repo.owner.avatar_url}
                  alt = {'Avatar for ' + repo.owner.login}
                  />
              </li>
              <li> <a href = {repo.html_url}>{repo.name}</a></li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count}</li>
            </ul>
          </li>
      )
      })}
    </ul>
  )
}

RepoGrid.prototype = {
  repos: PropTypes.array.isRequired,
}

SelectedLanguage.propTypes = {
  selectedLanguage : PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
}

class Popular extends React.Component {
  constructor (props) {
    super();
    this.state = {
      selectedLanguage: 'All',
      repos: null,
    };
    this.updateLanguage = this.updateLanguage.bind(this);
  }
  componentDidMount () {
    this.updateLanguage(this.state.selectedLanguage);
    console.log("did mount");
  }
  updateLanguage(lang) {
    this.setState(function (){
      return {
        selectedLanguage: lang,
        repos: null
      }
    });
    api.fetchPopularRepos(lang)
    .then(function(repos) {
      console.log(repos);
      this.setState(function () {
        return {
          repos: repos
        }
      });
    }.bind(this));
  }
  render() {
    return (
      <div>
        <SelectedLanguage
          selectedLanguage = {this.state.selectedLanguage}
          onSelect = {this.updateLanguage}
        />
      {!this.state.repos
        ? <Loading />
        :<RepoGrid repos = {this.state.repos} />}
      </div>
    )
  }
}
module.exports = Popular;
