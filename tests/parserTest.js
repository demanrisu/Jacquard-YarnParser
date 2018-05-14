const fs = require('fs');

/**
 * Get all the nodes that are available for testing.
 * @return {array} of the nodes that have been found.
 */
function getNodes(parser) {
	var nodeNames = parser.nodeNames;

	var nodes = [];
	
	nodeNames.forEach(name => {
		nodes.push(parser.nodeNamed(name));
	});

	return nodes;
}

/**
 * Write the nodes into their own seperate files and save those files using the name of the current node.
 * @param {Map} nodes key value pairs of JSON versions of the nodes as values and their names as the respective keys.
 */
function convertNodesToJSON(nodes) {
	nodes.forEach(node => {
		let object = checkObjectProperties(node);
		let json = JSON.stringify(object, null, 4);
		let fileName = node.name.replace( /\s/g, "");
		writeJSONToFile(json, fileName);
	});
}

/**
 * Check each object and its properties, for each object return the object or go into the object and check its properties and return those properties.
 * @param {Object} instance to be traversed.
 * @return {Object} the object data.
 */
function checkObjectProperties(instance) {
	if (instance != null) {
		if(instance.serializableProperties != null) {
			
			const jsonable = {className: instance.constructor.name};
		
			instance.serializableProperties.forEach(property =>{
				jsonable[property] = checkObjectProperties(instance[property]);
			});		

			return jsonable;
		} else if (instance instanceof Array) {	
			return instance.map((item) => {return checkObjectProperties(item)});
		} else if (typeof instance === "object") {
			return Object.assign({}, instance);
		} else {
			return instance;
		}
	}
}

/**
 * Write the nodes into their own seperate files and save those files using the name of the current node.
 * @param {Map} nodes key value pairs of JSON versions of the nodes as values and their names as the respective keys.
 */
function writeJSONToFile(json, fileName) {
	fileName = fileName + '.json';
	let dir = './tests/out/' + fileName;

	fs.writeFile(dir, json, (err) => {
		if (err) {
			console.error(err);
		};
		console.log("File " + fileName +" has been created!");
	});
}

function compareFiles() {
	var diffFiles = [];

	var currentFileNames = fs.readdirSync("./tests/original/");
	
	currentFileNames.forEach(fileName => {
		try {
			var original = fs.readFileSync('./tests/original/' + fileName, "utf8").match(/^.+$/gm);
			var current = fs.readFileSync('./tests/out/'  + fileName, "utf8").match(/^.+$/gm);

			for (let line = 0; line < current.length; line++) {
				if (original[line] != current[line]) {
					diffFiles.push(fileName);
					break;
				}
			}

			if(diffFiles.length > 0) {
				console.log("Files containing differences:");
				diffFiles.forEach(fileName => {
					console.log(fileName);
				});
			} else {
				console.log("All files are the same!");
			}	
		} catch (err){
			console.log(err.message);
		}	
	});		
}


class ParserTest {
	/**
	 * Take the given parser, get all the parsed nodes and convert those nodes to a JSON format.
	 * @param {Parser} parser the parser to be tested.
	 */
	generateFiles(parser) {
		var nodes = getNodes(parser);

		convertNodesToJSON(nodes);
	}
	
	compareFiles() {
		compareFiles();
	}

	// getWorking(parser) {
	// 	var nodes = [parser.nodeNamed("Basic Lines")];
	// 	convertNodesToJSON(nodes);
	// }
}

module.exports = ParserTest; 