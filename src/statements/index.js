/**
 * Statement Types.
 * Each of these represents a command encountered in a node body 
 * (or as part of a nested statement)
 * @namespace Statement
 */
module.exports = {
	Base: require('./base'),
	Blank: require('./blank'),
	Command: require('./command'),
	Conditional: require('./conditional'),
	DialogueSegment: require('./dialogueSegment'),
	Evaluate: require('./evaluate'),
	Function: require('./function'),
	Hashtag: require('./hashtag'),
	LineGroup: require('./lineGroup'),
	Link: require('./link'),
	Option: require('./option'),
	OptionGroup: require('./options'),
	Shortcut: require('./shortcut'),
	ShortcutGroup: require('./shortcuts'),
	Text: require('./text'),
}
