export default class Autocomplete {
  constructor(rootEl, options = {}) {
    options = Object.assign({ numOfResults: 10, data: [] }, options);
    Object.assign(this, { rootEl, options });
    this.selectionIndex = -1;
    this.init();
  }

  onQueryChange(query) {
    // Get data for the dropdown
    let results = this.getResults(query, this.options.data);
    results = results.slice(0, this.options.numOfResults);
    this.updateDropdown(results);
  }

  /**
   * Given an array and a query, return a filtered array based on the query.
   */
  getResults(query, data) {
    if (!query && data) return [];
    try {
    // Filter for matching strings
      const results = data.filter(item => item.text.toLowerCase().includes(query.toLowerCase()));
      return results;
    } catch (error) {
      console.info('Requesting data...');
      return;
    }
  }

  updateDropdown(results) {
    this.listEl.innerHTML = '';
    this.listEl.appendChild(this.createResultsEl(results));
  }

  createResultsEl(results) {
    const fragment = document.createDocumentFragment();
    results.forEach((result) => {
      const el = document.createElement('li');
      Object.assign(el, {
        className: 'result',
        textContent: result.text,
      });

      // Pass the value to the onSelect callback
      el.addEventListener('click', (event) => {
        const { onSelect } = this.options;
        if (typeof onSelect === 'function') onSelect(result.value, result.text, this.inputEl, this.listEl);
      });

      fragment.appendChild(el);
    });
    return fragment;
  }

  createQueryInputEl() {
    const inputEl = document.createElement('input');
    Object.assign(inputEl, {
      type: 'search',
      name: 'query',
      autocomplete: 'off',
    });
    // [TO] Implement keyboard shortcuts
    // to navigate the results dropdown
    // using up/down arrow keys and to
    // select a result using the Enter key.

    inputEl.addEventListener('keydown', (event) => {
      if (
        event.keyCode === 40 // arrow down
              || event.keyCode === 38 // arrow up
              || event.keyCode === 13 // enter
      ) {
        const listItems = Array.from(document.querySelector(`#${this.rootEl.id} .results`).children);

        switch (event.keyCode) {
          // enter key
          case 13: {
            const result = listItems[this.selectionIndex];
            result
              ? this.getResultSelection(inputEl, result)
              : null;
            break;
          }
          // arrow up
          case 38: {
            if (this.selectionIndex > 0) {
              this.removeInputSelection();
              this.selectionIndex--;
              listItems[this.selectionIndex].classList.add('input__selected');
            }
            break;
          }
          // arrow down
          case 40: {
            if (this.selectionIndex < listItems.length - 1) {
              this.removeInputSelection();
              this.selectionIndex++;
              listItems[this.selectionIndex].classList.add('input__selected');
            }
            break;
          }
        }
      }
    });
    // END [TO]

    inputEl.addEventListener('input', event => this.onQueryChange(event.target.value));
    return inputEl;
  }

  removeInputSelection() {
    [...document.querySelector(`#${this.rootEl.id} .results`).children]
      .map(el => el.classList.remove('input__selected'));
  }

  getResultSelection(inputEl, result) {
    inputEl.value = result.innerHTML;
    this.listEl.innerHTML = '';
  }

  init() {
    // Build query input
    this.inputEl = this.createQueryInputEl();
    this.rootEl.appendChild(this.inputEl);

    // Build results dropdown
    this.listEl = document.createElement('ul');
    Object.assign(this.listEl, { className: 'results' });
    this.rootEl.appendChild(this.listEl);
  }
}
