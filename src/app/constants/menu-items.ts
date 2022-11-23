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
            state: "categories",
            name: 'Manage Category',
            icon: 'category',
            role: 'admin'
        },
        {
            state: "products",
            name: 'Manage Product',
            icon: 'inventory',
            role: 'admin'
        }
    ]
    getMenuItem(): MenuItem[] {
        return this.MENUITEMS;
    }
}