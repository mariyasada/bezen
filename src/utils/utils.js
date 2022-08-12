const getDateString = date => date.slice(0,10).replaceAll("-","/")

const getTimeString = date => date.slice(11,16);

const convertStringFirstLetterCapital = (str) =>{
    const remainingChar = str.slice(1);
    return str.charAt(0).toUpperCase() + remainingChar;
}

export {getDateString, getTimeString, convertStringFirstLetterCapital}