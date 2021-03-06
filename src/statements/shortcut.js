'use strict';

const Group = require('./group');

const privateProps = new WeakMap();

/**
 * Represents a shortcut statement (a set of statements grouped as an option)
 * @memberof Statement
 * @augments Statement.Group
 * @class Shortcut
 */
class Shortcut extends Group {
	constructor(statements, location) { super(statements, location); }
}

module.exports = Shortcut;