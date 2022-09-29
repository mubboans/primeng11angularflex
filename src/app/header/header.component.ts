import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng-lts/api/menuitem';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }
  items: MenuItem[];
  menuitem: MenuItem[];

  activeItem: MenuItem;
  selectedCity1:string;
  cities: any[];
  ngOnInit(): void {

    this.cities = [
        {name: 'New York', code: 'NY'},
        {name: 'Rome', code: 'RM'},
        {name: 'London', code: 'LDN'},
        {name: 'Istanbul', code: 'IST'},
        {name: 'Paris', code: 'PRS'}
    ];
    this.items = [
      {
        label:'Home',      
    },
    {
        label:'categories',  
    }
  ];
  this.menuitem = [
    {label: 'lingerie', icon: 'pi pi-fw pi-home'},
    {label: 'sleepwwear', icon: 'pi pi-fw pi-calendar'},
    {label: 'robes', icon: 'pi pi-fw pi-pencil'},
    {label: 'swimwear & coverups', icon: 'pi pi-fw pi-file'},
    {label: 'stocking & hosiery', icon: 'pi pi-fw pi-cog'},
    {label: 'satin', icon: 'pi pi-apple'},
    {label: 'plus size', icon: 'pi pi-fw pi-book'},
    {label: 'loungewear', icon: 'pi pi-fw pi-thumbs-up'},
];
  }

}
