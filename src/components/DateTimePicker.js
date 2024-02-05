import React from 'react';
import DatePicker from 'react-native-date-picker';

const DateTimePicker = props => {
  const { isDatePickerVisible, handleConfirm, hideDatePicker } = props;

  return (
    <>
      <DatePicker
        minimumDate={new Date()}
        modal
        open={isDatePickerVisible}
        date={new Date()}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </>
  );
};

export default DateTimePicker;
