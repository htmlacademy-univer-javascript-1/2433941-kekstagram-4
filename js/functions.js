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
    return true;
  } else {
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
}
