import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { AdMobPro } from '@ionic-native/admob-pro';

import 'rxjs/add/operator/map';

/*
  Generated class for the AdMobPro provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AdMobProvider {
  private _opt;
  private _admobid;

  constructor(platform: Platform, public admob: AdMobPro) {
    	console.log('Hello Admobpro Provider');
    	platform.ready().then(() => {
	      	this._admobid = {};

			if(platform.is('android')) {
				this._admobid = { // for Android
					banner: 'ca-app-pub-5400954463123622/6642702650',
					interstitial: 'ca-app-pub-5400954463123622/1154749866'
				};
			}     
	    this.init();
	    });
  }

  init(){
  	console.log("AdMob init");
  	if( !AdMobPro ){
  		console.log("No AdMob?");
  		return;
  	} 

   	// Register AdMob events
   	// new events, with variable to differentiate: adNetwork, adType, adEvent
   	
   	document.addEventListener('onAdFailLoad', function(data){
		console.log('onAdFailLoad: ' + JSON.stringify(data));
	});
	
   	document.addEventListener('onAdLoaded', function(data){
		console.log('onAdLoaded: ' + JSON.stringify(data));
   	});
   	
	document.addEventListener('onAdPresent', function(data){
		console.log('onAdPresent: ' + JSON.stringify(data));
   	});
   	document.addEventListener('onAdLeaveApp', function(data){
    	console.log('onAdLeaveApp: ' + JSON.stringify(data));
   	});

   	document.addEventListener('onAdDismiss', function(data){
    	console.log('onAdDismiss: ' + JSON.stringify(data));
   	});
   	

   	this._opt = {
		// bannerId: admobid.banner,
		// interstitialId: admobid.interstitial,
		// adSize: 'SMART_BANNER',
		// width: integer, // valid when set adSize 'CUSTOM'
		// height: integer, // valid when set adSize 'CUSTOM'
		position: this.admob.AD_POSITION.BOTTOM_CENTER,
		// offsetTopBar: false, // avoid overlapped by status bar, for iOS7+
		bgColor: 'black', // color name, or '#RRGGBB'
		// x: integer,     // valid when set position to 0 / POS_XY
		// y: integer,     // valid when set position to 0 / POS_XY
		isTesting: true, // set to true, to receiving test ad for testing purpose
		// autoShow: true // auto show interstitial ad when loaded, set to false if prepare/show
   	};

   	this.admob.setOptions(this._opt);
   	this.showBanner();
  }

  showInterstitial(){
  	if( !AdMobPro ) return false;
  	console.log("showInterstitial");
	this.admob.prepareInterstitial({
	    adId: this._admobid.interstitial,
	    autoShow: true
   	})

   	return true;
  }

  showBanner(){
  	if( !AdMobPro ) return false;

  	console.log("showBanner" );
	this.admob.createBanner({
	    adId: this._admobid.banner,
	    position: this.admob.AD_POSITION.BOTTOM_CENTER,
	    autoShow: true
	})
	return true;
  }

 removeAds() {
   		if( AdMobPro ) this.admob.removeBanner();
   	}
}