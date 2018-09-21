var translate  = {
    switchArabic:    (obj, first) => {
            if (first) {
                obj = JSON.stringify(obj);
                obj = JSON.parse(obj);
            }
            let arrVals = [],
                objKeys = [];

            /*********CHECK FOR ARRAY**********/
            if (Array.isArray(obj)) {
                //check for empty array
                if (obj[0] === undefined)
                    return;
                else {
                    obj.forEach((el, i) => {
                        obj[i] = translate.switchArabic(el);
                    });
                    return obj;
                }
            }
            /*********CHECK FOR OBJECT**********/
            else if (obj instanceof Object) {
                //get object keys
                objKeys = Object.keys(obj);
                //set key output;
                objKeys.forEach((key) => {
                    let keyValOut = obj[key];
                    if (keyValOut instanceof Object) {
                        translate.switchArabic(keyValOut);
                    } else if (key.indexOf('arabic') !== -1) {
                        obj[key.slice(0, -7)] = obj[key];
                    }
                });
                return obj;
            }
    }
};

module.exports = translate;