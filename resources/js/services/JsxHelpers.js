import React from 'react';

class JsxHelpers {

    /**
     * Groups given list of items into 'row'
     * divs
     * @param {Array} items
     * @param {string} keyPrefix - Prefix for each row item's key
     * @param {number} colsPerRow - Number of cols on each row
     */
    asRows(items, keyPrefix, colsPerRow = 2) {
        const rows = [];

        let cols = [];
        for (let chooser of items) {
            cols.push(chooser);

            if (cols.length === colsPerRow) {
                rows.push(
                    <div className="row"
                         key={`${ keyPrefix }-${ rows.length }`}
                    >
                        { cols }
                    </div>
                );
                cols = [];
            }
        }

        // Last row with less than 2 cols?
        if (cols.length > 0) {
            rows.push(<div className="row" key={`${ keyPrefix }-${ rows.length }`}>{ cols }</div>);
        }

        return rows;
    }
}

export default new JsxHelpers();
