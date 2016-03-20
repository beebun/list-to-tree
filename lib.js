(function() {
    'use strict';

	var parents_mapping = {};
	var nodes_list = [];

	var init_tree = function(){
	    parents_mapping = {};
	    nodes_list = [];
	}

	var is_child = function(parent_node, current_node){
	    if(parent_node >= nodes_list.length) return false;
	    if(current_node >= nodes_list.length) return false;
	    if(parent_node == -1){
	        return true;
	    }
	    if(nodes_list[current_node].indexOf(nodes_list[parent_node]) != -1){
	        return true;
	    }else {
	        return false;
	    }
	}

	var add_child = function(parent_node, child_node){
	    if(!parents_mapping.hasOwnProperty(parent_node)){
	        parents_mapping[parent_node] = [];
	    }
	    parents_mapping[parent_node].push(child_node);
	}
	var make_tree = function(parent_node, current_node){
	    var next_group;
	    if(is_child(parent_node, current_node)){
	        add_child(parent_node, current_node)
	        next_group = make_tree(current_node, current_node+1);
	        return make_tree(parent_node, next_group);
	    }else{
	        return current_node;
	    }
	}
	var make_tree_from_list = function(current_node){
	    var name = nodes_list[current_node];
	    var json = {'text': name};
	    if(parents_mapping.hasOwnProperty(current_node)){
	        json['nodes'] = [];
	        for(var i=0; i<parents_mapping[current_node].length; i++){
	            json['nodes'].push(make_tree_from_list(parents_mapping[current_node][i]));
	        }
	    }
	    return json;
	}

	var run_convert_list_to_tree = function(){
	    init_tree();
	    convert_tags_to_list();
	    make_tree(-1, 0);
	    var tree = [];
	    for(var i=0; i<parents_mapping['-1'].length; i++){
	        tree.push(make_tree_from_list(parents_mapping['-1'][i]));
	    }
	    return tree;
	}

})();