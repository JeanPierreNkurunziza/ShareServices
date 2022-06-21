import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  today= new Date();
  changedDate?:any;
  pipe = new DatePipe('en-US');
  changeFormat(today:any){
    let ChangedFormat= this.pipe.transform(this.today, 'dd/MM/YYYY');
    this.changedDate = ChangedFormat;

  }

  constructor() { }

  ngOnInit(): void {
    this.changeFormat(this.today) 
  }

}
