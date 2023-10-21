export const returnAge = (dateBirth) => {
    var today = new Date();
    var birthDate = new Date(dateBirth);
    var year = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        return year;
    }
    return year;
}