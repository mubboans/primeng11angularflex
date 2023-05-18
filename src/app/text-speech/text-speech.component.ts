import { Component, OnInit } from '@angular/core';
import { CommonService } from '../service/common.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import * as ID3Parser from 'id3-parser';

@Component({
  selector: 'app-text-speech',
  templateUrl: './text-speech.component.html',
  styleUrls: ['./text-speech.component.scss']
})
export class TextSpeechComponent implements OnInit {
  typearr=[
    {name:"Nifty",value:"Nifty"},{name:"Bank Nifty",value:"BankNifty"}
  ]
  timearr=[
    {name:"Current Month",value:"2"},{name:"Next Month",value:"3"}
  ]
  periodTime:number;
  type:string;
  showAudio:boolean = false;
  audioSrc:SafeUrl;
  showtext:string ;
  constructor(public common:CommonService,private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    console.log(this.typearr);
    this.fnShowAudio();  
  }
  fnShowAudio(){
   
    console.log(this.type,this.periodTime);
    
    if(this.type && this.periodTime){
      this.common.fnConvertText2Speech(this.type, this.periodTime).subscribe((x:ArrayBuffer)=>{
        this.showAudio = true;
        const blob = new Blob([x], { type: 'audio/mpeg' });
        this.audioSrc = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
        const audio = new Audio(this.audioSrc.toString());
        audio.play();

        const uint8Array = new Uint8Array(x);
        // const decoder = new TextDecoder('utf-8');
        // const decodedString = decoder.decode(uint8Array);

        const view = new DataView(x);
        // const buffer = Buffer.from(view.buffer, view.byteOffset, view.byteLength);
        const parsedID3 = ID3Parser.parse(uint8Array);

        console.log(parsedID3,'49');
        this.showtext = 'text';
      })
    } 
  }
   arrayBufferToString(buffer){
    var byteArray = new Uint8Array(buffer);
    var str = "", cc = 0, numBytes = 0;
    for(var i=0, len = byteArray.length; i<len; ++i){
        var v = byteArray[i];
        if(numBytes > 0){
            //2 bit determining that this is a tailing byte + 6 bit of payload
            if((cc&192) === 192){
                //processing tailing-bytes
                cc = (cc << 6) | (v & 63);
            }else{
                throw new Error("this is no tailing-byte");
            }
        }else if(v < 128){
            //single-byte
            numBytes = 1;
            cc = v;
        }else if(v < 192){
            //these are tailing-bytes
            throw new Error("invalid byte, this is a tailing-byte")
        }else if(v < 224){
            //3 bits of header + 5bits of payload
            numBytes = 2;
            cc = v & 31;
        }else if(v < 240){
            //4 bits of header + 4bit of payload
            numBytes = 3;
            cc = v & 15;
        }else{
            //UTF-8 theoretically supports up to 8 bytes containing up to 42bit of payload
            //but JS can only handle 16bit.
            throw new Error("invalid encoding, value out of range")
        }

        if(--numBytes === 0){
            str += String.fromCharCode(cc);
        }
    }
    if(numBytes){
        throw new Error("the bytes don't sum up");
    }
    return str;
}
}
