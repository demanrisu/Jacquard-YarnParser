'use strict';

import LinkStatement from '../statements/link';
import Location from '../parser/location';
import OptionStatement from '../statements/option';

function addLink(statement) {
	this._statements.push(statement);
	this._nodeData.linkedNodeNames.push(statement.destination);
}

function exitOption(ctx) {
	if (this._group != null) this._group.isOption = true;
	const location = Location.FromANTLRNode(ctx);
	location.fileID = this._fileID;
	const destination = ctx.getChild(3).getText().trim();
	const text = ctx.getChild(1).getText().trim();

	addLink.call(this, new OptionStatement(text, destination, location));
}

function exitLink(ctx) {
	const location = Location.FromANTLRNode(ctx);
	location.fileID = this._fileID;
	const destination = ctx.getChild(1).getText().trim();
	
	addLink.call(this, new LinkStatement(destination, location));
}

function addToPrototype(prototype) {
	prototype.exitOption_with_text = exitOption;
	prototype.exitOption_link = exitLink;
}

module.exports = addToPrototype;
