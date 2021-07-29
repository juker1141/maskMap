import React from 'react';

class MarkInfowindow extends React.Component {
  state = { weekdays: '星期日,星期一,星期二,星期三,星期四,星期五,星期六'.split(',') };

  renderOpenTime(value) {
    let openTime = new Array();
    const nowWeek = this.state.weekdays[new Date().getDay()];
    openTime = value.split('、');
    const todayOpenTime = openTime.filter((week) => {
      return week.slice(0, 3) === nowWeek
    })
  };

  render() {
    const store = this.props.store;
    return (
      <div className="flex flex-col">
        <div className="text-bold">{store.name}</div>
        <ul className="flex flex-col text-secondary text-xs">
          <li>{store.address}</li>
          <li>{store.phone}</li>
          <li>{this.renderOpenTime(store.available)}</li>
        </ul>
      </div>
    )
  }
}

export default MarkInfowindow;