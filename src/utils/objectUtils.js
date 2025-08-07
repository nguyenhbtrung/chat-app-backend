export const unflattenObject = (obj) => {
    const result = {};

    for (const key in obj) {
        const value = obj[key];
        if (key.includes('.')) {
            const [parent, child] = key.split('.');
            result[parent] = result[parent] || {};
            result[parent][child] = value;
        } else {
            result[key] = value;
        }
    }

    return result;
};