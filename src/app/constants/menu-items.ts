import { Injectable } from '@angular/core'
import { MenuItem } from '../models/menu_items.model'



@Injectable()
export class Menu {
    MENUITEMS: MenuItem[] = [
        {
            state: 'dashboard',
            name: 'Dashboard',
            icon: 'dashboard',
            role: ''
        },
        {
            state: "products\/category",
            name: 'Manage Category',
            icon: 'category',
            role: 'admin'
        }
    ]
    getMenuItem(): MenuItem[] {
        return this.MENUITEMS;
    }
}