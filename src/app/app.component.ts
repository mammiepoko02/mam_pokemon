import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokeComponent } from "./poke/poke.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [PokeComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mam_pokemon';
}
