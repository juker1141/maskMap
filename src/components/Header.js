import React from 'react';
import Search from './Search';

class Header extends React.Component {
  state = {
    today: new Date(),
    weekdays: '星期日,星期一,星期二,星期三,星期四,星期五,星期六'.split(','),
  };

  renderQualify() {
    const week = this.state.today.getDay();
    if (week === 0) {
      return '不限制';
    } else if (week % 2 === 1) {
      return (
        <React.Fragment>
          1,3,5,7,9
          <span className="text-xs md:text-base text-white font-bold pl-1">可</span>
        </React.Fragment>
      );
    } else if (week % 2 === 0) {
      return (
        <React.Fragment>
          2,4,6,8,0
          <span className="text-xs md:text-base text-white font-bold pl-1">可</span>
        </React.Fragment>
      );
    }
  }

  renderDate() {
    const year = this.state.today.getFullYear();
    const month = this.state.today.getMonth() + 1;
    const day = this.state.today.getDate();
    return `${year}/${month}/${day}`;
  }

  render() {
    return (
      <div className="bg-primary py-4 px-4">
        <div className="flex items-center justify-between text-white mb-4">
          <div className="text-4xl font-bold">{this.state.weekdays[this.state.today.getDay()]}</div>
          <div className="flex flex-col items-end font-bold">
            {this.renderDate()}
            <div className="text-xs md:text-base font-bold">
              身分證末碼為
              <span className="text-warning text-xl font-black pl-1">
                {this.renderQualify()}
              </span>
              購買
            </div>
          </div>
        </div>
        <Search />
      </div>
    );
  };
};

export default Header;