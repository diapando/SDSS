import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'app-my-doughnut-chart',
  templateUrl: './my-doughnut-chart.component.html',
  styleUrls: ['./my-doughnut-chart.component.css']
})
export class MyDoughnutChartComponent{

  version = VERSION.full;

  ngclass = "mat-video-responsive";

  src = "assets/trick.mp4";
  title = "SDSS";
  width = 1280;
  height = 720;
  currentTime = 0;
  autoplay = false;
  preload = true;
  loop = false;
  quality = true;
  download = true;
  fullscreen = true;
  playsinline = false;
  showFrameByFrame = false;
  keyboard = true;
  color = "primary";
  spinner = "spin";
  poster = "assets/NASA.jpg";
  overlay = null;
  muted = false;
}
