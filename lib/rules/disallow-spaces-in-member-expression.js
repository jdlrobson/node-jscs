var assert = require('assert');
var exceptions = ['SequenceExpression', 'BinaryExpression'];

module.exports = function() {};

module.exports.prototype = {

    configure: function(disallowSpacesInMemberExpression) {
        assert(
            disallowSpacesInMemberExpression === true,
            'disallowSpacesInMemberExpression option requires the value true or should be removed'
        );
    },

    getOptionName: function() {
        return 'disallowSpacesInMemberExpression';
    },

    check: function(file, errors) {
        file.iterateNodesByType('MemberExpression', function(node) {
            if (node && node.property && node.object.type === 'Identifier' && node.computed &&
                exceptions.indexOf(node.property.type) === -1) {
                if (node.object.range[1] + 1 !== node.property.range[0]) {
                    errors.add('No spaces are allowed in member expression.', node.property.loc.start);
                }
                if (node.property.range[1] + 1 !== node.range[1]) {
                    errors.add('No spaces are allowed in member expression.', node.property.loc.end);
                }
            }
        });
    }

};
