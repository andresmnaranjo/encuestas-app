import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent implements OnInit {
  @ViewChild('accordion', { read: ElementRef, static: false }) accordion: ElementRef;
  @Input() expanded = false;
  @Input() expandHeight;
  constructor() {}
  ngOnInit() {}
}
