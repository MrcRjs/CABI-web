export class Bicycle {
    id?: string;
    marca?: string;
    color?: string;
    rodada?: string;
    uid?: string;

    constructor() {
        if (!this.id) { this.id = ''; }
        if (!this.marca) { this.marca = ''; }
        if (!this.color) { this.color = ''; }
        if (!this.rodada) { this.rodada = ''; }
        if (!this.uid) { this.uid = ''; }
    }
}
