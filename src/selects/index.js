import { createSelector } from 'reselect'

const getArea = (state) => state.area;
const getMaskData = (state) => state.maskData;

export const getLocalMaskList = createSelector(
  [getArea, getMaskData],
  (area, maskData) => {
    return maskData.filter((store) => store.properties.address.indexOf(area) !== -1);
  }
);