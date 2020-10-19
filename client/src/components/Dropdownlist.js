import React from "react";

function debounce(fn, delay) {
  let timer;
  const thisContext = this;
  const args = arguments;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      return fn.apply(thisContext, args);
    }, delay);
  };
}

class DropDownListItem extends React.Component {
  constructor(props) {
    super(props);
    this.debouncedToggleChangeListItem = debounce(
      this.toggleChangeListItem,
      100
    );
  }
  toggleChangeListItem = () => {
    const { listData, uniqueKey } = this.props;
    this.props.toggleChangeListItem(listData[uniqueKey]);
  };
  onKeyUp = e => {
    if (e.keyCode === 13) {
      const { listData, uniqueKey } = this.props;
      this.props.toggleChangeListItem(listData[uniqueKey]);
    }
  };
  render() {
    const { listData, isChecked } = this.props;
    const id = `${listData.actor_name}__${listData.actor_id}`;
    return (
      <div
        tabIndex={0}
        className="drop-down__list-item"
        onClick={this.debouncedToggleChangeListItem}
        onKeyUp={this.onKeyUp}
      >
        <input
          tabIndex={-1}
          id={id}
          type="checkbox"
          checked={isChecked}
          value={listData.actor_id}
          onChange={e => { }}
        />
        <label htmlFor={id}>{listData.actor_name}</label>
      </div>
    );
  }
}

class Dropdownlist extends React.Component {
  state = {
    isOpen: false
  };
  toggleIsOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  // handle click outside ~ to close the dropdown
  UNSAFE_componentWillMount() {
    document.addEventListener("mousedown", this.handleDocClick, false);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleDocClick, false);
  }
  handleDocClick = e => {
    if (!this.wrapper.contains(e.target)) {
      this.setState({
        isOpen: false
      });
    }
  };
  renderDropDownIcon = () => {
    if (this.props.customRenderDropDownIcon) {
      return this.props.customRenderDropDownIcon();
    } else {
      return <span className="drop-down-icon">▼</span>;
    }
  };
  renderSelected = () => {
    const { isOpen } = this.state;
    const { selected, data, uniqueKey } = this.props;
    let labelContent = "";
    if (!selected.length) {
      labelContent = "None Selected";
    } else if (data !== undefined && selected.length === data.length) {
      labelContent = "All Selected";
    } else if (data !== undefined && selected.length === 1) {
      const selectedOne = data.find(item => item[uniqueKey] === selected[0]);
      labelContent = selectedOne.actor_name;
    } else {
      labelContent = `${selected.length} Selected`;
    }
    const activeClass = isOpen ? "new-drop-down--is-open" : "";
    return (
      <button
        type="button"
        className={`new-drop-down__button ${activeClass}`}
        onClick={this.toggleIsOpen}
      >
        <span>{labelContent}</span>
        {this.renderDropDownIcon()}
      </button>
    );
  };
  renderDropDownList = () => {
    const {
      data,
      toggleChangeListItem,
      uniqueKey,
      selected,
      shouldHaveSelectAll
    } = this.props;

    let data_ = [...data];

    if (shouldHaveSelectAll) {
      data_ = [{ actor_name: "Select All", actor_id: "ALL" }, ...data];
    }

    const getIsChecked = ({ listData, uniqueKey, selected }) => {
      let isChecked = false;
      if (listData[uniqueKey] === "ALL") {
        if (data !== undefined && selected.length === data.length) {
          isChecked = true;
        } else {
          isChecked = false;
        }
      } else {
        isChecked = selected.indexOf(listData[uniqueKey]) > -1;
      }
      return isChecked;
    };

    return data_.map((listData, index) => {
      const isChecked = getIsChecked({ listData, uniqueKey, selected });
      return (
        <DropDownListItem
          key={index}
          toggleChangeListItem={toggleChangeListItem}
          listData={listData}
          uniqueKey={uniqueKey}
          isChecked={isChecked}
        />
      );
    });
  };
  render() {
    return (
      <div className="new-drop-down" ref={wrapper => (this.wrapper = wrapper)}>
        {this.renderSelected()}
        {this.state.isOpen && (
          <div className="new-drop-down__list-wrapper">
            {this.renderDropDownList()}
          </div>
        )}
      </div>
    );
  }
}

/**********************************/
// propTypes
/**********************************/
// NewDropDown.propTypes = {
//     shouldHaveSelectAll: PropTypes.bool,
//     selected: PropTypes.array,
//     data: PropTypes.array,
//     uniqueKey: PropTypes.string,
//     toggleChangeListItem: PropTypes.func,
//     customRenderDropDownIcon: () => null
// };

// class Dropdownlist extends React.Component {
//   state = {
//     uniqueKey: "actor_id",
//     selected: [],
//     data: [
//       {
//         actor_name: "One",
//         actor_id: 1
//       },
//       {
//         actor_name: "Two",
//         actor_id: 2
//       },
//       {
//         actor_name: "Three",
//         actor_id: 3
//       }
//     ]
//   };

//   // renderSelected = () => {
//   //   const { selected, data, uniqueKey } = this.state;
//   //   const data_ = data.slice();
//   //   let res = [];
//   //   for (let i = 0; i < selected.length; i++) {
//   //     for (let j = 0; j < data_.length; j++) {
//   //       if (data_[j][uniqueKey] === selected[i]) {
//   //         res.push(data_[j]);
//   //         data_.splice(j, 1);
//   //       }
//   //     }
//   //   }
//   //   return JSON.stringify(res);
//   // };
//   render() {
//     return (
//       <div>
//         <NewDropDown
//           shouldHaveSelectAll={true}
//           uniqueKey={this.state.uniqueKey}
//           data={this.state.data}
//           selected={this.state.selected}
//           toggleChangeListItem={this.toggleChangeListItem}
//         />
//         {/* <div className="grey">
//           <h5>Selected:</h5>
//           {this.renderSelected()}
//         </div> */}
//       </div>
//     );
//   }
// }

export default Dropdownlist;