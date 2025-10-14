import React from 'react';
import { CHECKBOX_ICON } from '~constants/dimensions';
import CheckBoxChecked from '~assets/checkbox-checked.svg';
import CheckBoxBlank from '~assets/checkbox-blank.svg';
import CheckBoxIntdeterminate from '~assets/checkbox-indeterminate.svg';
import colors from '~styles/colors';

type CheckBoxProps = {
  isChecked?: boolean;
  indeterminate?: boolean;
  color?: string;
};

const CheckBox = ({ isChecked, indeterminate, color }: CheckBoxProps) => {
  const fill = color || colors.neutral_light;
  if (indeterminate) {
    return <CheckBoxIntdeterminate width={CHECKBOX_ICON.width} height={CHECKBOX_ICON.height} fill={fill} />;
  }
  return isChecked ? (
    <CheckBoxChecked width={CHECKBOX_ICON.width} height={CHECKBOX_ICON.height} fill={fill} />
  ) : (
    <CheckBoxBlank width={CHECKBOX_ICON.width} height={CHECKBOX_ICON.height} fill={fill} />
  );
};

export default CheckBox;
