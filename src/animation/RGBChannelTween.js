function RGBTween() {

	this.separateTime = 1000;
	this.journeyTime = 2000;

	this.aggregateTime = 1000;
	this.homingTime = 2000;

}

RGBTween.prototype = {

	separate: function(layer) {

		let separateInit = {
			ratio: 0
		};
		let separateEnd = {
			ratio: 1
		};

		let separateTween = new TWEEN.Tween(separateInit)
			.to(separateEnd, this.separateTime);

		separateTween.onUpdate(function () {

			layer.fmCenters = [];

			let rChannel = layer.channelHandlerList[0];
			let rCloseFmCenter = layer.closeFmCenters[0];
			let separateTopPos = layer.separateTopPos;

			let rTempPos = {
				x: separateInit.ratio * (separateTopPos.x - rCloseFmCenter.x),
				y: separateInit.ratio * (separateTopPos.y - rCloseFmCenter.y),
				z: separateInit.ratio * (separateTopPos.z - rCloseFmCenter.z)
			};

			rChannel.updatePos(rTempPos);
			layer.fmCenters.push(rTempPos);

			layer.fmCenters.push({
				x: 0,
				y: 0,
				z: 0
			});

			let bChannel = layer.channelHandlerList[2];
			let bCloseFmCenter = layer.closeFmCenters[2];
			let separateBottomPos = layer.separateBottomPos;

			let bTempPos = {
				x: separateInit.ratio * (separateBottomPos.x - bCloseFmCenter.x),
				y: separateInit.ratio * (separateBottomPos.y - bCloseFmCenter.y),
				z: separateInit.ratio * (separateBottomPos.z - bCloseFmCenter.z)
			};

			bChannel.updatePos(bTempPos);
			layer.fmCenters.push(bTempPos);

		}).onStart(function () {
			console.log("start separate layer");
			layer.disposeColorfulMap();
			layer.initChannelMap();
		}).onComplete(function() {
			console.log("end separate layer");
		});

		let journeyInit = {
			ratio: 0
		};

		let journeyEnd = {
			ratio: 1
		};

		let journeyTween = new TWEEN.Tween(journeyInit)
			.to(journeyEnd, this.journeyTime);

		journeyTween.onUpdate(function () {

			layer.fmCenters = [];

			let rChannel = layer.channelHandlerList[0];
			let separateTopPos = layer.separateTopPos;
			let rOpenFmCenter = layer.openFmCenters[0];

			let rTempPos = {
				x: journeyInit.ratio * (rOpenFmCenter.x - separateTopPos.x) + separateTopPos.x,
				y: journeyInit.ratio * (rOpenFmCenter.y - separateTopPos.y) + separateTopPos.y,
				z: journeyInit.ratio * (rOpenFmCenter.z - separateTopPos.z) + separateTopPos.z
			};

			rChannel.updatePos(rTempPos);
			layer.fmCenters.push(rTempPos);

			layer.fmCenters.push({
				x: 0,
				y: 0,
				z: 0
			});

			let bChannel = layer.channelHandlerList[2];
			let separateBottomPos = layer.separateBottomPos;
			let bOpenFmCenter = layer.openFmCenters[2];

			let bTempPos = {
				x: journeyInit.ratio * (bOpenFmCenter.x - separateBottomPos.x) + separateBottomPos.x,
				y: journeyInit.ratio * (bOpenFmCenter.y - separateBottomPos.y) + separateBottomPos.y,
				z: journeyInit.ratio * (bOpenFmCenter.z - separateBottomPos.z) + separateBottomPos.z
			};

			bChannel.updatePos(bTempPos);
			layer.fmCenters.push(bTempPos);

		}).onStart(function () {
			console.log("start journey layer");
		}).onComplete(function() {
			console.log("end journey layer");
			layer.initCloseButton();
			layer.isOpen = true;
		});

		separateTween.chain(journeyTween);
		separateTween.start();

	},

	aggregate: function(layer) {

		let homingInit = {
			ratio: 1
		};

		let homingEnd = {
			ratio: 0
		};

		let homingTween = new TWEEN.Tween(homingInit)
			.to(homingEnd, this.homingTime);

		homingTween.onUpdate(function () {

			layer.fmCenters = [];

			let rChannel = layer.channelHandlerList[0];
			let separateTopPos = layer.separateTopPos;
			let rOpenFmCenter = layer.openFmCenters[0];

			let rTempPos = {
				x: homingInit.ratio * (rOpenFmCenter.x - separateTopPos.x) + separateTopPos.x,
				y: homingInit.ratio * (rOpenFmCenter.y - separateTopPos.y) + separateTopPos.y,
				z: homingInit.ratio * (rOpenFmCenter.z - separateTopPos.z) + separateTopPos.z
			};

			rChannel.updatePos(rTempPos);
			layer.fmCenters.push(rTempPos);

			layer.fmCenters.push({
				x: 0,
				y: 0,
				z: 0
			});

			let bChannel = layer.channelHandlerList[2];
			let separateBottomPos = layer.separateBottomPos;
			let bOpenFmCenter = layer.openFmCenters[2];

			let bTempPos = {
				x: homingInit.ratio * (bOpenFmCenter.x - separateBottomPos.x) + separateBottomPos.x,
				y: homingInit.ratio * (bOpenFmCenter.y - separateBottomPos.y) + separateBottomPos.y,
				z: homingInit.ratio * (bOpenFmCenter.z - separateBottomPos.z) + separateBottomPos.z
			};

			bChannel.updatePos(bTempPos);
			layer.fmCenters.push(bTempPos);

		}).onStart(function () {
			console.log("start homing layer");
			layer.disposeCloseButton();
		}).onComplete(function() {
			console.log("end homing layer");
		});

		let aggregateInit = {
			ratio: 1
		};
		let aggregateEnd = {
			ratio: 0
		};

		let aggregateTween = new TWEEN.Tween(aggregateInit)
			.to(aggregateEnd, this.aggregateTime);

		aggregateTween.onUpdate(function () {

			layer.fmCenters = [];

			let rChannel = layer.channelHandlerList[0];
			let rCloseFmCenter = layer.closeFmCenters[0];
			let separateTopPos = layer.separateTopPos;

			let rTempPos = {
				x: aggregateInit.ratio * (separateTopPos.x - rCloseFmCenter.x),
				y: aggregateInit.ratio * (separateTopPos.y - rCloseFmCenter.y),
				z: aggregateInit.ratio * (separateTopPos.z - rCloseFmCenter.z)
			};

			rChannel.updatePos(rTempPos);
			layer.fmCenters.push(rTempPos);

			layer.fmCenters.push({
				x: 0,
				y: 0,
				z: 0
			});

			let bChannel = layer.channelHandlerList[2];
			let bCloseFmCenter = layer.closeFmCenters[2];
			let separateBottomPos = layer.separateBottomPos;

			let bTempPos = {
				x: aggregateInit.ratio * (separateBottomPos.x - bCloseFmCenter.x),
				y: aggregateInit.ratio * (separateBottomPos.y - bCloseFmCenter.y),
				z: aggregateInit.ratio * (separateBottomPos.z - bCloseFmCenter.z)
			};

			bChannel.updatePos(bTempPos);
			layer.fmCenters.push(bTempPos);

		}).onStart(function () {
			console.log("start aggregate layer");
		}).onComplete(function() {
			console.log("end aggregate layer");
			layer.disposeChannelMap();
			layer.initColorfulMap();
			layer.isOpen = false;
		});

		homingTween.chain(aggregateTween);
		homingTween.start();

	}

};

let RGBTweenFactory = new RGBTween();

export { RGBTweenFactory };