var Checker = require('../../lib/checker');
var assert = require('assert');

describe('rules/disallow-spaces-in-member-expression', function() {
    var checker;
    beforeEach(function() {
        checker = new Checker();
        checker.registerDefaultRules();
        checker.configure({ disallowSpacesInMemberExpression: true });
    });

    it('should report an error before and after property in member expression.', function() {
        assert(checker.checkString('var x = foo[ "bar" ]').getErrorCount() === 2);
    });

    it('should report single error when space after property in member expression.', function() {
        assert(checker.checkString('var x = foo["bar" ]').getErrorCount() === 1);
    });

    it('should report errors when property is integer.', function() {
        assert(checker.checkString('var x = foo[ 5 ]').getErrorCount() === 2);
    });

    it('should report errors when property is variable.', function() {
        assert(checker.checkString('var x = foo[ bar ]').getErrorCount() === 2);
    });

    it('should not report any errors when no spaces in member expression.', function() {
        assert(checker.checkString('var x = foo["bar"]').isEmpty());
    });

    it('should not report any errors for arrays.', function() {
        assert(checker.checkString('var x = foo[ "bar", "dum", 3 ]').isEmpty());
    });

    it('should not report any errors for expressions in arrays.', function() {
        assert(checker.checkString('var x = foo[ x + 5 ]').isEmpty());
    });
});
