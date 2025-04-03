import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface Country {
  name: {
    common: string;
    official: string;
  };
  flags: {
    png: string;
    alt: string;
  };
  capital?: string[];
  capitalInfo?: {
    latlng?: [number, number];
  };
  population?: number;
  region?: string;
  languages?: { [key: string]: string };
  currencies?: { [key: string]: { name: string; symbol: string } };
  maps?: {
    googleMaps: string;
  };
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgFor, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  searchTerm = '';
  countries: Country[] = [];
  isLoading = false;
  isDarkMode = false;
  selectedCountry: Country | null = null;
  showModal = false;

  openCountryModal(country: Country) {
    this.selectedCountry = country;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedCountry = null;
  }

  getLanguages(country: Country): string {
    if (!country.languages) return 'N/A';
    return Object.values(country.languages).join(', ');
  }

  getCurrencies(country: Country): string {
    if (!country.currencies) return 'N/A';
    return Object.values(country.currencies)
      .map(curr => `${curr.name} (${curr.symbol})`)
      .join(', ');
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-theme', this.isDarkMode);
  }

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}
  
  getMapUrl(country: Country): SafeResourceUrl | null {
    if (!country?.capitalInfo?.latlng) return null;
    
    const [lat, lon] = country.capitalInfo.latlng;
    const zoom = 10;
    const url = `https://www.openstreetmap.org/export/embed.html?bbox=${lon-0.1},${lat-0.1},${lon+0.1},${lat+0.1}&layer=mapnik&marker=${lat},${lon}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getOpenStreetMapLink(country: Country): string | null {
    if (!country?.capitalInfo?.latlng) return null;
    const [lat, lon] = country.capitalInfo.latlng;
    return `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}`;
  }

  search() {
    if (this.searchTerm.trim()) {
      this.isLoading = true;
      this.http.get<Country[]>(`https://restcountries.com/v3.1/name/${this.searchTerm}`)
        .subscribe({
          next: (data) => {
            this.countries = data;
          },
          error: () => {
            this.countries = [];
            this.isLoading = false;
          },
          complete: () => {
            this.isLoading = false;
          }
        });
    }
  }
}
