(function () {
    'use strict';

    function restore(toRestore) {
        var i,
            functionName,
            count = toRestore.length;

        for (i = 0; i < count; i += 1) {
            functionName = toRestore[i];

            if (functionName.restore) {
                functionName.restore();
            }
        }
    }

    dwolla.namespace('test.common', {
        restore: restore
    });
}());
