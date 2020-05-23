import { Component } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'barcode-scanner-test';
  public Result: string = "none";
  
  qrResultString: string;
  availableDevices: MediaDeviceInfo[];
  hasPermission: boolean;
  hasDevices: boolean;
  currentDevice: MediaDeviceInfo = null;

  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
    BarcodeFormat.CODE_39
  ]; 
  

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
    if (this.hasDevices)
      this.currentDevice = devices[0];
  }

  onCodeResult(resultString: string) {
    this.Result = resultString;
    this.beep(100,520,200);
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  Audio=new AudioContext()
  beep(vol: number, freq:number, duration:number){
    var v=this.Audio.createOscillator()
    var u=this.Audio.createGain()
    v.connect(u)
    v.frequency.value=freq
    v.type="square"
    u.connect(this.Audio.destination)
    u.gain.value=vol*0.01
    v.start(this.Audio.currentTime)
    v.stop(this.Audio.currentTime+duration*0.001)
  }


}
