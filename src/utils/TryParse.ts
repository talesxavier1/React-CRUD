

const TryParse = (value: string) => {
    try {
        return JSON.parse(value);
    } catch (err) {
        return value;
    }
}

export default TryParse;