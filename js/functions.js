const MINUTES_IN_HOUR = 60;

const checkLineLength = (line, maxLength) => (line.length <= maxLength)

const checkPalindrome = function(line)
{
  const normalizedLine = line.replaceAll(' ', '').toLowerCase();
  let newLine = '';
  for(let i = normalizedLine.length-1; i>=0; i--)
  {
    newLine += normalizedLine.at(i);
  }
  if(newLine === normalizedLine){
    return newLine === normalizedLine;
  }
  else{
    return false;
  }
}

const getNumbers = function(line)
{
  let numbers = '';
  line = line.toString();
  for(let i = 0; i < line.length; i++)
  {
    if(!Number.isNaN(parseInt(line[i], 10))){
      numbers += line[i];
    }
  }
  return parseInt(numbers, 10);
};


const isMeetingWithinWorkingHours = (startTime, endTime, meetingStart, meetingDuration) => {
  const startMinutes = convertToMinutes(startTime);
  const endMinutes = convertToMinutes(endTime);
  const meetingMinutes = convertToMinutes(meetingStart);
  const meetingEnd = meetingMinutes + meetingDuration;
  if (startMinutes <= meetingMinutes && meetingEnd <= endMinutes) {
    return true;
  }
  return false;
};

function convertToMinutes(time) {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * MINUTES_IN_HOUR + minutes;
}
