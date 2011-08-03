var nameGen = {
	nodes: {},
	init: function(){
		for(var i = 0; i < names.length; ++i){			
			var name = names[i].toLowerCase();			
			this._parseName(name);
		}
		for(node in this.nodes){							
			for(child in root = this.nodes[node]){	
				if(child == 'total') { continue; }
				root[child] /= root.total;
			}
		}
	},	
	
	generateName: function(){				
		//chars are 97 - 122
		var name = String.fromCharCode(Math.floor(Math.random() * 25) + 97);
		if(this.nodes[name] == undefined) return;		
		return this._getNextCharacter(name);
	},	
	_getNextCharacter: function(name){								
					
		var current = name.charAt(name.length - 1);
		var next = this._getCharacterFromRandom(current);
		if(next && next != undefined && next != "undefined"){
			name += next;			
			name = this._getNextCharacter(name);
		}
		
		if(name.length < Math.floor(Math.random() * 6) + 4){
			name = this._getNextCharacter(name);
		}
		
		return name;		
	},
	_getCharacterFromRandom: function(character){		
		var randProb = Math.random();
		
		//set max prob to 1, set root to array of probabilities.
		var closestProb = 1, chosenCharacter, root = this.nodes[character];
		
		if(root == undefined || root == "undefined") return undefined;
		//check each character in root to see if it matches probability
		for(letter in root){		
			var childProb = root[letter];			
			if(childProb > randProb && childProb < closestProb){				
				//set chosen as closest letter found so far.
				chosenCharacter = letter;
				
				//set max probability to closest found so far to actual prob.
				closestProb = childProb;
			}
		}	
		return chosenCharacter;
	},
	_parseName: function(name){
		if(name.length <= 1) return;
		
		//create a new node for new letter or set existing node.
		var root = this.nodes[name[0]] || {total: 0};		
		
		//create a child node for the letter found or increment the occurences of this letter.
		root[name[1]] == undefined ? root[name[1]] = 1 : ++root[name[1]];				
		
		//increment the total occurances of letters
		++root.total;		
		
		//actually set the node.
		this.nodes[name[0]] = root;		
		
		//recurse until parsed through all chars in name.
		this._parseName(name.substring(1,name.length));
	}
};

