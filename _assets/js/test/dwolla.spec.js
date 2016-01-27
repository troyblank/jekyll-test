describe('dwolla namespace', function () {
    'use strict';

    afterEach(function () {
        delete dwolla.nsTest;
    });

    it('should create the dwolla namespace', function () {
        assert.isObject(dwolla);
    });

    it('should add empty namespace when no object is provided', function () {
        dwolla.namespace('nsTest');

        assert.isObject(dwolla.nsTest);
    });

    it('should put provided object at the described namespace for single level', function () {
        var provided = {};

        dwolla.namespace('nsTest', provided);

        assert.strictEqual(provided, dwolla.nsTest);
    });

    it('should delimit namespaces with dots', function () {
        dwolla.namespace('nsTest.subNs');

        assert.isObject(dwolla.nsTest.subNs);
    });

    it('should put provided object at the described namespace when multi-level', function () {
        var provided = {};

        dwolla.namespace('nsTest.subNs', provided);

        assert.strictEqual(provided, dwolla.nsTest.subNs);
    });

    it('should not overwrite existing objects', function () {
        var existing = {};
        dwolla.nsTest = {nested: {existing: existing}};

        dwolla.namespace('nsTest.new');

        assert.strictEqual(existing, dwolla.nsTest.nested.existing);
    });
});
