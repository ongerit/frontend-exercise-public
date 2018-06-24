import Autocomplete from './Autocomplete';
import usStates from './us-states';
import apiRequest from './src/apiRequest';
import './main.css';

class ApiRequestAutocomplete extends Autocomplete {
  constructor(rootEl, options = {}) {
    super(rootEl);
    this.options = Object.assign({ numOfResults: 10, data: [] }, this.options);
    Object.assign(this, { rootEl, options });
  }

  onQueryChange(query) {
    if (this.options.url) {
      apiRequest(this.options.url, query, this.options.numOfResults)
        .then((data) => {
          data = data.items.map(user => ({
            text: user.login,
            value: user.id,
          }));
          return this.updateDropdown(data);
        });
    }
    // [TO] Get data for the dropdown
    try {
      let results = this.getResults(query, this.options.data);
      results = results.slice(0, this.options.numOfResults);
      this.updateDropdown(results);
    } catch (error) {
      console.info('Returning data...');
    }
  }
}

// US States data
const data = usStates.map(state => ({
  text: state.name,
  value: state.abbreviation,
}));

// US States new class
new Autocomplete(document.getElementById('state'), {
  data,
  numOfResults: 10,
  onSelect: (ghUserId, ghUser, input, list) => {
    input.value = ghUser;
    list.innerHTML = '';
  },
});

// Github Users
new ApiRequestAutocomplete(document.getElementById('gh-user'), {
  numOfResults: 10,
  url: 'https://api.github.com/search/users',
  onSelect: (ghUserId, ghUser, input, list) => {
    input.value = ghUser;
    list.innerHTML = '';
  },
});
