module.exports = {
	dataCleanse: function(data){
  
  var topics = [];
	  
		data.forEach(function(item){
			if(!topics.includes(item.topicdesc)){
				topics.push(item.topicdesc)
			}
		});
	var finalData = [];
	for(var i=0;i<topics.length;i++){
	  var tasks = []
	  data.forEach(function(item){
			if(topics[i] === item.topicdesc){
				tasks.push(item.taskdesc)
			}
		})
    var taskTopic = [];
    taskTopic.push(topics[i],tasks)
		finalData.push(taskTopic)
		
	}
  return finalData;
}
}