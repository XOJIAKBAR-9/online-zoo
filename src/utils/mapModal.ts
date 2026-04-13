// Map Modal Handler using OpenStreetMap and Leaflet
class MapModal {
  private modal: HTMLElement | null = null;
  private modalBackdrop: HTMLElement | null = null;
  private map: any = null;

  // Map coordinates for each animal
  private mapCoordinates = {
    panda: {
      name: 'Giant Panda Habitat - Eastern Asia',
      lat: 31.1688,
      lng: 112.5489,
      zoom: 8,
      description: 'Bamboo forests of central China',
    },
    eagle: {
      name: 'Bald Eagle Habitat - North America',
      lat: 43.9,
      lng: -108.4,
      zoom: 4,
      description: 'Found across North America near water bodies',
    },
    gorilla: {
      name: 'Western Lowland Gorilla Habitat - Central Africa',
      lat: 0.3,
      lng: 23.8,
      zoom: 4,
      description: 'Tropical rainforests of Central Africa',
    },
    lemur: {
      name: 'Ring-tailed Lemur Habitat - Madagascar',
      lat: -22.9375,
      lng: 43.9363,
      zoom: 6,
      description: 'Southwestern Madagascar forests',
    },
  };

  constructor() {
    this.loadLeafletLibrary();
    this.createMapModal();
    this.attachEventListeners();
  }

  private loadLeafletLibrary(): void {
    // Load Leaflet CSS
    const leafletCss = document.createElement('link');
    leafletCss.rel = 'stylesheet';
    leafletCss.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css';
    document.head.appendChild(leafletCss);

    // Load Leaflet JS
    const leafletScript = document.createElement('script');
    leafletScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js';
    document.head.appendChild(leafletScript);
  }

  private createMapModal(): void {
    // Create modal overlay
    this.modal = document.createElement('div');
    this.modal.className = 'map-modal-overlay';
    this.modal.id = 'mapModal';
    this.modal.style.display = 'none';
    this.modal.innerHTML = `
      <div class="map-modal-content">
        <button class="map-modal-close" aria-label="Close map">&times;</button>
        <div class="map-modal-header">
          <h2 id="mapTitle">Animal Habitat</h2>
          <p id="mapDescription"></p>
        </div>
        <div id="mapContainer" style="width: 100%; height: 400px; border-radius: 8px; overflow: hidden;"></div>
      </div>
    `;
    document.body.appendChild(this.modal);

    // Create backdrop
    this.modalBackdrop = document.createElement('div');
    this.modalBackdrop.className = 'map-modal-backdrop';
    this.modalBackdrop.id = 'mapBackdrop';
    this.modalBackdrop.style.display = 'none';
    document.body.appendChild(this.modalBackdrop);

    // Add styles
    this.addStyles();
  }

  private addStyles(): void {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      .map-modal-overlay {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        border-radius: 12px;
        padding: 30px;
        z-index: 10001;
        max-width: 700px;
        width: 90%;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
      }

      .map-modal-content {
        position: relative;
      }

      .map-modal-close {
        position: absolute;
        top: 15px;
        right: 15px;
        background: none;
        border: none;
        font-size: 28px;
        cursor: pointer;
        color: #333;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: color 0.2s;
      }

      .map-modal-close:hover {
        color: #00a86b;
      }

      .map-modal-header {
        margin-bottom: 20px;
      }

      .map-modal-header h2 {
        margin: 0 0 10px 0;
        font-size: 24px;
        color: #333;
      }

      .map-modal-header p {
        margin: 0;
        color: #666;
        font-size: 14px;
      }

      .map-modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 10000;
      }
    `;
    document.head.appendChild(styleSheet);
  }

  private attachEventListeners(): void {
    // Panda map button
    const pandaMapBtn = document.getElementById('view-map-panda');
    if (pandaMapBtn) {
      pandaMapBtn.addEventListener('click', () => this.openMap('panda'));
    }

    // Eagle map button
    const eagleMapBtn = document.getElementById('view-map-eagle');
    if (eagleMapBtn) {
      eagleMapBtn.addEventListener('click', () => this.openMap('eagle'));
    }

    // Gorilla map button
    const gorillaMapBtn = document.getElementById('view-map-gorilla');
    if (gorillaMapBtn) {
      gorillaMapBtn.addEventListener('click', () => this.openMap('gorilla'));
    }

    // Lemur map button
    const lemurMapBtn = document.getElementById('view-map-lemur');
    if (lemurMapBtn) {
      lemurMapBtn.addEventListener('click', () => this.openMap('lemur'));
    }

    // Close buttons
    const closeBtn = this.modal?.querySelector('.map-modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeMap());
    }

    // Backdrop click
    if (this.modalBackdrop) {
      this.modalBackdrop.addEventListener('click', () => this.closeMap());
    }
  }

  private openMap(animal: 'panda' | 'eagle' | 'gorilla' | 'lemur'): void {
    const coords = this.mapCoordinates[animal];

    // Update modal content
    const title = document.getElementById('mapTitle');
    const description = document.getElementById('mapDescription');
    if (title) title.textContent = coords.name;
    if (description) description.textContent = coords.description;

    // Show modal first
    if (this.modal) {
      this.modal.style.display = 'block';
    }
    if (this.modalBackdrop) {
      this.modalBackdrop.style.display = 'block';
    }

    // Initialize map after modal is visible
    setTimeout(() => {
      this.initializeLeafletMap(coords);
    }, 100);
  }

  private initializeLeafletMap(coords: any): void {
    const mapContainer = document.getElementById('mapContainer');
    if (!mapContainer) return;

    // Clear previous map
    mapContainer.innerHTML = '';

    // Check if Leaflet is loaded
    if (typeof (window as any).L === 'undefined') {
      mapContainer.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #666;">Loading map...</div>';
      return;
    }

    const L = (window as any).L;

    // Remove existing map if present
    if (this.map) {
      this.map.remove();
    }

    // Create map
    this.map = L.map(mapContainer).setView([coords.lat, coords.lng], coords.zoom);

    // Add tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(this.map);

    // Add marker for the location
    L.marker([coords.lat, coords.lng])
      .addTo(this.map)
      .bindPopup(coords.name)
      .openPopup();
  }

  private closeMap(): void {
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
    if (this.modal) {
      this.modal.style.display = 'none';
    }
    if (this.modalBackdrop) {
      this.modalBackdrop.style.display = 'none';
    }
  }
}

// Initialize map modal when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new MapModal();
});
