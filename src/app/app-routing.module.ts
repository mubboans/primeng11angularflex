import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TextSpeechComponent } from './text-speech/text-speech.component';
import { SpeechTextComponent } from './speech-text/speech-text.component';

const routes: Routes = [
  {path: 'text-speech', component:TextSpeechComponent},
  {path:'speech-text',component:SpeechTextComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
