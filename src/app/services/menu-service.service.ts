import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuItemService {

  constructor() { }
  getMenuItems() {
    return [
      {
        title: 'Dashboard',
        icon: 'dashboard',
        routerLinks: [{ label: 'Dashboard Content', path: 'dashboard' }],
        roles: ['User', 'Employee']
      },
      {
        title: 'Search',
        icon: 'manage_search',
        routerLinks: [{ label: 'Search Content', path: 'search' }],
        roles: ['User']
      },
      {
        title: 'Complaint',
        icon: 'work',
        routerLinks: [
          { label: 'Fill Complaint Content', path: 'fill-complaint' },
          { label: 'Complaints Content', path: 'complaints' },
          { label: 'Reopen Complaint Content', path: 'reopen-complaint' }
        ],
        roles: ['Employee']
      },
      {
        title: 'Ward',
        icon: 'work',
        routerLinks: [{ label: 'Ward Content', path: 'wards' }],
        roles: ['Employee']
      },
      {
        title: 'Department',
        icon: 'work',
        routerLinks: [{ label: 'Department Content', path: 'departments' }],
        roles: ['Employee']
      },
      {
        title: 'Complaint Type',
        icon: 'work',
        routerLinks: [{ label: 'Complaint Types Content', path: 'complaintType' }],
        roles: ['Employee']
      },      
    ];
  }
}
