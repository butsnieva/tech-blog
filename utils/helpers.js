module.exports = {
    format_time: (date) => {
        return date.toLocaleTimeString();
    },
    format_date: (date) => {
        const year = new Date(date).getFullYear();
        const month = new Date(date).getMonth() + 1;
        const day = new Date(date).getDate();
        return `${month}/${day}/${year}`;
    },
    format_plural: (word, amount) => {
        if (amount !== 1) {
            return `${word}s`
        }
        return word
    }
};