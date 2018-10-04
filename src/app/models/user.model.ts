export class User {
    uid?: string;
    email?: string;
    nombre?: string;
    aP?: string;
    aM?: string;
    tipoCuenta?: string;

    constructor(data?: Object) {
        if (data) {
            this.uid = data['uid'];
            this.nombre = data['nombre'];
            this.aP = data['aP'];
            this.aM = data['aM'];
            this.email = data['email'];
            this.tipoCuenta = data['tipoCuenta'];
        } else {
            if (!this.uid) { this.uid = ''; }
            if (!this.email) { this.email = ''; }
            if (!this.nombre) { this.nombre = ''; }
            if (!this.aP) { this.aP = ''; }
            if (!this.aM) { this.aM = ''; }
            if (!this.tipoCuenta) { this.tipoCuenta = ''; }
        }
    }

    toUpperCase() {
        this.nombre = this.nombre != null ? this.nombre.toUpperCase() : null;
        this.aP = this.aP != null ? this.aP.toUpperCase() : null;
        this.aM = this.aM != null ? this.aM.toUpperCase() : null;
        this.tipoCuenta = this.tipoCuenta != null ? this.tipoCuenta.toUpperCase() : null;
    }
}
