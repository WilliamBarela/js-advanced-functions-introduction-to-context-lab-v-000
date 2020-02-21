// Your code here
const arrayToObject = (valArray, keys, object = {}) => {
  valArray.map( (value, i) => {
    object[keys[i]] = value;
  });
  return object;
};

const createEmployeeRecord = (employee) => {
  const employeeObject = {"timeInEvents": [], "timeOutEvents":[]};
  const keys = ["firstName", "familyName", "title", "payPerHour"];

  return arrayToObject(employee, keys, employeeObject);
};

const createEmployeeRecords = (employees) => {
  const employeeObjects = [];
  
  employees.map(employee => {
    employeeObjects.push( createEmployeeRecord(employee) );
  });
  return employeeObjects;
};


const createTimeEvent = (type) => {
  return (employeeObject, timestamp) => {
    const [date, hour] = timestamp.split(" ");
    const typeText = type[0].toUpperCase() + type.slice(1);

    const valArray = [typeText, date, parseInt(hour)];
    const keys = ["type", "date", "hour"];
 
    const timeEvent = arrayToObject(valArray, keys);
  
    employeeObject[type + "Events"].push(timeEvent);
    return employeeObject;
  };
};

const createTimeInEvent = (employeeObject, timestamp) => {
  return createTimeEvent("timeIn")(employeeObject, timestamp);
};

const createTimeOutEvent = (employeeObject, timestamp) => {
  return createTimeEvent("timeOut")(employeeObject, timestamp);
};

const hoursWorkedOnDate = (employeeObject, date) => {
  const timeIn = employeeObject.timeInEvents.find(record => record.date === date);
  const timeOut = employeeObject.timeOutEvents.find(record => record.date === date);
  
  return (timeOut.hour - timeIn.hour) / 100;
};

const wagesEarnedOnDate = (employeeObject, date) => {
  const hoursWorked = hoursWorkedOnDate(employeeObject, date);
  const employeePay = employeeObject.payPerHour;
  
  return hoursWorked * employeePay;
};


