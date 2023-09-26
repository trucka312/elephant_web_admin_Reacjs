import moment from 'moment';

export const formatDate = (date, format) => {
    const formattedDate = moment(date).format(format);
    return formattedDate;
}

export const formatGMT = (date) => {
    const formattedGMT = moment(date).toDate();
    return formattedGMT;
}