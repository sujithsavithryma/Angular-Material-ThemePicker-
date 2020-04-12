import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { StyleManagerService } from '../style-manager/style-manager.service';




@Component({
  selector: 'app-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.scss']
})
export class ThemePickerComponent {

  currentTheme: any;

  // The below colors need to align with the themes defined in theme-picker.scss
  themes: any[] = [
    {
      primary: '#673AB7',
      accent: '#FFC107',
      displayName: 'Deep Purple & Amber',
      name: 'deeppurple-amber',
      isDark: false,
    },
    {
      primary: '#3F51B5',
      accent: '#E91E63',
      displayName: 'Indigo & Pink',
      name: 'indigo-pink',
      isDark: false,
      isDefault: true,
    },
    {
      primary: '#E91E63',
      accent: '#607D8B',
      displayName: 'Pink & Blue-grey',
      name: 'pink-bluegrey',
      isDark: false,
    },
    {
      primary: '#9C27B0',
      accent: '#4CAF50',
      displayName: 'Purple & Green',
      name: 'purple-green',
      isDark: false,
    }
  ];

  constructor(
    private styleManager: StyleManagerService,
    ) {
    const themeName = localStorage.getItem('theme');
    if (themeName) {
      this.selectTheme(themeName);
    }
    }

  selectTheme(themeName: string): void {
    this.setTheme(themeName);
  }

  setTheme(themeName?): any {
    const theme = this.themes.find(currentTheme => currentTheme.name === themeName);

    if (!theme) {
      return false;
    }

    this.currentTheme = theme;

    if (theme.isDefault) {
      this.styleManager.removeStyle('theme');
    } else {
      this.styleManager.setStyle('theme', `assets/${theme.name}.css`);
    }

    if (this.currentTheme) {
      localStorage.setItem('theme', this.currentTheme.name);
    }
    console.log('Loading theme: finished');
  }
}

@NgModule({
  declarations: [
    ThemePickerComponent
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule
  ],
  exports: [
    ThemePickerComponent
  ]
})
export class ThemePickerModule { }
