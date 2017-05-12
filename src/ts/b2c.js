	var blTag, cpTag;
	var jointMapBl;
	var jointMapCp;
	var jointBl;
	var jointCp;
	var scale;
	var frameCount;
	var errorMSg;
	var tempMatrix = mat4.create();

	function rewriteTransforms(joint){
		var k=0;
		if (joint.animTransforms) {
			k = joint.animTransforms.length;
		}
		if (k > 0){
			var floatArray="\n";
			for (var i=0;i<k;i++){
				mat4.transpose(tempMatrix, joint.animTransforms[i]);
				for (j=0;j<16;j++){
					floatArray=floatArray + " " + tempMatrix[j];
				}
				floatArray=floatArray + "\n"
				
			}
			joint.docElement.childNodes[0].nodeValue=floatArray;
		}
		for (var i=0;i<joint.childs.length;i++){
			rewriteTransforms(joint.childs[i]);
		}
		
	}
	
	function addBindPose(xmlDoc){
		//return if bindpose already included
		var vs = xmlDoc.getElementsByTagName("library_visual_scenes")[0].getElementsByTagName("visual_scene")[0];
		var bp = getEleByTagAttr(vs,"node","name", "BindposeSkeleton");
		if (bp) return;
		var bp = getEleByTagAttr(vs,"node","name", "bindpose_root");
		if (bp) return;
		var data = document.getElementById(cpTag).childNodes[0].nodeValue;
		//change all b_ to bindpose_
		data = data.replace(/b_/g,"bindpose_");
		var bpDoc=parser.parseFromString(data,"text/xml");
		//move bindpose_root to under BindposeSkeleton
		var bp_root = getEleByTagAttr(bpDoc,"node","name", "bindpose_root");
		//var bps = getEleByTagAttr(bpDoc,"node","name", "BindposeSkeleton");
		//bps.appendChild(bp_root);
		//move the bindpose_root to client doc
		vs.appendChild(bp_root);
		
		
	}
	
	function getEleByTagAttr(par,eleName,attrName, attrValue){
		var eles = par.getElementsByTagName(eleName);
		var ele=null;
		j = eles.length;
		for (var i =0;i<j;i++){
			if (eles[i].attributes[attrName].value == attrValue){
				ele=eles[i];	
			}
		}
		return ele;
	}
	
	function calcDiff(joint){
		var diffMatrix = mat4.create();
		var blJoint = jointMapBl[joint.name];
		mat4.invert(tempMatrix,blJoint.wMatrix);
		mat4.multiply(diffMatrix,tempMatrix,joint.wMatrix);
		joint.dMatrix=diffMatrix;
		
		for (var i=0;i<joint.childs.length;i++){
			calcDiff(joint.childs[i]);
		}
	}	
	
	function getSkelData(xmlDoc,joint,jointMap){
		try{
			var unit= xmlDoc.getElementsByTagName("asset")[0].getElementsByTagName("unit")[0];
			scale = parseFloat(unit.attributes["meter"].value);
		}catch(err){
			console.log(err.message);
		}
	
		var node = getJointRootNode(xmlDoc);
		if (node === null) return;

		buildJointTree(node,joint,jointMap);
	}
	
	function getJointRootNode(xmlDoc){
		try{
			var nodes = xmlDoc.getElementsByTagName("library_visual_scenes")[0].getElementsByTagName("visual_scene")[0].getElementsByTagName("node");
			for (var i=0;i<nodes.length;i++){
				node =nodes[i];
				if (!node.attributes["type"]) continue;
				if (node.attributes["type"].value != "JOINT") continue;
				if (!node.attributes["sid"]) continue;
				if (node.attributes["sid"].value == "b_root"){
					return node;
				}
			}
			return null;
		}catch(err){
			console.log("getJointRootNode " + err.message);
			return null;
		}
	}
	
	function buildJointTree(node, parentJoint,jointMap){
		var childs = node.childNodes;
		if (childs.length == 0) return;
		var child;
		var joint=null;
		for (var i=0;i<childs.length;i++){
			child=childs[i];
			if (child.nodeName == "matrix"){
				var daeMatrixArray=child.childNodes[0].nodeValue.replace(/\s/g,"@").replace(/@+/g," ").trim().split(" ");
				var mat4Matrix=mat4.create();
				mat4.transpose(mat4Matrix,daeMatrixArray);
				var wMat;
				if (parentJoint.parent === null){
					wMat=mat4Matrix;
				}else{
					wMat=mat4.create();
					mat4.multiply(wMat,parentJoint.wMatrix,mat4Matrix);
				}
				joint = {name:node.attributes["sid"].value,parent:parentJoint,wMatrix:wMat,rMatrix:mat4Matrix,childs:[]};
				parentJoint.childs=parentJoint.childs.concat([joint]);
				jointMap[joint.name]=joint;
			}
		}
		if (joint===null){
			return;
		}
		for (var i=0;i<childs.length;i++){
			var child = childs[i];
			if (child.nodeType ==1 && child.nodeName == "node" && child.attributes["type"]){
				if (child.attributes["type"].value=="JOINT"){
					buildJointTree(child,joint,jointMap);
				}
			}
		}
	}

	function printSkeleton(joints, indent, prtMat){
		if (joints.wMatrix != undefined){
			if (prtMat){
				console.log(indent + joints.name + " " + mat4.str(joints.wMatrix));
			}else{
				console.log(indent + joints.name);
			}
		}
		indent = indent + " ";
		for (var i=0;i<joints.childs.length;i++){
			printSkeleton(joints.childs[i],indent);
		}
	}	
	

	
	//get the joint position in world co-ord of the joint in the f animation frame
	function convertToWorld(joint,f){
		if (joint.parent.wMatrix === null){
		    if (joint.animTransforms && joint.animTransforms.length != 0){
			    joint.wMatrix=joint.animTransforms[f];
		    }
		}else{
		if (!joint.animTransforms || joint.animTransforms.length == 0){
		    mat4.multiply(joint.wMatrix,joint.parent.wMatrix,joint.rMatrix);
		}else{
			try{
				mat4.multiply(joint.wMatrix,joint.parent.wMatrix,joint.animTransforms[f]);
			}catch(err){
				console.log(joint.name + ":" + err.message);
			}
		}
		}
		var k = joint.childs.length;
		for (var m=0;m<k;m++){
		    convertToWorld(joint.childs[m],f);
		}
	}
	
	function convertToCPWorld(joint){
		mat4.multiply(joint.wMatrix,joint.wMatrix,joint.dMatrix);
		var k = joint.childs.length;
		for (var m=0;m<k;m++){
		    convertToCPWorld(joint.childs[m]);
		}
	}
	
	function convertToParent(joint,f){
		if (joint.parent.wMatrix === null){
			if (joint.animTransforms && joint.animTransforms.length != 0){    
				joint.animTransforms[f]=joint.wMatrix;
			}
		}else{
			if (joint.animTransforms && joint.animTransforms.length != 0){
				mat4.invert(tempMatrix,joint.parent.wMatrix);
				mat4.multiply(joint.animTransforms[f],tempMatrix,joint.wMatrix);
			}
		}
		var k = joint.childs.length;
		for (var m=0;m<k;m++){
		    convertToParent(joint.childs[m],f);
		}
	}
	
	function convertFramesToCP(joint){
		var j = frameCount;
		for (var i=0;i<j;i++){
			convertToWorld(joint,i);
			convertToCPWorld(joint);
			convertToParent(joint,i);
		}
	}
	

	function getStringFileURL(text){
		try{
			var fileBlob=new Blob([text]);		
		}catch(e){
			console.log("getStringFileURL error : " + e);
			var blobBuilder=window.BlobBuilder || window.MozBlobBuilder || window.WebKitBlobBuilder;
			var bb=new blobBuilder();		
			bb.append(text);
			var fileBlob=bb.getBlob();
		}
		var URL=window.URL || window.webkitURL;
		var link=URL.createObjectURL(fileBlob);
		return link;
	}

	function storeIntervals(sourceElement, jointObj){
		var intervalArray = sourceElement.getElementsByTagName("float_array")[0].childNodes[0].nodeValue.replace(/\s/g,"@").replace(/@+/g," ").trim().split(" ");
		jointObj.animTimes = intervalArray;
	}
	
	function storeTransforms(sourceElement, jointObj){
		var element =sourceElement.getElementsByTagName("float_array")[0];
		var allMatrixs=element.childNodes[0].nodeValue.replace(/\s/g,"@").replace(/@+/g," ").trim().split(" ");
		var k = allMatrixs.length/16 | 0;
		if (k>frameCount) {frameCount=k;}
		jointObj.animTransforms = new Array();
		//save the element so we can change it afterwards
		jointObj.docElement = element;
		for (var m=0;m<k;m++){
			var mat4Matrix=mat4.create();
			mat4.transpose(mat4Matrix,allMatrixs.slice(m*16,(m+1)*16) );
			jointObj.animTransforms[m] = mat4Matrix;
		}
	}	

	function getAnimData(xmlDoc,jointMap){
		try{
		var childs = xmlDoc.getElementsByTagName("library_animations")[0].childNodes;
		if (childs == null) return;
		var j=childs.length;
		var child, sampler;
		for (var i=0;i<j;i++){
			child=childs[i];
			if (child.nodeName != "animation") continue;
			var channel = child.getElementsByTagName("channel")[0];
			var target = channel.attributes["target"].value.split("/");
			//ignore if animation values other than transforms
			if (target[1] !="transform") continue;
			var joint = jointMap[target[0]];
			//ignore bones other than the ones in rest pose
			if (!joint) continue;
			sampler = child.getElementsByTagName("sampler")[0];
			var intervalTag = getEleByTagAttr(sampler,"input","semantic", "INPUT").attributes["source"].value.slice(1);
			var transformTag= getEleByTagAttr(sampler,"input","semantic", "OUTPUT").attributes["source"].value.slice(1);
			storeIntervals(getEleByTagAttr(child,"source","id",intervalTag),joint);
			storeTransforms(getEleByTagAttr(child,"source","id",transformTag),joint);
		}
		}catch(e){
			errorMsg = "Error reading animation";
		}
	}	
	
	function process(xmlDoc){
		getAnimData(xmlDoc,jointMapCp);
		if (errorMsg != "") return;
		convertFramesToCP(jointCp.childs[0]);	
		rewriteTransforms(jointCp.childs[0]);
		addBindPose(xmlDoc);
	}
	
	function fileLoaded(e){
		var status = document.getElementById("status");
		status.innerHTML="File Loaded. Now converting";
		
		parser=new DOMParser();
		var xmlDoc=parser.parseFromString(e.target.result,"text/xml");
		process(xmlDoc);
		if (errorMsg!=""){
			status.innerHTML="<span class='label label-important'>" + errorMsg + "<br> The file may not be appropriate </span>";
			fileLoader.disabled=false;
			fileLoader.value="";
			return;
		}
		var fileText=(new XMLSerializer()).serializeToString(xmlDoc);
		var download = document.getElementById("download");
		download.href=getStringFileURL(fileText);
		//download.style.display='block';
		status.innerHTML="";
		$('#myModal').modal('show');
	}	
	
	
	
	
	function diff(){
		var parser=new DOMParser();
		var data;
		var xmlDoc;

		if (document.getElementById("MaleRadio").checked){
			blTag="blender_m_skeleton_data";
			cpTag="cp_m_skeleton_data";
		}else{
			blTag="blender_f_skeleton_data";
			cpTag="cp_f_skeleton_data";
		}
		
		data = document.getElementById(blTag).childNodes[0].nodeValue;;
		xmlDoc=parser.parseFromString(data,"text/xml");
		getSkelData(xmlDoc,jointBl,jointMapBl);
		//printSkeleton(jointBl, " ",true);
		
		data = document.getElementById(cpTag).childNodes[0].nodeValue;
		xmlDoc=parser.parseFromString(data,"text/xml");
		getSkelData(xmlDoc,jointCp,jointMapCp);
		//printSkeleton(jointCp, " ",true);
		
		calcDiff(jointCp.childs[0]);
	}
	
	function init(){
		jointMapBl={};
		jointMapCp={};
		jointBl = {name:"JointTree",childs:[],parent:null,wMatrix:null,rMatrix:null,animTimes:null,animTransforms:null,docElement:null };
		jointCp = {name:"JointTree",childs:[],parent:null,wMatrix:null,rMatrix:null,animTimes:null,animTransforms:null,docElement:null };
		frameCount=0;
		scale=1;
		errorMsg="";
	}
	
	function handleFileSelect(evt) {
		init();
		diff();
		var files = evt.target.files; 
		var file = files[0];
		var reader = new FileReader();
		reader.onloadend = fileLoaded;
		var status = document.getElementById("status");
		var fileLoader = document.getElementById("fileLoader");
		fileLoader.disabled=true;
		status.innerHTML="Loading File";
		reader.readAsText(file);

	}
	
	function main(){
		$('#myModal').on('hidden', function () {
			fileLoader.disabled=false;
			fileLoader.value="";
  		})
		document.getElementById('fileLoader').addEventListener('change', handleFileSelect, false);
	}
		



