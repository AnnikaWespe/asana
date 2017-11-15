export class AsanaBlock{
	timeThenInHours: number;
	asanaArray: Asana[];
	repeatAfterTimeIntervalInHours: number;
	constructor(array, timeInterval){
		this.timeStamp = new Date().getTime() / 3600000;
		this.asanaArray = array;
		this.repeatAfterTimeIntervalInHours = timeInterval;
	}
}

export class Asana{
	name: string;
	image: string;
}
