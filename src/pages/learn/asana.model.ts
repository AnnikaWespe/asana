export class AsanaBlock{
	timeStamp: number;
	asanaArray: Asana[];
	repeatAfterTimeIntervalInHours: number;
	constructor(array, timeInterval){
		this.timeStamp = new Date().getTime()/1000;
		this.asanaArray = array;
		this.repeatAfterTimeIntervalInHours = timeInterval / 3600000;
	}
}
 
export class Asana{
	name: string;
	image: string;
}