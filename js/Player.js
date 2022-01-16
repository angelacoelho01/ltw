export class Player{
    constructor(name, password) {
        this.name = name;
        this.password = password;
        this.points = 0;
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    getPoints() {
        return this.points;
    }

    getPassword() {
        return this.password
    }

    setPassword(password) {
        this.password = password;
    }
}